import { useEffect, useRef, useContext, useState } from 'react';
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
    



    const wheelTapContainer = useRef(null)
    const startRef = useRef(null);

    const { 
        startActive, setStartActive,
        time, setTime,
        tap,
        imageMapping,
        MybioExpand, setMybioExpand,
        ResumeExpand, setResumeExpand,
        ProjectExpand, setProjectExpand,
        NftExpand, setNftExpand,
        NoteExpand, setNoteExpand,
        TypeExpand, setTypeExpand,
        MailExpand, setMailExpand,
        handleShow,
        StyleHide,
        WinampExpand, setWinampExpand,
        showClippy, setShowClippy,
        clippyIndex, setClippyIndex,
        randomClippyPopup, setRandomClippyPopup,
        clippyTouched, setClippyTouched,
        clippyThanks, setClippyThanks,
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
        switch(tap[index]) {
            case 'MyBio':
                if(MybioExpand.hide) {
                    setMybioExpand(prev => ({...prev, hide: false}));
                }
                setMybioExpand(prev => ({...prev, focusItem: true}));
                setResumeExpand(prev => ({...prev, focusItem: false}));
                setProjectExpand(prev => ({...prev, focusItem: false}));
                setMailExpand(prev => ({...prev, focusItem: false}));
                setNftExpand(prev => ({...prev, focusItem: false}));
                setNoteExpand(prev => ({...prev, focusItem: false}));
                setTypeExpand(prev => ({...prev, focusItem: false}));
                setWinampExpand(prev => ({...prev, focusItem: false}));
                break;
                
            case 'Resume':
                if(ResumeExpand.hide) {
                    setResumeExpand(prev => ({...prev, hide: false}));
                }
                setResumeExpand(prev => ({...prev, focusItem: true}));
                setMybioExpand(prev => ({...prev, focusItem: false}));
                setProjectExpand(prev => ({...prev, focusItem: false}));
                setMailExpand(prev => ({...prev, focusItem: false}));
                setNftExpand(prev => ({...prev, focusItem: false}));
                setNoteExpand(prev => ({...prev, focusItem: false}));
                setTypeExpand(prev => ({...prev, focusItem: false}));
                setWinampExpand(prev => ({...prev, focusItem: false}));
                break;
    
            case 'Project':
                if(ProjectExpand.hide) {
                    setProjectExpand(prev => ({...prev, hide: false}));
                }
                setProjectExpand(prev => ({...prev, focusItem: true}));
                setMybioExpand(prev => ({...prev, focusItem: false}));
                setResumeExpand(prev => ({...prev, focusItem: false}));
                setMailExpand(prev => ({...prev, focusItem: false}));
                setNftExpand(prev => ({...prev, focusItem: false}));
                setNoteExpand(prev => ({...prev, focusItem: false}));
                setTypeExpand(prev => ({...prev, focusItem: false}));
                setWinampExpand(prev => ({...prev, focusItem: false}));
                break;
    
            case 'Mail':
                if(MailExpand.hide) {
                    setMailExpand(prev => ({...prev, hide: false}));
                }
                setMailExpand(prev => ({...prev, focusItem: true}));
                setMybioExpand(prev => ({...prev, focusItem: false}));
                setResumeExpand(prev => ({...prev, focusItem: false}));
                setProjectExpand(prev => ({...prev, focusItem: false}));
                setNftExpand(prev => ({...prev, focusItem: false}));
                setNoteExpand(prev => ({...prev, focusItem: false}));
                setTypeExpand(prev => ({...prev, focusItem: false}));
                setWinampExpand(prev => ({...prev, focusItem: false}));
                break;

            case 'Nft':
                if(NftExpand.hide) {
                    setNftExpand(prev => ({...prev, hide: false}));
                }
                setNftExpand(prev => ({...prev, focusItem: true}));
                setMybioExpand(prev => ({...prev, focusItem: false}));
                setResumeExpand(prev => ({...prev, focusItem: false}));
                setProjectExpand(prev => ({...prev, focusItem: false}));
                setMailExpand(prev => ({...prev, focusItem: false}));
                setNoteExpand(prev => ({...prev, focusItem: false}));
                setTypeExpand(prev => ({...prev, focusItem: false}));
                setWinampExpand(prev => ({...prev, focusItem: false}));
                break;

            case 'Note':
                if(NoteExpand.hide) {
                    setNoteExpand(prev => ({...prev, hide: false}));
                }
                setNoteExpand(prev => ({...prev, focusItem: true}));
                setMybioExpand(prev => ({...prev, focusItem: false}));
                setResumeExpand(prev => ({...prev, focusItem: false}));
                setProjectExpand(prev => ({...prev, focusItem: false}));
                setMailExpand(prev => ({...prev, focusItem: false}));
                setNftExpand(prev => ({...prev, focusItem: false}));
                setTypeExpand(prev => ({...prev, focusItem: false}));
                setWinampExpand(prev => ({...prev, focusItem: false}));
                break;

            case 'Type':
                if(TypeExpand.hide) {
                    setTypeExpand(prev => ({...prev, hide: false}));
                }
                setTypeExpand(prev => ({...prev, focusItem: true}));
                setMybioExpand(prev => ({...prev, focusItem: false}));
                setResumeExpand(prev => ({...prev, focusItem: false}));
                setProjectExpand(prev => ({...prev, focusItem: false}));
                setMailExpand(prev => ({...prev, focusItem: false}));
                setNoteExpand(prev => ({...prev, focusItem: false}));
                setNftExpand(prev => ({...prev, focusItem: false}));
                setWinampExpand(prev => ({...prev, focusItem: false}));
                break;

            case 'Winamp':
                if (WinampExpand.hide) {
                    const webampElement = document.querySelector('#webamp');
                    if (webampElement) {
                        webampElement.style.opacity = 1;
                        webampElement.style.pointerEvents = 'auto';
                        webampElement.style.touchAction = 'auto'
                        setWinampExpand(prev => ({...prev, hide: false}));
                    }
                } 
                setWinampExpand(prev => ({...prev, focusItem: true}));
                setMybioExpand(prev => ({...prev, focusItem: false}));
                setResumeExpand(prev => ({...prev, focusItem: false}));
                setProjectExpand(prev => ({...prev, focusItem: false}));
                setMailExpand(prev => ({...prev, focusItem: false}));
                setNoteExpand(prev => ({...prev, focusItem: false}));
                setNftExpand(prev => ({...prev, focusItem: false}));
                setTypeExpand(prev => ({...prev, focusItem: false}));
                break;


        }
    }
    

    useEffect(() => { // display clippy when windows start
        setShowClippy(true)
        setTimeout(() => {
            setShowClippy(false) 
        }, 10000);
    },[])

    useEffect(() => {
        const randomTime = Math.floor(Math.random() * (50000 - 30000 + 1)) + 30000;

        const showAndHideTimeout = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * clippyPhrase.inspiration.length);
                setClippyIndex(randomIndex);
            setShowClippy(true);
            setTimeout(() => {
                setShowClippy(false);
                setRandomClippyPopup(prev => !prev);
            }, 10000); 
        }, randomTime); 
    
        return () => {
            clearTimeout(showAndHideTimeout);
        };
    }, [randomClippyPopup]);


    function dontTouch() {
        setClippyTouched(true)
        setTimeout(() => {
            setClippyTouched(false)   
        }, 3500);

    }


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
                        style={StyleHide(index)}>
                        {
                        imageMapping[item] && 
                        <img src={imageMapping[item]} alt={item} />
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
                <div className="start_popup">
                    <div className="sidebar_popup">
                        <img src={sidebar} alt="sidebar" />
                    </div>
                    <div className="linked">
                        <img src={linked} alt="linked" style={{ borderRadius: '5px' }} />
                        <span>Linked</span>
                    </div>
                    <div className="ghithub">
                        <img src={github} alt="github" style={{ borderRadius: '5px' }} />
                        <span>Github</span>
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
                <p>
                {
                    clippyTouched ? clippyPhrase.interruption[0].phrase : 
                    (clippyThanks ? 'Thank you for your interest.' : clippyPhrase.inspiration[clippyIndex].phrase)
                }       
                </p>
                </motion.div>
            </motion.div>
            )}
            </AnimatePresence>
        </div>  
    );
}
