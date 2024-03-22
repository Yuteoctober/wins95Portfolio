import { useState, useEffect, useRef } from 'react'
import UserContext from './Context'
import Footer from './components/Footer';
import Dragdrop from './components/Dragdrop';
import MyBioFolder from './components/MyBioFolder';
import ResumeFolder from './components/ResumeFolder';
import ProjectFolder from './components/ProjectFolder';
import MailFolder from './components/MailFolder';
import NftFolder from './components/NftFolder';
import NoteFolder from './components/NoteFolder';
import TypeFolder from './components/TypeFolder';
import ResumeFile from './components/ResumeFile';
import iconInfo from './icon.json'
import MyBio from './assets/pc.png'
import Resume from './assets/folder.png'
import Mail from './assets/mail.png'
import Project from './assets/regFolder.png'
import Winamp from './assets/winampIcon.png'
import resumefile from './assets/resume.png'

function App() {
  const ClearTOdonttouch = useRef(null);
  const ClearTOSongfunction = useRef(null);
  const ClearTOclippySendemailfunction = useRef(null);
  const ClearTOclippyThanksYouFunction = useRef(null);
  const firstTimoutShowclippy = useRef(null);
  const RandomTimeoutShowClippy = useRef(null);
  const SecondRandomTimeoutShowClippy = useRef(null);
  const [clippySong, setClippySong] = useState(false)
  const [clippySendemail, setClippySendemail] = useState(false)
  const [clippyThanks, setClippyThanks] = useState(false)
  const [clippyTouched, setClippyTouched] = useState(false)
  const [randomClippyPopup, setRandomClippyPopup] = useState(false)
  const [clippyIndex, setClippyIndex] = useState(0)
  const [showClippy, setShowClippy] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [startActive, setStartActive] = useState(false);
  const [time, setTime] = useState('');
  const [tap, setTap] = useState([])
  const [lastTapTime, setLastTapTime] = useState(0)
  const [MybioExpand, setMybioExpand] = useState(
  {
    expand: false, // fullscreen
    show: false, // show folder when double clicked
    hide: false, // hide folder to the tap
    focusItem: true, // devide if item is being clicked on or not
    x: 0, y: 0, // position before fullscreen
  });
  const [ResumeExpand, setResumeExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0, item_1Focus: false});

  const [ProjectExpand, setProjectExpand] = useState(
  {
    expand: false, show: false, hide: false, focusItem: true, 
    x: 0, y: 0, item_1Focus: false, item_2Focus: false, 
    item_3Focus: false, 
  });
  
  const [MailExpand, setMailExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0,});

  const [NftExpand, setNftExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0,});

  const [NoteExpand, setNoteExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0,});

  const [TypeExpand, setTypeExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0,});

  const [WinampExpand, setWinampExpand] = useState(
  {focus: false, show: false, hide: false, focusItem: true, x: 0, y: 0,});
  
  const [ResumeFileExpand, setResumeFileExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0,});
  
  const [iconState, setIconState] = useState(() =>
  iconInfo.map(icon => ({
    ...icon,
    focus: false, // blue bg on icon
  }))
);

