/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useRef } from 'react';
import Library from './components/Library';
import Nav from './components/Nav';
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
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [songInfo, setSongInfo] = useState<ISongInfo>({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  const timeUpdateHandler = (e: Update): void => {
    // This solves issue property 'currentTime' & 'duration' does not exist on type 'EventTarget'.
    const target = e.target as typeof e.target & ISongInfo;

    const current = target.currentTime;
    const duration = target.duration;

    // Calculate percentage
    const roundedCurrent = Math.round(current as number);
    const roundedDuration = Math.round(duration as number);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
  };

  const songEndHandler = async (): Promise<void> => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying && audioRef.current) audioRef.current.play();
  };

  return (
    <div className='app'>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songs={songs}
        setSongs={setSongs}
        currentSong={currentSong}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        setCurrentSong={setCurrentSong}
      />
      <Library
        audioRef={audioRef}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
};

export default App;
