import React, { useState, useContext } from 'react';
import UseContext from '../Context'
import Draggable from 'react-draggable';
import WebampPlayer from './WebampPlayer';
import winamp from '../assets/winampIcon.png';
import { motion } from 'framer-motion';

function WinampPlayer() {

  const { 
    handleShow, handleShowMobile,
    isTouchDevice,
    WinampExpand, setWinampExpand,
    iconState, setIconState,
  } = useContext(UseContext);

  function handleWinampFocus() {
    setWinampExpand(prev => ({...prev, focus: true}))
    const updatedFocus = iconState.map(icon => ({
      ...icon,
      focus: false
    }));
    setIconState(updatedFocus);
  }

  

  return (
    <div>
      <Draggable
        cancel=''
        axis="both"
        handle={'#winamp-container'}
        grid={[10, 10]}
        scale={1}
        bounds=''
      >
        <motion.div
          id="winamp-container"
          onClick={(e) => { handleWinampFocus(); e.stopPropagation()}}
          onDoubleClick={ !isTouchDevice ? () => handleShow('Winamp'): undefined}
          onTouchStart={() => { handleShowMobile('Winamp'); handleWinampFocus()}}
          initial={{ opacity: 1 }}
          whileTap={{ opacity: 0.5 }}
          transition={{ opacity: { duration: 0.2 } }}
          exit={{ opacity: 1 }}
        >
          <img src={winamp} alt="winamp" className={WinampExpand.focus? 'wimamp-focus_img' : ''} />
          <p className={WinampExpand.focus? 'winamp_p_focus': ''}>Winamp</p>
        </motion.div>
      </Draggable>
      {WinampExpand.show? (<WebampPlayer/>):(null)}
    </div>
  );
}

export default WinampPlayer;
