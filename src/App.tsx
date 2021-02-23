/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import Library from './components/Library';
import Player from './components/Player';
import Song from './components/Song';
import getSongs from './data';
import { ISong } from './interfaces';
import './styles/app.scss';

const App = (): JSX.Element => {
  const data = getSongs();
  const [songs, setSongs] = useState<ISong[]>(data);
  const [currentSong, setCurrentSong] = useState(data[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className='app'>
      <Song currentSong={currentSong} />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
      />
      <Library songs={songs} />
    </div>
  );
};

export default App;
