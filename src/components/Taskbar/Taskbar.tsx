import React, { useState, useEffect, useRef } from 'react';
import { Clock } from './Clock';
import { useWindowStore } from '../../store/useWindowStore';
import { StartMenu } from './StartMenu';
import { useThemeStore } from '../../store/useThemeStore';
import { AnimatePresence } from 'framer-motion';
import { SearchPopup } from './SearchPopup';

/* ── SVG Icon Components ── */

const WinLogo = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <rect x="0"  y="0"  width="7.5" height="7.5" rx="1" fill="#F25022"/>
    <rect x="8.5" y="0"  width="7.5" height="7.5" rx="1" fill="#7FBA00"/>
    <rect x="0"  y="8.5" width="7.5" height="7.5" rx="1" fill="#00A4EF"/>
    <rect x="8.5" y="8.5" width="7.5" height="7.5" rx="1" fill="#FFB900"/>
  </svg>
);

const SearchSvg = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <circle cx="6.5" cy="6.5" r="4.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4"/>
    <path d="M10 10L13 13" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const WifiSvg = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="12.5" r="1.2" fill="rgba(255,255,255,0.90)"/>
    <path d="M5.2 9.8a4 4 0 015.6 0" stroke="rgba(255,255,255,0.90)" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M2.8 7.4a7 7 0 0110.4 0" stroke="rgba(255,255,255,0.65)" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const VolumeSvg = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3.5 5.5H2a.5.5 0 00-.5.5v4a.5.5 0 00.5.5h1.5l3 2.5V3L3.5 5.5z" fill="rgba(255,255,255,0.90)"/>
    <path d="M9.5 5.8a3 3 0 010 4.4" stroke="rgba(255,255,255,0.90)" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M11.5 3.8a6 6 0 010 8.4" stroke="rgba(255,255,255,0.55)" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const BatterySvg = () => (
  <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
    <rect x="0.5" y="0.5" width="16" height="11" rx="2" stroke="rgba(255,255,255,0.80)" strokeWidth="1.2"/>
    <rect x="17" y="3.5" width="2.5" height="5" rx="1" fill="rgba(255,255,255,0.55)"/>
    <rect x="2" y="2" width="11" height="8" rx="1.2" fill="#6fd400"/>
  </svg>
);

const NotifSvg = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M7.5 1.5a5 5 0 00-5 5v3l-1 1.5h12l-1-1.5v-3a5 5 0 00-5-5z" stroke="rgba(255,255,255,0.80)" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
    <path d="M6 11.5a1.5 1.5 0 003 0" stroke="rgba(255,255,255,0.80)" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

/* ── Icon image ── */
const WindowIcon: React.FC<{ id: string; size?: number }> = ({ id, size = 20 }) => (
  <img
    src={`/icons/${id}.png`}
    alt={id}
    draggable={false}
    style={{ width: size, height: size, objectFit: 'contain', flexShrink: 0 }}
    onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
  />
);

/* ── Taskbar window button ── */
const TaskbarWindowBtn: React.FC<{
  win: { id: string; title: string; isMinimized: boolean };
  isActive: boolean;
  onClick: () => void;
}> = ({ win, isActive, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const isVisible = !win.isMinimized;

  return (
    <div style={{ position: 'relative' }}>
      {hovered && (
        <div className="win-tooltip">{win.title}</div>
      )}
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          width: '48px',
          height: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          background: isActive
            ? 'rgba(255,255,255,0.17)'
            : hovered
            ? 'rgba(255,255,255,0.10)'
            : 'transparent',
          transition: 'background 0.12s',
          outline: 'none',
        }}
      >
        <WindowIcon id={win.id} size={22} />
        {/* Bottom indicator: wide blue = active, narrow white = minimized */}
        <span
          style={{
            position: 'absolute',
            bottom: '2px',
            left: '50%',
            transform: 'translateX(-50%)',
            height: '3px',
            borderRadius: '2px 2px 0 0',
            width: isActive ? '18px' : isVisible ? '5px' : '3px',
            background: isActive ? '#0078d4' : 'rgba(255,255,255,0.5)',
            transition: 'width 0.18s cubic-bezier(0.4,0,0.2,1), background 0.18s',
          }}
        />
      </button>
    </div>
  );
};

