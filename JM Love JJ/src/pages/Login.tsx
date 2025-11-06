import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginSuccess, loginFailure } from '../store/slices/authSlice';
import { generateToken } from '../utils/jwtService';
import { Mail, Lock, Eye, EyeOff, Loader, AlertCircle } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector(state => state.auth);
  
  // 如果已登录，重定向到目标页面或首页
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as { from?: string })?.from || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.email) {
      dispatch(loginFailure('请输入邮箱地址'));
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      dispatch(loginFailure('请输入有效的邮箱地址'));
      return false;
    }

    if (!formData.password || formData.password.length < 6) {
      dispatch(loginFailure('密码长度至少为6位'));
      return false;
    }

    if (isSignUp) {
      if (!formData.username) {
        dispatch(loginFailure('请输入用户名'));
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        dispatch(loginFailure('两次输入的密码不一致'));
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    dispatch({ type: 'auth/loginStart' });

    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const userId = Math.random().toString(36).substr(2, 9);

      // 生成JWT Token
      const token = generateToken({
        id: userId,
        email: formData.email,
        username: formData.username || formData.email.split('@')[0],
      });

      // 创建用户对象
      const user = {
        id: userId,
        username: formData.username || formData.email.split('@')[0],
        email: formData.email,
        joinDate: new Date().toLocaleDateString('zh-CN'),
        level: 1,
        badges: ['新手'],
        avatar: '👤',
        bio: '音乐是我的生命，JJ的歌陪伴我度过了许多时光。',
      };

      // 更新Redux状态
      dispatch(loginSuccess({ token, user }));

      // 导航到之前尝试访问的页面，或默认首页
      const from = (location.state as { from?: string })?.from || '/';
      navigate(from, { replace: true });
    } catch (err) {
      dispatch(loginFailure('登录失败，请重试'));
    }
  };

  const handleDemoLogin = async () => {
    dispatch({ type: 'auth/loginStart' });

    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const userId = Math.random().toString(36).substr(2, 9);
      const token = generateToken({
        id: userId,
        email: 'demo@jj-fan.com',
        username: 'JJ粉丝',
      });

      const user = {
        id: userId,
        username: 'JJ粉丝',
        email: 'demo@jj-fan.com',
        joinDate: new Date().toLocaleDateString('zh-CN'),
        level: 1,
        badges: ['新手'],
        avatar: '👤',
        bio: '欢迎来到JM Love JJ粉丝互动平台！',
      };

      dispatch(loginSuccess({ token, user }));
      const from = (location.state as { from?: string })?.from || '/';
      navigate(from, { replace: true });
    } catch (err) {
      dispatch(loginFailure('演示登录失败'));
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* 左侧图片 */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
          alt="林俊杰"
          className="w-full h-full object-cover"
        />
        {/* 左侧遮罩和品牌信息 */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-purple-900/60 to-transparent flex flex-col items-start justify-between p-12">
          <div>
            <h1 className="text-5xl font-bold text-white mb-4">JM Love JJ</h1>
            <p className="text-2xl text-purple-200">用爱，唱出我的故事</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-purple-100">
              <div className="w-1 h-8 bg-gradient-purple rounded"></div>
              <p className="text-lg">沉浸式音乐体验</p>
            </div>
            <div className="flex items-center gap-3 text-purple-100">
              <div className="w-1 h-8 bg-gradient-purple rounded"></div>
              <p className="text-lg">粉丝互动社区</p>
            </div>
            <div className="flex items-center gap-3 text-purple-100">
              <div className="w-1 h-8 bg-gradient-purple rounded"></div>
              <p className="text-lg">演唱会中心</p>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧登录表单 */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo (移动端显示) */}
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-4xl font-bold bg-gradient-purple bg-clip-text text-transparent mb-2">
              JM Love JJ
            </h1>
            <p className="text-gray-400">林俊杰粉丝互动平台</p>
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* 表单标题 */}
          <h2 className="text-3xl font-bold text-white mb-2 text-center">
            {isSignUp ? '创建账户' : '欢迎回来'}
          </h2>
          <p className="text-gray-400 text-center mb-8">
            {isSignUp
              ? '加入我们的粉丝社区，开启音乐之旅'
              : '登录后解锁所有功能'}
          </p>

          {/* 登录表单 */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {/* 用户名 (仅注册) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  用户名
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="输入用户名"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="input-field w-full"
                />
              </div>
            )}

            {/* 邮箱 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                邮箱地址
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="输入邮箱地址"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field w-full pl-10"
                />
              </div>
            </div>

            {/* 密码 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                密码
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="输入密码（至少6位）"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input-field w-full pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* 确认密码 (仅注册) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  确认密码
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="再次输入密码"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="input-field w-full pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* 记住我 (仅登录) */}
            {!isSignUp && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded accent-purple-600"
                />
                <label htmlFor="remember" className="text-sm text-gray-400">
                  记住我
                </label>
              </div>
            )}

            {/* 提交按钮 */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full mt-6 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading && <Loader className="w-4 h-4 animate-spin" />}
              {isSignUp ? '创建账户' : '登录'}
            </button>
          </form>

          {/* 演示登录按钮 */}
          <button
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="btn-secondary w-full flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading && <Loader className="w-4 h-4 animate-spin" />}
            🎵 演示登录
          </button>

          {/* 分割线 */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-purple-500/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900 text-gray-400">或</span>
            </div>
          </div>

          {/* 社交登录 */}
          <div className="space-y-2 mb-8">
            <button className="w-full btn-secondary flex items-center justify-center gap-2 disabled:opacity-50">
              <span>🔗</span> 微博登录
            </button>
            <button className="w-full btn-secondary flex items-center justify-center gap-2 disabled:opacity-50">
              <span>💬</span> 微信登录
            </button>
          </div>

          {/* 切换登录/注册 */}
          <div className="text-center text-sm text-gray-400">
            {isSignUp ? (
              <>
                已有账户？{' '}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  立即登录
                </button>
              </>
            ) : (
              <>
                没有账户？{' '}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  创建账户
                </button>
              </>
            )}
          </div>

          {/* 底部提示 */}
          <div className="mt-8 p-4 bg-purple-600/10 border border-purple-500/20 rounded-lg text-center">
            <p className="text-xs text-gray-400">
              💡 提示：点击"演示登录"快速体验所有功能
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
