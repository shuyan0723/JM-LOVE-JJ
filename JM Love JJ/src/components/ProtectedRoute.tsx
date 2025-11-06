import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { verifyAndDecodeToken } from '../utils/jwtService';
import { useEffect, useState } from 'react';
import PageLoader from './PageLoader';

interface ProtectedRouteProps {
  element: JSX.Element;
  requiredLevel?: number; // 可选的权限等级要求
}

export default function ProtectedRoute({ element, requiredLevel }: ProtectedRouteProps) {
  const location = useLocation();
  const { isAuthenticated, token, user } = useAppSelector(state => state.auth);
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValidating(false);
        setIsValid(false);
        return;
      }

      // 验证token是否有效
      const payload = verifyAndDecodeToken(token);
      if (payload) {
        // 检查用户等级要求（如果有）
        if (requiredLevel && user && user.level < requiredLevel) {
          setIsValidating(false);
          setIsValid(false);
          return;
        }
        setIsValid(true);
      } else {
        setIsValid(false);
      }
      setIsValidating(false);
    };

    validateToken();
  }, [token, user, requiredLevel]);

  // 验证中显示加载
  if (isValidating) {
    return <PageLoader />;
  }

  // 未认证或token无效，重定向到登录页
  if (!isAuthenticated || !token || !isValid) {
    // 保存当前路径，登录后可以重定向回来
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // 权限不足
  if (requiredLevel && user && user.level < requiredLevel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">权限不足</h1>
          <p className="text-gray-400 mb-6">
            此功能需要 {requiredLevel} 级或以上权限。你当前的等级是 {user.level} 级。
          </p>
          <Navigate to="/profile" replace />
        </div>
      </div>
    );
  }

  return element;
}
