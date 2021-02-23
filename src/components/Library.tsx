import React from 'react';
import { ILibraryProps } from '../interfaces';
import LibrarySong from './LibrarySong';

const Library = ({ songs }: ILibraryProps): JSX.Element => {
  return (
    <div className='library'>
      <h2>Library</h2>
      <div className='library-songs'>
        {songs.map(song => (
          <LibrarySong key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default Library;