function handleShow(name) {
      
  switch (name) {
      case 'MyBio': 
          setMybioExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
          setResumeExpand(prev => ({...prev, focusItem: false}));
          setProjectExpand(prev => ({...prev, focusItem: false}));
          setMailExpand(prev => ({...prev, focusItem: false}));
          setNftExpand(prev => ({...prev, focusItem: false}));
          setNoteExpand(prev => ({...prev, focusItem: false}));
          setTypeExpand(prev => ({...prev, focusItem: false}));
          setWinampExpand(prev => ({...prev, focusItem: false}));
          setResumeFileExpand(prev => ({...prev, focusItem: false}));
          if (tap.includes('MyBio')) {
            setMybioExpand(prev => ({...prev, hide: false}))
            return;
          }
          setTap(prevTap => [...prevTap, 'MyBio']); // put bio in []
          setIconState(prevIcons => prevIcons.map(icon => ({ // unhighlight icon
              ...icon,
              focus: false
          })));
          break;

      case 'Resume': 
          setResumeExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
          setMybioExpand(prev => ({...prev, focusItem: false}));
          setProjectExpand(prev => ({...prev, focusItem: false}));
          setMailExpand(prev => ({...prev, focusItem: false}));
          setNftExpand(prev => ({...prev, focusItem: false}));
          setNoteExpand(prev => ({...prev, focusItem: false}));
          setTypeExpand(prev => ({...prev, focusItem: false}));
          setWinampExpand(prev => ({...prev, focusItem: false}));
          setResumeFileExpand(prev => ({...prev, focusItem: false}));
          if(tap.includes('Resume')) return;
          setTap(prevTap => [...prevTap, 'Resume']);
          setIconState(prevIcons => prevIcons.map(icon => ({
              ...icon,
              focus: false
          })));
          break;

      case 'Project': 
          setProjectExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
          setResumeExpand(prev => ({...prev, focusItem: false}));
          setMybioExpand(prev => ({...prev, focusItem: false}));
          setMailExpand(prev => ({...prev, focusItem: false}));
          setNftExpand(prev => ({...prev, focusItem: false}));
          setNoteExpand(prev => ({...prev, focusItem: false}));
          setTypeExpand(prev => ({...prev, focusItem: false}));
          setWinampExpand(prev => ({...prev, focusItem: false}));
          setResumeFileExpand(prev => ({...prev, focusItem: false}));
          if(tap.includes('Project')) return;
          setTap(prevTap => [...prevTap, 'Project'])
          setIconState(prevIcons => prevIcons.map(icon => ({
            ...icon,
            focus: false
        })));
        break;

      case 'Mail': 
          setMailExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
          setResumeExpand(prev => ({...prev, focusItem: false}));
          setMybioExpand(prev => ({...prev, focusItem: false}));
          setProjectExpand(prev => ({...prev, focusItem: false}));
          setNftExpand(prev => ({...prev, focusItem: false}));
          setNoteExpand(prev => ({...prev, focusItem: false}));
          setTypeExpand(prev => ({...prev, focusItem: false}));
          setWinampExpand(prev => ({...prev, focusItem: false}));
          setResumeFileExpand(prev => ({...prev, focusItem: false}));
          clippySendemailfunction()
          if(tap.includes('Mail')) return;
          setTap(prevTap => [...prevTap, 'Mail'])
          setIconState(prevIcons => prevIcons.map(icon => ({
            ...icon,
            focus: false
        })));
        break;

      case 'Nft': 
          setNftExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
          setResumeExpand(prev => ({...prev, focusItem: false}));
          setMybioExpand(prev => ({...prev, focusItem: false}));
          setProjectExpand(prev => ({...prev, focusItem: false}));
          setMailExpand(prev => ({...prev, focusItem: false}));
          setNoteExpand(prev => ({...prev, focusItem: false}));
          setTypeExpand(prev => ({...prev, focusItem: false}));
          setWinampExpand(prev => ({...prev, focusItem: false}));
          setResumeFileExpand(prev => ({...prev, focusItem: false}));
      if(tap.includes('Nft')) return;
          setTap(prevTap => [...prevTap, 'Nft'])
          setIconState(prevIcons => prevIcons.map(icon => ({
            ...icon,
            focus: false
        })));
        break;

      case 'Note': 
          setNoteExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
          setResumeExpand(prev => ({...prev, focusItem: false}));
          setMybioExpand(prev => ({...prev, focusItem: false}));
          setProjectExpand(prev => ({...prev, focusItem: false}));
          setNftExpand(prev => ({...prev, focusItem: false}));
          setMailExpand(prev => ({...prev, focusItem: false}));
          setTypeExpand(prev => ({...prev, focusItem: false}));
          setWinampExpand(prev => ({...prev, focusItem: false}));
          setResumeFileExpand(prev => ({...prev, focusItem: false}));
      if(tap.includes('Note')) return;
          setTap(prevTap => [...prevTap, 'Note'])
          setIconState(prevIcons => prevIcons.map(icon => ({
            ...icon,
            focus: false
      })));
      break;

      case 'Type': 
          setTypeExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
          setResumeExpand(prev => ({...prev, focusItem: false}));
          setMybioExpand(prev => ({...prev, focusItem: false}));
          setProjectExpand(prev => ({...prev, focusItem: false}));
          setNftExpand(prev => ({...prev, focusItem: false}));
          setNoteExpand(prev => ({...prev, focusItem: false}));
          setMailExpand(prev => ({...prev, focusItem: false}));
          setWinampExpand(prev => ({...prev, focusItem: false}));
          setResumeFileExpand(prev => ({...prev, focusItem: false}));
      if(tap.includes('Type')) return;
          setTap(prevTap => [...prevTap, 'Type'])
          setIconState(prevIcons => prevIcons.map(icon => ({
            ...icon,
            focus: false
      })));
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
    }     clippySongFunction() // call clippy function to show
          setWinampExpand(prev => ({...prev, show: true, focusItem: true, focus: false}));
          setResumeExpand(prev => ({...prev, focusItem: false}));
          setMybioExpand(prev => ({...prev, focusItem: false}));
          setProjectExpand(prev => ({...prev, focusItem: false}));
          setNftExpand(prev => ({...prev, focusItem: false}));
          setNoteExpand(prev => ({...prev, focusItem: false}));
          setMailExpand(prev => ({...prev, focusItem: false}));
          setTypeExpand(prev => ({...prev, focusItem: false}));
          setResumeFileExpand(prev => ({...prev, focusItem: false}));
      if(tap.includes('Winamp')) return;
          setTap(prevTap => [...prevTap, 'Winamp'])
          setIconState(prevIcons => prevIcons.map(icon => ({
          ...icon,
          focus: false
    })));
    break;

    case 'ResumeFile': 
        setResumeFileExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
        setResumeExpand(prev => ({...prev, focusItem: false}));
        setMybioExpand(prev => ({...prev, focusItem: false}));
        setProjectExpand(prev => ({...prev, focusItem: false}));
        setNftExpand(prev => ({...prev, focusItem: false}));
        setNoteExpand(prev => ({...prev, focusItem: false}));
        setMailExpand(prev => ({...prev, focusItem: false}));
        setWinampExpand(prev => ({...prev, focusItem: false}));
        setTypeExpand(prev => ({...prev, focusItem: false}));
    if(tap.includes('ResumeFile')) return;
        setTap(prevTap => [...prevTap, 'ResumeFile'])
        setIconState(prevIcons => prevIcons.map(icon => ({
          ...icon,
          focus: false
    })));
    break;

  }
}

