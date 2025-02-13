import { useEffect, useRef, useContext, useState } from 'react';
import UseContext from '../Context';
import '../css/RightClickWindows.css';
import { BsFillCaretRightFill } from "react-icons/bs";

function RightClickWindows() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const { 
    handleShow,
    rightClickDefault, setRightClickDefault,
    rightClickPosition, setRightClickPosition,
  } = useContext(UseContext);

  console.log(rightClickPosition.x, screenWidth);

  return (
    <>
      {rightClickDefault && (
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
            <p>Undo Delete</p>
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
    </>
  );
}

export default RightClickWindows;
