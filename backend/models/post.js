const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: false },
  date: { type: String, required: true },
  dep: { type: String, required: true},
  des: { type: String, required: true},
  dephour: { type: String, required: true},
  arrhour: { type: String, required: true},
  capacity: { type: String, required: true},
  imagePath: { type: String, required: true },
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  participation: { type: Array }
});

module.exports = mongoose.model('Post', postSchema);