/* ── System tray icon button ── */
const TrayBtn: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      title={title}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: '34px', height: '40px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: '6px', border: 'none', cursor: 'pointer',
        background: hov ? 'rgba(255,255,255,0.10)' : 'transparent',
        transition: 'background 0.12s', outline: 'none',
      }}
    >
      {children}
    </button>
  );
};

/* ── Dark mode toggle button ── */
const DarkModeBtn: React.FC = () => {
  const { isDark, toggleDark } = useThemeStore();
  const [hov, setHov] = useState(false);
  return (
    <button
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      onClick={toggleDark}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: '34px', height: '40px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: '6px', border: 'none', cursor: 'pointer',
        background: hov ? 'rgba(255,255,255,0.12)' : 'transparent',
        transition: 'background 0.12s, box-shadow 0.15s', outline: 'none',
        fontSize: '15px',
        boxShadow: hov ? '0 0 8px rgba(255,220,100,0.25)' : 'none',
      }}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
};


/* ── Start button ── */
const StartBtn: React.FC<{ isActive: boolean; onClick: () => void }> = ({ isActive, onClick }) => {
  const [hov, setHov] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <button
      id="taskbar-start"
      title="Start"
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        width: '48px', height: '40px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: '8px', border: 'none', cursor: 'pointer',
        background: isActive
          ? 'rgba(255,255,255,0.15)'
          : pressed
          ? 'rgba(255,255,255,0.07)'
          : hov
          ? 'rgba(255,255,255,0.12)'
          : 'transparent',
        transition: 'background 0.12s', outline: 'none',
        transform: pressed ? 'scale(0.96)' : 'scale(1)',
        position: 'relative',
      }}
    >
      <WinLogo />
      {/* Active indicator */}
      {isActive && (
        <span style={{
          position: 'absolute', bottom: '2px', left: '50%',
          transform: 'translateX(-50%)',
          width: '18px', height: '3px',
          borderRadius: '2px 2px 0 0',
          background: '#0078d4',
        }} />
      )}
    </button>
  );
};

/* ── Search bar ── */
interface SearchBarProps {
  query: string;
  setQuery: (q: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, isOpen, setIsOpen }) => {
  const [hov, setHov] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Blur input when search is closed
  useEffect(() => {
    if (!isOpen && inputRef.current) {
      inputRef.current.blur();
    }
  }, [isOpen]);

  if (isMobile) {
    return (
      <button
        id="taskbar-search"
        title="Search"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          width: '48px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          background: isOpen
            ? 'rgba(255,255,255,0.15)'
            : hov
            ? 'rgba(255,255,255,0.12)'
            : 'transparent',
          transition: 'background 0.12s',
          outline: 'none',
          position: 'relative',
        }}
      >
        <SearchSvg />
        {isOpen && (
          <span style={{
            position: 'absolute', bottom: '2px', left: '50%',
            transform: 'translateX(-50%)',
            width: '18px', height: '3px',
            borderRadius: '2px 2px 0 0',
            background: '#0078d4',
          }} />
        )}
      </button>
    );
  }

  return (
    <div
      id="taskbar-search"
      title="Search"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => inputRef.current?.focus()}
      style={{
        height: '36px',
        padding: '0 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.12)',
        cursor: 'text',
        background: isOpen
          ? 'rgba(255,255,255,0.15)'
          : hov
          ? 'rgba(255,255,255,0.13)'
          : 'rgba(255,255,255,0.08)',
        borderColor: isOpen ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.12)',
        transition: 'background 0.12s, border-color 0.12s',
        minWidth: '200px',
        position: 'relative',
      }}
    >
      <SearchSvg />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsOpen(true)}
        placeholder="Search"
        style={{
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: 'rgba(255,255,255,0.90)',
          fontSize: '13px',
          fontFamily: 'inherit',
          width: '100%',
        }}
      />
    </div>
  );
};

