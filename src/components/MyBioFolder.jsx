import UseContext from '../Context'
import { useContext, useState } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import MyBio from '../assets/pc.png'
import '../css/MyBioFolder.css'


function MyBioFolder() {

  const [generalTap, setGenerapTap] = useState(true)
  const [technologyTap, setTechnologyTap] = useState(false)
  const [hobbTap, setHobbTap] = useState(false)

  const { 
    MybioExpand, setMybioExpand,
    tap, setTap,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
   } = useContext(UseContext);

   const technologyText = ( // don't have to use DangerousHTML
    <>
        The main technology that I have been using is
        <span> Javascript</span> and library like
        <span> React.js</span>.
        I have also built full-stack projects using
        <span> Node.js</span>, <span> mongoDB</span>, and
        <span> mySQL</span> as back-end and database.
    </>
  );

   const bioText = {
    General: [
        {
            head: 'General', 
            text1: "Hi! My name is Yute, I'm a Software Engineer based in New York City. Focusing on Front-end. I'm passionate about design, building something pixel perfect, along with functionality that works perfectly.",
            text2: "Working in this field requires a lot of attention to detail, as well as communication skills. Work and compassion go along the way."
        },
        {
            head: 'Technology',
            text1: technologyText
      },
        {
            head: 'Hobby',
            text1: "In my free time, I enjoy playing video games with friends. If I'm not in front of a computer, I will try to drag myself to the gym, try new restaurants, and embark on adventures like hiking. I used to play basketball in high school and want to find time for that again."
        }
    ]
};

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

  function handleBiotap(name) {
    setGenerapTap(name === 'general');
    setTechnologyTap(name === 'technology');
    setHobbTap(name === 'hobby');
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
        onStart={() => handleSetFocusItemTrue('My Bio')}
      >
        <motion.div className='bio_folder' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('My Bio');
            }}
            style={ MybioExpand.expand ? inlineStyleExpand('My Bio') : inlineStyle('My Bio')}>
          <div className="folder_dragbar"
              onDoubleClick={(e) => {handleExpandStateToggle(); e.stopPropagation()}}
              onTouchStart={(e) => {handleExpandStateToggleMobile(); e.stopPropagation()}}
             style={{ background: MybioExpand.focusItem? '#14045c' : '#757579'}}
          >
            <div className="bio_barname">
              <img src={MyBio} alt="MyBio" />
              <span>My Bio</span>
            </div>
            <div className="bio_barbtn">
              <div onClick={ !isTouchDevice ? (e) => {
                e.stopPropagation()
                setMybioExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('My Bio')
              } : undefined
            }
                   onTouchEnd={(e) => {
                    e.stopPropagation()
                    setMybioExpand(prev => ({...prev, hide: true, focusItem: false}))
                    StyleHide('My Bio')
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
                    const newTap = tap.filter(a => a !== 'My Bio')
                    setTap(newTap)
                  } : undefined}
                  onTouchEnd={() => {
                    setMybioExpand(prev => ({...prev, show: false, expand: false}));
                    const newTap = tap.filter(a => a !== 'My Bio')
                    setTap(newTap)
                  }}
                >
                  x
                </p>
              </div>
            </div>
          </div>
          <div className="file_tap_container-bio">
          <p
              onClick={() => handleBiotap('general')}
              style={generalTap ? {
                bottom: '2px',
                outline: '1px dotted black',
                outlineOffset: '-5px',
                borderBottomColor: '#c5c4c4',
                zIndex: '3'
            } : {}
              }>
              General
          </p>
          <p onClick={() => handleBiotap('technology')}
              style={technologyTap ? {
                bottom: '2px',
                outline: '1px dotted black',
                outlineOffset: '-5px',
                borderBottomColor: '#c5c4c4',
                zIndex: '3'
            } : {}
            }>
              Technology
          </p>
          <p onClick={() => handleBiotap('hobby')}
                  style={hobbTap ? {
                    bottom: '2px',
                    outline: '1px dotted black',
                    outlineOffset: '-5px',
                    borderBottomColor: '#c5c4c4',
                    zIndex: '3'
            } : {}
            }>
              Hobby
          </p>
          </div>
          <div className="folder_content">
            <div className="folder_content-bio">
              <h1>
                  {
                  generalTap ? bioText.General[0].head 
                  :
                  (technologyTap ? bioText.General[1].head 
                  : 
                  bioText.General[2].head
                  )}
              </h1>
              <br />
              <p>
                {
                generalTap ? bioText.General[0].text1 
                :
                (technologyTap ? bioText.General[1].text1 
                : 
                bioText.General[2].text1
                )}
              </p>
              <br />
              <p>
                {
                generalTap ? bioText.General[0].text2 
                :
                (technologyTap ? bioText.General[1].text2
                : 
                bioText.General[2].text2
                )}
              </p>
              <br />
              {generalTap && (
                <>
                  <a href="https://drive.google.com/file/d/1XNn23UA2L82P2__Ccuccl3WMdR2rHG57/view" target="_blank" rel="noreferrer" >
                Click to view my CV.
              </a>
              <br />
              <br />
              <a href="https://drive.usercontent.google.com/u/0/uc?id=1XNn23UA2L82P2__Ccuccl3WMdR2rHG57&export=download" target="_blank" rel="noreferrer" >
                Download
              </a>
                </>
              )}
              
            </div>
            <div className="bio_btn_container">
              <div className="bio_btn_ok"
              onClick={!isTouchDevice ? () => {
                setMybioExpand(prev => ({...prev, show: false, expand: false}));
                const newTap = tap.filter(a => a !== 'My Bio')
                setTap(newTap)
              } : undefined}
              onTouchEnd={() => {
                setMybioExpand(prev => ({...prev, show: false, expand: false}));
                const newTap = tap.filter(a => a !== 'My Bio')
                setTap(newTap)
              }}
              ><span>OK</span></div>
              <div className="bio_btn_cancel"
              onClick={!isTouchDevice ? () => {
                setMybioExpand(prev => ({...prev, show: false, expand: false}));
                const newTap = tap.filter(a => a !== 'My Bio')
                setTap(newTap)
              } : undefined}
              onTouchEnd={() => {
                setMybioExpand(prev => ({...prev, show: false, expand: false}));
                const newTap = tap.filter(a => a !== 'My Bio')
                setTap(newTap)
              }}
              ><span>Cancel</span></div>
            </div>
          </div>
        </motion.div>
      </Draggable>
    </>
  )
}          

export default MyBioFolder
