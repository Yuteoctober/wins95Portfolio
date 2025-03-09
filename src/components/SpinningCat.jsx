import { useEffect, useState, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UseContext from '../Context';
import '../css/SpinningCat.css';
import catVideo from '../assets/catvideo.mp4'
import catGif from '../assets/cat.gif'

function SpinningCat() {
    const videoRef = useRef(null);
    
    const {runCatVideo, setRunCatVideo, isTouchDevice} = useContext(UseContext);


    
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const handleEnd = () => {
            setTimeout(() => {
                setRunCatVideo(false)
            },2000);
            
        };

        videoElement.addEventListener('ended', handleEnd);

        return () => {
            videoElement.removeEventListener('ended', handleEnd); 
        };
    }, []);
  
    const handleAnimationEnd = () => {
        setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.volume = 0.25
                videoRef.current.play();
            }
        },3000)
    };

return (
    <>
    <AnimatePresence>
        {runCatVideo && (
            <motion.div className="cat_container"
                exit={{opacity: 0}}
                transition={{ ease: 'easeInOut', duration: 0.5}}
            >
                <video src={catVideo}
                    ref={videoRef}
                    autoPlay
                    muted={isTouchDevice ? true : false}
                    playsInline
                    controls={false}
                    disablePictureInPicture
                    controlsList="nodownload noplaybackrate"
                    width="100%"
                    height="auto"
                />
                <img src={catGif} alt="" className='catgif'
                    onAnimationEnd={handleAnimationEnd}
                />
            </motion.div>  
        )}
    </AnimatePresence>
    </>
  )
}

export default SpinningCat
