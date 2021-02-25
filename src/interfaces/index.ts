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
  songs: ISong[];
  isPlaying: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
  setSongs: React.Dispatch<React.SetStateAction<ISong[]>>;
  setCurrentSong: React.Dispatch<React.SetStateAction<ISong>>;
}

export interface ILibraryProps {
  songs: ISong[];
  isPlaying: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
  setSongs: React.Dispatch<React.SetStateAction<ISong[]>>;
  setCurrentSong: React.Dispatch<React.SetStateAction<ISong>>;
}

export interface ISongInfo {
  currentTime: number | string;
  duration: number | string;
  value?: HTMLAudioElement;
}

export interface IPlayer {
  audioRef: React.RefObject<HTMLAudioElement>;
  currentSong: ISong;
  songInfo: ISongInfo;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setSongInfo: React.Dispatch<React.SetStateAction<ISongInfo>>;
}
