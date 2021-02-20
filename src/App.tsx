import React, { useState } from 'react';
import Player from './components/Player';
import Song from './components/Song';
import getSongs from './data';
import { ISong } from './interfaces';
import './styles/app.scss';

const App = (): JSX.Element => {
  const data = getSongs();
  const [songs, setSongs] = useState<ISong[]>([]);
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
    </div>
  );
};

export default App;
