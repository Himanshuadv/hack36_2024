const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
    imagePath: {
        type: String
      },
  content: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  comments: [
    {
      content: { type: String },
      timestamp: { type: Date, default: Date.now },
      user: { type: Schema.Types.ObjectId, ref: 'User' }
    }
  ],
  tag: [{
    type: String,
  }],
  
  timestamp: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true,"please entered the email login again"]

  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
