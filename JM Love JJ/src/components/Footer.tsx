import { Heart, Music, Github, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-purple-500/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-purple flex items-center justify-center">
                <Music className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold">JM Love JJ</span>
            </div>
            <p className="text-gray-400 text-sm">
              用爱，唱出我的故事。一个专为林俊杰粉丝打造的沉浸式网站体验。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-purple-400 transition-colors">首页</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">音乐库</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">粉丝社区</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">演唱会</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">资源</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-purple-400 transition-colors">关于我们</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">隐私政策</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">使用条款</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">联系我们</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">关注我们</h3>
            <div className="flex gap-4">
              <a href="#" className="btn-icon text-gray-400 hover:text-purple-400">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="btn-icon text-gray-400 hover:text-purple-400">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="btn-icon text-gray-400 hover:text-purple-400">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-purple-500/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm text-center md:text-left mb-4 md:mb-0">
              © {currentYear} JM Love JJ. 用爱，唱出我的故事。
            </p>
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              Made with <Heart className="w-4 h-4 text-red-500" /> by JJ Fans
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
