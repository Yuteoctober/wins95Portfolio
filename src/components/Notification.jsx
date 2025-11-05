import { useEffect, useState, useContext } from 'react';
import '../css/Notification.css';
import { motion, AnimatePresence } from 'framer-motion';
import UseContext from '../Context';
import msnIcon from '../assets/msn.png';
import icon_wins95 from '../assets/95icon.png';
import { imageMapping } from './function/AppFunctions';

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

  // Update screen width on resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    // Show initial notification delay
    const initialTimeout = setTimeout(() => setNotiOn(true), 6000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(initialTimeout);
    };
  }, []);

  // Automatically hide notifications after a duration
  useEffect(() => {
    if (!notiOn) return;

    const timeoutId = setTimeout(() => setNotiOn(false), 12000);
    setClearNotiTimeOut(timeoutId);

    return () => clearTimeout(timeoutId);
  }, [notiOn]);

  // Safely generate notification content
  function newNotification(message) {
    if (!message) message = {};

    const type = message.type || 'default';
    const safeName = message.appName || 'Unknown App';

    // Safe image fallback
    let img;
    try {
      img = type === 'msn' ? msnIcon : imageMapping(safeName) || icon_wins95;
    } catch {
      img = icon_wins95;
    }

    switch (type) {
      case 'msn':
        return {
          img,
          text1: 'You got a new message!',
          text2: '',
          function: 'MSN',
        };
      case 'appInstalling':
        return {
          img,
          text1: `Installing ${safeName}...`,
          text2: '',
          function: '',
        };
      case 'appInstalled':
        return {
          img,
          text1: `${safeName} is now installed`,
          text2: '',
          function: safeName,
        };
      case 'unIntallingApp':
        return {
          img,
          text1: `Uninstalling ${safeName}`,
          text2: '',
          function: '',
        };
      case 'appUninstalled':
        return {
          img,
          text1: `${safeName} is now uninstalled`,
          text2: '',
          function: '',
        };
      default:
        return {
          img: icon_wins95,
          text1: 'Welcome to My Windows 95 Portfolio! 🎉',
          text2: 'Hope you enjoy exploring......',
          function: '',
        };
    }
  }

  // Safely extract the current notification data
  const notificationData = newNotification(newMessage);

  return (
    <AnimatePresence>
      {notiOn && (
        <motion.div
          key="Noti"
          className="noti_container"
          onClick={() => {
            handleShow(notificationData.function);
            setNotiOn(false);
          }}
          initial={screenWidth <= 500 ? { top: -500 } : { right: -500 }}
          animate={screenWidth <= 500 ? { top: 16 } : { right: 16 }}
          exit={{
            top: screenWidth <= 500 ? -500 : undefined,
            right: screenWidth > 500 ? -500 : undefined,
            transition: { type: 'tween', duration: 1 },
          }}
          transition={{ type: 'spring', stiffness: 90, damping: 13 }}
        >
          <div className="noti_icon">
            <img src={notificationData.img} alt="" />
            <p>Notification</p>
          </div>
          <div className="noti_message">
            <p>
              {notificationData.text1}
              <br />
              {notificationData.text2}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Notification;
