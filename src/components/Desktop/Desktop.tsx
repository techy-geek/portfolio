import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DesktopIcon } from './DesktopIcon';
import { Taskbar } from '../Taskbar/Taskbar';
import { WindowManager } from '../Window/WindowManager';
import { ContextMenu } from '../ContextMenu/ContextMenu';
import type { ContextMenuItem } from '../ContextMenu/ContextMenu';
import { useWindowStore } from '../../store/useWindowStore';
import { useThemeStore } from '../../store/useThemeStore';
import { useSettingsStore, WALLPAPERS } from '../../store/useSettingsStore';

import folderIcon from '../../assets/folder.png';
import terminalIcon from '../../assets/terminal.png';
import settingIcon from '../../assets/setting.png';
import pdfIcon from '../../assets/pdf.png';

export const APPS = [
  { id: 'about', name: 'About Me', icon: folderIcon },
  { id: 'projects', name: 'Projects', icon: folderIcon },
  { id: 'skills', name: 'Skills', icon: folderIcon },
  { id: 'experience', name: 'Experience', icon: folderIcon },
  { id: 'resume', name: 'Resume.pdf', icon: pdfIcon },
  { id: 'contact', name: 'Contact', icon: folderIcon },
  { id: 'terminal', name: 'Terminal', icon: terminalIcon },
  { id: 'settings', name: 'Settings', icon: settingIcon },
];

export const Desktop: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [ctx, setCtx] = useState<{ x: number; y: number } | null>(null);
  const { openWindow } = useWindowStore();
  const { isDark, toggleDark } = useThemeStore();
  const { wallpaperId } = useSettingsStore();

  const wallpaper = WALLPAPERS.find(w => w.id === wallpaperId) ?? WALLPAPERS[0];

  const handleDarkToggle = () => {
    toggleDark();
  };

  const onContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setCtx({ x: e.clientX, y: e.clientY });
  }, []);

  const ctxItems: ContextMenuItem[] = [
    { id: 'terminal', label: 'Open Terminal', icon: '🖥️', action: () => openWindow('terminal', 'Terminal') },
    { id: 'settings', label: 'Settings', icon: '⚙️', action: () => openWindow('settings', 'Settings') },
    { id: 'darkmode', label: isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode', icon: isDark ? '☀️' : '🌙', action: handleDarkToggle, dividerAfter: true },
    { id: 'about', label: 'About Me', icon: '👤', action: () => openWindow('about', 'About Me') },
    { id: 'projects', label: 'Projects', icon: '📁', action: () => openWindow('projects', 'Projects') },
    { id: 'contact', label: 'Contact', icon: '✉️', action: () => openWindow('contact', 'Contact'), dividerAfter: true },
    { id: 'source', label: 'View Source on GitHub', icon: '🔗', action: () => window.open('https://github.com/anurag-sharma', '_blank') },
  ];

  /* Wallpaper crossfade: keep previous wallpaper visible while new one fades in */
  const prevWallpaperRef = useRef(wallpaper);
  useEffect(() => {
    const t = setTimeout(() => { prevWallpaperRef.current = wallpaper; }, 700);
    return () => clearTimeout(t);
  }, [wallpaper]);

  const toStyle = (w: typeof wallpaper): React.CSSProperties =>
    w.css
      ? { background: w.value }
      : { backgroundImage: w.value, backgroundSize: 'cover', backgroundPosition: 'center' };

  const darkFilter: React.CSSProperties = {
    filter: isDark ? 'brightness(0.55) saturate(0.85)' : 'brightness(1)',
    transition: 'filter 0.5s ease',
  };

  return (
    <div
      className="w-screen h-screen overflow-hidden flex flex-col relative select-none"
      onClick={() => setSelectedIcon(null)}
      onContextMenu={onContextMenu}
    >
      {/* Wallpaper — crossfade between previous and current */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, ...darkFilter }}>
        {/* Previous wallpaper sits underneath */}
        <div style={{ position: 'absolute', inset: 0, ...toStyle(prevWallpaperRef.current) }} />
        {/* New wallpaper fades in on top */}
        <AnimatePresence>
          <motion.div
            key={wallpaper.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0, ...toStyle(wallpaper) }}
          />
        </AnimatePresence>
      </div>

      {/* Icons */}
      <div
        className="flex-1 flex flex-col flex-wrap items-start content-start pt-3 pl-3 gap-1 relative z-10"
        style={{ paddingBottom: '48px' }}
        onClick={e => e.stopPropagation()}
      >
        {APPS.map(app => (
          <DesktopIcon
            key={app.id} id={app.id} name={app.name} icon={app.icon}
            isSelected={selectedIcon === app.id}
            onSelect={() => setSelectedIcon(app.id)}
            onDeselect={() => setSelectedIcon(null)}
          />
        ))}
      </div>

      {/* Windows */}
      <div id="window-layer" style={{ position: 'absolute', inset: 0, bottom: '48px', zIndex: 50, pointerEvents: 'none' }}>
        <WindowManager />
      </div>

      <Taskbar />

      {/* Right-click menu */}
      <AnimatePresence>
        {ctx && (
          <ContextMenu key="ctx" x={ctx.x} y={ctx.y} items={ctxItems} onClose={() => setCtx(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};
