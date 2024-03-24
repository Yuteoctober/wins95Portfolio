// function handleShow(name) {

//   switch (name) {
//       case 'My Bio': 
//           setMybioExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
//           setResumeExpand(prev => ({...prev, focusItem: false}));
//           setProjectExpand(prev => ({...prev, focusItem: false}));
//           setMailExpand(prev => ({...prev, focusItem: false}));
//           setNftExpand(prev => ({...prev, focusItem: false}));
//           setNoteExpand(prev => ({...prev, focusItem: false}));
//           setTypeExpand(prev => ({...prev, focusItem: false}));
//           setWinampExpand(prev => ({...prev, focusItem: false}));
//           setResumeFileExpand(prev => ({...prev, focusItem: false}));
//           if (tap.includes('My Bio')) {
//             setMybioExpand(prev => ({...prev, hide: false}))
//             return;
//           }
//           setTap(prevTap => [...prevTap, 'My Bio']); // put bio in []
//           setIconState(prevIcons => prevIcons.map(icon => ({ // unhighlight icon
//               ...icon,
//               focus: false
//           })));
//           break;

//       case 'Resume': 
//           setResumeExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
//           setMybioExpand(prev => ({...prev, focusItem: false}));
//           setProjectExpand(prev => ({...prev, focusItem: false}));
//           setMailExpand(prev => ({...prev, focusItem: false}));
//           setNftExpand(prev => ({...prev, focusItem: false}));
//           setNoteExpand(prev => ({...prev, focusItem: false}));
//           setTypeExpand(prev => ({...prev, focusItem: false}));
//           setWinampExpand(prev => ({...prev, focusItem: false}));
//           setResumeFileExpand(prev => ({...prev, focusItem: false}));
//           if(tap.includes('Resume')) return;
//           setTap(prevTap => [...prevTap, 'Resume']);
//           setIconState(prevIcons => prevIcons.map(icon => ({
//               ...icon,
//               focus: false
//           })));
//           break;

//       case 'Project': 
//           setProjectExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
//           setResumeExpand(prev => ({...prev, focusItem: false}));
//           setMybioExpand(prev => ({...prev, focusItem: false}));
//           setMailExpand(prev => ({...prev, focusItem: false}));
//           setNftExpand(prev => ({...prev, focusItem: false}));
//           setNoteExpand(prev => ({...prev, focusItem: false}));
//           setTypeExpand(prev => ({...prev, focusItem: false}));
//           setWinampExpand(prev => ({...prev, focusItem: false}));
//           setResumeFileExpand(prev => ({...prev, focusItem: false}));
//           if(tap.includes('Project')) return;
//           setTap(prevTap => [...prevTap, 'Project'])
//           setIconState(prevIcons => prevIcons.map(icon => ({
//             ...icon,
//             focus: false
//         })));
//         break;

//       case 'Mail': 
//           setMailExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
//           setResumeExpand(prev => ({...prev, focusItem: false}));
//           setMybioExpand(prev => ({...prev, focusItem: false}));
//           setProjectExpand(prev => ({...prev, focusItem: false}));
//           setNftExpand(prev => ({...prev, focusItem: false}));
//           setNoteExpand(prev => ({...prev, focusItem: false}));
//           setTypeExpand(prev => ({...prev, focusItem: false}));
//           setWinampExpand(prev => ({...prev, focusItem: false}));
//           setResumeFileExpand(prev => ({...prev, focusItem: false}));
//           clippySendemailfunction()
//           if(tap.includes('Mail')) return;
//           setTap(prevTap => [...prevTap, 'Mail'])
//           setIconState(prevIcons => prevIcons.map(icon => ({
//             ...icon,
//             focus: false
//         })));
//         break;

//       case 'Nft': 
//           setNftExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
//           setResumeExpand(prev => ({...prev, focusItem: false}));
//           setMybioExpand(prev => ({...prev, focusItem: false}));
//           setProjectExpand(prev => ({...prev, focusItem: false}));
//           setMailExpand(prev => ({...prev, focusItem: false}));
//           setNoteExpand(prev => ({...prev, focusItem: false}));
//           setTypeExpand(prev => ({...prev, focusItem: false}));
//           setWinampExpand(prev => ({...prev, focusItem: false}));
//           setResumeFileExpand(prev => ({...prev, focusItem: false}));
//       if(tap.includes('Nft')) return;
//           setTap(prevTap => [...prevTap, 'Nft'])
//           setIconState(prevIcons => prevIcons.map(icon => ({
//             ...icon,
//             focus: false
//         })));
//         break;

