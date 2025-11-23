// 用户角色
export const USER_ROLES = {
  USER: 'user',
  MODERATOR: 'moderator',
  ADMIN: 'admin'
};

// 响应状态码
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500
};

// 错误消息
export const ERROR_MESSAGES = {
  UNAUTHORIZED: '未授权，请登录',
  FORBIDDEN: '禁止访问',
  NOT_FOUND: '资源不存在',
  INVALID_INPUT: '输入参数无效',
  DUPLICATE_EMAIL: '邮箱已被注册',
  DUPLICATE_USERNAME: '用户名已被使用',
  INVALID_PASSWORD: '密码错误',
  TOKEN_INVALID: '令牌无效或已过期',
  INTERNAL_ERROR: '服务器内部错误',
  USER_NOT_FOUND: '用户不存在',
  MUSIC_NOT_FOUND: '音乐不存在',
  POST_NOT_FOUND: '帖子不存在',
  COMMENT_NOT_FOUND: '评论不存在',
  PLAYLIST_NOT_FOUND: '歌单不存在',
  ALREADY_LIKED: '已经点过赞了',
  ALREADY_FOLLOWED: '已经关注过了',
  ALREADY_COLLECTED: '已经收藏过了'
};

// 分页默认值
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100
};

// 排序类型
export const SORT_TYPES = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  POPULAR: 'popular',
  TRENDING: 'trending'
};

export default {
  USER_ROLES,
  HTTP_STATUS,
  ERROR_MESSAGES,
  PAGINATION,
  SORT_TYPES
};

