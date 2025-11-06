import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { Music, Menu, X, LogOut, User } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);

  const navLinks = [
    { name: '首页', path: '/' },
    { name: '音乐库', path: '/music' },
    { name: '粉丝社区', path: '/community' },
    { name: '演唱会', path: '/concerts' },
    { name: '个人中心', path: '/profile' },
    { name: '智能电台', path: '/radio' },
    { name: '排行榜', path: '/rankings' },
    { name: '粉丝故事', path: '/fan-stories' },
    { name: '音乐挑战', path: '/challenge' },
    { name: '创意墙', path: '/creative' },
    { name: '应援墙', path: '/support' },
  ];

  const handleLogout = () => {
    dispatch(logout());
    setIsUserMenuOpen(false);
    navigate('/login', { replace: true });
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-purple flex items-center justify-center group-hover:shadow-glow-purple transition-all">
                <Music className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-gradient-purple bg-clip-text text-transparent hidden sm:inline">
                JM Love JJ
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-300 hover:text-purple-400 transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-purple group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

            {/* Auth & User Menu */}
            <div className="flex items-center gap-4">
              {user && (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-600/10 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-purple flex items-center justify-center text-white text-sm font-bold">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-white hidden sm:inline">
                      {user.username}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg border border-purple-500/20 shadow-lg overflow-hidden animate-slide-down">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:bg-purple-600/20 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        个人中心
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-3 text-gray-300 hover:bg-red-600/20 transition-colors border-t border-purple-500/10"
                      >
                        <LogOut className="w-4 h-4" />
                        登出
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className="md:hidden btn-icon"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <nav className="md:hidden pb-4 space-y-2 animate-slide-down">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block px-4 py-2 text-gray-300 hover:text-purple-400 hover:bg-purple-600/10 rounded-lg transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-300 hover:text-red-400 hover:bg-red-600/10 rounded-lg transition-all flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                登出
              </button>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
