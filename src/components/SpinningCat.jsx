import { useEffect, useState, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UseContext from '../Context';
import '../css/SpinningCat.css';
import catVideo from '../assets/catvideo.mp4'
import catGif from '../assets/cat.gif'
import catautio from '../assets/cataudio.mp3'

function SpinningCat() {
    const videoRef = useRef(null);
    const audioRef = useRef(null);
    const timeoutRef = useRef(null)
    
    const {runCatVideo, setRunCatVideo} = useContext(UseContext);

    const handleEscape = () => {
        clearTimeout(timeoutRef.current);
        setRunCatVideo(false)
    }
  
    const handleAnimationEnd = () => {
        setTimeout(() => {
            if (videoRef.current) {
                audioRef.current.volume = 0.25
                videoRef.current.play();
                audioRef.current.play()
                const timeOut = setTimeout(() => {
                    setRunCatVideo(false)
                }, 64000);
                timeoutRef.current =  timeOut
            }
        },500)
    };

return (
    <>
    <AnimatePresence>
        {runCatVideo && (
            <motion.div className="cat_container"
                exit={{opacity: 0}}
                transition={{ ease: 'easeInOut', duration: 0.5}}
            >
                <div className="exit_btn"
                    onClick={handleEscape}
                >
                <span>ESC</span>
                </div>
                <video src={catVideo}
                    ref={videoRef}
                    muted
                    playsInline
                    controls={false}
                    disablePictureInPicture 
                    controlsList="nodownload noplaybackrate"
                />
                <img src={catGif} alt="" className='catgif'
                    onAnimationEnd={handleAnimationEnd}
                />
                <audio ref={audioRef} src={catautio}></audio>
            </motion.div>  
        )}
    </AnimatePresence>
    </>
  )
}

export default SpinningCat
