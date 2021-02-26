import React from 'react';
import { ILibraryProps } from '../interfaces';
import LibrarySong from './LibrarySong';

const Library = ({
  songs,
  setSongs,
  setCurrentSong,
  libraryStatus,
  isPlaying,
  audioRef,
}: ILibraryProps): JSX.Element => {
  return (
    <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
      <h2>Library</h2>
      <div className='library-songs'>
        {songs.map(song => (
          <LibrarySong
            key={song.id}
            songs={songs}
            song={song}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
            setCurrentSong={setCurrentSong}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
