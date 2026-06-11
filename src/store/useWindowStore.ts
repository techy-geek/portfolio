import { create } from 'zustand';

export interface WindowState {
  id: string;
  title: string;
  icon?: string;
  isMinimized: boolean;
  isMaximized: boolean;
  isOpen: boolean;
  zIndex: number;
}

interface WindowStore {
  windows: WindowState[];
  activeWindowId: string | null;
  openWindow: (id: string, title: string, icon?: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
}

export const useWindowStore = create<WindowStore>((set) => ({
  windows: [],
  activeWindowId: null,

  openWindow: (id, title, icon) => set((state) => {
    const existingWindow = state.windows.find(w => w.id === id);
    const maxZ = state.windows.length > 0 ? Math.max(...state.windows.map(w => w.zIndex)) : 0;
    
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        return {
          windows: state.windows.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: maxZ + 1 } : w),
          activeWindowId: id
        };
      }
      return {
        windows: state.windows.map(w => w.id === id ? { ...w, zIndex: maxZ + 1 } : w),
        activeWindowId: id
      };
    }
    
    return {
      windows: [...state.windows, {
        id, title, icon, isMinimized: false, isMaximized: false, isOpen: true, zIndex: maxZ + 1
      }],
      activeWindowId: id
    };
  }),

  closeWindow: (id) => set((state) => {
    const remainingWindows = state.windows.filter(w => w.id !== id);
    const topWindow = remainingWindows.length > 0 
        ? remainingWindows.reduce((prev, current) => (prev.zIndex > current.zIndex) ? prev : current)
        : null;
        
    return {
      windows: remainingWindows,
      activeWindowId: state.activeWindowId === id && topWindow ? topWindow.id : (remainingWindows.length === 0 ? null : state.activeWindowId)
    };
  }),

  minimizeWindow: (id) => set((state) => {
    const remainingWindows = state.windows.filter(w => w.id !== id && !w.isMinimized);
    const topWindow = remainingWindows.length > 0 
        ? remainingWindows.reduce((prev, current) => (prev.zIndex > current.zIndex) ? prev : current)
        : null;

    return {
      windows: state.windows.map(w => w.id === id ? { ...w, isMinimized: true } : w),
      activeWindowId: state.activeWindowId === id && topWindow ? topWindow.id : (state.activeWindowId === id ? null : state.activeWindowId)
    };
  }),

  maximizeWindow: (id) => set((state) => {
    const maxZ = state.windows.length > 0 ? Math.max(...state.windows.map(w => w.zIndex)) : 0;
    return {
      windows: state.windows.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized, zIndex: maxZ + 1 } : w),
      activeWindowId: id
    };
  }),

  focusWindow: (id) => set((state) => {
    if (state.activeWindowId === id) return state;
    const maxZ = state.windows.length > 0 ? Math.max(...state.windows.map(w => w.zIndex)) : 0;
    return {
      windows: state.windows.map(w => w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w),
      activeWindowId: id
    };
  }),
}));
