import React from 'react';
import Player from './components/Player';
import Song from './components/Song';
import './styles/app.scss';

const App = (): JSX.Element => {
  return (
    <div className='app'>
      <Song />
      <Player />
    </div>
  );
};

export default App;
