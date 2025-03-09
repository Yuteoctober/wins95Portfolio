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
export function imageMapping (name) { 
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



    default:
      return null;
  }
}

// set photo to the current photo
export function handleDoubleClickPhotoOpen(name, setCurrentPhoto) {

    switch(name) {
      case '001': 
        setCurrentPhoto({name: name, pic: firstPic}); 
        break;
  
      case '002': 
        setCurrentPhoto({name: name, pic: secondPic}); 
        break;
      
      case '003':
        setCurrentPhoto({name: name, pic: thirdPic});
        break;
      
      case '004':
        setCurrentPhoto({name: name, pic: fourthPic});
        break;

      case '005':
        setCurrentPhoto({name: name, pic: fifthPic});
        break;

      case '006':
        setCurrentPhoto({name: name, pic: sixthPic});
        break;

      case '007':
        setCurrentPhoto({name: name, pic: seventhPic});
        break;

      case '008':
        setCurrentPhoto({name: name, pic: eighthPic});
        break; 
      
      case '009':
        setCurrentPhoto({name: name, pic: ninthPic});
        break;

      case '010':
        setCurrentPhoto({name: name, pic: tenthPic});
        break;

      case '011':
        setCurrentPhoto({name: name, pic: eleventhPic});
        break;

    default: break; 
  }
}

export function handleDoubleClickPhotoOpenMobile(name, setCurrentPhoto, lastTapTime, setLastTapTime) {
  const now = Date.now();
  if (now - lastTapTime < 300) {
    
    switch(name) {
      case '001': 
        setCurrentPhoto({name: name, pic: firstPic}); 
        break;
  
      case '002': 
        setCurrentPhoto({name: name, pic: secondPic}); 
        break;

      case '003':
         setCurrentPhoto({name: name, pic: thirdPic});
        break;
        
      case '004':
        setCurrentPhoto({name: name, pic: fourthPic});
        break;
  
      case '005':
        setCurrentPhoto({name: name, pic: fifthPic});
        break;
  
      case '006':
        setCurrentPhoto({name: name, pic: sixthPic});
        break;

      case '007':
        setCurrentPhoto({name: name, pic: seventhPic});
       break;
  
      case '008':
       setCurrentPhoto({name: name, pic: eighthPic});
      break; 
        
      case '009':
       setCurrentPhoto({name: name, pic: ninthPic});
      break;
  
      case '010':
       setCurrentPhoto({name: name, pic: tenthPic});
      break;
  
      case '011':
       setCurrentPhoto({name: name, pic: eleventhPic});
      break;
  
      default: break;
    }
  }
  setLastTapTime(now);
  }

// click to open links
export function handleDoubleClickiframe(name, setOpenProjectExpand, setProjectUrl) {

  switch(name) {
    case 'Nft': 
      setProjectUrl('https://opennft.netlify.app/'); 
    break;

    case 'Note': 
      setProjectUrl('https://fullstack-stickynotes.netlify.app/'); 
    break;

    case 'AiAgent': 
        setProjectUrl('https://yuteoctober.github.io/AI_chatbot/'); 
    break;

    default: break; 
  }
}

export function handleDoubleTapiframeMobile(name, lastTapTime, setLastTapTime, setOpenProjectExpand, setProjectUrl) {
  const now = Date.now();
  if (now - lastTapTime < 300) {
    switch(name) {
      case 'Nft': 
        setProjectUrl('https://opennft.netlify.app/'); 
        break;
  
        case 'Note': 
        setProjectUrl('https://fullstack-stickynotes.netlify.app/'); 
        break;
  
        case 'AiAgent': 
        setProjectUrl('https://yuteoctober.github.io/AI_chatbot/'); 
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