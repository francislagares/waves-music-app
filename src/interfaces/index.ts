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

export interface ISongProps {
  song: ISong;
}

export interface ILibraryProps {
  songs: ISong[];
}

export interface ISongInfo {
  currentTime: number | string;
  duration: number | string;
  value?: HTMLAudioElement;
}

export interface IPlayer {
  currentSong: ISong;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}
