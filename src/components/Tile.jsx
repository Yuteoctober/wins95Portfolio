import { useRef, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDrag, useDrop } from 'react-dnd';
import UseContext from '../Context';
import dayjs from 'dayjs';
import Switch from "react-switch";
import { handleDoubleClickPhotoOpen } from '../components/function/AppFunctions'

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
import settings from '../assets/settings.png';
import fortune from '../assets/fortune.gif';
import pudgy from '../assets/pudgy.gif';
import cube from '../assets/cube.gif';
import agent from '../assets/bot.gif';
import music from '../assets/win_tile.png';
import random from '../assets/random.png';
import loading from '../assets/loading.gif';
import envelope from '../assets/envelope.png';
import painttile from '../assets/painttile.png';
import projecttile from '../assets/projecttile.png';
import resumefiletile from '../assets/resumefiletile.png';
import runtile from '../assets/runtile.png';
import game from '../assets/game.png';
import bin from '../assets/delete.png';
import uti from '../assets/uti.png';
import pencil from '../assets/pencil.png';
import check from '../assets/check.png';
import laptop from '../assets/laptop.png';
import resumef from '../assets/resumef.png';
import openfolder from '../assets/open-folder.png';
import back from '../assets/back-arrow.png';
import weatherImg from '../assets/weathertile.png';
import githublogo from '../assets/github.gif';
import newsicon from '../assets/newstile.png';
import task from '../assets/task.png'
import store from '../assets/store_tile.png'
import layer from '../assets/layer_tile.png'
import ie_tilt from '../assets/ie_tilt.png'




const imageList = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11];
const ItemType = 'TILE';

