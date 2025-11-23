import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

// ==================== 注册 ====================
router.post(
  '/register',
  [
    body('username').trim().isLength({ min: 3 }).withMessage('用户名至少 3 个字符'),
    body('email').isEmail().withMessage('请输入有效的邮箱地址'),
    body('password').isLength({ min: 6 }).withMessage('密码至少 6 个字符')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const { username, email, password } = req.body;

      // 检查用户是否已存在
      let user = await User.findOne({
        $or: [{ email }, { username }]
      });

      if (user) {
        return res.status(400).json({
          success: false,
          error: '用户已存在'
        });
      }

      // 创建新用户
      user = new User({
        username,
        email,
        password,
        nickname: username
      });

      await user.save();

      // 生成 JWT
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
      );

      res.status(201).json({
        success: true,
        message: '注册成功',
        token,
        user: user.toJSON()
      });
    } catch (error) {
      console.error('注册错误:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
);

// ==================== 登录 ====================
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('请输入有效的邮箱地址'),
    body('password').exists().withMessage('请输入密码')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const { email, password } = req.body;

      // 查找用户
      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        return res.status(401).json({
          success: false,
          error: '邮箱或密码错误'
        });
      }

      // 验证密码
      const isPasswordMatch = await user.comparePassword(password);

      if (!isPasswordMatch) {
        return res.status(401).json({
          success: false,
          error: '邮箱或密码错误'
        });
      }

      // 更新最后登录时间
      user.lastLogin = new Date();
      await user.save();

      // 生成 JWT
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
      );

      res.json({
        success: true,
        message: '登录成功',
        token,
        user: user.toJSON()
      });
    } catch (error) {
      console.error('登录错误:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
);

// ==================== 验证令牌 ====================
router.get('/verify', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: '用户不存在'
      });
    }

    res.json({
      success: true,
      user: user.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ==================== 登出 ====================
router.post('/logout', verifyToken, (req, res) => {
  // 前端应删除本地存储的令牌
  res.json({
    success: true,
    message: '登出成功'
  });
});

export default router;

