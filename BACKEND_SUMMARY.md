# 🎵 林俊杰粉丝应用 - 后端完整指南

## 📋 项目概述

这是一个**完整的、生产级别的 Node.js + Express + MongoDB 后端应用**，为林俊杰粉丝应用提供 RESTful API 服务。

### 核心特点
- ✅ **49+ 个 API 端点**，覆盖所有业务需求
- ✅ **完整的用户认证系统**（JWT）
- ✅ **社区互动功能**（帖子、评论、点赞）
- ✅ **音乐库管理**（搜索、分类、统计）
- ✅ **关注系统**（粉丝、关注、统计）
- ✅ **歌单系统**（创建、管理、分享）
- ✅ **用户交互记录**（收藏、历史、偏好）

---

## 📁 项目文件结构

```
backend/
├── config/
│   └── database.js              # MongoDB 连接配置
├── middleware/
│   └── auth.js                  # JWT 认证中间件
├── models/
│   ├── User.js                  # 用户数据模型
│   ├── Music.js                 # 音乐数据模型
│   ├── Post.js                  # 帖子数据模型
│   ├── Comment.js               # 评论数据模型
│   ├── Playlist.js              # 歌单数据模型
│   └── UserInteraction.js       # 用户交互数据模型
├── routes/
│   ├── auth.js                  # 认证路由（注册、登录）
│   ├── users.js                 # 用户管理路由
│   ├── music.js                 # 音乐路由
│   ├── community.js             # 社区路由
│   ├── follow.js                # 关注路由
│   └── playlists.js             # 歌单路由
├── utils/
│   ├── constants.js             # 常量定义
│   └── response.js              # 响应工具函数
├── server.js                    # 主应用入口
├── package.json                 # 依赖管理
├── README.md                    # 完整文档
├── FEATURES.md                  # 功能清单
└── QUICK_REFERENCE.md           # 快速参考
```

---

## 🚀 快速开始

### 1. 安装依赖
```bash
cd backend
npm install
```

### 2. 配置环境
创建 `.env` 文件：
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/jm-love-jj
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

### 3. 启动服务
```bash
npm run dev      # 开发模式（带热重载）
npm start        # 生产模式
```

### 4. 验证服务
```bash
curl http://localhost:3000/api/health
```

---

## 📚 API 分类总览

### 🔐 认证模块 (`/api/auth`) - 4 个端点
- POST `/register` - 用户注册
- POST `/login` - 用户登录
- GET `/verify` - 验证令牌
- POST `/logout` - 用户登出

### 👤 用户模块 (`/api/users`) - 7 个端点
- GET `/` - 用户列表
- GET `/:id` - 用户信息
- GET `/:id/stats` - 用户统计
- GET `/:id/listen-history` - 听歌历史
- GET `/:id/posts` - 用户发帖
- PUT `/:id` - 更新信息
- DELETE `/:id` - 删除用户

### 🎵 音乐模块 (`/api/music`) - 10 个端点
- GET `/` - 歌曲列表
- GET `/search/all` - 搜索歌曲
- GET `/:id` - 歌曲详情
- POST `/` - 创建歌曲
- PUT `/:id` - 更新歌曲
- DELETE `/:id` - 删除歌曲
- POST `/:id/collect` - 收藏歌曲
- DELETE `/:id/collect` - 取消收藏
- POST `/:id/like` - 点赞
- GET `/collection/my` - 我的收藏

### 💬 社区模块 (`/api/community`) - 11 个端点
- GET `/posts` - 帖子列表
- POST `/posts` - 创建帖子
- GET `/posts/:id` - 帖子详情
- PUT `/posts/:id` - 更新帖子
- DELETE `/posts/:id` - 删除帖子
- POST `/posts/:id/like` - 点赞帖子
- POST `/posts/:id/comments` - 添加评论
- GET `/posts/:id/comments` - 评论列表
- DELETE `/comments/:id` - 删除评论
- POST `/comments/:id/like` - 点赞评论

