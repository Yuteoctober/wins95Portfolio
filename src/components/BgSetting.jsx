import UseContext from '../Context'
import { useContext, useEffect, useState } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import settingIcon from '../assets/setting.png'
import bgPic from '../assets/bgpc.png'
import bg0 from '../assets/bg0.png'
import bg1 from '../assets/bg1.png'
import bg2 from '../assets/bg2.jpg'
import bg3 from '../assets/bg3.jpg'
import bg5 from '../assets/bg5.png'
import bg6 from '../assets/bg6.jpg'
import bg7 from '../assets/bg7.png'
import bg8 from '../assets/bg8.png'
import bg9 from '../assets/bg9.jpg'
import bg10 from '../assets/live_grey.gif'
import bg11 from '../assets/live_light_grey.gif'
import eff1 from '../assets/noise.png'
import eff2 from '../assets/oldtv.jpg'
import eff3 from '../assets/brokenTV.jpg'
import eff4 from '../assets/DarkTV.jpg'
import eff5 from '../assets/glitch.gif'
import eff6 from '../assets/glitch2.gif'
import '../css/BgSetting.css'


function BgSetting() {
  const [bgTap, setBgTap] = useState(true)
  const [effectTap, setEffectTap] = useState(false)
  const [ barcolor, setBarcolor ] = useState(null)
  const [ ImgBgPreview, setImgBgPreview ] = useState(null)
  const [ ImgBgPreviewEffect, setImgBgPreviewEffect ] = useState(null)
  
  const [ localBg, setLocalBg ] = useState(() => {
    const prevBg = localStorage.getItem('background')
    return prevBg? prevBg : null
  })
  const [ localEffect, setLocalEffect ] = useState(() => {
    const prevEffect = localStorage.getItem('effect')
    return prevEffect? prevEffect : null
  })

  const [ themeColor, setThemeColor ] = useState(null)
  const [ localtheme, setLocalTheme ] = useState(() => {
    const prevTheme = localStorage.getItem('theme')
    return prevTheme? prevTheme : null
  })
  const [ selectedBg2, setSelectedBg2 ] = useState(null)
  const [ selectedBg2Effect, setSelectedBg2Effect ] = useState(null)

  const { 
    themeDragBar, setThemeDragBar,
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
        { value: 1, label: '(None)', color: '#098684', image: bg0, barColor: '#14045c'},
        { value: 2, label: 'Purple Summer', color: '#3F4565', image: bg1, barColor: '#3F4565'},
        { value: 3, label: 'Matt Blue', color: '#456EA6', image: bg2, barColor: '#456EA6'},
        { value: 4, label: 'Matt Green', color: '#008081', image: bg3, barColor: '#008081'},
        { value: 6, label: 'Blue Sky', color: '#4B6894', image: bg5, barColor: '#4B6894'},
        { value: 7, label: 'Dark Tone', color: '#313439', image: bg6, barColor: '#313439'},
        { value: 8, label: 'Light Pink', color: '#f3aac0', image: bg7, barColor: '#1c1719'},
        { value: 9, label: 'Deep Ocean', color: '#3F4565', image: bg8, barColor: '#3F4565'},
        { value: 10, label: 'Purple Blue', color: '#354092', image: bg9, barColor: '#354092'},
        { value: 11, label: 'Live Wavy Grey', color: '#3C3C3C', image: bg10, barColor: '#3C3C3C'},
        { value: 12, label: 'Live Wavy Light Grey', color: '#828890', image: bg11, barColor: '#4a4a4a'},
      ];
      
      
      const effectOptions = [
        { value: 1, label: '(None)', image: 'none'},
        { value: 2, label: 'Noise', image: eff1},
        { value: 3, label: 'Old TV', image: eff2},
        { value: 4, label: 'Broken TV', image: eff3},
        { value: 5, label: 'Dark TV', image: eff4},
        { value: 6, label: 'Glitch', image: eff5},
        { value: 7, label: 'Glitch Two', image: eff6},
      ];
      
      function setbgColorFunction2(index) {
        const selectedOption = colorOptions.find(option => option.value === index);
        
        if (selectedOption) {
          setSelectedBg2(index);
          setImgBgPreview(selectedOption.image);
          setThemeColor(selectedOption.color);
          setBarcolor(selectedOption.barColor)
        }
      }

      function setbgColorFunction2Effect(index) {
        const selectedOption = effectOptions.find(option => option.value === index);
        
        if (selectedOption) {
          setSelectedBg2Effect(index);
          setImgBgPreviewEffect(selectedOption.image);
        }
      }

      useEffect(() => { // when exited app, make set everything to null to prevent bug when reopen

        if(!BgSettingExpand.show) {
          setImgBgPreview(null)
          setImgBgPreviewEffect(null)
          setSelectedBg2(null)
          setSelectedBg2Effect(null)
          setEffectTap(false)
          setBgTap(true)
        }

      },[BgSettingExpand])
      

      useEffect(() => {
        const bodyBG = document.getElementsByTagName('body')[0];
        const rootEffect = document.getElementById('root');

        if (localEffect) { // for effect
          rootEffect.style.setProperty('--before-bg-image', `url(${localEffect})`);
        }

        if (localBg) { // for background
          bodyBG.style.backgroundColor = localtheme
          bodyBG.style.backgroundImage = `url(${localBg})`;
        }
      },[])

      function appleBG() {
        const bodyBG = document.getElementsByTagName('body')[0];
        const rootEffect = document.getElementById('root');

        if (ImgBgPreviewEffect) { // for Effect
          rootEffect.style.setProperty('--before-bg-image', `url(${ImgBgPreviewEffect})`);
        } 

        if (ImgBgPreview) { // for background
          bodyBG.style.backgroundColor = themeColor
          bodyBG.style.backgroundImage = `url(${ImgBgPreview})`; 
          setThemeDragBar(barcolor)
        } else {
          return;
        }
      }
      
      function cancelBg() {
        const bodyBG = document.getElementsByTagName('body')[0];
        const rootEffect = document.getElementById('root');
        const localBarColor = localStorage.getItem('barcolor')

        if (localEffect) { // for Effect
          rootEffect.style.setProperty('--before-bg-image', `url(${localEffect})`);
        } 
      
        if (localBg) { // for background
          bodyBG.style.backgroundColor = localtheme
          bodyBG.style.backgroundImage = `url(${localBg})`;
          setThemeDragBar(localBarColor)
        } else {
          return;
        }
      }
      

      function okBg() {

        const bodyBG = document.getElementsByTagName('body')[0]
        const rootEffect = document.getElementById('root');


        if (ImgBgPreviewEffect) { // for effect
          rootEffect.style.setProperty('--before-bg-image', `url(${ImgBgPreviewEffect})`);
        }
        
        if (ImgBgPreviewEffect) { // for effect
          localStorage.setItem('effect', ImgBgPreviewEffect); // set background in localstroage
          setLocalEffect(ImgBgPreviewEffect)
          setLocalEffect(localEffect)
        } 

        if (ImgBgPreview) { // for background
          bodyBG.style.backgroundColor = themeColor
          bodyBG.style.backgroundImage = `url(${ImgBgPreview})`; 
          setThemeDragBar(barcolor)
        }
        
        if (ImgBgPreview) { // for background
          localStorage.setItem('theme', themeColor); // set theme in localstroage
          localStorage.setItem('background', ImgBgPreview); // set background in localstroage
          localStorage.setItem('barcolor', barcolor); // set barcolor in localstroage
          setLocalBg(ImgBgPreview)
          setLocalTheme(themeColor)
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
             style={{ background: BgSettingExpand.focusItem? themeDragBar : '#757579'}}
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
                onTouchStart={(e) => e.stopPropagation()}
              >
                <p className='dash'></p>
              </div>

                <div>
                <p className='x'
                  onClick={!isTouchDevice ? () => {
                    cancelBg()
                    deleteTap('Settings')
                  }
                  : undefined}
                  onTouchEnd={() => {
                    cancelBg()
                    deleteTap('Settings')
                  }}
                >×
                </p>
              </div>
            </div>
          </div>
          <div className="file_tap_container-bgsetting">
          <p 
            style={{ 
              borderBottomColor: bgTap ? '' : '#f0efef',
              bottom: bgTap? '2px' : '',
            }}
            onClick={() => {
              setBgTap(true)
              setEffectTap(false)
            }}
          >
            <span style={{
              border: bgTap? '1px dotted black' :''
            }}>
              Background
            </span>
            
          </p>
          <p
            style={{ 
              borderBottomColor: effectTap ? '' : '#f0efef',
              bottom: effectTap? '2px' : '',
            }}
            onClick={() => {
              setBgTap(false)
              setEffectTap(true)
            }}
          >
            <span style={{
                    border: effectTap? '1px dotted black' :''
                  }}>
            Effect
            </span>
          </p>
          
          </div>
          <div className="folder_content">
          {/* Background Section */}
          {bgTap && (
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
                            ? { background: '#040482', color: 'white' }
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
          )}

          {/* Effect Section */}
          {effectTap && (
            <div className="folder_content-bgsetting">
            <img
              alt="bgsettingPC"
              className='bgsetting_img'
              src={bgPic}
            />
            <div className="preview_bg">
              {ImgBgPreviewEffect && (
                <img src={ImgBgPreviewEffect} alt='' />
              )}
            </div>
            <div className="bgsettingtext_container">
              <div className="wallpaper">
                <p>
                  Effect
                </p>
                <p>Select desired Effect</p>
                <div className="wallpaper_container">
                  {effectOptions.map((option) => (
                    <ul
                      key={option.value}
                      onClick={() => setbgColorFunction2Effect(option.value)}
                      style={
                        selectedBg2Effect === option.value
                          ? { background: '#040482', color: 'white' }
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
          )}
{/* ------------------------ EFFECT END ----------------------------- */}
          <div className="bgsetting_btn_container">
            <div className="bgsetting_btn_ok"
              onClick={!isTouchDevice ? () => {
                deleteTap('Settings')
                okBg()
              } : undefined
              }
              onTouchEnd={() => {
                deleteTap('Settings')
                okBg()
              }}
            >
              <span>OK</span>
            </div>

            <div className="bgsetting_btn_cancel"
              onClick={!isTouchDevice ? () => { 
                deleteTap('Settings') 
                cancelBg()
              } : undefined
              }
              onTouchEnd={() => {
                deleteTap('Settings')
                cancelBg()
              }}
            >
              <span>Cancel</span>
            </div>

            <div className="bgsetting_btn_cancel"
              onClick={appleBG}
            >
              <span>Apply</span>
            </div>
          </div>
        </div>

        </motion.div>
      </Draggable>
    </>
  )
}          

export default BgSetting
