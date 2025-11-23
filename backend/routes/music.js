import express from 'express';
import { body, validationResult } from 'express-validator';
import Music from '../models/Music.js';
import UserInteraction from '../models/UserInteraction.js';
import verifyToken, { optionalAuth } from '../middleware/auth.js';
import { sendSuccess, sendCreated, sendError, sendPaginated, asyncHandler } from '../utils/response.js';
import { HTTP_STATUS, PAGINATION } from '../utils/constants.js';

const router = express.Router();

// ==================== 获取所有歌曲 ====================
router.get('/', optionalAuth, asyncHandler(async (req, res) => {
  const { page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.DEFAULT_LIMIT, search, sort = 'newest', genre } = req.query;

  const pageNum = Math.min(parseInt(page) || PAGINATION.DEFAULT_PAGE, PAGINATION.MAX_LIMIT);
  const limitNum = Math.min(parseInt(limit) || PAGINATION.DEFAULT_LIMIT, PAGINATION.MAX_LIMIT);

  const query = { isPublished: true };

  // 搜索功能
  if (search) {
    query.$text = { $search: search };
  }

  // 按类型筛选
  if (genre) {
    query.genre = genre;
  }

  // 排序
  let sortQuery = {};
  switch (sort) {
    case 'popular':
      sortQuery = { plays: -1 };
      break;
    case 'trending':
      sortQuery = { likes: -1 };
      break;
    case 'oldest':
      sortQuery = { createdAt: 1 };
      break;
    default:
      sortQuery = { createdAt: -1 };
  }

  const total = await Music.countDocuments(query);
  const songs = await Music.find(query)
    .sort(sortQuery)
    .limit(limitNum)
    .skip((pageNum - 1) * limitNum)
    .populate('createdBy', 'username nickname avatar');

  sendPaginated(res, songs, {
    page: pageNum,
    limit: limitNum,
    total
  }, '获取歌曲列表成功');
}));

// ==================== 获取单曲详情 ====================
router.get('/:id', optionalAuth, asyncHandler(async (req, res) => {
  const song = await Music.findById(req.params.id)
    .populate('createdBy', 'username nickname avatar');

  if (!song) {
    return sendError(res, '歌曲不存在', HTTP_STATUS.NOT_FOUND);
  }

  // 增加播放计数
  song.plays += 1;
  await song.save();

  // 记录听歌历史
  if (req.userId) {
    const interaction = await UserInteraction.findOne({ user: req.userId });
    if (interaction) {
      await interaction.addToListenHistory(song._id);
    }
  }

  sendSuccess(res, song, '获取歌曲详情成功');
}));

// ==================== 搜索歌曲 ====================
router.get('/search/all', asyncHandler(async (req, res) => {
  const { q, limit = 10 } = req.query;

  if (!q) {
    return sendError(res, '请输入搜索关键词', HTTP_STATUS.BAD_REQUEST);
  }

  const songs = await Music.find(
    { $text: { $search: q }, isPublished: true },
    { score: { $meta: 'textScore' } }
  )
    .sort({ score: { $meta: 'textScore' } })
    .limit(parseInt(limit));

  sendSuccess(res, songs, '搜索成功');
}));

// ==================== 创建歌曲 ====================
router.post(
  '/',
  verifyToken,
  [
    body('title').trim().isLength({ min: 1, max: 200 }).withMessage('标题长度 1-200 字符'),
    body('artist').trim().isLength({ min: 1 }).withMessage('艺术家名称不能为空'),
    body('duration').isInt({ min: 0 }).withMessage('时长必须是正整数'),
    body('url').isURL().withMessage('请输入有效的音乐 URL'),
    body('genre').optional().isIn(['流行', '摇滚', '民谣', '电子', '说唱', '其他']).withMessage('无效的音乐类型')
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, '输入参数无效', HTTP_STATUS.BAD_REQUEST, errors.array());
    }

    const { title, artist, album, duration, cover, url, genre, lyrics, description, tags } = req.body;

    const newMusic = new Music({
      title,
      artist,
      album,
      duration,
      cover,
      url,
      genre,
      lyrics,
      description,
      tags: tags || [],
      createdBy: req.userId
    });

    await newMusic.save();

    sendCreated(res, newMusic, '歌曲已创建');
  })
);

