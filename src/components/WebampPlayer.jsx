import { useEffect, useRef, useContext, useState } from 'react';
import UseContext from '../Context'
import Webamp from 'webamp';
import mp3 from '../assets/never-gonna-give-you-up.mp3';

const WebampPlayer = () => {

    const [focus, setFocus] = useState(false)

    const { 
        ObjectState,
        maxZindexRef,
        WinampExpand, setWinampExpand,

        deleteTap,
      } = useContext(UseContext);

    const appRef = useRef(null);

    useEffect(() => {
        let webampInstance;
        let disposed = false; 
    
        const startWebamp = () => {
            if (Webamp.browserIsSupported()) {
                const options = {
                    initialTracks: [{
                        metaData: {
                            artist: "Rick Astley",
                            title: "Never Gonna Give You Up"
                        },
                        url: mp3,
                        duration: 213
                    }],
                    zIndex: 999
                };
                const webamp = new Webamp(options);
                webampInstance = webamp;
    
                const handleClose = () => {
                    if (!disposed) {
                        disposed = true; 
                        webamp.dispose();
                        deleteTap('Winamp')
                    }
                };
    
                webamp.onClose(handleClose);
    
                webamp.onMinimize(() => {
                    const webampElement = document.querySelector('#webamp');
      
                    if (webampElement) {
                        webampElement.style.opacity = 0;
                        webampElement.style.pointerEvent = 'none'
                        webampElement.style.touchAction = 'none'
                        webampElement.style.zIndex = -1
                        setWinampExpand(prev => ({...prev, hide: true, focusItem: false}));
                        setFocus(false)
                    }
                });
    
                webamp.renderWhenReady(appRef.current);
            }
        };
    
        startWebamp();
    
        return () => {
            if (webampInstance && !disposed) {
                disposed = true; 
                webampInstance.dispose();
            }
        };
    }, []);


    useEffect(() => {
        const webampElement = document.querySelector('#webamp');
    
        if (webampElement) {

            if (WinampExpand.focusItem) {
                webampElement.style.zIndex = 999;
            } 

            // if(WinampExpand.focusItem && WinampExpand.hide) {
            //     webampElement.style.touchAction = 'none'
            //     webampElement.style.zIndex = -1;
            // }
            
            if(!WinampExpand.focusItem && !WinampExpand.hide) {
                const maxZindex = (maxZindexRef.current || 0 ) + 1;
                webampElement.style.zIndex = maxZindex;
                maxZindexRef.cururent = maxZindex;
            }
               
        } 
    }, [WinampExpand.focusItem]);
    
    useEffect(() => {
        
        const handleFocusWinamp = (event) => {

            if (event.target.closest('#webamp' || event.target.closest('#winamp-container')) && !focus) {
                const allState = ObjectState()
                allState.forEach(item => {
                    item.setter(prev => ({...prev, focusItem: item.name === 'Winamp'}))
                })
            }
        };
    
        document.addEventListener('click', () => {
            handleFocusWinamp()
            setFocus(true)
        });
        document.addEventListener('touchstart', handleFocusWinamp);
        document.addEventListener('mousedown', handleFocusWinamp);
    
        return () => {
            document.removeEventListener('click', handleFocusWinamp);
            document.removeEventListener('touchstart', handleFocusWinamp);
            document.removeEventListener('mousedown', handleFocusWinamp);
        };
    }, []);
    
    
    

    return(   
        <div ref={appRef} className='winampRef'></div>
    );
};

export default WebampPlayer;
