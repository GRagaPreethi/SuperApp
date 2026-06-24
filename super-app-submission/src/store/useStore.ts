import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AppState {
  user: { name: string; username: string; email: string; mobile: string } | null;
  categories: string[];
  notes: string;
  timerState: { hours: number; minutes: number; seconds: number; running: boolean };
  setUser: (user: AppState['user']) => void;
  setCategories: (cats: string[]) => void;
  setNotes: (n: string) => void;
  setTimerState: (t: Partial<AppState['timerState']>) => void;
  clearUser: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      categories: [],
      notes: '',
      timerState: { hours: 0, minutes: 0, seconds: 0, running: false },
      setUser: (user) => set({ user }),
      setCategories: (categories) => set({ categories }),
      setNotes: (notes) => set({ notes }),
      setTimerState: (timerState) =>
        set((state) => ({ timerState: { ...state.timerState, ...timerState } })),
      clearUser: () =>
        set({ user: null, categories: [], notes: '', timerState: { hours: 0, minutes: 0, seconds: 0, running: false } }),
    }),
    {
      name: 'superapp-storage',
    }
  )
);
