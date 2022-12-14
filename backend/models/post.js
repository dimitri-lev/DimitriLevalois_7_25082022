const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  imageUrl: { type: String },
  text: { type: String, required: true },
  likes: { type: Number, default: 0 },
  usersLiked: { type: [String], default: [] },
  date: { type: Date, default: Date },
});

module.exports = mongoose.model('Post', postSchema);
