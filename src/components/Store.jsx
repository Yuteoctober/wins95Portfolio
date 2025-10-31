import UseContext from '../Context'
import { useContext, useState } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import '../css/Store.css'
import { imageMapping } from './function/AppFunctions';


function Store() {

    const [storeSearchValue, setStoreSearchValue] = useState('')

  const { 
    StoreExpand, setStoreExpand,
    themeDragBar,
    projectname,
    projectUrl,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    iconFocusIcon,
    deleteTap,

   } = useContext(UseContext);



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

  return (
    <>
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
        <div className='folder_folder-open-project' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('Store');
            }}
            style={{
              ...(StoreExpand.expand ? inlineStyleExpand('Store') : inlineStyle('Store')),
              minHeight: '300px', minWidth: '340px'
            }}>
          <div className="folder_dragbar"
              onDoubleClick={handleExpandStateToggle}
              onTouchStart={handleExpandStateToggleMobile}
             style={{ background: StoreExpand.focusItem? themeDragBar : '#757579'}}
          >
            <div className="folder_barname">
              <img src={imageMapping('Store')} alt="ie" style={{ width: '17px'}} />
                <span style={{top: '1px'}}>Store</span>
              </div>
            <div className="folder_barbtn">
              <div onClick={ !isTouchDevice? (e) => {
                e.stopPropagation()
                setStoreExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('Store') 
              } : undefined
            }
                   onTouchEnd={(e) => {
                    e.stopPropagation()
                    setStoreExpand(prev => ({...prev, hide: true, focusItem: false}))
                    StyleHide('Store')
                  }}
                    onTouchStart={(e) => e.stopPropagation()}
              >
                <p className='dash'></p>
              </div>
              <div
                onClick={ !isTouchDevice ? () => handleExpandStateToggle() : undefined}
                onTouchEnd={handleExpandStateToggle}
              >
                <motion.div className={`expand ${StoreExpand.expand ? 'full' : ''}`}>
                </motion.div>
                {StoreExpand.expand ? 
                (
                <div className="expand_2"></div>
                )
                :
                (null)}
              </div>
              <div>
                <p className='x'
                 onClick={!isTouchDevice ? () => {
                  deleteTap('Store')
                 }: undefined
                }
                onTouchEnd={() => {
                  deleteTap('Store')
              }}
                >×</p>
              </div>
            </div>
          </div>

          <div className="file_edit_container">
              <p>File<span style={{left: '-23px'}}>_</span></p>
              <p>Edit<span style={{left: '-24px'}}>_</span></p>
              <p>View<span style={{left: '-32px'}}>_</span></p>
              <p>Help<span style={{left: '-30px'}}>_</span></p>
          </div>
          <div className="store_content"
            onClick={() => iconFocusIcon('Store')}
            style={StoreExpand.expand ? 
              { height: 'calc(100svh - 102px)'} 
              : 
              {}
            }
          >
            <div className="store_sec_1"
                style={{background: '#c5c4c4', border: 'none'}}
            >
                <div className="store_search">
                    <input type="text" placeholder='Search....' 
                    maxLength={20}
                    onChange={e => setStoreSearchValue(e.target.value)} 
                    value={storeSearchValue} 
                />
                </div>
                <div className="store_catagory"></div>
            </div>
            <div className="store_sec_2"></div>
            <div className="store_sec_3"></div>
        
          </div>
          <div className='ifram_text_container'>
          </div>
        </div>
      </Draggable>
    </>
  )
}          

export default Store
