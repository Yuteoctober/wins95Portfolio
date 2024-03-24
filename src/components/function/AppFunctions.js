import MyBio from '../../assets/pc.png'
import Resume from '../../assets/folder.png'
import Mail from '../../assets/mail.png'
import Project from '../../assets/regFolder.png'
import Winamp from '../../assets/winampIcon.png'
import resumefile from '../../assets/resume.png'



// style function for bat tap
export function StyleHide(index, tap,  MybioExpand, ResumeExpand, ProjectExpand, MailExpand, NftExpand, NoteExpand, TypeExpand, WinampExpand, ResumeFileExpand) {
  const boxshadowstyleTrue = 'inset 1px 1px #000, 1px 1px #ffffffdd';
  const bgStyleTrue = 'rgb(221, 220, 220)';

  const boxshadowstyleFalse = 'inset 1px 1px #ffffffdd, 1.5px 1.5px #000';
  const bgStyleFalse = '#b3b2b2';

  switch (tap[index]) {
    case 'My Bio':
      return MybioExpand.focusItem
        ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
        : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };

    case 'Resume':
      return ResumeExpand.focusItem
        ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
        : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };

    case 'Project':
      return ProjectExpand.focusItem
        ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
        : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };

    case 'Mail':
      return MailExpand.focusItem
        ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
        : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };

    case 'Nft':
      return NftExpand.focusItem
        ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
        : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };

    case 'Note':
      return NoteExpand.focusItem
        ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
        : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };

    case 'Type':
      return TypeExpand.focusItem
        ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
        : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };

    case 'Winamp':
      return WinampExpand.focusItem
        ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
        : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };

    case 'ResumeFile':
      return ResumeFileExpand.focusItem
        ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
        : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };

    default:
      return {};
  }
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

    default:
      return null;
  }
}

// click to open links

export function handleDoubleClickEnterLink(name) {

  switch(name) {
    case 'Nft': window.open('https://opennft.netlify.app/', '_blank'); break;
    case 'Note': window.open('https://fullstack-stickynotes.netlify.app/', '_blank'); break;
    case 'Type': window.open('https://yuteoctober.github.io/typingGame/', '_blank'); break;
    case 'Github': window.open('https://github.com/Yuteoctober/wins95Portfolio/', '_blank'); break;
    default: break; 
  }
}


export function handleDoubleTapEnterMobile(name, lastTapTime, setLastTapTime) {
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