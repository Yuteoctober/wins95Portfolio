import UseContext from '../Context';
import { useState, useCallback, useContext, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Tile from './Tile';
import '../css/Tile.css'
import dayjs from 'dayjs';

export default function WindowsDragLogin() {

  const { 
    itemBeingSelected,
    desktopIcon,
    deleteIcon, setDeleteIcon,
    installIcon, setInstallIcon,
    login,
    bgRotation,
    backgroundImageUrl, setBackgroundImageUrl,
    tileBG,
    tileScreen,
    imageMapping,
    ObjectState,
  } = useContext(UseContext);

  const bannedIcon = ['Photo', 'Internet', 'Bitcoin'];
  const icons = ObjectState();

  // Transform original icons with defaults
  const transformedIcons = icons.map((icon, index) => ({
    id: index,
    content: icon.name || null,
    color: icon.color || '',
    size: icon.size || 'small',
  }));

  const newIcon = [
    { id: transformedIcons.length, content: 'Time', color: 'rgba(43, 42, 38, 0.85)', size: 'large' },
    { id: transformedIcons.length + 1, content: 'Background', color: 'rgba(127, 127, 127, 0.85)', size: 'small' },
    { id: transformedIcons.length + 2, content: 'Random BG', color: 'rgba(156, 97, 110, 0.85)', size: 'small' },
    { id: transformedIcons.length + 3, content: 'Weather', color: 'rgba(85, 50, 148, 0.85)', size: 'small' },
    { id: transformedIcons.length + 4, content: 'Github', color: 'rgba(100, 100, 99, 0.85)', size: 'small' },
    { id: transformedIcons.length + 5, content: 'News', color: 'rgba(172, 62, 62, 0.85)', size: 'small' },
  ];

  // Insert new icons before the last 8 icons
  const insertIndex = Math.max(transformedIcons.length - 8, 0);
  const iconsWithTime = [
    ...transformedIcons.slice(0, insertIndex),
    ...newIcon,
    ...transformedIcons.slice(insertIndex),
  ];

  // Remove banned icons
  const finalIcons = iconsWithTime.filter(icon => !bannedIcon.includes(icon.content));

  // Stored desktop icons for comparison
  const [storedDesktopIcons, setStoredDesktopIcons] = useState(desktopIcon);

  // Tile state
  const [tiles, setTiles] = useState(() => {
    const saved = localStorage.getItem('tiles');
    return saved ? JSON.parse(saved) : finalIcons.map(icon => ({ ...icon, id: Date.now() + Math.random() }));
  });

  // Counter for unique IDs
  const [tileCounter, setTileCounter] = useState(Date.now());

  // Delete icon effect
  useEffect(() => {
    if (deleteIcon > 0) {
      const findDeletedIcon = storedDesktopIcons.find(
        storedIcon => !desktopIcon.some(icon => icon.name === storedIcon.name)
      );

      if (!findDeletedIcon) return;

      const updatedTiles = tiles.filter(tile => tile.content !== findDeletedIcon.name);
      setTiles(updatedTiles);



      // Update stored desktop icons
      setStoredDesktopIcons(desktopIcon);
    }
  }, [deleteIcon]);

  // Install icon effect
  useEffect(() => {
    if (installIcon > 0) {
      const newTile = itemBeingSelected;

      if (!finalIcons.find(icon => icon.content === newTile.name)) return;

      const addTile = finalIcons.find(item => item.content === newTile.name);
      if (!addTile) return;

      // Assign unique ID
      const tileWithId = { ...addTile, id: tileCounter };
      setTileCounter(prev => prev + 1);

      setTiles(prev => [...prev, tileWithId]);

      setStoredDesktopIcons(desktopIcon);
    }
  }, [installIcon]);

  // Persist tiles to localStorage
  useEffect(() => {
    localStorage.setItem('tiles', JSON.stringify(tiles));
  }, [tiles]);

  // Drag and drop logic
  const moveTile = useCallback((dragIndex, hoverIndex) => {
    setTiles(prevTiles => {
      const updated = [...prevTiles];
      const [movedTile] = updated.splice(dragIndex, 1);
      updated.splice(hoverIndex, 0, movedTile);
      return updated;
    });
  }, []);

  // Date
  const now = dayjs();
  const date_time = now.format('dddd, MMM D, YYYY');

  // Wallpaper effect
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('dailyWallpaper'));
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
      localStorage.setItem('dailyWallpaper', JSON.stringify({ date, url }));
      setBackgroundImageUrl(url);
    } catch (e) {
      console.error('Failed to fetch wallpaper:', e);
    }
  }

  return (
    <>
      {tileScreen && !login && (
        <DndProvider backend={HTML5Backend}>
          <div
            className="bg_tile_container"
            style={{
              background: !bgRotation && tileBG,
              backgroundImage: `url(${bgRotation ? backgroundImageUrl : ''})`,
            }}
          >
            <div className="grid-container">
              <p className='date_time'>{date_time}</p>
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
          </div>
        </DndProvider>
      )}
    </>
  );
}
