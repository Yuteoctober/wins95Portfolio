import UseContext from '../Context'
import { useContext, useState, useEffect, useRef, Children } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import file4 from '../assets/file4.png'
import folder from '../assets/regFolder.png'
import '../css/ResumeFolder.css'


function NoteFolder() {

  const { 
    NoteExpand, setNoteExpand,
    setNftExpand,
    setTypeExpand,
    setResumeExpand,
    setMybioExpand,
    setProjectExpand,
    setMailExpand,
    setWinampExpand,
    setResumeFileExpand,
    tap, setTap,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    iconState, setIconState,
    handleDoubleTapEnterMobile,
    handleDoubleClickEnterLink,
    ObjectState,

   } = useContext(UseContext);

      function handleDragStop(event, data) {
        const positionX = data.x 
        const positionY = data.y
        setNoteExpand(prev => ({
          ...prev,
          x: positionX,
          y: positionY
        }))

      }

   function handleExpandStateToggle() {
    setNoteExpand(prevState => ({
      ...prevState,
      expand: !prevState.expand
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
        setNoteExpand(prevState => ({
            ...prevState,
            expand: !prevState.expand
        }));
    }
    setLastTapTime(now);
}

    function handleSetFocusItemTrue(name) { //click on one, other goes false

      const LowerCaseName = name.toLowerCase();
      const setState = ObjectState();

      setState.forEach((item) => {
        if(item.name.toLowerCase() === LowerCaseName) {
          item.setter(prev => ({...prev, focusItem: true}));
        } else {
          item.setter(prev => ({...prev, focusItem: false}));
        }
      });

      setIconState(prevIcons => prevIcons.map(icon => ({
        ...icon,
        focus: false
      })));
    }

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


  return (
    <>
      <Draggable
        axis="both" 
        handle={'.folder_dragbar'}
        grid={[1, 1]}
        scale={1}
        disabled={NoteExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 5 : 80,
          y: window.innerWidth <= 500 ? 100 : 90,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('Note')}
      >
        <div className='folder_folder' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('Note');
            }}
            style={ NoteExpand.expand ? 
            {
                display: NoteExpand.show ? 'block' : '',
                maxWidth: 'none',
                width: '100%',
                height: 'calc(100% - 37px)',
                left: `${NoteExpand.x <= 0 ? Math.abs(NoteExpand.x)*2 + NoteExpand.x : -NoteExpand.x}px`,
                top: `${NoteExpand.y <= 0 ? Math.abs(NoteExpand.y)*2 + NoteExpand.y : -NoteExpand.y}px`,
                opacity: NoteExpand.hide ? '0' : '1',
                zIndex: NoteExpand.hide ? '-1' : (NoteExpand.focusItem ? '999' : '3'),
                pointerEvents: NoteExpand.hide ? 'none' : 'auto',
                resize: NoteExpand.expand ? 'none' : '',
            } : { 
                display: NoteExpand.show ? 'block' : '',
                opacity: NoteExpand.hide ? '0' : '1',
                zIndex: NoteExpand.hide ? '-1' : (NoteExpand.focusItem ? '999' : '3'),
                pointerEvents: NoteExpand.hide ? 'none' : 'auto'
                
            }
        }>
          <div className="folder_dragbar"
              onDoubleClick={handleExpandStateToggle}
              onTouchStart={handleExpandStateToggleMobile}
             style={{ background: NoteExpand.focusItem? '#14045c' : '#757579'}}
          >
            <div className="folder_barname">
              <img src={folder} alt="folder" />
              <span>Note</span>
            </div>
            <div className="folder_barbtn">
              <div onClick={ !isTouchDevice? (e) => {
                e.stopPropagation()
                setNoteExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('Note') 
              } : undefined
            }
                   onTouchEnd={(e) => {
                    e.stopPropagation()
                    setNoteExpand(prev => ({...prev, hide: true, focusItem: false}))
                    StyleHide('Note')
                  }}
              >
                <p className='dash'></p>
              </div>
              <div
                onClick={ !isTouchDevice ? () => handleExpandStateToggle() : undefined}
                onTouchEnd={handleExpandStateToggle}
              >
                <motion.div className={`expand ${NoteExpand.expand ? 'full' : ''}`}>
                </motion.div>
                {NoteExpand.expand ? 
                (
                <div className="expand_2"></div>
                )
                :
                (null)}
              </div>
              <div><p className='x'
                 onClick={!isTouchDevice ? () => {
                  setNoteExpand(prev => ({...prev, show: false, expand: false}));
                  const newTap = tap.filter(a => a !== 'Note')
                  setTap(newTap)
                 }: undefined
                }
                onTouchEnd={() => {
                  setNoteExpand(prev => ({...prev, show: false, expand: false}));
                  const newTap = tap.filter(a => a !== 'Note')
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
            onClick={() => setNoteExpand(prev => ({...prev, item_1Focus: false}))}
            style={NoteExpand.expand ? 
              { height: 'calc(100svh - 122px)'} 
              : 
              {}
            }
          >
            <div className="item_container">
              <div className='item_1'
                onDoubleClick={ !isTouchDevice? () => handleDoubleClickEnterLink('Note') : undefined} 
                onTouchEnd={() => handleDoubleTapEnterMobile('Note', lastTapTime, setLastTapTime)}
                onClick={(e) => {
                  e.stopPropagation();
                  setNoteExpand(prev => ({...prev, item_1Focus: true}));
                  setIconState(iconState.map(icon => ({...icon, focus: false})))
                  setNftExpand(prev => ({...prev, item_1Focus: false}))
                  setTypeExpand(prev => ({...prev, item_1Focus: false}))
                  setProjectExpand(prev => ({
                    ...prev, item_1Focus: false, item_2Focus: false, item_3Focus: false
                  }))
                }}
              >
                <img src={file4} alt="file4" 
                  className={NoteExpand.item_1Focus? 'item_1_img_focus' : ''}
                />
                <p className={NoteExpand.item_1Focus? 'item_1_p_focus' : ''}>
                  Stick Note
                </p>
              </div>
            </div>
          </div>
          <div className="btm_bar_container">
            <div className="object_bar"><p>1 object(s) {NoteExpand.item_1Focus?'selected':''}</p></div>
            <div className="size_bar"><p>29.07 MB</p></div>
          </div>
        </div>
      </Draggable>
    </>
  )
}          

export default NoteFolder
