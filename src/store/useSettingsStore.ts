import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const WALLPAPERS = [
  { id: 'default',  label: 'Default',   value: 'url("/wallpaper.png")',                                                                                              css: false },
  { id: 'aurora',   label: 'Aurora',    value: 'linear-gradient(135deg,#0d1117 0%,#0d3b2e 30%,#0d4f6b 60%,#1e1b4b 100%)',                                           css: true  },
  { id: 'cosmos',   label: 'Cosmos',    value: 'radial-gradient(ellipse at 25% 60%,#4a1a6e 0%,#1a0a3e 40%,#050510 80%)',                                             css: true  },
  { id: 'sunset',   label: 'Sunset',    value: 'linear-gradient(160deg,#1a0a2e 0%,#3d1a56 25%,#7c3aed 55%,#db2777 80%,#f59e0b 100%)',                               css: true  },
  { id: 'ocean',    label: 'Ocean',     value: 'linear-gradient(160deg,#020c1b 0%,#0a2540 35%,#0d6efd 70%,#06b6d4 100%)',                                            css: true  },
  { id: 'forest',   label: 'Forest',    value: 'linear-gradient(135deg,#0a1628 0%,#0d3b2a 35%,#166534 60%,#15803d 100%)',                                            css: true  },
  { id: 'volcano',  label: 'Volcano',   value: 'radial-gradient(ellipse at 50% 100%,#7f1d1d 0%,#991b1b 25%,#450a0a 55%,#0c0a09 100%)',                              css: true  },
  { id: 'midnight', label: 'Midnight',  value: 'linear-gradient(135deg,#000000 0%,#0d1117 40%,#111827 70%,#1e1b4b 100%)',                                            css: true  },
] as const;

export const ACCENT_COLORS = [
  { name: 'Win Blue',  value: '#0078d4' },
  { name: 'Purple',    value: '#744da9' },
  { name: 'Hot Pink',  value: '#e3008c' },
  { name: 'Red',       value: '#c42b1c' },
  { name: 'Orange',    value: '#ca5010' },
  { name: 'Marigold',  value: '#c19c00' },
  { name: 'Green',     value: '#107c10' },
  { name: 'Teal',      value: '#008272' },
  { name: 'Slate',     value: '#4f6bed' },
  { name: 'Mint',      value: '#00b294' },
];

type WallpaperId = typeof WALLPAPERS[number]['id'];

interface SettingsState {
  wallpaperId:  WallpaperId;
  accentColor:  string;
  setWallpaper: (id: WallpaperId) => void;
  setAccent:    (color: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      wallpaperId: 'default',
      accentColor: '#0078d4',
      setWallpaper: (wallpaperId) => set({ wallpaperId }),
      setAccent:    (accentColor) => set({ accentColor }),
    }),
    { name: 'win11-settings' }
  )
);

/* Sync accent color to CSS variable */
export const applyAccent = (color: string) => {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  document.documentElement.style.setProperty('--win-accent', color);
  document.documentElement.style.setProperty('--win-accent-light', `rgba(${r},${g},${b},0.12)`);
};
