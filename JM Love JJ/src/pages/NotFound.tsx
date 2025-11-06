import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Music } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-900/20 to-slate-950 px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <div className="text-9xl font-bold bg-gradient-purple bg-clip-text text-transparent mb-4">
            404
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            页面未找到
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            抱歉，你访问的页面不存在或已被移动。
            <br />
            但JJ的音乐永远在这里陪伴你！
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/" className="btn-primary flex items-center gap-2">
            <Home className="w-4 h-4" />
            返回首页
          </Link>
          <Link to="/music" className="btn-secondary flex items-center gap-2">
            <Music className="w-4 h-4" />
            探索音乐
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            返回上页
          </button>
        </div>

        <div className="mt-12 text-gray-500 text-sm">
          <p>🎵 用爱，唱出我的故事</p>
        </div>
      </div>
    </div>
  );
}

