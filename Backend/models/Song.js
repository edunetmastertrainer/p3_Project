const mongoose = require('mongoose');

// Check if the Song model already exists in mongoose.models
const Song = mongoose.models.Song || mongoose.model("Song", new mongoose.Schema({
  id: { type: Number, required: true },
  songname: { type: String, required: true },
  singer: { type: String, required: true },
  image: { type: String, required: true },
  url: { type: String, required: true },
  albumname: { type: String, required: true },
  releaseyear: { type: Number },
}));

module.exports = Song;
