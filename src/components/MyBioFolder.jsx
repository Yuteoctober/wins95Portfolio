import UseContext from '../Context'
import { useContext, useState, useEffect, useRef } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import MyBio from '../assets/pc.png'
import '../css/MyBioFolder.css'


function MyBioFolder() {
  
  

  const { 
    MybioExpand, setMybioExpand,
    setResumeExpand,
    setProjectExpand,
    setMailExpand,
    setNftExpand,
    setNoteExpand,
    setTypeExpand,
    setWinampExpand,
    setResumeFileExpand,
    tap, setTap,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    setIconState,
    
    

   } = useContext(UseContext);

      function handleDragStop(event, data) {
        const positionX = data.x 
        const positionY = data.y
        setMybioExpand(prev => ({
          ...prev,
          x: positionX,
          y: positionY
        }))

      }

      function handleExpandStateToggle() {
        setMybioExpand(prevState => ({
          ...prevState,
          expand: !prevState.expand,
          // focusItem: prevState.expand === false ? true : false
        }));
      }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
        setMybioExpand(prevState => ({
          ...prevState,
          expand: !prevState.expand,
          // focusItem: prevState.expand === false ? true : false
        }));
    }
    setLastTapTime(now);
}

    function handleSetFocusItemTrue() {
      setIconState(prevIcons => prevIcons.map(icon => ({
        ...icon,
        focus: false
      })));
      setMybioExpand(prev => ({...prev, focusItem: true}))
      setResumeExpand(prev => ({...prev, focusItem: false}))
      setProjectExpand(prev => ({...prev, focusItem: false}))
      setMailExpand(prev => ({...prev, focusItem: false}))
      setNoteExpand(prev => ({...prev, focusItem: false}))
      setNftExpand(prev => ({...prev, focusItem: false}))
      setTypeExpand(prev => ({...prev, focusItem: false}))
      setWinampExpand(prev => ({...prev, focusItem: false, focus: false}))
      setResumeFileExpand(prev => ({...prev, focusItem: false}))
    }


  return (
    <>
      <Draggable
        axis="both" 
        handle={'.folder_dragbar'}
        grid={[1, 1]}
        scale={1}
        disabled={MybioExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 35 : 70,
          y: window.innerWidth <= 500 ? 35 : 40,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={handleSetFocusItemTrue}
      >
        <motion.div className='bio_folder' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue();
            }}
            style={ MybioExpand.expand ? 
            {
                display: MybioExpand.show ? 'block' : '',
                maxWidth: 'none',
                width: '100%',
                height: 'calc(100% - 37px)',
                left: `${MybioExpand.x <= 0 ? Math.abs(MybioExpand.x)*2 + MybioExpand.x : -MybioExpand.x}px`,
                top: `${MybioExpand.y <= 0 ? Math.abs(MybioExpand.y)*2 + MybioExpand.y : -MybioExpand.y}px`,
                opacity: MybioExpand.hide ? '0' : '1',
                zIndex: MybioExpand.hide ? '-1' : (MybioExpand.focusItem ? '999' : '3'),
                pointerEvents: MybioExpand.hide ? 'none' : 'auto',
                resize: MybioExpand.show ? 'none' : '',
            } : { 
                display: MybioExpand.show ? 'block' : '',
                // width: window.innerWidth <= 500? '85%' : '50%',
                opacity: MybioExpand.hide ? '0' : '1',
                zIndex: MybioExpand.hide ? '-1' : (MybioExpand.focusItem ? '999' : '3'),
                pointerEvents: MybioExpand.expand ? 'none' : 'auto'
            }
        }>
          <div className="folder_dragbar"
              onDoubleClick={(e) => {handleExpandStateToggle(); e.stopPropagation()}}
              onTouchStart={(e) => {handleExpandStateToggleMobile(); e.stopPropagation()}}
             style={{ background: MybioExpand.focusItem? '#14045c' : '#757579'}}
          >
            <div className="bio_barname">
              <img src={MyBio} alt="MyBio" />
              <span>MyBio</span>
            </div>
            <div className="bio_barbtn">
              <div onClick={ !isTouchDevice ? (e) => {
                e.stopPropagation()
                setMybioExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('MyBio')
              } : undefined
            }
                
                   onTouchEnd={(e) => {
                    e.stopPropagation()
                    setMybioExpand(prev => ({...prev, hide: true, focusItem: false}))
                    StyleHide('MyBio')
                  }}

              >
                <p className='dash'></p>
              </div>

              <div 
                  onClick={ !isTouchDevice ? () => handleExpandStateToggle() : undefined}
                  onTouchEnd={handleExpandStateToggle}
              >
                <motion.div className={`expand ${MybioExpand.expand ? 'full' : ''}`}
                >
                </motion.div>
                {MybioExpand.expand ? 
                (
                <div className="expand_2"></div>
                )
                :
                (null)}
              </div>

                <div>
                <p
                  className='x'
                  onClick={!isTouchDevice ? () => {
                    setMybioExpand(prev => ({...prev, show: false, expand: false}));
                    const newTap = tap.filter(a => a !== 'MyBio')
                    setTap(newTap)
                  } : undefined}
                  onTouchEnd={() => {
                    setMybioExpand(prev => ({...prev, show: false, expand: false}));
                    const newTap = tap.filter(a => a !== 'MyBio')
                    setTap(newTap)
                  }}
                >
                  x
                </p>
              </div>
            </div>
          </div>
          <div className="file_edit_container-bio">
              <p>File<span style={{left: '-23px'}}>_</span></p>
              <p>Edit<span style={{left: '-24px'}}>_</span></p>
              <p>View<span style={{left: '-32px'}}>_</span></p>
              <p>Help<span style={{left: '-30px'}}>_</span></p>
          </div>
          <div className="folder_content">
            <div className="folder_content-bio">
              <h1>About</h1>
              <br />
              <p>
                Hi! My name is Yute, I'm a Software Engineer based in New York City. Focusing on Front-end
                I'm passionate in design, building something pixel perfect! along with functionality that works perfectly.
              </p>
              <br />
              <p>
                Working in this field requires alot of attention to detail, as much as communication skill. Work and compassion go along
                the way.
              </p>
              <br />
              <p>
                The main technology that I have been using is <span>Javascript</span> and library like <span>React.js</span>.
                I have also built full-stack projects using <span>Node.js</span>, <span>mongoDB</span> and <span>mySQL</span> as back-end
                and database.
              </p>
              <br />
              <p>
                In Free time, I enjoy playing video games with freinds, if I'm not in front of computer, I will try to drag myself to the gym,
                try new resturants and adventure like hiking, I used to play basketball in highschool and wanting to find time for that again.
              </p>
              <br />
              <a href="https://drive.google.com/file/d/1XNn23UA2L82P2__Ccuccl3WMdR2rHG57/view" target="_blank" rel="noreferrer" >You can find my Resume here.</a>
              <br />
              <br />
              <a href="https://drive.usercontent.google.com/u/0/uc?id=1XNn23UA2L82P2__Ccuccl3WMdR2rHG57&export=download" target="_blank" rel="noreferrer" >Download</a>
            </div>
          </div>
        </motion.div>
      </Draggable>
    </>
  )
}          

export default MyBioFolder
