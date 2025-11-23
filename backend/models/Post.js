import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, '请提供标题'],
      trim: true,
      maxlength: [200, '标题最多 200 个字符']
    },
    content: {
      type: String,
      required: [true, '请提供内容'],
      maxlength: [5000, '内容最多 5000 个字符']
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    category: {
      type: String,
      enum: ['分享', '讨论', '求助', '新闻', '活动'],
      default: '分享'
    },
    coverImage: {
      type: String,
      default: null
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    likeCount: {
      type: Number,
      default: 0,
      min: 0
    },
    commentsCount: {
      type: Number,
      default: 0,
      min: 0
    },
    viewsCount: {
      type: Number,
      default: 0,
      min: 0
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ],
    isPublished: {
      type: Boolean,
      default: true
    },
    isPinned: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// 索引
postSchema.index({ title: 'text', content: 'text', tags: 'text' });
postSchema.index({ author: 1 });
postSchema.index({ category: 1 });
postSchema.index({ isPinned: -1, createdAt: -1 });
postSchema.index({ likeCount: -1 });

// 虚拟属性：获取作者信息
postSchema.virtual('authorInfo', {
  ref: 'User',
  localField: 'author',
  foreignField: '_id',
  justOne: true
});

// 虚拟属性：获取评论
postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post'
});

postSchema.set('toJSON', { virtuals: true });

const Post = mongoose.model('Post', postSchema);

export default Post;

