import MyComputer from '../../assets/pc.png'
import About from '../../assets/ipng.png'
import Resume from '../../assets/folder.png'
import Mail from '../../assets/mail.png'
import Project from '../../assets/regFolder.png'
import Winamp from '../../assets/winampIcon.png'
import resumefile from '../../assets/resume.png'
import MineSweeper from '../../assets/minesweepericon.png'
import MSN from '../../assets/msn.png'
import ie from '../../assets/ie.png'
import settings from '../../assets/setting.png'
import file from '../../assets/file4download.png'
import disk from '../../assets/c.png'
import rom from '../../assets/rom.png'
import btc from '../../assets/btc_icon.webp'
import jpeg from '../../assets/jpeg.png'
import firstPic from '../../assets/001.jpg'
import secondPic from '../../assets/002.jpg'
import thirdPic from '../../assets/003.jpg'
import fourthPic from '../../assets/004.jpg'
import fifthPic from '../../assets/005.jpg'
import sixthPic from '../../assets/006.jpg'
import seventhPic from '../../assets/007.jpg'
import eighthPic from '../../assets/008.jpg'
import ninthPic from '../../assets/009.jpg'
import tenthPic from '../../assets/010.jpg'
import eleventhPic from '../../assets/011.jpg'
import binEmp from '../../assets/bin2.png'
import reset from '../../assets/reset.png'
import github from '../../assets/github.png'
import paint from '../../assets/paint.png'
import aiagent from '../../assets/ai_robot.png'
import cat from '../../assets/catpic.png'
import patch from '../../assets/patch.png'
import ThreedObject from '../../assets/3dObject.png'
import Fortune from '../../assets/fortune.png'
import run from '../../assets/run.png'
import backarrow from '../../assets/backarrow.png'
import tile from '../../assets/tile.png'
import taskmanager from '../../assets/taskmanager.png'
import notepad from '../../assets/notepad.png'
import store from '../../assets/store.png'
import layer from '../../assets/layer.png'



// style function for bg tap
export function StyleHide(index, tap, ObjectState) {
  const boxshadowstyleTrue = 'inset 1px 1px #000, 1px 1px #ffffffdd';
  const bgStyleTrue = '#dddcdc';

  const boxshadowstyleFalse = 'inset 1px 1px #ffffffdd, 1.5px 1.5px #000';
  const bgStyleFalse = '#b3b2b2';

  const setState = ObjectState();

  const namePassed = tap[index].split(' ').join('').toLowerCase();

  const foundItem = setState.find(item => {
    const itemName = item.name.split(' ').join('').toLowerCase();

    return itemName === namePassed
  })

  if (foundItem) {
    return foundItem.usestate.focusItem
      ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
      : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };
  }

  return {};

}


// Mapping image function
export function imageMapping (name, type) { 
  switch(name) {

    case 'About':
    case 'about':
      return About;

    case 'MyComputer':
    case 'My Computer':
      return MyComputer;

    case 'Resume':
      return Resume;

    case 'Mail':
      return Mail;

    case 'Project':
    case 'Picture':
    case 'Utility':
      return Project;

      case 'Nft':
      case 'Note':
        return file;
      
    case 'Winamp':
      return Winamp;

    case 'ResumeFile':
      return resumefile;

    case 'MineSweeper':
    case 'Mine Sweeper':
      return MineSweeper;

    case 'MSN':
      return MSN;

    case 'Internet':
    case 'WebResume':
      return ie;

    case 'Settings':
      return settings;

    case 'Hard Disk (C:)':
    case 'Hard Disk (D:)':
      return disk;

    case 'CD-ROM':
    case 'cd-rom':
      return rom;

    case 'Bitcoin':
    case 'bitcoin':
      return btc

    case name[0] === '0':
    case 'Photo':
    case 'Jpeg':
      return jpeg;
    
    case 'bin':
    case 'RecycleBin':
    case 'recyclebin':
      return binEmp;

    case 'ResetStorage':
      return reset;

    case 'Github':
      return github;

    case "paint":
    case "Paint":
      return paint;

    case "AiAgent":
      return aiagent;

    case "Cat":
    case "cat":
      return cat;

    case "patch":
    case "Patch":
      return patch;

    case "3dObject":
      return ThreedObject;

    case "Fortune":
    case "fortune":
      return Fortune;

    case "Run":
      return run;

    case "Exit":
      return backarrow;

    case "tile":
    case "Tile":
      return tile;

    case "TaskManager":
    case "taskmanager":
      return taskmanager;

    case "NewFolder":
    case "newfolder":
      return Project;

    case "NotePad":
    case "notepad":
      return notepad

    case "Store":
    case "store":
      return store

    case "PixelPic":
    case "pixelpic":
      return layer

    case "IE":
    case "ie":
      return ie;

    default:
      if(type === 'folder') {
        return Project;
      }
      if(type === 'notepad') {
        return notepad;
      }
      return null;
  }
}

