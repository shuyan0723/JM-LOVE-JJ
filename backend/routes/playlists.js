import express from 'express';
import { body, validationResult } from 'express-validator';
import Playlist from '../models/Playlist.js';
import Music from '../models/Music.js';
import UserInteraction from '../models/UserInteraction.js';
import verifyToken, { optionalAuth } from '../middleware/auth.js';
import { sendSuccess, sendCreated, sendError, sendPaginated, asyncHandler } from '../utils/response.js';
import { HTTP_STATUS, PAGINATION } from '../utils/constants.js';

const router = express.Router();

// ==================== 创建歌单 ====================
router.post(
  '/',
  verifyToken,
  [
    body('name').trim().isLength({ min: 1, max: 100 }).withMessage('歌单名称长度 1-100 字符'),
    body('description').optional().trim().isLength({ max: 500 }).withMessage('描述最多 500 个字符'),
    body('isPublic').optional().isBoolean().withMessage('isPublic 必须是布尔值')
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, '输入参数无效', HTTP_STATUS.BAD_REQUEST, errors.array());
    }

    const { name, description = '', isPublic = true, cover } = req.body;

    const newPlaylist = new Playlist({
      name,
      description,
      isPublic,
      cover,
      creator: req.userId
    });

    await newPlaylist.save();
    await newPlaylist.populate('creator', 'username nickname avatar');

    // 添加到用户交互记录
    let interaction = await UserInteraction.findOne({ user: req.userId });
    if (!interaction) {
      interaction = new UserInteraction({ user: req.userId });
    }
    interaction.playlists.push(newPlaylist._id);
    await interaction.save();

    sendCreated(res, newPlaylist, '歌单已创建');
  })
);

// ==================== 获取所有歌单 ====================
router.get('/', optionalAuth, asyncHandler(async (req, res) => {
  const { page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.DEFAULT_LIMIT, search, sort = 'newest' } = req.query;

  const pageNum = Math.min(parseInt(page) || PAGINATION.DEFAULT_PAGE, PAGINATION.MAX_LIMIT);
  const limitNum = Math.min(parseInt(limit) || PAGINATION.DEFAULT_LIMIT, PAGINATION.MAX_LIMIT);

  const query = { isPublic: true };

  if (search) {
    query.$text = { $search: search };
  }

  let sortQuery = {};
  if (sort === 'popular') {
    sortQuery = { followerCount: -1 };
  } else if (sort === 'trending') {
    sortQuery = { playCount: -1 };
  } else {
    sortQuery = { createdAt: -1 };
  }

  const total = await Playlist.countDocuments(query);
  const playlists = await Playlist.find(query)
    .sort(sortQuery)
    .limit(limitNum)
    .skip((pageNum - 1) * limitNum)
    .populate('creator', 'username nickname avatar')
    .select('-followers');

  sendPaginated(res, playlists, {
    page: pageNum,
    limit: limitNum,
    total
  }, '获取歌单列表成功');
}));

// ==================== 获取我的歌单 ====================
router.get('/my/playlists', verifyToken, asyncHandler(async (req, res) => {
  const { page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.DEFAULT_LIMIT } = req.query;

  const pageNum = Math.min(parseInt(page) || PAGINATION.DEFAULT_PAGE, PAGINATION.MAX_LIMIT);
  const limitNum = Math.min(parseInt(limit) || PAGINATION.DEFAULT_LIMIT, PAGINATION.MAX_LIMIT);

  const total = await Playlist.countDocuments({ creator: req.userId });
  const playlists = await Playlist.find({ creator: req.userId })
    .sort({ createdAt: -1 })
    .limit(limitNum)
    .skip((pageNum - 1) * limitNum)
    .populate('creator', 'username nickname avatar');

  sendPaginated(res, playlists, {
    page: pageNum,
    limit: limitNum,
    total
  }, '获取我的歌单成功');
}));

// ==================== 获取歌单详情 ====================
router.get('/:id', optionalAuth, asyncHandler(async (req, res) => {
  const playlist = await Playlist.findByIdAndUpdate(
    req.params.id,
    { $inc: { playCount: 1 } },
    { new: true }
  )
    .populate('creator', 'username nickname avatar')
    .populate('songs', 'title artist album cover duration');

  if (!playlist) {
    return sendError(res, '歌单不存在', HTTP_STATUS.NOT_FOUND);
  }

  if (!playlist.isPublic && playlist.creator._id.toString() !== req.userId?.toString() && req.user?.role !== 'admin') {
    return sendError(res, '无权限访问该歌单', HTTP_STATUS.FORBIDDEN);
  }

  sendSuccess(res, playlist, '获取歌单详情成功');
}));

