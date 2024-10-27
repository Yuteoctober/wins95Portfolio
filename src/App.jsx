import { useState, useEffect, useRef } from 'react'
import UserContext from './Context'
import { Filter } from 'bad-words';
import badword from './badword'
import Footer from './components/Footer';
import Dragdrop from './components/Dragdrop';
import MyBioFolder from './components/MyBioFolder';
import ResumeFolder from './components/ResumeFolder';
import ProjectFolder from './components/ProjectFolder';
import MailFolder from './components/MailFolder';
import WebampPlayer from './components/WinampPlayer';
import ResumeFile from './components/ResumeFile';
import Shutdown from './components/Shutdown';
import MineSweeper from './components/MineSweeper'
import MsnFolder from './components/MsnFolder';
import iconInfo from './icon.json'
import Login from './components/Login';
import OpenProject from './components/OpenProject';
import WindowsShutdown from './components/WindowsShutdown';
import BgSetting from './components/BgSetting';
import Run from './components/Run';
import Notification from './components/Notification';
import axios from 'axios';
import { StyleHide, imageMapping,
  handleDoubleClickEnterLink,handleDoubleTapEnterMobile,
  handleDoubleClickiframe, handleDoubleTapiframeMobile,
 } from './components/function/AppFunctions';

function App() {
  const [allowNoti, setAllowNoti] = useState(false)
  const socket = useRef(null);
  const [clearNotiTimeOut, setClearNotiTimeOut] = useState(null)
  const [newMessage, setNewMessage] = useState('');
  const [notiOn, setNotiOn] = useState(false);
  const [chatDown, setChatDown] = useState(false)
  const [key, setKey] = useState(1)
  const [dragging, setDragging] = useState(false)
  const DesktopRef = useRef(null);
  const ProjectFolderRef = useRef(null);
  const ResumeFolderRef = useRef(null);
  const [draggedIcon, setDraggedIcon] = useState(null);
  const [dropTargetFolder, setDropTargetFolder] = useState(null);
  const [reMountRun, setReMountRun] = useState(0)
  const [ErrorPopup, setErrorPopup] = useState(false)
  const [themeDragBar, setThemeDragBar] = useState(() => localStorage.getItem('barcolor') || '#14045c')
  const [login, setLogin] = useState(true)
  const [windowsShutDownAnimation, setWindowsShutDownAnimation] = useState(false)
  const [detectMouse, setDetectMouse] = useState(false)
  const endOfMessagesRef = useRef(null);
  const [KeyChatSession, setKeyChatSession] = useState('')
  const [sendDisable, setSendDisable] = useState(false)
  const [userNameValue, setUserNameValue] = useState(() => {
    return localStorage.getItem('username') || '';
  });
  const [chatValue, setChatValue] = useState('')
  const [chatData, setChatData] = useState([])
  const [shutdownWindow, setShutdownWindow] = useState(false)
  const ClearTOdonttouch = useRef(null);
  const ClearTOSongfunction = useRef(null);
  const ClearTOclippySendemailfunction = useRef(null);
  const ClearTOclippyThanksYouFunction = useRef(null);
  const ClearTOclippyUsernameFunction = useRef(null);
  const firstTimoutShowclippy = useRef(null);
  const RandomTimeoutShowClippy = useRef(null);
  const SecondRandomTimeoutShowClippy = useRef(null);
  const [clippyUsername, setClippyUsername] = useState(false)
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
  const [projectUrl, setProjectUrl] = useState('')
  const [MybioExpand, setMybioExpand] = useState(
  {
    expand: false, // fullscreen
    show: false, // show folder when double clicked
    hide: false, // hide folder to the tap
    focusItem: true, // decide if item is being clicked on or not
    x: 0, y: 0, // position before fullscreen
  });
  const [ResumeExpand, setResumeExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0});

  const [ProjectExpand, setProjectExpand] = useState(
  {
    expand: false, show: false, hide: false, focusItem: true,  // focusItem is window, item_1focus - 5 is the icon
    x: 0, y: 0});

  const [MailExpand, setMailExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0,});

  const [NftExpand, setNftExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0});

  const [NoteExpand, setNoteExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0});

  const [TypeExpand, setTypeExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0});

  const [WinampExpand, setWinampExpand] = useState(
  {focus: false, show: false, hide: false, focusItem: true, x: 0, y: 0,});

  const [ResumeFileExpand, setResumeFileExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0,});

  const [openProjectExpand, setOpenProjectExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0,});

  const [desktopIcon, setDesktopIcon] = useState(() => {
    const localItems = localStorage.getItem('icons');
    const parsedItems = localItems ? JSON.parse(localItems) : iconInfo;
    return parsedItems; // This ensures the parsed items or iconInfo is returned correctly
});

  const [MineSweeperExpand, setMineSweeperExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0,});

  const [MSNExpand, setMSNExpand] = useState(
    {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0,});

  const [BgSettingExpand, setBgSettingExpand] = useState(
    {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0,});

  const [RunExpand, setRunExpand] = useState(
    {expand: false, show: false, hide: false, focusItem: true, x: 3, y: window.innerHeight - 204,});

  function projectname() {
    if(projectUrl.length < 1) return;
    const projectlinkletter = projectUrl.slice(8).split('.')[0];
    return projectlinkletter[0].toUpperCase() + projectlinkletter.slice(1);
  }

  // Define all state setter functions and corresponding clear functions in an array
  const allSetters = [setClippyThanks, setClippySendemail, setClippySong, setClippyUsername];
  const allClears = [ClearTOclippyThanksYouFunction, ClearTOclippySendemailfunction, ClearTOSongfunction, ClearTOclippyUsernameFunction];


  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 10;

    const connectWebSocket = () => {
    socket.current = new WebSocket('wss://notebackend4.onrender.com');

    socket.current.onopen = () => {
      retryCount = 0; 
    };

    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data)
      
      if (data.key) {
        setKeyChatSession(data.key)
      } else if (data.name && data.chat) {
        setChatData(prevData => [...prevData, data])
        setAllowNoti(true)

        // Scroll to the end of messages after updating chat data
        setTimeout(() => {
          endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)
      }
    }

    socket.current.onerror = (error) => {
      console.error('WebSocket error:', error)
      setChatDown(true)
    }
    socket.current.onclose = () => {
      if (retryCount < maxRetries) {
        retryCount++;
        setTimeout(connectWebSocket, 1000); // Reconnect after 1 second
      } else {
        console.log('Max retries reached. WebSocket closed permanently.');
      }
    };
  };

  connectWebSocket();

  return () => {
    socket.current && socket.current.close();
  };
}, []);

  useEffect(() => { // noti
    if(allowNoti){
      if(!MSNExpand.show || MSNExpand.hide) {
        setNotiOn(false);
        setTimeout(() => {
            clearTimeout(clearNotiTimeOut)
            setNotiOn(true);
            setNewMessage('msn');  // Notification message
        }, 100);
      }
    }
      
  },[chatData])


