import { useState } from 'react';
import { Heart, MessageCircle, Share2, BookOpen, Zap } from 'lucide-react';

export default function FanStories() {
  const [stories] = useState([
    {
      id: 1,
      author: '梦想追逐者',
      avatar: '🌟',
      title: '听《江南》走过最难的时刻',
      excerpt: '那是2015年，我正经历人生中最低谷的时刻。每当我快要放弃时，JJ的《江南》就会在我耳边响起...',
      content: '那是2015年，我正经历人生中最低谷的时刻。每当我快要放弃时，JJ的《江南》就会在我耳边响起。那句"江南，雨下在古镇的小巷口"让我感到似乎有人在陪伴我。如今的我已经度过了难关，每次听到这首歌都会想起那个坚强的自己。',
      likes: 2340,
      comments: 156,
      tags: ['《江南》', '治愈', '励志'],
      date: '2024-10-15',
    },
    {
      id: 2,
      author: '音乐疗愈师',
      avatar: '💚',
      title: '用JJ的歌陪伴我的爱人',
      excerpt: '与其说是粉丝，不如说JJ的音乐是我们爱情的见证。从相识到现在，每一个重要时刻都有JJ的歌...',
      content: '与其说是粉丝，不如说JJ的音乐是我们爱情的见证。从相识到现在，每一个重要时刻都有JJ的歌陪伴。第一次约会听的是《她说》，求婚时的背景音乐是《参加你的婚礼》。今年我们就要结婚了，感谢JJ的音乐让我们的爱情更加闪耀。',
      likes: 3120,
      comments: 287,
      tags: ['爱情', '《她说》', '婚礼'],
      date: '2024-10-10',
    },
    {
      id: 3,
      author: '奋斗的年轻人',
      avatar: '🔥',
      title: '《曹操》激励我在工作中突破自我',
      excerpt: '我是一名创业者，《曹操》这首歌已经成为我的精神寄托。每当遇到困难时，我就会听这首歌...',
      content: '我是一名创业者，《曹操》这首歌已经成为我的精神寄托。每当遇到困难时，我就会听这首歌，那种决断和勇气的气势总能激励我继续前进。去年在最困难的时期，我在演讲会上播放了这首歌，结果成功获得了融资。现在这首歌对我来说不仅是音乐，更是一种信念的力量。',
      likes: 2890,
      comments: 234,
      tags: ['《曹操》', '励志', '创业'],
      date: '2024-10-05',
    },
  ]);

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900/40 via-slate-950 to-slate-950 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-purple flex items-center justify-center text-2xl">
              📖
            </div>
            <div>
              <h1 className="section-title mb-2">粉丝故事</h1>
              <p className="section-subtitle">分享你与JJ音乐的故事</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Share Button */}
        <div className="mb-12">
          <button className="btn-primary w-full flex items-center justify-center gap-2">
            <BookOpen className="w-5 h-5" />
            分享你的故事
          </button>
        </div>

        {/* Stories */}
        <div className="space-y-6">
          {stories.map(story => (
            <article key={story.id} className="card p-8 hover:border-purple-500/50 transition-all">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-purple flex items-center justify-center text-2xl">
                    {story.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{story.author}</h3>
                    <p className="text-sm text-gray-400">{story.date}</p>
                  </div>
                </div>
                <button className="btn-icon text-gray-400 hover:text-purple-400">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <h2 className="text-2xl font-bold text-white mb-4">{story.title}</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">{story.content}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {story.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm text-gray-400 border-t border-purple-500/10 pt-4">
                <button className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>{story.likes} 人赞</span>
                </button>
                <button className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>{story.comments} 条评论</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="btn-secondary px-8">
            加载更多故事
          </button>
        </div>
      </div>
    </div>
  );
}
