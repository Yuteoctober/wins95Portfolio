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
import { StyleHide, imageMapping, 
  handleDoubleClickEnterLink,
  handleDoubleTapEnterMobile } from './components/function/AppFunctions';

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
    focusItem: true, // decide if item is being clicked on or not
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

function ObjectState() {
  return [
          { name: 'Mybio', setter: setMybioExpand, usestate: MybioExpand},
          { name: 'Resume', setter: setResumeExpand, usestate: ResumeExpand },
          { name: 'Project', setter: setProjectExpand, usestate: ProjectExpand },
          { name: 'Mail', setter: setMailExpand, usestate: MailExpand },
          { name: 'Nft', setter: setNftExpand, usestate: NftExpand},
          { name: 'Note', setter: setNoteExpand, usestate: NoteExpand },
          { name: 'Type', setter: setTypeExpand, usestate: TypeExpand },
          { name: 'Winamp', setter: setWinampExpand, usestate: WinampExpand },
          { name: 'ResumeFile', setter: setResumeFileExpand, usestate: ResumeFileExpand }
        ];
}

function handleShow(name) {

  const lowerCaseName = name.toLowerCase().split(' ').join('');

  const allSetItems = ObjectState() // call all usestate object

  allSetItems.forEach((item) => {

    const itemName = item.name.toLowerCase().trim();
    
    if(itemName === lowerCaseName) {
      item.setter(prev => ({...prev, show: true, focusItem: true, hide: false}));
      if(lowerCaseName === 'mail') clippySendemailfunction();
      if(lowerCaseName === 'winamp') clippySongFunction();
    }
    if(itemName !== lowerCaseName) {
      item.setter(prev => ({...prev, focusItem: false}));
    }
    if(itemName === lowerCaseName) {
      item.setter(prev => ({...prev, hide: false}));
      return;
    }
  });
  if(tap.includes(name)) return;

  setTap(prevTap => [...prevTap, name]);
  setIconState(prevIcons => prevIcons.map(icon => ({...icon, focus: false})));

}


function handleShowMobile(name) {

  const now = Date.now()
  if (now - lastTapTime < 300) {

  

  const lowerCaseName = name.toLowerCase().split(' ').join('');

  const allSetItems = ObjectState();

  allSetItems.forEach((item) => {

    const itemName = item.name.toLowerCase().trim();
    
    
    if(itemName === lowerCaseName) {
      item.setter(prev => ({...prev, show: true, focusItem: true, hide: false}));
      if(lowerCaseName === 'mail') clippySendemailfunction();
      if(lowerCaseName === 'winamp') clippySongFunction();
    }
    if(itemName !== lowerCaseName) {
      item.setter(prev => ({...prev, focusItem: false}));
    }
    
    if(itemName === lowerCaseName) {
      item.setter(prev => ({...prev, hide: false}));
      return;
    }
  });

  if(tap.includes(name)) return;

  setTap(prevTap => [...prevTap, name]);
  setIconState(prevIcons => prevIcons.map(icon => ({...icon, focus: false})));

  }
  setLastTapTime(now)
}


    useEffect(() => { // open Bio Folder when app starts
      handleShow('My Bio')
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

  useEffect(() => { // prevent zooming on mobile
    document.addEventListener('gesturestart', function (e) {
      e.preventDefault();
  });
  },[])

  function handleSetFocusItemTrue(name) { //click on one, other goes false

    const LowerCaseName = name.toLowerCase().split(' ').join('');
    const setState = ObjectState();

    setState.forEach((item) => {
      if(item.name.toLowerCase() === LowerCaseName) {
        item.setter(prev => ({...prev, focusItem: true}));
      } else {
        item.setter(prev => ({...prev, focusItem: false}));
      }
    });

    setIconState(prevIcons => prevIcons.map(icon => ({
      ...icon,
      focus: false
    })));
  }

  
  const inlineStyleExpand = (name) => {
    const passedName = name.split(' ').join('').toLowerCase();
    const setState = ObjectState();
  
    const item = setState.find(item => {
      const itemName = item.name.split(' ').join('').toLowerCase();
      return itemName === passedName;
    });
  
    if (item) {
      return {
        display: item.usestate.show ? 'block' : '',
        maxWidth: 'none',
        width: '100%',
        height: 'calc(100% - 37px)',
        left: `${item.usestate.x <= 0 ? Math.abs(item.usestate.x) * 2 + item.usestate.x : -item.usestate.x}px`,
        top: `${item.usestate.y <= 0 ? Math.abs(item.usestate.y) * 2 + item.usestate.y : -item.usestate.y}px`,
        opacity: item.usestate.hide ? '0' : '1',
        zIndex: item.usestate.hide ? '-1' : (item.usestate.focusItem ? '999' : '3'),
        pointerEvents: item.usestate.hide ? 'none' : 'auto',
        resize: item.usestate.expand ? 'none' : ''
      };
    }
    return {};
  };
  
  const inlineStyle = (name) => {
    const setState = ObjectState();
    const passedName = name.split(' ').join('').toLowerCase();
  
    const item = setState.find(item => {
        const itemName = item.name.split(' ').join('').toLowerCase();
        return itemName === passedName;
    });
  
    if (item) {
        return {
            display: item.usestate.show ? 'block' : '',
            opacity: item.usestate.hide ? '0' : '1',
            zIndex: item.usestate.hide ? '-1' : (item.usestate.focusItem ? '999' : '3'),
            pointerEvents: item.usestate.hide ? 'none' : 'auto'
        };
    }
    return {};
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
    handleDoubleClickEnterLink,
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
    ObjectState,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
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
