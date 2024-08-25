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
import Shutdown from './components/Shutdown';
import ReadMe from './components/ReadMeFolder'
import MsnFolder from './components/MsnFolder';
import iconInfo from './icon.json'
import axios from 'axios';
import { StyleHide, imageMapping, 
  handleDoubleClickEnterLink,
  handleDoubleTapEnterMobile } from './components/function/AppFunctions';

function App() {
  const [scrollBottom, setScrollBottom] = useState(false)
  const endOfMessagesRef = useRef(null);
  const [userNameValue, setUserNameValue] = useState('')
  const [chatValue, setChatValue] = useState('')
  const [chatData, setChatData] = useState([])
  const [shutdownWindow, setShutdownWindow] = useState(false)
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
    expand: false, show: false, hide: false, focusItem: true,  // focusItem is window, item_1focus - 5 is the icon
    x: 0, y: 0, item_1iconFocus: false, item_2iconFocus: false, 
    item_3iconFocus: false, 
  });
  
  const [MailExpand, setMailExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0,});

  const [NftExpand, setNftExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0, item_1Focus: false});

  const [NoteExpand, setNoteExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0, item_1Focus: false});

  const [TypeExpand, setTypeExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0, item_1Focus: false});

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

  const [ReadMeExpand, setReadMeExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0,});

  const [MSNExpand, setMSNExpand] = useState(
    {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0,});

    // Main useEffect to fetch chat data every 5 seconds
useEffect(() => {
 

  const fetchChatData = async () => {
  
    try {
      const response = await axios.get(`https://notebackend-qr35.onrender.com/chat/getchat/`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
      const updatedChat = response.data;

      // Only update chatData if the chat length has changed
      if (updatedChat.length !== chatData.length) {
        setChatData(updatedChat);

        setTimeout(() => {
          endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 1000);
      }
    } catch (error) {
      console.error('Error fetching chat:', error);
    }
  };

  // Initial fetch and set up interval to fetch every 5 seconds
  fetchChatData();
  const intervalId = setInterval(fetchChatData, 5000);

  return () => clearInterval(intervalId); // Clear interval on component unmount
}, [chatData]); // Depend on chatData

// Function to create a new chat message
const createChat = async () => {
  if (chatValue.trim().length === 0) {
    return;
  }

  const payload = { chat: chatValue };
  if (userNameValue.trim().length > 0) {
    payload.name = userNameValue;
  }

  try {
    const response = await axios.post('https://notebackend-qr35.onrender.com/chat/createChat/', payload);
    setChatValue('');
    console.log('Chat created successfully:', response.data);

    // Fetch the chat data after creating a new chat
    await getChat();

    // Scroll to the end of messages
    setTimeout(() => {
      endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 1000);
  } catch (error) {
    console.error('Error creating chat:', error.response ? error.response.data : error.message);
  }
};

// Function to fetch chat data
async function getChat() {
  try {
    const response = await axios.get(`https://notebackend-qr35.onrender.com/chat/getchat/`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    setChatData(response.data);
  } catch (error) {
    console.error('Error fetching Chat:', error);
  }
}




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
          { name: 'ResumeFile', setter: setResumeFileExpand, usestate: ResumeFileExpand },
          { name: 'ReadMe', setter: setReadMeExpand, usestate: ReadMeExpand },
          { name: 'MSN', setter: setMSNExpand, usestate: MSNExpand }
        ];
}

function iconFocusIcon(name) { //if focus on one, the rest goes unfocus

  const allSetItems = ObjectState();
  const passedName = name.toLowerCase().split(' ').join('');

  const updatedIconState = iconState.map(icon => {
    const iconName = icon.name.toLowerCase().split(' ').join('');
    if ('focus' in icon) { // check if focus is in the object
      return { ...icon, focus: iconName === passedName }; //return new focus if matched
    }
    return icon; // return original if none found
  });

  setIconState(updatedIconState);

  allSetItems.forEach(item => { // set same to folder to distinct from iconName
    const itemName = item.name.toLowerCase().split(' ').join('') + 'folder'

    if ('focus' in item.usestate) {
      item.setter(prev => ({ ...prev, focus: passedName === itemName }));
    }

    if ('item_1Focus' in item.usestate) {
      item.setter(prev => ({ ...prev, item_1Focus: passedName === itemName}));
    }


    if ('item_1iconFocus' in item.usestate) {
      item.setter(prev => ({ ...prev, item_1iconFocus: passedName === 'projectnftfolder' ? true : false }));
    }

    if ('item_2iconFocus' in item.usestate) {
      item.setter(prev => ({ ...prev, item_2iconFocus: passedName === 'projectnotefolder' ? true : false }));
    }

    // Update item_3Focus properties for item.usestate
    if ('item_3iconFocus' in item.usestate) {
      item.setter(prev => ({ ...prev, item_3iconFocus: passedName === 'projecttypefolder' ? true : false }));
    }
  });
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


    // useEffect(() => { // open Bio Folder when app starts
    //   handleShow('My Bio')
    // },[])

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


  useEffect(() => { // prevent zooming on mobile
    document.addEventListener('gesturestart', function (e) {
      e.preventDefault();
  });
  },[])


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
  
  

  function handleSetFocusItemTrue(name) { //click on one, other goes false

    const LowerCaseName = name.toLowerCase().split(' ').join('');
    const setState = ObjectState();

    setState.forEach((item) => {
      const itemName = item.name.toLowerCase()
      if(itemName === LowerCaseName) {
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
  

  function deleteTap(name) {
    const setState = ObjectState();
    const passedName = name.toLowerCase().split(' ').join('');
  
    setState.forEach(item => {
      const itemName = item.name.toLowerCase().split(' ').join('');
  
      if (itemName === passedName) {
        item.setter(prev => ({
          ...prev,
          show: false,
          expand: false
        }));

        setTap(prevTap => prevTap.filter(tapItem => { // get prevTap to prevent error
          const tapItemName = tapItem.toLowerCase().split(' ').join('');
          return tapItemName !== passedName;
        }));
      }
    });
  }
  
  

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
    iconFocusIcon,
    deleteTap,
    shutdownWindow, setShutdownWindow,
    ReadMeExpand, setReadMeExpand,
    MSNExpand, setMSNExpand,
    chatData, setChatData,
    chatValue, setChatValue,
    createChat,
    userNameValue, setUserNameValue,
    endOfMessagesRef,
    scrollBottom,
  }

 

  return (
    <>
      <UserContext.Provider value={contextValue}>
        <Shutdown/>
        <MyBioFolder/>
        <ResumeFolder/>
        <ProjectFolder/>
        <MailFolder/>
        <NftFolder/>
        <NoteFolder/>
        <TypeFolder/>
        <ResumeFile/>
        <ReadMe/>
        <MsnFolder/>
        <Dragdrop/>
        <Footer/>
      </UserContext.Provider>
    </>
  )
}

export default App