// ==================== 更新歌单 ====================
router.put(
  '/:id',
  verifyToken,
  [
    body('name').optional().trim().isLength({ min: 1, max: 100 }).withMessage('歌单名称长度 1-100 字符'),
    body('description').optional().trim().isLength({ max: 500 }).withMessage('描述最多 500 个字符')
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, '输入参数无效', HTTP_STATUS.BAD_REQUEST, errors.array());
    }

    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return sendError(res, '歌单不存在', HTTP_STATUS.NOT_FOUND);
    }

    if (playlist.creator.toString() !== req.userId.toString() && req.user.role !== 'admin') {
      return sendError(res, '无权限修改该歌单', HTTP_STATUS.FORBIDDEN);
    }

    const { name, description, isPublic, cover } = req.body;

    Object.assign(playlist, {
      ...(name && { name }),
      ...(description !== undefined && { description }),
      ...(isPublic !== undefined && { isPublic }),
      ...(cover && { cover })
    });

    await playlist.save();

    sendSuccess(res, playlist, '歌单已更新');
  })
);

// ==================== 删除歌单 ====================
router.delete('/:id', verifyToken, asyncHandler(async (req, res) => {
  const playlist = await Playlist.findById(req.params.id);

  if (!playlist) {
    return sendError(res, '歌单不存在', HTTP_STATUS.NOT_FOUND);
  }

  if (playlist.creator.toString() !== req.userId.toString() && req.user.role !== 'admin') {
    return sendError(res, '无权限删除该歌单', HTTP_STATUS.FORBIDDEN);
  }

  // 从用户交互中移除
  await UserInteraction.updateOne(
    { user: req.userId },
    { $pull: { playlists: req.params.id } }
  );

  await Playlist.findByIdAndDelete(req.params.id);

  sendSuccess(res, null, '歌单已删除');
}));

// ==================== 添加歌曲到歌单 ====================
router.post('/:playlistId/songs/:songId', verifyToken, asyncHandler(async (req, res) => {
  const playlist = await Playlist.findById(req.params.playlistId);

  if (!playlist) {
    return sendError(res, '歌单不存在', HTTP_STATUS.NOT_FOUND);
  }

  if (playlist.creator.toString() !== req.userId.toString() && req.user.role !== 'admin') {
    return sendError(res, '无权限修改该歌单', HTTP_STATUS.FORBIDDEN);
  }

  const music = await Music.findById(req.params.songId);
  if (!music) {
    return sendError(res, '歌曲不存在', HTTP_STATUS.NOT_FOUND);
  }

  if (playlist.songs.includes(req.params.songId)) {
    return sendError(res, '该歌曲已在歌单中', HTTP_STATUS.CONFLICT);
  }

  playlist.songs.push(req.params.songId);
  await playlist.save();

  sendSuccess(res, playlist, '歌曲已添加到歌单');
}));

// ==================== 从歌单移除歌曲 ====================
router.delete('/:playlistId/songs/:songId', verifyToken, asyncHandler(async (req, res) => {
  const playlist = await Playlist.findById(req.params.playlistId);

  if (!playlist) {
    return sendError(res, '歌单不存在', HTTP_STATUS.NOT_FOUND);
  }

  if (playlist.creator.toString() !== req.userId.toString() && req.user.role !== 'admin') {
    return sendError(res, '无权限修改该歌单', HTTP_STATUS.FORBIDDEN);
  }

  playlist.songs = playlist.songs.filter(id => id.toString() !== req.params.songId);
  await playlist.save();

  sendSuccess(res, playlist, '歌曲已从歌单移除');
}));

// ==================== 关注歌单 ====================
router.post('/:id/follow', verifyToken, asyncHandler(async (req, res) => {
  const playlist = await Playlist.findById(req.params.id);

  if (!playlist) {
    return sendError(res, '歌单不存在', HTTP_STATUS.NOT_FOUND);
  }

  if (playlist.followers.includes(req.userId)) {
    return sendError(res, '已经关注过该歌单', HTTP_STATUS.CONFLICT);
  }

  playlist.followers.push(req.userId);
  playlist.followerCount += 1;
  await playlist.save();

  sendSuccess(res, playlist, '已关注该歌单');
}));

// ==================== 取消关注歌单 ====================
router.delete('/:id/follow', verifyToken, asyncHandler(async (req, res) => {
  const playlist = await Playlist.findById(req.params.id);

  if (!playlist) {
    return sendError(res, '歌单不存在', HTTP_STATUS.NOT_FOUND);
  }

  const index = playlist.followers.indexOf(req.userId);
  if (index === -1) {
    return sendError(res, '未关注该歌单', HTTP_STATUS.BAD_REQUEST);
  }

  playlist.followers.splice(index, 1);
  playlist.followerCount = Math.max(0, playlist.followerCount - 1);
  await playlist.save();

  sendSuccess(res, playlist, '已取消关注该歌单');
}));

export default router;

