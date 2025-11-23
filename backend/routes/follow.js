import express from 'express';
import User from '../models/User.js';
import UserInteraction from '../models/UserInteraction.js';
import verifyToken from '../middleware/auth.js';
import { sendSuccess, sendError, sendPaginated, asyncHandler } from '../utils/response.js';
import { HTTP_STATUS, PAGINATION } from '../utils/constants.js';

const router = express.Router();

// ==================== 关注用户 ====================
router.post('/:userId/follow', verifyToken, asyncHandler(async (req, res) => {
  if (req.params.userId === req.userId.toString()) {
    return sendError(res, '不能关注自己', HTTP_STATUS.BAD_REQUEST);
  }

  const targetUser = await User.findById(req.params.userId);
  if (!targetUser) {
    return sendError(res, '用户不存在', HTTP_STATUS.NOT_FOUND);
  }

  let currentUserInteraction = await UserInteraction.findOne({ user: req.userId });
  let targetUserInteraction = await UserInteraction.findOne({ user: req.params.userId });

  if (!currentUserInteraction) {
    currentUserInteraction = new UserInteraction({ user: req.userId });
  }
  if (!targetUserInteraction) {
    targetUserInteraction = new UserInteraction({ user: req.params.userId });
  }

  if (currentUserInteraction.following.includes(req.params.userId)) {
    return sendError(res, '已经关注过该用户', HTTP_STATUS.CONFLICT);
  }

  await currentUserInteraction.followUser(req.params.userId);

  sendSuccess(res, null, '已关注该用户');
}));

// ==================== 取消关注 ====================
router.delete('/:userId/follow', verifyToken, asyncHandler(async (req, res) => {
  const interaction = await UserInteraction.findOne({ user: req.userId });

  if (!interaction) {
    return sendError(res, '未找到用户交互数据', HTTP_STATUS.NOT_FOUND);
  }

  await interaction.unfollowUser(req.params.userId);

  sendSuccess(res, null, '已取消关注');
}));

// ==================== 获取关注列表 ====================
router.get('/:userId/following', asyncHandler(async (req, res) => {
  const { page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.DEFAULT_LIMIT } = req.query;

  const pageNum = Math.min(parseInt(page) || PAGINATION.DEFAULT_PAGE, PAGINATION.MAX_LIMIT);
  const limitNum = Math.min(parseInt(limit) || PAGINATION.DEFAULT_LIMIT, PAGINATION.MAX_LIMIT);

  const interaction = await UserInteraction.findOne({ user: req.params.userId })
    .populate({
      path: 'following',
      select: 'username nickname avatar bio'
    });

  if (!interaction) {
    return sendPaginated(res, [], {
      page: pageNum,
      limit: limitNum,
      total: 0
    }, '获取关注列表成功');
  }

  const total = interaction.following.length;
  const users = interaction.following.slice(
    (pageNum - 1) * limitNum,
    pageNum * limitNum
  );

  sendPaginated(res, users, {
    page: pageNum,
    limit: limitNum,
    total
  }, '获取关注列表成功');
}));

// ==================== 获取粉丝列表 ====================
router.get('/:userId/followers', asyncHandler(async (req, res) => {
  const { page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.DEFAULT_LIMIT } = req.query;

  const pageNum = Math.min(parseInt(page) || PAGINATION.DEFAULT_PAGE, PAGINATION.MAX_LIMIT);
  const limitNum = Math.min(parseInt(limit) || PAGINATION.DEFAULT_LIMIT, PAGINATION.MAX_LIMIT);

  const interaction = await UserInteraction.findOne({ user: req.params.userId })
    .populate({
      path: 'followers',
      select: 'username nickname avatar bio'
    });

  if (!interaction) {
    return sendPaginated(res, [], {
      page: pageNum,
      limit: limitNum,
      total: 0
    }, '获取粉丝列表成功');
  }

  const total = interaction.followers.length;
  const users = interaction.followers.slice(
    (pageNum - 1) * limitNum,
    pageNum * limitNum
  );

  sendPaginated(res, users, {
    page: pageNum,
    limit: limitNum,
    total
  }, '获取粉丝列表成功');
}));

// ==================== 获取我的关注统计 ====================
router.get('/stats/my', verifyToken, asyncHandler(async (req, res) => {
  const interaction = await UserInteraction.findOne({ user: req.userId });

  const stats = {
    followingCount: interaction?.following.length || 0,
    followerCount: interaction?.followers.length || 0,
    playlistCount: interaction?.playlists.length || 0,
    collectedSongsCount: interaction?.collectedSongs.length || 0
  };

  sendSuccess(res, stats, '获取统计信息成功');
}));

// ==================== 检查是否关注 ====================
router.get('/:userId/check-follow', verifyToken, asyncHandler(async (req, res) => {
  const interaction = await UserInteraction.findOne({ user: req.userId });

  const isFollowing = interaction?.following.includes(req.params.userId) || false;

  sendSuccess(res, { isFollowing }, '检查完成');
}));

export default router;

