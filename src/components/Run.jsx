import ErrorBtn from './ErrorBtn';
import UseContext from '../Context'
import { useContext, useState, useEffect } from "react";
import Draggable from 'react-draggable'
import RunIcon from '../assets/run.png'
import '../css/Run.css'
import { BsCaretDownFill } from "react-icons/bs";



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
   } = useContext(UseContext);

   const cannotOpenFile = ['internet', 'type', 'run'] // file that should not be open by RUN command

   function handleRunOpenFile(ObjectState, name) {
    const object = desktopIcon;
    const lowerCaseName = name.toLowerCase().trim();

    const matchedItem = object.find(item => item.name.toLowerCase().trim() === lowerCaseName);
    
    // if (!matchedItem) {
    //     deleteTap('Run')
    //     setErrorPopup(true)
    //     return;
    // }

    // if (cannotOpenFile.includes(lowerCaseName)) return;

    if(lowerCaseName === 'internet') {
      deleteTap('Run')
      setRunInputVal('')
      setRunItemBox(false)
      return;
    }

    if (lowerCaseName === 'resume') {
        setTimeout(() => {
          handleShow('ResumeFile'); 
          deleteTap('Run')
          setRunInputVal('')
          setRunItemBox(false)
        }, 100);
        return;
        
    }
    setTimeout(() => {
      const passedName = matchedItem ? matchedItem.name : name
        handleShow(passedName);
        deleteTap('Run')
        setRunInputVal('')
        setRunItemBox(false)
    }, 100);
    
}

    const listItems = desktopIcon.map((item) => {
        const lowerCaseName = item.name.toLowerCase(); 
        if (!cannotOpenFile.includes(lowerCaseName) && lowerCaseName !== 'resumefile' && lowerCaseName[0] !== '0') {
        return item.name; 
        }
        return null;
    }).filter(Boolean);


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