//       case 'Note': 
//           setNoteExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
//           setResumeExpand(prev => ({...prev, focusItem: false}));
//           setMybioExpand(prev => ({...prev, focusItem: false}));
//           setProjectExpand(prev => ({...prev, focusItem: false}));
//           setNftExpand(prev => ({...prev, focusItem: false}));
//           setMailExpand(prev => ({...prev, focusItem: false}));
//           setTypeExpand(prev => ({...prev, focusItem: false}));
//           setWinampExpand(prev => ({...prev, focusItem: false}));
//           setResumeFileExpand(prev => ({...prev, focusItem: false}));
//       if(tap.includes('Note')) return;
//           setTap(prevTap => [...prevTap, 'Note'])
//           setIconState(prevIcons => prevIcons.map(icon => ({
//             ...icon,
//             focus: false
//       })));
//       break;

//       case 'Type': 
//           setTypeExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
//           setResumeExpand(prev => ({...prev, focusItem: false}));
//           setMybioExpand(prev => ({...prev, focusItem: false}));
//           setProjectExpand(prev => ({...prev, focusItem: false}));
//           setNftExpand(prev => ({...prev, focusItem: false}));
//           setNoteExpand(prev => ({...prev, focusItem: false}));
//           setMailExpand(prev => ({...prev, focusItem: false}));
//           setWinampExpand(prev => ({...prev, focusItem: false}));
//           setResumeFileExpand(prev => ({...prev, focusItem: false}));
//       if(tap.includes('Type')) return;
//           setTap(prevTap => [...prevTap, 'Type'])
//           setIconState(prevIcons => prevIcons.map(icon => ({
//             ...icon,
//             focus: false
//       })));
//       break;

//       case 'Winamp': 
//       if (WinampExpand.hide) {
//         const webampElement = document.querySelector('#webamp');
//         if (webampElement) {
//             webampElement.style.opacity = 1;
//             webampElement.style.pointerEvents = 'auto';
//             webampElement.style.touchAction = 'auto'
//             setWinampExpand(prev => ({...prev, hide: false}));
//         }
//     }     clippySongFunction() // call clippy function to show
//           setWinampExpand(prev => ({...prev, show: true, focusItem: true, focus: false}));
//           setResumeExpand(prev => ({...prev, focusItem: false}));
//           setMybioExpand(prev => ({...prev, focusItem: false}));
//           setProjectExpand(prev => ({...prev, focusItem: false}));
//           setNftExpand(prev => ({...prev, focusItem: false}));
//           setNoteExpand(prev => ({...prev, focusItem: false}));
//           setMailExpand(prev => ({...prev, focusItem: false}));
//           setTypeExpand(prev => ({...prev, focusItem: false}));
//           setResumeFileExpand(prev => ({...prev, focusItem: false}));
//       if(tap.includes('Winamp')) return;
//           setTap(prevTap => [...prevTap, 'Winamp'])
//           setIconState(prevIcons => prevIcons.map(icon => ({
//           ...icon,
//           focus: false
//     })));
//     break;

//     case 'ResumeFile': 
//         setResumeFileExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
//         setResumeExpand(prev => ({...prev, focusItem: false}));
//         setMybioExpand(prev => ({...prev, focusItem: false}));
//         setProjectExpand(prev => ({...prev, focusItem: false}));
//         setNftExpand(prev => ({...prev, focusItem: false}));
//         setNoteExpand(prev => ({...prev, focusItem: false}));
//         setMailExpand(prev => ({...prev, focusItem: false}));
//         setWinampExpand(prev => ({...prev, focusItem: false}));
//         setTypeExpand(prev => ({...prev, focusItem: false}));
//     if(tap.includes('ResumeFile')) return;
//         setTap(prevTap => [...prevTap, 'ResumeFile'])
//         setIconState(prevIcons => prevIcons.map(icon => ({
//           ...icon,
//           focus: false
//     })));
//     break;

//   }
// }

