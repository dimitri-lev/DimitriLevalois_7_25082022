const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // userId: { type: String, required: true },
  imageUrl: { type: String /* required: true  */ },
  text: { type: String, required: true },
  likes: { type: Number, default: 0 },
  usersLiked: { type: [String], default: [] },
  date: { type: String, default: Date },
});

module.exports = mongoose.model('Post', postSchema);
