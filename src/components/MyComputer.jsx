import UseContext from '../Context';
import { Fragment, useContext, useEffect, useRef, useState} from "react";
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';
import MyComputerPic from '../assets/pc.png';
import '../css/ResumeFolder.css';

function MyComputer() {

  const iconRefs = useRef([]);

  const { 
    iconContainerSize, iconImgSize, iconTextSize,
    iconScreenSize,
    key,
    dragging,
    handleOnDrag,
    handleDrop,
    MyComputerRef,
    dropTargetFolder, setDropTargetFolder,
    imageMapping,
    desktopIcon, 
    themeDragBar,
    MyComputerExpand, setMyComputerExpand,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    handleShowMobile,
    handleShow,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    iconFocusIcon,
    deleteTap,
  } = useContext(UseContext);

  function handleDragStop(event, data) {
    const positionX = data.x;
    const positionY = data.y;
    setMyComputerExpand(prev => ({
      ...prev,
      x: positionX,
      y: positionY,
    }));
  }

  function handleExpandStateToggle() {
    setMyComputerExpand(prevState => ({
      ...prevState,
      expand: !prevState.expand,
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
      setMyComputerExpand(prevState => ({
        ...prevState,
        expand: !prevState.expand,
      }));
    }
    setLastTapTime(now);
  }

  return (
    <Draggable
      axis="both" 
      handle={'.folder_dragbar'}
      grid={[1, 1]}
      scale={1}
      disabled={MyComputerExpand.expand}
      bounds={{ top: 0 }}
      defaultPosition={{ 
        x: window.innerWidth <= 500 ? 30 : 60,
        y: window.innerWidth <= 500 ? 30 : 80,
      }}
      onStop={(event, data) => {handleDragStop(event, data)}}
      onStart={() => {handleSetFocusItemTrue('MyComputer')}}
    >
        <motion.div 
          ref={MyComputerRef}
          className='folder_folder'
          onClick={(e) => {
            e.stopPropagation();
          handleSetFocusItemTrue('MyComputer');
          }}
          style={{
            ...(
                MyComputerExpand.expand
                    ? inlineStyleExpand('MyComputer')
                    : inlineStyle('MyComputer')
            ),
            overflow: dragging ? '' : 'hidden'
        }}
        >
        <div className="folder_dragbar"
          onDoubleClick={handleExpandStateToggle}
          onTouchStart={handleExpandStateToggleMobile}
          style={{ background: MyComputerExpand.focusItem ? themeDragBar : '#757579' }}
        >
          <div className="folder_barname">
            <img src={MyComputerPic} alt="MyComputerPic" />
            <span>MyComputer</span>
          </div>
          <div className="folder_barbtn">
            <div onClick={ !isTouchDevice ? (e) => {
              e.stopPropagation();
              setMyComputerExpand(prev => ({ ...prev, hide: true, focusItem: false }));
              StyleHide('MyComputer'); 
            } : undefined}
            onTouchEnd={(e) => {
              e.stopPropagation()
              setMyComputerExpand(prev => ({...prev, hide: true, focusItem: false}))
              StyleHide('MyComputer')
            }}
            >
              <p className='dash'></p>
            </div>
            <div 
              onClick={ !isTouchDevice ? handleExpandStateToggle : undefined}
              onTouchEnd={handleExpandStateToggleMobile}
            >
              <motion.div className={`expand ${MyComputerExpand.expand ? 'full' : ''}`} />
              {MyComputerExpand.expand ? <div className="expand_2"></div> : null}
            </div>
            <div>
              <p className='x'
                onClick={!isTouchDevice ? () => deleteTap('MyComputer') : undefined}
                onTouchEnd={() => deleteTap('MyComputer')}
              >×</p>
            </div>
          </div>
        </div>

        <div className="file_edit_container">
          <p>File<span style={{ left: '-23px' }}>_</span></p>
          <p>Edit<span style={{ left: '-24px' }}>_</span></p>
          <p>View<span style={{ left: '-32px' }}>_</span></p>
          <p>Help<span style={{ left: '-30px' }}>_</span></p>
        </div>
        <div className="folder_content"
          onClick={() => iconFocusIcon('')}
          style={{ 
            height: MyComputerExpand.expand ? 'calc(100svh - 122px)' : '',
            overflow: dragging? '' : 'hidden' 
          }}


        >
          <div className='parent_item_container' key={key}

          >
            <div className="item_container" 
              style={{
                position: dragging? 'absolute' : '',
              }}
              onClick={(e) => e.stopPropagation()}
              >
              {desktopIcon.filter(icon => icon.folderId === 'MyComputer').map(icon => (
                <Fragment key={icon.name}>
                  <Draggable
                  axis="both" 
                  handle={'.icon'}
                  grid={[10, 10]}
                  scale={1}
                  bounds={false}
                  onStart={() => {
                    setDropTargetFolder('')
                    handleSetFocusItemTrue('MyComputer')
                  }}
                  onDrag={handleOnDrag(icon.name, iconRefs.current[icon.name])}
                  onStop={(e) => {
                    handleDrop(e, icon.name, dropTargetFolder);
                  }}
                >
                  <div className='icon' key={icon.name}
                    style={iconContainerSize(iconScreenSize)}
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
                    <img src={imageMapping(icon.pic)} alt='#' className={icon.focus ? 'img_focus' : ''}
                      style={iconImgSize(iconScreenSize)}
                    />
                    <p className={icon.focus ? 'p_focus' : 'p_normal'}
                      style={iconTextSize(iconScreenSize)}
                    >
                      {icon.name}
                    </p>
                  </div>
                  </Draggable>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
        <div className="btm_bar_container">
          <div className="object_bar">
            <p>
              {desktopIcon.filter(icon => icon.folderId === 'MyComputer').some(icon => icon.focus) ? 
                '1 object(s) selected'
                :
                desktopIcon.filter(icon => icon.folderId === 'MyComputer').length + ' ' + 'object(s)'
              }
            </p>
          </div>
          <div className="size_bar">
            <p>
              {(() => {
                const filteredIcons = desktopIcon.filter(icon => icon.folderId === 'MyComputer');
                const totalSize = filteredIcons.reduce((total, icon) => total + icon.size, 0);
                const allNotFocused = filteredIcons.every(icon => !icon.focus);

                if (allNotFocused) {
                  return totalSize; 
                } else {
                  return filteredIcons
                    .filter(icon => icon.focus)
                    .map(icon => icon.size) 
                    .reduce((sum, size) => sum + size, 0); 
                }
              })()} KB
            </p>
          </div>
        </div>
      </motion.div>
    </Draggable>
  );
}

export default MyComputer;
