import React, { useState, useContext } from 'react';
import UseContext from '../Context'
import WebampPlayer from './WebampPlayer';

function WinampPlayer() {

  const { 
    WinampExpand,
  } = useContext(UseContext);

  return (
    <div>
      {WinampExpand.show? (<WebampPlayer/>):(null)}
    </div>
  );
}

export default WinampPlayer;
