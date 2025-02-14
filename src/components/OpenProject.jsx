import UseContext from '../Context'
import { useContext } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import ie from '../assets/ie.png'
import '../css/OpenProject.css'


function OpenProject() {

  const { 
    themeDragBar,
    projectname,
    projectUrl,
    openProjectExpand, setOpenProjectExpand,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    iconFocusIcon,
    deleteTap,

   } = useContext(UseContext);



      function handleDragStop(event, data) {
        const positionX = data.x 
        const positionY = data.y
        setOpenProjectExpand(prev => ({
          ...prev,
          x: positionX,
          y: positionY
        }))

      }

   function handleExpandStateToggle() {
    setOpenProjectExpand(prevState => ({
      ...prevState,
      expand: !prevState.expand
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
        setOpenProjectExpand(prevState => ({
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
        disabled={openProjectExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 5 : 80,
          y: window.innerWidth <= 500 ? 100 : 90,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('Internet')}
      >
        <div className='folder_folder-open-project' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('Internet');
            }}
            style={ openProjectExpand.expand ? inlineStyleExpand('Internet') : inlineStyle('Internet')}>
          <div className="folder_dragbar"
              onDoubleClick={handleExpandStateToggle}
              onTouchStart={handleExpandStateToggleMobile}
             style={{ background: openProjectExpand.focusItem? themeDragBar : '#757579'}}
          >
            <div className="folder_barname">
              <img src={ie} alt="ie" style={{ width: '20px'}} />
                <span>
                    {projectname()}
                </span>
              </div>
            <div className="folder_barbtn">
              <div onClick={ !isTouchDevice? (e) => {
                e.stopPropagation()
                setOpenProjectExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('Internet') 
              } : undefined
            }
                   onTouchEnd={(e) => {
                    e.stopPropagation()
                    setOpenProjectExpand(prev => ({...prev, hide: true, focusItem: false}))
                    StyleHide('Internet')
                  }}
                    onTouchStart={(e) => e.stopPropagation()}
              >
                <p className='dash'></p>
              </div>
              <div
                onClick={ !isTouchDevice ? () => handleExpandStateToggle() : undefined}
                onTouchEnd={handleExpandStateToggle}
              >
                <motion.div className={`expand ${openProjectExpand.expand ? 'full' : ''}`}>
                </motion.div>
                {openProjectExpand.expand ? 
                (
                <div className="expand_2"></div>
                )
                :
                (null)}
              </div>
              <div>
                <p className='x'
                 onClick={!isTouchDevice ? () => {
                  deleteTap('Internet')
                 }: undefined
                }
                onTouchEnd={() => {
                  deleteTap('Internet')
              }}
                >×</p>
              </div>
            </div>
          </div>

          <div className="file_edit_container">
              <p>File<span style={{left: '-23px'}}>_</span></p>
              <p>Edit<span style={{left: '-24px'}}>_</span></p>
              <p>View<span style={{left: '-32px'}}>_</span></p>
              <p>Help<span style={{left: '-30px'}}>_</span></p>
          </div>
          <div className="address_container">
            <p className='address'>Address:</p>
            <div className="address_box">
                <p>{projectUrl}</p>
            </div>
          </div>
          <div className="openproject_content"
            onClick={() => iconFocusIcon('Internet')}
            style={openProjectExpand.expand ? 
              { height: 'calc(100svh - 122px)'} 
              : 
              {}
            }
          >
        {openProjectExpand.show && (
          <iframe
          src={projectUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          scrolling="yes"
        />
        )}
        
          </div>
          <div className='ifram_text_container'>
            <p>
                If page does not load, please click <a href={projectUrl} target="_blank" rel="noopener noreferrer">here</a> to view directly.
            </p>
          </div>
        </div>
      </Draggable>
    </>
  )
}          

export default OpenProject
