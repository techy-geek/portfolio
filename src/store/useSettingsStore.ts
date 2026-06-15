import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const WALLPAPERS = [
  { id: 'wallpaper1', label: 'Wallpaper 1', value: 'url("/wallpaper1.png")', css: false },
  { id: 'wallpaper2', label: 'Wallpaper 2', value: 'url("/wallpaper2.png")', css: false },
  { id: 'wallpaper3', label: 'Wallpaper 3', value: 'url("/wallpaper3.png")', css: false },
  { id: 'wallpaper4', label: 'Wallpaper 4', value: 'url("/wallpaper4.png")', css: false },
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
      wallpaperId: 'wallpaper1',
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
