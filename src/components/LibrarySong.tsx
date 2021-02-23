import React from 'react';
import { ISongProps } from '../interfaces';

const LibrarySong = ({ song }: ISongProps): JSX.Element => {
  return (
    <div role='listitem' className='library-song'>
      <img src={song.cover} alt={song.artist} />
      <div className='song-description'>
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