// set photo to the current photo
const photoMap = {
  '1': firstPic,
  '2': secondPic,
  '3': thirdPic,
  '4': fourthPic,
  '5': fifthPic,
  '6': sixthPic,
  '7': seventhPic,
  '8': eighthPic,
  '9': ninthPic,
  '10': tenthPic,
  '11': eleventhPic,
};

export function handleDoubleClickPhotoOpen(name, setCurrentPhoto) {
  
  const normalized = String(parseInt(name, 10));

  const pic = photoMap[normalized];
  if (!pic) return;

  setCurrentPhoto({ name: normalized, pic });
}


export function handleDoubleClickPhotoOpenMobile(name, setCurrentPhoto, lastTapTime, setLastTapTime) {
  const now = Date.now();
  if (now - lastTapTime < 300) {
    
    const normalized = String(parseInt(name, 10));

  const pic = photoMap[normalized];
  if (!pic) return;

  setCurrentPhoto({ name: normalized, pic });
  }
  setLastTapTime(now);
  }

// click to open links
export function handleDoubleClickiframe(name, setOpenProjectExpand, setProjectUrl, setBackTrackIe, setForwardTrackIe) {


  switch(name) {
    case 'Nft': 
      setProjectUrl('https://opennft.netlify.app/');
      setBackTrackIe(prev => [...prev, 'https://opennft.netlify.app/']);
    break;

    case 'Note': 
      setProjectUrl('https://fullstack-stickynotes.netlify.app/'); 
        setBackTrackIe(prev => [...prev, 'https://fullstack-stickynotes.netlify.app/']);
    break;

    case 'AiAgent': 
        setProjectUrl('https://yuteoctober.github.io/AI_chatbot/'); 
        setBackTrackIe(prev => [...prev, 'https://yuteoctober.github.io/AI_chatbot/']);
    break;

    case '3dObject': 
        setProjectUrl('https://yuteoctober.github.io/3d_book/'); 
        setBackTrackIe(prev => [...prev, 'https://yuteoctober.github.io/3d_book/']);
    break;

    case 'Fortune': 
        setProjectUrl('https://yuteoctober.github.io/week_fortune/'); 
        setBackTrackIe(prev => [...prev, 'https://yuteoctober.github.io/week_fortune/']);
    break;

    case 'PixelPic': 
        setProjectUrl('https://yuteoctober.github.io/Pixel_pic/'); 
        setBackTrackIe(prev => [...prev, 'https://yuteoctober.github.io/Pixel_pic/']);
    break;

    case 'IE': 
        setProjectUrl('https://www.google.com/search?igu=1'); 
        setBackTrackIe(prev => [...prev, 'https://www.google.com/search?igu=1']);
    break;

    default: break; 
  }
}

