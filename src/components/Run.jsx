import UseContext from '../Context'
import { useContext, useState } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import RunIcon from '../assets/run.png'
import '../css/Run.css'
import { BsCaretDownFill } from "react-icons/bs";


function Run() {

  const { 
    themeDragBar,
    RunExpand, setRunExpand,
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

   const [runItemBox, setRunItemBox] = useState(false)

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


  return (
    <>
      <Draggable
        axis="both" 
        handle={'.folder_dragbar_run'}
        grid={[1, 1]}
        scale={1}
        disabled={RunExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
            x: 4,
            y: window.innerHeight - 208,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('Run')}
      >
        <div className='folder_folder_run' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('Run');
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
                 }: undefined
                }
                onTouchEnd={() => {
                  deleteTap('Run')
              }}
              >x</p>
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
            <input maxLength={35}/>
            <div 
                onClick={() => setRunItemBox(!runItemBox)}
            >
                <BsCaretDownFill className='arrow_down'/>
            </div>
          </div>
          {runItemBox && (
            <div className="run_dropdown_box">

            </div>
          )}
          
          <div className="run_btn_container">
            <div>
                <p>OK</p>
            </div>
            <div>
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
