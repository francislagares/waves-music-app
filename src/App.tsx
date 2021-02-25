/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useRef } from 'react';
import Library from './components/Library';
import Player from './components/Player';
import Song from './components/Song';
import getSongs from './data';
import { ISong, ISongInfo } from './interfaces';
import { Update } from './types/Events';
import './styles/app.scss';

const App = (): JSX.Element => {
  const data = getSongs();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [songs, setSongs] = useState<ISong[]>(data);
  const [currentSong, setCurrentSong] = useState(data[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState<ISongInfo>({
    currentTime: 0,
    duration: 0,
  });

  const timeUpdateHandler = (e: Update): void => {
    // This solves issue property 'currentTime' & 'duration' does not exist on type 'EventTarget'.
    const target = e.target as typeof e.target & ISongInfo;

    const current = target.currentTime;
    const duration = target.duration;

    setSongInfo({ ...songInfo, currentTime: current, duration });
  };

  return (
    <div className='app'>
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />
      <Library
        audioRef={audioRef}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};

export default App;
