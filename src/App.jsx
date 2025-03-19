import { useState, useEffect, useRef } from 'react'
import UserContext from './Context'
import { Filter } from 'bad-words';
import badword from './badword'
import Footer from './components/Footer';
import Dragdrop from './components/Dragdrop';
import MyBioFolder from './components/MyBioFolder';
import MyComputer from './components/MyComputer';
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
import BTC from './components/BTC';
import EmptyFolder from './components/EmptyFolder';
import ErrorBtn from './components/ErrorBtn';
import RightClickWindows from './components/RightClickWindows';
import axios from 'axios';
import loadingSpin from './assets/loading.gif'
import NewsApp from './components/NewsApp'
import SpinningCat from './components/SpinningCat';
import { StyleHide, imageMapping,
  handleDoubleClickEnterLink,handleDoubleTapEnterMobile,
  handleDoubleClickiframe, handleDoubleTapiframeMobile,
  iconContainerSize, iconImgSize, iconTextSize,
  handleDoubleClickPhotoOpen,
 } from './components/function/AppFunctions';


function App() {
  const [runCatVideo, setRunCatVideo] = useState(false)
  const [newsPopup, setNewsPopup] = useState(false)
  const [onlineUser, setOnlineUser] = useState(0)
  const [sortedIcon, setSortedIcon] = useState([])
  const [sortIconTrigger, setSortIconTrigger] = useState(0)
  const [deleteIcon, setDeleteIcon] = useState(0)
  const refBeingClicked = useRef(null)
  const maxZindexRef = useRef(2);
  const [inFolder, setInFolder] = useState('')
  const [refresh, setRefresh] = useState(0)
  const timerRef = useRef(null); // time counter for long press
  const [binRestoreArr, setBinRestoreArr] = useState(() => {
    const getRestoreArr = localStorage.getItem('restoreArray');
    return getRestoreArr ? JSON.parse(getRestoreArr) : [];
  });
  const [rightClickBin, setRightClickBin] = useState(false) // right click icon in bin folder
  const [iconBeingRightClicked, setIconBeingRightClicked] = useState({}); // right click Icon
  const [rightClickIcon, setRightClickIcon] = useState(false); // right click Icon
  const [rightClickDefault, setRightClickDefault] = useState(false); // right click bg
  const [rightClickPosition, setRightClickPosition] = useState({ x: 0, y: 0 });
  const [loadedMessages, setLoadedMessages] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState({});
  const [regErrorPopUp, setRegErrorPopUp] = useState(false)
  const [regErrorPopUpVal, setRegErrorPopUpVal] = useState('')
  const [runItemBox, setRunItemBox] = useState(false)
  const [RunInputVal, setRunInputVal] = useState('')
  const [undo, setUndo] = useState(['MyComputer'])
  const [selectedFolder, setSelectedFolder] = useState({label: 'MyComputer', img: imageMapping('MyComputer')})
  const [currentFolder, setCurrentFolder] = useState('MyComputer')
  const [loading, setLoading] = useState(true)
  const [btcShow, setBtcShow] = useState(false)
  const [resumeStartBar, setResumejectStartBar] = useState(false)
  const [projectStartBar, setProjectStartBar] = useState(false)
  const [calenderToggle, setCalenderToggle] = useState(false)
  const [iconScreenSize, setIconScreenSize] = useState(() => {
    const savedIconSize = localStorage.getItem('iconSize');
    return savedIconSize ? Number(savedIconSize) : 0
  });
  const [iconSize, setIconSize] = useState(false)
  const [allowNoti, setAllowNoti] = useState(false)
  const socket = useRef(null);
  const [clearNotiTimeOut, setClearNotiTimeOut] = useState(null)
  const [newMessage, setNewMessage] = useState('');
  const [notiOn, setNotiOn] = useState(false);
  const [chatDown, setChatDown] = useState(false)
  const [key, setKey] = useState(0)
  const [dragging, setDragging] = useState(false)
  const DesktopRef = useRef(null);
  const ProjectFolderRef = useRef(null);
  const ResumeFolderRef = useRef(null);
  const BinRef = useRef(null);
  const DiskRef = useRef(null);
  const PictureRef = useRef(null)
  const UtilityRef = useRef(null)
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
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0, zIndex: 1,});

  const [ProjectExpand, setProjectExpand] = useState(
  {
    expand: false, show: false, hide: false, focusItem: true,  // focusItem is window, item_1focus - 5 is the icon
    x: 0, y: 0, zIndex: 1,});

  const [MailExpand, setMailExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0, zIndex: 1,});

  const [NftExpand, setNftExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0, zIndex: 1,});

  const [NoteExpand, setNoteExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0, zIndex: 1,});

  const [TypeExpand, setTypeExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0, zIndex: 1,});

  const [WinampExpand, setWinampExpand] = useState(
  {focus: false, show: false, hide: false, focusItem: true, x: 0, y: 0, zIndex: 1,});

  const [ResumeFileExpand, setResumeFileExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0, zIndex: 1,});

  const [openProjectExpand, setOpenProjectExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0, zIndex: 1,});

  const [MyComputerExpand, setMyComputerExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0, zIndex: 1,});
  
  const [pictureExpand, setPictureExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0, zIndex: 1,});

  const [photoOpenExpand, setPhotoOpenExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0, zIndex: 1,});

  const [desktopIcon, setDesktopIcon] = useState(() => {
    const localItems = localStorage.getItem('icons');
    const parsedItems = localItems ? JSON.parse(localItems) : iconInfo;
    return parsedItems; // This ensures the parsed items or iconInfo is returned correctly
});

  const [MineSweeperExpand, setMineSweeperExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0, zIndex: 1,});

  const [MSNExpand, setMSNExpand] = useState(
    {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0, zIndex: 1,});

  const [BgSettingExpand, setBgSettingExpand] = useState(
    {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0, zIndex: 1,});

  const [RunExpand, setRunExpand] = useState(
    {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0, zIndex: 1,});
  
  const [BinExpand, setBinExpand] = useState(
    {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0, zIndex: 1,});

  const [PaintExpand, setPaintExpand] = useState(
    {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0, zIndex: 1,});
  
  const [UtilityExpand, setUtilityExpand] = useState(
    {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0, zIndex: 1,});
  
    const allPicture = desktopIcon.filter(picture => picture.type === '.jpeg'); // photo open

  const textError = ( // error message
      <>
          Cannot find the file '{RunInputVal || regErrorPopUpVal}' (or one of its component). 
          Make sure the path and filename are correct and that all required 
          libraries are available.
      </>
  ) 
  
  function projectname() { // project name 
      if(projectUrl.length < 1) return;

      const projectlinkletter = projectUrl.slice(8).split('.')[0];

      return projectlinkletter[0].toUpperCase() + projectlinkletter.slice(1);
  }

  // Define all state setter functions and corresponding clear functions in an array
  const allSetters = [setClippyThanks, setClippySendemail, setClippySong, setClippyUsername];
  const allClears = [ClearTOclippyThanksYouFunction, ClearTOclippySendemailfunction, ClearTOSongfunction, ClearTOclippyUsernameFunction];

  useEffect(() => { // force user to update version by clearing their local storage!
    const resetIcon = desktopIcon.find(icon => icon.name === 'Cat')
    if(!resetIcon) {
      localStorage.clear();
      location.reload();
    }
  },[])


