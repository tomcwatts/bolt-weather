// Libraries
import create from 'zustand';

// Zustand Types
import { State } from 'zustand';

// Custom Types
interface LocationState extends State {
  location: string;
  setLocation: (location: string) => void;
}

// Store
export const useLocationStore = create<LocationState>((set) => ({
  location: 'Perth WA, Australia',
  setLocation: (location) => set(() => ({ location })),
}));
