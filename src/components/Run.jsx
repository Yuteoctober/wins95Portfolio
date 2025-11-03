import ErrorBtn from './ErrorBtn';
import UseContext from '../Context'
import { useContext, useState, useEffect } from "react";
import Draggable from 'react-draggable'
import RunIcon from '../assets/run.png'
import '../css/Run.css'
import { BsCaretDownFill } from "react-icons/bs";
import {imageMapping} from './function/AppFunctions' 



function Run() {

  const { 
    desktopIcon,
    textError,
    runItemBox, setRunItemBox,
    RunInputVal, setRunInputVal,
    remountRunPosition,
    ErrorPopup, setErrorPopup,
    reMountRun,
    ObjectState,
    themeDragBar,
    RunExpand, setRunExpand,
    lastTapTime, setLastTapTime,
    isTouchDevice,
    handleShow,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,
    setRegErrorPopUp,
    setRegErrorPopUpVal,
    setCurrentFolder,
    setSelectedFolder,
   } = useContext(UseContext);

  const cannotOpenFile = ['internet', 'type', 'run', 'hard disk (c:)', 'hard disk (d:)', 'cd-rom' ]; // files that should not be opened by RUN

    function handleRunOpenFile(ObjectState, name) {
      const lowerCaseName = name.toLowerCase().trim();
      const matchedItem = desktopIcon.find(
        item => item.name.toLowerCase().trim() === lowerCaseName
      );

      const closeRun = () => {
        deleteTap('Run');
        setRunInputVal('');
        setRunItemBox(false);
      };

      
      if(!matchedItem) {
        setRegErrorPopUp(true);
        setRegErrorPopUpVal(name);
        closeRun();
        return;
      }

      // Prevent opening restricted files
      if (cannotOpenFile.includes(lowerCaseName)) {
        closeRun();
        return;
      }

      switch (lowerCaseName) {
        

        case 'resume': // Resume File
          setTimeout(() => {
            handleShow('ResumeFile');
            closeRun();
          }, 100);
          break;


        default:
          setTimeout(() => {
            const passedName = matchedItem ? matchedItem.name : name;
            handleShow(passedName);
            closeRun();
          }, 100);
          break;
      }
    }

    // Generate allowed desktop items in run's list
    const listItems = desktopIcon
      .filter(item => {
        const lowerCaseName = item.name.toLowerCase();
        return (
          !cannotOpenFile.includes(lowerCaseName) &&
          lowerCaseName !== 'resumefile' &&
          !lowerCaseName.startsWith('0')
        );
      })
      .map(item => item.name);



      function handleDragStop(event, data) {
        const positionX = data.x 
        const positionY = data.y
        setRunExpand(prev => ({
          ...prev,
          x: positionX,
          y: positionY
        }))

      }

   function handleExpandStateToggle() {
    setRunExpand(prevState => ({
      ...prevState,
      expand: !prevState.expand
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
        setRunExpand(prevState => ({
            ...prevState,
            expand: !prevState.expand
        }));
    }
    setLastTapTime(now);
}


    useEffect(() => { 
      remountRunPosition()
      
    },[RunExpand.show])

  return (
    <>
    {ErrorPopup && (
        <ErrorBtn
            themeDragBar={themeDragBar}
            stateVal={RunInputVal}
            setStateVal={setErrorPopup}
            text={textError}
            runOpenFuction={() => handleShow('Run')} 
        />  
    )}
      <Draggable
        axis="both" 
        handle={'.folder_dragbar_run'}
        grid={[1, 1]}
        scale={1}
        disabled={RunExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
            x: 3,
            y: window.innerHeight - 204,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('Run')}
        key={reMountRun}
      >
        <div className='folder_folder_run' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('Run');
              setRunItemBox(false)
            }}
            style={ RunExpand.expand ? inlineStyleExpand('Run') : inlineStyle('Run')}>
          <div className="folder_dragbar_run"
              onDoubleClick={handleExpandStateToggle}
              onTouchStart={handleExpandStateToggleMobile}
             style={{ background: RunExpand.focusItem? themeDragBar : '#757579'}}
          >
            <div className="folder_barname_run">
              <span>Run</span>
            </div>
            <div className="folder_barbtn_run">              
              <div>
                <p className='x'
                 onClick={!isTouchDevice ? () => {
                  deleteTap('Run')
                  setRunInputVal('')
                  setRunItemBox(false)
                 }: undefined
                }
                onTouchEnd={() => {
                  deleteTap('Run')
                  setRunInputVal('')
                  setRunItemBox(false)
              }}
              >×</p>
              </div>
            </div>
          </div>
          <div className="run_top_container">
              <img src={RunIcon} alt="Run" />
              <p>
                Type the name of a program, folder, or document, and
                <br />
                Windwos will open it for you.
              </p>
          </div>
          <div className="run_middle_container">
            <p>Open:</p>
            <input maxLength={35} 
                onChange={(e) => setRunInputVal(e.target.value)}
                value={RunInputVal}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                      handleRunOpenFile(ObjectState, RunInputVal)
                  }
              }}
            />
            <div 
                onClick={(e) => {
                    e.stopPropagation()
                    setRunItemBox(!runItemBox)}}
            >
                <BsCaretDownFill className='arrow_down'/>
            </div>
          </div>
          {runItemBox && (
            <div className="run_dropdown_box">
                {listItems.map((item, index) => (
                    <p key={index}
                        onClick={(e) => {
                            e.stopPropagation()
                            setRunInputVal(item)
                            setRunItemBox(false)
                        }}
                    >
                        {item}
                    </p>
                ))}
            </div>
          )}
          
          <div className="run_btn_container">
            <div
                style={RunInputVal.length < 1 ? {
                    pointerEvents: 'none',
                    color: 'grey'
                }:{}}
                onClick={() => {
                    handleRunOpenFile(ObjectState, RunInputVal)
                }}
            >
                <p>OK</p>
            </div>
            <div 
                onClick={() => {
                    deleteTap('Run')
                    setRunInputVal('')
                    setRunItemBox(false)
                }}

            >
                <p>Cancel</p>
            </div>
            <div>
                <p>Browse...</p>
            </div>
          </div>
        </div>
      </Draggable>
    </>
  )
}          

export default Run