function handleShowMobile(name) {
const now = Date.now()
if (now - lastTapTime < 300) {
  switch (name) {
    case 'MyBio': 
      setMybioExpand(prev => ({...prev, show: true, focusItem: true, hide: false})); 
      setResumeExpand(prev => ({...prev, focusItem: false})); 
      setProjectExpand(prev => ({...prev, focusItem: false}));
      setMailExpand(prev => ({...prev, focusItem: false}));
      setNftExpand(prev => ({...prev, focusItem: false}));
      setNoteExpand(prev => ({...prev, focusItem: false}));
      setTypeExpand(prev => ({...prev, focusItem: false}));
      setWinampExpand(prev => ({...prev, focusItem: false}));
      setResumeFileExpand(prev => ({...prev, focusItem: false}));
    if(tap.includes('MyBio')) return;
      setTap(prevTap => [...prevTap, 'MyBio'])
      setIconState(prevIcons => prevIcons.map(icon => ({
        ...icon,
        focus: false
    })));
    break;

    case 'Resume': 
      setResumeExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
      setMybioExpand(prev => ({...prev, focusItem: false}));
      setProjectExpand(prev => ({...prev, focusItem: false}));
      setMailExpand(prev => ({...prev, focusItem: false}));
      setNftExpand(prev => ({...prev, focusItem: false}));
      setNoteExpand(prev => ({...prev, focusItem: false}));
      setTypeExpand(prev => ({...prev, focusItem: false}));
      setWinampExpand(prev => ({...prev, focusItem: false}));
      setResumeFileExpand(prev => ({...prev, focusItem: false}));
    if(tap.includes('Resume')) return;
      setTap(prevTap => [...prevTap, 'Resume'])
      setIconState(prevIcons => prevIcons.map(icon => ({
        ...icon,
        focus: false
    })));
    break;

    case 'Project': 
      setProjectExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
      setResumeExpand(prev => ({...prev, focusItem: false}));
      setMybioExpand(prev => ({...prev, focusItem: false}));
      setMailExpand(prev => ({...prev, focusItem: false}));
      setNftExpand(prev => ({...prev, focusItem: false}));
      setNoteExpand(prev => ({...prev, focusItem: false}));
      setTypeExpand(prev => ({...prev, focusItem: false}));
      setWinampExpand(prev => ({...prev, focusItem: false}));
      setResumeFileExpand(prev => ({...prev, focusItem: false}));
    if(tap.includes('Project')) return;
      setTap(prevTap => [...prevTap, 'Project'])
      setIconState(prevIcons => prevIcons.map(icon => ({
        ...icon,
        focus: false
    })));
    break;

    case 'Mail': 
        setMailExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
        setResumeExpand(prev => ({...prev, focusItem: false}));
        setMybioExpand(prev => ({...prev, focusItem: false}));
        setProjectExpand(prev => ({...prev, focusItem: false}));
        setNftExpand(prev => ({...prev, focusItem: false}));
        setNoteExpand(prev => ({...prev, focusItem: false}));
        setTypeExpand(prev => ({...prev, focusItem: false}));
        setWinampExpand(prev => ({...prev, focusItem: false}));
        setResumeFileExpand(prev => ({...prev, focusItem: false}));
        clippySendemailfunction()
    if(tap.includes('Mail')) return;
        setTap(prevTap => [...prevTap, 'Mail'])
        setIconState(prevIcons => prevIcons.map(icon => ({
          ...icon,
          focus: false
    })));
    break;

    case 'Nft': 
        setNftExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
        setResumeExpand(prev => ({...prev, focusItem: false}));
        setMybioExpand(prev => ({...prev, focusItem: false}));
        setProjectExpand(prev => ({...prev, focusItem: false}));
        setMailExpand(prev => ({...prev, focusItem: false}));
        setNoteExpand(prev => ({...prev, focusItem: false}));
        setTypeExpand(prev => ({...prev, focusItem: false}));
        setWinampExpand(prev => ({...prev, focusItem: false}));
        setResumeFileExpand(prev => ({...prev, focusItem: false}));
    if(tap.includes('Nft')) return;
        setTap(prevTap => [...prevTap, 'Nft'])
        setIconState(prevIcons => prevIcons.map(icon => ({
          ...icon,
          focus: false
    })));
    break;

    case 'Note': 
        setNoteExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
        setResumeExpand(prev => ({...prev, focusItem: false}));
        setMybioExpand(prev => ({...prev, focusItem: false}));
        setProjectExpand(prev => ({...prev, focusItem: false}));
        setNftExpand(prev => ({...prev, focusItem: false}));
        setMailExpand(prev => ({...prev, focusItem: false}));
        setTypeExpand(prev => ({...prev, focusItem: false}));
        setWinampExpand(prev => ({...prev, focusItem: false}));
        setResumeFileExpand(prev => ({...prev, focusItem: false}));
    if(tap.includes('Note')) return;
        setTap(prevTap => [...prevTap, 'Note'])
        setIconState(prevIcons => prevIcons.map(icon => ({
          ...icon,
          focus: false
    })));
    break;

    case 'Type': 
        setTypeExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
        setResumeExpand(prev => ({...prev, focusItem: false}));
        setMybioExpand(prev => ({...prev, focusItem: false}));
        setProjectExpand(prev => ({...prev, focusItem: false}));
        setNftExpand(prev => ({...prev, focusItem: false}));
        setNoteExpand(prev => ({...prev, focusItem: false}));
        setMailExpand(prev => ({...prev, focusItem: false}));
        setWinampExpand(prev => ({...prev, focusItem: false}));
        setResumeFileExpand(prev => ({...prev, focusItem: false}));
    if(tap.includes('Type')) return;
        setTap(prevTap => [...prevTap, 'Type'])
        setIconState(prevIcons => prevIcons.map(icon => ({
          ...icon,
          focus: false
    })));
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
        clippySongFunction() // call clippy function to show
        setWinampExpand(prev => ({...prev, show: true, focusItem: true, focus: false}));
        setResumeExpand(prev => ({...prev, focusItem: false}));
        setMybioExpand(prev => ({...prev, focusItem: false}));
        setProjectExpand(prev => ({...prev, focusItem: false}));
        setNftExpand(prev => ({...prev, focusItem: false}));
        setNoteExpand(prev => ({...prev, focusItem: false}));
        setMailExpand(prev => ({...prev, focusItem: false}));
        setTypeExpand(prev => ({...prev, focusItem: false}));
        setResumeFileExpand(prev => ({...prev, focusItem: false}));
    if(tap.includes('Winamp')) return;
        setTap(prevTap => [...prevTap, 'Winamp'])
        setIconState(prevIcons => prevIcons.map(icon => ({
          ...icon,
          focus: false
    })));
    break;

    case 'ResumeFile': 
        setResumeFileExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
        setResumeExpand(prev => ({...prev, focusItem: false}));
        setMybioExpand(prev => ({...prev, focusItem: false}));
        setProjectExpand(prev => ({...prev, focusItem: false}));
        setNftExpand(prev => ({...prev, focusItem: false}));
        setNoteExpand(prev => ({...prev, focusItem: false}));
        setMailExpand(prev => ({...prev, focusItem: false}));
        setWinampExpand(prev => ({...prev, focusItem: false}));
        setTypeExpand(prev => ({...prev, focusItem: false}));
    if(tap.includes('ResumeFile')) return;
        setTap(prevTap => [...prevTap, 'ResumeFile'])
        setIconState(prevIcons => prevIcons.map(icon => ({
          ...icon,
          focus: false
    })));
    break;

    }
}  
setLastTapTime(now)
}

