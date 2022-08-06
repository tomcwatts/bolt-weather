// Libraries
import create from 'zustand';
import { persist } from 'zustand/middleware';

// Zustand Types
import { State } from 'zustand';

// Custom Types
interface LocationState extends State {
  currentLocation: string;
  tempUnit: string;
  useFakeData: boolean;
  setCurrentLocation: (location: string) => void;
  setTempUnit: (tempUnit: string) => void;
  setUseFakeData: (useFakeData: boolean) => void;
}

// Create store using zustand and persist middleware
export const useLocationStore = create<LocationState>()(
  persist((set) => ({
    currentLocation: 'Perth WA, Australia',
    tempUnit: 'c',
    useFakeData: false,
    setCurrentLocation: (location) =>
      set(() => ({ currentLocation: location })),
    setTempUnit: (tempUnit) => set(() => ({ tempUnit })),
    setUseFakeData: (useFakeData) => set(() => ({ useFakeData })),
  }))
);
