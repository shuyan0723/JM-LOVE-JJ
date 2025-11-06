import { useState } from 'react';
import { Play, Trophy, Zap, Volume2 } from 'lucide-react';

export default function MusicChallenge() {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const challenges = [
    {
      id: 'lyric',
      name: '歌词填空',
      icon: '✍️',
      description: '填写缺失的歌词内容',
      difficulty: '简单',
      color: 'from-green-500 to-emerald-500',
      rewards: '50 积分',
    },
    {
      id: 'guess',
      name: '歌曲识别',
      icon: '🎵',
      description: '根据歌词片段猜歌曲',
      difficulty: '中等',
      color: 'from-blue-500 to-cyan-500',
      rewards: '100 积分',
    },
    {
      id: 'speed',
      name: '速度竞赛',
      icon: '⚡',
      description: '在限定时间内回答问题',
      difficulty: '困难',
      color: 'from-red-500 to-orange-500',
      rewards: '200 积分',
    },
    {
      id: 'memory',
      name: '记忆挑战',
      icon: '🧠',
      description: '记住歌曲顺序和歌词',
      difficulty: '困难',
      color: 'from-purple-500 to-pink-500',
      rewards: '150 积分',
    },
    {
      id: 'mv',
      name: 'MV知识',
      icon: '🎬',
      description: '回答关于MV的问题',
      difficulty: '中等',
      color: 'from-yellow-500 to-orange-500',
      rewards: '100 积分',
    },
    {
      id: 'trivia',
      name: 'JJ知识竞答',
      icon: '🎤',
      description: '林俊杰的个人信息和趣事',
      difficulty: '简单',
      color: 'from-indigo-500 to-purple-500',
      rewards: '75 积分',
    },
  ];

  const questionsData = {
    lyric: [
      {
        question: '歌词填空：江南，______在古镇的小巷口',
        options: ['雨下', '风吹', '雪飘', '水流'],
        correct: 0,
      },
      {
        question: '歌词填空：曹操，他的故事______人评说',
        options: ['众多', '很多', '无数', '满城'],
        correct: 3,
      },
    ],
    guess: [
      {
        question: '歌词："她说她说她说"是哪首歌曲',
        options: ['她说', '曹操', '江南', '醉赤壁'],
        correct: 0,
      },
    ],
  };

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900/40 via-slate-950 to-slate-950 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-purple flex items-center justify-center text-2xl">
              🎮
            </div>
            <div>
              <h1 className="section-title mb-2">音乐挑战</h1>
              <p className="section-subtitle">通过互动游戏测试你的JJ知识</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {!selectedChallenge ? (
          <>
            {/* Score Card */}
            <div className="mb-12 card p-8 bg-gradient-to-r from-purple-900/20 to-slate-800/50 border-purple-500/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 mb-2">你的积分</p>
                  <h2 className="text-4xl font-bold text-purple-400">{score}</h2>
                </div>
                <Trophy className="w-16 h-16 text-yellow-400" />
              </div>
            </div>

            {/* Challenges Grid */}
            <h2 className="text-2xl font-bold text-white mb-6">选择挑战</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map(challenge => (
                <button
                  key={challenge.id}
                  onClick={() => setSelectedChallenge(challenge.id)}
                  className="card p-6 hover:border-purple-500/50 hover:scale-105 transform transition-all text-left"
                >
                  <div className={`h-20 rounded-lg bg-gradient-to-br ${challenge.color} flex items-center justify-center text-4xl mb-4`}>
                    {challenge.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{challenge.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{challenge.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-purple-600/30 text-purple-300 text-xs rounded">
                      {challenge.difficulty}
                    </span>
                    <span className="text-yellow-400 font-semibold text-sm">+{challenge.rewards}</span>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Challenge Section */}
            <div className="max-w-3xl mx-auto">
              <button
                onClick={() => setSelectedChallenge(null)}
                className="text-purple-400 hover:text-purple-300 mb-6 flex items-center gap-2"
              >
                ← 返回挑战列表
              </button>

              <div className="card p-8">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white">
                      {challenges.find(c => c.id === selectedChallenge)?.name}
                    </h2>
                    <span className="text-sm text-gray-400">问题 1/2</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-purple h-full rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>

                {(questionsData as any)[selectedChallenge]?.map((q: any, idx: number) => (
                  <div key={idx}>
                    <h3 className="text-xl text-white mb-6">{q.question}</h3>
                    <div className="space-y-3 mb-8">
                      {q.options.map((option: string, optIdx: number) => (
                        <button
                          key={optIdx}
                          onClick={() => {
                            if (optIdx === q.correct) {
                              setScore(score + 100);
                              alert('答对了！');
                            } else {
                              alert('答错了！');
                            }
                          }}
                          className="w-full p-4 text-left border-2 border-purple-500/30 rounded-lg hover:border-purple-500/70 hover:bg-purple-600/10 transition-all text-gray-300 hover:text-white"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <button className="btn-primary w-full">下一题</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