// function handleShowMobile(name) {
// const now = Date.now()
// if (now - lastTapTime < 300) {
//   switch (name) {
//     case 'My Bio': 
//       setMybioExpand(prev => ({...prev, show: true, focusItem: true, hide: false})); 
//       setResumeExpand(prev => ({...prev, focusItem: false})); 
//       setProjectExpand(prev => ({...prev, focusItem: false}));
//       setMailExpand(prev => ({...prev, focusItem: false}));
//       setNftExpand(prev => ({...prev, focusItem: false}));
//       setNoteExpand(prev => ({...prev, focusItem: false}));
//       setTypeExpand(prev => ({...prev, focusItem: false}));
//       setWinampExpand(prev => ({...prev, focusItem: false}));
//       setResumeFileExpand(prev => ({...prev, focusItem: false}));
//     if(tap.includes('My Bio')) return;
//       setTap(prevTap => [...prevTap, 'My Bio'])
//       setIconState(prevIcons => prevIcons.map(icon => ({
//         ...icon,
//         focus: false
//     })));
//     break;

//     case 'Resume': 
//       setResumeExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
//       setMybioExpand(prev => ({...prev, focusItem: false}));
//       setProjectExpand(prev => ({...prev, focusItem: false}));
//       setMailExpand(prev => ({...prev, focusItem: false}));
//       setNftExpand(prev => ({...prev, focusItem: false}));
//       setNoteExpand(prev => ({...prev, focusItem: false}));
//       setTypeExpand(prev => ({...prev, focusItem: false}));
//       setWinampExpand(prev => ({...prev, focusItem: false}));
//       setResumeFileExpand(prev => ({...prev, focusItem: false}));
//     if(tap.includes('Resume')) return;
//       setTap(prevTap => [...prevTap, 'Resume'])
//       setIconState(prevIcons => prevIcons.map(icon => ({
//         ...icon,
//         focus: false
//     })));
//     break;

//     case 'Project': 
//       setProjectExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
//       setResumeExpand(prev => ({...prev, focusItem: false}));
//       setMybioExpand(prev => ({...prev, focusItem: false}));
//       setMailExpand(prev => ({...prev, focusItem: false}));
//       setNftExpand(prev => ({...prev, focusItem: false}));
//       setNoteExpand(prev => ({...prev, focusItem: false}));
//       setTypeExpand(prev => ({...prev, focusItem: false}));
//       setWinampExpand(prev => ({...prev, focusItem: false}));
//       setResumeFileExpand(prev => ({...prev, focusItem: false}));
//     if(tap.includes('Project')) return;
//       setTap(prevTap => [...prevTap, 'Project'])
//       setIconState(prevIcons => prevIcons.map(icon => ({
//         ...icon,
//         focus: false
//     })));
//     break;

//     case 'Mail': 
//         setMailExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
//         setResumeExpand(prev => ({...prev, focusItem: false}));
//         setMybioExpand(prev => ({...prev, focusItem: false}));
//         setProjectExpand(prev => ({...prev, focusItem: false}));
//         setNftExpand(prev => ({...prev, focusItem: false}));
//         setNoteExpand(prev => ({...prev, focusItem: false}));
//         setTypeExpand(prev => ({...prev, focusItem: false}));
//         setWinampExpand(prev => ({...prev, focusItem: false}));
//         setResumeFileExpand(prev => ({...prev, focusItem: false}));
//         clippySendemailfunction()
//     if(tap.includes('Mail')) return;
//         setTap(prevTap => [...prevTap, 'Mail'])
//         setIconState(prevIcons => prevIcons.map(icon => ({
//           ...icon,
//           focus: false
//     })));
//     break;

//     case 'Nft': 
//         setNftExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
//         setResumeExpand(prev => ({...prev, focusItem: false}));
//         setMybioExpand(prev => ({...prev, focusItem: false}));
//         setProjectExpand(prev => ({...prev, focusItem: false}));
//         setMailExpand(prev => ({...prev, focusItem: false}));
//         setNoteExpand(prev => ({...prev, focusItem: false}));
//         setTypeExpand(prev => ({...prev, focusItem: false}));
//         setWinampExpand(prev => ({...prev, focusItem: false}));
//         setResumeFileExpand(prev => ({...prev, focusItem: false}));
//     if(tap.includes('Nft')) return;
//         setTap(prevTap => [...prevTap, 'Nft'])
//         setIconState(prevIcons => prevIcons.map(icon => ({
//           ...icon,
//           focus: false
//     })));
//     break;

