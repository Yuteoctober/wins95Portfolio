import { useEffect, useContext, useRef } from 'react';
import UseContext from '../Context';
import Draggable from 'react-draggable';

function Dragdrop() {
  const {
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
            onStart={() => setDropTargetFolder('')}
            onDrag={handleOnDrag(icon.name, iconRefs.current[icon.name])}
            onStop={(e, data) => {
              handleDragStop(data, icon.name, icon.index)
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
