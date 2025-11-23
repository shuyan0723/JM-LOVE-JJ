# 🚀 5 分钟快速启动指南

欢迎使用林俊杰粉丝应用后端！本指南将帮助你快速上手。

---

## ⚡ 1 分钟快速开始

### 第 1 步：安装依赖（1 分钟）
```bash
cd backend
npm install
```

### 第 2 步：配置环境（1 分钟）

创建 `.env` 文件（复制粘贴）：
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/jm-love-jj
JWT_SECRET=dev_secret_key_12345
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

### 第 3 步：启动 MongoDB（1 分钟）

**本地 MongoDB：**
```bash
mongod
```

或使用 MongoDB Atlas（云）：
- 访问 https://www.mongodb.com/cloud/atlas
- 创建免费集群
- 在 `.env` 中替换 `MONGODB_URI`

### 第 4 步：启动服务（1 分钟）
```bash
npm run dev
```

### 第 5 步：验证（1 分钟）

打开浏览器访问：
```
http://localhost:3000/api/health
```

看到 `{"status":"ok",...}` 表示成功！ ✅

---

## 📝 第一次测试

### 1. 用户注册

在 Terminal 或 Postman 中执行：

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_user",
    "email": "test@example.com",
    "password": "password123"
  }'
```

**响应示例：**
```json
{
  "success": true,
  "message": "注册成功",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "data": {
    "_id": "...",
    "username": "test_user",
    "email": "test@example.com"
  }
}
```

### 2. 保存 Token

复制响应中的 `token` 值，后续请求都需要它。

### 3. 创建帖子

```bash
curl -X POST http://localhost:3000/api/community/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "林俊杰的音乐真的很棒",
    "content": "我最喜欢他的歌曲",
    "category": "分享",
    "tags": ["林俊杰", "音乐"]
  }'
```

### 4. 获取帖子列表

```bash
curl http://localhost:3000/api/community/posts?page=1&limit=10
```

---

## 🎯 常用命令

```bash
# 启动开发服务器
npm run dev

# 启动生产服务器
npm start

# 查看依赖
npm list

# 更新依赖
npm update

# 查看日志
npm run dev 2>&1 | grep -i "error"
```

---

## 📚 重要文件位置

| 文件 | 说明 |
|------|------|
| `README.md` | 完整 API 文档 |
| `FEATURES.md` | 功能清单 |
| `QUICK_REFERENCE.md` | 快速参考 |
| `DEPLOYMENT.md` | 部署指南 |
| `server.js` | 应用入口 |
| `package.json` | 依赖管理 |

---

## 🔍 文件结构一览

```
backend/
├── models/              ← 数据模型
│   ├── User.js
│   ├── Music.js
│   ├── Post.js
│   ├── Comment.js
│   ├── Playlist.js
│   └── UserInteraction.js
├── routes/              ← API 路由
│   ├── auth.js
│   ├── users.js
│   ├── music.js
│   ├── community.js
│   ├── follow.js
│   └── playlists.js
├── middleware/          ← 中间件
│   └── auth.js
├── config/              ← 配置
│   └── database.js
├── utils/               ← 工具函数
│   ├── constants.js
│   └── response.js
├── server.js            ← 主应用
├── package.json         ← 依赖
└── .env                 ← 环境变量（创建）
```

---

## ✨ 快速验证清单

运行这些命令验证一切正常：

```bash
# ✅ 检查 Node.js
node --version

# ✅ 检查 npm
npm --version

# ✅ 检查依赖
npm list

# ✅ 测试 MongoDB 连接
mongo --eval "db.version()"

# ✅ 启动服务
npm run dev

# ✅ 测试 API（新 Terminal）
curl http://localhost:3000/api/health
```

---

## 🆘 常见问题快速解决

| 问题 | 解决方案 |
|------|--------|
| "Cannot find module" | 运行 `npm install` |
| "port 3000 already in use" | 改 PORT 或 `kill -9 $(lsof -t -i:3000)` |
| "MongoDB connection failed" | 启动 MongoDB (`mongod`) |
| "token invalid" | 重新登录获取新 token |
| ".env not found" | 创建 `.env` 文件 |

---

## 💡 下一步

### 推荐学习路径

1. **了解 API 结构**
   - 阅读 `README.md`
   - 了解 API 分类

2. **测试核心功能**
   - 用户认证（注册/登录）
   - 创建音乐和帖子
   - 社区互动功能

3. **理解代码**
   - 查看 `server.js` 主入口
   - 学习路由结构（`routes/`）
   - 理解数据模型（`models/`）

4. **前端集成**
   - 配置前端 API URL
   - 测试前后端通信
   - 完成功能集成

---

## 📞 需要帮助？

1. **查看文档**
   - 完整 API 文档：`README.md`
   - 快速参考：`QUICK_REFERENCE.md`
   - 功能清单：`FEATURES.md`

2. **检查日志**
   ```bash
   # 查看完整日志
   npm run dev
   
   # 查看错误信息
   npm run dev 2>&1 | grep -i error
   ```

3. **测试 API**
   - 使用 Postman
   - 使用 curl 命令
   - 使用 REST Client 扩展

---

## 🎓 推荐资源

- **Express.js** - https://expressjs.com/
- **MongoDB** - https://www.mongodb.com/docs/
- **Mongoose** - https://mongoosejs.com/
- **JWT** - https://jwt.io/
- **RESTful API** - https://restfulapi.net/

---

## 🚀 准备好了吗？

**开始使用：**
```bash
cd backend
npm install
npm run dev
```

**访问：** http://localhost:3000/api/health

**祝你使用愉快！** 🎵✨

---

## 📋 快速检查

- [ ] Node.js 已安装
- [ ] npm 依赖已安装
- [ ] MongoDB 正在运行
- [ ] `.env` 文件已创建
- [ ] 服务成功启动
- [ ] 可以访问 `/api/health`
- [ ] 已通过用户注册测试

完成上述所有步骤，你就可以开始开发了！🎉

