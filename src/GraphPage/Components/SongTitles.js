import React from 'react';

export default function SongTitles({ title, color }) {
  console.log(color);
  return (
    <div className="song-title-wrapper" style={{ backgroundColor: `${color}` }}>
      <h2 className="song-title-text">{title}</h2>
    </div>
  );
}
