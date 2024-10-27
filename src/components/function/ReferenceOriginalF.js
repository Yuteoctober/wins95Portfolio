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

    // {
    //     display: NoteExpand.show ? 'block' : '',
    //     maxWidth: 'none',
    //     width: '100%',
    //     height: 'calc(100% - 37px)',
    //     left: `${NoteExpand.x <= 0 ? Math.abs(NoteExpand.x)*2 + NoteExpand.x : -NoteExpand.x}px`,
    //     top: `${NoteExpand.y <= 0 ? Math.abs(NoteExpand.y)*2 + NoteExpand.y : -NoteExpand.y}px`,
    //     opacity: NoteExpand.hide ? '0' : '1',
    //     zIndex: NoteExpand.hide ? '-1' : (NoteExpand.focusItem ? '999' : '3'),
    //     pointerEvents: NoteExpand.hide ? 'none' : 'auto',
    //     resize: NoteExpand.expand ? 'none' : '',
    // } : { 
    //     display: NoteExpand.show ? 'block' : '',
    //     opacity: NoteExpand.hide ? '0' : '1',
    //     zIndex: NoteExpand.hide ? '-1' : (NoteExpand.focusItem ? '999' : '3'),
    //     pointerEvents: NoteExpand.hide ? 'none' : 'auto'
        
    // }

    //   switch (tap[index]) {

//     case 'My Bio':
//       return MybioExpand.focusItem
//         ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
//         : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };

//     case 'Resume':
//       return ResumeExpand.focusItem
//         ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
//         : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };

//     case 'Project':
//       return ProjectExpand.focusItem
//         ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
//         : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };

//     case 'Mail':
//       return MailExpand.focusItem
//         ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
//         : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };

//     case 'Nft':
//       return NftExpand.focusItem
//         ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
//         : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };

//     case 'Note':
//       return NoteExpand.focusItem
//         ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
//         : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };

//     case 'Type':
//       return TypeExpand.focusItem
//         ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
//         : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };

//     case 'Winamp':
//       return WinampExpand.focusItem
//         ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
//         : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };

//     case 'ResumeFile':
//       return ResumeFileExpand.focusItem
//         ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
//         : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };

//     default:
//       return {};
//   }
// }




// function iconFocusToFalse(name) { //set all icon to false when other is clicked

//     const allSetItems = ObjectState();
//     const passedName = name.toLowerCase().split(' ').join('')
  
//     allSetItems.forEach(item => {
//       const itemName = item.name.toLowerCase().split(' ').join('')
  
//       iconState.forEach(icon => {
//         const iconName = icon.name.split(' ').join('').toLowerCase()
    
//       if(passedName === itemName || passedName === iconName) {
  
//         const updatedIcons = iconState.map(icon => ({
//           ...icon,
//           focus: passedName === itemName || passedName === iconName
//         }));
//         setIconState(updatedIcons)
  
//         if(passedName === 'nft' || passedName === 'note' || passedName === 'type') {
//           setProjectExpand(prev => ({...prev, item_1Focus: passedName === 'nft', 
//           item_2Focus: passedName === 'note', item_Focus: passedName === 'type'}))
//         }
//         if(passedName === 'resume') {
//           item.setter(prev => ({...prev, item_1Focus: passedName === 'resume'}))
//         }
//         if(passedName === 'winmap') {
//           item.setter(prev => ({...prev, focus: passedName === 'resume'}))
//         }
//       }
//       })
//     })
//   }
  

// const handleFocusIcon = (name) => { 
//     const updatedFocus = iconState.map(icon => ({
//       ...icon,
//       focus: icon.name === name
//     }));
//     setIconState(updatedFocus);
//     setProjectExpand(prev => ({...prev, item_1Focus: false, item_2Focus: false, item_3Focus: false}));
//     setResumeExpand(prev => ({...prev, item_1Focus: false}));
//     setNftExpand(prev => ({...prev, item_1Focus: false}));
//     setNoteExpand(prev => ({...prev, item_1Focus: false}));
//     setTypeExpand(prev => ({...prev, item_1Focus: false}));
//     setWinampExpand(prev => ({...prev, focus: false}));
//     // setResumeFileExpand(prev => ({...prev, item_1Focus: false}));
//   };

//   // Main useEffect to fetch chat data every 5 seconds
//   useEffect(() => {

//   async function fetchChatData() {
//     try {
//       const response = await axios.get(`https://notebackend4.onrender.com/chat/getchat/`, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Access-Control-Allow-Origin': '*'
//         }
//       });
//       const updatedChat = response.data.chat;
//       const sessionKey = response.data.key


//       // Only update chatData if the chat length has changed
//       if (updatedChat.length !== chatData.length || KeyChatSession !== sessionKey) {


//         if (updatedChat.length - chatData.length === 1 && (!MSNExpand.show || MSNExpand.hide)) {
//           setNotiOn(false);


//           setTimeout(() => {
//             clearTimeout(clearNotiTimeOut)
//             setNotiOn(true);
//             setNewMessage('msn');  // Set the new message when turning notification back on
//           }, 1000);
//         }
//         setChatData(updatedChat);
//         setKeyChatSession(sessionKey);

//         setTimeout(() => {
//           endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
//         }, 1000);

//       }
//       setChatDown(false)
//     } catch (error) {
//       console.error('Error fetching chat:', error);
//       setChatDown(true)
//     }
//   }
//   // Initial fetch and set up interval to fetch every 5 seconds
//   fetchChatData();

//   const intervalId = setInterval(fetchChatData, 5000);

//   return () => clearInterval(intervalId); // Clear interval on component unmount

// }, [chatData, KeyChatSession, MSNExpand]); // run useeffect when chatData change


//   // Function to create a new chat message
//   async function createChat() {

//     const filter = new Filter();

//     setTimeout(() => {
//       setSendDisable(false)
//     }, 20000);

//     setSendDisable(true)
//   if (chatValue.trim().length === 0) {
//     setSendDisable(false)
//     return;
//   }

//   const offendedWords = badword() // imported another file

//   offendedWords.forEach(word => filter.addWords(word))

//   const newChatVal = filter.clean(chatValue);

//   const payload = { chat: newChatVal, key: KeyChatSession, mouse: detectMouse, touch: isTouchDevice };

//   if (userNameValue.trim().length > 0) {
//     const cleanedName = filter.clean(userNameValue)
//     payload.name = cleanedName;
//   }

//   try {
//     const response = await axios.post('https://notebackend4.onrender.com/chat/createChat/', payload);
//     setChatValue('');
//     setSendDisable(false)
//     console.log(sendDisable)
//     console.log('Chat created successfully:', response.data.chat);

//     // Fetch the chat data after creating a new chat
//     await getChat();
//     // Scroll to the end of messages
//     setTimeout(() => {
//       endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 1000);
//   } catch (error) {
//     console.error('Error creating chat:', error.response ? error.response.data : error.message);
//   }
// }