export default function Tile({ id, content, index, size, color, moveTile, imageMapping, disable, randomBGFunction }) {
  const { 
    setCurrentPhoto,
    allNews,
    city, 
    Cel, setCel, 
    weather,
    setNewsPopup,
    bgRotation, setBgRotation,
    setTileScreen, handleShow 
  } = useContext(UseContext);

  const ref = useRef(null);
  const previewRef = useRef(null);
  const tileCooldown = useRef(false); 

  const [animationCD, setAnimationCD] = useState(true)
  const [imgIndex, setImgIndex] = useState(0);
  const [currentTime24, setCurrentTime24] = useState(null);
  const [currentTime12, setCurrentTime12] = useState(null);
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
    setTimeout(() => {
      setAnimationCD(false) 
    }, 1000);
    
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
          backgroundPosition: '50% 13px',
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
          backgroundPosition: '50% 0.5rem',
          backgroundSize: '105px',
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
          backgroundSize: '64px',
          backgroundRepeat: 'no-repeat',
        };
      case 'MyComputer':
        return {
          backgroundImage: `url(${laptop})`,
          backgroundPosition: '50% 62%',
          backgroundSize: '50px',
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
          backgroundImage: `url(${envelope})`,
          backgroundPosition: '50% 60%',
          backgroundSize: '40px',
          backgroundRepeat: 'no-repeat',
        };
      case 'About':
        return {
          backgroundImage: `url(${resumefiletile})`,
          backgroundPosition: '50% 58%',
          backgroundSize: '40px',
          backgroundRepeat: 'no-repeat',
        };
      case 'Project':
        return {
          backgroundImage: `url(${projecttile})`,
          backgroundPosition: '50% 57%',
          backgroundSize: '36px',
          backgroundRepeat: 'no-repeat',
        };
      case 'ResumeFile':
        return {
          backgroundImage: `url(${resumef})`,
          backgroundPosition: '50% 58%',
          backgroundSize: '36px',
          backgroundRepeat: 'no-repeat',
        };
      case 'Run':
        return {
          backgroundImage: `url(${runtile})`,
          backgroundPosition: '50% 58%',
          backgroundSize: '42px',
          backgroundRepeat: 'no-repeat',
        };
      case 'Paint':
        return {
          backgroundImage: `url(${painttile})`,
          backgroundPosition: '50% 56%',
          backgroundSize: '40px',
          backgroundRepeat: 'no-repeat',
        };
      case 'Utility':
        return {
          backgroundImage: `url(${uti})`,
          backgroundPosition: '50% 54%',
          backgroundSize: '40px',
          backgroundRepeat: 'no-repeat',
        };
      case 'Note':
        return {
          backgroundImage: `url(${pencil})`,
          backgroundPosition: '50% 54%',
          backgroundSize: '36px',
          backgroundRepeat: 'no-repeat',
        };
      case 'MineSweeper':
        return {
          backgroundImage: `url(${game})`,
          backgroundPosition: '50% 59%',
          backgroundSize: '46px',
          backgroundRepeat: 'no-repeat',
        };
      case 'Patch':
        return {
          backgroundImage: `url(${check})`,
          backgroundPosition: '50% 58%',
          backgroundSize: '38px',
          backgroundRepeat: 'no-repeat',
        };
      case 'RecycleBin':
        return {
          backgroundImage: `url(${bin})`,
          backgroundPosition: '50% 56%',
          backgroundSize: '38px',
          backgroundRepeat: 'no-repeat',
        };
      case 'Resume':
        return {
          backgroundImage: `url(${openfolder})`,
          backgroundPosition: '50% 57%',
          backgroundSize: '42px',
          backgroundRepeat: 'no-repeat',
        };
      case 'Exit':
        return {
          backgroundImage: `url(${back})`,
          backgroundPosition: '50% 57%',
          backgroundSize: '42px',
          backgroundRepeat: 'no-repeat',
        };
      case 'Weather':
        if(weather && city) {
          return;
        }
        return {
          backgroundImage: `url(${weatherImg})`,
          backgroundPosition: '50% 55%',
          backgroundSize: '42px',
          backgroundRepeat: 'no-repeat',
        };
        case 'Github':
        return {
          backgroundImage: `url(${githublogo})`,
          backgroundPosition: '50% 57%',
          backgroundSize: '48px',
          backgroundRepeat: 'no-repeat',
        };
        case 'TaskManager':
        return {
          backgroundImage: `url(${task})`,
          backgroundPosition: '50% 57%',
          backgroundSize: '42px',
          backgroundRepeat: 'no-repeat',
        };
        case 'Store':
        return {
          backgroundImage: `url(${store})`,
          backgroundPosition: '50% 57%',
          backgroundSize: '64px',
          backgroundRepeat: 'no-repeat',
        };
        case 'PixelPic':
        return {
          backgroundImage: `url(${layer})`,
          backgroundPosition: '50% 57%',
          backgroundSize: '50px',
          backgroundRepeat: 'no-repeat',
        };
        case 'IE':
        return {
          backgroundImage: `url(${ie_tilt})`,
          backgroundPosition: '50% 57%',
          backgroundSize: '54px',
          backgroundRepeat: 'no-repeat',
        };
        case 'News':
        // if(displayNewsTile.originalNews || filteredNews.length > 0) {
        //   return;
        // }
        return {
          backgroundImage: `url(${newsicon})`,
          backgroundPosition: '50% 57%',
          backgroundSize: '38px',
          backgroundRepeat: 'no-repeat',
        };
      default:
        return {};
    }
  }

  // function mappingIconImage(content) {
  //   const banned = [
  //     'MSN', 'Picture', 'Settings', 
  //     'Fortune', 'Nft', '3dObject', 
  //     'AiAgent', 'Winamp', 'MyComputer',
  //     'Mail', 'ResumeFile'
  //   ];
  //   if (banned.includes(content)) return;
  //   return imageMapping(content);
  // }

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

      case 'Weather':
        if(city && weather) {
          setCel(!Cel)
          return;
        }
        setNewsPopup(true)
        setTileScreen(false);
        return;

      case 'News':
        setNewsPopup(true)
        setTileScreen(false);
        return;

      case 'Picture':
        handleDoubleClickPhotoOpen(imgIndex + 1,  setCurrentPhoto)
        handleShow('Photo');
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
      const format24 = 'HH:mm:ss';
      const format12 = 'hh:mm:ss A';
      setCurrentTime12(dayjs().format(format12));
      setCurrentTime24(dayjs().format(format24));
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
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 0.8 }}
          exit={{ opacity: 0 }}
          style={{
            touchAction : animationCD ? 'none' : 'auto',
            pointerEvents: animationCD ? 'none' : 'auto',
            display: 'grid',
            position: 'relative',
            opacity: isDragging ? 0.5 : 1,
            background: color,
            ...tileBG(content, disable),
          }}
          onClick={(e) => {
            e.stopPropagation()
            handleTileClick(content)
          }}
        >
          {content === 'Time' && (
            <div className="time_icon" onClick={() => setFormatTime(!formatTime)}>
              <p>{formatTime ? currentTime24 : currentTime12}</p>
            </div>
          )}
          {(content === 'Weather' && weather && city) && (
            <div className="weather_tile_container">
              <h2>
                {Cel? weather.temp : ((weather.temp - 32) * 5 / 9).toFixed(0)}
                <span>{Cel? '°F':'°C'}</span>
              </h2>
              <p>{city}</p>
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
            <img className="tile_pic" src={''} alt="" />
          </div>
        </motion.div>
    </AnimatePresence>
  );
}