useEffect(() => { // touch support device === true
  iconFocusIcon('') // make icon focus goes false
  getChat()

  const htmlElement = document.documentElement; //check if user is in frontend
  htmlElement.addEventListener('mouseenter', handleMouseSeen);

  const onTouchStartSupported = 'ontouchstart' in document.documentElement;
  setIsTouchDevice(onTouchStartSupported);

  document.addEventListener('gesturestart', function (e) { // prevent zooming on mobile
    e.preventDefault();
  });

  function handleKeyPress(event){ // hitting windows button activates start menu
    if (event.keyCode === 91 || event.keyCode === 92 || event.keyCode === 93) {
        setStartActive(prev => !prev)
    }
  }
  document.addEventListener('keydown', handleKeyPress);
  return () => {
      document.removeEventListener('keydown', handleKeyPress);
      htmlElement.removeEventListener('mouseenter', handleMouseSeen);
  };

}, []);

const handleOnDrag = (name, ref) => () => {
  setDragging(true)
  const iconRef = ref
  if (iconRef && ResumeFolderRef.current && ProjectFolderRef.current) {
    const iconRect = iconRef.getBoundingClientRect();
    const resumeFolderRect = ResumeFolderRef.current.getBoundingClientRect();
    const projectFolderRect = ProjectFolderRef.current.getBoundingClientRect();
    const desktopRect = DesktopRef.current.getBoundingClientRect();

    const offset = 55;

    // Check for intersection with the Resume folder
    if (
      iconRect.left < resumeFolderRect.right - offset &&
      iconRect.right > resumeFolderRect.left + offset &&
      iconRect.top < resumeFolderRect.bottom - offset &&
      iconRect.bottom > resumeFolderRect.top + offset
    ) {
      if(name === 'Resume') return;
      setDropTargetFolder('Resume');
    }
    // Check for intersection with the Project folder
    else if (
      iconRect.left < projectFolderRect.right - offset &&
      iconRect.right > projectFolderRect.left + offset &&
      iconRect.top < projectFolderRect.bottom - offset &&
      iconRect.bottom > projectFolderRect.top + offset
    ) {
      if(name === 'Project') return;
      setDropTargetFolder('Project');
    }
    else if (
      iconRect.left < desktopRect.right &&
      iconRect.right > desktopRect.left &&
      iconRect.top < desktopRect.bottom &&
      iconRect.bottom > desktopRect.top
    ) {
      setDropTargetFolder('Desktop');
    }
    // Default case if not intersecting with any folder
    else {
      setDropTargetFolder('Desktop');
    }
  } else {
    // Set to Desktop if refs are not set
    setDropTargetFolder('Desktop');
  }

};


  const contextValue = {
    clearNotiTimeOut, setClearNotiTimeOut,
    newMessage, setNewMessage,
    notiOn, setNotiOn,
    chatDown,
    handleDragStop,
    key, setKey,
    dragging, setDragging,
    handleOnDrag,
    DesktopRef,
    ProjectFolderRef,
    ResumeFolderRef,
    handleDrop,
    dropTargetFolder, setDropTargetFolder,
    draggedIcon, setDraggedIcon,
    startActive, setStartActive,
    time, setTime,
    desktopIcon, setDesktopIcon,
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
    handleDoubleClickiframe,
    handleDoubleTapiframeMobile,
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
    MineSweeperExpand, setMineSweeperExpand,
    MSNExpand, setMSNExpand,
    chatData, setChatData,
    chatValue, setChatValue,
    createChat,
    userNameValue, setUserNameValue,
    endOfMessagesRef,
    clippyUsername, setClippyUsername,
    ClearTOclippyUsernameFunction,
    sendDisable, setSendDisable,
    login, setLogin,
    openProjectExpand, setOpenProjectExpand,
    projectUrl, setProjectUrl,
    projectname,
    windowsShutDownAnimation, setWindowsShutDownAnimation,
    BgSettingExpand, setBgSettingExpand,
    themeDragBar, setThemeDragBar,
    RunExpand, setRunExpand,
    reMountRun, setReMountRun,
    ErrorPopup, setErrorPopup,
    remountRunPosition,

  }


  // show login page
  if(login) {
    return(
      <UserContext.Provider value={contextValue}>
        <Login/>
      </UserContext.Provider>
    )
  }

  if(windowsShutDownAnimation) {
    return(
      <UserContext.Provider value={contextValue}>
        <WindowsShutdown/>
      </UserContext.Provider>
    )
  }

  return (
    <>
      <UserContext.Provider value={contextValue}>
        <Notification/>
        <Shutdown/>
        <MyBioFolder/>
        <ResumeFolder/>
        <ProjectFolder/>
        <MailFolder/>
        <ResumeFile/>
        <WebampPlayer/>
        <MineSweeper/>
        <MsnFolder/>
        <OpenProject/>
        <BgSetting/>
        <Run/>
        <Dragdrop/>
        <Footer/>
      </UserContext.Provider>
    </>
  )


  function sortDesktopIcons(iconArr) {
    if (!Array.isArray(iconArr)) return [];

    const lesserXItems = [];

    // Sort icons by y value, and then by x value if y values are equal
    const sortedIcons = [...iconArr].sort((a, b) => {
        if (a.y === b.y) {
            // Compare x values to determine sort order
            if (a.x > b.x) {
                // Push the item with the greater x value to the lesserXItems array
                if (!lesserXItems.includes(a)) {
                    lesserXItems.push(a);
                }
            }
        }
        return a.y - b.y; // Sort by y value
    });

    // Remove any items that were pushed to lesserXItems from the sorted array
    const firstArr = sortedIcons.filter(item => !lesserXItems.includes(item));

    return [...firstArr, ...lesserXItems]; // Append lesserXItems at the end
}



