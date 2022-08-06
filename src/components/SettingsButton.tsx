import {
  Settings24Filled,
  Temperature24Regular,
  WeatherMoon24Regular,
  WeatherSunny24Regular,
} from '@fluentui/react-icons';
import { useStyletron } from 'baseui';
import { Button, ButtonOverrides, KIND, SHAPE } from 'baseui/button';
import { PLACEMENT, StatefulPopover } from 'baseui/popover';
import { useState } from 'react';
import { useColorSchemeStore } from '../stores/colorScheme';
import { useLocationStore } from '../stores/location';
import { DropdownListItem } from './ListItem';

export default function SettingsButton() {
  const [css, theme] = useStyletron();
  const [isOpen, setIsOpen] = useState(false);
  const tempUnit = useLocationStore((state) => state.tempUnit);
  const colorScheme = useColorSchemeStore((state) => state.colorScheme);
  const setTempUnit = useLocationStore((state) => state.setTempUnit);
  const toggleColorScheme = useColorSchemeStore(
    (state) => state.toggleColorScheme
  );
  const [checked, setChecked] = useState(tempUnit === 'f' ? true : false);
  const sunIcon = <WeatherSunny24Regular fill={theme.colors.contentPrimary} />;
  const moonIcon = <WeatherMoon24Regular fill={theme.colors.contentPrimary} />;

  const isWindows =
    typeof window !== 'undefined' &&
    navigator &&
    navigator.userAgent.indexOf('Win') != -1;

  function toggleTempUnit() {
    setChecked(!checked);
    setTempUnit(checked ? 'c' : 'f');
  }

  // Styles
  const list = css({
    display: 'flex',
    flex: '1 1 auto',
    flexFlow: 'column nowrap',
    justifyContent: 'flex-start',
    width: '260px',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    backgroundColor: theme.colors.backgroundPrimary,
  });
  const listItemLabel = css({
    ...theme.typography.LabelMedium,
    marginRight: 'auto',
  });
  const buttonOverrides: ButtonOverrides = {
    BaseButton: {
      style: {
        flex: '0 0 48px',
        marginLeft: theme.sizing.scale600,
        transitionProperty: 'all',
        backgroundColor: theme.colors.backgroundSecondary,
        transitionDuration: theme.animation.timing200,
        boxShadow: isOpen
          ? `${theme.colors.accent} 0px 0px 0px 2px`
          : undefined,
        ':hover': {
          boxShadow: `${theme.colors.accent} 0px 0px 0px 2px`,
        },
      },
    },
  };

  return (
    <div>
      <StatefulPopover
        placement={PLACEMENT.bottomRight}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        content={() => (
          <ul className={list}>
            <DropdownListItem
              key="appearance"
              icon={colorScheme === 'dark' ? moonIcon : sunIcon}
              onClick={() => toggleColorScheme()}
              endEnhancer={
                <span className={listItemLabel}>
                  ({isWindows ? 'Ctrl' : '⌘'}+K)
                </span>
              }
            >
              <span className={listItemLabel}>
                <strong>
                  &nbsp;{colorScheme === 'dark' ? 'Dark' : 'Light'}
                </strong>
              </span>
            </DropdownListItem>
            <DropdownListItem
              key="temp-unit"
              icon={<Temperature24Regular />}
              onClick={() => toggleTempUnit()}
              endEnhancer={
                <span className={listItemLabel}>
                  ({isWindows ? 'Ctrl' : '⌘'}+U)
                </span>
              }
            >
              <span className={listItemLabel}>
                <strong>
                  &nbsp;{tempUnit === 'c' ? 'Celcius' : 'Fahrenheit'}
                </strong>
              </span>
            </DropdownListItem>
          </ul>
        )}
      >
        <Button
          shape={SHAPE.circle}
          kind={KIND.secondary}
          overrides={buttonOverrides}
        >
          <Settings24Filled
            className={css({ pointerEvents: 'none' })}
            color={theme.colors.contentSecondary}
          />
        </Button>
      </StatefulPopover>
    </div>
  );
}
