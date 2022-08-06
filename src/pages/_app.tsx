import React, { useEffect } from 'react';
import { BaseProvider } from 'baseui';
import { darkTheme, lightTheme } from '../theme';
import { Provider as StyletronProvider } from 'styletron-react';
import { styletron } from '../styletron';
import { useColorSchemeStore } from '../stores/colorScheme';
import { useLocationStore } from '../stores/location';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'baseui/snackbar';

export default function App({ Component, pageProps }: AppProps) {
  const [scheme, setScheme] = React.useState('light');
  const colorScheme = useColorSchemeStore((state) => state.colorScheme);
  const tempUnit = useLocationStore((state) => state.tempUnit);
  const setTempUnit = useLocationStore((state) => state.setTempUnit);
  const toggleColorScheme = useColorSchemeStore(
    (state) => state.toggleColorScheme
  );

  // BaseProvider overrides
  const baseOverrides = {
    AppContainer: {
      style: () => ({
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'space-between',
        backgroundImage:
          scheme === 'light'
            ? 'none'
            : 'linear-gradient(182deg, #13429a, #01296c)',
        minHeight: '100vh',
      }),
    },
  };

  // Set local state when the store color scheme changes
  useEffect(() => {
    if (colorScheme === 'light') {
      setScheme('light');
    } else {
      setScheme('dark');
    }
  }, [colorScheme]);

  // Toggle color scheme when pressing 'CMD/Ctrl+K'
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if user is on Linux or Mac
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        toggleColorScheme();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleColorScheme]);

  // Toggle temperature unit on key pressing 'CMD/Ctrl+U'
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'u') {
        setTempUnit(tempUnit === 'c' ? 'f' : 'c');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tempUnit, setTempUnit]);

  return (
    <StyletronProvider value={styletron}>
      <BaseProvider
        theme={scheme === 'light' ? lightTheme : darkTheme}
        overrides={baseOverrides}
      >
        <SnackbarProvider placement="bottom">
          <Component {...pageProps} />
        </SnackbarProvider>
      </BaseProvider>
    </StyletronProvider>
  );
}