### 👥 关注模块 (`/api/follow`) - 6 个端点
- POST `/:userId/follow` - 关注用户
- DELETE `/:userId/follow` - 取消关注
- GET `/:userId/following` - 关注列表
- GET `/:userId/followers` - 粉丝列表
- GET `/stats/my` - 我的统计
- GET `/:userId/check-follow` - 检查关注状态

### 🎵 歌单模块 (`/api/playlists`) - 11 个端点
- POST `/` - 创建歌单
- GET `/` - 公开歌单
- GET `/my/playlists` - 我的歌单
- GET `/:id` - 歌单详情
- PUT `/:id` - 更新歌单
- DELETE `/:id` - 删除歌单
- POST `/:playlistId/songs/:songId` - 添加歌曲
- DELETE `/:playlistId/songs/:songId` - 移除歌曲
- POST `/:id/follow` - 关注歌单
- DELETE `/:id/follow` - 取消关注

**总计：49+ 个 API 端点**

---

## 🛠️ 核心技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Node.js | - | JavaScript 运行时 |
| Express.js | 4.18 | Web 框架 |
| MongoDB | 7.5+ | 数据库 |
| Mongoose | 7.5+ | ODM 库 |
| JWT | 9.1.0 | 身份认证 |
| bcryptjs | 2.4.3 | 密码加密 |
| express-validator | 7.0.0 | 数据验证 |
| CORS | 2.8.5 | 跨域支持 |
| dotenv | 16.3.1 | 环境变量 |
| nodemon | 3.0.1 | 开发工具 |

---

## 🔒 安全特性

### 认证安全
- ✅ JWT 令牌认证（7 天有效期）
- ✅ 密码加盐加密（bcryptjs，10 轮）
- ✅ 令牌验证中间件
- ✅ 可选认证支持

### 数据安全
- ✅ 敏感字段不返回（密码）
- ✅ CORS 跨域控制
- ✅ 输入参数验证
- ✅ 业务规则验证

### 权限控制
- ✅ 基于角色的访问控制（RBAC）
- ✅ 用户权限验证
- ✅ 资源所有者检查
- ✅ 管理员权限检查

---

## 📊 数据模型

### User 模型
- 基本信息：username, email, password, nickname, avatar, bio
- 系统字段：role, isActive, lastLogin, timestamps

### Music 模型
- 基本信息：title, artist, album, duration, genre
- 媒体：cover, url, lyrics, description
- 统计：plays, likes, collections
- 管理：createdBy, isPublished, tags

### Post 模型
- 基本信息：title, content, category
- 媒体：coverImage
- 交互：likes (Array), likeCount, commentsCount
- 统计：viewsCount
- 管理：author, isPinned, isPublished, tags

### Comment 模型
- 基本信息：content
- 层级：author, post, parentComment
- 交互：likes (Array), likeCount
- 管理：isEdited, editedAt

### Playlist 模型
- 基本信息：name, description, creator
- 媒体：cover
- 内容：songs (Array)
- 交互：followers, isPublic
- 统计：followerCount, playCount

### UserInteraction 模型
- 收藏：collectedSongs (Array)
- 关系：following (Array), followers (Array)
- 内容：playlists (Array)
- 历史：listenHistory (Array, 最近100条)
- 偏好：preferences (theme, language, notifications)

---

## 🔍 搜索与索引

### 文本索引（全文搜索）
- Music：title, artist, tags
- Post：title, content, tags
- Playlist：name, description, tags
- User：username, nickname

### 性能索引
- User：email, username (unique)
- Music：createdBy, isPublished, plays, likes
- Post：author, category, isPinned
- Comment：author, post, parentComment
- Playlist：creator, isPublic, followerCount

---

## 📈 统计功能

### 用户统计
- 发帖数、创建音乐数
- 关注数、粉丝数
- 歌单数、收藏数
- 加入时间、最后登录

