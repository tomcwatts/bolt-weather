import { ArrowDown24Filled, ArrowUp24Filled } from '@fluentui/react-icons';
import { useStyletron } from 'baseui';
import * as React from 'react';
import Icon from '../components/Icon';
import {
  formatTemperature,
  formatTemperatureWithoutUnit,
} from '../utils/formatters';
import useWeather from '../utils/useWeather';
import { WeatherStatCard } from './WeatherStatCard';
import WeatherStats from './WeatherStats';

export default function WeatherToday() {
  const [css, theme] = useStyletron();
  const { weather, tempUnit } = useWeather();
  const currentWeather = weather.current;
  const { temp } = currentWeather;
  const { description } = currentWeather.weather[0];
  const { icon } = currentWeather.weather[0];

  const tempContain = css({
    display: 'flex',
    flexFlow: 'column wrap',
    // justifyContent: 'center',
    // alignItems: 'center',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  });

  const tempText = css({
    // alignSelf: 'flex-start',
    // justifySelf: 'flex-start',
    fontSize: '4rem',
    // lineHeight: '3rem',
    lineHeight: '1',
    fontWeight: 700,
    // marginTop: theme.sizing.scale1000,
    marginTop: '0',
    marginBottom: theme.sizing.scale500,
    display: 'flex',
    color: theme.colors.contentPrimary,
    [theme.mediaQuery.small]: {
      fontSize: '6rem',
    },
    [theme.mediaQuery.medium]: {
      fontSize: '7rem',
    },
  });
  const feelsLikeText = css({
    fontSize: theme.sizing.scale600,
    textAlign: 'right',
    lineHeight: 1,
    fontWeight: 500,
    marginTop: 0,
    // minHeight: '62px',
    marginBottom: 0,
    display: 'flex',
    alignItems: 'center',
    backgroundImage: 'linear-gradient(32deg, #D7752F 0%, #FA7070 100%)',
    '-webkitTextFillColor': 'transparent',
    '-webkitTextStrokeColor': 'transparent',
    '-webkitBackgroundClip': 'text',
    [theme.mediaQuery.medium]: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      paddingRight: theme.sizing.scale500,
      paddingBottom: '0',
      fontSize: theme.sizing.scale700,
    },
  });

  return (
    <>
      <div
        className={css({
          display: 'flex',
          flexFlow: 'row wrap',
          marginTop: theme.sizing.scale400,
        })}
      >
        <div
          className={css({
            display: 'flex',
            flex: '0 1 40%',
            justifyContent: 'center',
            maxWidth: '150px',
            marginLeft: 'auto',
            [theme.mediaQuery.small]: { marginLeft: '0', maxWidth: '100%' },
            [theme.mediaQuery.medium]: { flex: '0 1 28%' },
          })}
        >
          <WeatherTodayIcon>
            <Icon icon={icon} size={'220px'} />
          </WeatherTodayIcon>
        </div>
        <div
          className={css({
            display: 'flex',
            flex: '0 1 50%',
            [theme.mediaQuery.small]: { flex: '1 1 60%' },
            [theme.mediaQuery.medium]: { flex: '0 1 32%' },
            [theme.mediaQuery.large]: { flex: '0 1 36%' },
          })}
        >
          <div className={tempContain}>
            <p className={tempText}>
              {formatTemperatureWithoutUnit(tempUnit, temp)}
              <span
                className={css({
                  fontSize: '2rem',
                  lineHeight: '1rem',
                  verticalAlign: 'text-top',
                  marginLeft: '-0.1rem',
                  [theme.mediaQuery.small]: {
                    lineHeight: '3rem',
                    fontSize: '4rem',
                  },
                })}
              >
                °
              </span>
            </p>
            <p
              className={css({
                ...theme.typography.LabelSmall,
                color: theme.colors.contentSecondary,
                fontWeight: 400,
                lineHeight: 1,
                marginTop: 0,
                marginBottom: 0,
                ':first-letter': {
                  textTransform: 'uppercase',
                },
                [theme.mediaQuery.small]: {
                  ...theme.typography.HeadingXSmall,
                  fontWeight: 400,
                },
              })}
            >
              {description}
            </p>
          </div>
        </div>
        <div
          className={css({
            display: 'flex',
            flex: '1 1 100%',
            flexFlow: 'row wrap',
            [theme.mediaQuery.medium]: { flex: '0 1 40%' },
            [theme.mediaQuery.large]: { flex: '0 1 36%' },
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
              flex: '0 1 50%',
              paddingBottom: theme.sizing.scale600,
              [theme.mediaQuery.small]: {
                paddingTop: theme.sizing.scale600,
                flex: '0 1 33%',
                alignItems: 'flex-start',
              },
              [theme.mediaQuery.medium]: {
                flex: '0 1 50%',
                alignItems: 'flex-end',
                paddingBottom: '0',
              },
            })}
          >
            <WeatherStatCard
              label="Min"
              value={formatTemperature(tempUnit, weather.daily[0].temp.min)}
              iconColor={theme.colors.backgroundTertiary}
              icon={<ArrowDown24Filled color={theme.colors.contentSecondary} />}
            />
          </div>
          <div
            className={css({
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              flex: '0 1 50%',
              paddingBottom: theme.sizing.scale600,
              [theme.mediaQuery.small]: {
                paddingTop: theme.sizing.scale600,
                flex: '0 1 33%',
                alignItems: 'flex-start',
              },
              [theme.mediaQuery.medium]: {
                flex: '0 1 50%',
                alignItems: 'flex-end',
                paddingBottom: '0',
              },
            })}
          >
            <WeatherStatCard
              label="Max"
              iconColor={theme.colors.backgroundTertiary}
              value={formatTemperature(tempUnit, weather.daily[0].temp.max)}
              icon={<ArrowUp24Filled color={theme.colors.contentSecondary} />}
            />
          </div>
          <div
            className={css({
              display: 'none',
              flex: '0 1 auto',
              [theme.mediaQuery.small]: {
                display: 'flex',
              },
              [theme.mediaQuery.medium]: {
                flex: '0 1 100%',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
              },
            })}
          >
            <div className={feelsLikeText}>
              Feels like&nbsp;
              {formatTemperature(tempUnit, weather.current.feels_like)}
            </div>
          </div>
        </div>
      </div>
      <WeatherStats unit={tempUnit} weather={weather} />
    </>
  );
}

const WeatherTodayIcon: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        [theme.mediaQuery.medium]: {
          justifyContent: 'center',
        },
      })}
    >
      {children}
    </div>
  );
};
