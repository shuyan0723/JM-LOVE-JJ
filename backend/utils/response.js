import { HTTP_STATUS } from './constants.js';

/**
 * 成功响应
 */
export const sendSuccess = (res, data = null, message = '请求成功', statusCode = HTTP_STATUS.OK) => {
  res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

/**
 * 创建成功响应
 */
export const sendCreated = (res, data = null, message = '创建成功') => {
  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message,
    data
  });
};

/**
 * 错误响应
 */
export const sendError = (res, message = '请求失败', statusCode = HTTP_STATUS.BAD_REQUEST, errors = null) => {
  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors })
  });
};

/**
 * 分页响应
 */
export const sendPaginated = (res, data = [], pagination = {}, message = '请求成功') => {
  res.json({
    success: true,
    message,
    data,
    pagination: {
      page: pagination.page || 1,
      limit: pagination.limit || 20,
      total: pagination.total || 0,
      pages: Math.ceil((pagination.total || 0) / (pagination.limit || 20))
    }
  });
};

/**
 * 异常处理器（包装中间件）
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default {
  sendSuccess,
  sendCreated,
  sendError,
  sendPaginated,
  asyncHandler
};

