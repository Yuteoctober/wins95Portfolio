import { useContext, useState, useRef, useEffect, useCallback } from "react";
import "../css/AppIcons.css";
import UseContext from "../Context";
import { imageMapping } from "./function/AppFunctions";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const ICONS_PER_PAGE   = 20;
const EDGE_ZONE        = 80;
const EDGE_DELAY       = 650;
const STORAGE_KEY      = "appicons_order";



// ── persist helpers ────────────────────────────────────────────────────────────
function loadOrder(defaultIcons) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultIcons;

    const saved = JSON.parse(raw); // array of icon names in saved order
    if (!Array.isArray(saved)) return defaultIcons;

    // merge: keep saved order, append any new icons not yet saved
    const savedSet  = new Set(saved);
    const merged    = saved
      .map(name => defaultIcons.find(i => i.name === name))
      .filter(Boolean); // drop names that no longer exist
    const newIcons  = defaultIcons.filter(i => !savedSet.has(i.name));
    return [...merged, ...newIcons];
  } catch {
    return defaultIcons;
  }
}

function saveOrder(icons) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(icons.map(i => i.name)));
  } catch {
    // storage full or private mode — fail silently
  }
}

// ── SortableIcon ──────────────────────────────────────────────────────────────
function SortableIcon({ icon, onOpen }) {
  const {
    attributes, listeners, setNodeRef,
    transform, transition, isDragging,
  } = useSortable({ id: icon.name });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform:  CSS.Transform.toString(transform),
        transition,
        opacity:    isDragging ? 0 : 1,
        visibility: isDragging ? "hidden" : "visible",
      }}
      className="appicon_icon"
      {...attributes}
      {...listeners}
      onClick={() => !isDragging && onOpen(icon.name)}
    >
      <div className="appicon_img_wrap">
        <img src={imageMapping(icon.name)} alt={icon.name} draggable={false} />
      </div>
      <p>{icon.name}</p>
    </div>
  );
}


