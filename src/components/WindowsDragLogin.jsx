import UseContext from '../Context';
import { useState, useCallback, useContext, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Tile from './Tile';
import '../css/Tile.css'
import dayjs from 'dayjs';

export default function WindowsDragLogin() {

  const { 
    tileBG, setTileBG,
    tileScreen, setTileScreen,
    imageMapping,
    ObjectState,
    themeDragBar,
    projectname,
    projectUrl,
    openProjectExpand, setOpenProjectExpand,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    iconFocusIcon,
    deleteTap,

   } = useContext(UseContext);


const bannedIcon = ['Photo'];

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
  color: '#6c2eb0',
  size: 'large',
};

// Insert the time icon before the last 8 icons
const insertIndex = Math.max(transformedIcons.length - 8, 0);
const iconsWithTime = [
  ...transformedIcons.slice(0, insertIndex),
  timeIcon,
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
    const updated = [...tiles];
    const [movedTile] = updated.splice(dragIndex, 1);
    updated.splice(hoverIndex, 0, movedTile);
    setTiles(updated);
  }, [tiles]);

  const now = dayjs()
  const date_time = now.format('dddd, MMM D, YYYY')

  return (
    <>
      {tileScreen && (
        <DndProvider backend={HTML5Backend}>
        <div className="bg_tile_container"
          style={{background: tileBG}}
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
