import React, { useState } from 'react';
import { useWindowStore } from '../../store/useWindowStore';

interface DesktopIconProps {
  id: string;
  name: string;
  icon: string; 
  isSelected?: boolean;
  onSelect?: () => void;
  onDeselect?: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  id, name, icon, isSelected, onSelect, onDeselect,
}) => {
  const openWindow = useWindowStore((state) => state.openWindow);
  const [hovered, setHovered] = useState(false);
  const bgStyle: React.CSSProperties = isSelected
    ? {
        background: 'rgba(0, 103, 192, 0.30)',
        outline: '1px solid rgba(0, 103, 192, 0.55)',
        outlineOffset: '-1px',
      }
    : hovered
    ? { background: 'rgba(255,255,255,0.15)' }
    : {};

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '84px',
        padding: '6px 4px 5px',
        borderRadius: '5px',
        cursor: 'default',
        userSelect: 'none',
        transition: 'background 0.08s',
        ...bgStyle,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        const isTouchOrMobile = window.innerWidth < 768 || ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
        if (isTouchOrMobile) {
          openWindow(id, name, name);
          onDeselect?.();
        } else {
          onSelect?.();
        }
      }}
      onDoubleClick={(e) => { e.stopPropagation(); openWindow(id, name, name); onDeselect?.(); }}
    >
      {/* Icon image — Windows 11 style: directly rendered, no tile background */}
      <img
        src={icon}
        alt={name}
        draggable={false}
        style={{
          width: '48px',
          height: '48px',
          objectFit: 'contain',
          filter: isSelected
            ? 'drop-shadow(0 0 6px rgba(0,103,192,0.6))'
            : hovered
            ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.5)) brightness(1.08)'
            : 'drop-shadow(0 2px 6px rgba(0,0,0,0.45))',
          transition: 'filter 0.1s, transform 0.08s',
          transform: hovered && !isSelected ? 'scale(1.06)' : 'scale(1)',
          flexShrink: 0,
        }}
        onError={(e) => {
          // Fallback: hide broken image icon
          (e.target as HTMLImageElement).style.opacity = '0';
        }}
      />

      {/* Label — white text with text shadow, exactly like Windows 11 */}
      <span
        style={{
          marginTop: '5px',
          fontSize: '11.5px',
          fontWeight: 400,
          lineHeight: '1.3',
          textAlign: 'center',
          color: '#ffffff',
          textShadow: '0 1px 3px rgba(0,0,0,0.90), 0 0 8px rgba(0,0,0,0.60)',
          wordBreak: 'break-word',
          maxWidth: '76px',
          letterSpacing: '0.01em',
          /* Cap at 2 lines like Windows */
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        } as React.CSSProperties}
      >
        {name}
      </span>
    </div>
  );
};