function handleDragStop(data, iconName, ref) {
  // Capture the actual viewport position of the dragged icon
  const iconElement = ref; // Get the icon ref using its name

  if (iconElement) {
    const { x, y } = iconElement.getBoundingClientRect();

    setDesktopIcon(prevIcons => {
      // Create updatedIcons based on the previous state
      const updatedIcons = prevIcons.map(icon =>
        icon.name === iconName
          ? { ...icon, x: x, y: y }
          : icon
      );

      const sorted = sortDesktopIcons(updatedIcons)
      localStorage.setItem('icons', JSON.stringify(sorted));
      return updatedIcons; // Return the updated state
    });
  }
}



  function handleDrop(e, name, target) {
    setDragging(false)
    e.preventDefault();
    e.stopPropagation();

    if (!target || name === target) return; // Exit if folder is empty or same as the icon


    const droppedIcon = desktopIcon.find(icon => icon.name === name);

    if(droppedIcon.folderId === target) {

      return; // make sure its not in the same folder
    }

    if (droppedIcon) {
        setDesktopIcon(prevIcons => {
            const updatedIcons = prevIcons.filter(icon => icon.name !== droppedIcon.name);
            const newIcon = { ...droppedIcon, folderId: target };
            setDropTargetFolder('')
            setDraggedIcon('');
            setKey(prev => prev + 1) //make folder icon by re-mount
            localStorage.setItem('icons', JSON.stringify([...updatedIcons, newIcon]));
            return [...updatedIcons, newIcon];
        });
    }
}

    function remountRunPosition() { // make Run go back to the original position by remounting draggable by changing key
      if(!RunExpand.show && !ErrorPopup) {
        setReMountRun(prev => prev + 1)
      }
    }


    function handleMouseSeen() { //check if user is on the frontend
      setDetectMouse(true)
    }

    async function createChat() { // create chat
      const filter = new Filter();
  
      setTimeout(() => {
          setSendDisable(false);
      }, 20000);
  
      setSendDisable(true);
  
      if (chatValue.trim().length === 0) {
          setSendDisable(false);
          return;
      }
  
      const offendedWords = badword(); // imported another file
      offendedWords.forEach(word => filter.addWords(word));
  
      const newChatVal = filter.clean(chatValue);
      const payload = {
          chat: newChatVal,
          key: KeyChatSession,
          mouse: detectMouse,
          touch: isTouchDevice,
      };

      if (userNameValue.trim().length < 1) {
        payload.name = 'Anonymous'
      }
  
      if (userNameValue.trim().length > 0) {
          const cleanedName = filter.clean(userNameValue);
          payload.name = cleanedName;
      }
  
      // Send the payload via WebSocket
      if (socket.current) { // Check if socket is initialized
          socket.current.send(JSON.stringify(payload));
      } else {
          console.error('WebSocket is not initialized.');
      }
  
      // Clear the chat input field and reset sendDisable
      setChatValue('');
      setSendDisable(false);
      console.log('Chat message sent:', payload);
  }



