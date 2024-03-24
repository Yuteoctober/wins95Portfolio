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
import clippy1 from '../assets/clippyani1.gif';
import clippy2 from '../assets/clippyani2.gif';
import clippy3 from '../assets/clippyani3.gif';
import clippy4 from '../assets/clippyani4.gif';
import clippy5 from '../assets/clippyani5.gif';
import clippy6 from '../assets/clippyani6.gif';
import clippy7 from '../assets/clippyani7.gif';
import clippyNo from '../assets/clippyNo.gif';

export default function Footer() {

    


    const clippyPhrase = {
        inspiration: [
            { phrase: "I’m Clippy, your personal assistant – I’m here to help!", animation: clippy1 },
            { phrase: "Sometimes I just popup for no particular reason, like now.", animation: clippy7 },
            { phrase: "You’re doing great! Keep up the good work.", animation: clippy3 },
            { phrase: "Everyone makes mistakes – it’s how we learn and grow.", animation: clippy1 },
            { phrase: "Believe in yourself – you’re capable of amazing things.", animation: clippy2 },
            { phrase: "Hard work pays off – keep pushing towards your goals!", animation: clippy3 },
            { phrase: "Success is not about being the best, but being your best self.", animation: clippy4 },
            { phrase: "Stay positive – your attitude can change everything.", animation: clippy5 },
            { phrase: "Even on the darkest days, there’s always a glimmer of hope.", animation: clippy6 },
            { phrase: "Never give up – your persistence will pay off in the end.", animation: clippy7 },
            { phrase: "The only limit is your imagination – let it soar!", animation: clippy2 },
            { phrase: "Your words have power – use them wisely and with kindness.", animation: clippy7 },
            { phrase: "Trust your instincts – they’re often wiser than you think.", animation: clippy4 },
            { phrase: "Embrace the challenges, they’ll make you stronger in the end.", animation: clippy6 },
            { phrase: "Sometimes, a simple ‘thank you’ can make a big difference.", animation: clippy5 },
            { phrase: "Success is not about the destination, it’s about the journey.", animation: clippy1 }
        ],
        interruption: [{ phrase: "Please, do not interrupt me!", animation: clippyNo }]
    };

    const clippySuggest = 
    [
        'Click => Send when you finished writing the email.',
        'Thank you for your interest.',
        "Let's play my favorite song",

    ]
    


    const wheelTapContainer = useRef(null)
    const startRef = useRef(null);

    const { 
        startActive, setStartActive,
        time, setTime,
        tap,
        imageMapping,
        MybioExpand,
        ResumeExpand,
        ProjectExpand,
        NftExpand,
        NoteExpand,
        TypeExpand, 
        MailExpand, 
        ResumeFileExpand,
        handleShow,
        StyleHide,
        WinampExpand, setWinampExpand,
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
        setFocus,
     } = useContext(UseContext);
    
     const handleWheelScroll = (e) => { // wheel from x to Y on tap
        const container = wheelTapContainer.current;
        container.scrollLeft += e.deltaY;
      };
    
    useEffect(() => {
        getCurrentLocalTime12Hour();
        const intervalId = setInterval(getCurrentLocalTime12Hour, 1000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
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

    

    function handleHideFolder(index) {

        const lowerCaseName = tap[index].toLowerCase().split(' ').join('');
      
        const allSetItems =  ObjectState() // all the usestate name to toggle
        
      
        allSetItems.forEach((item) => {
      
          const itemName = item.name.toLowerCase().trim();
          
          if(itemName === lowerCaseName && !item.usestate.focusItem && !item.usestate.hide) {
            item.setter(prev => ({...prev, focusItem: true}));
          }
            if(itemName === lowerCaseName && item.usestate.focusItem && !item.usestate.hide) {
                item.setter(prev => ({...prev, hide: true, focusItem: false}))
                if(lowerCaseName === 'winamp') {
                    const webampElement = document.querySelector('#webamp');
                    if (webampElement) {
                        webampElement.style.opacity = 0;
                        webampElement.style.pointerEvent = 'none'
                        webampElement.style.touchAction = 'none'
                        webampElement.style.zIndex = -1
                        setWinampExpand(prev => ({...prev, hide: true, focusItem: false}));
                        setFocus(false)
                    }
                }
            }
            if(itemName === lowerCaseName && item.usestate.hide) {
                item.setter(prev => ({...prev, hide: false, focusItem: true}));  
                if(lowerCaseName === 'winamp') {
                    const webampElement = document.querySelector('#webamp');
                    if (webampElement) {
                        webampElement.style.opacity = 1;
                        webampElement.style.pointerEvents = 'auto';
                        webampElement.style.touchAction = 'auto'
                        setWinampExpand(prev => ({...prev, hide: false, focusItem: true}));
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

    useEffect(() => {
        clearTimeout(SecondRandomTimeoutShowClippy.current)
        const randomTime = Math.floor(Math.random() * (50000 - 30000 + 1)) + 30000;

        clearTimeout(ClearTOclippySendemailfunction.current)
        clearTimeout(ClearTOclippyThanksYouFunction.curremt)
        clearTimeout(ClearTOSongfunction.current)
        
        RandomTimeoutShowClippy.current = setTimeout(() => {
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


    function dontTouch() {
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
        
        return clippyPhrase.inspiration[clippyIndex].phrase
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
                        style={StyleHide(index, tap, MybioExpand, ResumeExpand, 
                            ProjectExpand, MailExpand, NftExpand, NoteExpand, 
                            TypeExpand, WinampExpand, ResumeFileExpand)}
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
                    <div className="facebook">
                        <img src={facebook} alt="facebook" style={{ borderRadius: '5px' }} />
                        <span>Facebook</span>
                    </div>
                    <div className="ig">
                        <img src={ig} alt="ig" />
                        <span>Instagram</span>
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
