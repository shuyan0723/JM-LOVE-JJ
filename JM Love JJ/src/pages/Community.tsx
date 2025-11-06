import { useAppSelector, useAppDispatch } from '../store/hooks';
import { likePost, unlikePost, incrementUserPosts } from '../store/slices/userSlice';
import { Heart, MessageCircle, Share2, Users, Flame, Eye } from 'lucide-react';

export default function Community() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const { likedPosts } = useAppSelector(state => state.user);

  const posts = [
    {
      id: 1,
      author: '紫色粉丝',
      avatar: '👩',
      time: '2小时前',
      content: '刚买到JJ的新演唱会门票！太激动了，等不及要去现场听他的歌了！',
      initialLikes: 234,
      comments: 45,
      shares: 12,
      type: 'news',
      tag: '演唱会',
    },
    {
      id: 2,
      author: '音乐爱好者',
      avatar: '🎤',
      time: '4小时前',
      content: '"曹操"这首歌真的经久不衰！每次听都有不同的感受，JJ的创作能力真的无敌！',
      initialLikes: 567,
      comments: 89,
      shares: 34,
      type: 'comment',
      tag: '歌曲赏析',
    },
    {
      id: 3,
      author: '翻唱达人',
      avatar: '🎵',
      time: '6小时前',
      content: '我的翻唱作品已发布！希望大家喜欢我对"她说"的演绎版本 🎶',
      initialLikes: 345,
      comments: 67,
      shares: 28,
      type: 'cover',
      tag: '翻唱投稿',
    },
  ];

  const topics = [
    { name: '演唱会', posts: '1.2K', active: true },
    { name: '歌曲赏析', posts: '3.4K', active: true },
    { name: '翻唱投稿', posts: '2.1K', active: true },
    { name: '粉丝故事', posts: '1.8K', active: true },
    { name: '新闻资讯', posts: '890', active: true },
  ];

  const topContributors = [
    { name: '铁粉小张', posts: 234, followers: '2.3K', badge: '铁粉' },
    { name: '音乐小王', posts: 187, followers: '1.8K', badge: '活跃' },
    { name: '翻唱小李', posts: 156, followers: '1.5K', badge: '达人' },
    { name: '资深爱好者', posts: 145, followers: '1.2K', badge: '贡献者' },
  ];

  const toggleLike = (postId: number) => {
    if (!isAuthenticated) {
      alert('请先登录才能点赞');
      return;
    }
    if (likedPosts.includes(postId)) {
      dispatch(unlikePost(postId));
    } else {
      dispatch(likePost(postId));
    }
  };

  const handlePostSubmit = (content: string) => {
    if (!isAuthenticated) {
      alert('请先登录才能发布');
      return;
    }
    if (content.trim()) {
      dispatch(incrementUserPosts());
      alert('发布成功！');
    }
  };

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900/40 via-slate-950 to-slate-950 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="section-title mb-4">粉丝社区</h1>
          <p className="section-subtitle">与全球粉丝互动，分享你的音乐故事</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2">
            {/* New Post */}
            {isAuthenticated && (
              <div className="card p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-purple flex items-center justify-center text-xl">
                    👤
                  </div>
                  <div className="flex-1">
                    <textarea
                      placeholder="分享你对JJ的爱和故事..."
                      className="input-field w-full resize-none h-24"
                      id="post-content"
                    />
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex gap-2">
                        {/* Icon buttons for media */}
                      </div>
                      <button 
                        onClick={() => {
                          const content = (document.getElementById('post-content') as HTMLTextAreaElement)?.value;
                          if (content) {
                            handlePostSubmit(content);
                            (document.getElementById('post-content') as HTMLTextAreaElement).value = '';
                          }
                        }}
                        className="btn-primary"
                      >
                        发布
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Posts Feed */}
            <div className="space-y-4">
              {posts.map(post => {
                const isLiked = likedPosts.includes(post.id);
                const likeCount = isLiked ? post.initialLikes + 1 : post.initialLikes;
                
                return (
                  <div key={post.id} className="card p-6">
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-purple flex items-center justify-center text-xl">
                          {post.avatar}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{post.author}</h3>
                          <p className="text-sm text-gray-400">{post.time}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-purple-600/30 text-purple-300 text-xs rounded-full">
                        {post.tag}
                      </span>
                    </div>

                    {/* Post Content */}
                    <p className="text-gray-300 mb-4 leading-relaxed">{post.content}</p>

                    {/* Post Stats */}
                    <div className="flex items-center gap-6 mb-4 text-sm text-gray-400 border-y border-purple-500/10 py-4">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span>{likeCount} 赞</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments} 评论</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Share2 className="w-4 h-4" />
                        <span>{post.shares} 分享</span>
                      </div>
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-2 flex-1 py-2 px-3 rounded transition-colors ${
                          isLiked
                            ? 'text-red-400 bg-red-400/10'
                            : 'text-gray-400 hover:text-red-400 hover:bg-red-400/10'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                        <span>赞</span>
                      </button>
                      <button className="flex items-center gap-2 flex-1 py-2 px-3 text-gray-400 hover:text-purple-400 hover:bg-purple-400/10 rounded transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span>评论</span>
                      </button>
                      <button className="flex items-center gap-2 flex-1 py-2 px-3 text-gray-400 hover:text-purple-400 hover:bg-purple-400/10 rounded transition-colors">
                        <Share2 className="w-5 h-5" />
                        <span>分享</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Topics */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                热门话题
              </h3>
              <div className="space-y-3">
                {topics.map((topic, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 hover:bg-purple-600/10 rounded cursor-pointer transition-colors"
                  >
                    <span className="text-white font-medium">{topic.name}</span>
                    <span className="text-sm text-gray-400">{topic.posts}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Contributors */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                活跃粉丝
              </h3>
              <div className="space-y-3">
                {topContributors.map((user, idx) => (
                  <div key={idx} className="flex items-start gap-3 hover:bg-purple-600/10 p-2 rounded transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gradient-purple flex items-center justify-center flex-shrink-0 text-sm">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-white truncate">{user.name}</p>
                        <span className="px-2 py-0.5 bg-purple-600/30 text-purple-300 text-xs rounded whitespace-nowrap">
                          {user.badge}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">{user.posts} 个帖子</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Stats */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">社区统计</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">社区成员</span>
                  <span className="font-semibold text-purple-400">128.5K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">今日活跃</span>
                  <span className="font-semibold text-purple-400">12.3K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">总互动量</span>
                  <span className="font-semibold text-purple-400">2.4M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">新帖子</span>
                  <span className="font-semibold text-purple-400">1.2K</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
