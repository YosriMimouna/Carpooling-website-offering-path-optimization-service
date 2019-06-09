const mongoose = require('mongoose');

const userCardSchema = mongoose.Schema({
  date: { type: String, required: true },
  dep: { type: String, required: true},
  des: { type: String, required: true},
  dephour: { type: String, required: true},
  arrhour: { type: String, required: true},
  capacity: { type: String, required: true},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
});

module.exports = mongoose.model('userCard', userCardSchema);
