const mongoose = require("mongoose");

// Schema for Song
const Song = mongoose.model("Song", {
  songname: { type: String, required: true },
  singer: { type: String, required: true },
  image: { type: String, required: true },
  url: { type: String, required: true },
  albumname: { type: String, required: true },
  releaseyear: { type: Number, required: true }, // Ensure releaseyear is required
});

// Endpoint for Adding Songs
const song = async (req, res) => {
  try {
    // Validate request body
    const { songname, singer, image, url, albumname, releaseyear } = req.body;

    if (!songname || !singer || !image || !url || !albumname || !releaseyear) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create and save the song
    const newSong = new Song({
      songname,
      singer,
      image,
      url,
      albumname,
      releaseyear,
    });

    await newSong.save();
    console.log("Saved");

    res.json({ success: true, name: songname });
  } catch (error) {
    console.error("Error saving song:", error);
    res.status(500).json({ error: "Error saving song to database." });
  }
};

module.exports = { song };
