import { useEffect, useState, useContext } from 'react';
import '../css/Notification.css';
import { motion, AnimatePresence } from 'framer-motion';
import UseContext from '../Context';
import msnIcon from '../assets/msn.png';
import icon_wins95 from '../assets/95icon.png';

function Notification() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const {
    clearNotiTimeOut, setClearNotiTimeOut,
    isTouchDevice,
    handleShow, handleShowMobile,
    newMessage, 
    setNewMessage, 
    notiOn, setNotiOn,
  } = useContext(UseContext);

  useEffect(() => {
    // Delay the notification appearance
    setTimeout(() => {
      setNotiOn(true);
    }, 6000);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {

    if (notiOn) {
      const timeoutId = setTimeout(() => {
        setNotiOn(false);
      }, 12000);
      setClearNotiTimeOut(timeoutId)
  
      // Cleanup function to clear the timeout when `notiOn` changes or component unmounts
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [notiOn]);
  

  function newNotification(messageType) {
    switch (messageType) {
      case 'msn':
        return {
          img: msnIcon,
          text1: 'You got a new message!',
          text2: '',
          function: 'MSN'
        };
      default:
        return {
          img: icon_wins95,
          text1: 'Welcome to My Windows 95 Portfolio! 🎉',
          text2: 'It’s a fun, retro-styled space where I showcase my projects. Hope you enjoy exploring!',
          function: ''
        };
    }
  }

  return (
    <>
      <AnimatePresence>
        {notiOn && (
          <motion.div
            onClick={()=> {
            handleShow(newNotification(newMessage).function)
            setNotiOn(false)
          }}       
            key="Noti"
            className="noti_container"
            initial={screenWidth <= 500 ? { top: -500 } : { right: -500 }}
            animate={screenWidth <= 500 ? { top: 16 } : { right: 16 }}
            exit={{
              top: screenWidth <= 500 ? -500 : undefined,
              right: screenWidth > 500 ? -500 : undefined,
              transition: {
                type: 'tween',
                duration: 1
              }
            }}
            transition={{
              type: 'spring',
              stiffness: 90,
              damping: 13
            }}
          >
            <div className="noti_icon">
              <img src={newNotification(newMessage).img} alt="Notification Icon" />
              <p>Notification</p>
            </div>
            <div className="noti_message">
              <p>
                {newNotification(newMessage).text1}
                <br />
                {newNotification(newMessage).text2}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Notification;
