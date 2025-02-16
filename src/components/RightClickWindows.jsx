import { useEffect, useRef, useContext, useState } from 'react';
import UseContext from '../Context';
import '../css/RightClickWindows.css';
import { BsFillCaretRightFill } from "react-icons/bs";

function RightClickWindows() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const { 
    handleDrop,
    setKey,
    refBeingClicked,
    binRestoreArr, setBinRestoreArr,
    rightClickBin, setRightClickBin,
    inFolder, setInFolder,
    handleShowInfolder, 
    iconBeingRightClicked, setIconBeingRightClicked,
    rightClickIcon, setRightClickIcon,
    setDesktopIcon, desktopIcon,
    iconFocusIcon,
    setRefresh,
    handleShow,
    rightClickDefault, setRightClickDefault,
    rightClickPosition,
  } = useContext(UseContext);


  function refreshed() {
    iconFocusIcon('')
    setRightClickDefault(false);
    setRefresh(prev => prev + 1);
  }


  function handleSwitchOpenFolder() { // decide which folder function to call

    if(iconBeingRightClicked.name === inFolder) { 
      handleShowInfolder(iconBeingRightClicked.name)
      setInFolder('')
      return;
    }
    handleShow(iconBeingRightClicked.name);
  }

  function handleDeleteIcon() {

    if(iconBeingRightClicked.name === 'MyComputer' || iconBeingRightClicked.name === 'RecycleBin') return;
    // Add icon to binRestoreArr
    setBinRestoreArr(prevArr => [
      ...prevArr, 
      {
        name: iconBeingRightClicked.name, 
        OldFolder: iconBeingRightClicked.folderId
      }
    ]);

    const droppedIcon = desktopIcon.find(icon => icon.name === iconBeingRightClicked.name);
    // Update desktopIcon array correctly
    if (droppedIcon) { 
      setDesktopIcon(prevIcons => {
        const updatedIcons = prevIcons.filter(icon => icon.name !== droppedIcon.name);
        const newIcon = { ...droppedIcon, folderId: 'RecycleBin' };
        setKey(prev => prev + 1); // make folder icon by re-mount
        localStorage.setItem('icons', JSON.stringify([...updatedIcons, newIcon]));
        return [...updatedIcons, newIcon];
        
      });
    }
  }


  function handleRestore() {
    
  
  } 

  return (
    <>
      {(rightClickDefault && !rightClickIcon && !rightClickBin) && (
        <div className='window_rightclick_container'
          style={{ 
            top: screenHeight - rightClickPosition.y < 217 ? screenHeight - 217 : rightClickPosition.y,
            left: screenWidth - rightClickPosition.x < 138 ? screenWidth - 138 : rightClickPosition.x 
          }}
        >  
            <p>
                Arrange Icons
                <span>
                    <BsFillCaretRightFill/>
                </span>
            </p>
            
            <p style={{paddingLeft: '25px'}}>Line up Icons</p>
            <h5></h5>
            <p style={{color: '#8a8989'}}>Paste</p>
            <p style={{color: '#8a8989'}}>Paste Shortcut</p>
            <p 
              onClick={() => refreshed()}
            >
              Refresh
            </p>
            <h5></h5>
            <p>
                New
                <span>
                    <BsFillCaretRightFill/>
                </span>
            </p>
            <h5></h5>
            <p 
              onClick={() => {
                handleShow('Settings')
                setRightClickDefault(false);
              }}
            >
              Properties
            </p>
        </div>  
      )}
      {(rightClickDefault && rightClickIcon && !rightClickBin) &&  (
        <div className='window_rightclick_container'
        style={{ 
          top: screenHeight - rightClickPosition.y < 217 ? screenHeight - 217 : rightClickPosition.y,
          left: screenWidth - rightClickPosition.x < 138 ? screenWidth - 138 : rightClickPosition.x,
          height: '212px', width: '128px'
        }}
      >  
          <p 
            onClick={() => {
              handleSwitchOpenFolder();
              iconFocusIcon('')
              setRightClickIcon(false);
              refBeingClicked.current = null;
            }}
          >
            Open
          </p>
          <p style={{paddingLeft: '25px'}}>Edit</p>
          <h5></h5>
          <p>
            Send To
            <span>
                <BsFillCaretRightFill/>
            </span>
          </p>
          <h5></h5>
          <p style={{color: '#8a8989'}}>Cut</p>
          <p style={{color: '#8a8989'}}>Copy</p>
          <h5></h5>
          <p
            onClick={() => {
              handleDeleteIcon();
              iconFocusIcon('')
              setRightClickIcon(false);
              setRightClickDefault(false)
              refBeingClicked.current = null;
            }}
          >
            Delete
          </p>
          <p>Rename</p>
          <h5></h5>
          <p>Properties</p>
      </div> 
      )}
      {(rightClickDefault && !rightClickIcon && rightClickBin) && (
        <div className='window_rightclick_container'
        style={{ 
          top: screenHeight - rightClickPosition.y < 217 ? screenHeight - 217 : rightClickPosition.y,
          left: screenWidth - rightClickPosition.x < 138 ? screenWidth - 138 : rightClickPosition.x,
          height: '120px', width: '120px'
        }}
      >  
          <p 
            onClick={() => {
              handleRestore();
              iconFocusIcon('')
              setRightClickBin(false);
              setRightClickDefault(false)
              refBeingClicked.current = null;
            }}
          >
            Restore
          </p>
          <h5></h5>
          <p >Cut</p>
          <h5></h5>
          <p style={{color: '#8a8989'}}>Delete</p>
          <h5></h5>
          <p>Properties</p>
      </div> 
      )}
       
    </>
  );
}

export default RightClickWindows;
