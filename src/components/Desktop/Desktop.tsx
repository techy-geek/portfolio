import React, { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DesktopIcon } from './DesktopIcon';
import { Taskbar } from '../Taskbar/Taskbar';
import { WindowManager } from '../Window/WindowManager';
import { ContextMenu } from '../ContextMenu/ContextMenu';
import type { ContextMenuItem } from '../ContextMenu/ContextMenu';
import { useWindowStore } from '../../store/useWindowStore';
import { useThemeStore } from '../../store/useThemeStore';
import { useSettingsStore, WALLPAPERS } from '../../store/useSettingsStore';
import { notify } from '../../store/useNotifStore';

export const APPS = [
  { id: 'about',          name: 'About Me',       icon: '/icons/about.png'          },
  { id: 'projects',       name: 'Projects',        icon: '/icons/projects.png'       },
  { id: 'skills',         name: 'Skills',          icon: '/icons/skills.png'         },
  { id: 'experience',     name: 'Experience',      icon: '/icons/experience.png'     },
  { id: 'publications',   name: 'Publications',    icon: '/icons/publications.png'   },
  { id: 'certifications', name: 'Certifications',  icon: '/icons/certifications.png' },
  { id: 'resume',         name: 'Resume.pdf',      icon: '/icons/resume.png'         },
  { id: 'contact',        name: 'Contact',         icon: '/icons/contact.png'        },
  { id: 'terminal',       name: 'Terminal',        icon: '/icons/terminal.png'       },
  { id: 'settings',       name: 'Settings',        icon: '/icons/settings.png'       },
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
    notify({
      title: isDark ? 'Light Mode' : 'Dark Mode',
      message: isDark ? 'Switched to light theme ☀️' : 'Switched to dark theme 🌙',
      type: 'info',
      duration: 2500,
    });
  };

  const onContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setCtx({ x: e.clientX, y: e.clientY });
  }, []);

  const ctxItems: ContextMenuItem[] = [
    { id: 'terminal', label: 'Open Terminal', icon: '🖥️', action: () => openWindow('terminal', 'Terminal') },
    { id: 'settings', label: 'Settings',      icon: '⚙️', action: () => openWindow('settings', 'Settings') },
    { id: 'darkmode', label: isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode', icon: isDark ? '☀️' : '🌙', action: handleDarkToggle, dividerAfter: true },
    { id: 'about',    label: 'About Me',  icon: '👤', action: () => openWindow('about',    'About Me')  },
    { id: 'projects', label: 'Projects',  icon: '📁', action: () => openWindow('projects', 'Projects')  },
    { id: 'contact',  label: 'Contact',   icon: '✉️', action: () => openWindow('contact',  'Contact'), dividerAfter: true },
    { id: 'source',   label: 'View Source on GitHub', icon: '🔗', action: () => window.open('https://github.com/anurag-sharma', '_blank') },
  ];

  /* Wallpaper style — gradient or image */
  const wallpaperStyle: React.CSSProperties = wallpaper.css
    ? { background: wallpaper.value }
    : { backgroundImage: wallpaper.value, backgroundSize: 'cover', backgroundPosition: 'center' };

  return (
    <div
      className="w-screen h-screen overflow-hidden flex flex-col relative select-none"
      onClick={() => setSelectedIcon(null)}
      onContextMenu={onContextMenu}
    >
      {/* Wallpaper */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        transition: 'filter 0.5s ease',
        filter: isDark ? 'brightness(0.55) saturate(0.85)' : 'brightness(1)',
        ...wallpaperStyle,
      }} />

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
