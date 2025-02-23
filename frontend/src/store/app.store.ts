import { create } from 'zustand';

interface SidebarState {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  activeItem: 'Dashboard', // Default active item
  setActiveItem: (item) => set({ activeItem: item }),
}));
