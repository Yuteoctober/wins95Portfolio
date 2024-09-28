import UseContext from '../Context'
import { useContext, useEffect, useState } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import settingIcon from '../assets/setting.png'
import bgPic from '../assets/bgpc.png'
import bg1 from '../assets/bg1.jpg'
import bg2 from '../assets/bg2.jpg'
import bg3 from '../assets/bg3.jpg'
import bg4 from '../assets/bg4.jpg'
import bg5 from '../assets/bg5.jpg'
import '../css/BgSetting.css'


function BgSetting() {

  const [ ImgBgPreview, setImgBgPreview ] = useState(null)
  const [ localBg, setLocalBg ] = useState(() => {
    const prevBg = localStorage.getItem('background')
    return prevBg? prevBg : null
  })
  const [ selectedBg2, setSelectedBg2 ] = useState(null)

  const { 
    BgSettingExpand ,setBgSettingExpand,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,
   } = useContext(UseContext);

      function handleDragStop(event, data) {
        const positionX = data.x 
        const positionY = data.y
        setBgSettingExpand(prev => ({
          ...prev,
          x: positionX,
          y: positionY
        }))
      }

      const colorOptions = [
        { value: 1, label: '(None)', background: 'transparent' },
        { value: 2, label: 'Purple Summer', background: '#040482' },
        { value: 3, label: 'Matt Blue', background: '#040482' },
        { value: 4, label: 'Matt Green', background: '#040482' },
        { value: 5, label: 'Emeral Green', background: '#040482' },
        { value: 6, label: 'Blue Sky', background: '#040482' },
      ];

      function setbgColorFunction2(index) {
        setSelectedBg2(index); 
        
        switch (index) {
          case 1:
            setImgBgPreview(null);
            break;
          case 2:
            setImgBgPreview(bg1); 
            break;
          case 3:
            setImgBgPreview(bg2);
            break;
          case 4:
            setImgBgPreview(bg3);
            break;
          case 5:
            setImgBgPreview(bg4);
            break;
          case 6:
            setImgBgPreview(bg5);
            break;
        }
      }

      useEffect(() => {
        const bodyBG = document.getElementsByTagName('body')[0];

        if (localBg) {
          bodyBG.style.backgroundImage = `url(${localBg})`;
        }
      },[])

      function appleBG() {
        const bodyBG = document.getElementsByTagName('body')[0];
        
        if (ImgBgPreview) {
          bodyBG.style.backgroundImage = `url(${ImgBgPreview})`; 
        } else {
          bodyBG.style.backgroundImage = 'none';
        }
      }
      
      function cancelBg() {
        const bodyBG = document.getElementsByTagName('body')[0];
      
        if (localBg) {
          bodyBG.style.backgroundImage = `url(${localBg})`;
        } else {
          bodyBG.style.backgroundImage = 'none';
        }
      }
      

      function okBg() {

        const bodyBG = document.getElementsByTagName('body')[0]


        if (ImgBgPreview) {
          bodyBG.style.backgroundImage = `url(${ImgBgPreview})`; 
        }
        
        if (ImgBgPreview) {
          localStorage.setItem('background', ImgBgPreview);
        } 
        return;
      }

  return (
    <>
      <Draggable
        axis="both" 
        handle={'.folder_dragbar_bgsetting'}
        grid={[1, 1]}
        scale={1}
        disabled={BgSettingExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 35 : 70,
          y: window.innerWidth <= 500 ? 35 : 40,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('Settings')}
      >
        <motion.div className='bgsetting_folder' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('Settings');
            }}
            style={ BgSettingExpand.expand ? inlineStyleExpand('Settings') : inlineStyle('Settings')}>
          <div className="folder_dragbar_bgsetting"
             style={{ background: BgSettingExpand.focusItem? '#14045c' : '#757579'}}
          >
            <div className="bgsetting_barname">
              <img src={settingIcon} alt="" />
              <span>Settings</span>
            </div>
            <div className="bgsetting_barbtn">
              <div onClick={ !isTouchDevice ? (e) => {
                e.stopPropagation()
                setBgSettingExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('Settings')
              } : undefined
              }   
                onTouchEnd={(e) => {
                e.stopPropagation()
                setBgSettingExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('Settings')
              }}

              >
                <p className='dash'></p>
              </div>

                <div>
                <p className='x'
                  onClick={!isTouchDevice ? () => {
                    deleteTap('Settings')
                    cancelBg()
                  }
                  : undefined}
                  onTouchEnd={() => deleteTap('Settings')}
                >x
                </p>
              </div>
            </div>
          </div>
          <div className="file_tap_container-bgsetting">
          <p>
            Background
          </p>
          </div>
          <div className="folder_content">
            <div className="folder_content-bgsetting">
            <img
              alt="bgsettingPC"
              className='bgsetting_img'
              src={bgPic}
            />
            <div className="preview_bg">
              {ImgBgPreview && (
                <img src={ImgBgPreview} alt='' />
              )}
            </div>
            <div className="bgsettingtext_container"> 
              <div className="wallpaper">
                <p>Wallpaper</p>
                <p>Select an HTML Element or Picture</p>
                <div className="wallpaper_container">
                {colorOptions.map((option) => (
                  <ul
                    key={option.value}
                    onClick={() => setbgColorFunction2(option.value)}
                    style={
                      selectedBg2 === option.value
                        ? { background: option.background, color: 'white' }
                        : {}
                    }
                  >
                    {option.label}
                  </ul>
                ))}
                </div>
              </div>
            </div>
              
            </div>
            <div className="bgsetting_btn_container">
              <div className="bgsetting_btn_ok"
                onClick={!isTouchDevice ? () => {
                  deleteTap('Settings')
                  okBg()
              } 
              : undefined
              }
              onTouchEnd={() => {
                deleteTap('Settings')
                okBg()
              }}
              >
                <span>
                  OK
                </span>
              </div>

              <div className="bgsetting_btn_cancel"
              onClick={!isTouchDevice ? () => { 
                deleteTap('Settings') 
                cancelBg()
              }
              : undefined
              }
              onTouchEnd={() => {
                deleteTap('Settings')
                cancelBg()
              }}
              ><span>Cancel</span>
              </div>

              <div className="bgsetting_btn_cancel"
                onClick={appleBG}
              ><span>Apply</span>
              </div>
            </div>
          </div>
        </motion.div>
      </Draggable>
    </>
  )
}          

export default BgSetting
