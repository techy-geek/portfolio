import React, { useEffect, useRef, useState } from 'react';
import { useWindowStore } from '../../store/useWindowStore';

/* ── All portfolio apps ── */
const APPS = [
  { id: 'about',          name: 'About Me',       emoji: '👤' },
  { id: 'projects',       name: 'Projects',        emoji: '📁' },
  { id: 'skills',         name: 'Skills',          emoji: '⚡' },
  { id: 'experience',     name: 'Experience',      emoji: '💼' },
  { id: 'publications',   name: 'Publications',    emoji: '📄' },
  { id: 'certifications', name: 'Certifications',  emoji: '🏆' },
  { id: 'resume',         name: 'Resume.pdf',      emoji: '📋' },
  { id: 'contact',        name: 'Contact',         emoji: '✉️' },
];

/* ── SVG icons ── */
const PowerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 1v6M4.3 3.3a6 6 0 1 0 7.4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M10 10L13 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

/* ── App tile in Start Menu ── */
const AppTile: React.FC<{
  app: typeof APPS[0];
  onOpen: () => void;
}> = ({ app, onOpen }) => {
  const [hov, setHov] = useState(false);

  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onOpen}
      title={app.name}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '7px',
        width: '88px',
        height: '88px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        background: hov ? 'rgba(255,255,255,0.12)' : 'transparent',
        transition: 'background 0.12s',
        outline: 'none',
        padding: '8px 4px 6px',
      }}
    >
      {/* Icon */}
      <div style={{
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        <img
          src={`/icons/${app.id}.png`}
          alt={app.name}
          draggable={false}
          style={{ width: '36px', height: '36px', objectFit: 'contain' }}
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.style.display = 'none';
            const sibling = img.nextElementSibling as HTMLElement;
            if (sibling) sibling.style.display = 'flex';
          }}
        />
        {/* Emoji fallback */}
        <span
          style={{
            display: 'none',
            fontSize: '26px',
            lineHeight: 1,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            inset: 0,
          }}
        >
          {app.emoji}
        </span>
      </div>

      {/* Label */}
      <span style={{
        fontSize: '11px',
        fontWeight: 400,
        color: 'rgba(255,255,255,0.90)',
        textAlign: 'center',
        lineHeight: '1.25',
        maxWidth: '80px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        letterSpacing: '0.01em',
      }}>
        {app.name}
      </span>
    </button>
  );
};

/* ══════════════════════════════════════════════════
   Start Menu
   ══════════════════════════════════════════════════ */
interface StartMenuProps {
  onClose: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({ onClose }) => {
  const openWindow  = useWindowStore((s) => s.openWindow);
  const [query, setQuery] = useState('');
  const inputRef    = useRef<HTMLInputElement>(null);
  const menuRef     = useRef<HTMLDivElement>(null);

  /* Focus search on open */
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 60);
  }, []);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  /* Close on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    // Slight delay so the click that opened the menu doesn't immediately close it
    const timer = setTimeout(() => document.addEventListener('mousedown', handler), 80);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handler);
    };
  }, [onClose]);

  const filtered = query.trim()
    ? APPS.filter((a) => a.name.toLowerCase().includes(query.toLowerCase()))
    : APPS;

  const handleOpen = (app: typeof APPS[0]) => {
    openWindow(app.id, app.name);
    onClose();
  };

  return (
    <div
      ref={menuRef}
      style={{
        position: 'absolute',
        bottom: '52px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '660px',
        maxWidth: 'calc(100vw - 32px)',
        background: 'rgba(32, 32, 32, 0.92)',
        backdropFilter: 'blur(60px) saturate(180%)',
        WebkitBackdropFilter: 'blur(60px) saturate(180%)',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.35)',
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'startMenuSlideUp 0.18s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <style>{`
        @keyframes startMenuSlideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0)    scale(1);    }
        }
      `}</style>

      {/* ── Search bar ── */}
      <div style={{ padding: '28px 28px 20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: '8px',
          padding: '10px 14px',
          transition: 'border-color 0.15s',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', flexShrink: 0 }}><SearchIcon /></span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search apps..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'rgba(255,255,255,0.90)',
              fontSize: '14px',
              fontWeight: 400,
              fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      {/* ── Section label ── */}
      <div style={{
        padding: '0 28px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
          {query ? `Results for "${query}"` : 'Pinned'}
        </span>
      </div>

      {/* ── App grid ── */}
      <div style={{ padding: '0 20px 20px', minHeight: '200px' }}>
        {filtered.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '4px',
          }}>
            {filtered.map((app) => (
              <AppTile key={app.id} app={app} onOpen={() => handleOpen(app)} />
            ))}
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '160px',
            color: 'rgba(255,255,255,0.35)',
            fontSize: '13px',
            gap: '10px',
          }}>
            <span style={{ fontSize: '32px' }}>🔍</span>
            No results found
          </div>
        )}
      </div>

      {/* ── Divider ── */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '0 28px' }} />

      {/* ── Footer: User + Power ── */}
      <div style={{
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* User */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0078d4, #6264a7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', fontWeight: 600, color: '#fff',
            flexShrink: 0,
          }}>
            A
          </div>
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
            Anurag Sharma
          </span>
        </div>

        {/* Power button */}
        <button
          title="Sign out / Close"
          onClick={onClose}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '36px', height: '36px',
            borderRadius: '8px',
            border: 'none', cursor: 'pointer',
            background: 'transparent',
            color: 'rgba(255,255,255,0.70)',
            transition: 'background 0.12s, color 0.12s',
            outline: 'none',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.10)';
            (e.currentTarget as HTMLButtonElement).style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.70)';
          }}
        >
          <PowerIcon />
        </button>
      </div>
    </div>
  );
};
