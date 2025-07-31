import { useRef, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDrag, useDrop } from 'react-dnd';
import UseContext from '../Context';
import dayjs from 'dayjs';
import Switch from "react-switch";

import p1 from '../assets/001.jpg';
import p2 from '../assets/002.jpg';
import p3 from '../assets/003.jpg';
import p4 from '../assets/004.jpg';
import p5 from '../assets/005.jpg';
import p6 from '../assets/006.jpg';
import p7 from '../assets/007.jpg';
import p8 from '../assets/008.jpg';
import p9 from '../assets/009.jpg';
import p10 from '../assets/010.jpg';
import p11 from '../assets/011.jpg';
import chat from '../assets/chat.gif';
import settings from '../assets/settingsTile.png';
import fortune from '../assets/fortune.gif';
import pudgy from '../assets/pudgy.png';
import cube from '../assets/cube.gif';
import agent from '../assets/bot.gif';
import music from '../assets/music.gif';
import Cattile from '../assets/Cattile.gif';
import random from '../assets/random.png';
import loading from '../assets/loading.gif';
import email from '../assets/email.gif';



const imageList = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11];
const ItemType = 'TILE';

export default function Tile({ id, content, index, size, color, moveTile, imageMapping, disable, randomBGFunction }) {
  const { 
    bgRotation, setBgRotation,
    setTileScreen, handleShow 
  } = useContext(UseContext);

  const ref = useRef(null);
  const previewRef = useRef(null);
  const tileCooldown = useRef(false); 

  const [imgIndex, setImgIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(null);
  const [formatTime, setFormatTime] = useState(false);

  // Cycle images for "Picture"
  useEffect(() => {
    if (content !== 'Picture') return;
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % imageList.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [content]);

  // Drop zone
  const [, drop] = useDrop({
    accept: ItemType,
    hover(item) {
      if (item.index === index || item.index === -1) return;
      if (disable || item.id === 'exit') return;
      moveTile(item.index, index);
      item.index = index;
    },
  });

  // Drag config
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemType,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Set custom preview to current element and center it
  useEffect(() => {
    if (previewRef.current) {
      preview(previewRef.current, { anchorX: 0.5, anchorY: 0.5 });
    }
  }, [preview]);

  // Attach drag/drop
  if (!disable && id !== 'exit') {
    drag(drop(ref));
  }

  function tileBG(content, disable) {
    switch (content) {
      case 'Picture':
        return {
          backgroundImage: `url(${imageList[imgIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          pointerEvents: disable ? 'none' : 'auto',
        };
      case 'MSN':
        return {
          backgroundImage: `url(${chat})`,
          backgroundPosition: '50% 10px',
          backgroundSize: '85px',
          backgroundRepeat: 'no-repeat',
        };
      case 'Settings':
        return {
          backgroundImage: `url(${settings})`,
          backgroundPosition: '50% 58%',
          backgroundSize: '40px',
          backgroundRepeat: 'no-repeat',
        };
      case 'Fortune':
        return {
          backgroundImage: `url(${fortune})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        };
      case 'Nft':
        return {
          backgroundImage: `url(${pudgy})`,
          backgroundPosition: 'center',
          backgroundSize: '100px',
          backgroundRepeat: 'no-repeat',
        };
      case '3dObject':
        return {
          backgroundImage: `url(${cube})`,
          backgroundPosition: '50% 10%',
          backgroundSize: '110px',
          backgroundRepeat: 'no-repeat',
        };
      case 'AiAgent':
        return {
          backgroundImage: `url(${agent})`,
          backgroundPosition: '50% 100%',
          backgroundSize: '85px',
          backgroundRepeat: 'no-repeat',
        };
      case 'Winamp':
        return {
          backgroundImage: `url(${music})`,
          backgroundPosition: 'center',
          backgroundSize: '180px',
          backgroundRepeat: 'no-repeat',
        };
      case 'MyComputer':
        return {
          backgroundImage: `url(${Cattile})`,
          backgroundPosition: '50% 28%',
          backgroundSize: '140px',
          backgroundRepeat: 'no-repeat',
        };
      case 'Random BG':
        return {
          backgroundImage: `url(${tileCooldown.current ? loading : random})`,
          backgroundPosition: '50% 60%',
          backgroundSize: tileCooldown.current ? '26px' : '48px',
          backgroundRepeat: 'no-repeat',
        };
      case 'Mail':
        return {
          backgroundImage: `url(${email})`,
          backgroundPosition: '50% 50%',
          backgroundSize: '76px',
          backgroundRepeat: 'no-repeat',
        };
      default:
        return {};
    }
  }

  function mappingIconImage(content) {
    const banned = [
      'MSN', 'Picture', 'Settings', 
      'Fortune', 'Nft', '3dObject', 
      'AiAgent', 'Winamp', 'MyComputer',
      'Mail', 'ResumeFile'
    ];
    if (banned.includes(content)) return;
    return imageMapping(content);
  }

  function mappingIconName(content) {
    switch (content) {
      case '':
        return;
      default:
        return content;
    }
  }

  function handleTileClick(content) {
    switch (content) {
      case 'Time':
      case 'Background':
        return;

      case 'Random BG':
        if (tileCooldown.current) {
          console.log('Wait before clicking again.');
          return;
        }

        randomBGFunction(); // run wallpaper change
        tileCooldown.current = true;

        setTimeout(() => {
          tileCooldown.current = false;
        }, 5000); // 5 sec cooldown
        return;

      case 'Exit':
        setTileScreen(false);
        return;

      default:
        handleShow(content);
        setTileScreen(false);
    }
  }

  // Update clock
  useEffect(() => {
    const timer = setInterval(() => {
      const format = formatTime ? 'HH:mm:ss' : 'hh:mm:ss A';
      setCurrentTime(dayjs().format(format));
    }, 1000);
    return () => clearInterval(timer);
  }, [formatTime]);

  const tileClasses = `tile ${size} ${color || ''}`;

  function backgroundSwitchSave() {
    setBgRotation(prev => {
      const newState = !prev;
      localStorage.setItem('isWallpaperOn', JSON.stringify({ bgRotation: newState }));
      return newState;
    });
  }




  return (
    <AnimatePresence>
      <motion.div
        ref={(node) => {
          ref.current = node;
          previewRef.current = node;
        }}
        className={tileClasses}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ease: 'easeInOut', duration: 1 }}
        exit={{ opacity: 0 }}
        style={{
          display: 'grid',
          position: 'relative',
          opacity: isDragging ? 0.5 : 1,
          background: color,
          ...tileBG(content, disable),
        }}
        onClick={() => handleTileClick(content)}
      >
        {content === 'Time' && (
          <div className="time_icon" onClick={() => setFormatTime(!formatTime)}>
            <p>{currentTime}</p>
          </div>
        )}
        {content === 'Background' && (
          <div className="switch_bg">
            <Switch
              onChange={backgroundSwitchSave}
              checked={bgRotation}
              offColor="#454040"
              onColor="#4CAF50"
              uncheckedIcon={false}
              checkedIcon={false}
              height={28}        
              width={56}            
            />
          </div>
        )}

        <span className="tile_name">{mappingIconName(content)}</span>
        <div className="tile_pic_container">
          <img className="tile_pic" src={mappingIconImage(content)} alt="" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
