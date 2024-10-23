import React, { useEffect, useState } from 'react';
import '../css/Notification.css';
import icon_wins95 from '../assets/95icon.png';

function Notification() {
  const [hasAnimated, setHasAnimated] = useState(false);

  // Function to apply animation based on screen width
  const applyAnimation = () => {
    const notiContainer = document.querySelector('.noti_container');
    const screenWidth = window.innerWidth;

    if (!hasAnimated && notiContainer) {
        if (screenWidth <= 500) {
          // Directly apply the animation from top
          notiContainer.style.animation = 'noti_slide_from_top 10s ease-in-out forwards';
        } else {
          // Directly apply the animation from right
          notiContainer.style.animation = 'noti_slide_from_right 10s ease-in-out forwards';
        }
  
        setHasAnimated(true); // Mark animation as done
      }
    };

  useEffect(() => {
    // Run animation on load
    applyAnimation();

    // Run animation on resize, but only if it hasn't run before
    const handleResize = () => {
      if (!hasAnimated) {
        applyAnimation();
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [hasAnimated]);

  return (
    <div className='noti_container'>
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
    </div>
  );
}

export default Notification;
