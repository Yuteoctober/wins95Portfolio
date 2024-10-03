import { useEffect, useContext } from 'react'
import UseContext from '../Context'
import Draggable from 'react-draggable'
import WinampPlayer from './WinampPlayer';

function Dragdrop() {


  const { 
    iconState,
    imageMapping,
    handleShow, handleShowMobile,
    isTouchDevice,
    iconFocusIcon,
  } = useContext(UseContext);

  const handleBodyClick = (event) => {
    if (!event.target.closest('.icon')) {
      iconFocusIcon('')
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
                    <div className='icon' key={icon.name}
                      onDoubleClick={() => handleShow(icon.name)}                      
                      onClick={ !isTouchDevice ? (e) => {
                        iconFocusIcon(icon.name);
                        e.stopPropagation()
                      } : undefined
                    }           
                      onTouchStart={() => {
                        handleShowMobile(icon.name);
                        iconFocusIcon(icon.name);
                      }}
                    >
                    <img src={imageMapping(icon.pic)} alt='#' className={icon.focus? 'img_focus' : ''}/>
                        <p className={icon.focus? 'p_focus' : ''} >
                          {icon.name}
                        </p>
                    </div>
                </Draggable> 
            )))} 
        <WinampPlayer/>
      </div>
    </section>
  )
}

export default Dragdrop
