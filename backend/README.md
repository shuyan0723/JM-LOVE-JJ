# 林俊杰粉丝应用 - 后端服务

这是 **JM Love JJ** 项目的 Node.js + Express 后端服务。提供完整的 RESTful API，支持用户认证、音乐管理、社区互动、歌单系统等功能。

## 📁 项目结构

```
backend/
├── config/                 # 配置文件
│   └── database.js        # 数据库连接配置
├── middleware/            # 中间件
│   └── auth.js            # JWT 认证中间件
├── models/                # MongoDB 数据模型
│   ├── User.js            # 用户模型
│   ├── Music.js           # 音乐模型
│   ├── Post.js            # 帖子模型
│   ├── Comment.js         # 评论模型
│   ├── Playlist.js        # 歌单模型
│   └── UserInteraction.js # 用户交互模型
├── routes/                # API 路由
│   ├── auth.js            # 认证路由
│   ├── users.js           # 用户管理路由
│   ├── music.js           # 音乐路由
│   ├── community.js       # 社区帖子路由
│   ├── follow.js          # 关注路由
│   └── playlists.js       # 歌单路由
├── utils/                 # 工具函数
│   ├── constants.js       # 常量定义
│   └── response.js        # 响应格式化
├── server.js              # 主入口文件
├── package.json           # 项目依赖
└── README.md              # 本文件
```

## 🚀 快速开始

### 1. 安装依赖

```bash
cd backend
npm install
```

### 2. 配置环境变量

创建 `.env` 文件：

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/jm-love-jj
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

### 3. 启动开发服务器

```bash
npm run dev
```

或启动生产服务器：

```bash
npm start
```

服务器将在 `http://localhost:3000` 运行。

## 📚 完整 API 文档

### 🔐 认证 (`/api/auth`)

#### 注册
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "ljj_fan",
  "email": "fan@example.com",
  "password": "password123"
}

响应 (201):
{
  "success": true,
  "message": "注册成功",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "data": {
    "_id": "...",
    "username": "ljj_fan",
    "email": "fan@example.com",
    "nickname": "ljj_fan",
    "avatar": null,
    "role": "user"
  }
}
```

#### 登录
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "fan@example.com",
  "password": "password123"
}

响应 (200):
{
  "success": true,
  "message": "登录成功",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "data": { ... }
}
```

#### 验证令牌
```http
GET /api/auth/verify
Authorization: Bearer <your_token>

响应 (200):
{
  "success": true,
  "data": { ... }
}
```

### 👤 用户 (`/api/users`)

#### 获取用户列表
```http
GET /api/users?page=1&limit=20&search=keyword
```

#### 获取用户信息
```http
GET /api/users/:id
```

#### 更新用户信息
```http
PUT /api/users/:id
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "nickname": "新昵称",
  "bio": "个人简介",
  "avatar": "头像URL"
}
```

#### 删除用户（管理员）
```http
DELETE /api/users/:id
Authorization: Bearer <admin_token>
```

### 🎵 音乐 (`/api/music`)

#### 获取歌曲列表
```http
GET /api/music?page=1&limit=20&sort=newest&genre=流行&search=keyword

查询参数:
- page: 页码（默认1）
- limit: 每页数量（默认20）
- sort: 排序方式（newest/popular/trending/oldest）
- genre: 音乐类型（流行/摇滚/民谣/电子/说唱/其他）
- search: 搜索关键词
```

#### 获取单曲详情
```http
GET /api/music/:id
```

#### 搜索歌曲
```http
GET /api/music/search/all?q=关键词&limit=10
```

#### 创建歌曲（用户）
```http
POST /api/music
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "title": "歌曲名称",
  "artist": "艺术家",
  "album": "专辑",
  "duration": 240,
  "genre": "流行",
  "cover": "封面URL",
  "url": "音乐文件URL",
  "lyrics": "歌词",
  "description": "描述",
  "tags": ["标签1", "标签2"]
}
```

#### 更新歌曲
```http
PUT /api/music/:id
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "title": "新标题",
  "description": "新描述"
}
```

#### 删除歌曲
```http
DELETE /api/music/:id
Authorization: Bearer <your_token>
```

