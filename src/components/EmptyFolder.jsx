import UseContext from '../Context';
import { Fragment, useContext, useEffect, useRef, useState} from "react";
import Draggable from 'react-draggable';
import { motion} from 'framer-motion';
import '../css/ResumeFolder.css';
import PropTypes from 'prop-types';
import photoicon from '../assets/jpeg.png';
import binEmp from '../assets/bin2.png'
import bin from '../assets/bin.png'

function EmptyFolder({state, setState, refState, folderName, photoMode, paintMode}) {

  const iconRefs = useRef([]);

  const { 
    PaintExpand, setPaintExpand,
    handleMobileLongPressBin,
    refBeingClicked,
    binRestoreArr, setBinRestoreArr,
    rightClickBin, setRightClickBin,
    timerRef,
    handleMobileLongPress,
    setRightClickIcon,
    setIconBeingRightClicked,
    currentPhoto,
    iconContainerSize, iconImgSize, iconTextSize,
    iconScreenSize,
    key,
    dragging,
    handleOnDrag,
    handleDrop,
    dropTargetFolder, setDropTargetFolder,
    imageMapping,
    desktopIcon, 
    themeDragBar,
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
    setState(prev => ({
      ...prev,
      x: positionX,
      y: positionY,
    }));
  }

  function handleExpandStateToggle() {
    setState(prevState => ({
      ...prevState,
      expand: !prevState.expand,
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
      setState(prevState => ({
        ...prevState,
        expand: !prevState.expand,
      }));
    }
    setLastTapTime(now);
  }

  const parentItemContainerStyle = {
    background: '#c5c4c4',
    padding: '0',
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    scrollbarWidth : 'none',
    TouchEvent: 'auto',
  }

  const recycleBin = desktopIcon.filter(icon => icon.folderId === 'RecycleBin');
  const recycleBinLength = recycleBin.length;
  

  return (
    <Draggable
      axis="both" 
      handle={'.folder_dragbar'}
      grid={[1, 1]}
      scale={1}
      disabled={state.expand}
      bounds={{ top: 0 }}
      defaultPosition={{ 
        x: window.innerWidth <= 500 ? 30 : 60,
        y: window.innerWidth <= 500 ? 30 : 80,
      }}
      onStop={(event, data) => {handleDragStop(event, data)}}
      onStart={() => {handleSetFocusItemTrue(folderName)}}
    >
        <motion.div 
          ref={refState}
          className={`folder_folder ${photoMode? 'photo_mode' 
            : paintMode? 'paint_mode' 
            : ''}`}
          onClick={(e) => {
            e.stopPropagation();
          handleSetFocusItemTrue(folderName);
          }}
          style={{
            ...(
                state.expand
                    ? inlineStyleExpand(folderName)
                    : inlineStyle(folderName)
            ),
            overflow: dragging ? '' : 'hidden',
        }}
        
        >
        <div className="folder_dragbar"
          onDoubleClick={handleExpandStateToggle}
          onTouchStart={handleExpandStateToggleMobile}
          style={{ background: state.focusItem ? themeDragBar : '#757579' }}
        >
          <div className="folder_barname">
          <img 
            src={photoMode ? photoicon 
                  : folderName === 'RecycleBin' && recycleBinLength === 0 ? binEmp 
                  : folderName === 'RecycleBin' && recycleBinLength > 0 ? bin 
                  : imageMapping(folderName)
                } 
            alt="" 
            style={photoMode ? { width: '18px', top: '4px' } : {}}
          />
            <span>{photoMode? currentPhoto.name : folderName}</span>
          </div>
          <div className="folder_barbtn">
            <div onClick={ !isTouchDevice ? (e) => {
              e.stopPropagation();
              setState(prev => ({ ...prev, hide: true, focusItem: false }));
              StyleHide(folderName); 
            } : undefined}
            onTouchEnd={(e) => {
              e.stopPropagation()
              setState(prev => ({...prev, hide: true, focusItem: false}))
              StyleHide(folderName)
            }}
            onTouchStart={(e) => e.stopPropagation()}
            >
              <p className='dash'></p>
            </div>
            <div 
              onClick={ !isTouchDevice ? handleExpandStateToggle : undefined}
              onTouchEnd={handleExpandStateToggleMobile}
            >
              <motion.div className={`expand ${state.expand ? 'full' : ''}`} />
              {state.expand ? <div className="expand_2"></div> : null}
            </div>
            <div>
              <p className='x'
                onClick={!isTouchDevice ? () => deleteTap(folderName) : undefined}
                onTouchEnd={() => deleteTap(folderName)}
              >×</p>
            </div>
          </div>
        </div>

        {paintMode ? ( // run paint
          <>
          <div className="block_menu_paint"></div>
          <div className="block_menu_paint_extra"></div>
          <iframe className='paintiframe'
            src="https://jspaint.app" 
            width="100%"
            height="100%"
            style={{minWidth: '260px'}}
            >
          </iframe>
          </>
        )
        :
        (
          <>
            <div className="file_edit_container">
          <p>File<span style={{ left: '-23px' }}>_</span></p>
          <p>Edit<span style={{ left: '-24px' }}>_</span></p>
          <p>View<span style={{ left: '-32px' }}>_</span></p>
          <p>Help<span style={{ left: '-30px' }}>_</span></p>
        </div>
        <div className="folder_content"
          onClick={() => iconFocusIcon('')}
          style={
            photoMode? 
            {height: 'calc(100% - 52px)', overflow: dragging? '' : 'hidden' }
            :
            {height: state.expand ? 'calc(100svh - 122px)' : '', overflow: dragging? '' : 'hidden' }
          }


        >
          <div className='parent_item_container' key={key}
            style={photoMode ? parentItemContainerStyle : {}}
          >
            <div className="item_container" 
              style={{
                position: dragging && !photoMode ? 'absolute' : '',
                margin: photoMode? 'auto': '',
                maxWidth: photoMode? '1000px': '',
                maxHeight: photoMode? '1000px': '',
                padding: photoMode? '0': '',
              }}
              onClick={(e) => {
                e.stopPropagation() 
                iconFocusIcon('');
                handleSetFocusItemTrue(folderName);
              }}
              >
              {photoMode && (
                <img src={currentPhoto.pic} 
                style={{
                  position:'relative',
                  width: '100%',
                  height: '100%',
                  margin: '0 auto',
                }}/>
              )}
                {desktopIcon.filter(icon => icon.folderId === folderName).map(icon => (
                <Fragment key={icon.name}>
                  <Draggable
                  axis="both" 
                  handle={'.icon'}
                  grid={[10, 10]}
                  scale={1}
                  bounds={false}
                  onStart={() => {
                    setDropTargetFolder('')
                    handleSetFocusItemTrue(folderName)
                  }}
                  onDrag={handleOnDrag(icon.name, iconRefs.current[icon.name])}
                  onStop={(e) => {
                    handleDrop(e, icon.name, dropTargetFolder, icon.folderId);
                    clearTimeout(timerRef.current)
                  }}
                >
                  <div className='icon' key={icon.name}
                    style={iconContainerSize(iconScreenSize)}
                    ref={(el) => iconRefs.current[icon.name] = el}
                    onContextMenu={() => {
                      if (folderName === 'RecycleBin') {
                        setRightClickBin(true);
                        setRightClickIcon(false);
                        iconFocusIcon(icon.name);
                        setIconBeingRightClicked(icon);
                        refBeingClicked.current = iconRefs.current[icon.name]
                        return;
                      } 
                        setRightClickIcon(true);
                        setRightClickBin(false);
                        iconFocusIcon(icon.name);
                        setIconBeingRightClicked(icon);
                        refBeingClicked.current = iconRefs.current[icon.name]
                    }}
                    
                    onDoubleClick={() => {
                      folderName === 'RecycleBin'? '' : handleShow(icon.name)
                    }}                 
                    onClick={!isTouchDevice ? (e) => {
                      iconFocusIcon(icon.name);
                      e.stopPropagation();
                    } : undefined}           
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      if(folderName === 'RecycleBin'){
                        handleMobileLongPressBin(e, icon);
                        iconFocusIcon(icon.name);
                        return;
                      }
                      iconFocusIcon(icon.name);
                      handleMobileLongPress(e, icon);
                      handleShowMobile(icon.name)
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
        {photoMode ? (
          null
        )
        :
        (
          <div className="btm_bar_container">
          <div className="object_bar">
            <p>
              {desktopIcon.filter(icon => icon.folderId === folderName).some(icon => icon.focus) ? 
                '1 object(s) selected'
                :
                desktopIcon.filter(icon => icon.folderId === folderName).length + ' ' + 'object(s)'
              }
            </p>
          </div>
          <div className="size_bar">
            <p>
              {(() => {
                const filteredIcons = desktopIcon.filter(icon => icon.folderId === folderName);
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
        )}
          </>
        )}

      </motion.div>
    </Draggable>
  );
}
EmptyFolder.propTypes = {
  state: PropTypes.shape({
    expand: PropTypes.bool.isRequired,
    focusItem: PropTypes.bool,
    hide: PropTypes.bool,
  }).isRequired,
  setState: PropTypes.func.isRequired,
  refState: PropTypes.object,
  folderName: PropTypes.string.isRequired,
  photoMode: PropTypes.bool,
  paintMode: PropTypes.bool,
};

export default EmptyFolder;
