import UseContext from '../Context'
import { useContext, useRef } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import Project from '../assets/regFolder.png'
import regFolder from '../assets/regFolder.png'
import '../css/ProjectFolder.css'


function ProjectFolder() {

  const iconRefs = useRef([]);

  const { 
    dragging,
    key, setKey,
    setDropTargetFolder,
    dropTargetFolder,
    handleDrop,
    handleOnDrag,
    ProjectFolderRef,
    imageMapping,
    desktopIcon,
    themeDragBar,
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
            ref={ProjectFolderRef}
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('Project');
            }}
            style={{
              ...(
                  ProjectExpand.expand
                      ? inlineStyleExpand('Project')
                      : inlineStyle('Project')
              ),
              overflow: dragging ? '' : 'hidden'
          }}>
          <div className="folder_dragbar-project"
              onDoubleClick={handleExpandStateToggle}
              onTouchStart={handleExpandStateToggleMobile}
             style={{ background: ProjectExpand.focusItem? themeDragBar : '#757579'}}
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
            style={{ 
              height: ProjectExpand.expand ? 'calc(100svh - 122px)' : '',
              overflow: dragging? '' : 'hidden' 
            }}
          >
            <div className='parent_container-project' key={key}>
              <div className="item_container-project" onClick={(e) => e.stopPropagation()}>
                {/* ---------- projects ------------- */}
                {desktopIcon.filter(icon => icon.folderId === 'Project').map(icon => (
                  <>
                    <Draggable
                    axis="both" 
                    handle={'.icon'}
                    grid={[10, 10]}
                    scale={1}
                    bounds={false}
                    onStart={() => {
                      setDropTargetFolder('')
                      handleShow('Project')
                    }}
                    onDrag={handleOnDrag(icon.name, iconRefs.current[icon.name])}
                    onStop={(e) => {
                      handleDrop(e, icon.name, dropTargetFolder);
                    }}
                  >
                    <div className='icon' key={icon.name}
                    ref={(el) => iconRefs.current[icon.name] = el}
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
                      <p className={icon.focus? 'p_focus' : 'p_normal'} 
                      >
                        {icon.name}
                      </p>
                  </div>
                  </Draggable>
                </>
                ))}
              </div>
            </div>
          </div>
          <div className="btm_bar_container-project">
            <div className="object_bar-project">
              <p>
                {desktopIcon.filter(icon => icon.folderId === 'Project').some(icon => icon.focus) ? 
                  '1 object(s) selected'
                  :
                  desktopIcon.filter(icon => icon.folderId === 'Project').length  + ' ' + 'object(s)'
                }
              </p>
            </div>
            <div className="size_bar-project">
              <p>
              {(() => {
              const filteredIcons = desktopIcon.filter(icon => icon.folderId === 'Project');
              
              const totalSize = filteredIcons.reduce((total, icon) => total + icon.size, 0);
              
              const allNotFocused = filteredIcons.every(icon => !icon.focus);

              if (allNotFocused) {
                return totalSize; 
              } else {
                return filteredIcons
                  .filter(icon => icon.focus)
                  .map(icon => icon.size) 
                  .reduce((sum, size) => sum + size, 0); 
              }
            })()} KB
            </p>
            </div>
          </div>
        </div>
      </Draggable>
    </>
  )
}          

export default ProjectFolder
