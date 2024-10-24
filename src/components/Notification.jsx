import React, { useEffect, useState } from 'react';
import '../css/Notification.css';
import { motion, AnimatePresence } from 'framer-motion';

import icon_wins95 from '../assets/95icon.png';

function Notification() {
  const [notiOn, setNotiOn] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {

    setTimeout(() => { //delay notfi
      setNotiOn(true)
    }, 6000);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() =>{ // make noti disappear

    if(notiOn){
      setTimeout(() => {
        setNotiOn(false)
      }, 7000);
    }

  },[notiOn])

  return (
    <>
      <AnimatePresence>
      {notiOn && (
          <motion.div
            className="noti_container"
            onClick={() => setNotiOn(false)}
            initial={screenWidth <= 500 ? { top: -500} : { right: -500}}
            animate={screenWidth <= 500 ? { top: 16 } : { right: 16 }}
            exit={screenWidth <= 500 ? { top: -500 } : { right: -500 }}
            transition={{
              duration: 3,
              ease: 'easeInOut',
              type: 'spring',
              stiffness: 90,
              damping: 13,
            }}
          >
            <div className="noti_icon">
              <img src={icon_wins95} alt="icon_wins95" />
              <p>Notification</p>
            </div>
            <div className="noti_message">
              <p>
                Welcome to My Portfolio!
                <br />
                This portfolio is still a work in progress.
                If you like what you see, feel free to reach out and contact me!
              </p>
            </div>
          </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}

export default Notification;
