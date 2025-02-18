import UseContext from '../Context';
import { useContext, useRef } from "react";
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';
import Project from '../assets/regFolder.png';
import '../css/ProjectFolder.css';

function ProjectFolder() {
  const iconRefs = useRef([]);

  const {
    refBeingClicked,
    handleMobileLongPress,
    setRightClickIcon,
    setIconBeingRightClicked,
    timerRef,
    iconContainerSize,
    iconImgSize,
    iconTextSize,
    iconScreenSize,
    dragging,
    key,
    setDropTargetFolder,
    dropTargetFolder,
    handleDrop,
    handleOnDrag,
    ProjectFolderRef,
    imageMapping,
    desktopIcon,
    themeDragBar,
    ProjectExpand,
    setProjectExpand,
    lastTapTime,
    setLastTapTime,
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
    const { x, y } = data;
    setProjectExpand((prev) => ({
      ...prev,
      x,
      y,
    }));
  }

  function handleExpandStateToggle() {
    setProjectExpand((prevState) => ({
      ...prevState,
      expand: !prevState.expand,
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
      setProjectExpand((prevState) => ({
        ...prevState,
        expand: !prevState.expand,
      }));
    }
    setLastTapTime(now);
  }

  return (
    <Draggable
      axis="both"
      handle=".folder_dragbar-project"
      grid={[1, 1]}
      scale={1}
      disabled={ProjectExpand.expand}
      bounds={{ top: 0 }}
      defaultPosition={{
        x: window.innerWidth <= 500 ? 20 : 40,
        y: window.innerWidth <= 500 ? 40 : 160,
      }}
      onStop={handleDragStop}
      onStart={() => handleSetFocusItemTrue('Project')}
    >
      <div
        className="folder_folder-project"
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
          overflow: dragging ? '' : 'hidden',
        }}
      >
        <div
          className="folder_dragbar-project"
          onDoubleClick={handleExpandStateToggle}
          onTouchStart={handleExpandStateToggleMobile}
          style={{ background: ProjectExpand.focusItem ? themeDragBar : '#757579' }}
        >
          <div className="folder_barname-project">
            <img src={Project} alt="Project" />
            <span>Project</span>
          </div>
          <div className="folder_barbtn-project">
            <div
              onClick={!isTouchDevice ? (e) => {
                e.stopPropagation();
                setProjectExpand((prev) => ({ ...prev, hide: true, focusItem: false }));
                StyleHide('Project');
              } : undefined}
              onTouchEnd={(e) => {
                e.stopPropagation();
                setProjectExpand((prev) => ({ ...prev, hide: true, focusItem: false }));
                StyleHide('Project');
              }}
              onTouchStart={(e) => e.stopPropagation()}
            >
              <p className="dash-project"></p>
            </div>
            <div
              onClick={!isTouchDevice ? handleExpandStateToggle : undefined}
              onTouchEnd={handleExpandStateToggle}
            >
              <motion.div className={`expand-project ${ProjectExpand.expand ? 'full' : ''}`}></motion.div>
              {ProjectExpand.expand && <div className="expand_2-project"></div>}
            </div>
            <div>
              <p
                className="x-project"
                onClick={!isTouchDevice ? () => deleteTap('Project') : undefined}
                onTouchEnd={() => deleteTap('Project')}
              >
                ×
              </p>
            </div>
          </div>
        </div>

        <div className="file_edit_container-project">
          <p>File<span style={{ left: '-23px' }}>_</span></p>
          <p>Edit<span style={{ left: '-24px' }}>_</span></p>
          <p>View<span style={{ left: '-32px' }}>_</span></p>
          <p>Help<span style={{ left: '-30px' }}>_</span></p>
        </div>

        <div
          className="folder_content-project"
          onClick={() => iconFocusIcon('')}
          style={{
            height: ProjectExpand.expand ? 'calc(100svh - 122px)' : '',
            overflow: dragging ? '' : 'hidden',
          }}
        >
          <div className="parent_container-project" key={key}>
            <div
              className="item_container-project"
              style={{ position: dragging ? 'absolute' : '' }}
              onClick={(e) => {
                e.stopPropagation() 
                iconFocusIcon('');
                handleSetFocusItemTrue('Project');
              }}
            >
              {desktopIcon.filter((icon) => icon.folderId === 'Project').map((icon) => (
                <Draggable
                  axis="both"
                  handle=".icon"
                  grid={[10, 10]}
                  scale={1}
                  bounds={false}
                  onStart={() => {
                    setDropTargetFolder('');
                    handleSetFocusItemTrue('Project');
                  }}
                  onDrag={handleOnDrag(icon.name, iconRefs.current[icon.name])}
                  onStop={(e) => {
                    handleDrop(e, icon.name, dropTargetFolder, icon.folderId)
                    clearTimeout(timerRef.current)
                  }}
                  key={icon.name}
                >
                  <div
                    className="icon"
                    style={iconContainerSize(iconScreenSize)}
                    ref={(el) => (iconRefs.current[icon.name] = el)}
                    onContextMenu={() => {
                      setRightClickIcon(true);
                      iconFocusIcon(icon.name);
                      setIconBeingRightClicked(icon);
                      refBeingClicked.current = iconRefs.current[icon.name]
                    }}
                    onDoubleClick={() => handleShow(icon.name)}
                    onClick={!isTouchDevice ? (e) => {
                      iconFocusIcon(icon.name);
                      e.stopPropagation();
                    } : undefined}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      handleShowMobile(icon.name);
                      iconFocusIcon(icon.name);
                      handleMobileLongPress(e, icon);
                      refBeingClicked.current = iconRefs.current[icon.name]
                    }}
                  >
                    <img
                      src={imageMapping(icon.pic)}
                      alt="#"
                      className={icon.focus ? 'img_focus' : ''}
                      style={iconImgSize(iconScreenSize)}
                    />
                    <p
                      className={icon.focus ? 'p_focus' : 'p_normal'}
                      style={iconTextSize(iconScreenSize)}
                    >
                      {icon.name}
                    </p>
                  </div>
                </Draggable>
              ))}
            </div>
          </div>
        </div>

        <div className="btm_bar_container-project">
          <div className="object_bar-project">
            <p>
              {desktopIcon.filter((icon) => icon.folderId === 'Project').some((icon) => icon.focus)
                ? '1 object(s) selected'
                : `${desktopIcon.filter((icon) => icon.folderId === 'Project').length} object(s)`}
            </p>
          </div>
          <div className="size_bar-project">
            <p>
              {(() => {
                const filteredIcons = desktopIcon.filter((icon) => icon.folderId === 'Project');
                const totalSize = filteredIcons.reduce((total, icon) => total + icon.size, 0);
                return filteredIcons.every((icon) => !icon.focus)
                  ? totalSize
                  : filteredIcons.filter((icon) => icon.focus).reduce((sum, icon) => sum + icon.size, 0);
              })()} KB
            </p>
          </div>
        </div>
      </div>
    </Draggable>
  );
}

export default ProjectFolder;
