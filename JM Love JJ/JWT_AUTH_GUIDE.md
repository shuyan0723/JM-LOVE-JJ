# 🔐 JWT 认证系统指南

## 概述

本项目实现了完整的JWT（JSON Web Token）认证系统，包括：
- 📝 用户注册和登录
- 🔑 JWT Token 生成、验证和管理
- 🛡️ 受保护路由（需要认证）
- 💾 Token 持久化到本地存储
- ⏰ Token 过期检查
- 🚪 用户登出和 Session 清理

---

## 🏗️ 架构设计

### JWT Token 结构

JWT Token 由三部分组成（点分隔）：

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImVtYWlsIjoiYWRhbUBleGFtcGxlLmNvbSIsInVzZXJuYW1lIjoiYWRhbSIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxNzAwMDg2NDAwfQ.signature
```

1. **Header（头部）** - Token类型和签名算法
2. **Payload（负载）** - 用户信息和过期时间
3. **Signature（签名）** - 用密钥签名的数据

### 文件结构

```
src/
├── utils/
│   └── jwtService.ts           # JWT工具函数
├── store/
│   └── slices/
│       └── authSlice.ts        # Auth Redux状态管理
├── components/
│   └── ProtectedRoute.tsx       # 受保护路由组件
└── pages/
    └── Login.tsx               # 登录页面（使用JJ图片背景）
```

---

## 📋 核心功能

### 1. 登录流程

**用户登录 → 生成JWT Token → 保存到localStorage → 更新Redux状态 → 重定向到首页**

```typescript
// 1. 用户输入邮箱和密码
const formData = {
  email: 'user@example.com',
  password: 'password123'
};

// 2. 点击登录按钮，生成JWT Token
const token = generateToken({
  id: userId,
  email: formData.email,
  username: formData.username
});

// 3. 保存Token和用户信息到Redux
dispatch(loginSuccess({ token, user }));

// 4. Token自动保存到localStorage（authSlice中）
localStorage.setItem('jj_token', token);
localStorage.setItem('jj_user', JSON.stringify(user));
```

### 2. Token验证

**在每次访问受保护的路由时自动验证Token**

```typescript
// ProtectedRoute.tsx - 检查Token有效性
const { isAuthenticated, token } = useAppSelector(state => state.auth);

if (!isAuthenticated || !token) {
  return <Navigate to="/login" replace />;
}
```

### 3. Token过期处理

**Token默认24小时后过期**

```typescript
// jwtService.ts
const now = Math.floor(Date.now() / 1000);
const tokenPayload: JWTPayload = {
  ...payload,
  iat: now,              // Token发行时间
  exp: now + 24 * 60 * 60 // Token过期时间（24小时）
};

// 验证时检查过期时间
if (payload.exp < now) {
  console.warn('Token expired');
  return null;
}
```

### 4. 登出流程

**清除Token → 清除用户信息 → 清除localStorage → 重定向到登录页**

```typescript
// 点击登出按钮
const handleLogout = () => {
  dispatch(logout());           // 清除Redux状态
  navigate('/login');           // 重定向到登录页
};

// authSlice中的logout reducer
logout: (state) => {
  state.token = null;
  state.user = null;
  state.isAuthenticated = false;
  localStorage.removeItem('jj_token');    // 清除localStorage
  localStorage.removeItem('jj_user');
}
```

---

## 🔧 JWT 工具函数

### 生成Token

```typescript
import { generateToken } from '@/utils/jwtService';

const token = generateToken({
  id: 'user123',
  email: 'user@example.com',
  username: 'username'
});
// 返回: "eyJhbGc...<完整的JWT Token>...signature"
```

### 验证并解析Token

```typescript
import { verifyAndDecodeToken } from '@/utils/jwtService';

const payload = verifyAndDecodeToken(token);
// 返回: { id: 'user123', email: '...', username: '...', iat: ..., exp: ... }
// 如果失败返回: null
```

### 检查Token有效性

```typescript
import { isTokenValid } from '@/utils/jwtService';

if (isTokenValid(token)) {
  console.log('Token有效');
} else {
  console.log('Token无效或已过期');
}
```

### 检查Token是否接近过期

```typescript
import { isTokenExpiringSoon } from '@/utils/jwtService';

if (isTokenExpiringSoon(token)) {
  console.log('Token即将过期，建议刷新');
}
```

---

## 📡 Redux 状态管理

### Auth Store 结构

```typescript
interface AuthState {
  token: string | null;           // JWT Token
  user: User | null;              // 用户信息
  isAuthenticated: boolean;       // 认证状态
  isLoading: boolean;             // 加载状态
  error: string | null;           // 错误信息
}
```

### 使用 Auth Store

```typescript
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { loginSuccess, logout } from '@/store/slices/authSlice';

export function MyComponent() {
  const dispatch = useAppDispatch();
  const { token, user, isAuthenticated, isLoading, error } = 
    useAppSelector(state => state.auth);

  // 使用状态...
  if (isAuthenticated) {
    return <div>欢迎，{user?.username}！</div>;
  }
}
```

---

## 🛡️ 受保护路由

### 使用受保护路由

```typescript
import ProtectedRoute from '@/components/ProtectedRoute';

