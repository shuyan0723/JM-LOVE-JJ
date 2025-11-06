import { Loader } from 'lucide-react';

export default function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-center">
        <div className="mb-6">
          <Loader className="w-12 h-12 text-purple-400 animate-spin mx-auto" />
        </div>
        <p className="text-gray-400">加载中...</p>
        <div className="mt-4 flex gap-1 justify-center">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}

