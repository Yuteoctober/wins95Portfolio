import UseContext from '../Context'
import { useContext, useState, useEffect, useRef } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import Project from '../assets/regFolder.png'
import regFolder from '../assets/regFolder.png'
import '../css/ProjectFolder.css'


function ProjectFolder() {

  const { 
    ProjectExpand, setProjectExpand,
    setMybioExpand,
    setResumeExpand,
    setMailExpand,
    setNftExpand,
    setNoteExpand,
    setTypeExpand,
    setWinampExpand,
    tap, setTap,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    iconState, setIconState,
    handleShow,
    handleShowMobile,

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

    function handleSetFocusItemTrue() { //click on one, other goes false
        setIconState(prevIcons => prevIcons.map(icon => ({
          ...icon,
          focus: false
        })));
        setProjectExpand(prev => ({...prev, focusItem: true}))
        setMybioExpand(prev => ({...prev, focusItem: false}))
        setResumeExpand(prev => ({...prev, focusItem: false}))
        setMailExpand(prev => ({...prev, focusItem: false}))
        setNoteExpand(prev => ({...prev, focusItem: false}))
        setNftExpand(prev => ({...prev, focusItem: false}))
        setTypeExpand(prev => ({...prev, focusItem: false}))
        setWinampExpand(prev => ({...prev, focusItem: false, focus: false}))
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
        onStart={handleSetFocusItemTrue}
      >
        <div className='folder_folder-project' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue();
            }}
            style={ ProjectExpand.expand ? 
            {
                display: ProjectExpand.show ? 'block' : '',
                maxWidth: 'none',
                width: '100%',
                height: 'calc(100% - 37px)',
                left: `${ProjectExpand.x <= 0 ? Math.abs(ProjectExpand.x)*2 + ProjectExpand.x : -ProjectExpand.x}px`,
                top: `${ProjectExpand.y <= 0 ? Math.abs(ProjectExpand.y)*2 + ProjectExpand.y : -ProjectExpand.y}px`,
                opacity: ProjectExpand.hide ? '0' : '1',
                zIndex: ProjectExpand.hide ? '-1' : (ProjectExpand.focusItem ? '999' : '3'),
                pointerEvents: ProjectExpand.hide ? 'none' : 'auto',
                resize: ProjectExpand.expand ? 'none' : '',
            } : { 
                display: ProjectExpand.show ? 'block' : '',
                opacity: ProjectExpand.hide ? '0' : '1',
                zIndex: ProjectExpand.hide ? '-1' : (ProjectExpand.focusItem ? '999' : '3'),
                pointerEvents: ProjectExpand.hide ? 'none' : 'auto'
                
            }
        }>
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
                  setProjectExpand(prev => ({...prev, show: false, expand: false}));
                  const newTap = tap.filter(a => a !== 'Project')
                  setTap(newTap)
                 }: undefined
                }
                onTouchEnd={() => {
                  setProjectExpand(prev => ({...prev, show: false, expand: false}));
                  const newTap = tap.filter(a => a !== 'Project')
                  setTap(newTap)
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
            onClick={() => setProjectExpand(prev => ({
              ...prev, item_1Focus: false, item_2Focus: false, item_3Focus: false,
            }))}
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
                  setNftExpand(prev => ({...prev, item_1Focus: false}))
                  setNoteExpand(prev => ({...prev, item_1Focus: false}))
                  setTypeExpand(prev => ({...prev, item_1Focus: false}))
                  setProjectExpand(prev => ({
                    ...prev, item_1Focus: true, item_2Focus: false, item_3Focus: false
                  }))
                  setIconState(iconState.map(icon => ({...icon, focus: false})))
                }}
              >
                <img src={regFolder} alt="regFolder-project" 
                  className={ProjectExpand.item_1Focus? 'item_1_img_focus-project' : ''}
                />
                <p className={ProjectExpand.item_1Focus? 'item_1_p_focus-project' : ''}>
                  OpenNFT
                </p>
              </div>
              {/* ---------- project 2 ------------- */}
              <div className='item_1-project'
                onDoubleClick={() => handleShow('Note')}
                onTouchStart={() => handleShowMobile('Note')}
                onClick={(e) => {
                  e.stopPropagation();
                  setNftExpand(prev => ({...prev, item_1Focus: false}))
                  setNoteExpand(prev => ({...prev, item_1Focus: false}))
                  setTypeExpand(prev => ({...prev, item_1Focus: false}))
                  setProjectExpand(prev => ({
                    ...prev, item_2Focus: true, item_1Focus: false, item_3Focus: false
                  }))
                  setIconState(iconState.map(icon => ({...icon, focus: false})))
                }}
              >
                <img src={regFolder} alt="regFolder-project" 
                  className={ProjectExpand.item_2Focus? 'item_1_img_focus-project' : ''}
                />
                <p className={ProjectExpand.item_2Focus? 'item_1_p_focus-project' : ''}>
                  Note
                </p>
              </div>
                {/* ---------- project 3 ------------- */}
              <div className='item_1-project'
                onDoubleClick={() => handleShow('Type')}
                onTouchStart={() => handleShowMobile('Type')}
                onClick={(e) => {
                  e.stopPropagation();
                  setNftExpand(prev => ({...prev, item_1Focus: false}))
                  setNoteExpand(prev => ({...prev, item_1Focus: false}))
                  setTypeExpand(prev => ({...prev, item_1Focus: false}))
                  setProjectExpand(prev => ({
                    ...prev, item_3Focus: true, item_1Focus: false, item_2Focus: false
                  }))
                  setIconState(iconState.map(icon => ({...icon, focus: false})))
                }}
              >
                <img src={regFolder} alt="regFolder-project" 
                  className={ProjectExpand.item_3Focus? 'item_1_img_focus-project' : ''}
                />
                <p className={ProjectExpand.item_3Focus? 'item_1_p_focus-project' : ''}>
                  Typing
                </p>
              </div>
            </div>
          </div>
          <div className="btm_bar_container-project">
            <div className="object_bar-project">
              <p>
                {ProjectExpand.item_1Focus? '1 object(s) selected': ''}
                {ProjectExpand.item_2Focus? '1 object(s) selected': ''}
                {ProjectExpand.item_3Focus? '1 object(s) selected': ''}
                {
                !ProjectExpand.item_1Focus && 
                !ProjectExpand.item_2Focus && 
                !ProjectExpand.item_3Focus ? '3 object(s)':''
                }
              </p>
            </div>
            <div className="size_bar-project">
              <p>
              {ProjectExpand.item_1Focus? '50.98 MB': ''}
              {ProjectExpand.item_2Focus? '29.07 MB': ''}
              {ProjectExpand.item_3Focus? '7.28 MB': ''}
              {
                !ProjectExpand.item_1Focus && 
                !ProjectExpand.item_2Focus && 
                !ProjectExpand.item_3Focus ? '87.33 MB':''
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
