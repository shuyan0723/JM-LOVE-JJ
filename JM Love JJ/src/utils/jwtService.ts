// JWT Service - 客户端JWT生成和验证
// 注意：实际应用中应该由后端生成JWT

const JWT_SECRET = 'jj-fan-site-secret-key-2024'; // 实际应该保存在后端

interface JWTPayload {
  id: string;
  email: string;
  username: string;
  iat: number;
  exp: number;
}

// Base64编码
const base64Encode = (str: string): string => {
  return btoa(unescape(encodeURIComponent(str)));
};

// Base64解码
const base64Decode = (str: string): string => {
  return decodeURIComponent(escape(atob(str)));
};

// 生成JWT Token (客户端演示版本)
export const generateToken = (payload: {
  id: string;
  email: string;
  username: string;
}): string => {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const tokenPayload: JWTPayload = {
    ...payload,
    iat: now,
    exp: now + 24 * 60 * 60, // 24小时过期
  };

  const headerEncoded = base64Encode(JSON.stringify(header));
  const payloadEncoded = base64Encode(JSON.stringify(tokenPayload));

  // 简化的签名 (实际应该使用HMAC-SHA256)
  const signature = base64Encode(
    `${headerEncoded}.${payloadEncoded}.${JWT_SECRET}`
  );

  return `${headerEncoded}.${payloadEncoded}.${signature}`;
};

// 验证并解析JWT Token
export const verifyAndDecodeToken = (token: string): JWTPayload | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const [headerEncoded, payloadEncoded, signatureEncoded] = parts;

    // 验证签名
    const expectedSignature = base64Encode(
      `${headerEncoded}.${payloadEncoded}.${JWT_SECRET}`
    );

    if (signatureEncoded !== expectedSignature) {
      console.warn('Token signature invalid');
      return null;
    }

    // 解析payload
    const payload: JWTPayload = JSON.parse(base64Decode(payloadEncoded));

    // 检查过期时间
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      console.warn('Token expired');
      return null;
    }

    return payload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

// 检查Token是否有效
export const isTokenValid = (token: string): boolean => {
  return verifyAndDecodeToken(token) !== null;
};

// 检查Token是否接近过期 (距离过期还有5分钟)
export const isTokenExpiringSoon = (token: string): boolean => {
  const payload = verifyAndDecodeToken(token);
  if (!payload) return true;

  const now = Math.floor(Date.now() / 1000);
  const timeUntilExpiry = payload.exp - now;
  return timeUntilExpiry < 5 * 60; // 5分钟
};

// 从localStorage获取token
export const getStoredToken = (): string | null => {
  return localStorage.getItem('jj_token');
};

// 保存token到localStorage
export const saveToken = (token: string): void => {
  localStorage.setItem('jj_token', token);
};

// 移除token
export const removeToken = (): void => {
  localStorage.removeItem('jj_token');
};

// 从token中提取用户信息
export const getUserFromToken = (token: string) => {
  const payload = verifyAndDecodeToken(token);
  if (!payload) return null;
  return {
    id: payload.id,
    email: payload.email,
    username: payload.username,
  };
};
