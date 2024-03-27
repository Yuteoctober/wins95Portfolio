import UseContext from '../Context'
import { useContext, useState } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import MyBio from '../assets/pc.png'
import bioPC from '../assets/bio_pc.png'
import tech from '../assets/tech.png'
import hobby from '../assets/hobby.png'
import '../css/MyBioFolder.css'


function MyBioFolder() {

  const [generalTap, setGenerapTap] = useState(true)
  const [technologyTap, setTechnologyTap] = useState(false)
  const [hobbTap, setHobbTap] = useState(false)

  const { 
    MybioExpand, setMybioExpand,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,
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
            text2: "Working in this field requires a lot of attention to detail, as well as communication skills. Work and compassion go along the way.",
         
        },
        {
            head: 'Technology',
            text1: technologyText,
         
      },
        {
            head: 'Hobby',
            text1: "In my free time, I enjoy playing video games with friends. If I'm not in front of a computer, I will try to drag myself to the gym, try new restaurants, and embark on adventures like hiking. I used to play basketball in high school and want to find time for that again.",
           
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
        }));
      }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
        setMybioExpand(prevState => ({
          ...prevState,
          expand: !prevState.expand,
        }));
    }
    setLastTapTime(now);
}

  function handleBiotap(name) {
    setGenerapTap(name === 'general');
    setTechnologyTap(name === 'technology');
    setHobbTap(name === 'hobby');
  }

  const activeBtnStyle = {
    bottom: '2px',
    outline: '1px dotted black',
    outlineOffset: '-5px',
    borderBottomColor: '#c5c4c4',
    zIndex: '3'
  };

  function textShow(head, text1, text2) {
    if (head) {
      return generalTap ? bioText.General[0].head :
        (technologyTap ? bioText.General[1].head : bioText.General[2].head);
    }
  
    if (text1) {
      return generalTap ? bioText.General[0].text1 :
        (technologyTap ? bioText.General[1].text1 : bioText.General[2].text1);
    }
  
    if (text2) {
      return generalTap ? bioText.General[0].text2 :
        (technologyTap ? bioText.General[1].text2 : bioText.General[2].text2);
    }
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

                <div>
                <p className='x'
                  onClick={!isTouchDevice ? () => deleteTap('My Bio')
                  : undefined}
                  onTouchEnd={() => deleteTap('My Bio')}
                >x
                </p>
              </div>
            </div>
          </div>
          <div className="file_tap_container-bio">
          <p  onClick={() => handleBiotap('general')}
              style={generalTap ? activeBtnStyle : {}}
          >General
          </p>
          <p onClick={() => handleBiotap('technology')}
              style={technologyTap ? activeBtnStyle : {}}
          >Technology
          </p>
          <p onClick={() => handleBiotap('hobby')}
                  style={hobbTap ? activeBtnStyle : {}}
          >Hobby
          </p>
          </div>
          <div className="folder_content">
            <div className="folder_content-bio">
              
            <h1 className='bio_h1'>{textShow(true)}</h1>
            <img
              alt="bioPC"
              className="bio_img"
              src={generalTap? bioPC : (technologyTap ? tech : hobby)}
            />
            <p className='bio_text_1'>{textShow(false, true)}</p>
            <p className='bio_text_2'>{textShow(false, false, true)}</p>
           
              {generalTap && (
                <div className='cv_container'>
                  <a className='bio_cv' href="https://drive.google.com/file/d/1XNn23UA2L82P2__Ccuccl3WMdR2rHG57/view" target="_blank" rel="noreferrer" >
                Click to view my CV.
              </a>
              <a className='bio_download' href="https://drive.usercontent.google.com/u/0/uc?id=1XNn23UA2L82P2__Ccuccl3WMdR2rHG57&export=download" target="_blank" rel="noreferrer" >
                Download
              </a>
                </div>
              )}
              
            </div>
            <div className="bio_btn_container">
              <div className="bio_btn_ok"
              onClick={!isTouchDevice ? () => deleteTap('My Bio') : undefined}
              onTouchEnd={() => deleteTap('My Bio')}
              >
                <span>
                  OK
                </span>
              </div>
              <div className="bio_btn_cancel"
              onClick={!isTouchDevice ? () => deleteTap('My Bio') : undefined}
              onTouchEnd={() => deleteTap('My Bio')}
              ><span>Cancel</span></div>
            </div>
          </div>
        </motion.div>
      </Draggable>
    </>
  )
}          

export default MyBioFolder
