import UseContext from '../Context';
import { useContext, useState, useRef, useEffect } from "react";
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';
import msnPic from '../assets/msn.png';
import chat from '../assets/chat.png';
import '../css/MSN.css';

function MsnFolder() {

  const {
    endOfMessagesRef,
    createChat,
    userNameValue, setUserNameValue,
    chatValue, setChatValue,
    chatData,
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

  const [userName, setUserName] = useState(false);

  const lastMessage = chatData.length > 0
    ? chatData[chatData.length - 1].date.split('').slice(0, 10).join('')
    : 'No messages yet';

  useEffect(() => {
  endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [MSNExpand.show]); // Run this effect when open/close 

  function handleDragStop(event, data) {
    const positionX = data.x;
    const positionY = data.y;
    setMSNExpand(prev => ({
      ...prev,
      x: positionX,
      y: positionY
    }));
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
        bounds={{ top: 0 }}
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
          }
        >

          {/* -------------------------- Add username --------------------------------- */}
          <div className={userName ? 'Username_input_div_active' : 'Username_input_div_disabled'}>
            <div className="container_username">
              <div className="form_banner"
                style={{ background: MSNExpand.focusItem ? '#14045c' : '#757579' }}
              >
                <img src={chat} alt="chat" />
                <p className='username_text_banner'>
                  Username
                </p>
                <div className="close_form_banner"
                  onClick={() => setUserName(false)}
                >
                  <p>x</p>
                </div>
              </div>
              <form onSubmit={(e) => { e.preventDefault() }}>
                <p>
                  Username:
                </p>
                <input type="text" maxLength={20} placeholder='Enter your username here...'
                    value={userNameValue}
                    onChange={(e) => setUserNameValue(e.target.value)}
                />
                <div className="ok_cancel_username">
                  <button
                    onClick={() => setUserName(false)}
                  >
                    Ok
                  </button>
                  <button
                    onClick={() => {
                      setUserName(false);
                      setUserNameValue('');
                    }}
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
            style={{ background: MSNExpand.focusItem ? '#14045c' : '#757579' }}
          >
            <div className="folder_barname-MSN">
              <img src={msnPic} alt="msnPic" />
              <span>MSN</span>
            </div>
            <div className="folder_barbtn-MSN">
              <div onClick={!isTouchDevice ? (e) => {
                e.stopPropagation();
                setMSNExpand(prev => ({ ...prev, hide: true, focusItem: false }));
                StyleHide('MSN');
              } : undefined}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  setMSNExpand(prev => ({ ...prev, hide: true, focusItem: false }));
                  StyleHide('MSN');
                }}
              >
                <p className='dash-MSN'></p>
              </div>
              <div
                onClick={!isTouchDevice ? () => handleExpandStateToggle() : undefined}
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
              <div>
                <p className='x-MSN'
                  onClick={!isTouchDevice ? () => {
                    deleteTap('MSN');
                    setUserName(false);
                    setChatValue('')
                  } : undefined}
                  onTouchEnd={() => {
                    deleteTap('MSN');
                    setUserName(false);
                    setChatValue('')
                  }}
                >
                  x
                </p>
              </div>
            </div>
          </div>

          <div className="file_edit_container-MSN">
            <p>File<span style={{ left: '-23px' }}>_</span></p>
            <p>Edit<span style={{ left: '-24px' }}>_</span></p>
            <p>View<span style={{ left: '-32px' }}>_</span></p>
            <p>Help<span style={{ left: '-30px' }}>_</span></p>
          </div>
          <div className='groove_div'>
            <div className="chat_name_msn_div"
              onClick={() => setUserName(true)}
            >
              <img src={chat} alt="chat" />

            </div>
              <span>Username: {userNameValue? userNameValue: 'Anonymous'}</span>
            
          </div>
          <div className="chat_to_div">
            <p>
              To: everyone
            </p>
          </div>
          <div className="folder_content-MSN">
            {chatData.length === 0 && (
                <span style={{position: 'relative', fontSize: '13px'}}>
                  LOADING.......
                </span>
            )}
            {chatData.map((chat, index) => (
              <div className='text_container' key={chat.id}>
                <p>
                  <span style={{ color: 'blue' }}>&lt;{chat.name}&gt;: </span>
                  <span style={{ color: '#171616' }}>{chat.chat}</span>
                </p>
                {/* Attach ref to the last chat item */}
                {index === chatData.length - 1 && (
                  <div ref={endOfMessagesRef} />
                )}
              </div>
            ))}
          </div>

          <div className="enter_text_div">
            <textarea
              placeholder='Enter your message here...'
              value={chatValue}
              onChange={(e) => setChatValue(e.target.value)}
            />
            <button
              onClick={() => createChat()}
            >
              Send
            </button>
          </div>
          <div className="status_div">
            <p>
            {chatValue.trim().length > 0
                ? `${userNameValue} is typing...`
                : `Last message received on ${lastMessage}`}
            </p>

          </div>
        </div>
      </Draggable>
    </>
  );
}

export default MsnFolder;
