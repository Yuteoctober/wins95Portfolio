import UseContext from '../Context';
import { Fragment, useContext, useEffect, useRef, useState} from "react";
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';
import '../css/MyComputer.css';
import undoIcon from '../assets/arrowback.png'
import { BsCaretDownFill } from "react-icons/bs";

function MyComputer() {

  const iconRefs = useRef([]);
  const [popUpFolder, setPopUpFolder] = useState(false)

  const { 
    refBeingClicked,
    inFolder, setInFolder,
    handleShowInfolderMobile, handleShowInfolder,
    handleMobileLongPress,
    setRightClickIcon,
    setIconBeingRightClicked,
    setRightClickDefault,
    timerRef,
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

   // popup select folder
   const popUpiconList = [ // important default folderand disks
    {name: 'MyComputer', pic: imageMapping('MyComputer'), at: 'MyComputer'},
    {name: 'Hard Disk (C:)', pic: imageMapping('Hard Disk (C:)'), at: 'DiskC'},
    {name: 'Hard Disk (D:)', pic: imageMapping('Hard Disk (D:)'), at: 'DiskD'},
    {name: 'CD-ROM', pic: imageMapping('CD-ROM'), at: 'CD-ROM'},
  ]

  const folderMap = [ // important all the folder name
    {folder: 'MyComputer', label: 'MyComputer', img: imageMapping('MyComputer')},
    {folder: 'DiskC',label: 'Hard Disk (C:)', img: imageMapping('Hard Disk (C:)')},
    {folder: 'DiskD',label: 'Hard Disk (D:)', img: imageMapping('Hard Disk (D:)')},
    {folder: 'CD-ROM',label: 'CD-ROM', img: imageMapping('CD-ROM')},
    {folder: 'Resume',label: 'Resume', img: imageMapping('Resume')},
    {folder: 'Project',label: 'Project', img: imageMapping('Project')},
    {folder: 'Picture',label: 'Picture', img: imageMapping('Picture')},
    {folder: 'Utility',label: 'Utility', img: imageMapping('Utility')},
  ]

  // const popUpiconList = desktopIcon.filter(a => {
  //   if(a.type === 'Drive') {
  //     return true
  //   }
  //   return false
  // })

  const subFolders = desktopIcon.filter(a => { // get all the folder
    if(a.type === 'folder'){
      return true
    }
    return false
  })

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


  function NevigateToFolder(name) { /// important to nevigate
    // Map folder names to internal folder identifiers
    const folderMap = {
      'Hard Disk (C:)': 'DiskC',
      'Hard Disk (D:)': 'DiskD',
      'MyComputer': 'MyComputer',
      'CD-ROM': 'CD-ROM',
      'Resume': 'Resume',
      'Project': 'Project',
      'Picture': 'Picture',
      'Utility': 'Utility',
    };
  
    // Get the folder identifier from the mapy
    const folder = folderMap[name];
  
    // If the folder is valid, update the current folder and undo stack
 
      setCurrentFolder(folder);
      setUndo(prev => [...prev, folder]);
    
  }
  

  useEffect(() => {
    // defaulting to Mycomputer
      setSelectedFolder({label: 'MyComputer', img: imageMapping('MyComputer')})
      setCurrentFolder('MyComputer')
      setPopUpFolder(false)
      setUndo(['MyComputer'])
    
  },[MyComputerExpand.show])
  

  // margin to popup select folder
  function MarginOnSelectedIcon(name, sub) {
    if(name === 'MyComputer') return '0.2rem';
    if(name.includes('Disk') || name.includes('CD-ROM')) return '1.1rem'
    if(sub === 'sub1') return '2rem'
    if(sub === 'sub2') return '2.9rem'
    return;
  }

  // undo function
  function UndoFunction() {

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
      setSelectedFolder({ label: 'MyComputer', img: imageMapping('MyComputer') }); 
    }
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
            onTouchStart={(e) => e.stopPropagation()}
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
        <div className="drive_control" >
          <div className="drive_link">
            {popUpFolder && (
              
                <div className="popup_select_folder">
                <div className="selected_icon">
                  <ul>
                  {popUpiconList.map((icon, index) => (
                    <>
                      <li key={index}
                        onClick={() => {
                          setSelectedFolder({label: icon.name, img: imageMapping(icon.name)})
                          setPopUpFolder(false)
                          NevigateToFolder(icon.name)
                        }}
                      >
                        <img src={imageMapping(icon.name)} alt={icon.name} 
                          style={{marginLeft: MarginOnSelectedIcon(icon.name)}}
                        />
                        <span>{icon.name}</span>
                      </li>
                      {subFolders.map((subFolder, index) => (
                        subFolder.folderId === icon.at && (
                          <>
                            <li key={index} onClick={() => {
                              setSelectedFolder({label: subFolder.name, img: imageMapping(subFolder.name)})
                              setPopUpFolder(false)
                              NevigateToFolder(subFolder.name)
                            }}>
                            <img src={imageMapping(subFolder.name)} alt={subFolder.name} 
                              style={{ marginLeft: MarginOnSelectedIcon(subFolder.name, 'sub1') }}
                            />
                            <span>{subFolder.name}</span>
                            </li>
                            {subFolders.map((subSubFolder, index) => 
                              subSubFolder.folderId === subFolder.name ? 
                              <li key={index} onClick={() => {
                                setSelectedFolder({label: subSubFolder.name, img: imageMapping(subSubFolder.name)})
                                setPopUpFolder(false)
                                NevigateToFolder(subSubFolder.name)
                              }}>
                              <img src={imageMapping(subSubFolder.name)} alt={subSubFolder.name} 
                                style={{ marginLeft: MarginOnSelectedIcon(subSubFolder.name, 'sub2') }}
                              />
                              <span>{subSubFolder.name}</span>
                              </li> 
                              : null
                            )}
                          </>
                      )
                      ))}
                    </>
                  ))}
                  </ul>
                </div>
              </div>
            )}
            <div className='folder_select_left_container'
            >
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
            onClick={() => {
              setPopUpFolder(false)
              UndoFunction()}}
          >
            <img src={undoIcon} alt="undoIcon" />
          </div>
        </div>
        <div className="folder_content-mypc"
          onClick={(e) =>  e.stopPropagation()}
          style={{ 
            height: MyComputerExpand.expand ? 'calc(100svh - 122px)' : '',
            overflow: dragging? '' : 'hidden' 
          }}
        >
          <div className='parent_item_container' key={key}
            onClick={() => handleSetFocusItemTrue('MyComputer')}
          >

            <div className="item_container" 
            onClick={(e) => {
              e.stopPropagation();
              setPopUpFolder(false)
              iconFocusIcon('');
              handleSetFocusItemTrue('MyComputer');
            }}
              style={{
                position: dragging? 'absolute' : '',
              }}
              >
              {desktopIcon.filter(icon => icon.folderId === currentFolder).map(icon => (
                <Fragment key={icon.name}>
                  <Draggable
                  axis={currentFolder === 'MyComputer' ? 'none' : 'both'}
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
                    handleDrop(e, icon.name, dropTargetFolder, icon.folderId);
                    clearTimeout(timerRef.current)
                  }}
                  key={key}
                >
                  <div className='icon' key={icon.name}
                    style={iconContainerSize(iconScreenSize)}
                    ref={(el) => iconRefs.current[icon.name] = el}
                    onContextMenu={() => {
                      setRightClickIcon(true);
                      iconFocusIcon(icon.name);
                      setIconBeingRightClicked(icon);
                      setInFolder(icon.name);
                      refBeingClicked.current = iconRefs.current[icon.name]
                    }}
                    onDoubleClick={() => handleShowInfolder(icon.name)}                      
                    onClick={!isTouchDevice ? (e) => {
                      iconFocusIcon(icon.name);
                      e.stopPropagation();
                    }: undefined}           
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      handleShowInfolderMobile(icon.name);
                      iconFocusIcon(icon.name);
                      handleMobileLongPress(e, icon);
                      setInFolder(icon.name);
                      refBeingClicked.current = iconRefs.current[icon.name]
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
