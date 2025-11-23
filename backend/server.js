import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// 加载环境变量
dotenv.config();

const app = express();

// ==================== 中间件 ====================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== 数据库连接 ====================
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/jm-love-jj';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB 连接成功');
  } catch (err) {
    console.error('❌ MongoDB 连接失败:', err.message);
    process.exit(1);
  }
};

connectDB();

// ==================== 基础路由 ====================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: '服务器运行正常',
    timestamp: new Date().toISOString(),
  });
});

// ==================== API 路由 ====================

// 用户认证路由
import authRoutes from './routes/auth.js';
app.use('/api/auth', authRoutes);

// 用户信息路由
import userRoutes from './routes/users.js';
app.use('/api/users', userRoutes);

// 音乐路由
import musicRoutes from './routes/music.js';
app.use('/api/music', musicRoutes);

// 社区路由
import communityRoutes from './routes/community.js';
app.use('/api/community', communityRoutes);

// 关注路由
import followRoutes from './routes/follow.js';
app.use('/api/follow', followRoutes);

// 歌单路由
import playlistRoutes from './routes/playlists.js';
app.use('/api/playlists', playlistRoutes);

// ==================== 错误处理 ====================
app.use((err, req, res, next) => {
  console.error('错误:', err);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || '服务器内部错误';
  
  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: '请求的资源不存在'
  });
});

// ==================== 启动服务器 ====================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
  ============================================
  🚀 服务器启动成功！
  📍 地址: http://localhost:${PORT}
  🔗 API: http://localhost:${PORT}/api
  ============================================
  `);
});

export default app;

