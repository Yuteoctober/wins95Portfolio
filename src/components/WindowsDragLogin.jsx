import UseContext from '../Context';
import { useState, useCallback, useContext, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Tile from './Tile';
import '../css/Tile.css'
import dayjs from 'dayjs';

export default function WindowsDragLogin() {

  

  const { 
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

// Define a new Time icon
const timeIcon = {
  id: transformedIcons.length,
  content: 'Time',
  color: 'rgba(43, 42, 38, 0.75)',
  size: 'large',
};

const background = {
  id: transformedIcons.length + 1,
  content: 'Background',
  color: 'rgba(127, 127, 127, 0.75)',
  size: 'small',
}

const toAddItemArr= [timeIcon,  background]

// Insert the time icon before the last 8 icons
const insertIndex = Math.max(transformedIcons.length - 8, 0);
const iconsWithTime = [
  ...transformedIcons.slice(0, insertIndex),
  ...toAddItemArr,
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
    const today = new Date().toISOString().split('T')[0]; 
    const savedData = JSON.parse(localStorage.getItem('dailyWallpaper'));

    console.log(today, 'saved' + savedData)

    if (savedData && savedData.date === today) {
      // Use saved wallpaper for today
      setBackgroundImageUrl(savedData.url);
    } else {
      // Fetch new wallpaper and store it
      fetchNewWallpaper(today);
  }

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
}, []);




  return (
    <>
      {tileScreen && (
        <DndProvider backend={HTML5Backend}>
        <div className="bg_tile_container"
          style={{
            background: tileBG,
            backgroundImage: `url(${bgRotation ? backgroundImageUrl : ''})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
                />
            ))}

            </div>
          </div>
        </DndProvider>
      )}
    </>
  );
}