function StyleHide(index) {
  switch(tap[index]) {
      case 'MyBio':
          return MybioExpand.focusItem ?
              {
                  boxShadow: 'inset 1px 1px #000, 1px 1px #ffffffdd',
                  background: 'rgb(221, 220, 220)'
              }
              :
              {
                  boxShadow: 'inset 1px 1px #ffffffdd, 1.5px 1.5px #000',
                  background: '#b3b2b2'
              };

      case 'Resume':
          return ResumeExpand.focusItem ?
              {
                  boxShadow: 'inset 1px 1px #000, 1px 1px #ffffffdd',
                  background: 'rgb(221, 220, 220)'
              }
              :
              {
                  boxShadow: 'inset 1px 1px #ffffffdd, 1.5px 1.5px #000',
                  background: '#b3b2b2'
              };

      case 'Project':
          return ProjectExpand.focusItem ?
              {
                  boxShadow: 'inset 1px 1px #000, 1px 1px #ffffffdd',
                  background: 'rgb(221, 220, 220)'
              }
              :
              {
                  boxShadow: 'inset 1px 1px #ffffffdd, 1.5px 1.5px #000',
                  background: '#b3b2b2'
              };

      case 'Mail':
          return MailExpand.focusItem ?
              {
                  boxShadow: 'inset 1px 1px #000, 1px 1px #ffffffdd',
                  background: 'rgb(221, 220, 220)'
              }
              :
              {
                  boxShadow: 'inset 1px 1px #ffffffdd, 1.5px 1.5px #000',
                  background: '#b3b2b2'
              };

      case 'Nft':
          return NftExpand.focusItem ?
              {
                  boxShadow: 'inset 1px 1px #000, 1px 1px #ffffffdd',
                  background: 'rgb(221, 220, 220)'
              }
              :
              {
                  boxShadow: 'inset 1px 1px #ffffffdd, 1.5px 1.5px #000',
                  background: '#b3b2b2'
              };

      case 'Note':
          return NoteExpand.focusItem ?
              {
                  boxShadow: 'inset 1px 1px #000, 1px 1px #ffffffdd',
                  background: 'rgb(221, 220, 220)'
              }
              :
              {
                  boxShadow: 'inset 1px 1px #ffffffdd, 1.5px 1.5px #000',
                  background: '#b3b2b2'
              };

      case 'Type':
          return TypeExpand.focusItem ?
              {
                  boxShadow: 'inset 1px 1px #000, 1px 1px #ffffffdd',
                  background: 'rgb(221, 220, 220)'
              }
              :
              {
                  boxShadow: 'inset 1px 1px #ffffffdd, 1.5px 1.5px #000',
                  background: '#b3b2b2'
              };
              
      case 'Winamp':
          return WinampExpand.focusItem ?
              {
                  boxShadow: 'inset 1px 1px #000, 1px 1px #ffffffdd',
                  background: 'rgb(221, 220, 220)'
              }
              :
              {
                  boxShadow: 'inset 1px 1px #ffffffdd, 1.5px 1.5px #000',
                  background: '#b3b2b2'
              };

              case 'ResumeFile':
          return ResumeFileExpand.focusItem ?
              {
                  boxShadow: 'inset 1px 1px #000, 1px 1px #ffffffdd',
                  background: 'rgb(221, 220, 220)'
              }
              :
              {
                  boxShadow: 'inset 1px 1px #ffffffdd, 1.5px 1.5px #000',
                  background: '#b3b2b2'
              };
              
  }
}


