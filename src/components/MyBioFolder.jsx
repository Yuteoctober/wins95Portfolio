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
            text1: "System:",
            text2: "Windows 95 Portfolio",
            text3: "4.00.490",
            text4: "Register to:",
            text5: "Yute S. Lilitprapun",
            text6: "Microsoft",
            text7: "37495-XXX-XXX-28329",
            text8: "Computer:",
            text9: "80486",
            text10: "16.0MB RAM",
         
        },
        {
            text1: technologyText,
         
      },
        {
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

  function textShow(index) {
  const selectedText = bioText.General[generalTap ? 0 : technologyTap ? 1 : 2];
  return selectedText[`text${index}`];
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
            <div className="folder_content-bio"
              style={{ display: generalTap ? 'grid' : 'block' }}
            >
              
            {/* <h1 className='bio_h1'>{textShow(true)}</h1> */}
            <img
              alt="bioPC"
              className={generalTap ? 'bio_img' : 'bio_img_other'}
              src={generalTap? bioPC : (technologyTap ? tech : hobby)}
            />
            <div
              className="biotext_container">

              <p className={generalTap? 'bio_text_1' : 'bio_text_1_other'}>
                {textShow(1)}
              </p> 
              <p className='bio_text_2'>{textShow(2)}</p>   
              <p className='bio_text_2'>{textShow(3)}</p>   
              <p className='bio_text_1'>{textShow(4)}</p>  
              <p className='bio_text_2'>{textShow(5)}</p>   
              <p className='bio_text_2'>{textShow(6)}</p>   
              <p className='bio_text_2'>{textShow(7)}</p>   
              <p className='bio_text_1'>{textShow(8)}</p>   
              <p className='bio_text_2'>{textShow(9)}</p>   
              <p className='bio_text_2'>{textShow(10)}</p>   
            </div>
           
              {/* {generalTap && (
                <div className='cv_container'>
                  <a className='bio_cv' href="https://drive.google.com/file/d/1XNn23UA2L82P2__Ccuccl3WMdR2rHG57/view" target="_blank" rel="noreferrer" >
                Click to view my CV.
              </a>
              <a className='bio_download' href="https://drive.usercontent.google.com/u/0/uc?id=1XNn23UA2L82P2__Ccuccl3WMdR2rHG57&export=download" target="_blank" rel="noreferrer" >
                Download
              </a>
                </div>
              )} */}
              
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
