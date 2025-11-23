import express from 'express';
import { body, validationResult } from 'express-validator';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import verifyToken, { optionalAuth } from '../middleware/auth.js';
import { sendSuccess, sendCreated, sendError, sendPaginated, asyncHandler } from '../utils/response.js';
import { HTTP_STATUS, PAGINATION } from '../utils/constants.js';

const router = express.Router();

// ==================== 获取所有帖子 ====================
router.get('/posts', optionalAuth, asyncHandler(async (req, res) => {
  const { page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.DEFAULT_LIMIT, sort = 'newest', category, search } = req.query;

  const pageNum = Math.min(parseInt(page) || PAGINATION.DEFAULT_PAGE, PAGINATION.MAX_LIMIT);
  const limitNum = Math.min(parseInt(limit) || PAGINATION.DEFAULT_LIMIT, PAGINATION.MAX_LIMIT);

  const query = { isPublished: true };

  if (category) {
    query.category = category;
  }

  if (search) {
    query.$text = { $search: search };
  }

  let sortQuery = { isPinned: -1 };
  if (sort === 'popular') {
    sortQuery = { likeCount: -1 };
  } else {
    sortQuery = { ...sortQuery, createdAt: -1 };
  }

  const total = await Post.countDocuments(query);
  const posts = await Post.find(query)
    .sort(sortQuery)
    .limit(limitNum)
    .skip((pageNum - 1) * limitNum)
    .populate('author', 'username nickname avatar')
    .select('-likes');

  sendPaginated(res, posts, {
    page: pageNum,
    limit: limitNum,
    total
  }, '获取帖子列表成功');
}));

// ==================== 创建帖子 ====================
router.post(
  '/posts',
  verifyToken,
  [
    body('title').trim().isLength({ min: 1, max: 200 }).withMessage('标题长度 1-200 字符'),
    body('content').trim().isLength({ min: 1, max: 5000 }).withMessage('内容长度 1-5000 字符'),
    body('category').optional().isIn(['分享', '讨论', '求助', '新闻', '活动']).withMessage('无效的分类')
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, '输入参数无效', HTTP_STATUS.BAD_REQUEST, errors.array());
    }

    const { title, content, category = '分享', tags = [], coverImage } = req.body;

    const newPost = new Post({
      title,
      content,
      category,
      tags,
      coverImage,
      author: req.userId
    });

    await newPost.save();
    await newPost.populate('author', 'username nickname avatar');

    sendCreated(res, newPost, '帖子已创建');
  })
);

// ==================== 获取帖子详情 ====================
router.get('/posts/:id', optionalAuth, asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { $inc: { viewsCount: 1 } },
    { new: true }
  )
    .populate('author', 'username nickname avatar bio')
    .populate({
      path: 'comments',
      populate: { path: 'author', select: 'username nickname avatar' }
    });

  if (!post) {
    return sendError(res, '帖子不存在', HTTP_STATUS.NOT_FOUND);
  }

  sendSuccess(res, post, '获取帖子详情成功');
}));

// ==================== 更新帖子 ====================
router.put(
  '/posts/:id',
  verifyToken,
  [
    body('title').optional().trim().isLength({ min: 1, max: 200 }).withMessage('标题长度 1-200 字符'),
    body('content').optional().trim().isLength({ min: 1, max: 5000 }).withMessage('内容长度 1-5000 字符')
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, '输入参数无效', HTTP_STATUS.BAD_REQUEST, errors.array());
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return sendError(res, '帖子不存在', HTTP_STATUS.NOT_FOUND);
    }

    // 仅作者或管理员可编辑
    if (post.author.toString() !== req.userId.toString() && req.user.role !== 'admin') {
      return sendError(res, '无权限修改该帖子', HTTP_STATUS.FORBIDDEN);
    }

    const { title, content, category, tags } = req.body;

    Object.assign(post, {
      ...(title && { title }),
      ...(content && { content }),
      ...(category && { category }),
      ...(tags && { tags })
    });

    await post.save();

    sendSuccess(res, post, '帖子已更新');
  })
);

