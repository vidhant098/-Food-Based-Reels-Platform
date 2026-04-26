const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'food',
    required: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

commentSchema.index({ food: 1, createdAt: -1 });

const CommentModel = mongoose.model('comment', commentSchema);
module.exports = CommentModel;