### 内容统计
- Music：播放次数、点赞数、收藏数
- Post：浏览数、点赞数、评论数
- Playlist：播放次数、粉丝数
- Comment：点赞数

---

## 🎯 关键特性详解

### 用户认证流程
1. 用户注册 → 密码加密 → 创建用户 → 返回 token
2. 用户登录 → 验证密码 → 生成 token → 返回 token
3. 调用 API → 验证 token → 获取用户信息 → 执行业务逻辑

### 社区互动流程
1. 创建帖子 → 发起人为 author
2. 发表评论 → 可指定父评论（嵌套评论）
3. 点赞帖子/评论 → 切换点赞状态（支持取消点赞）
4. 删除评论 → 级联删除子评论

### 音乐收藏流程
1. 浏览音乐 → 播放次数 +1
2. 收藏音乐 → 添加到 UserInteraction.collectedSongs
3. 点赞音乐 → likes +1（无切换）
4. 历史记录 → 自动记录并保持最近 100 条

### 关注系统流程
1. 关注用户 → following +1, followers +1
2. 取消关注 → 双向移除
3. 获取关注/粉丝 → 分页展示用户信息

---

## 📝 环境配置

### 开发环境（.env）
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/jm-love-jj
JWT_SECRET=dev_secret_key_change_in_production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

### 生产环境建议
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/jm-love-jj
JWT_SECRET=production_strong_secret_key_minimum_32_chars
JWT_EXPIRE=7d
CORS_ORIGIN=https://yourdomain.com
```

---

## 🧪 测试建议

### 推荐工具
- **Postman** - API 测试
- **MongoDB Compass** - 数据库管理
- **VS Code REST Client** - 轻量级测试

### 测试用例
```bash
# 1. 测试健康检查
curl http://localhost:3000/api/health

# 2. 用户注册
curl -X POST http://localhost:3000/api/auth/register ...

# 3. 获取用户列表
curl http://localhost:3000/api/users

# 4. 创建帖子（需要 token）
curl -X POST http://localhost:3000/api/community/posts \
  -H "Authorization: Bearer <token>" ...
```

---

## 🚨 常见问题解决

### MongoDB 连接失败
- 检查 MongoDB 是否运行
- 验证连接字符串
- 检查防火墙设置

### 端口被占用
```bash
# 查找占用 3000 端口的进程
lsof -i :3000
# 杀死进程
kill -9 <PID>
```

### token 过期
- 用户需要重新登录获取新 token

### CORS 错误
- 检查 CORS_ORIGIN 环境变量是否正确

---

## 📚 相关文档

- `README.md` - 完整的 API 文档和说明
- `FEATURES.md` - 详细的功能清单
- `QUICK_REFERENCE.md` - 快速参考卡片

---

## 🎓 学习资源

### 推荐阅读
- [Express.js 官方文档](https://expressjs.com/)
- [Mongoose 官方文档](https://mongoosejs.com/)
- [JWT 介绍](https://jwt.io/)
- [RESTful API 设计](https://restfulapi.net/)

### 扩展建议
- 添加请求日志系统
- 实现缓存机制（Redis）
- 添加速率限制
- 实现文件上传功能
- 添加邮件通知
- 实现实时通知（WebSocket）

---

## 🎯 下一步

### 前端集成
1. 配置前端 API 基础 URL
2. 集成用户认证流程
3. 实现各个功能模块
4. 测试前后端交互

### 运维部署
1. 准备服务器环境
2. 配置 MongoDB Atlas
3. 部署到云服务器
4. 配置域名和 SSL
5. 设置监控和日志

### 功能扩展
1. 实时通知系统
2. 文件上传服务
3. 消息系统
4. 直播功能
5. 推荐系统

---

## 📞 支持

如有问题或建议，请：
1. 查看相关文档
2. 检查错误日志
3. 提交 Issue

---

**🎵 祝林俊杰粉丝应用蓬勃发展！**

**后端已准备好迎接前端的联动了！** 🚀✨

