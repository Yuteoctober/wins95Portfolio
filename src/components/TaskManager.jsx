import UseContext from '../Context'
import { useContext, useState } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import { imageMapping } from './function/AppFunctions';
import '../css/TaskManager.css'

function TaskManager() {

  const [itemSelected, setItemSelected] = useState(null);
  const [selectedItemToClose, setSelectedItemToClose] = useState('');

    const { 
    btcShow,
    setShutdownWindow,
    TaskManagerExpand, setTaskManagerExpand,
    themeDragBar,
    ObjectState,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    iconFocusIcon,
    deleteTap,

   } = useContext(UseContext);



      function handleDragStop(event, data) {
        const positionX = data.x 
        const positionY = data.y
        setTaskManagerExpand(prev => ({
          ...prev,
          x: positionX,
          y: positionY
        }))

      }

  const allState = ObjectState()

  const bannedItems = ['Fortune', 'AiAgent', 'TaskManager', '3dObject']

  const activeStateAll = allState.filter(item => { // from objectState
    if(bannedItems.includes(item.name)) {
      return ;
    }
    return item.usestate.show === true
  });


  const activeState = [...activeStateAll];

  return (
    <>
      <Draggable
        axis="both" 
        handle={'.folder_dragbar'}
        grid={[1, 1]}
        scale={1}
        disabled={TaskManagerExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 5 : 80,
          y: window.innerWidth <= 500 ? 100 : 90,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('TaskManager')}
      >
        <div className='folder_folder-taskmanager' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('TaskManager');
              setItemSelected(null);
              setSelectedItemToClose('');
            }}
            style={ TaskManagerExpand.expand ? inlineStyleExpand('TaskManager') : inlineStyle('TaskManager')}>
          <div className="folder_dragbar"
             style={{ background: TaskManagerExpand.focusItem? themeDragBar : '#757579'}}
          >
            <div className="folder_barname">
              <img src={imageMapping('TaskManager')} alt="" style={{ width: '16px'}} />
                <span>
                    Task Manager
                </span>
              </div>
            <div className="folder_barbtn">
              <div onClick={ !isTouchDevice? (e) => {
                e.stopPropagation()
                setTaskManagerExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('TaskManager') 
              } : undefined
            }
                   onTouchEnd={(e) => {
                    e.stopPropagation()
                    setTaskManagerExpand(prev => ({...prev, hide: true, focusItem: false}))
                    StyleHide('TaskManager')
                  }}
                    onTouchStart={(e) => e.stopPropagation()}
              >
                <p className='dash'></p>
              </div>
              <div>
                <motion.div className={`expand ${TaskManagerExpand.expand ? 'full' : ''}`}
                  style={{ borderColor: 'grey'}}
                >
                </motion.div>
                {TaskManagerExpand.expand ? 
                (
                <div className="expand_2"></div>
                )
                :
                (null)}
              </div>
              <div>
                <p className='x'
                 onClick={!isTouchDevice ? () => {
                  deleteTap('TaskManager')
                 }: undefined
                }
                onTouchEnd={() => {
                  deleteTap('TaskManager')
              }}
                >×</p>
              </div>
            </div>
          </div>
          <div className="taskmanager_content"
            onClick={() => {
              iconFocusIcon('TaskManager');
              setSelectedItemToClose('');
            }}
            style={TaskManagerExpand.expand ? 
              { height: 'calc(100svh - 80px)'} 
              : 
              {}
            }
          >
              {activeState.map((item, index) => (
                <>
                  <p 
                    style={itemSelected === index ? 
                      { background: '#040482', color: 'white' } 
                      : {}
                    }
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setItemSelected(index)
                      setSelectedItemToClose(item.name);
                    }}
                  >
                    {item.name}
                  </p>
                </>
              ))}
  
          </div>
          <div className="taskmanager_text_btn">
            <p>
              WARNING: Pressing CTRL + ALT + DEL again will restart your computer.
              You will lose unsaved information in all programs that are running.
            </p>
          </div>
          <div className="taskmanager_btn_container"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <button className='a'
              onClick={() => {
                deleteTap(selectedItemToClose)
                setSelectedItemToClose('')
                setItemSelected(null);
              }}
            >End Task</button>
            <button className='a'
                onClick={() => setShutdownWindow(true)
              }
            >Shut Down</button>
            <button
              onClick={() => {
                setSelectedItemToClose('')
                setItemSelected(null);
              }}
            >Cancel</button>
          </div>
        </div>
      </Draggable>
    </>
  )
}

export default TaskManager
