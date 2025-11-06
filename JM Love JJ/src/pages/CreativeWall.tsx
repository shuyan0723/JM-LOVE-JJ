import { useState } from 'react';
import { Heart, Play, MessageCircle, Upload } from 'lucide-react';

export default function CreativeWall() {
  const [works] = useState([
    {
      id: 1,
      author: '翻唱达人',
      avatar: '🎤',
      title: '《曹操》翻唱 - 摇滚版',
      type: '翻唱',
      thumbnail: '🎤',
      likes: 3240,
      views: '12.5K',
      date: '2024-10-20',
    },
    {
      id: 2,
      author: '绘画艺术家',
      avatar: '🎨',
      title: '《江南》主题插画',
      type: '绘画',
      thumbnail: '🎨',
      likes: 2890,
      views: '8.3K',
      date: '2024-10-18',
    },
    {
      id: 3,
      author: '视频创作者',
      avatar: '🎬',
      title: 'JJ歌曲混剪 - 记忆之旅',
      type: '视频',
      thumbnail: '🎬',
      likes: 4120,
      views: '15.8K',
      date: '2024-10-16',
    },
    {
      id: 4,
      author: '舞蹈爱好者',
      avatar: '💃',
      title: '《她说》舞蹈翻跳',
      type: '舞蹈',
      thumbnail: '💃',
      likes: 2340,
      views: '9.2K',
      date: '2024-10-14',
    },
  ]);

  const categories = [
    { name: '全部', emoji: '🎵', count: 324 },
    { name: '翻唱', emoji: '🎤', count: 85 },
    { name: '绘画', emoji: '🎨', count: 62 },
    { name: '视频', emoji: '🎬', count: 104 },
    { name: '舞蹈', emoji: '💃', count: 45 },
    { name: '其他', emoji: '✨', count: 28 },
  ];

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900/40 via-slate-950 to-slate-950 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-purple flex items-center justify-center text-2xl">
              🎨
            </div>
            <div>
              <h1 className="section-title mb-2">创意墙</h1>
              <p className="section-subtitle">展示你的创意作品，获得粉丝认可</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Upload Button */}
        <div className="mb-12">
          <button className="btn-primary w-full flex items-center justify-center gap-2 py-4">
            <Upload className="w-5 h-5" />
            上传你的创意作品
          </button>
        </div>

        {/* Categories */}
        <div className="mb-12 overflow-x-auto pb-4">
          <div className="flex gap-3">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                  idx === 0
                    ? 'bg-gradient-purple text-white'
                    : 'card hover:border-purple-500/50'
                }`}
              >
                {cat.emoji} {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {works.map(work => (
            <div key={work.id} className="card overflow-hidden hover:scale-105 transform transition-all group">
              {/* Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-purple-900/40 to-slate-800 flex items-center justify-center text-5xl overflow-hidden">
                {work.thumbnail}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-12 h-12 text-white" />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-purple flex items-center justify-center text-sm">
                    {work.avatar}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{work.author}</p>
                    <span className="px-2 py-0.5 bg-purple-600/20 text-purple-300 text-xs rounded">
                      {work.type}
                    </span>
                  </div>
                </div>

                <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2">{work.title}</h3>

                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <span>👁️ {work.views}</span>
                  <span>{work.date}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <button className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>{work.likes}</span>
                  </button>
                  <button className="btn-icon text-gray-400 hover:text-purple-400">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="btn-secondary px-8">
            加载更多作品
          </button>
        </div>
      </div>
    </div>
  );
}
