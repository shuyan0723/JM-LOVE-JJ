import { Link } from 'react-router-dom';
import { Play, Users, Music, Calendar, Star } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <Music className="w-8 h-8" />,
      title: '沉浸式音乐展厅',
      description: '专辑时间线、3D唱片墙、音乐故事卡，完整展现JJ的音乐历程',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: '互动粉丝社区',
      description: '粉丝墙、翻唱投稿、热门讨论，与全球粉丝互动分享',
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: '演唱会中心',
      description: '演唱会日历、门票聚合、现场回顾，不错过任何精彩',
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: '粉丝成长系统',
      description: '成就徽章、专属挑战、排行榜，成为JJ的超级粉丝',
    },
  ];

  const stats = [
    { label: '活跃粉丝', value: '128K+' },
    { label: '音乐作品', value: '500+' },
    { label: '社区贡献', value: '50K+' },
    { label: '演唱会', value: '200+' },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-slate-950 to-slate-950"></div>
          <div className="absolute top-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-purple bg-clip-text text-transparent">JM Love JJ</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            用爱，唱出我的故事
          </p>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            一个专为林俊杰粉丝打造的沉浸式网站体验。音乐、社区、互动、成长，在这里找到属于你的音乐世界。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/music" className="btn-primary flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              开始探索
            </Link>
            <Link to="/community" className="btn-secondary flex items-center justify-center gap-2">
              加入社区
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-purple-500 rounded-full flex items-center justify-center">
              <div className="w-1 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-purple bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center mb-4">核心功能</h2>
          <p className="section-subtitle text-center mb-16">
            发现为林俊杰粉丝打造的完整功能体验
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="card p-6 hover:scale-105 transform transition-transform">
                <div className="w-12 h-12 rounded-lg bg-gradient-purple flex items-center justify-center mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="card p-12 border-purple-500/50 bg-gradient-to-br from-purple-900/20 to-slate-800/50">
            <h2 className="section-title text-center mb-6">准备好了吗？</h2>
            <p className="section-subtitle text-center mb-8">
              加入我们的粉丝社区，开启你的JJ音乐之旅
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/music" className="btn-primary">
                浏览音乐库
              </Link>
              <Link to="/community" className="btn-secondary">
                加入社区
              </Link>
              <Link to="/concerts" className="btn-secondary">
                查看演唱会
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