useEffect(() => {
  const handleRightClick = (e) => {
    e.preventDefault();

  
    const iconRect = refBeingClicked.current?.getBoundingClientRect();
    setRightClickPosition({ x: e.clientX, y: e.clientY });

    const isIconRef =
      e.clientX > iconRect?.left &&
      e.clientX < iconRect?.right &&
      e.clientY > iconRect?.top &&
      e.clientY < iconRect?.bottom;

    if (!isIconRef) {
      setRightClickBin(false);
      setRightClickIcon(false);
    }

    setRightClickDefault(true);
  };

  document.addEventListener("contextmenu", handleRightClick);

  return () => {
    document.removeEventListener("contextmenu", handleRightClick);
  };
}, []);


  useEffect(() => {
    const handleTouchStart = (e) => {

      if (dragging) return; // Prevent duplicate triggers

      timerRef.current = setTimeout(() => {
        setRightClickPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        setRightClickDefault(true);
      }, 800); // 800ms long press threshold
    };

    const handleTouchEnd = () => {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("touchmove", handleTouchEnd); // Cancel if moved
    document.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchmove", handleTouchEnd);
      document.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);


  function handleMobileLongPress(e, icon) { // long press icon on mobile
    if(dragging) return;
    timerRef.current = setTimeout(() => {  
      setRightClickPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      setRightClickBin(false)
      setRightClickIcon(true);
      setIconBeingRightClicked(icon);
      setRightClickDefault(true);
      
    }, 800)
  }

  function handleMobileLongPressBin(e, icon) { // long press icon on mobile
    if(dragging) return;
    timerRef.current = setTimeout(() => {  
      setRightClickPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      setRightClickIcon(false);
      setRightClickBin(true)
      setIconBeingRightClicked(icon);
      setRightClickDefault(true);
      
    }, 800)
  }




  
  useEffect(() => {
    const handleInteraction = (e) => {
      if (e.button === 0 && !document.querySelector(".window_rightclick_container")?.contains(e.target)) { 
        setRightClickDefault(false);
        setRightClickIcon(false)
        setRightClickBin(false)
        setIconBeingRightClicked({})
      }
    };
  
    const handleInteractionMobile = (e) => {
      if (rightClickDefault && !document.querySelector(".window_rightclick_container")?.contains(e.target)) {
        setRightClickDefault(false);
        setRightClickIcon(false)
        setRightClickBin(false)
        setIconBeingRightClicked({})
      }
    };
  
    document.addEventListener("mousedown", handleInteraction);
    document.addEventListener("touchstart", handleInteractionMobile);
  
    return () => {
      document.removeEventListener("mousedown", handleInteraction);
      document.removeEventListener("touchstart", handleInteractionMobile);
    };
  }, [rightClickDefault]);
  



  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 10;

    const connectWebSocket = () => {
    socket.current = new WebSocket('wss://notebackend4-nwud.onrender.com');

    socket.current.onopen = () => {
      retryCount = 0; 
      setLoading(false)
    };

    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data)

      if (data.count !== undefined) {
        setOnlineUser(data.count);
    }
      
      if (data.key) {
        setKeyChatSession(data.key)
      } else if (data.name && data.chat) {
        setChatData(prevData => [...prevData, data])
        setLoadedMessages(prevMessages => [...prevMessages, data])
        setAllowNoti(true)

        // Scroll to the end of messages after updating chat data
        setTimeout(() => {
          endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)
      }
    }

    socket.current.onerror = (error) => {
      console.error('WebSocket error:', error)
      setLoading(false)
    }
    socket.current.onclose = () => {
      if (retryCount < maxRetries) {
        retryCount++;
        getChat()
        setTimeout(connectWebSocket, 1000); // Reconnect after 1 second
      
      } else {
        console.log('Max retries reached. WebSocket closed permanently.');
      }
    };
  };

  connectWebSocket();

  return () => {
    if (socket.current) {
      socket.current.close();
    }
  };
}, []);

  useEffect(() => { // noti
    if(allowNoti){

      if (chatData.length) {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
      }

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
    const BinRect = BinRef.current.getBoundingClientRect();
    const iconRect = iconRef.getBoundingClientRect();
    const resumeFolderRect = ResumeFolderRef.current.getBoundingClientRect();
    const projectFolderRect = ProjectFolderRef.current.getBoundingClientRect();
    const desktopRect = DesktopRef.current.getBoundingClientRect();
    const diskRect = DiskRef.current.getBoundingClientRect();
    const PictureRect = PictureRef.current.getBoundingClientRect();
    const UtilityRect = UtilityRef.current.getBoundingClientRect();
  

    const offset = 55;

    if(name === 'MyComputer' || name === 'RecycleBin') return; // prevent MyComputer from being dragged into folder

    
    // utility
    if (
      iconRect.left < UtilityRect.right - offset &&
      iconRect.right > UtilityRect.left + offset &&
      iconRect.top < UtilityRect.bottom - offset &&
      iconRect.bottom > UtilityRect.top + offset
    ) {
      if(name === 'Utility') return;
      setDropTargetFolder('Utility');
    }

    else if (
      iconRect.left < BinRect.right - offset &&
      iconRect.right > BinRect.left + offset &&
      iconRect.top < BinRect.bottom - offset &&
      iconRect.bottom > BinRect.top + offset
    ) {
      if(name === 'RecycleBin') return;
      setDropTargetFolder('RecycleBin');
    }
    
    // Check for intersection with the Picture folder
    else if (
      iconRect.left < PictureRect.right - offset &&
      iconRect.right > PictureRect.left + offset &&
      iconRect.top < PictureRect.bottom - offset &&
      iconRect.bottom > PictureRect.top + offset
    ) {
      if(name === 'Picture') return;
      setDropTargetFolder('Picture');
    }
    
    // Check for intersection with the Resume folder
    else if (
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
    // Check for intersection with the Disk 
    else if (
      iconRect.left < diskRect.right - offset &&
      iconRect.right > diskRect.left + offset &&
      iconRect.top < diskRect.bottom - offset &&
      iconRect.bottom > diskRect.top + offset
    ) { 
      // check within MyComputer
      if (name === 'MyComputer') return;
      // add new folder in this array
      const validFolders = ['DiskC', 'DiskD', 'Resume', 'Project', 'Picture', 'RecycleBin', 'Utility'];

      if (validFolders.includes(currentFolder)) {
        setDropTargetFolder(currentFolder);
}
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


function handleShowInfolder(name) { //important handleshow for in folder

  setRightClickDefault(false);

  //  const lowerCaseName = name.toLowerCase().split(' ').join('');

    if (name === 'Hard Disk (C:)') {
      setCurrentFolder('DiskC')
      setSelectedFolder({label: 'Hard Disk (C:)', img: imageMapping(name)})
      setUndo(prev => [...prev, 'DiskC'])
      return;
    }
  
    if (name === 'Hard Disk (D:)') {
      setCurrentFolder('DiskD')
      setSelectedFolder({label: 'Hard Disk (D:)', img: imageMapping(name)})
      setUndo(prev => [...prev, 'DiskD'])
      return;
    }

    if (name === 'Resume') {
      setCurrentFolder('Resume')
      setSelectedFolder({label: 'Resume', img: imageMapping(name)})
      setUndo(prev => [...prev, 'Resume'])
      return;
    }

    if (name === 'Project') {
      setCurrentFolder('Project')
      setSelectedFolder({label: 'Project', img: imageMapping(name)})
      setUndo(prev => [...prev, 'Project'])
      return;
    }

    if (name === 'Picture') {
      setCurrentFolder('Picture')
      setSelectedFolder({label: 'Picture', img: imageMapping(name)})
      setUndo(prev => [...prev, 'Picture'])
      return;
    }

    if (name === 'Utility') {
      setCurrentFolder('Utility')
      setSelectedFolder({label: 'Utility', img: imageMapping(name)})
      setUndo(prev => [...prev, 'Utility'])
      return;
    }

    handleShow(name)
}

function handleShowInfolderMobile(name) { //important handleshow for in folder

  setRightClickDefault(false);

  const now = Date.now()
  

  if (now - lastTapTime < 300) {

    if (name === 'Hard Disk (C:)') {
      setTimeout(() => { // set time out for dom to be able to remove and prevent ghost touch
        setCurrentFolder('DiskC')
      }, 100);
      setSelectedFolder({label: 'Hard Disk (C:)', img: imageMapping(name)})
      setUndo(prev => [...prev, 'DiskC'])
      return;
    }
  
    if (name === 'Hard Disk (D:)') {
      setTimeout(() => {
        setCurrentFolder('DiskD') 
      }, 100);
      setSelectedFolder({label: 'Hard Disk (D:)', img: imageMapping(name)})
      setUndo(prev => [...prev, 'DiskD'])
      return;
    }

    if (name === 'Resume') {
      setTimeout(() => {
        setCurrentFolder('Resume')
      }, 100);
      setSelectedFolder({label: 'Hard Disk (D:)', img: imageMapping(name)})
      setUndo(prev => [...prev, 'Resume'])
      return;
    }

    if (name === 'Resume') {
      setTimeout(() => {
        setCurrentFolder('Resume')
      }, 100);
      setSelectedFolder({label: 'Resume', img: imageMapping(name)})
      setUndo(prev => [...prev, 'Resume'])
      return;
    }

    if (name === 'Project') {
      setTimeout(() => {
        setCurrentFolder('Project')
      }, 100);
      setSelectedFolder({label: 'Project', img: imageMapping(name)})
      setUndo(prev => [...prev, 'Project'])
      return;
    }

    if (name === 'Picture') {
      setTimeout(() => {
        setCurrentFolder('Picture')
      }, 100);
      setSelectedFolder({label: 'Picture', img: imageMapping(name)})
      setUndo(prev => [...prev, 'Picture'])
      return;
    }

    if (name === 'Utility') {
      setTimeout(() => {
        setCurrentFolder('Utility')
      }, 100);
      setSelectedFolder({label: 'Utility', img: imageMapping(name)})
      setUndo(prev => [...prev, 'Utility'])
      return;
    }

    handleShowMobile(name)

  }
  setLastTapTime(now)
}

  const contextValue = {
    runCatVideo, setRunCatVideo,
    newsPopup, setNewsPopup,
    onlineUser,
    UtilityRef,
    PaintExpand, setPaintExpand,
    sortedIcon, setSortedIcon,
    sortIconTrigger, setSortIconTrigger,
    maxZindexRef,
    deleteIcon, setDeleteIcon,
    handleMobileLongPressBin,
    refBeingClicked,
    binRestoreArr, setBinRestoreArr,
    rightClickBin, setRightClickBin,
    inFolder, setInFolder,
    handleShowInfolderMobile, handleShowInfolder,
    handleMobileLongPress,
    iconBeingRightClicked, setIconBeingRightClicked,
    rightClickIcon, setRightClickIcon, 
    BinRef,
    BinExpand, setBinExpand,
    refresh, setRefresh,
    timerRef,
    rightClickDefault, setRightClickDefault,
    rightClickPosition, setRightClickPosition,
    loadedMessages, setLoadedMessages,
    currentPhoto, setCurrentPhoto,
    textError,
    runItemBox, setRunItemBox,
    RunInputVal, setRunInputVal,
    undo, setUndo,
    selectedFolder, setSelectedFolder,
    currentFolder, setCurrentFolder,
    MyComputerExpand, setMyComputerExpand,
    btcShow, setBtcShow,
    projectStartBar, setProjectStartBar,
    resumeStartBar, setResumejectStartBar,
    calenderToggle, setCalenderToggle,
    iconContainerSize, iconImgSize, iconTextSize,
    iconScreenSize, setIconScreenSize,
    iconSize, setIconSize,
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
    DiskRef,
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
    if(!login) {
      setLoading(true)
    }
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

  if(loading && !login) {
    const localThemeBg = localStorage.getItem('theme') || '#098684'; 

    return(
      <div 
      style={{
        width: '100%',
        height: '100svh',
        background: localThemeBg
      }}>
        <img src={loadingSpin} alt="loading" 
          style={{
            width: '30px',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
    )
  }

  return (
    <>
      <UserContext.Provider value={contextValue}>
      {regErrorPopUp && (
        <ErrorBtn
            themeDragBar={themeDragBar}
            stateVal={regErrorPopUpVal}
            setStateVal={setRegErrorPopUp}
            text={textError}
            runOpenFuction={() => null}
        />  
    )}
        <EmptyFolder
          state={PaintExpand} 
          setState={setPaintExpand}
          folderName='Paint'
          paintMode={true}
        />

        <EmptyFolder
          state={pictureExpand} 
          setState={setPictureExpand}
          refState={PictureRef}
          folderName='Picture'
        />

        <EmptyFolder
          state={BinExpand} 
          setState={setBinExpand}
          refState={BinRef}
          folderName='RecycleBin'
        />

        <EmptyFolder
          state={UtilityExpand} 
          setState={setUtilityExpand}
          refState={UtilityRef}
          folderName='Utility'
        />

        <EmptyFolder
          state={photoOpenExpand} 
          setState={setPhotoOpenExpand}
          folderName='Photo'
          photoMode={true}
        />
        <SpinningCat/>
        <NewsApp/>
        <RightClickWindows/>
        <Notification/>
        <Shutdown/>
        <MyComputer/>
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
        {btcShow && <BTC/>}
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
      setSortedIcon(sorted) // saved sort icon to state to use when refresh
      return updatedIcons; // Return the updated state
    });
  }
}



function handleDrop(e, name, target, oldFolderID) {
  setDragging(false)
  e.preventDefault();
  e.stopPropagation();

  if (!target || name === target) return; // Exit if folder is empty or same as the icon

  const droppedIcon = desktopIcon.find(icon => icon.name === name);
  


  if(droppedIcon.folderId === target) {
    setKey(prev => prev + 1)

    return; // make sure its not in the same folder
  }


  if (target === 'RecycleBin') {
    setBinRestoreArr(prevArr => {
      const updatedArr = [
        ...prevArr,
        {
          name: name,
          OldFolder: oldFolderID
        }
      ];
      localStorage.setItem('restoreArray', JSON.stringify(updatedArr));
      return updatedArr; 
    });
  } else {
    setBinRestoreArr(prev => {
      const updatedArr = prev.filter(item => item.name !== name);
      localStorage.setItem('restoreArray', JSON.stringify(updatedArr));
      return updatedArr;
    });
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
    const response = await axios.get(`https://notebackend4-nwud.onrender.com/chat/getchat/`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    setChatDown(false)
    setChatData(response.data.chat);
    setLoadedMessages(response.data.chat.slice(-40))
    // if(MSNExpand.show){
    //   endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    // }
    // setKeyChatSession(response.data.key)
  } catch (error) {
    setChatDown(true)
    console.error('Error fetching Chat:', error);
  }
}

function ObjectState() { // Add all the state realted to folder here !! very important
  return [
          { name: 'About', setter: setMybioExpand, usestate: MybioExpand},
          { name: 'Resume', setter: setResumeExpand, usestate: ResumeExpand },
          { name: 'Project', setter: setProjectExpand, usestate: ProjectExpand },
          { name: 'Mail', setter: setMailExpand, usestate: MailExpand },
          { name: 'Nft', setter: setNftExpand, usestate: NftExpand},
          { name: 'Note', setter: setNoteExpand, usestate: NoteExpand },
          { name: 'AiAgent', setter: setOpenProjectExpand, usestate: openProjectExpand },
          { name: 'Winamp', setter: setWinampExpand, usestate: WinampExpand },
          { name: 'ResumeFile', setter: setResumeFileExpand, usestate: ResumeFileExpand },
          { name: 'MineSweeper', setter: setMineSweeperExpand, usestate: MineSweeperExpand },
          { name: 'MSN', setter: setMSNExpand, usestate: MSNExpand },
          { name: 'Internet', setter: setOpenProjectExpand, usestate: openProjectExpand },
          { name: 'Settings', setter: setBgSettingExpand, usestate: BgSettingExpand },
          { name: 'Run', setter: setRunExpand, usestate: RunExpand },
          { name: 'MyComputer', setter: setMyComputerExpand, usestate: MyComputerExpand },
          { name: 'Picture', setter: setPictureExpand, usestate: pictureExpand },
          { name: 'Photo', setter: setPhotoOpenExpand, usestate: photoOpenExpand },
          { name: 'RecycleBin', setter: setBinExpand, usestate: BinExpand },
          { name: 'Paint', setter: setPaintExpand, usestate: PaintExpand },
          { name: 'Utility', setter: setUtilityExpand, usestate: UtilityExpand },

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

  setRightClickDefault(false);

  if(name === '' || !name) return;

  if(name === 'Bitcoin') {
    setBtcShow(true)
    return;
  }

  const lowerCaseName = name.toLowerCase().split(' ').join('');

  const allSetItems = ObjectState() // call all usestate object

  const itemExists = allSetItems.some(item => item.name.toLowerCase().split(' ').join('') === lowerCaseName);

  const pictureMatch = allPicture.find(picture => name.includes(picture.name));
  
  if (pictureMatch) {
    handleDoubleClickPhotoOpen(name, setCurrentPhoto);
    handleShow('Photo');
    return;
  }

  if (!itemExists) {
    setRegErrorPopUp(true);
    setRegErrorPopUpVal(name);
    return;
}

  allSetItems.forEach((item) => {

    const itemName = item.name.toLowerCase().trim();

    if(itemName === lowerCaseName) {
      setTimeout(() => {
        item.setter(prev => ({...prev, show: true, focusItem: true, hide: false, zIndex: maxZindexRef.current + 1 }));
            maxZindexRef.current = item.usestate.zIndex; // Update max zIndex reference
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
      if(lowerCaseName === 'aiagent') {
        handleDoubleClickiframe('AiAgent', setOpenProjectExpand, setProjectUrl)
        handleShow('Internet');
      }
    }
    item.setter(prev => ({...prev,focusItem: false}));

  });
  if(tap.includes(name)) return;
  setStartActive(false)

  if(name === 'Run' || name === 'Nft' || name === 'Note' || name === 'AiAgent')return; // not showing run on tap

  setTap(prevTap => [...prevTap, name]);
  setDesktopIcon(prevIcons => prevIcons.map(icon => ({...icon, focus: false})));

}

function handleShowMobile(name) {

  setRightClickDefault(false);

  const now = Date.now()

  if (now - lastTapTime < 300) {

    if(name === '' || !name) return;

  
    if(name === 'Bitcoin') {
      setBtcShow(true)
      return;
    }
  
    const lowerCaseName = name.toLowerCase().split(' ').join('');
  
    const allSetItems = ObjectState() // call all usestate object
  
    const itemExists = allSetItems.some(item => item.name.toLowerCase().split(' ').join('') === lowerCaseName);
  
    const pictureMatch = allPicture.find(picture => name.includes(picture.name));
    
    if (pictureMatch) {
      handleDoubleClickPhotoOpen(name, setCurrentPhoto);
      handleShow('Photo');
      return;
    }
  
    if (!itemExists) {
      setRegErrorPopUp(true);
      setRegErrorPopUpVal(name);
      return;
  }
  
    allSetItems.forEach((item) => {
  
      const itemName = item.name.toLowerCase().trim();
  
      if(itemName === lowerCaseName) {
        setTimeout(() => {
          item.setter(prev => ({...prev, show: true, focusItem: true, hide: false, zIndex: maxZindexRef.current + 1 }));
            maxZindexRef.current = item.usestate.zIndex; // Update max zIndex reference
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
        if(lowerCaseName === 'aiagent') {
          handleDoubleClickiframe('AiAgent', setOpenProjectExpand, setProjectUrl)
          handleShow('Internet');
        }
      }
      item.setter(prev => ({...prev,focusItem: false}));
  
    });
    if(tap.includes(name)) return;
    setStartActive(false)
  
    if(name === 'Run' || name === 'Nft' || name === 'Note' || name === 'AiAgent')return; // not showing run on tap
  
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

  function handleSetFocusItemTrue(name) {
    const LowerCaseName = name.toLowerCase().split(' ').join('');
    const setState = ObjectState();
    
    setState.forEach((item) => {
        const itemName = item.name.toLowerCase();
        // For the clicked item, set the focus to true
        if (itemName === LowerCaseName) {
            const newZIndex = (maxZindexRef.current || 0) + 1;  // Calculate the new zIndex
              item.setter(prev => ({ ...prev, focusItem: true, zIndex: newZIndex })); 
            maxZindexRef.current = newZIndex;  // Update maxZindexRef
        } else {
            item.setter(prev => ({ ...prev, focusItem: false }));
        }
    });

    setDesktopIcon(prevIcons => prevIcons.map(icon => ({ ...icon, focus: false })));
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
        zIndex: item.usestate.hide ? '-1' : (item.usestate.focusItem ? '999' : item.usestate.zIndex),
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
            zIndex: item.usestate.hide ? '-1' : (item.usestate.focusItem ? '999' : item.usestate.zIndex),
            pointerEvents: item.usestate.hide ? 'none' : 'auto',
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
