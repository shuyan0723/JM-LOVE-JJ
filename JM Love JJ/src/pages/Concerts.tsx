import { useState } from 'react';
import { Calendar, MapPin, Ticket, Image, Users } from 'lucide-react';

export default function Concerts() {
  const [selectedConcert, setSelectedConcert] = useState(null);

  const concerts = [
    {
      id: 1,
      name: '2024 JJ 世界巡回演唱会 - 北京站',
      date: '2024年12月15日',
      time: '19:30',
      location: '北京国家体育场',
      city: '北京',
      image: '🎤',
      tickets: '已发售',
      price: '¥280-980',
      capacity: '50000',
      status: 'upcoming',
    },
    {
      id: 2,
      name: '2024 JJ 世界巡回演唱会 - 上海站',
      date: '2024年12月22日',
      time: '19:30',
      location: '上海体育场',
      city: '上海',
      image: '🎸',
      tickets: '即将开售',
      price: '¥280-980',
      capacity: '42000',
      status: 'upcoming',
    },
    {
      id: 3,
      name: '2024 JJ 世界巡回演唱会 - 广州站',
      date: '2024年12月29日',
      time: '19:30',
      location: '广州体育馆',
      city: '广州',
      image: '🎵',
      tickets: '即将开售',
      price: '¥280-980',
      capacity: '35000',
      status: 'upcoming',
    },
    {
      id: 4,
      name: '2024 JJ 澳门演唱会',
      date: '2024年12月28日',
      time: '20:00',
      location: '澳门威尼斯人',
      city: '澳门',
      image: '🌟',
      tickets: '已发售',
      price: '¥380-1280',
      capacity: '6000',
      status: 'upcoming',
    },
    {
      id: 5,
      name: '2024 JJ 台北演唱会',
      date: '2025年1月18日',
      time: '19:30',
      location: '台北小巨蛋',
      city: '台北',
      image: '🎭',
      tickets: '预告',
      price: '¥320-1080',
      capacity: '15000',
      status: 'upcoming',
    },
  ];

  const galleryPhotos = [
    { id: 1, title: '2023演唱会精彩瞬间', image: '📸' },
    { id: 2, title: 'JJ与粉丝互动', image: '🤝' },
    { id: 3, title: '舞台灯光秀', image: '💡' },
    { id: 4, title: '粉丝合唱时刻', image: '🎤' },
    { id: 5, title: '舞台表演精彩', image: '🎪' },
    { id: 6, title: '谢幕时刻', image: '⭐' },
  ];

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900/40 via-slate-950 to-slate-950 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="section-title mb-4">演唱会中心</h1>
          <p className="section-subtitle">不错过任何精彩演出，与JJ现场互动</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Upcoming Concerts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">即将演出</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {concerts.map(concert => (
              <div
                key={concert.id}
                className="card p-6 hover:scale-105 transform transition-all cursor-pointer"
                onClick={() => setSelectedConcert(concert)}
              >
                {/* Concert Image */}
                <div className="w-full h-40 bg-gradient-purple rounded-lg flex items-center justify-center text-6xl mb-4">
                  {concert.image}
                </div>

                {/* Concert Info */}
                <h3 className="text-xl font-semibold text-white mb-4">{concert.name}</h3>

                <div className="space-y-3 mb-6 text-gray-300">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">{concert.date}</p>
                      <p className="text-sm text-gray-400">{concert.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">{concert.location}</p>
                      <p className="text-sm text-gray-400">{concert.city}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <p className="font-semibold">容纳人数：{concert.capacity}</p>
                  </div>
                </div>

                {/* Ticket Info */}
                <div className="border-t border-purple-500/20 pt-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-300">票价范围</span>
                    <span className="font-bold text-purple-400">{concert.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-gray-300">{concert.tickets}</span>
                  </div>
                </div>

                {/* Action Button */}
                <button className="btn-primary w-full">查看详情</button>
              </div>
            ))}
          </div>
        </section>

        {/* Concert Gallery */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">精彩回顾</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryPhotos.map(photo => (
              <div
                key={photo.id}
                className="card p-6 hover:scale-105 transform transition-all cursor-pointer"
              >
                <div className="w-full h-40 bg-gradient-to-br from-purple-900/40 to-slate-800 rounded-lg flex items-center justify-center text-5xl mb-4 hover:shadow-glow-purple transition-all">
                  {photo.image}
                </div>
                <h3 className="font-semibold text-white text-center">{photo.title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Concert Calendar Section */}
        <section>
          <div className="card p-8">
            <h2 className="text-3xl font-bold mb-6">演唱会日历</h2>
            <div className="bg-slate-800/50 rounded-lg p-6">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['日', '一', '二', '三', '四', '五', '六'].map(day => (
                  <div key={day} className="text-center font-semibold text-purple-400 py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => i + 1).map(day => (
                  <div
                    key={day}
                    className={`aspect-square flex items-center justify-center rounded border ${
                      [15, 22, 29, 28].includes(day)
                        ? 'border-purple-500 bg-purple-500/20 font-bold text-purple-400'
                        : 'border-purple-500/10 hover:border-purple-500/50 text-gray-400'
                    } cursor-pointer transition-all`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center text-sm text-gray-400">
                <p>🟣 标记的日期为演唱会日期</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 card p-12 bg-gradient-to-br from-purple-900/20 to-slate-800/50 border-purple-500/50">
          <div className="text-center">
            <h2 className="section-title mb-4">不想错过任何演出？</h2>
            <p className="section-subtitle mb-8">订阅我们的演唱会提醒服务</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="输入你的邮箱"
                className="input-field px-4 py-3 flex-1 max-w-xs"
              />
              <button className="btn-primary">订阅提醒</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