// ==================== 更新歌曲 ====================
router.put(
  '/:id',
  verifyToken,
  [
    body('title').optional().trim().isLength({ min: 1, max: 200 }).withMessage('标题长度 1-200 字符'),
    body('duration').optional().isInt({ min: 0 }).withMessage('时长必须是正整数')
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, '输入参数无效', HTTP_STATUS.BAD_REQUEST, errors.array());
    }

    const music = await Music.findById(req.params.id);

    if (!music) {
      return sendError(res, '歌曲不存在', HTTP_STATUS.NOT_FOUND);
    }

    // 仅创建者或管理员可编辑
    if (music.createdBy.toString() !== req.userId.toString() && req.user.role !== 'admin') {
      return sendError(res, '无权限修改该歌曲', HTTP_STATUS.FORBIDDEN);
    }

    const { title, artist, album, duration, cover, url, genre, lyrics, description, tags, isPublished } = req.body;

    Object.assign(music, {
      ...(title && { title }),
      ...(artist && { artist }),
      ...(album && { album }),
      ...(duration !== undefined && { duration }),
      ...(cover && { cover }),
      ...(url && { url }),
      ...(genre && { genre }),
      ...(lyrics && { lyrics }),
      ...(description && { description }),
      ...(tags && { tags }),
      ...(isPublished !== undefined && { isPublished })
    });

    await music.save();

    sendSuccess(res, music, '歌曲已更新');
  })
);

// ==================== 删除歌曲 ====================
router.delete('/:id', verifyToken, asyncHandler(async (req, res) => {
  const music = await Music.findById(req.params.id);

  if (!music) {
    return sendError(res, '歌曲不存在', HTTP_STATUS.NOT_FOUND);
  }

  // 仅创建者或管理员可删除
  if (music.createdBy.toString() !== req.userId.toString() && req.user.role !== 'admin') {
    return sendError(res, '无权限删除该歌曲', HTTP_STATUS.FORBIDDEN);
  }

  await Music.findByIdAndDelete(req.params.id);

  sendSuccess(res, null, '歌曲已删除');
}));

// ==================== 收藏歌曲 ====================
router.post('/:id/collect', verifyToken, asyncHandler(async (req, res) => {
  const music = await Music.findById(req.params.id);

  if (!music) {
    return sendError(res, '歌曲不存在', HTTP_STATUS.NOT_FOUND);
  }

  let interaction = await UserInteraction.findOne({ user: req.userId });

  if (!interaction) {
    interaction = new UserInteraction({ user: req.userId });
  }

  if (interaction.collectedSongs.includes(req.params.id)) {
    return sendError(res, '已经收藏过该歌曲', HTTP_STATUS.CONFLICT);
  }

  await interaction.collectSong(req.params.id);
  music.collections += 1;
  await music.save();

  sendSuccess(res, null, '歌曲已收藏');
}));

// ==================== 取消收藏 ====================
router.delete('/:id/collect', verifyToken, asyncHandler(async (req, res) => {
  const interaction = await UserInteraction.findOne({ user: req.userId });

  if (!interaction) {
    return sendError(res, '未找到用户交互数据', HTTP_STATUS.NOT_FOUND);
  }

  const music = await Music.findById(req.params.id);
  if (music && music.collections > 0) {
    music.collections -= 1;
    await music.save();
  }

  await interaction.uncollectSong(req.params.id);

  sendSuccess(res, null, '取消收藏成功');
}));

// ==================== 点赞歌曲 ====================
router.post('/:id/like', verifyToken, asyncHandler(async (req, res) => {
  const music = await Music.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: 1 } },
    { new: true }
  );

  if (!music) {
    return sendError(res, '歌曲不存在', HTTP_STATUS.NOT_FOUND);
  }

  sendSuccess(res, music, '已点赞');
}));

// ==================== 获取我的收藏 ====================
router.get('/collection/my', verifyToken, asyncHandler(async (req, res) => {
  const { page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.DEFAULT_LIMIT } = req.query;

  const pageNum = Math.min(parseInt(page) || PAGINATION.DEFAULT_PAGE, PAGINATION.MAX_LIMIT);
  const limitNum = Math.min(parseInt(limit) || PAGINATION.DEFAULT_LIMIT, PAGINATION.MAX_LIMIT);

  const interaction = await UserInteraction.findOne({ user: req.userId })
    .populate({
      path: 'collectedSongs',
      select: 'title artist album cover duration plays likes createdAt'
    });

  if (!interaction) {
    return sendPaginated(res, [], {
      page: pageNum,
      limit: limitNum,
      total: 0
    });
  }

  const total = interaction.collectedSongs.length;
  const songs = interaction.collectedSongs.slice(
    (pageNum - 1) * limitNum,
    pageNum * limitNum
  );

  sendPaginated(res, songs, {
    page: pageNum,
    limit: limitNum,
    total
  }, '获取收藏列表成功');
}));

export default router;