// Function to fetch chat data
async function getChat() {
  try {
    const response = await axios.get(`https://notebackend4.onrender.com/chat/getchat/`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    setChatData(response.data.chat);
    // setKeyChatSession(response.data.key)
  } catch (error) {
    console.error('Error fetching Chat:', error);
  }
}

function ObjectState() { // Add all the state realted to folder here !! very important
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
          { name: 'MineSweeper', setter: setMineSweeperExpand, usestate: MineSweeperExpand },
          { name: 'MSN', setter: setMSNExpand, usestate: MSNExpand },
          { name: 'Internet', setter: setOpenProjectExpand, usestate: openProjectExpand },
          { name: 'Settings', setter: setBgSettingExpand, usestate: BgSettingExpand },
          { name: 'Run', setter: setRunExpand, usestate: RunExpand },

        ];
}

function iconFocusIcon(name) { // if focus on one, the rest goes unfocus

  const allSetItems = ObjectState();
  const passedName = name.toLowerCase().split(' ').join('');

  const updateddesktopIcon = desktopIcon.map(icon => {
    const iconName = icon.name.toLowerCase().split(' ').join('');
    if ('focus' in icon) { // check if focus is in the object
      return { ...icon, focus: iconName === passedName }; // return new focus if matched
    }
    return { ...icon, focus: false }; // return all false if no found
  });
  setDesktopIcon(updateddesktopIcon);

  ///need to be fixed, this logic
  allSetItems.forEach(item => { // set same to folder to distinct from iconName
    const itemName = item.name.toLowerCase().split(' ').join('') + 'folder'
      item.setter(prev => ({ ...prev, focus: passedName === itemName }));
  });
}

