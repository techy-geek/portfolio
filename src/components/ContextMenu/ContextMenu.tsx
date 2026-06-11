import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export type ContextMenuItem = {
  id: string;
  label: string;
  icon: string;
  action: () => void;
  dividerAfter?: boolean;
};

interface ContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, items, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [onClose]);

  const menuW = 236, menuH = items.length * 34 + 16;
  const safeX = Math.min(x, window.innerWidth  - menuW - 8);
  const safeY = Math.min(y, window.innerHeight - menuH - 60);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.93, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.13, ease: [0.0, 0.0, 0.2, 1] } }}
      exit={{ opacity: 0, scale: 0.93, transition: { duration: 0.09 } }}
      style={{
        position: 'fixed', left: safeX, top: safeY, width: menuW, zIndex: 99999,
        background: 'var(--win-bg-flyout)',
        border: '1px solid var(--win-stroke-card)',
        borderRadius: '8px',
        boxShadow: 'var(--win-shadow-flyout)',
        backdropFilter: 'blur(40px) saturate(160%)',
        WebkitBackdropFilter: 'blur(40px) saturate(160%)',
        padding: '4px', userSelect: 'none',
      }}
    >
      {items.map(item => (
        <React.Fragment key={item.id}>
          <ContextMenuRow item={item} onClose={onClose} />
          {item.dividerAfter && <div style={{ height: '1px', background: 'var(--app-sep)', margin: '3px 4px' }} />}
        </React.Fragment>
      ))}
    </motion.div>
  );
};

const ContextMenuRow: React.FC<{ item: ContextMenuItem; onClose: () => void }> = ({ item, onClose }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <button
      onClick={() => { item.action(); onClose(); }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
        padding: '6px 10px', background: hov ? 'var(--app-hover)' : 'transparent',
        border: 'none', borderRadius: '5px', cursor: 'default',
        fontSize: '13px', color: 'var(--app-text)', transition: 'background 0.08s', outline: 'none',
      }}
    >
      <span style={{ fontSize: '15px', width: '20px', textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
      <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
    </button>
  );
};
