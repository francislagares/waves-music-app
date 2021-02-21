export interface ISong {
  name: string;
  cover: string;
  artist: string;
  audio: string;
  color: string[];
  id: string;
  active: boolean;
}

export interface IProps {
  currentSong: ISong;
}

export interface ISongInfo {
  currentTime: number | string;
  duration: number | string;
}

export interface IPlayer {
  currentSong: ISong;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IPlayerFields {
  value: HTMLMediaElement;
}
