import { useState } from 'react';
import { TrendingUp, Music, Users, Award, Heart } from 'lucide-react';

export default function Rankings() {
  const [activeTab, setActiveTab] = useState<'songs' | 'users' | 'weekly'>('songs');

  const songRankings = [
    { rank: 1, name: '曹操', artist: '林俊杰', plays: '2.3M', trend: '⬆️' },
    { rank: 2, name: '她说', artist: '林俊杰', plays: '2.1M', trend: '⬆️' },
    { rank: 3, name: '江南', artist: '林俊杰', plays: '1.9M', trend: '→' },
    { rank: 4, name: '醉赤壁', artist: '林俊杰', plays: '1.8M', trend: '⬆️' },
    { rank: 5, name: '一个人在雨中哭泣', artist: '林俊杰', plays: '1.7M', trend: '⬇️' },
    { rank: 6, name: '参加你的婚礼', artist: '林俊杰', plays: '1.5M', trend: '→' },
    { rank: 7, name: '天下没有不散的筵席', artist: '林俊杰', plays: '1.4M', trend: '⬆️' },
    { rank: 8, name: '不为谁而唱歌', artist: '林俊杰', plays: '1.3M', trend: '→' },
  ];

  const userRankings = [
    { rank: 1, username: '紫色粉丝', level: '10级', points: '12,350', badge: '铁粉' },
    { rank: 2, username: '音乐爱好者', level: '9级', points: '11,240', badge: '活跃' },
    { rank: 3, username: '翻唱达人', level: '9级', points: '10,890', badge: '达人' },
    { rank: 4, username: '资深迷妹', level: '8级', points: '9,560', badge: '贡献者' },
    { rank: 5, username: 'JJ的歌迷', level: '8级', points: '8,430', badge: '热心' },
    { rank: 6, username: '音乐狂人', level: '7级', points: '7,890', badge: '活跃' },
    { rank: 7, username: '梦想追逐者', level: '7级', points: '7,230', badge: '新兴' },
    { rank: 8, username: '歌词收集家', level: '6级', points: '6,450', badge: '热心' },
  ];

  const weeklyTrending = [
    { rank: 1, name: '曹操', change: 3, color: 'text-red-400' },
    { rank: 2, name: '醉赤壁', change: 2, color: 'text-orange-400' },
    { rank: 3, name: '江南', change: 1, color: 'text-yellow-400' },
    { rank: 4, name: '她说', change: -1, color: 'text-gray-400' },
    { rank: 5, name: '一个人在雨中哭泣', change: -2, color: 'text-gray-400' },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case '⬆️':
        return <span className="text-green-400">⬆️</span>;
      case '⬇️':
        return <span className="text-red-400">⬇️</span>;
      default:
        return <span className="text-gray-400">→</span>;
    }
  };

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900/40 via-slate-950 to-slate-950 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-purple flex items-center justify-center text-2xl">
              🏆
            </div>
            <div>
              <h1 className="section-title mb-2">排行榜</h1>
              <p className="section-subtitle">发现最热门的音乐和粉丝</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-12 border-b border-purple-500/20">
          <button
            onClick={() => setActiveTab('songs')}
            className={`pb-4 px-6 font-semibold transition-colors ${
              activeTab === 'songs'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Music className="w-4 h-4 inline mr-2" />
            热门歌曲
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-4 px-6 font-semibold transition-colors ${
              activeTab === 'users'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            粉丝排行
          </button>
          <button
            onClick={() => setActiveTab('weekly')}
            className={`pb-4 px-6 font-semibold transition-colors ${
              activeTab === 'weekly'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <TrendingUp className="w-4 h-4 inline mr-2" />
            周榜
          </button>
        </div>

        {/* Songs Rankings */}
        {activeTab === 'songs' && (
          <section>
            <div className="space-y-3">
              {songRankings.map((song, idx) => (
                <div
                  key={idx}
                  className="card p-4 flex items-center justify-between hover:bg-purple-600/5 group"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${
                      song.rank === 1
                        ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white'
                        : song.rank === 2
                        ? 'bg-gradient-to-br from-gray-400 to-gray-500 text-white'
                        : song.rank === 3
                        ? 'bg-gradient-to-br from-orange-600 to-orange-700 text-white'
                        : 'bg-slate-700 text-gray-300'
                    }`}>
                      {song.rank}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{song.name}</h3>
                      <p className="text-sm text-gray-400">{song.artist}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden md:block">
                      <p className="font-semibold text-purple-400">{song.plays}</p>
                      <p className="text-xs text-gray-400">播放数</p>
                    </div>
                    <div className="text-2xl">{getTrendIcon(song.trend)}</div>
                    <button className="btn-icon text-gray-400 hover:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* User Rankings */}
        {activeTab === 'users' && (
          <section>
            <div className="space-y-3">
              {userRankings.map((user, idx) => (
                <div
                  key={idx}
                  className="card p-4 flex items-center justify-between hover:bg-purple-600/5"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      user.rank === 1
                        ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white'
                        : user.rank === 2
                        ? 'bg-gradient-to-br from-gray-400 to-gray-500 text-white'
                        : user.rank === 3
                        ? 'bg-gradient-to-br from-orange-600 to-orange-700 text-white'
                        : 'bg-slate-700 text-gray-300'
                    }`}>
                      {user.rank}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{user.username}</h3>
                      <div className="flex gap-2 items-center">
                        <span className="text-xs text-gray-400">{user.level}</span>
                        <span className="px-2 py-0.5 bg-purple-600/30 text-purple-300 text-xs rounded-full">
                          {user.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-purple-400">{user.points}</p>
                    <p className="text-xs text-gray-400">积分</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Weekly Trending */}
        {activeTab === 'weekly' && (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Top 5 */}
              <div>
                <h3 className="text-xl font-bold text-white mb-6">本周热歌 Top 5</h3>
                <div className="space-y-3">
                  {weeklyTrending.map((song, idx) => (
                    <div key={idx} className="card p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-3xl font-bold text-purple-400">{song.rank}</div>
                        <div>
                          <h3 className="font-semibold text-white">{song.name}</h3>
                          <p className="text-sm text-gray-400">林俊杰</p>
                        </div>
                      </div>
                      <div className={`text-2xl font-bold ${song.color}`}>
                        {song.change > 0 ? '⬆️' : '⬇️'}
                        <span className="text-sm ml-1">{Math.abs(song.change)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Stats */}
              <div>
                <h3 className="text-xl font-bold text-white mb-6">数据洞察</h3>
                <div className="space-y-4">
                  <div className="card p-6 bg-gradient-to-br from-green-900/20 to-slate-800/50 border-green-500/20">
                    <p className="text-gray-400 text-sm mb-2">本周播放数最多</p>
                    <h4 className="text-2xl font-bold text-white">2.3M</h4>
                    <p className="text-xs text-gray-400 mt-2">《曹操》</p>
                  </div>
                  <div className="card p-6 bg-gradient-to-br from-pink-900/20 to-slate-800/50 border-pink-500/20">
                    <p className="text-gray-400 text-sm mb-2">最受欢迎的风格</p>
                    <h4 className="text-2xl font-bold text-white">励志摇滚</h4>
                    <p className="text-xs text-gray-400 mt-2">占所有播放的 35%</p>
                  </div>
                  <div className="card p-6 bg-gradient-to-br from-purple-900/20 to-slate-800/50 border-purple-500/20">
                    <p className="text-gray-400 text-sm mb-2">粉丝活跃度</p>
                    <h4 className="text-2xl font-bold text-white">+23%</h4>
                    <p className="text-xs text-gray-400 mt-2">较上周增长</p>
                  </div>
                  <div className="card p-6 bg-gradient-to-br from-blue-900/20 to-slate-800/50 border-blue-500/20">
                    <p className="text-gray-400 text-sm mb-2">新增粉丝</p>
                    <h4 className="text-2xl font-bold text-white">2.4K</h4>
                    <p className="text-xs text-gray-400 mt-2">本周新增用户数</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
