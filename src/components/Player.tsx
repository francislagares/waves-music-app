/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react';
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IPlayer, ISongInfo } from '../interfaces';
import { Change, Update } from '../types/Events';

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
}: IPlayer): JSX.Element => {
  const [songInfo, setSongInfo] = useState<ISongInfo>({
    currentTime: 0,
    duration: 0,
  });
  const audioRef = useRef<HTMLAudioElement>(null);

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

  const timeUpdateHandler = (e: Update): void => {
    // This solves issue property 'currentTime' & 'duration' does not exist on type 'EventTarget'.
    const target = e.target as typeof e.target & ISongInfo;

    const current = target.currentTime;
    const duration = target.duration;

    setSongInfo({ ...songInfo, currentTime: current, duration });
  };

  const getTime = (time: any): string => {
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

  return (
    <div className='player'>
      <div className='time-control'>
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration}
          type='range'
          onChange={dragHandler}
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className='play-control'>
        <FontAwesomeIcon className='skip-back' size='2x' icon={faAngleLeft} />
        <FontAwesomeIcon
          className='play'
          size='2x'
          icon={isPlaying ? faPause : faPlay}
          onClick={playSongHandler}
        />
        <FontAwesomeIcon
          className='skip-forward'
          size='2x'
          icon={faAngleRight}
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};

export default Player;
