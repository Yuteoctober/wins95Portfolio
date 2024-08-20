import UseContext from '../Context'
import { useContext, useRef } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import ReadMePic from '../assets/notepad.png'
import '../css/ReadMe.css'


function ReadMeFolder() {



  const { 
    ReadMeExpand, setReadMeExpand,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,
    iconFocusIcon,
   } = useContext(UseContext);


      function handleDragStop(event, data) {
        const positionX = data.x 
        const positionY = data.y
        setReadMeExpand(prev => ({
          ...prev,
          x: positionX,
          y: positionY
        }))

      }

   function handleExpandStateToggle() {
    setReadMeExpand(prevState => ({
      ...prevState,
      expand: !prevState.expand
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
        setReadMeExpand(prevState => ({
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
        handle={'.folder_dragbar-ReadMe'}
        grid={[1, 1]}
        scale={1}
        disabled={ReadMeExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 20 : 50,
          y: window.innerWidth <= 500 ? 40 : 120,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('ReadMe')}
      >
        <div className='folder_folder-ReadMe' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('ReadMe');
            }}
            style={ ReadMeExpand.expand ? inlineStyleExpand('ReadMe') : inlineStyle('ReadMe')}>
          <div className="folder_dragbar-ReadMe"
              onDoubleClick={handleExpandStateToggle}
              onTouchStart={handleExpandStateToggleMobile}
             style={{ background: ReadMeExpand.focusItem? '#14045c' : '#757579'}}
          >
            <div className="folder_barname-ReadMe">
              <img src={ReadMePic} alt="ReadMe" />
              <span>ReadMe</span>
            </div>
            <div className="folder_barbtn-ReadMe">
              <div onClick={ !isTouchDevice? (e) => {
                e.stopPropagation()
                setReadMeExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('ReadMe') 
              } : undefined
            }
                   onTouchEnd={(e) => {
                    e.stopPropagation()
                    setReadMeExpand(prev => ({...prev, hide: true, focusItem: false}))
                    StyleHide('ReadMe')
                  }}
              >
                <p className='dash-ReadMe'></p>
              </div>
              <div
                onClick={ !isTouchDevice ? () => handleExpandStateToggle() : undefined}
                onTouchEnd={handleExpandStateToggle}
              >
                <motion.div className={`expand-ReadMe ${ReadMeExpand.expand ? 'full' : ''}`}>
                </motion.div>
                {ReadMeExpand.expand ? 
                (
                <div className="expand_2-ReadMe"></div>
                )
                :
                (null)}
              </div>
              <div><p className='x-ReadMe'
                 onClick={!isTouchDevice ? () => {
                  deleteTap('ReadMe')}
                  : undefined
                }
                onTouchEnd={() => deleteTap('ReadMe')}
              >x</p></div>
            </div>
          </div>

          <div className="file_edit_container-ReadMe">
              <p>File<span style={{left: '-23px'}}>_</span></p>
              <p>Edit<span style={{left: '-24px'}}>_</span></p>
              <p>View<span style={{left: '-32px'}}>_</span></p>
              <p>Help<span style={{left: '-30px'}}>_</span></p>
          </div>
          <div className="folder_content-ReadMe"
            onClick={() => iconFocusIcon('')}
            style={ReadMeExpand.expand ? 
              { height: 'calc(100svh - 100px)'} 
              : 
              {}
            }>
              <p style={{position: 'relative',marginTop: '1rem'}}>
                --------------------------------------------------------------------------------------
              </p>
              <p style={{position: 'relative', fontSize: '16px', paddingLeft: '2rem'}}>
                WINDOWS 95 PORTFOLIO READ ME!
              </p>
              <p style={{position: 'relative', marginBottom: '.5rem'}}>
              --------------------------------------------------------------------------------------
              </p>
              <p style={{paddingLeft: '.2rem', fontSize: '13px'}}>
              - Everything built by me from scratch (No style component!)
              <br />
              - All the functionalities are also works smoothly in mobile as well :)
              <br />
              - Shoot me an Email if you like my work, it can be found in Resume's folder
              </p>
              <p style={{position: 'relative', marginTop: '.5rem'}}>
              --------------------------------------------------------------------------------------
              </p>
          </div>
        </div>
      </Draggable>
    </>
  )
}          

export default ReadMeFolder;
