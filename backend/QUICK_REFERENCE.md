# 🎯 后端 API 快速参考

## 🚀 启动服务

```bash
cd backend
npm install
npm run dev  # 开发模式
npm start    # 生产模式
```

**服务运行地址**：`http://localhost:3000`

---

## 🔐 认证示例

### 注册
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "ljj_fan",
    "email": "fan@example.com",
    "password": "password123"
  }'
```

### 登录
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "fan@example.com",
    "password": "password123"
  }'

# 获得 token，后续请求加上：
# Authorization: Bearer <token>
```

---

## 🎵 音乐相关 API

### 获取所有歌曲
```bash
GET /api/music?page=1&limit=20&sort=newest
GET /api/music?genre=流行  # 按类型筛选
GET /api/music?search=关键词  # 搜索
```

### 创建歌曲（需要 token）
```bash
POST /api/music
Authorization: Bearer <token>

{
  "title": "被你宠坏",
  "artist": "林俊杰",
  "album": "新的旅程",
  "duration": 240,
  "genre": "流行",
  "cover": "https://...",
  "url": "https://...",
  "lyrics": "歌词...",
  "description": "描述...",
  "tags": ["标签1", "标签2"]
}
```

### 收藏歌曲
```bash
POST /api/music/:id/collect
Authorization: Bearer <token>

# 取消收藏
DELETE /api/music/:id/collect
Authorization: Bearer <token>

# 获取我的收藏
GET /api/music/collection/my?page=1&limit=20
Authorization: Bearer <token>
```

### 点赞歌曲
```bash
POST /api/music/:id/like
Authorization: Bearer <token>
```

---

## 💬 社区相关 API

### 获取帖子列表
```bash
GET /api/community/posts?page=1&limit=10
GET /api/community/posts?sort=popular  # 热门排序
GET /api/community/posts?category=分享  # 按分类
GET /api/community/posts?search=关键词  # 搜索
```

### 创建帖子
```bash
POST /api/community/posts
Authorization: Bearer <token>

{
  "title": "分享一下我的故事",
  "content": "内容...",
  "category": "分享",
  "tags": ["标签1"],
  "coverImage": "https://..."
}
```

### 评论帖子
```bash
# 添加评论
POST /api/community/posts/:postId/comments
Authorization: Bearer <token>

{
  "content": "评论内容",
  "parentCommentId": null  // 子评论时指定父评论 ID
}

# 获取评论列表
GET /api/community/posts/:postId/comments?page=1&limit=20

# 删除评论
DELETE /api/community/comments/:commentId
Authorization: Bearer <token>
```

### 点赞帖子和评论
```bash
# 点赞帖子（切换状态）
POST /api/community/posts/:id/like
Authorization: Bearer <token>

# 点赞评论
POST /api/community/comments/:id/like
Authorization: Bearer <token>
```

---

## 👥 用户和关注 API

### 获取用户信息
```bash
GET /api/users/:id
GET /api/users?page=1&limit=20&search=keyword  # 用户列表
```

### 获取用户统计
```bash
GET /api/users/:id/stats
```

### 关注用户
```bash
# 关注
POST /api/follow/:userId/follow
Authorization: Bearer <token>

# 取消关注
DELETE /api/follow/:userId/follow
Authorization: Bearer <token>

# 检查是否已关注
GET /api/follow/:userId/check-follow
Authorization: Bearer <token>

# 获取关注列表
GET /api/follow/:userId/following?page=1&limit=20

# 获取粉丝列表
GET /api/follow/:userId/followers?page=1&limit=20
```

### 用户统计
```bash
GET /api/follow/stats/my
Authorization: Bearer <token>
```

---

## 🎵 歌单相关 API

### 获取歌单
```bash
GET /api/playlists?page=1&limit=20  # 公开歌单
GET /api/playlists/my/playlists  # 我的歌单
Authorization: Bearer <token>
```

### 创建歌单
```bash
POST /api/playlists
Authorization: Bearer <token>

{
  "name": "我的收藏",
  "description": "最爱的歌曲",
  "isPublic": true,
  "cover": "https://..."
}
```

### 歌单歌曲管理
```bash
# 添加歌曲
POST /api/playlists/:playlistId/songs/:songId
Authorization: Bearer <token>

# 移除歌曲
DELETE /api/playlists/:playlistId/songs/:songId
Authorization: Bearer <token>
```

### 关注歌单
```bash
# 关注
POST /api/playlists/:id/follow
Authorization: Bearer <token>

# 取消关注
DELETE /api/playlists/:id/follow
Authorization: Bearer <token>
```

---

## 📊 常用查询参数

| 参数 | 说明 | 示例 |
|------|------|------|
| page | 页码 | ?page=1 |
| limit | 每页数量 | ?limit=20 |
| search | 搜索关键词 | ?search=林俊杰 |
| sort | 排序方式 | ?sort=popular |
| category | 分类 | ?category=分享 |
| genre | 音乐类型 | ?genre=流行 |

---

## 🔑 HTTP 状态码

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 201 | 创建成功 |
| 400 | 请求参数错误 |
| 401 | 未授权/需要登录 |
| 403 | 禁止访问/权限不足 |
| 404 | 资源不存在 |
| 409 | 冲突（重复操作等） |
| 500 | 服务器错误 |

---

## ✅ 响应格式

### 成功响应
```json
{
  "success": true,
  "message": "操作成功",
  "data": { /* 数据 */ }
}
```

### 分页响应
```json
{
  "success": true,
  "message": "获取成功",
  "data": [ /* 数据数组 */ ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

### 错误响应
```json
{
  "success": false,
  "message": "错误信息",
  "errors": [ /* 验证错误详情 */ ]
}
```

---

## 📚 高级用法

### 多条件搜索
```bash
GET /api/music?search=林俊杰&genre=流行&sort=popular&page=1&limit=20
```

### 嵌套评论（子评论）
```bash
# 获取子评论
POST /api/community/posts/:postId/comments
{
  "content": "回复内容",
  "parentCommentId": "父评论的_id"
}
```

### 听歌历史
```bash
GET /api/users/:userId/listen-history?page=1&limit=20
```

### 用户发帖
```bash
GET /api/users/:userId/posts?page=1&limit=20
```

---

## 🔧 常见问题

### 如何获取 token？
登录后在响应中获得 `token`，后续请求在 `Authorization` 头中使用。

### token 过期了怎么办？
重新登录即可获得新的 token。

### 如何搜索？
使用 `search` 参数进行全文搜索。

### 如何分页？
使用 `page` 和 `limit` 参数。

### 如何排序？
使用 `sort` 参数（newest/popular/trending/oldest）。

---

## 🎯 测试清单

- [ ] 用户注册和登录
- [ ] 获取用户信息
- [ ] 创建和编辑音乐
- [ ] 搜索和筛选音乐
- [ ] 收藏和点赞
- [ ] 创建和编辑帖子
- [ ] 发表和删除评论
- [ ] 关注用户
- [ ] 创建和管理歌单
- [ ] 历史记录和统计

---

**Happy Coding! 🚀**

