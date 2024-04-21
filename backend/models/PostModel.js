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
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  dislikes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  comments: [
    {
      content: { type: String },
      timestamp: { type: Date, default: Date.now },
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      name:{type:String}
    }
  ],
  tag: [{
    type: String,
  }],
  username:{
    type:String,
    required:[true,'Authentication Failed.Please sign in again']
  },
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
