import mongoose from 'mongoose';

const musicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, '请提供歌曲名称'],
      trim: true,
      maxlength: [200, '歌曲名称最多 200 个字符']
    },
    artist: {
      type: String,
      required: [true, '请提供艺术家名称'],
      trim: true
    },
    album: {
      type: String,
      trim: true,
      default: '单曲'
    },
    duration: {
      type: Number,
      required: [true, '请提供歌曲时长'],
      min: [0, '时长不能为负数']
    },
    genre: {
      type: String,
      enum: ['流行', '摇滚', '民谣', '电子', '说唱', '其他'],
      default: '流行'
    },
    cover: {
      type: String,
      default: null
    },
    url: {
      type: String,
      required: [true, '请提供音乐文件 URL']
    },
    releaseDate: {
      type: Date,
      default: Date.now
    },
    lyrics: {
      type: String,
      default: null
    },
    description: {
      type: String,
      maxlength: [500, '描述最多 500 个字符']
    },
    plays: {
      type: Number,
      default: 0,
      min: 0
    },
    likes: {
      type: Number,
      default: 0,
      min: 0
    },
    collections: {
      type: Number,
      default: 0,
      min: 0
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    isPublished: {
      type: Boolean,
      default: true
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
musicSchema.index({ title: 'text', artist: 'text', tags: 'text' });
musicSchema.index({ createdBy: 1 });
musicSchema.index({ isPublished: 1 });
musicSchema.index({ plays: -1 });
musicSchema.index({ likes: -1 });

// 虚拟属性：获取艺术家信息
musicSchema.virtual('artistDetails', {
  ref: 'User',
  localField: 'createdBy',
  foreignField: '_id',
  justOne: true
});

// 转换为 JSON 时包含虚拟属性
musicSchema.set('toJSON', { virtuals: true });

const Music = mongoose.model('Music', musicSchema);

export default Music;

