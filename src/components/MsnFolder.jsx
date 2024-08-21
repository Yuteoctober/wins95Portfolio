import UseContext from '../Context'
import { useContext, useState} from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import msnPic from '../assets/msn.png'
import chat from '../assets/chat.png'
import '../css/MSN.css'


function MsnFolder() {



  const { 
    MSNExpand, setMSNExpand,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,
    iconFocusIcon,
   } = useContext(UseContext);

   const [userName, setUserName] = useState(false)


      function handleDragStop(event, data) {
        const positionX = data.x 
        const positionY = data.y
        setMSNExpand(prev => ({
          ...prev,
          x: positionX,
          y: positionY
        }))

      }

   function handleExpandStateToggle() {
    setMSNExpand(prevState => ({
      ...prevState,
      expand: !prevState.expand
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
        setMSNExpand(prevState => ({
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
        handle={'.folder_dragbar-MSN'}
        grid={[1, 1]}
        scale={1}
        disabled={MSNExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 20 : 50,
          y: window.innerWidth <= 500 ? 40 : 120,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('MSN')}
      >
        <div className='folder_folder-MSN' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('MSN');
            }}
            style={ 
                MSNExpand.expand ? inlineStyleExpand('MSN') : inlineStyle('MSN')
            }>

            {/* -------------------------- Add username --------------------------------- */}
            <div className={userName? 'Username_input_div_active' : 'Username_input_div_disabled'}>            
                    <div className="container_username">
                        <div className="form_banner"
                            style={{ background: MSNExpand.focusItem? '#14045c' : '#757579'}}
                            >
                            <p className='username_text_banner'>
                                Username
                            </p>
                            <div className="close_form_banner"
                                onClick={() => setUserName(false)}
                            >
                                <p>x</p>
                            </div>
                        </div>
                        <form 
                        onSubmit={(e) => {e.preventDefault()}}
                        >
                            <input type="text" maxLength={20} placeholder='Enter your user-name here...'  />
                            <div className="ok_cancel_username">
                                <button>Ok</button>
                                <button
                                    onClick={() => setUserName(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                            
                        </form>
                </div>
            </div>
            {/* ------------------------------------------------------------------------------ */}
          <div className="folder_dragbar-MSN"
              onDoubleClick={handleExpandStateToggle}
              onTouchStart={handleExpandStateToggleMobile}
             style={{ background: MSNExpand.focusItem? '#14045c' : '#757579'}}
          >
            <div className="folder_barname-MSN">
              <img src={msnPic} alt="msnPic" />
              <span>MSN</span>
            </div>
            <div className="folder_barbtn-MSN">
              <div onClick={ !isTouchDevice? (e) => {
                e.stopPropagation()
                setMSNExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('MSN') 
              } : undefined
            }
                   onTouchEnd={(e) => {
                    e.stopPropagation()
                    setMSNExpand(prev => ({...prev, hide: true, focusItem: false}))
                    StyleHide('MSN')
                  }}
              >
                <p className='dash-MSN'></p>
              </div>
              <div
                onClick={ !isTouchDevice ? () => handleExpandStateToggle() : undefined}
                onTouchEnd={handleExpandStateToggle}
              >
                <motion.div className={`expand-MSN ${MSNExpand.expand ? 'full' : ''}`}>
                </motion.div>
                {MSNExpand.expand ? 
                (
                <div className="expand_2-MSN"></div>
                )
                :
                (null)}
              </div>
              <div><p className='x-MSN'
                 onClick={!isTouchDevice ? () => {
                    deleteTap('MSN')
                    setUserName(false)
                }
                  : undefined
                }
                onTouchEnd={() => {
                    deleteTap('MSN')
                    setUserName(false)
                }}
              >x</p></div>
            </div>
          </div>

          <div className="file_edit_container-MSN">
              <p>File<span style={{left: '-23px'}}>_</span></p>
              <p>Edit<span style={{left: '-24px'}}>_</span></p>
              <p>View<span style={{left: '-32px'}}>_</span></p>
              <p>Help<span style={{left: '-30px'}}>_</span></p>
          </div>
          <div className='groove_div'>
            <div className="chat_name_msn_div"
                onClick={() => setUserName(true)}
            >
                <img src={chat} alt="chat" />
                <span>Set User-name</span>
            </div>
          </div>
          <div className="chat_to_div">
            <p>
                To: everyone
            </p>
          </div>
          <div className="folder_content-MSN">
            
          </div>
          <div className="enter_text_div">
            <textarea></textarea>
            <button>Send</button>
          </div>
          <div className="status_div">
            <p>
                username is typing......
            </p>
          </div>

        </div>
      </Draggable>
    </>
  )
}          

export default MsnFolder;