// ── DragGhost ─────────────────────────────────────────────────────────────────
function DragGhost({ icon }) {
  return (
    <div className="appicon_icon is-ghost">
      <div className="appicon_img_wrap">
        <img src={imageMapping(icon.name)} alt={icon.name} draggable={false} />
      </div>
      <p>{icon.name}</p>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AppIcons() {
  const { handleShow, desktopIcon, appIconToggle, 
    setAppIconToggle, setDragging,
    } = useContext(UseContext);

  // initialise from localStorage, fall back to desktopIcon order
  const [items, setItems]             = useState(() => loadOrder(desktopIcon));
  const [activeId, setActiveId]       = useState(null);
  const [search, setSearch]           = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [dragOffset, setDragOffset]   = useState(0);
  const [isSwiping, setIsSwiping]     = useState(false);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const axisLocked  = useRef(null);
  const edgeTimer   = useRef(null);
  const edgeDir     = useRef(null);


  // __ CHANGE BG __________________________________________________________________

    useEffect(() => { // set app icons background on mount

        const appContainer = document.getElementsByClassName('appicon_container')[0];
        if(appContainer) {
            const storedBg = localStorage.getItem('theme');
           appContainer.style.background = storedBg ? storedBg : '#008080'; 
        }

    },[])


  // ── persist whenever order changes ────────────────────────────────────
  useEffect(() => {
    saveOrder(items);
  }, [items]);

  // ── derived ────────────────────────────────────────────────────────────
  const isSearching     = search.trim().length > 0;
  const visible         = isSearching
    ? items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    : items;
  const totalPages      = Math.max(1, Math.ceil(visible.length / ICONS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages - 1);
  const activeIcon      = activeId ? items.find(i => i.name === activeId) ?? null : null;
  const pageItems       = visible.slice(
    safeCurrentPage * ICONS_PER_PAGE,
    (safeCurrentPage + 1) * ICONS_PER_PAGE
  );

  useEffect(() => {
    if (currentPage >= totalPages) setCurrentPage(Math.max(0, totalPages - 1));
  }, [totalPages]);

  // ── sensors ────────────────────────────────────────────────────────────
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor,   { activationConstraint: { delay: 200, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // ── edge flip ──────────────────────────────────────────────────────────
  const clearEdge = useCallback(() => {
    clearTimeout(edgeTimer.current);
    edgeTimer.current = null;
    edgeDir.current   = null;
  }, []);

  const handleDragMove = useCallback(({ activatorEvent, delta }) => {
    const clientX =
      activatorEvent?.clientX != null
        ? activatorEvent.clientX + (delta?.x ?? 0)
        : null;
    if (clientX === null) return;

    const W   = window.innerWidth;
    let dir   = null;
    if (clientX < EDGE_ZONE)          dir = "left";
    else if (clientX > W - EDGE_ZONE) dir = "right";

    if (dir !== edgeDir.current) {
      clearEdge();
      if (dir) {
        edgeDir.current   = dir;
        edgeTimer.current = setTimeout(() => {
          setCurrentPage(p => {
            if (dir === "right" && p < totalPages - 1) return p + 1;
            if (dir === "left"  && p > 0)              return p - 1;
            return p;
          });
          clearEdge();
        }, EDGE_DELAY);
      }
    }
  }, [totalPages, clearEdge]);

  // ── dnd ────────────────────────────────────────────────────────────────
  const handleDragStart  = ({ active }) => setActiveId(active.id);
  const handleDragCancel = useCallback(() => { clearEdge(); setActiveId(null); }, [clearEdge]);

  const handleDragEnd = useCallback(({ active, over }) => {
    clearEdge();
    setActiveId(null);
    if (!over || active.id === over.id) return;

    setItems(prev => {
      const oldIdx = prev.findIndex(i => i.name === active.id);
      const newIdx = prev.findIndex(i => i.name === over.id);
      if (oldIdx === -1 || newIdx === -1) return prev;
      const next = arrayMove(prev, oldIdx, newIdx);
      // save immediately on drop so we don't wait for the effect
      saveOrder(next);
      return next;
    });
  }, [clearEdge]);

  // ── swipe ──────────────────────────────────────────────────────────────
  const onTouchStart = (e) => {
    if (activeId) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    axisLocked.current  = null;
  };

  const onTouchMove = (e) => {
    if (activeId || touchStartX.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (!axisLocked.current) {
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5)
        axisLocked.current = Math.abs(dx) >= Math.abs(dy) ? "h" : "v";
    }
    if (axisLocked.current !== "h") return;
    e.stopPropagation();
    setIsSwiping(true);
    const resist = 0.25;
    const capped =
      (dx < 0 && safeCurrentPage === totalPages - 1) || (dx > 0 && safeCurrentPage === 0)
        ? dx * resist : dx;
    setDragOffset(capped);
  };

  const onTouchEnd = () => {
    if (!isSwiping) return;
    const t = window.innerWidth * 0.2;
    if      (dragOffset < -t && safeCurrentPage < totalPages - 1) setCurrentPage(p => p + 1);
    else if (dragOffset >  t && safeCurrentPage > 0)              setCurrentPage(p => p - 1);
    setDragOffset(0);
    setIsSwiping(false);
    touchStartX.current = null;
  };

  // Arrow keys
  useEffect(() => {
    const h = (e) => {
      if (e.key === "ArrowRight") setCurrentPage(p => Math.min(p + 1, totalPages - 1));
      if (e.key === "ArrowLeft")  setCurrentPage(p => Math.max(p - 1, 0));
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [totalPages]);

  return (
    <>
    {appIconToggle && (
        <div className="appicon_container"
            onClick={(e) => {
                e.stopPropagation()
                setAppIconToggle(false)
            }}
        >

      {/* ── Toolbar ── */}
      <div className="toolbar">
        <div className="search_wrap">
          <input
            className="search_input"
            type="text"
            placeholder="Search programs…"
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(0); }}
          />
          {search && (
            <button className="search_clear" onClick={() => { setSearch(""); setCurrentPage(0); }}>✕</button>
          )}
        </div>
        <div className="toolbar_divider" />
      </div>

      {/* ── Body ── */}
      <div
        className="body_area"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Page nav arrows */}
        {!activeId && safeCurrentPage > 0 && (
          <button className="page_arrow page_arrow_left"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentPage(p => Math.max(p - 1, 0));
            }}>‹</button>
        )}
        {!activeId && safeCurrentPage < totalPages - 1 && (
          <button className="page_arrow page_arrow_right"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentPage(p => Math.min(p + 1, totalPages - 1));
            }}>›</button>
        )}

        {/* Edge drag hints */}
        {activeId && safeCurrentPage > 0 && (
          <div className="edge_hint edge_left" />
        )}
        {activeId && safeCurrentPage < totalPages - 1 && (
          <div className="edge_hint edge_right" />
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
          onClick={() => setDragging(true)}
        >
          <SortableContext
            items={visible.map(i => i.name)}
            strategy={rectSortingStrategy}
          >
            <div
              className="grid_wrap"
              style={{
                transform:  `translateX(${dragOffset}px)`,
                transition: isSwiping ? "none" : "transform 0.28s ease",
              }}
            >
              <div className={`appicon_grid${isSearching ? " searching" : ""}`}>
                {pageItems.length > 0 ? pageItems.map(icon => (
                  <SortableIcon
                    key={icon.name}
                    icon={icon}
                    onOpen={() => {
                        setAppIconToggle(false);
                        handleShow(icon.name)
                    }}
                  />
                )) : (
                  <div className="no_results">
                    <p>No programs found</p>
                    <small>Try a different search term</small>
                  </div>
                )}
              </div>
            </div>
          </SortableContext>

          <DragOverlay dropAnimation={null}>
            {activeIcon ? <DragGhost icon={activeIcon} /> : null}
          </DragOverlay>
        </DndContext>
      </div>

      {/* ── Status bar ── */}
      <div className="statusbar">
        <span className="statusbar_text">
          {activeId ? `Moving: ${activeId}` : `${visible.length} object${visible.length !== 1 ? "s" : ""}`}
        </span>
        {totalPages > 1 && (
          <div className="page_dots">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`page_dot${i === safeCurrentPage ? " active" : ""}`}
                onClick={() => setCurrentPage(i)}
                title={`Page ${i + 1}`}
              />
            ))}
          </div>
        )}
        <span className="statusbar_text statusbar_right">
          {safeCurrentPage * ICONS_PER_PAGE + 1}–{Math.min((safeCurrentPage + 1) * ICONS_PER_PAGE, visible.length)}
        </span>
      </div>

    </div>
    )}
    </>
    
  );
}