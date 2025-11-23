import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import UserInteraction from '../models/UserInteraction.js';
import Post from '../models/Post.js';
import Music from '../models/Music.js';
import verifyToken, { optionalAuth } from '../middleware/auth.js';
import { sendSuccess, sendError, sendPaginated, asyncHandler } from '../utils/response.js';
import { HTTP_STATUS, PAGINATION } from '../utils/constants.js';

const router = express.Router();

// ==================== 获取用户信息 ====================
router.get('/:id', optionalAuth, asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return sendError(res, '用户不存在', HTTP_STATUS.NOT_FOUND);
  }

  sendSuccess(res, user.toJSON(), '获取用户信息成功');
}));

// ==================== 更新用户信息 ====================
router.put(
  '/:id',
  verifyToken,
  [
    body('nickname').optional().trim().isLength({ min: 1 }).withMessage('昵称不能为空'),
    body('bio').optional().trim().isLength({ max: 500 }).withMessage('个人简介最多 500 个字符')
  ],
  asyncHandler(async (req, res) => {
    // 只允许用户更新自己的信息或管理员更新任何人
    if (req.userId.toString() !== req.params.id && req.user.role !== 'admin') {
      return sendError(res, '无权限修改该用户信息', HTTP_STATUS.FORBIDDEN);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, '输入参数无效', HTTP_STATUS.BAD_REQUEST, errors.array());
    }

    const { nickname, bio, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { nickname, bio, avatar },
      { new: true, runValidators: true }
    );

    if (!user) {
      return sendError(res, '用户不存在', HTTP_STATUS.NOT_FOUND);
    }

    sendSuccess(res, user.toJSON(), '用户信息已更新');
  })
);

// ==================== 获取用户列表 ====================
router.get('/', asyncHandler(async (req, res) => {
  const { page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.DEFAULT_LIMIT, search } = req.query;

  const pageNum = Math.min(parseInt(page) || PAGINATION.DEFAULT_PAGE, PAGINATION.MAX_LIMIT);
  const limitNum = Math.min(parseInt(limit) || PAGINATION.DEFAULT_LIMIT, PAGINATION.MAX_LIMIT);

  const query = {};

  if (search) {
    query.$or = [
      { username: { $regex: search, $options: 'i' } },
      { nickname: { $regex: search, $options: 'i' } }
    ];
  }

  const total = await User.countDocuments(query);
  const users = await User.find(query)
    .limit(limitNum)
    .skip((pageNum - 1) * limitNum)
    .sort({ createdAt: -1 });

  sendPaginated(res, users.map(u => u.toJSON()), {
    page: pageNum,
    limit: limitNum,
    total
  }, '获取用户列表成功');
}));

// ==================== 删除用户（仅管理员） ====================
router.delete('/:id', verifyToken, asyncHandler(async (req, res) => {
  // 只有管理员可以删除用户
  if (req.user.role !== 'admin') {
    return sendError(res, '只有管理员可以删除用户', HTTP_STATUS.FORBIDDEN);
  }

  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return sendError(res, '用户不存在', HTTP_STATUS.NOT_FOUND);
  }

  sendSuccess(res, null, '用户已删除');
}));

// ==================== 获取用户统计 ====================
router.get('/:id/stats', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return sendError(res, '用户不存在', HTTP_STATUS.NOT_FOUND);
  }

  const interaction = await UserInteraction.findOne({ user: req.params.id });
  const postsCount = await Post.countDocuments({ author: req.params.id });
  const musicsCount = await Music.countDocuments({ createdBy: req.params.id });

  const stats = {
    userId: req.params.id,
    username: user.username,
    nickname: user.nickname,
    avatar: user.avatar,
    postsCount,
    musicsCount,
    followingCount: interaction?.following.length || 0,
    followerCount: interaction?.followers.length || 0,
    playlistCount: interaction?.playlists.length || 0,
    collectedSongsCount: interaction?.collectedSongs.length || 0,
    joinDate: user.createdAt,
    lastLogin: user.lastLogin
  };

  sendSuccess(res, stats, '获取用户统计成功');
}));

// ==================== 获取用户的听歌历史 ====================
router.get('/:id/listen-history', asyncHandler(async (req, res) => {
  const { page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.DEFAULT_LIMIT } = req.query;

  const pageNum = Math.min(parseInt(page) || PAGINATION.DEFAULT_PAGE, PAGINATION.MAX_LIMIT);
  const limitNum = Math.min(parseInt(limit) || PAGINATION.DEFAULT_LIMIT, PAGINATION.MAX_LIMIT);

  const interaction = await UserInteraction.findOne({ user: req.params.id })
    .populate({
      path: 'listenHistory.music',
      select: 'title artist album cover duration'
    });

  if (!interaction) {
    return sendPaginated(res, [], {
      page: pageNum,
      limit: limitNum,
      total: 0
    }, '获取历史记录成功');
  }

  const total = interaction.listenHistory.length;
  const history = interaction.listenHistory.slice(
    (pageNum - 1) * limitNum,
    pageNum * limitNum
  );

  sendPaginated(res, history, {
    page: pageNum,
    limit: limitNum,
    total
  }, '获取历史记录成功');
}));

// ==================== 获取用户的帖子 ====================
router.get('/:id/posts', asyncHandler(async (req, res) => {
  const { page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.DEFAULT_LIMIT } = req.query;

  const pageNum = Math.min(parseInt(page) || PAGINATION.DEFAULT_PAGE, PAGINATION.MAX_LIMIT);
  const limitNum = Math.min(parseInt(limit) || PAGINATION.DEFAULT_LIMIT, PAGINATION.MAX_LIMIT);

  const total = await Post.countDocuments({ author: req.params.id, isPublished: true });
  const posts = await Post.find({ author: req.params.id, isPublished: true })
    .sort({ createdAt: -1 })
    .limit(limitNum)
    .skip((pageNum - 1) * limitNum)
    .populate('author', 'username nickname avatar');

  sendPaginated(res, posts, {
    page: pageNum,
    limit: limitNum,
    total
  }, '获取用户帖子成功');
}));

export default router;