function handleDoubleTapEnterMobile(name) {
  const now = Date.now();
  if (now - lastTapTime < 300) {
    switch(name) {
      case 'Nft': window.open('https://opennft.netlify.app/', '_blank'); break;
      case 'Note': window.open('https://fullstack-stickynotes.netlify.app/', '_blank'); break;
      case 'Type': window.open('https://yuteoctober.github.io/typingGame/', '_blank'); break;
      default: break; 
    }
  }
  setLastTapTime(now);
}

    useEffect(() => { // open Bio Folder when app starts
      handleShow('MyBio')
    },[])

    useEffect(() => { // touch support device === true
      const onTouchStartSupported = 'ontouchstart' in document.documentElement;
      setIsTouchDevice(onTouchStartSupported);
    }, []);

    useEffect(() => { // hitting windows button activates start menu
      const handleKeyPress = (event) => {
          if (event.keyCode === 91 || event.keyCode === 92 || event.keyCode === 93) {
              setStartActive(prev => !prev)
          }
      };
      document.addEventListener('keydown', handleKeyPress);
      return () => {
          document.removeEventListener('keydown', handleKeyPress);
      };
  }, []);


  function handleClippyFunction(setterFunction, clearFunction, allSetters) {
    // Clear all existing timeouts
    allSetters.forEach((setter, index) => {
      if (setter !== setterFunction) {
        setter(false);
        clearTimeout(allClears[index].current);
      }
    });
    setterFunction(true);
    setShowClippy(true);
    
    clearTimeout(clearFunction.current);
    if (RandomTimeoutShowClippy.current) clearTimeout(RandomTimeoutShowClippy.current);
    if (firstTimoutShowclippy.current) clearTimeout(firstTimoutShowclippy.current);
    if (SecondRandomTimeoutShowClippy.current) clearTimeout(SecondRandomTimeoutShowClippy.current);
    
    clearFunction.current = setTimeout(() => {
      setterFunction(false);
      setShowClippy(false);
      setRandomClippyPopup(prev => !prev);
    }, 8000);
  }
  
  // Define all state setter functions and corresponding clear functions in an array
  const allSetters = [setClippyThanks, setClippySendemail, setClippySong];
  const allClears = [ClearTOclippyThanksYouFunction, ClearTOclippySendemailfunction, ClearTOSongfunction];
  
  function clippyThanksYouFunction() {
    handleClippyFunction(setClippyThanks, ClearTOclippyThanksYouFunction, allSetters);
  }
  
  function clippySendemailfunction() {
    handleClippyFunction(setClippySendemail, ClearTOclippySendemailfunction, allSetters);
  }
  
  function clippySongFunction() {
    handleClippyFunction(setClippySong, ClearTOSongfunction, allSetters);
  }
  
  
  

  // function clippyThanksYouFunction() {
  //   clearTimeout(ClearTOclippyThanksYouFunction.current)
  //   if (RandomTimeoutShowClippy) clearTimeout(RandomTimeoutShowClippy.current);
  //   if (firstTimoutShowclippy) clearTimeout(firstTimoutShowclippy.current);
  //   if (SecondRandomTimeoutShowClippy) clearTimeout(SecondRandomTimeoutShowClippy.current);
  //   setClippyThanks(true);
  //   setShowClippy(true);
  //   ClearTOclippyThanksYouFunction.current = setTimeout(() => {
  //     setClippyThanks(false);
  //     setShowClippy(false);
  //     setRandomClippyPopup(prev => !prev)
  //   }, 8000);

  // }

  // function clippySendemailfunction() {
  //   clearTimeout(ClearTOclippySendemailfunction.current)
  //   if (RandomTimeoutShowClippy) clearTimeout(RandomTimeoutShowClippy.current);
  //   if (firstTimoutShowclippy) clearTimeout(firstTimoutShowclippy.current);
  //   if (SecondRandomTimeoutShowClippy) clearTimeout(SecondRandomTimeoutShowClippy.current);
  //   setClippySendemail(true);
  //   console.log('hello')
  //   setShowClippy(true);
  //   ClearTOclippySendemailfunction.current = setTimeout(() => {
  //     setClippySendemail(false);
  //     setShowClippy(false);
  //     setRandomClippyPopup(prev => !prev)

  //   }, 8000);
  // }

  // function clippySongFunction() {
  //   clearTimeout(ClearTOSongfunction.current)
  //   if (RandomTimeoutShowClippy) clearTimeout(RandomTimeoutShowClippy.current);
  //   if (firstTimoutShowclippy) clearTimeout(firstTimoutShowclippy.current);
  //   if (SecondRandomTimeoutShowClippy) clearTimeout(SecondRandomTimeoutShowClippy.current);
  //   setClippySong(true);
  //   console.log('hello')
  //   setShowClippy(true);
  //   ClearTOSongfunction.current = setTimeout(() => {
  //     setClippySong(false);
  //     setShowClippy(false);
  //     setRandomClippyPopup(prev => !prev)

  //   }, 8000);
  // }



