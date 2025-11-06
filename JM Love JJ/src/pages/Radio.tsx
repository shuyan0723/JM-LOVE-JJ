import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { playMusic } from '../store/slices/musicSlice';
import { Radio, Play, Pause, Music, Zap, Heart, Volume2 } from 'lucide-react';

export default function RadioPage() {
  const dispatch = useAppDispatch();
  const [selectedMood, setSelectedMood] = useState('all');
  const [isPlaying, setIsPlaying] = useState(false);

  const moods = [
    { id: 'happy', name: '快乐', emoji: '😊', color: 'from-yellow-500 to-orange-500' },
    { id: 'romantic', name: '浪漫', emoji: '💕', color: 'from-pink-500 to-red-500' },
    { id: 'sad', name: '伤感', emoji: '😢', color: 'from-blue-500 to-purple-500' },
    { id: 'energetic', name: '活力', emoji: '🔥', color: 'from-red-500 to-yellow-500' },
    { id: 'relax', name: '放松', emoji: '🌙', color: 'from-indigo-500 to-purple-500' },
    { id: 'all', name: '全部', emoji: '🎵', color: 'from-purple-500 to-pink-500' },
  ];

  const stationPlaylists = [
    {
      id: 1,
      name: '晨间电台',
      description: '用JJ的音乐开启美好的一天',
      emoji: '🌅',
      songs: 24,
      listeners: '12.3K',
      gradient: 'from-orange-500 to-yellow-500',
    },
    {
      id: 2,
      name: '午后咖啡厅',
      description: '午后的陪伴，温暖的旋律',
      emoji: '☕',
      songs: 18,
      listeners: '8.9K',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      id: 3,
      name: '夜间电台',
      description: '夜晚的思考，心灵的对话',
      emoji: '🌙',
      songs: 32,
      listeners: '15.6K',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      id: 4,
      name: '运动电台',
      description: '燃烧卡路里，跟随节奏',
      emoji: '💪',
      songs: 20,
      listeners: '9.2K',
      gradient: 'from-red-500 to-orange-500',
    },
    {
      id: 5,
      name: '治愈电台',
      description: '疗愈你的心灵',
      emoji: '💚',
      songs: 28,
      listeners: '11.4K',
      gradient: 'from-green-500 to-teal-500',
    },
    {
      id: 6,
      name: '纪念日电台',
      description: '每一首歌都是回忆',
      emoji: '📅',
      songs: 35,
      listeners: '18.7K',
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  const recommendedSongs = [
    { id: 1, name: '曹操', mood: 'energetic', rating: 4.9 },
    { id: 2, name: '她说', mood: 'romantic', rating: 4.8 },
    { id: 3, name: '江南', mood: 'relax', rating: 4.7 },
    { id: 4, name: '一个人在雨中哭泣', mood: 'sad', rating: 4.8 },
    { id: 5, name: '不为谁而唱歌', mood: 'happy', rating: 4.6 },
    { id: 6, name: '醉赤壁', mood: 'energetic', rating: 4.9 },
  ];

  const filteredSongs = selectedMood === 'all' 
    ? recommendedSongs 
    : recommendedSongs.filter(s => s.mood === selectedMood);

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900/40 via-slate-950 to-slate-950 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-purple flex items-center justify-center text-2xl">
              📻
            </div>
            <div>
              <h1 className="section-title mb-2">智能电台</h1>
              <p className="section-subtitle">AI为你打造个性化音乐电台</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Mood Selection */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">你现在的心情？</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {moods.map(mood => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`p-6 rounded-lg transition-all transform hover:scale-105 ${
                  selectedMood === mood.id
                    ? `bg-gradient-to-br ${mood.color} shadow-glow-purple`
                    : 'card hover:border-purple-500/50'
                }`}
              >
                <div className="text-3xl mb-2">{mood.emoji}</div>
                <p className={selectedMood === mood.id ? 'text-white font-semibold' : 'text-gray-300'}>
                  {mood.name}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Featured Stations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">精选电台</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stationPlaylists.map(station => (
              <div key={station.id} className="card overflow-hidden hover:scale-105 transform transition-all">
                <div className={`h-40 bg-gradient-to-br ${station.gradient} flex items-center justify-center text-6xl`}>
                  {station.emoji}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{station.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{station.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span>🎵 {station.songs} 首歌</span>
                    <span>👥 {station.listeners}</span>
                  </div>
                  <button className="btn-primary w-full flex items-center justify-center gap-2">
                    <Play className="w-4 h-4" />
                    播放电台
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Songs */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">为你推荐</h2>
          <div className="space-y-3">
            {filteredSongs.map((song, idx) => (
              <div key={song.id} className="card p-4 flex items-center justify-between hover:bg-purple-600/5">
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-xl font-bold text-purple-400 w-8">{idx + 1}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{song.name}</h3>
                    <p className="text-sm text-gray-400">林俊杰</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-gray-300">{song.rating}</span>
                  </div>
                  <button 
                    onClick={() => dispatch(playMusic({ 
                      id: song.id, 
                      name: song.name, 
                      artist: '林俊杰', 
                      album: '推荐', 
                      duration: '4:00', 
                      plays: '100K' 
                    }))}
                    className="btn-icon text-purple-400 hover:text-purple-300"
                  >
                    <Play className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Insights */}
        <section className="mt-16 card p-8 bg-gradient-to-br from-purple-900/20 to-slate-800/50 border-purple-500/50">
          <div className="flex items-start gap-4">
            <Zap className="w-8 h-8 text-purple-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">🤖 AI 音乐洞察</h3>
              <p className="text-gray-300">
                根据你的收听习惯，我们发现你最喜欢的音乐风格是：<span className="text-purple-400 font-semibold">励志摇滚</span>。
                建议你也试试<span className="text-purple-400 font-semibold">醉赤壁</span>和<span className="text-purple-400 font-semibold">曹操</span>这类偏摇滚风格的歌曲。
              </p>
              <p className="text-gray-400 text-sm mt-3">
                💡 你的听歌时间偏好：晚上 9-11 点，推荐在这个时间段使用"夜间电台"获得最佳体验
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
