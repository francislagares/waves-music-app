import React from 'react';
import { IProps } from '../interfaces';

const Song = ({ currentSong }: IProps): JSX.Element => {
  return (
    <div className='song-container'>
      <img src={currentSong.cover} alt={currentSong.artist} />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
