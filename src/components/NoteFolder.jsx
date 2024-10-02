import UseContext from '../Context'
import { useContext } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import file4 from '../assets/file4.png'
import folder from '../assets/regFolder.png'
import '../css/ResumeFolder.css'


function NoteFolder() {

  const { 
    themeDragBar,
    handleShow, handleShowMobile,
    projectname,
    handleDoubleClickiframe, handleDoubleTapiframeMobile,
    setOpenProjectExpand,
    setProjectUrl,
    NoteExpand, setNoteExpand,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    handleDoubleTapEnterMobile,
    handleDoubleClickEnterLink,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    iconFocusIcon,
    deleteTap,

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
            style={ NoteExpand.expand ? inlineStyleExpand('Note') : inlineStyle('Note')}>
          <div className="folder_dragbar"
              onDoubleClick={handleExpandStateToggle}
              onTouchStart={handleExpandStateToggleMobile}
             style={{ background: NoteExpand.focusItem? themeDragBar : '#757579'}}
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
                  deleteTap('Note')
                 }: undefined
                }
                onTouchEnd={() => {
                  deleteTap('Note')
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
            onClick={() => iconFocusIcon('')}
            style={NoteExpand.expand ? 
              { height: 'calc(100svh - 122px)'} 
              : 
              {}
            }
          >
            <div className="item_container">
              <div className='item_1'
                onDoubleClick={ !isTouchDevice? () => {
                  handleDoubleClickiframe('Note', setOpenProjectExpand, setProjectUrl) 
                  handleShow('Internet')
                }
                  : undefined}
                onTouchEnd={() => {
                  handleDoubleTapiframeMobile('Note', lastTapTime, setLastTapTime, setOpenProjectExpand, setProjectUrl)
                  handleShowMobile('Internet');
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  iconFocusIcon('Notefolder')
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
