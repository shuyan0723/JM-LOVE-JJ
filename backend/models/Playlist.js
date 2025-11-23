import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '请提供歌单名称'],
      trim: true,
      maxlength: [100, '歌单名称最多 100 个字符']
    },
    description: {
      type: String,
      maxlength: [500, '描述最多 500 个字符'],
      default: ''
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    cover: {
      type: String,
      default: null
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Music'
      }
    ],
    isPublic: {
      type: Boolean,
      default: true
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    followerCount: {
      type: Number,
      default: 0,
      min: 0
    },
    playCount: {
      type: Number,
      default: 0,
      min: 0
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ]
  },
  {
    timestamps: true
  }
);

// 索引
playlistSchema.index({ creator: 1 });
playlistSchema.index({ isPublic: 1 });
playlistSchema.index({ followerCount: -1 });
playlistSchema.index({ playCount: -1 });
playlistSchema.index({ name: 'text', description: 'text', tags: 'text' });

// 虚拟属性
playlistSchema.virtual('songCount').get(function () {
  return this.songs.length;
});

playlistSchema.virtual('creatorInfo', {
  ref: 'User',
  localField: 'creator',
  foreignField: '_id',
  justOne: true
});

playlistSchema.set('toJSON', { virtuals: true });

const Playlist = mongoose.model('Playlist', playlistSchema);

export default Playlist;

