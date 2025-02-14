import { useEffect, useRef, useContext, useState } from 'react';
import UseContext from '../Context';
import '../css/RightClickWindows.css';
import { BsFillCaretRightFill } from "react-icons/bs";

function RightClickWindows() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const { 
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

  return (
    <>
      {(rightClickDefault && !rightClickIcon) && (
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
      {(rightClickDefault && rightClickIcon) &&  (
        <div className='window_rightclick_container'
        style={{ 
          top: screenHeight - rightClickPosition.y < 217 ? screenHeight - 217 : rightClickPosition.y,
          left: screenWidth - rightClickPosition.x < 138 ? screenWidth - 138 : rightClickPosition.x,
          height: '212px', width: '128px'
        }}
      >  
          <p 
            onClick={() => {
              handleShow(iconBeingRightClicked)
              iconFocusIcon('')
              setRightClickIcon(false);
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
          <p>Delete</p>
          <p>Rename</p>
          <h5></h5>
          <p>Properties</p>
      </div> 
      )}
       
    </>
  );
}

export default RightClickWindows;
