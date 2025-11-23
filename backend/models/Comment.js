import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, '请提供评论内容'],
      maxlength: [2000, '评论内容最多 2000 个字符']
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
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
    isEdited: {
      type: Boolean,
      default: false
    },
    editedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// 索引
commentSchema.index({ author: 1 });
commentSchema.index({ post: 1 });
commentSchema.index({ parentComment: 1 });
commentSchema.index({ createdAt: -1 });

// 虚拟属性：获取作者信息
commentSchema.virtual('authorInfo', {
  ref: 'User',
  localField: 'author',
  foreignField: '_id',
  justOne: true
});

// 虚拟属性：获取子评论
commentSchema.virtual('replies', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parentComment'
});

// 删除时级联删除子评论
commentSchema.pre('findByIdAndDelete', async function (next) {
  const commentId = this.getFilter()._id;
  await mongoose.model('Comment').deleteMany({ parentComment: commentId });
  next();
});

commentSchema.set('toJSON', { virtuals: true });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;