/* ══════════════════════════════════════════════
   Main Taskbar
   ══════════════════════════════════════════════ */
export const Taskbar: React.FC = () => {
  const { windows, activeWindowId, openWindow, minimizeWindow } = useWindowStore();
  const [startOpen, setStartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSearch = (open: boolean) => {
    setSearchOpen(open);
    if (open) setStartOpen(false);
  };

  const toggleStart = (open: boolean) => {
    setStartOpen(open);
    if (open) setSearchOpen(false);
  };

  /**
   * Click logic (same as real Windows 11 taskbar):
   *  - App not open at all  → open it
   *  - App open + active    → minimize it
   *  - App open + inactive  → focus it  (openWindow handles this)
   *  - App minimized        → restore it (openWindow handles this)
   */
  const handleAppClick = (id: string, name: string) => {
    const win = windows.find((w) => w.id === id);
    if (!win) {
      // Not open at all — open fresh
      openWindow(id, name);
    } else if (win.isMinimized) {
      // Minimized — restore via openWindow (sets isMinimized: false)
      openWindow(id, name);
    } else if (activeWindowId === id) {
      // Active and visible — minimize
      minimizeWindow(id);
    } else {
      // Open but not focused — bring to front
      openWindow(id, name);
    }
  };

  return (
    <>
      {startOpen && <StartMenu onClose={() => setStartOpen(false)} />}

      {/* Dedicated Search flyout with AnimatePresence */}
      <AnimatePresence>
        {searchOpen && (
          <SearchPopup
            query={searchQuery}
            setQuery={setSearchQuery}
            onClose={() => setSearchOpen(false)}
          />
        )}
      </AnimatePresence>

    <div
      id="taskbar"
      style={{
        position: 'absolute',
        bottom: 0, left: 0,
        width: '100%',
        height: '48px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(28, 28, 28, 0.88)',
        backdropFilter: 'blur(44px) saturate(180%) brightness(0.9)',
        WebkitBackdropFilter: 'blur(44px) saturate(180%) brightness(0.9)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 -1px 0 rgba(0,0,0,0.25)',
        userSelect: 'none',
      }}
    >
      {/* ── Spacer left ── */}
      <div style={{ minWidth: '8px' }} />

      {/* ── CENTER: all pinned + open items ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        height: '100%',
      }}>
        <StartBtn isActive={startOpen} onClick={() => toggleStart(!startOpen)} />

        <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.10)', margin: '0 2px' }} />

        <SearchBar
          query={searchQuery}
          setQuery={setSearchQuery}
          isOpen={searchOpen}
          setIsOpen={toggleSearch}
        />

        <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.10)', margin: '0 2px' }} />

        {/* ── Open / minimized windows only ── */}
        {windows.map((win) => (
          <TaskbarWindowBtn
            key={win.id}
            win={win}
            isActive={activeWindowId === win.id && !win.isMinimized}
            onClick={() => handleAppClick(win.id, win.title)}
          />
        ))}
      </div>

      {/* ── RIGHT: System Tray + Clock ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        paddingRight: '4px',
        height: '100%',
      }}>
        <TrayBtn title="Notifications"><NotifSvg /></TrayBtn>
        <TrayBtn title="Volume"><VolumeSvg /></TrayBtn>
        <TrayBtn title="Network"><WifiSvg /></TrayBtn>
        <TrayBtn title="Battery"><BatterySvg /></TrayBtn>
        <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.10)', margin: '0 2px' }} />
        <DarkModeBtn />
        <Clock />
      </div>
    </div>
    </>
  );
};