#### 收藏歌曲
```http
POST /api/music/:id/collect
Authorization: Bearer <your_token>
```

#### 取消收藏
```http
DELETE /api/music/:id/collect
Authorization: Bearer <your_token>
```

#### 点赞歌曲
```http
POST /api/music/:id/like
Authorization: Bearer <your_token>
```

#### 获取我的收藏
```http
GET /api/music/collection/my?page=1&limit=20
Authorization: Bearer <your_token>
```

### 💬 社区 (`/api/community`)

#### 获取帖子列表
```http
GET /api/community/posts?page=1&limit=10&sort=newest&category=分享&search=keyword

查询参数:
- sort: newest/popular
- category: 分享/讨论/求助/新闻/活动
```

#### 创建帖子
```http
POST /api/community/posts
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "title": "帖子标题",
  "content": "帖子内容",
  "category": "分享",
  "tags": ["标签1"],
  "coverImage": "封面URL"
}
```

#### 获取帖子详情
```http
GET /api/community/posts/:id
```

#### 更新帖子
```http
PUT /api/community/posts/:id
Authorization: Bearer <your_token>

{
  "title": "新标题",
  "content": "新内容"
}
```

#### 删除帖子
```http
DELETE /api/community/posts/:id
Authorization: Bearer <your_token>
```

#### 点赞帖子
```http
POST /api/community/posts/:id/like
Authorization: Bearer <your_token>
```

#### 添加评论
```http
POST /api/community/posts/:id/comments
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "content": "评论内容",
  "parentCommentId": null  // 子评论时填入父评论ID
}
```

#### 获取评论列表
```http
GET /api/community/posts/:id/comments?page=1&limit=20
```

#### 删除评论
```http
DELETE /api/community/comments/:id
Authorization: Bearer <your_token>
```

#### 点赞评论
```http
POST /api/community/comments/:id/like
Authorization: Bearer <your_token>
```

### 👥 关注 (`/api/follow`)

#### 关注用户
```http
POST /api/follow/:userId/follow
Authorization: Bearer <your_token>
```

#### 取消关注
```http
DELETE /api/follow/:userId/follow
Authorization: Bearer <your_token>
```

#### 获取关注列表
```http
GET /api/follow/:userId/following?page=1&limit=20
```

#### 获取粉丝列表
```http
GET /api/follow/:userId/followers?page=1&limit=20
```

#### 获取我的统计
```http
GET /api/follow/stats/my
Authorization: Bearer <your_token>
```

#### 检查关注状态
```http
GET /api/follow/:userId/check-follow
Authorization: Bearer <your_token>
```

### 🎵 歌单 (`/api/playlists`)

#### 创建歌单
```http
POST /api/playlists
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "name": "我的歌单",
  "description": "歌单描述",
  "isPublic": true,
  "cover": "封面URL"
}
```

#### 获取公开歌单
```http
GET /api/playlists?page=1&limit=20&sort=newest&search=keyword
```

#### 获取我的歌单
```http
GET /api/playlists/my/playlists?page=1&limit=20
Authorization: Bearer <your_token>
```

#### 获取歌单详情
```http
GET /api/playlists/:id
```

#### 更新歌单
```http
PUT /api/playlists/:id
Authorization: Bearer <your_token>

{
  "name": "新名称",
  "description": "新描述",
  "isPublic": false
}
```

#### 删除歌单
```http
DELETE /api/playlists/:id
Authorization: Bearer <your_token>
```

#### 添加歌曲到歌单
```http
POST /api/playlists/:playlistId/songs/:songId
Authorization: Bearer <your_token>
```

#### 从歌单移除歌曲
```http
DELETE /api/playlists/:playlistId/songs/:songId
Authorization: Bearer <your_token>
```

#### 关注歌单
```http
POST /api/playlists/:id/follow
Authorization: Bearer <your_token>
```

#### 取消关注歌单
```http
DELETE /api/playlists/:id/follow
Authorization: Bearer <your_token>
```

## 🔐 认证说明

大多数 API 需要 JWT 令牌进行认证。获取令牌后，在请求头中添加：

```
Authorization: Bearer <your_token>
```

令牌将在 7 天后过期，需要重新登录。

## 💾 数据库

