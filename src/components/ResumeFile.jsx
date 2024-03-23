import UseContext from '../Context'
import { useContext, useState, useEffect, useRef } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import resumefile from '../assets/resume.png'
import download from '../assets/file4download.png'
import ie from '../assets/ie.png'
import '../css/ResumeFile.css'



function ResumeFile() {

  const { 
    ResumeFileExpand, setResumeFileExpand,
    setNftExpand,
    setNoteExpand,
    setTypeExpand,
    setResumeExpand,
    setMybioExpand,
    setProjectExpand,
    setMailExpand,
    setWinampExpand,
    tap, setTap,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    iconState, setIconState,

   } = useContext(UseContext);

      function handleDragStop(event, data) {
        const positionX = data.x 
        const positionY = data.y
        setResumeFileExpand(prev => ({
          ...prev,
          x: positionX,
          y: positionY
        }))

      }

   function handleExpandStateToggle() {
    setResumeFileExpand(prevState => ({
      ...prevState,
      expand: !prevState.expand
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
        setResumeFileExpand(prevState => ({
            ...prevState,
            expand: !prevState.expand
        }));
    }
    setLastTapTime(now);
}

    function handleSetFocusItemTrue() { //click on one, other goes false
        setIconState(prevIcons => prevIcons.map(icon => ({
          ...icon,
          focus: false
        })));
        setResumeFileExpand(prev => ({...prev, focusItem: true}))
        setMybioExpand(prev => ({...prev, focusItem: false}))
        setProjectExpand(prev => ({...prev, focusItem: false}))
        setMailExpand(prev => ({...prev, focusItem: false}))
        setResumeExpand(prev => ({...prev, focusItem: false}))
        setNoteExpand(prev => ({...prev, focusItem: false}))
        setTypeExpand(prev => ({...prev, focusItem: false}))
        setWinampExpand(prev => ({...prev, focusItem: false, focus: false}))
        setNftExpand(prev => ({...prev, focusItem: false}))
    }


  return (
    <>
      <Draggable
        axis="both" 
        handle={'.folder_dragbar-resumefile'}
        grid={[1, 1]}
        scale={1}
        disabled={ResumeFileExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 5 : 80,
          y: window.innerWidth <= 500 ? 100 : 90,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={handleSetFocusItemTrue}
      >
        <div className='folder_folder-resumefile' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue();
            }}
            style={ ResumeFileExpand.expand ? 
            {
                display: ResumeFileExpand.show ? 'block' : '',
                maxWidth: 'none',
                width: '100%',
                height: 'calc(100% - 37px)',
                left: `${ResumeFileExpand.x <= 0 ? Math.abs(ResumeFileExpand.x)*2 + ResumeFileExpand.x : -ResumeFileExpand.x}px`,
                top: `${ResumeFileExpand.y <= 0 ? Math.abs(ResumeFileExpand.y)*2 + ResumeFileExpand.y : -ResumeFileExpand.y}px`,
                opacity: ResumeFileExpand.hide ? '0' : '1',
                zIndex: ResumeFileExpand.hide ? '-1' : (ResumeFileExpand.focusItem ? '999' : '3'),
                pointerEvents: ResumeFileExpand.hide ? 'none' : 'auto',
                resize: ResumeFileExpand.expand ? 'none' : '',
            } : { 
                display: ResumeFileExpand.show ? 'block' : '',
                opacity: ResumeFileExpand.hide ? '0' : '1',
                zIndex: ResumeFileExpand.hide ? '-1' : (ResumeFileExpand.focusItem ? '999' : '3'),
                pointerEvents: ResumeFileExpand.hide ? 'none' : 'auto'
                
            }
        }>
          <div className="folder_dragbar-resumefile"
              onDoubleClick={handleExpandStateToggle}
              onTouchStart={handleExpandStateToggleMobile}
             style={{ background: ResumeFileExpand.focusItem? '#14045c' : '#757579'}}
          >
            <div className="folder_barname-resumefile">
              <img src={resumefile} alt="resumefile" />
              <span>Resume</span>
            </div>
            <div className="folder_barbtn-resumefile">
              <div onClick={ !isTouchDevice? (e) => {
                e.stopPropagation()
                setResumeFileExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('ResumeFile') 
              } : undefined
            }
                   onTouchEnd={(e) => {
                    e.stopPropagation()
                    setResumeFileExpand(prev => ({...prev, hide: true, focusItem: false}))
                    StyleHide('ResumeFile')
                  }}
              >
                <p className='dash-resumefile'></p>
              </div>
              <div
                onClick={ !isTouchDevice ? () => handleExpandStateToggle() : undefined}
                onTouchEnd={handleExpandStateToggle}
              >
                <motion.div className={`expand-resumefile ${ResumeFileExpand.expand ? 'full' : ''}`}>
                </motion.div>
                {ResumeFileExpand.expand ? 
                (
                <div className="expand_2-resumefile"></div>
                )
                :
                (null)}
              </div>
              <div><p className='x-resumefile'
                 onClick={!isTouchDevice ? () => {
                  setResumeFileExpand(prev => ({...prev, show: false, expand: false}));
                  const newTap = tap.filter(a => a !== 'ResumeFile')
                  setTap(newTap)
                 }: undefined
                }
                onTouchEnd={() => {
                  setResumeFileExpand(prev => ({...prev, show: false, expand: false}));
                  const newTap = tap.filter(a => a !== 'ResumeFile')
                  setTap(newTap)
              }}
              >x</p></div>
            </div>
          </div>

          <div className="btn_option_btm_container">
            <div className="btn_download_conainer"
              onClick={() => window.open('https://drive.usercontent.google.com/u/0/uc?id=1XNn23UA2L82P2__Ccuccl3WMdR2rHG57&export=download', '_blank')}
            >
              <img src={download} alt="download" />
              <p>Download</p>
            </div>
            <div className="btn_Open_conainer"
              onClick={() => window.open('https://drive.google.com/file/d/1XNn23UA2L82P2__Ccuccl3WMdR2rHG57/view?usp=drive_link', '_blank')}
            >
            <img src={ie} alt="ie" />
              <p>Open new window</p>
            </div>
          </div>
          <div className="folder_content-resumefile"
            onClick={() => setResumeFileExpand(prev => ({...prev, item_1Focus: false}))}
            style={ResumeFileExpand.expand ? 
              { height: 'calc(100svh - 110px)'} /// fullscreen btm nav
              : 
              {}
            }
          >
            <iframe src="https://drive.google.com/file/d/1XNn23UA2L82P2__Ccuccl3WMdR2rHG57/preview" 
              allowFullScreen="true"
            >
            </iframe>
          </div>
        </div>
      </Draggable>
    </>
  )
}          

export default ResumeFile
