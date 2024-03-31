import { useEffect, useRef, useContext } from 'react';
import UseContext from '../Context'
import { motion, AnimatePresence  } from 'framer-motion';
import startIcon from '../assets/95icon.png';
import ig from '../assets/Instagram_icon.png';
import github from '../assets/github.png';
import linked from '../assets/linkedin.png';
import sidebar from '../assets/sidebar95.png';
import facebook from '../assets/facebook.png';
import speaker from '../assets/speaker.png';
import project from '../assets/regFolder.png';
import resume from '../assets/folder.png';
import shutdownicon from '../assets/shutdownicon.png';
import { clippyPhrase, clippySuggest } from './function/ClippyFunction';
export default function Footer() {
    
    const wheelTapContainer = useRef(null)
    const startRef = useRef(null);

    const { 
        startActive, setStartActive,
        time, setTime,
        tap,
        imageMapping,
        handleShow,
        StyleHide,
        setWinampExpand,
        showClippy, setShowClippy,
        clippyIndex, setClippyIndex,
        randomClippyPopup, setRandomClippyPopup,
        clippyTouched, setClippyTouched,
        clippyThanks,
        clippySendemail, 
        firstTimoutShowclippy,
        RandomTimeoutShowClippy,
        SecondRandomTimeoutShowClippy,
        ClearTOclippySendemailfunction,
        ClearTOclippyThanksYouFunction,
        ClearTOSongfunction,
        clippySong,
        ClearTOdonttouch,
        handleDoubleClickEnterLink,
        ObjectState,
        setShutdownWindow,
     } = useContext(UseContext);
    
     const handleWheelScroll = (e) => { // wheel from x to Y on tap
        const container = wheelTapContainer.current;
        container.scrollLeft += e.deltaY;
      };
    
    useEffect(() => { // set local time
        getCurrentLocalTime12Hour();
        const intervalId = setInterval(getCurrentLocalTime12Hour, 1000); // update every 1 second
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => { // click outside start btn, hide start
        const handleClickOutside = (event) => {
            if (startRef.current && !startRef.current.contains(event.target)) {
                setStartActive(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const getCurrentLocalTime12Hour = () => {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let meridiem = hours < 12 ? 'AM' : 'PM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        hours = (hours < 10 ? '0' : '') + hours;
        minutes = (minutes < 10 ? '0' : '') + minutes;
        let currentTime12Hour = hours + ':' + minutes + ' ' + meridiem;
        setTime(currentTime12Hour);
    };

    function handleHideFolder(index) { // unhide icon from tap

        const lowerCaseName = tap[index].toLowerCase().split(' ').join('');
      
        const allSetItems =  ObjectState() // all the usestate name to toggle
        
      
        allSetItems.forEach((item) => {
      
          const itemName = item.name.toLowerCase().trim();
          
          if(itemName === lowerCaseName) {
            item.setter(prev => ({...prev, focusItem: true}));
            if(item.usestate.hide) {
                item.setter(prev => ({...prev, hide: false}));  
                if(lowerCaseName === 'winamp') {
                    const webampElement = document.querySelector('#webamp');
                    if (webampElement) {
                        webampElement.style.opacity = 1;
                        webampElement.style.pointerEvents = 'auto';
                        webampElement.style.touchAction = 'auto'
                        setWinampExpand(prev => ({...prev, hide: false}));
                    }
                }
            }
          }

          if(itemName !== lowerCaseName) {
            item.setter(prev => ({...prev, focusItem: false}));
          }
        });
      }


    useEffect(() => { // display clippy when windows start
        clearTimeout(firstTimoutShowclippy.current)
        clearTimeout(ClearTOclippySendemailfunction.current)
        clearTimeout(ClearTOclippyThanksYouFunction.curremt)
        clearTimeout(ClearTOSongfunction.current)

        setShowClippy(true)
        firstTimoutShowclippy.current = setTimeout(() => {
            setShowClippy(false) 
        }, 10000);
        
        return () => {
            clearTimeout(firstTimoutShowclippy.current);
        };
    },[])


    useEffect(() => { //random clippy time
        clearTimeout(SecondRandomTimeoutShowClippy.current)
        const randomTime = Math.floor(Math.random() * (50000 - 30000 + 1)) + 30000;

        clearTimeout(ClearTOclippySendemailfunction.current)
        clearTimeout(ClearTOclippyThanksYouFunction.curremt)
        clearTimeout(ClearTOSongfunction.current)
        
        RandomTimeoutShowClippy.current = setTimeout(() => { // random clippy index from length
        const randomIndex = Math.floor(Math.random() * clippyPhrase.inspiration.length)
                setClippyIndex(randomIndex);
                setShowClippy(true);
        SecondRandomTimeoutShowClippy.current = setTimeout(() => {
                setShowClippy(false);
                setRandomClippyPopup(prev => !prev);
            }, 10000); 
        }, randomTime); 
    
        return () => {
            clearTimeout(RandomTimeoutShowClippy.current);
            clearTimeout(SecondRandomTimeoutShowClippy.current);
        };
    }, [randomClippyPopup]);


    function dontTouch() { // click on clippy while speaking, will active angry clippy
        clearTimeout(ClearTOdonttouch.current)
        ClearTOdonttouch.current = setClippyTouched(true)
        setTimeout(() => {
            setClippyTouched(false)   
        }, 3500);

        return () => {
            clearTimeout(ClearTOdonttouch.current)
        }
    }

    function handleClipperTalk() {
        if(clippyThanks) return clippySuggest[1];
        if(clippyTouched) return clippyPhrase.interruption[0].phrase;
        if(clippySendemail) return clippySuggest[0]
        if(clippySong) return clippySuggest[2]
        
        return clippyPhrase.inspiration[clippyIndex].phrase // return default from phrase 
    }
    
    useEffect(() => { /// need useeffect to update state before it returns on handleClipperTalk()
        if (clippySendemail) {
            setClippyIndex(1);
            return;
        }
        if (clippySong) {
            setClippyIndex(7); 
            return;
        }
    }, [clippySendemail, clippySong]);


    return (
        <div className="footer">
            <div
                ref={startRef}
                className={`btn_start ${startActive ? 'active' : ''}`}
                onClick={(e) => {
                    setStartActive(!startActive);
                    e.stopPropagation(); // prevent to click on body from this element
                }}
            >
                <img src={startIcon} alt="startIcon" />
                <h4>Start</h4>
            </div>

            {/* -------- CREATE TAP ON FOOTER -------- */}
            <div className="tap_container" ref={wheelTapContainer}
                onWheel={handleWheelScroll}
            >
                {tap.map((item, index) => (
                    <div className="start_tap" key={index}
                        onClick={(e) => {
                            handleHideFolder(index);
                            e.stopPropagation()
                        }}
                        style={StyleHide(index, tap, ObjectState)}
                        >
                        {
                        <img src={imageMapping(item)} alt={item} />
                        }
                        <p>{item}</p>
                    </div>  
                ))}
            </div>

            <div className="time">
                <img src={speaker} alt="speaker" />
                <p>{time}</p>
            </div>
            {startActive && (
                <div className="start_popup"
                    style={{display: startActive? '' : 'none'}}
                >
                    <div className="sidebar_popup">
                        <img src={sidebar} alt="sidebar" />
                    </div>
                    <div className="linked">
                        <img src={linked} alt="linked" style={{ borderRadius: '5px' }} />
                        <span>Linked</span>
                    </div>
                    <div className="ghithub"
                        onClick={() => handleDoubleClickEnterLink('Github')}
                    >
                        <img src={github} alt="github" style={{ borderRadius: '5px' }} />
                        <span>Repo</span>
                    </div>
                    <div className="ig">
                        <img src={ig} alt="ig" />
                        <span>Instagram</span>
                    </div>
                    <div className="facebook">
                        <img src={facebook} alt="facebook" style={{ borderRadius: '5px' }} />
                        <span>Facebook</span>
                    </div>
                    <div className="project"
                        onClick={() => handleShow('Project')}
                    >
                        <img src={project} alt="project" />
                        <span>Project</span>
                    </div>
                    <div className="resume"
                        onClick={() => handleShow('Resume')}
                    >
                        <img src={resume} alt="resume" />
                        <span>Resume</span>
                    </div>
                    <div className="groove">
                    </div>
                    <div className="shutdownicon"
                        onClick={() => setShutdownWindow(true)}
                    >
                        <img src={shutdownicon} alt="shutdownicon" />
                        <span>Shut down...</span>
                    </div>
                </div>
            )}
            <AnimatePresence>
            {showClippy && (
                <motion.div
                    className="clippy_container"
                    onClick={dontTouch}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ rotate: '360deg', opacity: 1, scale: 1 }}
                    transition={{ ease: 'easeInOut', duration: 0.8, delay: 0.5 }}
                    exit={{ rotate: '-360deg', scale: 0, opacity: 0, transition: { ease: 'easeInOut', duration: 0.8 } }}
                >
                <img src={ clippyTouched? clippyPhrase.interruption[0].animation : clippyPhrase.inspiration[clippyIndex].animation} alt="clippy" />
                    <motion.div className="bubble_chat"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{ ease: "easeIn", duration: .8, delay: 1.5 }}
                        exit={{ opacity: 0, transition: { ease: 'easeOut', duration: 0.1 } }}
                    >
                <p>{handleClipperTalk()}</p>
                </motion.div>
            </motion.div>
            )}
            </AnimatePresence>
        </div>  
    );
}
