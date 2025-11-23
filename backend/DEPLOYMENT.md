# 🚀 后端部署与维护指南

## 📋 部署前检查清单

- [ ] 所有依赖已安装 (`npm install`)
- [ ] 环境变量已配置 (`.env`)
- [ ] MongoDB 可访问
- [ ] 代码已测试
- [ ] 日志系统可用
- [ ] 备份计划已制定

---

## 🔧 本地开发环境设置

### 1. 安装 MongoDB（本地）

**Windows:**
```bash
# 下载安装文件
# https://www.mongodb.com/try/download/community

# 启动 MongoDB
mongod
```

**macOS:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

### 2. 验证 MongoDB
```bash
mongo
# 或
mongosh
```

### 3. 启动开发服务器
```bash
cd backend
npm run dev
```

---

## ☁️ 云部署方案

### 方案 1：Heroku (简单快速)

#### 前提条件
- Heroku 账户
- Heroku CLI 已安装

#### 部署步骤
```bash
# 1. 登录 Heroku
heroku login

# 2. 创建应用
heroku create your-app-name

# 3. 添加 MongoDB Atlas (推荐)
# 在 Heroku Dashboard 中添加 Config Vars:
# MONGODB_URI = mongodb+srv://...

# 4. 部署
git push heroku main

# 5. 查看日志
heroku logs --tail
```

### 方案 2：AWS EC2 (灵活强大)

#### 步骤 1：启动 EC2 实例
- 选择 Ubuntu 20.04 LTS AMI
- 选择 t2.micro (免费层)
- 配置安全组（开放 22, 80, 443, 3000 端口）

#### 步骤 2：连接并安装依赖
```bash
# SSH 连接到实例
ssh -i your-key.pem ubuntu@your-instance-ip

# 更新系统
sudo apt-get update
sudo apt-get upgrade -y

# 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装 MongoDB
sudo apt-get install -y mongodb

# 启动 MongoDB
sudo systemctl start mongodb
sudo systemctl enable mongodb

# 安装 git
sudo apt-get install -y git
```

#### 步骤 3：部署应用
```bash
# 克隆仓库
git clone <your-repo-url>
cd backend

# 安装依赖
npm install

# 创建 .env 文件
cat > .env << EOF
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://localhost:27017/jm-love-jj
JWT_SECRET=your_production_secret_key
JWT_EXPIRE=7d
CORS_ORIGIN=https://your-domain.com
EOF

# 启动应用（使用 PM2 管理）
npm install -g pm2
pm2 start server.js --name "jm-love-jj-api"
pm2 startup
pm2 save
```

#### 步骤 4：配置反向代理（Nginx）
```bash
# 安装 Nginx
sudo apt-get install -y nginx

# 创建配置文件
sudo cat > /etc/nginx/sites-available/default << EOF
server {
    listen 80 default_server;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# 重启 Nginx
sudo systemctl restart nginx
```

### 方案 3：Docker (标准化部署)

#### 创建 Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "server.js"]
```

#### 创建 .dockerignore
```
node_modules
npm-debug.log
.git
.env
.DS_Store
```

#### 构建和运行
```bash
# 构建镜像
docker build -t jm-love-jj-api .

# 运行容器
docker run -p 3000:3000 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/jm-love-jj \
  -e JWT_SECRET=your_secret \
  jm-love-jj-api
```

#### Docker Compose
```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      MONGODB_URI: mongodb://mongo:27017/jm-love-jj
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      - mongo

  mongo:
    image: mongo:5.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

运行：
```bash
docker-compose up -d
```

---

## 🗄️ MongoDB 数据库配置

### MongoDB Atlas (云数据库) - 推荐

#### 步骤
1. 访问 https://www.mongodb.com/cloud/atlas
2. 注册账户
3. 创建项目和集群
4. 获取连接字符串
5. 在 `.env` 中配置

#### 示例
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jm-love-jj?retryWrites=true&w=majority
```

### 本地 MongoDB

#### 启动
```bash
mongod
```

#### 连接字符串
```env
MONGODB_URI=mongodb://localhost:27017/jm-love-jj
```

---

## 📊 监控和日志

### PM2 监控
```bash
# 启动 PM2 监控面板
pm2 monit

# 查看应用日志
pm2 logs jm-love-jj-api

# 查看应用状态
pm2 status
```

### 日志文件位置
```bash
# PM2 日志
~/.pm2/logs/

