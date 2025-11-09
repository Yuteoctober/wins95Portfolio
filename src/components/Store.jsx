import UseContext from '../Context'
import { useContext, useEffect, useState } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import '../css/Store.css'
import { imageMapping } from './function/AppFunctions';
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import iconInfo from '../icon.json'

function Store() {
  const [storeSearchValue, setStoreSearchValue] = useState('')
  const [catagoryHide, setCatagoryHide] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('1')
  const [disableInstall, setDisableInstall] = useState(false)
  const [itemIsInstalling, setItemIsInstalling] = useState('')
  const [resetAnimation, setResetAnimation] = useState(0)
  const [deleteInStore, setDeleteInStore] = useState(0)
  const [itemBeingUninstall, setItembeingUninstall] = useState('')
  const [disableUninstall, setDisableUninstall] = useState(false)
  

  const { 
    itemIsBeingDeleted, setItemIsBeingDeleted,
    setDeleteIcon,
    clearNotiTimeOut,
    setNewMessage,
    setNotiOn,
    itemBeingSelected, setItemBeingSelected,
    installIcon, setInstallIcon,
    setKey,
    desktopIcon, setDesktopIcon,
    StoreExpand, 
    setStoreExpand,
    themeDragBar,
    lastTapTime, 
    setLastTapTime,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    iconFocusIcon,
    deleteTap,
  } = useContext(UseContext);


    // install app logic
    function installApp(item) {
      if (!item) return;
      setInstallIcon(prev => prev + 1); // call useEffect to force install app
    }


  useEffect(() => { // force install app when installIcon changes

    if (installIcon > 0) {

      const findApp = iconInfo.find(icon => icon.name === itemBeingSelected.name)
      if (!findApp) return;

        clearTimeout(clearNotiTimeOut); // clear any previous timeout
          setResetAnimation(prev => prev + 1)
          setItemIsInstalling(findApp.name)
          setDisableInstall(true)
          setNotiOn(false); // reset first
          setTimeout(() => {
            setNewMessage({ type: 'appInstalling', appName: findApp.name });
            setNotiOn(true);
          }, 100);

        setTimeout(() => {
          setDesktopIcon(prevIcons => {
          
          const updatedIcons = [...prevIcons, { ...findApp, folderId: 'Desktop' }];
          const target = updatedIcons.find(icon => icon.name === findApp.name);
          const others = updatedIcons.filter(icon => icon.name !== findApp.name);
        
          const newDesktopIcons = [...others, target];

          localStorage.setItem('icons', JSON.stringify(newDesktopIcons));

           // Show "installed" notification
          clearTimeout(clearNotiTimeOut); // clear any previous timeout
          setNotiOn(false); // reset first
          setTimeout(() => {
            setNewMessage({ type: 'appInstalled', appName: findApp.name });
            setNotiOn(true);
            setDisableInstall(false)
            setItemIsInstalling('')
          }, 100);

          
          return newDesktopIcons;
        });
        }, 15000);
        setKey(prev => prev + 1);
      
    }
  }, [installIcon]);



  // Compute installed status - no state needed
  const installed = itemBeingSelected 
    ? desktopIcon.some(icon => icon.name === itemBeingSelected.name)
    : false;

  // Filter items based on search and category
  const itemsInStore = iconInfo
    .filter(item => item.category)
    .filter(item => {
      // Search filter
      if (storeSearchValue.trim() !== '') {
        const searchValueLower = storeSearchValue.toLowerCase();
        const nameMatch = item.name.toLowerCase().includes(searchValueLower);
        if (!nameMatch) return false; 
      }

      // Category filter
      if (!selectedCategory) {
        return; 
      }
      
      switch (selectedCategory) {
        case '1':
          return item.category
        case '2':
          return item.category === 'Games';
        case '3':
          return item.category === 'Utilities';
        case '4':
          return item.category === 'Productivity';
        case '5':
          return (item.category && !desktopIcon.some(icon => icon.name === item.name)
    );
      }
    });

    function findCountOfCatagory(cat) {

      if (!cat) return;

    
      const allStoreItems = iconInfo.filter(item => item.category);

      switch (cat) {
        case '1':
          return allStoreItems.length;

        case '2':
          return allStoreItems.filter(item => item.category === 'Games').length;

        case '3':
          return allStoreItems.filter(item => item.category === 'Utilities').length;

        case '4':
          return allStoreItems.filter(item => item.category === 'Productivity').length;

        case '5':
          return allStoreItems.filter(item =>
            !desktopIcon.some(desItem => desItem.name === item.name)
          ).length;

        default:
          return 0;
      }
    }



  function handleDragStop(event, data) {
    const positionX = data.x 
    const positionY = data.y
    setStoreExpand(prev => ({
      ...prev,
      x: positionX,
      y: positionY
    }))
  }

  function handleExpandStateToggle() {
    setStoreExpand(prevState => ({
      ...prevState,
      expand: !prevState.expand
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
      setStoreExpand(prevState => ({
        ...prevState,
        expand: !prevState.expand
      }));
    }
    setLastTapTime(now);
  }

  function handleMinimize(e) {
    e.stopPropagation()
    setStoreExpand(prev => ({...prev, hide: true, focusItem: false}))
    StyleHide('Store')
  }

  function handleClose() {
    deleteTap('Store')
  }

  function deleteAppInStore(item) {
    setItemIsBeingDeleted(item.name)
    setItembeingUninstall(item.name)
    setDeleteInStore(prev => prev + 1)
  }

    useEffect(() => {
    if (deleteInStore > 0) {

      clearTimeout(clearNotiTimeOut); // clear any previous timeout
          setNotiOn(false); // reset first
          setTimeout(() => {
            setDisableUninstall(true)
            setNewMessage({ type: 'unIntallingApp', appName: itemBeingUninstall });
            setNotiOn(true);
          }, 100);
          
      setTimeout(() => {    

      setDesktopIcon(prevIcons => {
         const updateDesktopIcon = prevIcons.filter(item => item.name !== itemBeingUninstall)
         localStorage.setItem('icons', JSON.stringify(updateDesktopIcon));
         return updateDesktopIcon;
      });
      clearTimeout(clearNotiTimeOut);
      setNotiOn(false); // reset first
          setTimeout(() => {
            setNewMessage({ type: 'appUninstalled', appName: itemBeingUninstall });
            setNotiOn(true);
            setDisableUninstall(false)
            setDeleteIcon(prev => prev + 1)
            deleteTap(itemBeingUninstall)
          }, 100);
      setKey(prev => prev + 1); // Force re-render if needed
      }, 5000);
    }
  }, [deleteInStore]);

  

  return (
    <Draggable
      axis="both" 
      handle={'.folder_dragbar'}
      grid={[1, 1]}
      scale={1}
      disabled={StoreExpand.expand}
      bounds={{top: 0}}
      defaultPosition={{ 
        x: window.innerWidth <= 500 ? 5 : 80,
        y: window.innerWidth <= 500 ? 100 : 90,
      }}
      onStop={(event, data) => handleDragStop(event, data)}
      onStart={() => handleSetFocusItemTrue('Store')}
    >
      <div 
        className='folder_folder-open-store' 
        onClick={(e) => {
          e.stopPropagation();
          handleSetFocusItemTrue('Store');
        }}
        style={{
          ...(StoreExpand.expand ? inlineStyleExpand('Store') : inlineStyle('Store')),
        }}
      >
        {/* Drag Bar */}
        <div 
          className="folder_dragbar"
          onDoubleClick={handleExpandStateToggle}
          onTouchStart={handleExpandStateToggleMobile}
          style={{ background: StoreExpand.focusItem ? themeDragBar : '#757579'}}
        >
          <div className="folder_barname">
            <img src={imageMapping('Store')} alt="Store" style={{ width: '17px'}} />
            <span style={{top: '1px'}}>Store</span>
          </div>
          
          <div className="folder_barbtn">
            {/* Minimize Button */}
            <div 
              onClick={!isTouchDevice ? handleMinimize : undefined}
              onTouchEnd={handleMinimize}
              onTouchStart={(e) => e.stopPropagation()}
            >
              <p className='dash'></p>
            </div>
            
            {/* Expand Button */}
            <div
              onClick={!isTouchDevice ? handleExpandStateToggle : undefined}
              onTouchEnd={handleExpandStateToggle}
            >
              <motion.div className={`expand ${StoreExpand.expand ? 'full' : ''}`}>
              </motion.div>
              {StoreExpand.expand && <div className="expand_2"></div>}
            </div>
            
            {/* Close Button */}
            <div>
              <p 
                className='x'
                onClick={!isTouchDevice ? handleClose : undefined}
                onTouchEnd={handleClose}
              >
                ×
              </p>
            </div>
          </div>
        </div>

        {/* Menu Bar */}
        <div className="file_edit_container">
          <p>File<span style={{left: '-23px'}}>_</span></p>
          <p>Edit<span style={{left: '-24px'}}>_</span></p>
          <p>View<span style={{left: '-32px'}}>_</span></p>
          <p>Help<span style={{left: '-30px'}}>_</span></p>
        </div>

        {/* Store Content */}
        <div 
          className="store_content"
          onClick={() => iconFocusIcon('Store')}
          style={StoreExpand.expand ? { height: 'calc(100svh - 102px)'} : {}}
        >
          {/* Section 1: Search and Categories */}
          <div 
            className="store_sec_1"
            style={{background: '#c5c4c4', border: 'none'}}
          >
            <div className="store_search">
              <input 
                type="text" 
                placeholder='Search....' 
                maxLength={15}
                onChange={e => setStoreSearchValue(e.target.value)} 
                value={storeSearchValue} 
              />
              {storeSearchValue.length < 1 && (
                <span><IoIosSearch/></span>
              )}
            </div>
            
            <div className="store_catagory">
              <div onClick={() => setCatagoryHide(!catagoryHide)}>
                Categories
                <span className='show_hide_cat'>
                  {catagoryHide ? <BsChevronDown/> : <BsChevronUp/>}
                </span>
              </div>
              
              {catagoryHide && (
                <>
                  <div onClick={() => setSelectedCategory('1')}>
                    {selectedCategory === '1' && <span className='cat_dot'>.</span>}
                    All {`(${findCountOfCatagory('1')})`}
                  </div>
                  <div onClick={() => setSelectedCategory('2')}>
                    {selectedCategory === '2' && <span className='cat_dot'>.</span>}
                    Games {`(${findCountOfCatagory('2')})`}
                  </div>
                  <div onClick={() => setSelectedCategory('3')}>
                    {selectedCategory === '3' && <span className='cat_dot'>.</span>}
                    Utilities {`(${findCountOfCatagory('3')})`}
                  </div>
                  <div onClick={() => setSelectedCategory('4')}>
                    {selectedCategory === '4' && <span className='cat_dot'>.</span>}
                    Productivity {`(${findCountOfCatagory('4')})`}
                  </div>
                  <div onClick={() => setSelectedCategory('5')}>
                    {selectedCategory === '5' && <span className='cat_dot'>.</span>}
                    To install {`(${findCountOfCatagory('5')})`}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Section 2: Item List */}
          <div className="store_sec_2">
            {itemsInStore.map((item, index) => (
              <div 
                className="item_section_two" 
                key={index}
                onClick={() => setItemBeingSelected(item)}
              >
                <div className='section_two_img'>
                  <img src={imageMapping(item.name)} alt={item.name} />
                </div>
                <div className='section_two_text'>
                  <p className='section_two_text_name'>{item.name}</p>
                  <p className='section_two_text_des'>{item.description}</p> 
                </div>
              </div>
            ))}
          </div>

          {/* Section 3: Item Details */}
          <div className="store_sec_3">
            {itemBeingSelected && (
              <>
                <img 
                  src={imageMapping(itemBeingSelected.name)} 
                  alt={itemBeingSelected.name} 
                />
                <h3>{itemBeingSelected.name}</h3>
                <p>{itemBeingSelected.description}</p>
                <p className='section_3_des'>
                  Size: {itemBeingSelected.size}MB
                </p>
                <button
                  onClick={() => {
                    installApp(itemBeingSelected)
                  }}
                  disabled={disableInstall || installed}
                  style={installed ? {
                    color: 'gray',
                  } : {}}
                >
                  { 
                    installed ? 'Installed' 
                  : !installed && (itemIsInstalling === itemBeingSelected.name) ? 'Installing...'
                  : 'Install'
                  }
                    <div 
                      key={resetAnimation}
                      style={{opacity: itemIsInstalling === itemBeingSelected.name ? '1' : '0'}}
                      className="progress_bar_store"
                    />
                </button>
                <button
                  style={{bottom: '4px'}}
                  onClick={() => deleteAppInStore(itemBeingSelected)}
                  disabled={!installed || disableUninstall}
                >
                  {disableUninstall && (itemBeingUninstall === itemBeingSelected.name) ? 'Uninstalling' : 'Uninstall'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Draggable>
  )
}

export default Store