export function handleDoubleTapiframeMobile(name, lastTapTime, setLastTapTime, setOpenProjectExpand, setProjectUrl, setBackTrackIe) {
  const now = Date.now();
  if (now - lastTapTime < 300) {
    switch(name) {
      case 'Nft': 
        setProjectUrl('https://opennft.netlify.app/'); 
        setBackTrackIe(prev => [...prev, 'https://opennft.netlify.app/']);
        break;
  
        case 'Note': 
        setProjectUrl('https://fullstack-stickynotes.netlify.app/'); 
        setBackTrackIe(prev => [...prev, 'https://fullstack-stickynotes.netlify.app/']);
        break;
  
        case 'AiAgent': 
        setProjectUrl('https://yuteoctober.github.io/AI_chatbot/'); 
        setBackTrackIe(prev => [...prev, 'https://yuteoctober.github.io/AI_chatbot/']);
        break;

        case '3dObject': 
        setProjectUrl('https://yuteoctober.github.io/3d_book/'); 
        setBackTrackIe(prev => [...prev, 'https://yuteoctober.github.io/3d_book/']);
        break;

        case 'Fortune': 
        setProjectUrl('https://yuteoctober.github.io/week_fortune/'); 
        setBackTrackIe(prev => [...prev, 'https://yuteoctober.github.io/week_fortune/']);
        break;

        case 'PixelPic': 
        setProjectUrl('https://yuteoctober.github.io/Pixel_pic/'); 
        setBackTrackIe(prev => [...prev, 'https://yuteoctober.github.io/Pixel_pic/']);
        break;

        case 'IE': 
        setProjectUrl('https://www.google.com/search?igu=1'); 
        setBackTrackIe(prev => [...prev, 'https://www.google.com/search?igu=1']);
        break;
  
      default: break; 
    }
  }
  setLastTapTime(now);
  }

export function handleDoubleClickEnterLink(name, handleshow) {

  switch(name) {
    case 'Nft': window.open('https://opennft.netlify.app/', '_blank'); break;
    case 'Note': window.open('https://fullstack-stickynotes.netlify.app/', '_blank'); break;
    case 'Type': window.open('https://yuteoctober.github.io/typingGame/', '_blank'); break;
    case '3dObject': window.open('https://yuteoctober.github.io/3d_book/', '_blank'); break;
    case 'Fortune': window.open('https://yuteoctober.github.io/week_fortune/', '_blank'); break;
    case 'Github': 
      handleshow('Github'); 
      break;

    default: break; 
  }
}


export function handleDoubleTapEnterMobile(name, lastTapTime, setLastTapTime, setOpenProjectExpand, setProjectUrl) {
const now = Date.now();
if (now - lastTapTime < 300) {
  switch(name) {
    case 'Nft': window.open('https://opennft.netlify.app/', '_blank'); break;
    case 'Note': window.open('https://fullstack-stickynotes.netlify.app/', '_blank'); break;
    case 'Type': window.open('https://yuteoctober.github.io/typingGame/', '_blank'); break;
    case 'Github': window.open('https://github.com/Yuteoctober/wins95Portfolio/', '_blank'); break;
    case '3dObject': window.open('https://yuteoctober.github.io/3d_book/', '_blank'); break;
    case 'Fortune': window.open('https://yuteoctober.github.io/week_fortune/', '_blank'); break;
    default: break; 
  }
}
setLastTapTime(now);
}

export function iconContainerSize(size) {
  switch(size) {
    case 1:
      return {width: '85px', height: '90px'};
    case 2:
      return {width: '80px', height: '85px'};
    case 3:
      return {width: '75px', height: '80px'};
    case 4:
      return {width: '70px', height: '75px'};
    case 5:
      return {width: '65px', height: '70px'};
    default:
      return {width: '65px', height: '70px'};
  }
}
export function iconImgSize(size) {
  switch(size) {
    case 1:
      return {width: '55px'};
    case 2:
      return {width: '50px'};
    case 3:
      return {width: '45px'};
    case 4:
      return {width: '40px'};
    case 5:
      return {width: '35px'};
    default:
      return {width: '35px'};
  }
}
export function iconTextSize(size) {
  switch(size) {
    case 1:
      return {fontSize: '16px', lineHeight: '13px', number: 1};
    case 2:
      return {fontSize: '15px', lineHeight: '12px', number: 2};
    case 3:
      return {fontSize: '14px', lineHeight: '12px', number: 3};
    case 4:
      return {fontSize: '13px', number: 4};
    case 5:
      return {fontSize: '12px', number: 5};
    default:
      return {fontSize: '12px', number: 5};
  }
}