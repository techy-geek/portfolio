import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useWindowStore } from '../../store/useWindowStore';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

/* ── SVG control button icons ── */
const MinimizeIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12">
    <path d="M2 9.5h8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
  </svg>
);

const MaximizeIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <rect x="1.5" y="1.5" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.25"/>
  </svg>
);

const RestoreIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <rect x="0.5" y="3.5" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.25"/>
    <path d="M3.5 3.5V1.5C3.5 1.224 3.724 1 4 1H10.5C10.776 1 11 1.224 11 1.5V8C11 8.276 10.776 8.5 10.5 8.5H8.5" stroke="currentColor" strokeWidth="1.25"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12">
    <path d="M1.5 1.5L10.5 10.5M10.5 1.5L1.5 10.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round"/>
  </svg>
);

const APP_META: Record<string, { title: string }> = {
  about:          { title: 'About Me' },
  projects:       { title: 'Projects' },
  skills:         { title: 'Skills' },
  experience:     { title: 'Experience' },
  publications:   { title: 'Publications' },
  certifications: { title: 'Certifications' },
  resume:         { title: 'Resume.pdf — PDF Reader' },
  contact:        { title: 'Contact' },
};

/* ── Control Button ── */
const CtrlBtn: React.FC<{
  onClick: (e: React.MouseEvent) => void;
  isClose?: boolean;
  title: string;
  children: React.ReactNode;
}> = ({ onClick, isClose, title, children }) => {
  const [hov, setHov]         = useState(false);
  const [pressed, setPressed] = useState(false);

  let bg    = 'transparent';
  let color = 'rgba(0,0,0,0.65)';
  if (isClose) {
    if (pressed)  { bg = '#b21818'; color = '#fff'; }
    else if (hov) { bg = '#c42b1c'; color = '#fff'; }
  } else {
    if (pressed)  bg = 'rgba(0,0,0,0.10)';
    else if (hov) bg = 'rgba(0,0,0,0.07)';
  }

  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(e); }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPressed(false); }}
      onMouseDown={(e) => { e.stopPropagation(); setPressed(true); }}
      onMouseUp={() => setPressed(false)}
      title={title}
      style={{
        width: '46px', height: '32px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: 'none', cursor: 'pointer',
        background: bg, color,
        transition: 'background 0.1s, color 0.1s',
        outline: 'none',
        borderRadius: isClose ? '0 7px 0 0' : '0',
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
};

/* ── Constants ── */
const MIN_W = 480;
const MIN_H = 320;
const DEFAULT_W = 840;
const DEFAULT_H = 560;

type Dir = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';
const CURSOR: Record<Dir, string> = {
  n: 'n-resize', s: 's-resize', e: 'e-resize', w: 'w-resize',
  ne: 'ne-resize', nw: 'nw-resize', se: 'se-resize', sw: 'sw-resize',
};

/* ── Animation state machine ──
 *  'snap'      — instantly invisible (used to reset before entering)
 *  'open'      — fully visible (spring in)
 *  'minimize'  — animate out toward taskbar
 *  'close'     — animate out (scale + fade)
 */
type AnimKey = 'snap' | 'open' | 'minimize' | 'close';

const SPRING = { type: 'spring' as const, stiffness: 420, damping: 32, mass: 0.75 };
const EASE_IN  = [0.4, 0.0, 1.0, 1.0] as [number,number,number,number];
const MAX_EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';

const VARIANTS: Variants = {
  snap:     { opacity: 0, scale: 0.90, y: 14,  transition: { duration: 0 } },
  open:     { opacity: 1, scale: 1,    y: 0,   transition: SPRING },
  minimize: { opacity: 0, scale: 0.85, y: 28,  transition: { duration: 0.18, ease: EASE_IN } },
  close:    { opacity: 0, scale: 0.90, y: 0,   transition: { duration: 0.15, ease: EASE_IN } },
};

/* ══════════════════════════════════════════════════════════
   Window Component
   ══════════════════════════════════════════════════════════ */
export const Window: React.FC<WindowProps> = ({ id, title, children }) => {
  const windowState    = useWindowStore((s) => s.windows.find((w) => w.id === id));
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, activeWindowId } = useWindowStore();

  /* ── Animation key drives what framer-motion shows ── */
  const [animKey, setAnimKey] = useState<AnimKey>('snap');

  /* ── What to do after the current animation finishes ── */
  const pendingRef = useRef<'minimize' | 'close' | null>(null);

  /* ── Position / size ── */
  const [pos, setPos] = useState(() => ({
    x: Math.max(20, window.innerWidth  / 2 - DEFAULT_W / 2 + Math.random() * 80 - 40),
    y: Math.max(20, window.innerHeight / 2 - DEFAULT_H / 2 + Math.random() * 60 - 30),
  }));
  const [size, setSize]             = useState({ w: DEFAULT_W, h: DEFAULT_H });
  const [layoutAnim, setLayoutAnim] = useState(false);
  const savedRef = useRef({ pos: { x: 0, y: 0 }, size: { w: DEFAULT_W, h: DEFAULT_H } });

  /* ── Trigger open animation whenever the window becomes un-minimized ──
   *
   *  Problem with useAnimationControls: the controls object persists on the
   *  mounted Window component. After a minimize animation it holds opacity:0.
   *  When the window is restored, the freshly-rendered motion.div picks up
   *  that stale state and stays invisible forever.
   *
   *  Solution: use a plain AnimKey state variable as the `animate` prop.
   *  Switching snap→open causes framer-motion to play a clean enter animation
   *  every time, with no stale state to worry about.
   * ─────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (windowState?.isMinimized === false) {
      /* 1. Snap to invisible immediately (resets any leftover minimize state) */
      setAnimKey('snap');
      /* 2. On the next frame, start the spring-in animation */
      requestAnimationFrame(() => setAnimKey('open'));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowState?.isMinimized]);

  /* ── Only truly unmount when closed (not when minimized) ── */
  if (!windowState?.isOpen) return null;

  const { isMaximized, zIndex } = windowState;
  const isMinimized = windowState.isMinimized;
  const isActive    = activeWindowId === id;
  const meta        = APP_META[id] ?? { title };

  /* ── Called by framer-motion when any animation finishes ── */
  const onAnimDone = (def: AnimKey | string) => {
    if (def === 'snap') {
      /* snap→open is handled by the RAF above; nothing to do here */
    } else if (def === 'minimize' && pendingRef.current === 'minimize') {
      pendingRef.current = null;
      minimizeWindow(id);
    } else if (def === 'close' && pendingRef.current === 'close') {
      pendingRef.current = null;
      closeWindow(id);
    }
  };

  /* ── Window control handlers ── */
  const handleMinimize = () => {
    pendingRef.current = 'minimize';
    setAnimKey('minimize');
  };

  const handleClose = () => {
    pendingRef.current = 'close';
    setAnimKey('close');
  };

  const handleMaximize = () => {
    setLayoutAnim(true);
    if (!isMaximized) {
      savedRef.current = { pos, size };
    } else {
      setPos(savedRef.current.pos);
      setSize(savedRef.current.size);
    }
    maximizeWindow(id);
    setTimeout(() => setLayoutAnim(false), 320);
  };

  /* ── Drag ── */
  const onTitleBarMouseDown = (e: React.MouseEvent) => {
    if (isMaximized || e.button !== 0) return;
    e.preventDefault();
    focusWindow(id);

    const ox = e.clientX - pos.x;
    const oy = e.clientY - pos.y;

    const onMove = (ev: MouseEvent) =>
      setPos({ x: ev.clientX - ox, y: Math.max(0, ev.clientY - oy) });
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  /* ── Resize ── */
  const onResizeMouseDown = (e: React.MouseEvent, dir: Dir) => {
    if (isMaximized || e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    focusWindow(id);

    const mx0 = e.clientX, my0 = e.clientY;
    const { x: x0, y: y0 } = pos;
    const { w: w0, h: h0 } = size;

    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - mx0, dy = ev.clientY - my0;
      let nx = x0, ny = y0, nw = w0, nh = h0;
      if (dir.includes('e')) nw = Math.max(MIN_W, w0 + dx);
      if (dir.includes('s')) nh = Math.max(MIN_H, h0 + dy);
      if (dir.includes('w')) { const c = w0 - dx; nw = Math.max(MIN_W, c); nx = c >= MIN_W ? x0 + dx : x0 + w0 - MIN_W; }
      if (dir.includes('n')) { const c = h0 - dy; nh = Math.max(MIN_H, c); ny = c >= MIN_H ? y0 + dy : y0 + h0 - MIN_H; }
      setPos({ x: nx, y: Math.max(0, ny) });
      setSize({ w: nw, h: nh });
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  /* ── Resize handle builder ── */
  const RH = 6, CH = 16;
  const handle = (dir: Dir, st: React.CSSProperties) => (
    <div key={dir} onMouseDown={(e) => onResizeMouseDown(e, dir)}
      style={{ position: 'absolute', zIndex: 10, cursor: CURSOR[dir], ...st }} />
  );

  /* ── Container style ── */
  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    left:   isMaximized ? 0      : pos.x,
    top:    isMaximized ? 0      : pos.y,
    width:  isMaximized ? '100%' : size.w,
    height: isMaximized ? '100%' : size.h,
    zIndex,
    display: 'flex',
    flexDirection: 'column',
    /* After minimize animation completes and store sets isMinimized=true,
       hide the element so it doesn't block pointer events */
    pointerEvents: isMinimized ? 'none' : 'auto',
    visibility:    isMinimized ? 'hidden' : 'visible',
    transition: layoutAnim
      ? `left .28s ${MAX_EASE}, top .28s ${MAX_EASE}, width .28s ${MAX_EASE}, height .28s ${MAX_EASE}`
      : 'none',
  };

  return (
    <motion.div
      style={containerStyle}
      variants={VARIANTS}
      animate={animKey}
      onAnimationComplete={onAnimDone as (def: string) => void}
      onMouseDown={() => focusWindow(id)}
    >
      {/* ── Resize handles ── */}
      {!isMaximized && <>
        {handle('n',  { top: 0,    left: CH, right: CH, height: RH })}
        {handle('s',  { bottom: 0, left: CH, right: CH, height: RH })}
        {handle('e',  { right: 0,  top: CH, bottom: CH, width: RH  })}
        {handle('w',  { left: 0,   top: CH, bottom: CH, width: RH  })}
        {handle('nw', { top: 0,    left: 0,  width: CH, height: CH })}
        {handle('ne', { top: 0,    right: 0, width: CH, height: CH })}
        {handle('sw', { bottom: 0, left: 0,  width: CH, height: CH })}
        {handle('se', { bottom: 0, right: 0, width: CH, height: CH })}
      </>}

      {/* ── Window Shell ── */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        borderRadius: isMaximized ? '0' : '8px',
        overflow: 'hidden',
        boxShadow: isActive
          ? '0 24px 60px rgba(0,0,0,0.34), 0 6px 16px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.13)'
          : '0 6px 20px rgba(0,0,0,0.18), 0 1px 6px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.09)',
        transition: 'box-shadow 0.2s ease, border-radius 0.28s cubic-bezier(0.4,0,0.2,1)',
        borderTop: isActive && !isMaximized ? '1px solid #0067c0' : 'none',
      }}>

        {/* ── Title Bar ── */}
        <div
          style={{
            height: '32px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexShrink: 0,
            cursor: isMaximized ? 'default' : 'move',
            userSelect: 'none',
            background: isActive ? 'rgba(239,239,239,0.95)' : 'rgba(234,234,234,0.88)',
            backdropFilter: 'blur(44px) saturate(160%)',
            WebkitBackdropFilter: 'blur(44px) saturate(160%)',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
          }}
          onMouseDown={onTitleBarMouseDown}
          onDoubleClick={handleMaximize}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', paddingLeft: '10px', flex: 1, minWidth: 0 }}>
            <img src={`/icons/${id}.png`} alt="" draggable={false}
              style={{ width: '16px', height: '16px', objectFit: 'contain', flexShrink: 0 }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <span style={{
              fontSize: '12px', fontWeight: 400,
              color: isActive ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.48)',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              transition: 'color 0.15s',
            }}>
              {meta.title}
            </span>
          </div>

          <div style={{ display: 'flex', height: '100%' }}>
            <CtrlBtn onClick={handleMinimize} title="Minimize"><MinimizeIcon /></CtrlBtn>
            <CtrlBtn onClick={handleMaximize} title={isMaximized ? 'Restore' : 'Maximize'}>
              {isMaximized ? <RestoreIcon /> : <MaximizeIcon />}
            </CtrlBtn>
            <CtrlBtn onClick={handleClose} isClose title="Close"><CloseIcon /></CtrlBtn>
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{ flex: 1, overflow: 'hidden', background: '#f3f3f3', display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};
