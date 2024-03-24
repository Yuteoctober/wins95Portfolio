import { useEffect, useContext } from 'react'
import UseContext from '../Context'
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import WinampPlayer from './WinampPlayer';

function Dragdrop() {

  

  const { 
    iconState, setIconState,
    imageMapping,
    handleShow, handleShowMobile,
    isTouchDevice,
    setResumeExpand,
    setProjectExpand,
    setNftExpand,
    setNoteExpand,
    setTypeExpand,
    setWinampExpand,
    setResumeFileExpand,
  } = useContext(UseContext);


  const handleFocusIcon = (name) => { 
    const updatedFocus = iconState.map(icon => ({
      ...icon,
      focus: icon.name === name
    }));
    setIconState(updatedFocus);
    setProjectExpand(prev => ({...prev, item_1Focus: false, item_2Focus: false, item_3Focus: false}));
    setResumeExpand(prev => ({...prev, item_1Focus: false}));
    setNftExpand(prev => ({...prev, item_1Focus: false}));
    setNoteExpand(prev => ({...prev, item_1Focus: false}));
    setTypeExpand(prev => ({...prev, item_1Focus: false}));
    setWinampExpand(prev => ({...prev, focus: false}));
    // setResumeFileExpand(prev => ({...prev, item_1Focus: false}));
  };

  const handleBodyClick = (event) => {
    if (!event.target.closest('.icon')) {
      const updatedIcons = iconState.map(icon => ({
        ...icon,
        focus: false
      }));
      setIconState(updatedIcons);
      setProjectExpand(prev => ({...prev, item_1Focus: false, item_2Focus: false, item_3Focus: false}))
      setResumeExpand(prev => ({...prev, item_1Focus: false}))
      setNftExpand(prev => ({...prev, item_1Focus: false}));
      setNoteExpand(prev => ({...prev, item_1Focus: false}));
      setTypeExpand(prev => ({...prev, item_1Focus: false}));
      setWinampExpand(prev => ({...prev, focus: false}));
      // setResumeFileExpand(prev => ({...prev, item_1Focus: false}));
    }
  };
  

  useEffect(() => {
    document.body.addEventListener('click', handleBodyClick);
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);


  return (
    <section className='bound'>
      <div className='drag_drop'>
            {iconState.map((icon => (
                <Draggable
                    key={icon.name}
                    cancel=''
                    axis="both" 
                    handle={'.icon'}
                    grid={[10, 10]}
                    scale={1}
                    bounds='.bound'
                >
                    <motion.div className='icon' key={icon.name}
                      initial={{ opacity: 1 }}
                      whileTap={{ opacity: 0.5 }}
                      transition={{ opacity: { duration: 0.2 } }}
                      exit={{ opacity: 1}}
                      onDoubleClick={() => handleShow(icon.name)}                      
                      onClick={ !isTouchDevice ? (e) => {
                        handleFocusIcon(icon.name);
                        e.stopPropagation()
                      } : undefined
                    }           
                      onTouchStart={() => {
                        handleShowMobile(icon.name);
                        handleFocusIcon(icon.name);
                      }}
                    >
                    <img src={imageMapping(icon.pic)} alt='#' className={icon.focus? 'img_focus' : ''}/>
                        <p className={icon.focus? 'p_focus' : ''} >
                          {icon.name}
                        </p>
                    </motion.div>
                </Draggable> 
            )))} 
        <WinampPlayer/>
      </div>
    </section>
  )
}

export default Dragdrop
