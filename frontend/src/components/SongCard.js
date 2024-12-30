import React from 'react';

const SongCard = ({ song }) => {
  return (
    <div className="song-card">
      <h3>{song.name}</h3>
      <audio controls>
        <source src={`http://localhost:5001/url/${song.filename}`} type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>
    </div>
  );
};

export default SongCard;
