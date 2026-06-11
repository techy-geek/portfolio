import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const DAYS   = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

interface Props { onClose: () => void }

export const CalendarPopup: React.FC<Props> = ({ onClose }) => {
  const today = new Date();
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const ref = useRef<HTMLDivElement>(null);

  /* Close on outside click */
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    setTimeout(() => document.addEventListener('mousedown', fn), 50);
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('mousedown', fn); document.removeEventListener('keydown', key); };
  }, [onClose]);

  const prev = () => setView(v => {
    const m = v.month === 0 ? 11 : v.month - 1;
    const y = v.month === 0 ? v.year - 1 : v.year;
    return { year: y, month: m };
  });

  const next = () => setView(v => {
    const m = v.month === 11 ? 0 : v.month + 1;
    const y = v.month === 11 ? v.year + 1 : v.year;
    return { year: y, month: m };
  });

  /* Build calendar grid */
  const firstDay  = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const daysInPrev  = new Date(view.year, view.month, 0).getDate();

  const cells: { day: number; type: 'prev' | 'cur' | 'next' }[] = [];
  for (let i = firstDay - 1; i >= 0; i--)
    cells.push({ day: daysInPrev - i, type: 'prev' });
  for (let d = 1; d <= daysInMonth; d++)
    cells.push({ day: d, type: 'cur' });
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++)
    cells.push({ day: d, type: 'next' });

  const isToday = (day: number, type: string) =>
    type === 'cur' &&
    day === today.getDate() &&
    view.month === today.getMonth() &&
    view.year === today.getFullYear();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: [0.0, 0.0, 0.2, 1] } }}
      exit={{ opacity: 0, y: 8, scale: 0.97, transition: { duration: 0.12 } }}
      style={{
        position: 'fixed',
        bottom: '56px',
        right: '8px',
        width: '300px',
        background: 'var(--win-bg-flyout)',
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        border: '1px solid var(--win-stroke-card)',
        borderRadius: '12px',
        boxShadow: 'var(--win-shadow-flyout)',
        zIndex: 99990,
        padding: '16px',
        userSelect: 'none',
      }}
    >
      {/* Month + year header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <button onClick={prev} style={navBtn}>‹</button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--app-text)' }}>
            {MONTHS[view.month]}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--app-text-sec)', marginTop: '1px' }}>
            {view.year}
          </div>
        </div>
        <button onClick={next} style={navBtn}>›</button>
      </div>

      {/* Day-of-week labels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', marginBottom: '4px' }}>
        {DAYS.map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: '11px', fontWeight: 600, color: 'var(--app-text-sec)', padding: '4px 0' }}>
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '2px' }}>
        {cells.map((cell, i) => {
          const active = isToday(cell.day, cell.type);
          return (
            <div key={i} style={{
              textAlign: 'center',
              padding: '5px 0',
              fontSize: '12px',
              borderRadius: '50%',
              cursor: cell.type === 'cur' ? 'default' : 'default',
              fontWeight: active ? 700 : cell.type === 'cur' ? 500 : 400,
              color: active
                ? '#fff'
                : cell.type !== 'cur'
                ? 'var(--app-text-ter)'
                : 'var(--app-text)',
              background: active ? 'var(--win-accent)' : 'transparent',
              transition: 'background 0.1s',
            }}
              onMouseEnter={e => { if (!active && cell.type === 'cur') (e.currentTarget as HTMLDivElement).style.background = 'var(--app-hover-bg)'; }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
            >
              {cell.day}
            </div>
          );
        })}
      </div>

      {/* Today button */}
      <div style={{ marginTop: '12px', borderTop: '1px solid var(--app-sep)', paddingTop: '10px', display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => setView({ year: today.getFullYear(), month: today.getMonth() })}
          style={{ fontSize: '12px', fontWeight: 600, color: 'var(--win-accent)', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px 12px', borderRadius: '4px', transition: 'background 0.1s' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--app-tag-bg)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          Today
        </button>
      </div>
    </motion.div>
  );
};

const navBtn: React.CSSProperties = {
  width: '30px', height: '30px',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: '18px', fontWeight: 300,
  border: 'none', borderRadius: '6px',
  background: 'transparent', color: 'var(--app-text)',
  cursor: 'pointer', transition: 'background 0.1s',
};