项目使用 **MongoDB**。支持本地和云数据库：

### 本地 MongoDB
```bash
# 安装 MongoDB
# Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
# macOS: brew install mongodb-community
# Linux: apt-get install mongodb

# 启动 MongoDB
mongod
```

### MongoDB Atlas（云数据库）
1. 注册 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. 创建数据库集群
3. 获取连接字符串
4. 在 `.env` 中配置 `MONGODB_URI`

## 🛠️ 技术栈

- **Express.js 4.18** - Web 框架
- **MongoDB 7.5** - 数据库
- **Mongoose** - ODM（对象数据建模）
- **JWT** - 身份认证
- **bcryptjs** - 密码加密
- **express-validator** - 数据验证
- **CORS** - 跨域资源共享

## ✨ 主要功能

- ✅ 用户认证与授权（JWT）
- ✅ 角色管理（用户/版主/管理员）
- ✅ 密码加密存储
- ✅ 音乐库管理与搜索
- ✅ 社区帖子系统
- ✅ 嵌套评论系统
- ✅ 点赞与收藏功能
- ✅ 用户关注系统
- ✅ 歌单创建与管理
- ✅ 听歌历史记录
- ✅ 完整的数据验证
- ✅ 全文搜索支持
- ✅ 分页与排序

## 📊 数据模型关系

```
User (用户)
  ├── created Music (创建的音乐)
  ├── created Post (创建的帖子)
  ├── created Comment (创建的评论)
  └── UserInteraction (交互数据)
      ├── collectedSongs (收藏的歌曲)
      ├── following (关注的用户)
      ├── followers (粉丝)
      ├── playlists (歌单)
      └── listenHistory (听歌历史)

Post (帖子)
  ├── author (作者)
  ├── likes (点赞用户列表)
  └── comments (评论)

Comment (评论)
  ├── author (作者)
  ├── post (所属帖子)
  ├── parentComment (父评论-支持嵌套)
  ├── likes (点赞用户列表)
  └── replies (回复评论)

Playlist (歌单)
  ├── creator (创建者)
  ├── songs (包含的歌曲)
  └── followers (关注用户)

Music (音乐)
  ├── createdBy (创建者)
  └── tags (标签)
```

## 🔍 搜索功能

支持全文搜索，需要在 MongoDB 中创建文本索引。模型已自动创建，示例：

```javascript
// Music 搜索
GET /api/music/search/all?q=林俊杰

// Post 搜索
GET /api/community/posts?search=分享

// Playlist 搜索
GET /api/playlists?search=我的收藏
```

## 📈 统计数据

每个资源都记录相关统计：
- `Music`: plays（播放次数）、likes（点赞数）、collections（收藏数）
- `Post`: viewsCount（浏览数）、likeCount（点赞数）、commentsCount（评论数）
- `Playlist`: playCount（播放次数）、followerCount（粉丝数）
- `User`: 通过 UserInteraction 获取用户统计

## 🚨 错误处理

API 返回标准错误响应：

```json
{
  "success": false,
  "message": "错误描述",
  "errors": []  // 验证错误详情
}
```

HTTP 状态码：
- `200` - 成功
- `201` - 创建成功
- `400` - 请求参数错误
- `401` - 未授权
- `403` - 禁止访问
- `404` - 资源不存在
- `409` - 冲突（如重复操作）
- `500` - 服务器错误

## 📝 环境变量说明

| 变量 | 说明 | 示例 |
|------|------|------|
| NODE_ENV | 运行环境 | development/production |
| PORT | 服务器端口 | 3000 |
| MONGODB_URI | 数据库连接字符串 | mongodb://localhost:27017/jm-love-jj |
| JWT_SECRET | JWT 密钥 | your_secret_key |
| JWT_EXPIRE | JWT 过期时间 | 7d |
| CORS_ORIGIN | 跨域允许源 | http://localhost:5173 |

## 🔄 前后端通信

前端需要配置 API 基础 URL。在前端 `.env` 中设置：

```env
VITE_API_URL=http://localhost:3000/api
```

## 📞 支持和贡献

如有问题或建议，欢迎提交 Issue 或 Pull Request。

---

**祝林俊杰粉丝应用蓬勃发展！** 🎵🌟