<Routes>
  {/* 公开路由 */}
  <Route path="/login" element={<Login />} />

  {/* 受保护的路由 */}
  <Route 
    path="/" 
    element={<ProtectedRoute element={<Home />} />} 
  />
  <Route 
    path="/profile" 
    element={<ProtectedRoute element={<Profile />} />} 
  />
</Routes>
```

### 原理

如果用户未认证，自动重定向到登录页：

```typescript
export default function ProtectedRoute({ element }: ProtectedRouteProps) {
  const { isAuthenticated, token } = useAppSelector(state => state.auth);

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  return element;
}
```

---

## 💾 本地存储

### 存储的数据

```javascript
// 存储在浏览器localStorage中：
localStorage.jj_token  // JWT Token字符串
localStorage.jj_user   // 用户信息JSON
```

### 持久化流程

1. **登录时**：Token和用户信息自动保存到localStorage
2. **页面刷新时**：从localStorage恢复auth状态（在authSlice初始化时）
3. **登出时**：清除localStorage中的数据

```typescript
// authSlice.ts 初始化时恢复状态
const initialState: AuthState = {
  token: localStorage.getItem('jj_token') || null,
  user: localStorage.getItem('jj_user') 
    ? JSON.parse(localStorage.getItem('jj_user') || '{}') 
    : null,
  isAuthenticated: !!localStorage.getItem('jj_token'),
  isLoading: false,
  error: null,
};
```

---

## 🎯 测试登录

### 演示账户

点击登录页面的 **"🎵 演示登录"** 按钮，快速体验所有功能：

- 邮箱：`demo@jj-fan.com`
- 用户名：`JJ粉丝`
- 自动生成有效的JWT Token

### 自己注册

1. 点击 **"创建账户"** 
2. 输入邮箱、用户名和密码
3. 点击 **"创建账户"** 按钮
4. 自动登录并进入应用

### 验证Token

打开浏览器开发者工具（F12），在控制台运行：

```javascript
// 查看Token
console.log(localStorage.getItem('jj_token'));

// 查看用户信息
console.log(JSON.parse(localStorage.getItem('jj_user')));
```

---

## 🔄 完整认证流程

```
1️⃣ 用户访问应用
   ↓
2️⃣ 检查localStorage中是否有Token
   ├─ 有Token → 恢复auth状态，允许访问
   └─ 无Token → 重定向到登录页

3️⃣ 用户输入凭证并登录
   ↓
4️⃣ 生成JWT Token（包含用户信息）
   ↓
5️⃣ 保存Token到Redux状态和localStorage
   ↓
6️⃣ 重定向到首页
   ↓
7️⃣ 访问受保护页面时验证Token
   ├─ Token有效 → 允许访问
   └─ Token无效 → 重定向到登录页

8️⃣ 用户登出
   ↓
9️⃣ 清除Token和用户信息
   ↓
🔟 重定向到登录页
```

---

## ⚠️ 安全注意事项

### 当前实现（演示版本）

- ✅ Token在客户端生成（演示用）
- ✅ Token本地验证
- ✅ Token保存在localStorage
- ✅ Token过期检查

### 生产环境建议

- 🔒 **后端生成Token**：由后端服务器生成和验证JWT
- 🔒 **HTTPS传输**：始终使用HTTPS传输敏感数据
- 🔒 **Secure Cookie**：将Token存储在HttpOnly Secure Cookie中
- 🔒 **Token刷新**：实现Token刷新机制，定期更换Token
- 🔒 **密钥管理**：使用强密钥和密钥轮换策略
- 🔒 **CORS配置**：正确配置CORS以防止跨域攻击
- 🔒 **验证签名**：每个API请求都要验证Token签名

---

## 📚 相关文件

| 文件 | 说明 |
|-----|------|
| `src/utils/jwtService.ts` | JWT生成、验证和管理 |
| `src/store/slices/authSlice.ts` | Redux Auth状态管理 |
| `src/components/ProtectedRoute.tsx` | 受保护路由组件 |
| `src/pages/Login.tsx` | 登录页面（包含注册功能） |
| `src/App.tsx` | 应用主组件，包含路由配置 |

---

## 🚀 快速开始

### 1. 启动应用

```bash
cd "JM Love JJ"
npm run dev
```

### 2. 访问登录页

打开浏览器访问 `http://localhost:5173`，自动重定向到登录页

### 3. 登录方式

- **演示登录**：点击 🎵 演示登录 按钮
- **账户登录**：输入邮箱和密码
- **注册账户**：点击"创建账户"注册新账户

### 4. 探索应用

登录后可以访问：
- 🏠 首页
- 🎵 音乐库
- 👥 粉丝社区
- 🎤 演唱会
- 👤 个人中心

---

## 💡 常见问题

### Q: Token过期了怎么办？
A: 需要重新登录。在生产环境，可以实现自动刷新Token功能。

### Q: Token保存在localStorage安全吗？
A: localStorage容易被XSS攻击。生产环境应使用HttpOnly Secure Cookie。

### Q: 如何实现Token刷新？
A: 后端可以发行一个较长期限的刷新Token（refresh token），用于获取新的访问Token。

### Q: 如何在多标签页同步登录状态？
A: 可以使用localStorage的`storage`事件监听其他标签页的变化。

---

**记住**：这是一个演示项目。在实际生产环境中，始终要遵循安全最佳实践！

🎵 **用爱，唱出我的故事** ✨

