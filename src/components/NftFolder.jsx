import UseContext from '../Context'
import { useContext } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import file4 from '../assets/file4.png'
import folder from '../assets/regFolder.png'
import '../css/ResumeFolder.css'


function NftFolder() {

  const { 
    NftExpand, setNftExpand,
    setNoteExpand,
    setTypeExpand,
    setProjectExpand,
    tap, setTap,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    iconState, setIconState,
    handleDoubleTapEnterMobile,
    handleDoubleClickEnterLink,
    handleSetFocusItemTrue,
   } = useContext(UseContext);

      function handleDragStop(event, data) {
        const positionX = data.x 
        const positionY = data.y
        setNftExpand(prev => ({
          ...prev,
          x: positionX,
          y: positionY
        }))

      }

   function handleExpandStateToggle() {
    setNftExpand(prevState => ({
      ...prevState,
      expand: !prevState.expand
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
        setNftExpand(prevState => ({
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
        disabled={NftExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 5 : 80,
          y: window.innerWidth <= 500 ? 100 : 90,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('Nft')}
      >
        <div className='folder_folder' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('Nft');
            }}
            style={ NftExpand.expand ? 
            {
                display: NftExpand.show ? 'block' : '',
                maxWidth: 'none',
                width: '100%',
                height: 'calc(100% - 37px)',
                left: `${NftExpand.x <= 0 ? Math.abs(NftExpand.x)*2 + NftExpand.x : -NftExpand.x}px`,
                top: `${NftExpand.y <= 0 ? Math.abs(NftExpand.y)*2 + NftExpand.y : -NftExpand.y}px`,
                opacity: NftExpand.hide ? '0' : '1',
                zIndex: NftExpand.hide ? '-1' : (NftExpand.focusItem ? '999' : '3'),
                pointerEvents: NftExpand.hide ? 'none' : 'auto',
                resize: NftExpand.expand ? 'none' : '',
            } : { 
                display: NftExpand.show ? 'block' : '',
                opacity: NftExpand.hide ? '0' : '1',
                zIndex: NftExpand.hide ? '-1' : (NftExpand.focusItem ? '999' : '3'),
                pointerEvents: NftExpand.hide ? 'none' : 'auto'
                
            }
        }>
          <div className="folder_dragbar"
              onDoubleClick={handleExpandStateToggle}
              onTouchStart={handleExpandStateToggleMobile}
             style={{ background: NftExpand.focusItem? '#14045c' : '#757579'}}
          >
            <div className="folder_barname">
              <img src={folder} alt="folder" />
              <span>Nft</span>
            </div>
            <div className="folder_barbtn">
              <div onClick={ !isTouchDevice? (e) => {
                e.stopPropagation()
                setNftExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('Nft') 
              } : undefined
            }
                   onTouchEnd={(e) => {
                    e.stopPropagation()
                    setNftExpand(prev => ({...prev, hide: true, focusItem: false}))
                    StyleHide('Nft')
                  }}
              >
                <p className='dash'></p>
              </div>
              <div
                onClick={ !isTouchDevice ? () => handleExpandStateToggle() : undefined}
                onTouchEnd={handleExpandStateToggle}
              >
                <motion.div className={`expand ${NftExpand.expand ? 'full' : ''}`}>
                </motion.div>
                {NftExpand.expand ? 
                (
                <div className="expand_2"></div>
                )
                :
                (null)}
              </div>
              <div><p className='x'
                 onClick={!isTouchDevice ? () => {
                  setNftExpand(prev => ({...prev, show: false, expand: false}));
                  const newTap = tap.filter(a => a !== 'Nft')
                  setTap(newTap)
                 }: undefined
                }
                onTouchEnd={() => {
                  setNftExpand(prev => ({...prev, show: false, expand: false}));
                  const newTap = tap.filter(a => a !== 'Nft')
                  setTap(newTap)
              }}
              >x</p></div>
            </div>
          </div>

          <div className="file_edit_container">
              <p>File<span style={{left: '-23px'}}>_</span></p>
              <p>Edit<span style={{left: '-24px'}}>_</span></p>
              <p>View<span style={{left: '-32px'}}>_</span></p>
              <p>Help<span style={{left: '-30px'}}>_</span></p>
          </div>
          <div className="folder_content"
            onClick={() => setNftExpand(prev => ({...prev, item_1Focus: false}))}
            style={NftExpand.expand ? 
              { height: 'calc(100svh - 122px)'} 
              : 
              {}
            }
          >
            <div className="item_container">
              <div className='item_1'
                onDoubleClick={ !isTouchDevice ?() => handleDoubleClickEnterLink('Nft'): undefined} 
                onTouchEnd={() => handleDoubleTapEnterMobile('Nft', lastTapTime, setLastTapTime)}
                onClick={(e) => {
                  e.stopPropagation();
                  setNftExpand(prev => ({...prev, item_1Focus: true}));
                  setIconState(iconState.map(icon => ({...icon, focus: false})))
                  setNoteExpand(prev => ({...prev, item_1Focus: false}))
                  setTypeExpand(prev => ({...prev, item_1Focus: false}))
                  setProjectExpand(prev => ({
                    ...prev, item_1Focus: false, item_2Focus: false, item_3Focus: false
                  }))
                }}
              >
                <img src={file4} alt="file4" 
                  className={NftExpand.item_1Focus? 'item_1_img_focus' : ''}
                />
                <p className={NftExpand.item_1Focus? 'item_1_p_focus' : ''}>
                  OpenNFT
                </p>
              </div>
            </div>
          </div>
          <div className="btm_bar_container">
            <div className="object_bar"><p>1 object(s) {NftExpand.item_1Focus?'selected':''}</p></div>
            <div className="size_bar"><p>50.98 MB</p></div>
          </div>
        </div>
      </Draggable>
    </>
  )
}          

export default NftFolder
