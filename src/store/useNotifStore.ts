import { create } from 'zustand';

export type NotifType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotifType;
  icon?: string;
  duration: number; // ms
  createdAt: number;
}

interface NotifStore {
  notifications: Notification[];
  push: (n: Omit<Notification, 'id' | 'createdAt'>) => void;
  dismiss: (id: string) => void;
}

export const useNotifStore = create<NotifStore>((set) => ({
  notifications: [],

  push: (n) => {
    const id = `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    set(s => ({
      notifications: [...s.notifications.slice(-4), { ...n, id, createdAt: Date.now() }],
    }));
  },

  dismiss: (id) => set(s => ({ notifications: s.notifications.filter(n => n.id !== id) })),
}));

/* ── Helper to push notifications without importing hook in class code ── */
export const notify = (n: Omit<Notification, 'id' | 'createdAt'>) =>
  useNotifStore.getState().push(n);
