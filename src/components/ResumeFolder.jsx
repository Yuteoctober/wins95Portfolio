import UseContext from '../Context'
import { useContext } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import resumefile from '../assets/resumeOri.png'
import Resume from '../assets/folder.png'
import '../css/ResumeFolder.css'


function ResumeFolder() {

  const { 
    themeDragBar,
    ResumeExpand, setResumeExpand,
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
        const positionX = data.x 
        const positionY = data.y
        setResumeExpand(prev => ({
          ...prev,
          x: positionX,
          y: positionY
        }))

      }

   function handleExpandStateToggle() {
    setResumeExpand(prevState => ({
      ...prevState,
      expand: !prevState.expand
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
        setResumeExpand(prevState => ({
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
        handle={'.folder_dragbar'}
        grid={[1, 1]}
        scale={1}
        disabled={ResumeExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 30 : 60,
          y: window.innerWidth <= 500 ? 30 : 80,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('Resume')}
      >
        <div className='folder_folder' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('Resume');
            }}
            style={ ResumeExpand.expand ? inlineStyleExpand('Resume') : inlineStyle('Resume')}>
          <div className="folder_dragbar"
              onDoubleClick={handleExpandStateToggle}
              onTouchStart={handleExpandStateToggleMobile}
             style={{ background: ResumeExpand.focusItem? themeDragBar : '#757579'}}
          >
            <div className="folder_barname">
              <img src={Resume} alt="Resume" />
              <span>Resume</span>
            </div>
            <div className="folder_barbtn">
              <div onClick={ !isTouchDevice? (e) => {
                e.stopPropagation()
                setResumeExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('Resume') 
              } : undefined
            }
                   onTouchEnd={(e) => {
                    e.stopPropagation()
                    setResumeExpand(prev => ({...prev, hide: true, focusItem: false}))
                    StyleHide('Resume')
                  }}
              >
                <p className='dash'></p>
              </div>
              <div
                onClick={ !isTouchDevice ? () => handleExpandStateToggle() : undefined}
                onTouchEnd={handleExpandStateToggle}
              >
                <motion.div className={`expand ${ResumeExpand.expand ? 'full' : ''}`}>
                </motion.div>
                {ResumeExpand.expand ? 
                (
                <div className="expand_2"></div>
                )
                :
                (null)}
              </div>
              <div><p className='x'
                 onClick={!isTouchDevice ? () => {
                  deleteTap('Resume')
                 }: undefined
                }
                onTouchEnd={() => {
                  deleteTap('Resume')
              }}
              >x</p></div>
            </div>
          </div>

          <div className="file_edit_container">
              <p>File<span style={{left: '-23px'}}>_</span></p>
              <p>Edit<span style={{left: '-24px'}}>_</span></p>
              <p>View<span style={{left: '-32px'}}>_</span></p>
              <p>Help<span style={{left: '-30px'}}>_</span></p>
          </div>
          <div className="folder_content"
            onClick={() => iconFocusIcon('')}
            style={ResumeExpand.expand ? 
              { height: 'calc(100svh - 122px)'} 
              : 
              {}
            }
          >
            <div className="item_container">
              <div className='item_1'
                onDoubleClick={() => handleShow('ResumeFile')}
                onTouchStart={() => handleShowMobile('ResumeFile')}
                onClick={(e) => {
                  e.stopPropagation();
                  iconFocusIcon('Resumefolder')
                }}
              >
                <img src={resumefile} alt="resumeFile" 
                  className={ResumeExpand.item_1Focus? 'item_1_img_focus' : ''}
                />
                <p className={ResumeExpand.item_1Focus? 'item_1_p_focus' : ''}>
                  Resume
                </p>
              </div>
            </div>
          </div>
          <div className="btm_bar_container">
            <div className="object_bar"><p>1 object(s) {ResumeExpand.item_1Focus?'selected':''}</p></div>
            <div className="size_bar"><p>5.25 MB</p></div>
          </div>
        </div>
      </Draggable>
    </>
  )
}          

export default ResumeFolder
