import UseContext from '../Context'
import { useContext } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import Project from '../assets/regFolder.png'
import regFolder from '../assets/regFolder.png'
import '../css/ProjectFolder.css'


function ProjectFolder() {

  const { 
    ProjectExpand, setProjectExpand,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    handleShow,
    handleShowMobile,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    iconFocusIcon,
    deleteTap,
   } = useContext(UseContext);

      function handleDragStop(event, data) {
        const positionX = data.x 
        const positionY = data.y
        setProjectExpand(prev => ({
          ...prev,
          x: positionX,
          y: positionY
        }))

      }

   function handleExpandStateToggle() {
    setProjectExpand(prevState => ({
      ...prevState,
      expand: !prevState.expand
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
        setProjectExpand(prevState => ({
            ...prevState,
            expand: !prevState.expand
        }));
    }
    setLastTapTime(now);
}


  return (
    <>
      <Draggable
        axis="both" 
        handle={'.folder_dragbar-project'}
        grid={[1, 1]}
        scale={1}
        disabled={ProjectExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 20 : 40,
          y: window.innerWidth <= 500 ? 40 : 160,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('Project')}
      >
        <div className='folder_folder-project' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('Project');
            }}
            style={ ProjectExpand.expand ? inlineStyleExpand('Project') : inlineStyle('Project')}>
          <div className="folder_dragbar-project"
              onDoubleClick={handleExpandStateToggle}
              onTouchStart={handleExpandStateToggleMobile}
             style={{ background: ProjectExpand.focusItem? '#14045c' : '#757579'}}
          >
            <div className="folder_barname-project">
              <img src={Project} alt="Project" />
              <span>Project</span>
            </div>
            <div className="folder_barbtn-project">
              <div onClick={ !isTouchDevice? (e) => {
                e.stopPropagation()
                setProjectExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('Project') 
              } : undefined
            }
                   onTouchEnd={(e) => {
                    e.stopPropagation()
                    setProjectExpand(prev => ({...prev, hide: true, focusItem: false}))
                    StyleHide('Project')
                  }}
              >
                <p className='dash-project'></p>
              </div>
              <div
                onClick={ !isTouchDevice ? () => handleExpandStateToggle() : undefined}
                onTouchEnd={handleExpandStateToggle}
              >
              <motion.div className={`expand-project ${ProjectExpand.expand ? 'full' : ''}`}>
                </motion.div>
                {ProjectExpand.expand ? 
                (
                <div className="expand_2-project"></div>
                )
                :
                (null)}
              </div>
              <div><p className='x-project'
                 onClick={!isTouchDevice ? () => {
                  deleteTap('Project')
                 }: undefined
                }
                onTouchEnd={() => {
                  deleteTap('Project')
              }}
              >x</p></div>
            </div>
          </div>

          <div className="file_edit_container-project">
              <p>File<span style={{left: '-23px'}}>_</span></p>
              <p>Edit<span style={{left: '-24px'}}>_</span></p>
              <p>View<span style={{left: '-32px'}}>_</span></p>
              <p>Help<span style={{left: '-30px'}}>_</span></p>
          </div>
          <div className="folder_content-project"
            onClick={() => iconFocusIcon('')}
            style={ProjectExpand.expand ? 
              { height: 'calc(100svh - 122px)'} 
              : 
              {}
            }
          >
            <div className="item_container-project">
              {/* ---------- project 1 ------------- */}
              <div className='item_1-project'
                onDoubleClick={() => handleShow('Nft')}
                onTouchStart={() => handleShowMobile('Nft')}
                onClick={(e) => {
                  e.stopPropagation();
                  iconFocusIcon('ProjectNftfolder')
                }}
              >
                <img src={regFolder} alt="regFolder-project" 
                  className={ProjectExpand.item_1iconFocus? 'item_1_img_focus-project' : ''}
                />
                <p className={ProjectExpand.item_1iconFocus? 'item_1_p_focus-project' : ''}>
                  OpenNFT
                </p>
              </div>
              {/* ---------- project 2 ------------- */}
              <div className='item_1-project'
                onDoubleClick={() => handleShow('Note')}
                onTouchStart={() => handleShowMobile('Note')}
                onClick={(e) => {
                  e.stopPropagation();
                  iconFocusIcon('ProjectNotefolder')
                }}
              >
                <img src={regFolder} alt="regFolder-project" 
                  className={ProjectExpand.item_2iconFocus? 'item_1_img_focus-project' : ''}
                />
                <p className={ProjectExpand.item_2iconFocus? 'item_1_p_focus-project' : ''}>
                  Note
                </p>
              </div>
                {/* ---------- project 3 ------------- */}
              <div className='item_1-project'
                onDoubleClick={() => handleShow('Type')}
                onTouchStart={() => handleShowMobile('Type')}
                onClick={(e) => {
                  e.stopPropagation();
                  iconFocusIcon('ProjectTypefolder')
                }}
              >
                <img src={regFolder} alt="regFolder-project" 
                  className={ProjectExpand.item_3iconFocus? 'item_1_img_focus-project' : ''}
                />
                <p className={ProjectExpand.item_3iconFocus? 'item_1_p_focus-project' : ''}>
                  Typing
                </p>
              </div>
            </div>
          </div>
          <div className="btm_bar_container-project">
            <div className="object_bar-project">
              <p>
                {ProjectExpand.item_1iconFocus? '1 object(s) selected': ''}
                {ProjectExpand.item_2iconFocus? '1 object(s) selected': ''}
                {ProjectExpand.item_3iconFocus? '1 object(s) selected': ''}
                {
                !ProjectExpand.item_1iconFocus && 
                !ProjectExpand.item_2iconFocus && 
                !ProjectExpand.item_3iconFocus ? '3 object(s)':''
                }
              </p>
            </div>
            <div className="size_bar-project">
              <p>
              {ProjectExpand.item_1iconFocus? '50.98 MB': ''}
              {ProjectExpand.item_2iconFocus? '29.07 MB': ''}
              {ProjectExpand.item_3iconFocus? '7.28 MB': ''}
              {
                !ProjectExpand.item_1iconFocus && 
                !ProjectExpand.item_2iconFocus && 
                !ProjectExpand.item_3iconFocus ? '87.33 MB':''
              }
              </p>
            </div>
          </div>
        </div>
      </Draggable>
    </>
  )
}          

export default ProjectFolder
