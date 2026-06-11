import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CalendarPopup } from './CalendarPopup';

export const Clock: React.FC = () => {
  const [now, setNow] = useState(new Date());
  const [calOpen, setCalOpen] = useState(false);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const msToNext = 1000 - (Date.now() % 1000);
    const timeout = setTimeout(() => {
      setNow(new Date());
      const interval = setInterval(() => setNow(new Date()), 1000);
      return () => clearInterval(interval);
    }, msToNext);
    return () => clearTimeout(timeout);
  }, []);

  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' });

  return (
    <div style={{ position: 'relative' }}>
      <button
        id="taskbar-clock"
        onClick={() => setCalOpen(o => !o)}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center',
          height: '40px', padding: '0 12px', minWidth: '86px',
          borderRadius: '6px', border: 'none', cursor: 'pointer',
          background: calOpen || hov ? 'rgba(255,255,255,0.10)' : 'transparent',
          transition: 'background 0.12s', outline: 'none',
        }}
        title="Click for calendar"
      >
        <span style={{ fontSize: '12px', fontWeight: 400, color: 'rgba(255,255,255,0.95)', lineHeight: '1.4', letterSpacing: '0.01em' }}>
          {timeStr}
        </span>
        <span style={{ fontSize: '11px', fontWeight: 400, color: 'rgba(255,255,255,0.70)', lineHeight: '1.4' }}>
          {dateStr}
        </span>
      </button>

      {/* Calendar popup via AnimatePresence for smooth mount/unmount */}
      <AnimatePresence>
        {calOpen && <CalendarPopup key="cal" onClose={() => setCalOpen(false)} />}
      </AnimatePresence>
    </div>
  );
};
