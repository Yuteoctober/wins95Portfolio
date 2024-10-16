import { useEffect, useContext, useRef } from 'react';
import UseContext from '../Context';
import Draggable from 'react-draggable';

function Dragdrop() {
  const {
    key,
    handleDragStop,
    DesktopRef,
    handleOnDrag,
    ProjectFolderRef,
    ResumeFolderRef,
    isDragging, setIsDragging,
    dropTargetFolder, setDropTargetFolder,
    draggedIcon, setDraggedIcon,
    handleDrop,
    desktopIcon,setDesktopIcon,
    imageMapping,
    handleShow, handleShowMobile,
    isTouchDevice,
    iconFocusIcon,
    setStartActive
  } = useContext(UseContext);

  // Create an array of refs for each icon
  const iconRefs = useRef([]);
  
  function captureIconPositions() {
    const positions = desktopIcon.reduce((acc, icon) => {
      const iconElement = iconRefs.current[icon.name]; // Get the icon ref using its name
      
      if (iconElement) {
        const { x, y } = iconElement.getBoundingClientRect(); // Get the current position
        acc[icon.name] = { x:x, y:y }; 
      }
      return acc;
    }, {});
  
    setDesktopIcon((prevIcons) => {
      return prevIcons.map(icon => {
        if (positions[icon.name]) {
          return { ...icon, x: positions[icon.name].x, y: positions[icon.name].y }; // Update position
        }
        return icon;
      });
    });
  }
  
  
  useEffect(() => {
    // Capture positions initially
      captureIconPositions();
  
 

    const handleResize = () => {
      captureIconPositions();

    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [key]);
  

  return (
    <section className='bound' 
    ref={DesktopRef}
    onClick={(e) => {
      if (!isDragging) {
        iconFocusIcon('');
        setStartActive(false)
      }
      e.preventDefault();
      e.stopPropagation();
    }}>
      <div className='drag_drop'>
        {desktopIcon.filter(icon => icon.folderId === 'Desktop').map((icon) => (
          <Draggable
            key={icon.name}
            grid={[10, 10]}
            axis="both" 
            handle=".icon" 
            scale={1}
            bounds='.bound'
            onStart={() => {setDropTargetFolder('')}}
            onDrag={handleOnDrag(icon.name, iconRefs.current[icon.name])}
            onStop={(e, data) => {
              handleDragStop(data, icon.name, iconRefs.current[icon.name])
              handleDrop(e, icon.name, dropTargetFolder)
            }}
          >
            <div
              className='icon'
              ref={(el) => iconRefs.current[icon.name] = el} 
              onDoubleClick={() => handleShow(icon.name)}                      
              onClick={!isTouchDevice ? (e) => {
                iconFocusIcon(icon.name);
                e.stopPropagation();
              } : undefined}           
              onTouchStart={() => {
                handleShowMobile(icon.name);
                iconFocusIcon(icon.name);
              }}
              
            >
              <img src={imageMapping(icon.pic)} alt={icon.name} className={icon.focus ? 'img_focus' : ''} />
              <p className={icon.focus ? 'p_focus' : ''}>
                {icon.name}
              </p>
            </div>
          </Draggable> 
        ))} 
      </div>
    </section>
  );
}

export default Dragdrop;