function handleShow(name) {

  if(name === '' || !name) return;

  const lowerCaseName = name.toLowerCase().split(' ').join('');

  const allSetItems = ObjectState() // call all usestate object

  allSetItems.forEach((item) => {

    const itemName = item.name.toLowerCase().trim();

    if(itemName === lowerCaseName) {
      setTimeout(() => {
        item.setter(prev => ({...prev, show: true, focusItem: true, hide: false}));
      }, 100);
      if(lowerCaseName === 'mail') clippySendemailfunction();
      if(lowerCaseName === 'winamp') clippySongFunction();
      if(lowerCaseName === 'msn') clippyUsernameFunction();
      if(lowerCaseName === 'nft') {
        handleDoubleClickiframe('Nft', setOpenProjectExpand, setProjectUrl)
        handleShow('Internet');
      }
      if(lowerCaseName === 'note') {
        handleDoubleClickiframe('Note', setOpenProjectExpand, setProjectUrl)
        handleShow('Internet');
      }
    }
    item.setter(prev => ({...prev,focusItem: false}));

  });
  if(tap.includes(name)) return;
  setStartActive(false)

  if(name === 'Run' || name === 'Nft' || name === 'Note')return; // not showing run on tap

  setTap(prevTap => [...prevTap, name]);
  setDesktopIcon(prevIcons => prevIcons.map(icon => ({...icon, focus: false})));

}

function handleShowMobile(name) {

  const now = Date.now()

  if (now - lastTapTime < 300) {

  if(name === '' || !name) return;

  const lowerCaseName = name.toLowerCase().split(' ').join('');

  const allSetItems = ObjectState();

  allSetItems.forEach((item) => {

    const itemName = item.name.toLowerCase().trim();

    if(itemName === lowerCaseName) {
      setTimeout(() => {
        item.setter(prev => ({...prev, show: true, focusItem: true, hide: false}));
      }, 100);
      if(lowerCaseName === 'mail') clippySendemailfunction();
      if(lowerCaseName === 'winamp') clippySongFunction();
      if(lowerCaseName === 'msn') clippyUsernameFunction();
      if(lowerCaseName === 'nft') {
        handleDoubleClickiframe('Nft', setOpenProjectExpand, setProjectUrl)
        handleShow('Internet');
      }
      if(lowerCaseName === 'note') {
        handleDoubleClickiframe('Note', setOpenProjectExpand, setProjectUrl)
        handleShow('Internet');
      }
    }

    item.setter(prev => ({...prev,focusItem: false}));

  });

  if(tap.includes(name)) return;
  setStartActive(false)

  if(name === 'Run' || name === 'Nft' || name === 'Note')return; // not showing run on tap

  setTap(prevTap => [...prevTap, name]);
  setDesktopIcon(prevIcons => prevIcons.map(icon => ({...icon, focus: false})));
  }
  setLastTapTime(now)
}


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


  function clippyThanksYouFunction() {
    handleClippyFunction(setClippyThanks, ClearTOclippyThanksYouFunction, allSetters);
  }

  function clippySendemailfunction() {
    handleClippyFunction(setClippySendemail, ClearTOclippySendemailfunction, allSetters);
  }

  function clippySongFunction() {
    handleClippyFunction(setClippySong, ClearTOSongfunction, allSetters);
  }

  function clippyUsernameFunction() {
    handleClippyFunction(setClippyUsername, ClearTOclippyUsernameFunction, allSetters);
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

    setDesktopIcon(prevIcons => prevIcons.map(icon => ({
      ...icon,
      focus: false
    })));
  }

  function inlineStyleExpand (name) {
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
  }

  function inlineStyle(name) {
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
  }

  function deleteTap(name) {
    const setState = ObjectState();
    const passedName = name.toLowerCase().split(' ').join('');

    setState.forEach(item => {
      const itemName = item.name.toLowerCase().split(' ').join('');

      if (itemName === passedName) {
        item.setter(prev => ({
          ...prev,
          show: false,
          expand: false,
          hide: false
        }));

        setTap(prevTap => prevTap.filter(tapItem => { // get prevTap to prevent error
          const tapItemName = tapItem.toLowerCase().split(' ').join('');
          return tapItemName !== passedName;
        }));
      }
    });

  }
}

export default App
