import { useRef, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDrag, useDrop } from 'react-dnd';
import UseContext from '../Context';
import dayjs from 'dayjs';

// Import slideshow images
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


const imageList = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11];
const ItemType = 'TILE';

export default function Tile({ id, content, index, size, color, moveTile, imageMapping, disable }) {
  const {
    setTileScreen,
    handleShow,
  } = useContext(UseContext);

  const ref = useRef(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(null);
  const [formatTime, setFormatTime] = useState(false);

  useEffect(() => {
    if (content !== 'Picture') return;
    const interval = setInterval(() => {
      setImgIndex(prev => (prev + 1) % imageList.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [content]);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item) {
      if (item.index === index || item.index === -1) return;
      if (disable || item.id === 'exit') return;
      moveTile(item.index, index);
      item.index = index;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

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
        backgroundPosition: 'center',
        backgroundSize: '160px',
        backgroundRepeat: 'no-repeat',
      };

    default:
      return {};
  }
}

function mappingIconImage(content) {
    switch (content) {
      case 'MSN':
      return;

      default:
        return imageMapping(content);
    }
} 

  


  useEffect(() => {
    const timer = setInterval(() => {
      const format = formatTime ? 'HH:mm:ss' : 'hh:mm:ss A';
      setCurrentTime(dayjs().format(format));
    }, 1000); // update every second

    return () => clearInterval(timer); 
  }, [formatTime]);


  const tileClasses = `tile ${size} ${color || ''}`;

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        className={tileClasses}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ease: 'easeInOut', duration: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'relative',
          opacity: isDragging ? 0.5 : 1,
          background: color,
          ...tileBG(content, disable)
        }}
        onClick={() => {
          if (content === 'Time') {
            return;
          }
          if (content === 'Exit') {
            setTileScreen(false);
            return;
          }
          handleShow(content);
          setTileScreen(false);
        }}
      >
        {content === 'Time' && (
          <div className="time_icon"
            onClick={() => {
              setFormatTime(!formatTime)
            }}
          >
            <p>{currentTime}</p>
          </div>
        )}
        {content}
        <div className="tile_pic_container">
          <img className="tile_pic" src={mappingIconImage(content)} alt="" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