# 应用日志（如果配置）
./logs/
```

### 添加日志系统（Winston）

安装依赖：
```bash
npm install winston
```

使用示例：
```javascript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

logger.info('Application started');
```

---

## 🔐 安全配置

### HTTPS 配置

使用 Let's Encrypt 免费证书：

```bash
# 安装 Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# 获取证书
sudo certbot certonly --nginx -d your-domain.com

# Nginx 配置
sudo cat > /etc/nginx/sites-available/default << EOF
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        # ... 其他配置
    }
}

server {
    listen 80;
    server_name your-domain.com;
    return 301 https://\$server_name\$request_uri;
}
EOF
```

### 环境变量安全

**不要提交 .env 文件！**

```bash
# .gitignore
.env
.env.local
node_modules
```

### 数据库备份

```bash
# 备份
mongodump --uri="mongodb://localhost:27017/jm-love-jj" --out=./backup

# 恢复
mongorestore --uri="mongodb://localhost:27017/jm-love-jj" ./backup
```

---

## 📈 性能优化

### 1. 启用 GZIP 压缩
```javascript
import compression from 'compression';

app.use(compression());
```

### 2. 数据库查询优化
- 使用索引
- 使用 select() 选择必要字段
- 使用 lean() 返回普通对象

### 3. 缓存策略
- 使用 Redis 缓存热数据
- 缓存 API 响应
- 缓存数据库查询结果

### 4. 连接池优化
```javascript
// Mongoose 配置
mongoose.connect(mongoUri, {
  maxPoolSize: 10,
  minPoolSize: 5
});
```

---

## 🆘 故障排除

### 问题：应用无法启动

**检查清单：**
1. Node.js 版本正确？(`node --version`)
2. 依赖已安装？(`npm ls`)
3. 环境变量已配置？
4. MongoDB 正在运行？
5. 端口未被占用？

### 问题：数据库连接失败

```bash
# 测试连接
mongo "mongodb://localhost:27017/jm-love-jj"

# 检查 MongoDB 状态
sudo systemctl status mongod
```

### 问题：高 CPU/内存使用率

```bash
# 监控进程
pm2 monit

# 检查内存泄漏
node --inspect server.js
```

### 问题：请求超时

1. 增加超时时间
2. 优化数据库查询
3. 添加缓存
4. 增加服务器资源

---

## 🔄 更新和维护

### 更新依赖包
```bash
# 检查过时的包
npm outdated

# 更新所有包
npm update

# 更新特定包
npm install package-name@latest
```

### 健康检查
```bash
# 定期检查应用
curl http://localhost:3000/api/health

# 自动化检查（cron）
0 */6 * * * curl http://localhost:3000/api/health >> /var/log/health-check.log
```

### 日志轮转
```bash
# 使用 logrotate
sudo cat > /etc/logrotate.d/jm-love-jj << EOF
~/.pm2/logs/* {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    create 0644 ubuntu ubuntu
}
EOF
```

---

## 📝 部署检查清单

### 部署前
- [ ] 代码已测试
- [ ] 环境变量已设置
- [ ] 数据库已备份
- [ ] HTTPS 已配置
- [ ] 防火墙已配置

### 部署后
- [ ] 应用成功启动
- [ ] 健康检查通过
- [ ] API 端点正常
- [ ] 日志可正常访问
- [ ] 监控系统运作

### 持续运维
- [ ] 每周检查日志
- [ ] 每月更新依赖
- [ ] 定期备份数据库
- [ ] 监控性能指标
- [ ] 处理告警信息

---

## 🎯 零停机部署

使用蓝绿部署策略：

```bash
# 1. 启动新实例（绿）
pm2 start server.js --name "jm-love-jj-api-green"

# 2. 测试新实例
curl http://localhost:3001/api/health

# 3. 切换流量（更新 Nginx）
# ...

# 4. 停止旧实例（蓝）
pm2 stop jm-love-jj-api-blue
```

---

## 📞 应急联系

- 数据库故障：检查 MongoDB 日志
- 应用崩溃：检查 PM2 日志
- 网络问题：检查防火墙设置
- 性能问题：运行 PM2 monit

---

**部署完成后，记得：**
1. ✅ 测试所有 API 端点
2. ✅ 验证前端和后端连接
3. ✅ 监控应用运行状态
4. ✅ 定期备份数据
5. ✅ 记录重要日志

🎉 **应用已部署，祝运维顺利！**

