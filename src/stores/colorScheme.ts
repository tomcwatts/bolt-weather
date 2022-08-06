// Libraries
import create from 'zustand';
import { persist } from 'zustand/middleware';

// Zustand Types
import Object from 'zustand';

// Custom Types
type ColorScheme = 'light' | 'dark';
interface ColorSchemeState extends Object {
  colorScheme: ColorScheme;
  toggleColorScheme: (colorScheme?: ColorScheme) => void;
  setColorScheme: (colorScheme: ColorScheme) => void;
}

// Create store using zustand and persist middleware
export const useColorSchemeStore = create<ColorSchemeState>()(
  persist((set) => ({
    colorScheme: 'light',
    toggleColorScheme: (colorScheme?: ColorScheme) =>
      set((state) => ({
        colorScheme:
          colorScheme || (state.colorScheme === 'light' ? 'dark' : 'light'),
      })),
    setColorScheme: (colorScheme: ColorScheme) =>
      set(() => ({
        colorScheme,
      })),
  }))
);