const imageMapping = { // map json with import images
  MyBio: MyBio,
  Resume: Resume,
  Mail: Mail,
  Project: Project,
  Nft: Project,
  Note: Project,
  Type: Project,
  Winamp: Winamp,
  ResumeFile: resumefile,
};

  const contextValue = {
    startActive, setStartActive,
    time, setTime,
    iconState, setIconState,
    MybioExpand, setMybioExpand,
    tap, setTap,
    imageMapping,
    lastTapTime, setLastTapTime,
    ResumeExpand, setResumeExpand,
    handleShow, handleShowMobile,
    StyleHide,
    isTouchDevice, setIsTouchDevice,
    ProjectExpand, setProjectExpand,
    MailExpand, setMailExpand,
    NftExpand, setNftExpand,
    NoteExpand, setNoteExpand,
    TypeExpand, setTypeExpand,
    handleDoubleTapEnterMobile,
    WinampExpand, setWinampExpand,
    showClippy, setShowClippy,
    clippyIndex, setClippyIndex,
    randomClippyPopup, setRandomClippyPopup,
    clippyTouched, setClippyTouched,
    clippyThanks, setClippyThanks,
    clippySendemail, setClippySendemail,
    clippyThanksYouFunction,
    clippySendemailfunction,
    RandomTimeoutShowClippy, 
    firstTimoutShowclippy,
    SecondRandomTimeoutShowClippy,
    ClearTOclippySendemailfunction,
    ClearTOclippyThanksYouFunction,
    ResumeFileExpand, setResumeFileExpand,
    clippySong, setClippySong,
    clippySongFunction,
    ClearTOSongfunction,
    ClearTOdonttouch,
  }

  return (
    <>
      <UserContext.Provider value={contextValue}>
        <MyBioFolder/>
        <ResumeFolder/>
        <ProjectFolder/>
        <MailFolder/>
        <NftFolder/>
        <NoteFolder/>
        <TypeFolder/>
        <ResumeFile/>
        <Dragdrop/>
        <Footer/>
      </UserContext.Provider>
    </>
  )
}

export default App