//     case 'Note': 
//         setNoteExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
//         setResumeExpand(prev => ({...prev, focusItem: false}));
//         setMybioExpand(prev => ({...prev, focusItem: false}));
//         setProjectExpand(prev => ({...prev, focusItem: false}));
//         setNftExpand(prev => ({...prev, focusItem: false}));
//         setMailExpand(prev => ({...prev, focusItem: false}));
//         setTypeExpand(prev => ({...prev, focusItem: false}));
//         setWinampExpand(prev => ({...prev, focusItem: false}));
//         setResumeFileExpand(prev => ({...prev, focusItem: false}));
//     if(tap.includes('Note')) return;
//         setTap(prevTap => [...prevTap, 'Note'])
//         setIconState(prevIcons => prevIcons.map(icon => ({
//           ...icon,
//           focus: false
//     })));
//     break;

//     case 'Type': 
//         setTypeExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
//         setResumeExpand(prev => ({...prev, focusItem: false}));
//         setMybioExpand(prev => ({...prev, focusItem: false}));
//         setProjectExpand(prev => ({...prev, focusItem: false}));
//         setNftExpand(prev => ({...prev, focusItem: false}));
//         setNoteExpand(prev => ({...prev, focusItem: false}));
//         setMailExpand(prev => ({...prev, focusItem: false}));
//         setWinampExpand(prev => ({...prev, focusItem: false}));
//         setResumeFileExpand(prev => ({...prev, focusItem: false}));
//     if(tap.includes('Type')) return;
//         setTap(prevTap => [...prevTap, 'Type'])
//         setIconState(prevIcons => prevIcons.map(icon => ({
//           ...icon,
//           focus: false
//     })));
//     break;

//     case 'Winamp': 
//     if (WinampExpand.hide) {
//       const webampElement = document.querySelector('#webamp');
//       if (webampElement) {
//           webampElement.style.opacity = 1;
//           webampElement.style.pointerEvents = 'auto';
//           webampElement.style.touchAction = 'auto'
//           setWinampExpand(prev => ({...prev, hide: false}));
//       }
//   }     
//         clippySongFunction() // call clippy function to show
//         setWinampExpand(prev => ({...prev, show: true, focusItem: true, focus: false}));
//         setResumeExpand(prev => ({...prev, focusItem: false}));
//         setMybioExpand(prev => ({...prev, focusItem: false}));
//         setProjectExpand(prev => ({...prev, focusItem: false}));
//         setNftExpand(prev => ({...prev, focusItem: false}));
//         setNoteExpand(prev => ({...prev, focusItem: false}));
//         setMailExpand(prev => ({...prev, focusItem: false}));
//         setTypeExpand(prev => ({...prev, focusItem: false}));
//         setResumeFileExpand(prev => ({...prev, focusItem: false}));
//     if(tap.includes('Winamp')) return;
//         setTap(prevTap => [...prevTap, 'Winamp'])
//         setIconState(prevIcons => prevIcons.map(icon => ({
//           ...icon,
//           focus: false
//     })));
//     break;

//     case 'ResumeFile': 
//         setResumeFileExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
//         setResumeExpand(prev => ({...prev, focusItem: false}));
//         setMybioExpand(prev => ({...prev, focusItem: false}));
//         setProjectExpand(prev => ({...prev, focusItem: false}));
//         setNftExpand(prev => ({...prev, focusItem: false}));
//         setNoteExpand(prev => ({...prev, focusItem: false}));
//         setMailExpand(prev => ({...prev, focusItem: false}));
//         setWinampExpand(prev => ({...prev, focusItem: false}));
//         setTypeExpand(prev => ({...prev, focusItem: false}));
//     if(tap.includes('ResumeFile')) return;
//         setTap(prevTap => [...prevTap, 'ResumeFile'])
//         setIconState(prevIcons => prevIcons.map(icon => ({
//           ...icon,
//           focus: false
//     })));
//     break;

//     }
// }  
// setLastTapTime(now)
// }


