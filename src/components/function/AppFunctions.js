import MyBio from '../../assets/pc.png'
import Resume from '../../assets/folder.png'
import Mail from '../../assets/mail.png'
import Project from '../../assets/regFolder.png'
import Winamp from '../../assets/winampIcon.png'
import resumefile from '../../assets/resume.png'
import MineSweeper from '../../assets/minesweepericon.png'
import MSN from '../../assets/msn.png'
import ie from '../../assets/ie.png'
import settings from '../../assets/setting.png'





// style function for bat tap
export function StyleHide(index, tap, ObjectState) {
  const boxshadowstyleTrue = 'inset 1px 1px #000, 1px 1px #ffffffdd';
  const bgStyleTrue = 'rgb(221, 220, 220)';

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

    case 'MyBio':
    case 'My Bio':
      return MyBio;

    case 'Resume':
      return Resume;

    case 'Mail':
      return Mail;

    case 'Project':
    case 'Nft':
    case 'Note':
    case 'Type':
      return Project;
      
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
      return ie;

    case 'Settings':
      return settings;

    default:
      return null;
  }
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

      case 'Type': 
      setProjectUrl('https://yuteoctober.github.io/typingGame/'); 
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
  
        case 'Type': 
        setProjectUrl('https://yuteoctober.github.io/typingGame/'); 
        break;
  
      default: break; 
    }
  }
  setLastTapTime(now);
  }

export function handleDoubleClickEnterLink(name, setOpenProjectExpand, setProjectUrl) {

  switch(name) {
    case 'Nft': window.open('https://opennft.netlify.app/', '_blank'); break;
    case 'Note': window.open('https://fullstack-stickynotes.netlify.app/', '_blank'); break;
    case 'Type': window.open('https://yuteoctober.github.io/typingGame/', '_blank'); break;
    case 'Github': window.open('https://github.com/Yuteoctober/wins95Portfolio/', '_blank'); break;
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

