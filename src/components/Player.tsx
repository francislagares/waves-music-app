/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IPlayer } from '../interfaces';
import { Change } from '../types/Events';

const Player = ({
  audioRef,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
}: IPlayer): JSX.Element => {
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

  return (
    <div className='player'>
      <div className='time-control'>
        <p>{getTime(songInfo.currentTime as number)}</p>
        <input
          min={0}
          max={songInfo.duration.toString()}
          type='range'
          onChange={dragHandler}
        />
        <p>{getTime(songInfo.duration as number)}</p>
      </div>
      <div className='play-control'>
        <FontAwesomeIcon className='skip-back' size='2x' icon={faAngleLeft} />
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
        />
      </div>
    </div>
  );
};

export default Player;
