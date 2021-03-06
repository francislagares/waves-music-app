/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { ISongProps } from '../interfaces';

const LibrarySong = ({
  song,
  songs,
  setSongs,
  setCurrentSong,
  audioRef,
  isPlaying,
}: ISongProps): JSX.Element => {
  const songSelectHandler = async (): Promise<void> => {
    const selectedSong = song;
    await setCurrentSong(selectedSong);
    // Add active state
    const newSongs = songs.map(songData => {
      if (songData.id === song.id) {
        return {
          ...songData,
          active: true,
        };
      } else {
        return {
          ...songData,
          active: false,
        };
      }
    });

    setSongs(newSongs);

    // Check if song is playing
    if (isPlaying && audioRef.current) audioRef.current.play();
  };

  return (
    <div
      role='presentation'
      className={`library-song ${song.active ? 'selected' : ''}`}
      onClick={songSelectHandler}
      onKeyPress={songSelectHandler}
    >
      <img src={song.cover} alt={song.artist} />
      <div className='song-description'>
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
