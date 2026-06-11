import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNotifStore } from '../../store/useNotifStore';
import type { NotifType } from '../../store/useNotifStore';

/* ── Icon & colour per type ── */
const META: Record<NotifType, { icon: string; accent: string; bar: string }> = {
  info:    { icon: 'ℹ️',  accent: 'rgba(0,120,212,0.18)',  bar: '#0078d4' },
  success: { icon: '✅',  accent: 'rgba(16,124,16,0.18)',  bar: '#107c10' },
  warning: { icon: '⚠️',  accent: 'rgba(202,80,16,0.18)',  bar: '#ca5010' },
  error:   { icon: '❌',  accent: 'rgba(196,43,28,0.18)',  bar: '#c42b1c' },
};

/* ── Single toast ── */
const Toast: React.FC<{ id: string; title: string; message: string; type: NotifType; icon?: string; duration: number }> =
  ({ id, title, message, type, icon, duration }) => {
    const dismiss = useNotifStore(s => s.dismiss);
    const [progress, setProgress] = useState(100);
    const startRef = useRef(Date.now());
    const m = META[type];

    /* Drain progress bar */
    useEffect(() => {
      const tick = () => {
        const elapsed = Date.now() - startRef.current;
        const pct = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(pct);
        if (pct > 0) raf = requestAnimationFrame(tick);
        else dismiss(id);
      };
      let raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, [id, duration, dismiss]);

    return (
      <motion.div
        layout
        initial={{ x: 340, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { type: 'spring', stiffness: 320, damping: 30 } }}
        exit={{ x: 340, opacity: 0, transition: { duration: 0.22, ease: 'easeIn' } }}
        style={{
          width: '320px',
          background: 'var(--win-bg-flyout)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          border: '1px solid var(--win-stroke-card)',
          borderRadius: '8px',
          boxShadow: 'var(--win-shadow-flyout)',
          overflow: 'hidden',
          cursor: 'default',
        }}
      >
        {/* Top accent stripe */}
        <div style={{ height: '3px', background: m.accent, borderBottom: `2px solid ${m.bar}` }} />

        {/* Body */}
        <div style={{ padding: '12px 14px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '22px', lineHeight: 1, flexShrink: 0, marginTop: '1px' }}>
            {icon ?? m.icon}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--app-text)', marginBottom: '3px', lineHeight: 1.3 }}>
              {title}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--app-text-sec)', lineHeight: 1.5 }}>
              {message}
            </div>
          </div>
          <button
            onClick={() => dismiss(id)}
            style={{
              width: '22px', height: '22px', flexShrink: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              border: 'none', borderRadius: '4px', background: 'transparent',
              color: 'var(--app-text-sec)', cursor: 'pointer', fontSize: '14px',
              transition: 'background 0.1s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--app-hover-bg)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            ✕
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ height: '3px', background: 'var(--app-progress-bg)' }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: m.bar,
            transition: 'width 0.05s linear',
          }} />
        </div>
      </motion.div>
    );
  };

/* ── Container — bottom-right, above taskbar ── */
export const NotificationToasts: React.FC = () => {
  const notifications = useNotifStore(s => s.notifications);

  return (
    <div style={{
      position: 'fixed',
      bottom: '56px', // above taskbar
      right: '12px',
      zIndex: 99998,
      display: 'flex',
      flexDirection: 'column-reverse',
      gap: '8px',
      pointerEvents: 'none',
    }}>
      <AnimatePresence mode="sync">
        {notifications.map(n => (
          <div key={n.id} style={{ pointerEvents: 'all' }}>
            <Toast
              id={n.id}
              title={n.title}
              message={n.message}
              type={n.type}
              icon={n.icon}
              duration={n.duration}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};
