import mongoose from 'mongoose';

const userInteractionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    // 收藏的音乐
    collectedSongs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Music'
      }
    ],
    // 关注的用户
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    // 粉丝
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    // 创建的歌单
    playlists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist'
      }
    ],
    // 浏览历史
    listenHistory: [
      {
        music: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Music'
        },
        listenedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    // 最多保留 100 条历史
    preferences: {
      theme: {
        type: String,
        enum: ['light', 'dark'],
        default: 'light'
      },
      language: {
        type: String,
        default: 'zh-CN'
      },
      notificationsEnabled: {
        type: Boolean,
        default: true
      }
    }
  },
  {
    timestamps: true
  }
);

// 索引
userInteractionSchema.index({ user: 1 });
userInteractionSchema.index({ 'following': 1 });
userInteractionSchema.index({ 'followers': 1 });

// 添加收藏歌曲
userInteractionSchema.methods.collectSong = async function (songId) {
  if (!this.collectedSongs.includes(songId)) {
    this.collectedSongs.push(songId);
    await this.save();
  }
  return this;
};

// 取消收藏歌曲
userInteractionSchema.methods.uncollectSong = async function (songId) {
  this.collectedSongs = this.collectedSongs.filter(id => id.toString() !== songId.toString());
  await this.save();
  return this;
};

// 关注用户
userInteractionSchema.methods.followUser = async function (userId) {
  if (!this.following.includes(userId)) {
    this.following.push(userId);
    await this.save();
    
    // 更新被关注用户的粉丝列表
    const UserInteraction = mongoose.model('UserInteraction');
    await UserInteraction.updateOne(
      { user: userId },
      { $push: { followers: this.user } }
    );
  }
  return this;
};

// 取消关注用户
userInteractionSchema.methods.unfollowUser = async function (userId) {
  this.following = this.following.filter(id => id.toString() !== userId.toString());
  await this.save();
  
  // 更新被取消关注用户的粉丝列表
  const UserInteraction = mongoose.model('UserInteraction');
  await UserInteraction.updateOne(
    { user: userId },
    { $pull: { followers: this.user } }
  );
  return this;
};

// 添加听歌历史
userInteractionSchema.methods.addToListenHistory = async function (songId) {
  this.listenHistory.unshift({ music: songId });
  
  // 只保留最近 100 条
  if (this.listenHistory.length > 100) {
    this.listenHistory = this.listenHistory.slice(0, 100);
  }
  
  await this.save();
  return this;
};

const UserInteraction = mongoose.model('UserInteraction', userInteractionSchema);

export default UserInteraction;

