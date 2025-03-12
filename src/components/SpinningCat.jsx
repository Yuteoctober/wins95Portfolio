import { useEffect, useState, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UseContext from '../Context';
import '../css/SpinningCat.css';
import catVideo from '../assets/catvideo.mp4'
import catGif from '../assets/cat.gif'
import catautio from '../assets/cataudio.mp3'
import oiia from '../assets/oiia.mp3'

function SpinningCat() {
    const [escBtn, setBscBtn] = useState(false);
    const videoRef = useRef(null);
    const audioRef = useRef(null);
    const timeoutRef = useRef(null)
    const oiiaRef = useRef(null)
    
    const {runCatVideo, setRunCatVideo} = useContext(UseContext);

    useEffect(() => {
        
        if(escBtn){
            setTimeout(() => {
                setBscBtn(false)
            }, 3000);
        }
    },[escBtn])

    useEffect(() => { 
        const img = new Image();
        img.src = catGif; // Preload GIF
    }, []);

    const handleEscape = () => {
        clearTimeout(timeoutRef.current);
        oiiaRef.current.currentTime = 0;
        setRunCatVideo(false)
    }

    const handleStartSound = () => {
        if(oiiaRef.current){
            oiiaRef.current.volume = 0.25;
            oiiaRef.current.play();
        }
    }
  
    const handleAnimationEnd = () => {
        setTimeout(() => {
            if (videoRef.current && audioRef.current) {
                audioRef.current.volume = 0.25;
    
                // Play audio and video simultaneously
                Promise.all([
                    audioRef.current.play(),
                    videoRef.current.play()
                ]).catch((error) => {
                    console.error("Playback failed:", error);
                });
    
                // Stop video after 64 seconds
                timeoutRef.current = setTimeout(() => {
                    setRunCatVideo(false);
                    oiiaRef.current.currentTime = 0;
                }, 64000);
            }
        }, 500);
    };

return (
    <>
    <AnimatePresence>
        {runCatVideo && (
            <motion.div className="cat_container"
            onClick={() => setBscBtn(true)}
                exit={{opacity: 0}}
                transition={{ ease: 'easeInOut', duration: 0.5}}
            >
                <div className={`exit_btn ${escBtn ? '' : 'hide'}`}
                    onClick={((e) => {
                        e.stopPropagation
                        handleEscape()
                    })}
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
                    onAnimationStart={handleStartSound}
                    onAnimationEnd={handleAnimationEnd}
                />
                <audio ref={audioRef} src={catautio} />
                <audio ref={oiiaRef} src={oiia} />
            </motion.div>  
        )}
    </AnimatePresence>
    </>
  )
}

export default SpinningCat
