import { Heart, Send, Users, Sparkles } from 'lucide-react';

export default function SupportWall() {
  const messages = [
    {
      id: 1,
      author: '永远的粉丝',
      avatar: '💕',
      message: 'JJ，你的音乐陪伴我度过了最黑暗的时刻。感谢有你！',
      likes: 2340,
      date: '1小时前',
    },
    {
      id: 2,
      author: '追梦者',
      avatar: '⭐',
      message: '2024年继续为JJ应援！期待新专辑和演唱会！',
      likes: 3120,
      date: '3小时前',
    },
    {
      id: 3,
      author: '音乐爱好者',
      avatar: '🎵',
      message: 'JJ的每一首歌都值得细细品味，希望你一直保持初心！',
      likes: 1890,
      date: '5小时前',
    },
    {
      id: 4,
      author: '资深迷妹',
      avatar: '💜',
      message: '林俊杰，你是我心目中最伟大的歌手！永远爱你！',
      likes: 4560,
      date: '8小时前',
    },
    {
      id: 5,
      author: '年轻粉丝',
      avatar: '🌟',
      message: '从小听JJ的歌长大，现在把这份爱传给下一代！',
      likes: 2340,
      date: '12小时前',
    },
    {
      id: 6,
      author: '国际粉丝',
      avatar: '🌍',
      message: 'JJ的音乐超越了语言和文化的界限，全世界都爱你！',
      likes: 3890,
      date: '1天前',
    },
  ];

  const campaigns = [
    {
      id: 1,
      name: '2024世界巡回演唱会应援',
      description: '为JJ的全球巡演加油',
      participants: '45.3K',
      progress: 85,
      emoji: '🌍',
    },
    {
      id: 2,
      name: '新专辑上线庆祝',
      description: '期待JJ的最新作品',
      participants: '32.1K',
      progress: 65,
      emoji: '🎙️',
    },
    {
      id: 3,
      name: '20周年粉丝应援',
      description: '陪伴JJ走过20年',
      participants: '58.7K',
      progress: 92,
      emoji: '🎂',
    },
  ];

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900/40 via-slate-950 to-slate-950 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-purple flex items-center justify-center text-2xl">
              💝
            </div>
            <div>
              <h1 className="section-title mb-2">应援墙</h1>
              <p className="section-subtitle">全球粉丝为JJ的应援和祝福</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Post Message Section */}
        <section className="mb-16">
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">为JJ留言</h2>
            <div className="space-y-4">
              <textarea
                placeholder="说出你对JJ的想法和祝福..."
                className="input-field w-full resize-none h-24"
              />
              <div className="flex items-center justify-between">
                <button className="btn-icon text-gray-400 hover:text-purple-400">
                  <Sparkles className="w-5 h-5" />
                </button>
                <button className="btn-primary flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  发送应援
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Campaigns Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">应援活动</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campaigns.map(campaign => (
              <div key={campaign.id} className="card p-6">
                <div className="text-4xl mb-4">{campaign.emoji}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{campaign.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{campaign.description}</p>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                    <span>参与度</span>
                    <span>{campaign.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-purple h-full rounded-full transition-all"
                      style={{ width: `${campaign.progress}%` }}
                    ></div>
                  </div>
                </div>

                <p className="text-purple-400 font-semibold text-sm mb-4">
                  👥 {campaign.participants} 人参与
                </p>

                <button className="btn-secondary w-full">加入应援</button>
              </div>
            ))}
          </div>
        </section>

        {/* Messages Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">应援留言</h2>
          <div className="space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className="card p-6 hover:border-purple-500/50 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-purple flex items-center justify-center text-lg">
                      {msg.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{msg.author}</h3>
                      <p className="text-xs text-gray-400">{msg.date}</p>
                    </div>
                  </div>
                  <button className="btn-icon text-gray-400 hover:text-red-400">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-gray-300 mb-4 leading-relaxed">{msg.message}</p>

                <div className="flex items-center justify-between text-sm">
                  <button className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>{msg.likes}</span>
                  </button>
                  <button className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                    回复
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <button className="btn-secondary px-8">
              加载更多留言
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
