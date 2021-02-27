/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IPlayer, ISong } from '../interfaces';
import { Change } from '../types/Events';

const Player = ({
  audioRef,
  isPlaying,
  setIsPlaying,
  setSongs,
  songs,
  songInfo,
  setSongInfo,
  currentSong,
  setCurrentSong,
}: IPlayer): JSX.Element => {
  const activeLibraryHandler = (nextPrev: ISong): void => {
    const newSongs = songs.map(songData => {
      if (songData.id === nextPrev.id) {
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
  };
  // Event Handlers
  const playSongHandler = (): void => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(!isPlaying);
      } else {
        audioRef.current.play();
        setIsPlaying(!isPlaying);
      }
    }
  };

  const getTime = (time: number): string => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e: Change): void => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
      setSongInfo({ ...songInfo, currentTime: e.target.value });
    }
  };

  const skipTrackHandler = async (direction: string): Promise<void> => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    if (direction === 'skip-forward') {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === 'skip-back') {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);

        if (isPlaying && audioRef.current) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying && audioRef.current) audioRef.current.play();
  };

  // Add the styles
  const trackAnim = {
    transform: `translate(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className='player'>
      <div className='time-control'>
        <p>{getTime(songInfo.currentTime as number)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className='track'
        >
          <input
            min={0}
            max={songInfo.duration.toString()}
            type='range'
            onChange={dragHandler}
          />
          <div style={trackAnim} className='animate-track'></div>
        </div>
        <p>
          {songInfo.duration ? getTime(songInfo.duration as number) : '0:00'}
        </p>
      </div>
      <div className='play-control'>
        <FontAwesomeIcon
          className='skip-back'
          size='2x'
          icon={faAngleLeft}
          onClick={() => skipTrackHandler('skip-back')}
        />
        <FontAwesomeIcon
          role='button'
          className='play'
          size='2x'
          icon={isPlaying ? faPause : faPlay}
          onClick={playSongHandler}
        />
        <FontAwesomeIcon
          className='skip-forward'
          size='2x'
          icon={faAngleRight}
          onClick={() => skipTrackHandler('skip-forward')}
        />
      </div>
    </div>
  );
};

export default Player;
