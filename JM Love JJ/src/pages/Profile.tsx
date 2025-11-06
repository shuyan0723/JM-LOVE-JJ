import { useState } from 'react';
import { Edit2, Settings, Download, Share2, Trophy, Music, Heart, Star } from 'lucide-react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const achievements = [
    { id: 1, name: '首次登陆', icon: '🎉', description: '完成首次网站登陆', unlocked: true },
    { id: 2, name: '铁粉', icon: '❤️', description: '收藏50首以上歌曲', unlocked: true },
    { id: 3, name: '社区活跃', icon: '💬', description: '发布10条社区动态', unlocked: true },
    { id: 4, name: '演唱会粉丝', icon: '🎤', description: '参加2场演唱会', unlocked: true },
    { id: 5, name: '翻唱达人', icon: '🎵', description: '发布5个翻唱作品', unlocked: false },
    { id: 6, name: '超级粉丝', icon: '👑', description: '累计在线听歌1000小时', unlocked: false },
  ];

  const stats = [
    { label: '听歌总数', value: '2,458', icon: <Music className="w-6 h-6" /> },
    { label: '收藏歌曲', value: '156', icon: <Heart className="w-6 h-6" /> },
    { label: '社区贡献', value: '34', icon: <Star className="w-6 h-6" /> },
    { label: '成就徽章', value: '4/6', icon: <Trophy className="w-6 h-6" /> },
  ];

  const favoriteSongs = [
    { id: 1, name: '曹操', album: '曹操', plays: 234 },
    { id: 2, name: '她说', album: '编年史', plays: 189 },
    { id: 3, name: '江南', album: '编年史', plays: 156 },
  ];

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900/40 via-slate-950 to-slate-950 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="section-title mb-4">个人中心</h1>
          <p className="section-subtitle">管理你的档案，追踪你的成长</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Profile */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-purple flex items-center justify-center text-4xl hover:shadow-glow-purple transition-all">
                    👤
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">粉丝用户名</h2>
                    <p className="text-gray-400 mb-4">加入时间：2023年6月</p>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-purple-600/30 text-purple-300 text-sm rounded-full">铁粉</span>
                      <span className="px-3 py-1 bg-purple-600/30 text-purple-300 text-sm rounded-full">活跃成员</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn-icon text-gray-400 hover:text-purple-400"
                >
                  <Edit2 className="w-6 h-6" />
                </button>
              </div>

              {/* Bio Section */}
              <div className="border-t border-purple-500/20 pt-6">
                <p className="text-gray-300 mb-4">
                  "音乐是我的生命，JJ的歌陪伴我度过了许多时光。在这里，我找到了志同道合的粉丝朋友们。"
                </p>
                <div className="flex gap-2 text-sm text-gray-400">
                  <span>📍 北京</span>
                  <span>🎂 生日：1995年5月20日</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6 pt-6 border-t border-purple-500/20">
                <button className="btn-primary flex items-center gap-2">
                  <Edit2 className="w-4 h-4" />
                  编辑资料
                </button>
                <button className="btn-secondary flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  设置
                </button>
                <button className="btn-secondary flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  分享
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="card p-6 text-center hover:scale-105 transform transition-all">
                  <div className="flex justify-center mb-3 text-purple-400">
                    {stat.icon}
                  </div>
                  <p className="text-2xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Level */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">粉丝等级</h3>
              <div className="text-center py-4">
                <div className="text-5xl mb-3">⭐⭐⭐⭐</div>
                <p className="text-2xl font-bold text-purple-400 mb-2">4 级</p>
                <p className="text-sm text-gray-400">活跃粉丝</p>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">升级进度</span>
                  <span className="text-purple-400">750/1000</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-purple transition-all duration-500"
                    style={{ width: '75%' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card p-6 space-y-3">
              <button className="w-full btn-primary flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                下载我的数据
              </button>
              <button className="w-full btn-secondary flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" />
                分享个人页面
              </button>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">成就徽章</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {achievements.map(achievement => (
              <div
                key={achievement.id}
                className={`card p-4 text-center hover:scale-105 transform transition-all ${
                  achievement.unlocked ? 'border-purple-500/50' : 'opacity-50'
                }`}
              >
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <h3 className="font-semibold text-white text-sm mb-1">{achievement.name}</h3>
                <p className="text-xs text-gray-400">{achievement.description}</p>
                {!achievement.unlocked && (
                  <p className="text-xs text-orange-400 mt-2">🔒 未解锁</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Favorite Songs */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">最爱歌曲</h2>
          <div className="space-y-3">
            {favoriteSongs.map((song, idx) => (
              <div key={song.id} className="card p-4 flex items-center justify-between hover:bg-purple-600/5">
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-xl font-bold text-purple-400 w-8 text-center">{idx + 1}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{song.name}</h3>
                    <p className="text-sm text-gray-400">{song.album}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">{song.plays} 次播放</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Collections */}
        <section>
          <h2 className="text-3xl font-bold mb-6">我的收藏</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-8 text-center cursor-pointer hover:scale-105 transform transition-all">
              <div className="text-5xl mb-4">🎵</div>
              <h3 className="text-xl font-semibold text-white mb-2">我的歌单</h3>
              <p className="text-purple-400 font-bold">156 首歌</p>
            </div>
            <div className="card p-8 text-center cursor-pointer hover:scale-105 transform transition-all">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold text-white mb-2">最爱专辑</h3>
              <p className="text-purple-400 font-bold">12 个专辑</p>
            </div>
            <div className="card p-8 text-center cursor-pointer hover:scale-105 transform transition-all">
              <div className="text-5xl mb-4">📸</div>
              <h3 className="text-xl font-semibold text-white mb-2">演唱会足迹</h3>
              <p className="text-purple-400 font-bold">4 场演唱会</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
