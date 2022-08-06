import {
  ArrowCircleDownRight24Filled,
  ArrowTrending24Filled,
  Drop24Filled,
  Info24Regular,
  WeatherDrizzle24Filled,
} from '@fluentui/react-icons';
import { useStyletron } from 'baseui';
import { Button, ButtonOverrides, KIND, SHAPE, SIZE } from 'baseui/button';
import { PLACEMENT, StatefulPopover } from 'baseui/popover';
import { useState } from 'react';
import { formatWindSpeed } from '../utils/formatters';
import { OpenWeatherResponse } from '../utils/types';

type Props = {
  unit: string;
  weather: OpenWeatherResponse['daily'][0];
};

export default function WeatherInfoIcon(props: Props) {
  const [css, theme] = useStyletron();
  const [isOpen, setIsOpen] = useState(false);

  const list = css({
    display: 'flex',
    flex: '1 1 auto',
    flexFlow: 'column nowrap',
    justifyContent: 'flex-start',
    width: '200px',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    backgroundColor: theme.colors.backgroundPrimary,
  });
  const listItem = css({
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    paddingTop: theme.sizing.scale500,
    paddingBottom: theme.sizing.scale500,
    paddingLeft: theme.sizing.scale500,
    paddingRight: theme.sizing.scale500,
    cursor: 'default',
  });
  const listItemIcon = css({
    marginRight: theme.sizing.scale300,
  });

  const name = css({
    ...theme.typography.LabelMedium,
    display: 'flex',
    fontWeight: 600,
    lineHeight: 1.4,
  });

  const role = css({
    ...theme.typography.ParagraphSmall,
    color: theme.colors.contentSecondary,
  });
  const UserDetails = () => (
    <>
      <li className={listItem}>
        <span className={name}>
          <ArrowCircleDownRight24Filled
            color="#969eb0"
            className={css({
              marginRight: theme.sizing.scale300,
              transform: `rotate(${props.weather.wind_deg}deg)`,
            })}
          />{' '}
          Wind
        </span>
        <span className={role}>
          {formatWindSpeed(props.weather.wind_speed, props.unit === 'c')}
        </span>
      </li>
      <li className={listItem}>
        <span className={name}>
          <WeatherDrizzle24Filled className={listItemIcon} color="#83b4cf" />{' '}
          Rain chance
        </span>
        <span className={role}>
          {`${Math.round(props.weather.pop * 100)}%`}
        </span>
      </li>
      <li className={listItem}>
        <span className={name}>
          <Drop24Filled color="#6bbbea" className={listItemIcon} /> Humidity
        </span>
        <span className={role}>{`${props.weather.humidity}%`}</span>
      </li>
      <li className={listItem}>
        <span className={name}>
          <ArrowTrending24Filled color="#db8cea" className={listItemIcon} />{' '}
          Pressure
        </span>
        <span className={role}>{`${props.weather.pressure} hPa`}</span>
      </li>
    </>
  );

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
    <StatefulPopover
      focusLock
      placement={PLACEMENT.bottomRight}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      content={() => (
        <ul className={list}>
          <UserDetails />
        </ul>
      )}
    >
      <Button
        shape={SHAPE.circle}
        size={SIZE.mini}
        kind={KIND.tertiary}
        overrides={buttonOverrides}
      >
        <Info24Regular
          className={css({ pointerEvents: 'none' })}
          color={theme.colors.contentTertiary}
        />
      </Button>
    </StatefulPopover>
  );
}
