import UseContext from '../Context';
import { useContext, useRef, useState } from "react";
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';
import Mail from '../assets/mail.png';
import '../css/MailFolder.css';

function MailFolder() {
  const [nameVal, setNameVal] = useState('');
  const [textVal, setTextVal] = useState('');
  const [emailVal, setEmailVal] = useState('');
  const [disableEmail, setDisableEmail] = useState(false)

  const focusName = useRef();
  const focusEmail = useRef();
  const form = useRef();

  const { 
    themeDragBar,
    MailExpand, setMailExpand,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    clippyThanksYouFunction,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,
    iconFocusIcon,
  } = useContext(UseContext);

  // ----------------- Email Submission -----------------
  const sendEmail = async (e) => {
    setDisableEmail(true)
    e.preventDefault();

    const name = nameVal;
    const message = textVal;
    const email = emailVal;

    try {
      const res = await fetch("https://notebackend-wrqt.onrender.com/email/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, message, email })
      });

      const data = await res.json();

      if (data.success) {
        clippyThanksYouFunction();
        alert("Thank you for your interest, will contact you back shortly!");
        form.current.reset();
        setNameVal('');
        setEmailVal('');
        setTextVal('');
        setDisableEmail(false)
      } else {
        alert("Failed to send message.");
      }
    } catch (err) {
      console.log(err);
      alert("Error sending message.");
      setDisableEmail(false)
    }
  };

  // ----------------- Drag Handlers -----------------
  function handleDragStop(event, data) {
    const positionX = data.x;
    const positionY = data.y;
    setMailExpand(prev => ({
      ...prev,
      x: positionX,
      y: positionY
    }));
  }

  function handleExpandStateToggle() {
    setMailExpand(prevState => ({
      ...prevState,
      expand: !prevState.expand
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    const lastTap = lastTapTime || 0;
    if (now - lastTap < 300) {
      setMailExpand(prev => ({ ...prev, expand: !prev.expand }));
    }
    setLastTapTime(now);
  }

  return (
    <Draggable
      axis="both"
      handle={'.folder_dragbar-mail'}
      grid={[1, 1]}
      scale={1}
      disabled={MailExpand.expand}
      bounds="parent"
      defaultPosition={{ 
        x: window.innerWidth <= 500 ? 20 : 50,
        y: window.innerWidth <= 500 ? 40 : 120,
      }}
      onStop={handleDragStop}
      onStart={() => handleSetFocusItemTrue('Mail')}
    >
      <div
        className='folder_folder-mail'
        onClick={(e) => {
          e.stopPropagation();
          handleSetFocusItemTrue('Mail');
        }}
        style={ MailExpand.expand ? inlineStyleExpand('Mail') : inlineStyle('Mail')}
      >
        {/* ----------------- Drag Bar ----------------- */}
        <div
          className="folder_dragbar-mail"
          onDoubleClick={handleExpandStateToggle}
          onTouchStart={handleExpandStateToggleMobile}
          style={{ background: MailExpand.focusItem ? themeDragBar : '#757579' }}
        >
          <div className="folder_barname-mail">
            <img src={Mail} alt="Mail" />
            <span>Mail</span>
          </div>

          <div className="folder_barbtn-mail">
            <div
              onClick={!isTouchDevice ? (e) => {
                e.stopPropagation();
                setMailExpand(prev => ({ ...prev, hide: true, focusItem: false }));
                StyleHide('Mail');
              } : undefined}
              onTouchEnd={(e) => {
                e.stopPropagation();
                setMailExpand(prev => ({ ...prev, hide: true, focusItem: false }));
                StyleHide('Mail');
              }}
              onTouchStart={(e) => e.stopPropagation()}
            >
              <p className='dash-mail'></p>
            </div>

            <div
              onClick={!isTouchDevice ? handleExpandStateToggle : undefined}
              onTouchEnd={handleExpandStateToggle}
            >
              <motion.div className={`expand-mail ${MailExpand.expand ? 'full' : ''}`}></motion.div>
              {MailExpand.expand && <div className="expand_2-mail"></div>}
            </div>

            <div>
              <p
                className='x-mail'
                onClick={!isTouchDevice ? () => deleteTap('Mail') : undefined}
                onTouchEnd={() => deleteTap('Mail')}
              >×</p>
            </div>
          </div>
        </div>

        {/* ----------------- Menu ----------------- */}
        <div className="file_edit_container-mail">
          <p>File<span style={{ left: '-23px' }}>_</span></p>
          <p>Edit<span style={{ left: '-24px' }}>_</span></p>
          <p>View<span style={{ left: '-32px' }}>_</span></p>
          <p>Help<span style={{ left: '-30px' }}>_</span></p>
        </div>

        {/* ----------------- Folder Content ----------------- */}
        <div
          className="folder_content-mail"
          onClick={() => iconFocusIcon('')}
          style={MailExpand.expand ? { height: 'calc(100svh - 100px)' } : {}}
        >
          <form ref={form} onSubmit={sendEmail}>
            <div className="form_container">
              {/* Send Button & My Email */}
              <div className="to_container">
                <div className="sendmail_icon">
                  <input className="sendmail_img_container" type="submit" value="Send" disabled={disableEmail} />
                </div>
                <input
                  className="myemail_container"
                  placeholder='yudthsoponvit@gmail.com'
                  disabled
                  style={{ background: '#d4d1d1' }}
                />
              </div>

              {/* Name Input */}
              <div className="to_container">
                <div className="to_icon" onClick={() => focusName.current.focus()}>
                  <p>Name</p>
                </div>
                <input
                  ref={focusName}
                  className="myemail_container"
                  type="text"
                  name="from_name"
                  value={nameVal}
                  onChange={(e) => setNameVal(e.target.value)}
                  required
                  style={{ background: 'white' }}
                />
              </div>

              {/* Email Input */}
              <div className="to_container" onClick={() => focusEmail.current.focus()}>
                <div className="to_icon">
                  <p>Email</p>
                </div>
                <input
                  ref={focusEmail}
                  className="myemail_container"
                  type="email"
                  name="from_email"
                  value={emailVal}
                  onChange={(e) => setEmailVal(e.target.value)}
                  style={{ background: 'white' }}
                />
              </div>
            </div>

            {/* Message */}
            <textarea
              name="message"
              required
              placeholder='Type your message here...'
              value={textVal}
              onChange={(e) => setTextVal(e.target.value)}
            />
          </form>
        </div>
      </div>
    </Draggable>
  );
}

export default MailFolder;