// function handleHideFolder(index) {
    //     switch(tap[index]) {
    //         case 'My Bio':
    //             if(MybioExpand.hide) {
    //                 setMybioExpand(prev => ({...prev, hide: false}));
    //             }
    //             setMybioExpand(prev => ({...prev, focusItem: true}));
    //             setResumeExpand(prev => ({...prev, focusItem: false}));
    //             setProjectExpand(prev => ({...prev, focusItem: false}));
    //             setMailExpand(prev => ({...prev, focusItem: false}));
    //             setNftExpand(prev => ({...prev, focusItem: false}));
    //             setNoteExpand(prev => ({...prev, focusItem: false}));
    //             setTypeExpand(prev => ({...prev, focusItem: false}));
    //             setWinampExpand(prev => ({...prev, focusItem: false}));
    //             setResumeFileExpand(prev => ({...prev, focusItem: false}));
    //             break;
                
    //         case 'Resume':
    //             if(ResumeExpand.hide) {
    //                 setResumeExpand(prev => ({...prev, hide: false}));
    //             }
    //             setResumeExpand(prev => ({...prev, focusItem: true}));
    //             setMybioExpand(prev => ({...prev, focusItem: false}));
    //             setProjectExpand(prev => ({...prev, focusItem: false}));
    //             setMailExpand(prev => ({...prev, focusItem: false}));
    //             setNftExpand(prev => ({...prev, focusItem: false}));
    //             setNoteExpand(prev => ({...prev, focusItem: false}));
    //             setTypeExpand(prev => ({...prev, focusItem: false}));
    //             setWinampExpand(prev => ({...prev, focusItem: false}));
    //             setResumeFileExpand(prev => ({...prev, focusItem: false}));
    //             break;
    
    //         case 'Project':
    //             if(ProjectExpand.hide) {
    //                 setProjectExpand(prev => ({...prev, hide: false}));
    //             }
    //             setProjectExpand(prev => ({...prev, focusItem: true}));
    //             setMybioExpand(prev => ({...prev, focusItem: false}));
    //             setResumeExpand(prev => ({...prev, focusItem: false}));
    //             setMailExpand(prev => ({...prev, focusItem: false}));
    //             setNftExpand(prev => ({...prev, focusItem: false}));
    //             setNoteExpand(prev => ({...prev, focusItem: false}));
    //             setTypeExpand(prev => ({...prev, focusItem: false}));
    //             setWinampExpand(prev => ({...prev, focusItem: false}));
    //             setResumeFileExpand(prev => ({...prev, focusItem: false}));
    //             break;
    
    //         case 'Mail':
    //             if(MailExpand.hide) {
    //                 setMailExpand(prev => ({...prev, hide: false}));
    //             }
    //             setMailExpand(prev => ({...prev, focusItem: true}));
    //             setMybioExpand(prev => ({...prev, focusItem: false}));
    //             setResumeExpand(prev => ({...prev, focusItem: false}));
    //             setProjectExpand(prev => ({...prev, focusItem: false}));
    //             setNftExpand(prev => ({...prev, focusItem: false}));
    //             setNoteExpand(prev => ({...prev, focusItem: false}));
    //             setTypeExpand(prev => ({...prev, focusItem: false}));
    //             setWinampExpand(prev => ({...prev, focusItem: false}));
    //             setResumeFileExpand(prev => ({...prev, focusItem: false}));
    //             break;

    //         case 'Nft':
    //             if(NftExpand.hide) {
    //                 setNftExpand(prev => ({...prev, hide: false}));
    //             }
    //             setNftExpand(prev => ({...prev, focusItem: true}));
    //             setMybioExpand(prev => ({...prev, focusItem: false}));
    //             setResumeExpand(prev => ({...prev, focusItem: false}));
    //             setProjectExpand(prev => ({...prev, focusItem: false}));
    //             setMailExpand(prev => ({...prev, focusItem: false}));
    //             setNoteExpand(prev => ({...prev, focusItem: false}));
    //             setTypeExpand(prev => ({...prev, focusItem: false}));
    //             setWinampExpand(prev => ({...prev, focusItem: false}));
    //             setResumeFileExpand(prev => ({...prev, focusItem: false}));
    //             break;

    //         case 'Note':
    //             if(NoteExpand.hide) {
    //                 setNoteExpand(prev => ({...prev, hide: false}));
    //             }
    //             setNoteExpand(prev => ({...prev, focusItem: true}));
    //             setMybioExpand(prev => ({...prev, focusItem: false}));
    //             setResumeExpand(prev => ({...prev, focusItem: false}));
    //             setProjectExpand(prev => ({...prev, focusItem: false}));
    //             setMailExpand(prev => ({...prev, focusItem: false}));
    //             setNftExpand(prev => ({...prev, focusItem: false}));
    //             setTypeExpand(prev => ({...prev, focusItem: false}));
    //             setWinampExpand(prev => ({...prev, focusItem: false}));
    //             setResumeFileExpand(prev => ({...prev, focusItem: false}));
    //             break;

    //         case 'Type':
    //             if(TypeExpand.hide) {
    //                 setTypeExpand(prev => ({...prev, hide: false}));
    //             }
    //             setTypeExpand(prev => ({...prev, focusItem: true}));
    //             setMybioExpand(prev => ({...prev, focusItem: false}));
    //             setResumeExpand(prev => ({...prev, focusItem: false}));
    //             setProjectExpand(prev => ({...prev, focusItem: false}));
    //             setMailExpand(prev => ({...prev, focusItem: false}));
    //             setNoteExpand(prev => ({...prev, focusItem: false}));
    //             setNftExpand(prev => ({...prev, focusItem: false}));
    //             setWinampExpand(prev => ({...prev, focusItem: false}));
    //             setResumeFileExpand(prev => ({...prev, focusItem: false}));
    //             break;

    //         case 'Winamp':
    //             if (WinampExpand.hide) {
    //                 const webampElement = document.querySelector('#webamp');
    //                 if (webampElement) {
    //                     webampElement.style.opacity = 1;
    //                     webampElement.style.pointerEvents = 'auto';
    //                     webampElement.style.touchAction = 'auto'
    //                     setWinampExpand(prev => ({...prev, hide: false}));
    //                 }
    //             } 
    //             setWinampExpand(prev => ({...prev, focusItem: true}));
    //             setMybioExpand(prev => ({...prev, focusItem: false}));
    //             setResumeExpand(prev => ({...prev, focusItem: false}));
    //             setProjectExpand(prev => ({...prev, focusItem: false}));
    //             setMailExpand(prev => ({...prev, focusItem: false}));
    //             setNoteExpand(prev => ({...prev, focusItem: false}));
    //             setNftExpand(prev => ({...prev, focusItem: false}));
    //             setTypeExpand(prev => ({...prev, focusItem: false}));
    //             setResumeFileExpand(prev => ({...prev, focusItem: false}));
    //             break;

    //             case 'ResumeFile':
    //             if(ResumeFileExpand.hide) {
    //                 setResumeFileExpand(prev => ({...prev, hide: false}));
    //             }
    //             setResumeFileExpand(prev => ({...prev, focusItem: true}));
    //             setMybioExpand(prev => ({...prev, focusItem: false}));
    //             setResumeExpand(prev => ({...prev, focusItem: false}));
    //             setProjectExpand(prev => ({...prev, focusItem: false}));
    //             setMailExpand(prev => ({...prev, focusItem: false}));
    //             setNoteExpand(prev => ({...prev, focusItem: false}));
    //             setNftExpand(prev => ({...prev, focusItem: false}));
    //             setWinampExpand(prev => ({...prev, focusItem: false}));
    //             setTypeExpand(prev => ({...prev, focusItem: false}));
    //             break;


    //     }
    // }


     //     setIconState(prevIcons => prevIcons.map(icon => ({
    //       ...icon,
    //       focus: false
    //     })));
    //     setNoteExpand(prev => ({...prev, focusItem: true}))
    //     setMybioExpand(prev => ({...prev, focusItem: false}))
    //     setProjectExpand(prev => ({...prev, focusItem: false}))
    //     setMailExpand(prev => ({...prev, focusItem: false}))
    //     setResumeExpand(prev => ({...prev, focusItem: false}))
    //     setNftExpand(prev => ({...prev, focusItem: false}))
    //     setTypeExpand(prev => ({...prev, focusItem: false}))
    //     setWinampExpand(prev => ({...prev, focusItem: false, focus: false}))
    //     setResumeFileExpand(prev => ({...prev, focusItem: false}))
    // }