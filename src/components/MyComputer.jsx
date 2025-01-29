import UseContext from '../Context';
import { Fragment, useContext, useEffect, useRef, useState} from "react";
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';
import MyComputerPic from '../assets/pc.png';
import '../css/MyComputer.css';
import pcIcon from '../assets/pcicon.png'
import undoIcon from '../assets/arrowback.png'
import { BsCaretDownFill } from "react-icons/bs";

function MyComputer() {

  const iconRefs = useRef([]);
  const [popUpFolder, setPopUpFolder] = useState(false)


  const { 
    undo, setUndo,
    DiskRef,
    selectedFolder, setSelectedFolder,
    currentFolder, setCurrentFolder,
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


  function NevigateToFolder(name) {
    // Map folder names to internal folder identifiers
    const folderMap = {
      'Hard Disk (C:)': 'DiskC',
      'Hard Disk (D:)': 'DiskD',
      'My Computer': 'MyComputer',
      'CD-ROM': 'CD-ROM',
    };
  
    // Get the folder identifier from the map
    const folder = folderMap[name];
  
    // If the folder is valid, update the current folder and undo stack
    if (folder) {
      setCurrentFolder(folder);
      setUndo(prev => [...prev, folder]);
    }
  }
  

  useEffect(() => {
      setSelectedFolder({label: 'My Computer', img: imageMapping('MyComputer')})
      setCurrentFolder('MyComputer')
      setPopUpFolder(false)
    
  },[MyComputerExpand.show])
  

  // popup select folder
  const popUpiconList = [
    {label: 'My Computer', img: imageMapping('MyComputer')},
    {label: 'Hard Disk (C:)', img: imageMapping('Hard Disk (C:)')},
    {label: 'Hard Disk (D:)', img: imageMapping('Hard Disk (D:)')},
    {label: 'CD-ROM', img: imageMapping('CD-ROM')},
  ]

  // margin to popup select folder
  function MarginOnSelectedIcon(name) {
    if(name === 'My Computer') return '0.2rem';
    return '1.1rem'
  }

  // undo function
  function UndoFunction() {

    const folderMap = [
      {folder: 'MyComputer', label: 'My Computer', img: imageMapping('MyComputer')},
      {folder: 'DiskC',label: 'Hard Disk (C:)', img: imageMapping('Hard Disk (C:)')},
      {folder: 'DiskD',label: 'Hard Disk (D:)', img: imageMapping('Hard Disk (D:)')},
      {folder: 'CD-ROM',label: 'CD-ROM', img: imageMapping('CD-ROM')},
    ]

    if (undo.length === 1) return; 
  
    const updatedUndo = undo.slice(0, -1);
  
    // Update the undo stack and set the current folder
    setUndo(updatedUndo);
    setCurrentFolder(updatedUndo[updatedUndo.length - 1] || 'MyComputer');
    

    const selectedFolder = folderMap.find(item => item.folder === updatedUndo[updatedUndo.length - 1]);
  
    // Update the selected folder state if a match is found, else fallback
    if (selectedFolder) {
      setSelectedFolder({ label: selectedFolder.label, img: selectedFolder.img });
    } else {
      setSelectedFolder({ label: 'My Computer', img: pcIcon }); 
    }
  }

  function handleShowInfolder(name) {

    //  const lowerCaseName = name.toLowerCase().split(' ').join('');

      if (name === 'Hard Disk (C:)') {
        setCurrentFolder('DiskC')
        setSelectedFolder({label: 'Hard Disk (C:)', img: imageMapping(name)})
        setUndo(prev => [...prev, 'DiskC'])
        return;
      }
    
      if (name === 'Hard Disk (D:)') {
        setCurrentFolder('DiskD')
        setSelectedFolder({label: 'Hard Disk (D:)', img: imageMapping(name)})
        setUndo(prev => [...prev, 'DiskD'])
        return;
      }

      if (name === 'Resume') {
        setCurrentFolder('Resume')
        setSelectedFolder({label: 'Resume', img: imageMapping(name)})
        setUndo(prev => [...prev, 'Resume'])
        return;
      }

      if (name === 'Project') {
        setCurrentFolder('Project')
        setSelectedFolder({label: 'Project', img: imageMapping(name)})
        setUndo(prev => [...prev, 'Project'])
        return;
      }

      handleShow(name)
  }

  function handleShowInfolderMobile(name) {

    //  const lowerCaseName = name.toLowerCase().split(' ').join('');

      if (name === 'Hard Disk (C:)') {
        setCurrentFolder('DiskC')
        setSelectedFolder({label: 'Hard Disk (C:)', img: imageMapping(name)})
        setUndo(prev => [...prev, 'DiskC'])
        return;
      }
    
      if (name === 'Hard Disk (D:)') {
        setCurrentFolder('DiskD')
        setSelectedFolder({label: 'Hard Disk (D:)', img: imageMapping(name)})
        setUndo(prev => [...prev, 'DiskD'])
        return;
      }

      if (name === 'Resume') {
        setCurrentFolder('Resume')
        setSelectedFolder({label: 'Hard Disk (D:)', img: imageMapping(name)})
        setUndo(prev => [...prev, 'Resume'])
        return;
      }

      handleShowMobile(name)
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
          ref={DiskRef}
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
            <img src={imageMapping(selectedFolder.label)} alt="selectedFolder.label" />
            <span>{selectedFolder.label}</span>
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
        <div className="drive_control">
          <div className="drive_link">
            {popUpFolder && (
              <div className="popup_select_folder">
              <div className="selected_icon">
                <ul>
                {popUpiconList.map((icon, index) => (
                  <li key={index}
                    onClick={() => {
                      setSelectedFolder(icon)
                      setPopUpFolder(false)
                      NevigateToFolder(icon.label)
                    }}
                  >
                    <img src={imageMapping(icon.label)} alt={icon.label} 
                      style={{marginLeft: MarginOnSelectedIcon(icon.label)}}
                    />
                    <span>{icon.label}</span>
                  </li>
                ))}
                </ul>
              </div>
            </div>
            )}
            <div className='folder_select_left_container'>
              <img src={selectedFolder.img} alt={selectedFolder.label} />
              <p>
                {selectedFolder.label}
              </p>
            </div>
            <div className="folder_select_btn"
              onClick={() => {
                setPopUpFolder(!popUpFolder)
              }}
            >
              <span>
                <BsCaretDownFill/> 
              </span>
            </div>
          </div>
          <div className="undo_btn"
            onClick={() => UndoFunction()}
          >
            <img src={undoIcon} alt="undoIcon" />
          </div>
        </div>
        <div className="folder_content-mypc"
          onClick={() => {
            iconFocusIcon('')
            setPopUpFolder(false)
          }}
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
              {desktopIcon.filter(icon => icon.folderId === currentFolder).map(icon => (
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
                  disabled={currentFolder === 'MyComputer'? true : false}
                >
                  <div className='icon' key={icon.name}
                    style={iconContainerSize(iconScreenSize)}
                    ref={(el) => iconRefs.current[icon.name] = el}
                    onDoubleClick={() => handleShowInfolder(icon.name)}                      
                    onClick={!isTouchDevice ? (e) => {
                      iconFocusIcon(icon.name);
                      e.stopPropagation();
                    } : undefined}           
                    onTouchStart={() => {
                      handleShowInfolderMobile(icon.name);
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
              {desktopIcon.filter(icon => icon.folderId === currentFolder).some(icon => icon.focus) ? 
                '1 object(s) selected'
                :
                desktopIcon.filter(icon => icon.folderId === currentFolder).length + ' ' + 'object(s)'
              }
            </p>
          </div>
          <div className="size_bar">
            <p>
              {(() => {
                const filteredIcons = desktopIcon.filter(icon => icon.folderId === currentFolder);
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
