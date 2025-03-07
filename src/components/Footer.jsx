import { useEffect, useRef, useContext, useState } from 'react';
import UseContext from '../Context'
import { motion, AnimatePresence  } from 'framer-motion';
import startIcon from '../assets/95icon.png';
import run from '../assets/run.png';
import github from '../assets/github.png';
import linked from '../assets/linkedin.png';
import sidebar from '../assets/sidebar95.png';
import display from '../assets/display.png';
import project from '../assets/regFolder.png';
import resume from '../assets/folder.png';
import shutdownicon from '../assets/shutdownicon.png';
import settings from '../assets/setting.png';
import btc_icon from '../assets/btc_icon.webp'
import { clippyPhrase, clippySuggest } from './function/ClippyFunction';
import { BsCheck  } from "react-icons/bs";
import Calendar from 'react-calendar';
import { BsFillCaretRightFill } from "react-icons/bs";
import binEmp from '../assets/bin2.png'
import bin from '../assets/bin.png'
import news from '../assets/news.png'


export default function Footer() {
    
    const wheelTapContainer = useRef(null)
    const startRef = useRef(null);
    const iconSizeRef = useRef(null);
    const calenderRef = useRef(null);
    const startPopUpRef = useRef(null)
    const projectRef = useRef(null)
    const resumeRef = useRef(null)
    const [calValue, calOnChange] = useState(new Date());
   

    const { 
        newsPopup, setNewsPopup,
        btcShow, setBtcShow,
        isTouchDevice,
        desktopIcon,
        projectStartBar, setProjectStartBar,
        resumeStartBar, setResumejectStartBar,
        calenderToggle, setCalenderToggle,
        iconTextSize,
        iconScreenSize, setIconScreenSize,
        iconSize, setIconSize,
        chatDown,
        remountRunPosition,
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
        ClearTOclippyUsernameFunction,
        clippyUsername,
     } = useContext(UseContext);

     const footerItems = [
        {
            className: "project",
            imgSrc: project,
            imgAlt: "project",
            spanText: "Project",
            arrow: true,
            onClick: () => {
                setProjectStartBar(!projectStartBar)
                setResumejectStartBar(false)
            },
            onmouseenter: () => {
                setProjectStartBar(true)
                setResumejectStartBar(false)
            },
        },
        {
            className: "resume",
            imgSrc: resume,
            imgAlt: "resume",
            spanText: "Resume",
            arrow: true,
            onClick: () => {
                setResumejectStartBar(!resumeStartBar)
                setProjectStartBar(false)
            },
            onmouseenter: () => {
                setResumejectStartBar(true);
                setProjectStartBar(false);
            },
        },
        {
            className: "sidebar_popup",
            imgSrc: sidebar,
            imgAlt: "sidebar",
            onmouseenter: () => {
                setResumejectStartBar(false);
                setProjectStartBar(false);
            },
        },
        {
            className: "ghithub",
            imgSrc: github,
            imgAlt: "github",
            style: { borderRadius: '5px' },
            spanText: "Github",
            onClick: () => {
                handleDoubleClickEnterLink('Github', handleShow)
                setStartActive(false)
            },
            onmouseenter: () => {
                setResumejectStartBar(false);
                setProjectStartBar(false);
            },
        },
        {
            className: "linked",
            imgSrc: linked,
            imgAlt: "linked",
            style: { borderRadius: '5px' },
            spanText: "Linked",
            onmouseenter: () => {
                setResumejectStartBar(false);
                setProjectStartBar(false);
            },
        },
        {
            className: "shutdownicon",
            imgSrc: settings,
            imgAlt: "shutdownicon",
            spanText: "Settings",
            onClick: () => handleShow('Settings'),
            onmouseenter: () => {
                setResumejectStartBar(false);
                setProjectStartBar(false);
            },
        },
        {
            className: "run",
            imgSrc: run,
            imgAlt: "run",
            spanText: "Run...",
            onClick: () => {
                handleShow('Run')
                remountRunPosition()
            },
            onmouseenter: () => {
                setResumejectStartBar(false);
                setProjectStartBar(false);
            },
        },
        {
            className: "groove" 
        },
        {
            className: "shutdownicon",
            imgSrc: shutdownicon,
            imgAlt: "shutdownicon",
            spanText: "Shut down...",
            onClick: () => {
                setShutdownWindow(true)
                setStartActive(false)
            },
            onmouseenter: () => {
                setResumejectStartBar(false);
                setProjectStartBar(false);
            },
        }
    ];
    
    
    
     const handleWheelScroll = (e) => { // wheel from x to Y on tap
        const container = wheelTapContainer.current;
        container.scrollLeft += e.deltaY;
      };

      useEffect(() => {
        const handleMouseMove = (event) => {
          const startPopupContainer = startPopUpRef.current;
          const projectContainer = projectRef.current;
          const resumeContainer = resumeRef.current;
      
          if (startPopupContainer) {
            const startRect = startPopupContainer.getBoundingClientRect();
      
            let projectRect = null;
            let resumeRect = null;
      
            if (projectContainer) {
              projectRect = projectContainer.getBoundingClientRect();
            }
            if (resumeContainer) {
              resumeRect = resumeContainer.getBoundingClientRect();
            }
      
            const isMouseOutsideStart =
              event.clientX < startRect.left ||
              event.clientX > startRect.right ||
              event.clientY < startRect.top ||
              event.clientY > startRect.bottom;
      
            const isMouseOutsideProject = projectRect
              ? event.clientX < projectRect.left ||
                event.clientX > projectRect.right ||
                event.clientY < projectRect.top ||
                event.clientY > projectRect.bottom
              : true;
      
            const isMouseOutsideResume = resumeRect
              ? event.clientX < resumeRect.left ||
                event.clientX > resumeRect.right ||
                event.clientY < resumeRect.top ||
                event.clientY > resumeRect.bottom
              : true;
      
            if (isMouseOutsideStart && isMouseOutsideProject && isMouseOutsideResume) {
              setProjectStartBar(false);
              setResumejectStartBar(false);
            }
          }
        };
      
        document.addEventListener('mousemove', handleMouseMove);
      
        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
        };
      }, []);
      
      
    
    useEffect(() => { // set local time
        getCurrentLocalTime12Hour();
        const intervalId = setInterval(getCurrentLocalTime12Hour, 1000); // update every 1 second
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if(!startActive){
            setProjectStartBar(false)
            setResumejectStartBar(false)
        }
    },[startActive])

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click is outside the start button
            if (startRef.current && !startRef.current.contains(event.target)) {
                setStartActive(false);
            }
            
            // Check if the click is outside the icon size element
            if (iconSizeRef.current && !iconSizeRef.current.contains(event.target)) {
                setIconSize(false);
            }

            if (calenderRef.current && !calenderRef.current.contains(event.target)) {
                setCalenderToggle(false);
            }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
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
        clearTimeout(ClearTOclippyUsernameFunction.current)

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
        if(clippyUsername) return !chatDown? clippySuggest[3] : clippySuggest[4]
        
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
        if (clippyUsername) {
            setClippyIndex(2); 
            return;
        }
    }, [clippySendemail, clippySong, clippyUsername]);

    const iconSizeSelection = [
        { label: '360x640', value: 1 },
        { label: '640x720', value: 2 },
        { label: '1920x1080', value: 3 },
        { label: '2560x1440', value: 4 },
        { label: '3480x2160', value: 5 }
    ];

    const projectFolderItem = desktopIcon.filter(icon => icon.folderId === 'Project').length
    const resumeFolderItem = desktopIcon.filter(icon => icon.folderId === 'Resume').length

    const recycleBin = desktopIcon.filter(icon => icon.folderId === 'RecycleBin');
    const recycleBinLength = recycleBin.length;

    return (
        <>
            <div className="footer">
                <div
                    ref={startRef}
                    className={`btn_start ${startActive ? 'active' : ''}`}
                    onClick={(e) => {
                        setStartActive(!startActive);
                        setIconSize(false)
                        setCalenderToggle(false)
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
                                setStartActive(false)
                                handleHideFolder(index);
                                e.stopPropagation()
                            }}
                            style={StyleHide(index, tap, ObjectState)}
                            >
                            {
                            <img src={
                                item === 'RecycleBin' && recycleBinLength === 0 ? binEmp 
                                : item === 'RecycleBin' && recycleBinLength > 0 ? bin 
                                : imageMapping(item)} alt={item} />
                            }
                            <p>{item}</p>
                        </div>  
                    ))}
                </div>

                <div className="time">
                    <img src={news} alt="news" 
                            style={{
                                position: 'relative',
                                width: '18px',
                                left: '3px',
                                zIndex: '2'
                            }} 
                            onClick={(e) => {
                                e.stopPropagation()
                                setNewsPopup(!newsPopup)
                            }}
                    />
                    <img src={btc_icon} alt="btc_icon" 
                        style={{
                            position: 'relative',
                            width: '18px',
                            left: '5px',
                            zIndex: '2'
                        }} 
                        onClick={() => setBtcShow(!btcShow)}
                    />
                    <img src={display} alt="display" 
                        onClick={(e) => {
                            e.stopPropagation()
                            setIconSize(!iconSize)
                            setStartActive(false)
                            setCalenderToggle(false)
                        }}
                    />
                    <div className='p_time_div'
                        style={{background: calenderToggle? '#8c8888c2':''}}>
                        <p
                            onClick={(e) => {
                                e.stopPropagation()
                                setCalenderToggle(!calenderToggle)
                                setIconSize(false)
                                setStartActive(false)
                            }}
                        >
                            {time}
                        </p>
                    </div>
                </div>
                {startActive && (
                    <div className="start_popup"
                        ref={startPopUpRef}
                        style={{display: startActive? '' : 'none'}}
                    >
                        {footerItems.map((item, index) => (
                            <motion.div 
                            key={index} 
                            className={item.className} 
                            onClick={(e) => {
                                e.stopPropagation()
                                item.onClick()
                            }}
                            onHoverStart={!isTouchDevice && item.onmouseenter}
                        >
                            {item.imgSrc && (
                                <img 
                                    src={item.imgSrc} 
                                    alt={item.imgAlt} 
                                    style={item.style || {}} 
                                />
                            )}
                            {item.spanText && <span>{item.spanText}</span>}
                            {item.arrow && (<p><BsFillCaretRightFill/></p>)}
                        </motion.div>
                        ))}
                        {projectStartBar && (
                            <motion.div className="sub_start_container"
                                ref={projectRef}
                                style={{display: projectFolderItem === 0 ? 'none' : ''}}
                            >
                            {desktopIcon.filter(icon => icon.folderId === 'Project').map(icon => (
                                <div className="icon_sub_start" key={icon.name}
                                    onClick={() => handleShow(icon.name)}
                                >
                                    <img src={imageMapping(icon.pic)} alt={icon.name}/>
                                    <p>{icon.name}</p>
                                </div>
                            ))}
                        </motion.div>
                        )}
                        {resumeStartBar && (
                            <motion.div className="sub_start_container" 
                                ref={resumeRef}
                                style={{
                                    display: resumeFolderItem === 0 ? 'none' : '',
                                    top: '2.55rem'
                                }}
                            >
                            {desktopIcon.filter(icon => icon.folderId === 'Resume').map(icon => (
                                <div className="icon_sub_start" key={icon.name}
                                    onClick={() => handleShow(icon.name)}
                                >
                                    <img src={imageMapping(icon.pic)} alt={icon.name}/>
                                    <p>{icon.name}</p>
                                </div>
                            ))}
                        </motion.div>
                        )}
                        
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
            {iconSize && (
              <div className="icon_size_container"
                ref={iconSizeRef}
            >
            {iconSizeSelection.map(item => (
                <div key={item.value}
                    onClick={() => {
                        const newVal = item.value
                        setIconScreenSize(newVal)
                        setIconSize(false)
                        localStorage.setItem('iconSize', newVal)
                    }}
                >
                {item.value === iconTextSize(iconScreenSize).number && (
                 <BsCheck  
                    style={{
                        position: 'absolute',
                        fontSize: '15px',
                    }}
                 />   
                ) }
                
                    <p>
                        {item.label}
                    </p>
                </div>
            ))}
            </div>  
            )}
            {calenderToggle && (
                <div className="calender_container" 
                    ref={calenderRef}
                >
                    <Calendar onChange={calOnChange} value={calValue} 
                        
                    />
                </div>
            )}
            
        </>
    );
}