// ==================== 删除帖子 ====================
router.delete('/posts/:id', verifyToken, asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return sendError(res, '帖子不存在', HTTP_STATUS.NOT_FOUND);
  }

  // 仅作者或管理员可删除
  if (post.author.toString() !== req.userId.toString() && req.user.role !== 'admin') {
    return sendError(res, '无权限删除该帖子', HTTP_STATUS.FORBIDDEN);
  }

  // 删除相关评论
  await Comment.deleteMany({ post: req.params.id });

  await Post.findByIdAndDelete(req.params.id);

  sendSuccess(res, null, '帖子已删除');
}));

// ==================== 点赞帖子 ====================
router.post('/posts/:id/like', verifyToken, asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return sendError(res, '帖子不存在', HTTP_STATUS.NOT_FOUND);
  }

  const hasLiked = post.likes.includes(req.userId);

  if (hasLiked) {
    // 取消点赞
    await Post.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.userId }, $inc: { likeCount: -1 } },
      { new: true }
    );
    sendSuccess(res, null, '已取消点赞');
  } else {
    // 点赞
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $push: { likes: req.userId }, $inc: { likeCount: 1 } },
      { new: true }
    );
    sendSuccess(res, updatedPost, '已点赞');
  }
}));

// ==================== 添加评论 ====================
router.post(
  '/posts/:id/comments',
  verifyToken,
  [body('content').trim().isLength({ min: 1, max: 2000 }).withMessage('评论长度 1-2000 字符')],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, '输入参数无效', HTTP_STATUS.BAD_REQUEST, errors.array());
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return sendError(res, '帖子不存在', HTTP_STATUS.NOT_FOUND);
    }

    const { content, parentCommentId } = req.body;

    const newComment = new Comment({
      content,
      author: req.userId,
      post: req.params.id,
      parentComment: parentCommentId || null
    });

    await newComment.save();
    await newComment.populate('author', 'username nickname avatar');

    // 更新帖子评论计数
    await Post.updateOne(
      { _id: req.params.id },
      { $inc: { commentsCount: 1 } }
    );

    sendCreated(res, newComment, '评论已创建');
  })
);

// ==================== 获取评论 ====================
router.get('/posts/:id/comments', optionalAuth, asyncHandler(async (req, res) => {
  const { page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.DEFAULT_LIMIT } = req.query;

  const pageNum = Math.min(parseInt(page) || PAGINATION.DEFAULT_PAGE, PAGINATION.MAX_LIMIT);
  const limitNum = Math.min(parseInt(limit) || PAGINATION.DEFAULT_LIMIT, PAGINATION.MAX_LIMIT);

  const total = await Comment.countDocuments({ post: req.params.id, parentComment: null });
  const comments = await Comment.find({ post: req.params.id, parentComment: null })
    .populate('author', 'username nickname avatar')
    .populate({
      path: 'replies',
      populate: { path: 'author', select: 'username nickname avatar' }
    })
    .sort({ createdAt: -1 })
    .limit(limitNum)
    .skip((pageNum - 1) * limitNum);

  sendPaginated(res, comments, {
    page: pageNum,
    limit: limitNum,
    total
  }, '获取评论成功');
}));

// ==================== 删除评论 ====================
router.delete('/comments/:id', verifyToken, asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return sendError(res, '评论不存在', HTTP_STATUS.NOT_FOUND);
  }

  // 仅作者或管理员可删除
  if (comment.author.toString() !== req.userId.toString() && req.user.role !== 'admin') {
    return sendError(res, '无权限删除该评论', HTTP_STATUS.FORBIDDEN);
  }

  await Comment.findByIdAndDelete(req.params.id);

  // 更新帖子评论计数
  await Post.updateOne(
    { _id: comment.post },
    { $inc: { commentsCount: -1 } }
  );

  sendSuccess(res, null, '评论已删除');
}));

// ==================== 点赞评论 ====================
router.post('/comments/:id/like', verifyToken, asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return sendError(res, '评论不存在', HTTP_STATUS.NOT_FOUND);
  }

  const hasLiked = comment.likes.includes(req.userId);

  if (hasLiked) {
    await Comment.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.userId }, $inc: { likeCount: -1 } },
      { new: true }
    );
    sendSuccess(res, null, '已取消点赞');
  } else {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $push: { likes: req.userId }, $inc: { likeCount: 1 } },
      { new: true }
    );
    sendSuccess(res, updatedComment, '已点赞');
  }
}));

export default router;

