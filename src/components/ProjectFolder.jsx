import UseContext from '../Context'
import { useContext } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import Project from '../assets/regFolder.png'
import regFolder from '../assets/regFolder.png'
import '../css/ProjectFolder.css'


function ProjectFolder() {

  const { 
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

   const folderItems = [
    {
      index: '1',
      name: 'Nft',
      forcusName: 'ProjectNftfolder',
      img: regFolder,
      textName: 'OpenNFT',
      focusState: 'item_1iconFocus',
      size: 50.98
    },
    {
      index: '2',
      name: 'Note',
      forcusName: 'ProjectNotefolder',
      img: regFolder,
      textName: 'Note',
      focusState: 'item_2iconFocus',
      size: 29.07
    },
    // {
    //   index: '3',
    //   name: 'Type',
    //   forcusName: 'ProjectTypefolder',
    //   img: regFolder,
    //   textName: 'Typing',
    //   focusState: 'item_3iconFocus',
    //   size: 7.28
    // }
  ];
  

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
            style={ProjectExpand.expand ? 
              { height: 'calc(100svh - 122px)'} 
              : 
              {}
            }
          >
            <div className="item_container-project">
              {/* ---------- projects ------------- */}
              {folderItems.map((item) => (
                <div 
                  key={item.index} 
                  className='item_1-project'
                  onDoubleClick={() => handleShow(item.name)}
                  onTouchStart={() => handleShowMobile(item.name)}
                  onClick={(e) => {
                    e.stopPropagation();
                    iconFocusIcon(item.forcusName);
                  }}
                >
                  <img 
                    src={item.img} 
                    alt={item.img} 
                    className={ProjectExpand[item.focusState] ? `item_1_img_focus-project` : ''}
                  />
                  <p className={ProjectExpand[item.focusState] ? `item_1_p_focus-project` : ''}>
                    {item.textName}
                  </p>
                </div>
              ))}

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
                !ProjectExpand.item_3iconFocus ? '2 object(s)':''
                }
              </p>
            </div>
            <div className="size_bar-project">
              <p>
              {ProjectExpand.item_1iconFocus? folderItems[0].size : ''}
              {ProjectExpand.item_2iconFocus? folderItems[1].size : ''}
              {
                !ProjectExpand.item_1iconFocus && 
                !ProjectExpand.item_2iconFocus && 
                !ProjectExpand.item_3iconFocus 
                ? folderItems.reduce((total, item) => total + item.size, 0)
                : ''
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
