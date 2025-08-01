import UseContext from '../Context';
import { useState, useCallback, useContext, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Tile from './Tile';
import '../css/Tile.css'
import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';

export default function WindowsDragLogin() {

  

  const { 
    login,
    bgRotation,
    backgroundImageUrl, setBackgroundImageUrl,
    tileBG,
    tileScreen,
    imageMapping,
    ObjectState,

   } = useContext(UseContext);


const bannedIcon = ['Photo', 'Internet'];

const icons = ObjectState();

// Transform original icons with defaults
const transformedIcons = icons.map((icon, index) => ({
  id: index,
  content: icon.name || null,
  color: icon.color || '',
  size: icon.size || 'small',
}));

const newIcon = [
  {
    id: transformedIcons.length,
    content: 'Time',
    color: 'rgba(43, 42, 38, 0.85)',
    size: 'large',
  },
  {
    id: transformedIcons.length + 1,
    content: 'Background',
    color: 'rgba(127, 127, 127, 0.85)',
    size: 'small',
  },
  {
    id: transformedIcons.length + 2,
    content: 'Random BG',
    color: 'rgba(156, 97, 110, 0.85)',
    size: 'small',
  }
];

  // Insert the time icon before the last 8 icons
  const insertIndex = Math.max(transformedIcons.length - 8, 0);
  const iconsWithTime = [
    ...transformedIcons.slice(0, insertIndex),
    ...newIcon,
    ...transformedIcons.slice(insertIndex),
];


// Remove banned icons
const finalIcons = iconsWithTime.filter(icon => !bannedIcon.includes(icon.content));


  

  const [tiles, setTiles] = useState(() => {
  const saved = localStorage.getItem('tiles');
  return saved ? JSON.parse(saved) : finalIcons;
  });

  useEffect(() => {
    localStorage.setItem('tiles', JSON.stringify(tiles));
  }, [tiles]);

  const moveTile = useCallback((dragIndex, hoverIndex) => {
  setTiles(prevTiles => {
    const updated = [...prevTiles];
    const [movedTile] = updated.splice(dragIndex, 1);
    updated.splice(hoverIndex, 0, movedTile);
    return updated;
  });
}, []);

  const now = dayjs()
  const date_time = now.format('dddd, MMM D, YYYY')
  
  // Fetch wallpaper on mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('dailyWallpaper'));

    if(tiles.length !== finalIcons.length) { // reset the local storage if not on current version
      localStorage.clear();
      location.reload();
    }

    if (savedData) {
      setBackgroundImageUrl(savedData.url);
    } else {
      fetchNewWallpaper();
  }
  
}, []);

  async function fetchNewWallpaper(date) {

    try {
      const res = await fetch('https://minimalistic-wallpaper.demolab.com/?random=1');
      const url = res.redirected ? res.url : URL.createObjectURL(await res.blob());
      
      // Save in localStorage
      localStorage.setItem('dailyWallpaper', JSON.stringify({ date, url }));
      setBackgroundImageUrl(url);
    } catch (e) {
      console.error('Failed to fetch wallpaper:', e);
    }
  }


  return (
    <>
      {(tileScreen && !login) && (
        <DndProvider backend={HTML5Backend}>
        <AnimatePresence>
          <motion.div className="bg_tile_container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.4 }}
            exit={{ opacity: 0 }}
            style={{
              background: !bgRotation && tileBG,
              backgroundImage: `url(${bgRotation ? backgroundImageUrl : ''})`,
            }}

          >
            <div className="grid-container">
              <p className='date_time'>
              {date_time}
              </p>
              <Tile
                key="exit-tile"
                index={-1}
                id="exit"
                content="Exit"
                size="small"   
                color="#141111ea"
                moveTile={moveTile}
                imageMapping={imageMapping}
              />
              {tiles.map((tile, index) => (
                  <Tile
                    key={tile.id}
                    index={index}
                    id={tile.id}
                    content={tile.content}
                    size={tile.size}
                    color={tile.color}
                    moveTile={moveTile}
                    imageMapping={imageMapping}
                    randomBGFunction={fetchNewWallpaper}
                  />
              ))}

              </div>
            </motion.div>
          </AnimatePresence>
        </DndProvider>
      )}
    </>
  );
}
