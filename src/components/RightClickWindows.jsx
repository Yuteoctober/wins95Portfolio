import { useEffect, useRef, useContext, useState } from 'react';
import UseContext from '../Context';
import '../css/RightClickWindows.css';
import { BsFillCaretRightFill } from "react-icons/bs";

function RightClickWindows() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const [restoreIcon, setRestoreIcon] = useState(0)

  const { 
    sortedIcon, setSortedIcon,
    sortIconTrigger, setSortIconTrigger,
    deleteIcon, setDeleteIcon,
    setKey,
    refBeingClicked,
    binRestoreArr, setBinRestoreArr,
    rightClickBin, setRightClickBin,
    inFolder, setInFolder,
    handleShowInfolder, 
    iconBeingRightClicked, setIconBeingRightClicked,
    rightClickIcon, setRightClickIcon,
    setDesktopIcon, desktopIcon,
    iconFocusIcon,
    setRefresh,
    handleShow,
    rightClickDefault, setRightClickDefault,
    rightClickPosition,
  } = useContext(UseContext);


  function refreshed() {
    setRightClickDefault(false);
    setRefresh(prev => prev + 1);
    // setSortIconTrigger(prev => prev + 1)
  }


  // useEffect(() =>{
  //   if(sortIconTrigger > 0){
  //     const updatedSortedIcon = sortedIcon.length > 1 ? sortedIcon : desktopIcon
  //     setDesktopIcon(updatedSortedIcon)
  //     setRefresh(prev => prev + 1);
  //   }

  // },[sortIconTrigger])


  function handleSwitchOpenFolder() { // decide which folder function to call

    if(iconBeingRightClicked.name === inFolder) { 
      handleShowInfolder(iconBeingRightClicked.name)
      setInFolder('')
      return;
    }
    handleShow(iconBeingRightClicked.name);
  }

  
  function handleDeleteIcon() {

    const IconCannotBeDeleted = ['MyComputer', 'RecycleBin', "Hard Disk (C:)", "Hard Disk (D:)", "CD-ROM" ]

    if(IconCannotBeDeleted.includes(iconBeingRightClicked.name)) return;
    // Add icon to binRestoreArr
    // Update state and ensure localStorage is updated properly
    setBinRestoreArr(prevArr => {
    const updatedArr = [
    ...prevArr,
    {
      name: iconBeingRightClicked.name,
      OldFolder: iconBeingRightClicked.folderId
    }
  ];
  localStorage.setItem('restoreArray', JSON.stringify(updatedArr));
  return updatedArr; 
});


    const droppedIcon = desktopIcon.find(icon => icon.name === iconBeingRightClicked.name);
    if (droppedIcon) { 
      setDesktopIcon(prevIcons => {
        const updatedIcons = prevIcons.filter(icon => icon.name !== droppedIcon.name);
        const newIcon = { ...droppedIcon, folderId: 'RecycleBin' };
        setKey(prev => prev + 1); // make folder icon by re-mount
        localStorage.setItem('icons', JSON.stringify([...updatedIcons, newIcon]));
        return [...updatedIcons, newIcon];
      });
    }
    setDeleteIcon(prev => prev + 1) // important link to useEffect
  }

  useEffect(() => { // the only way to make it works is to mutate state like this for DELETE ICON
    if (deleteIcon > 0) {
      setDesktopIcon(prevIcons => {
        return prevIcons.map(icon =>
          icon.name === iconBeingRightClicked.name
            ? { ...icon, folderId: 'RecycleBin' }  // Mutate the `folderId`
            : icon
        ).slice(); // Creates a new array reference
      });
  
      setKey(prev => prev + 1); // Force re-render by changing an unrelated state
    }
  }, [deleteIcon]); 
  


  function handleRestore() {

    const droppedIcon = binRestoreArr.find(icon => icon.name === iconBeingRightClicked.name);

    if (!droppedIcon) return; //prevent error if not found

    if (droppedIcon) { 
        setDesktopIcon(prevIcons => {
        const findIconToRestore = prevIcons.find(icon => icon.name === droppedIcon.name)
        const updatedIcons = prevIcons.filter(icon => icon.name !== droppedIcon.name);
        const restoredIcon = { ...findIconToRestore, folderId: droppedIcon.OldFolder };
        console.log(restoredIcon)

        setKey(prev => prev + 1); // make folder icon by re-mount

        const newDesktopIcons = [...updatedIcons, restoredIcon];
        localStorage.setItem('icons', JSON.stringify(newDesktopIcons));
        return newDesktopIcons; 
    });
        // if(!binRestoreArr) return;
        // setBinRestoreArr(prev => {
        //   const newBinArr = prev.filter(icon => icon.name !== droppedIcon.name);
        //   localStorage.setItem('restoreArray', JSON.stringify(newBinArr)); // Update localStorage
        //   return newBinArr;
        // });
    }
    setRestoreIcon(prev => prev + 1) // important link to useEffect
  }
  

  useEffect(() => { // the only way to make it works is to mutate state like this for DELETE ICON
    if (restoreIcon > 0) {
      if(!binRestoreArr) return;
      const iconBeingRestored = binRestoreArr.find(icon => icon.name === iconBeingRightClicked.name)
        setBinRestoreArr(prev => {
          const newBinArr = prev.filter(icon => icon.name !== iconBeingRightClicked.name);
          localStorage.setItem('restoreArray', JSON.stringify(newBinArr)); // Update localStorage
          return newBinArr;
        });
        
      setDesktopIcon(prevIcons => {
        return prevIcons.map(icon =>
          icon.name === iconBeingRightClicked.name
            ? { ...icon, folderId: iconBeingRestored.OldFolder }  // Mutate the `folderId`
            : icon
        ).slice(); // Creates a new array reference
      });
  
      setKey(prev => prev + 1); // Force re-render by changing an unrelated state
    }
  }, [restoreIcon]); 
  


  return (
    <>
      {(rightClickDefault && !rightClickIcon && !rightClickBin) && (
        <div className='window_rightclick_container'
          style={{ 
            top: screenHeight - rightClickPosition.y < 217 ? screenHeight - 217 : rightClickPosition.y,
            left: screenWidth - rightClickPosition.x < 138 ? screenWidth - 138 : rightClickPosition.x 
          }}
        >  
            <p>
                Arrange Icons
                <span>
                    <BsFillCaretRightFill/>
                </span>
            </p>
            
            <p style={{paddingLeft: '25px'}}>Line up Icons</p>
            <h5></h5>
            <p style={{color: '#8a8989'}}>Paste</p>
            <p style={{color: '#8a8989'}}>Paste Shortcut</p>
            <p 
              onClick={() => {
                refreshed()
                iconFocusIcon('')
              }}
            >
              Refresh
            </p>
            <h5></h5>
            <p>
                New
                <span>
                    <BsFillCaretRightFill/>
                </span>
            </p>
            <h5></h5>
            <p 
              onClick={() => {
                handleShow('Settings')
                setRightClickDefault(false);
              }}
            >
              Properties
            </p>
        </div>  
      )}
      {(rightClickDefault && rightClickIcon && !rightClickBin) &&  (
        <div className='window_rightclick_container'
        style={{ 
          top: screenHeight - rightClickPosition.y < 217 ? screenHeight - 217 : rightClickPosition.y,
          left: screenWidth - rightClickPosition.x < 138 ? screenWidth - 138 : rightClickPosition.x,
          height: '212px', width: '128px'
        }}
      >  
          <p 
            onClick={() => {
              handleSwitchOpenFolder();
              iconFocusIcon('')
              setRightClickIcon(false);
              refBeingClicked.current = null;
            }}
          >
            Open
          </p>
          <p style={{paddingLeft: '25px'}}>Edit</p>
          <h5></h5>
          <p>
            Send To
            <span>
                <BsFillCaretRightFill/>
            </span>
          </p>
          <h5></h5>
          <p style={{color: '#8a8989'}}>Cut</p>
          <p style={{color: '#8a8989'}}>Copy</p>
          <h5></h5>
          <p
            onClick={() => {
              handleDeleteIcon();
              iconFocusIcon('')
              setRightClickIcon(false);
              setRightClickDefault(false)
              refBeingClicked.current = null;
            }}
          >
            Delete
          </p>
          <p>Rename</p>
          <h5></h5>
          <p>Properties</p>
      </div> 
      )}
      {(rightClickDefault && !rightClickIcon && rightClickBin) && (
        <div className='window_rightclick_container'
        style={{ 
          top: screenHeight - rightClickPosition.y < 217 ? screenHeight - 217 : rightClickPosition.y,
          left: screenWidth - rightClickPosition.x < 138 ? screenWidth - 138 : rightClickPosition.x,
          height: '120px', width: '120px'
        }}
      >  
          <p 
            onClick={() => {
              handleRestore();
              iconFocusIcon('')
              setRightClickBin(false);
              setRightClickDefault(false)
              refBeingClicked.current = null;
            }}
          >
            Restore
          </p>
          <h5></h5>
          <p >Cut</p>
          <h5></h5>
          <p style={{color: '#8a8989'}}>Delete</p>
          <h5></h5>
          <p>Properties</p>
      </div> 
      )}
       
    </>
  );
}

export default RightClickWindows;
