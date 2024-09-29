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
    WinampExpand,
    iconFocusIcon,
  } = useContext(UseContext);


  

  return (
    <div>
      <Draggable
        cancel=''
        axis="both"
        handle={'#winamp-container'}
        grid={[10, 10]}
        scale={1}
        bounds={{ top: 0 }}
      >
        <motion.div
          id="winamp-container"
          onClick={(e) => { 
            iconFocusIcon('Winampfolder'); 
            e.stopPropagation()}}
          onDoubleClick={ !isTouchDevice ? () => handleShow('Winamp'): undefined}
          onTouchStart={() => { 
            handleShowMobile('Winamp'); 
            iconFocusIcon('Winampfolder')
            }}
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
