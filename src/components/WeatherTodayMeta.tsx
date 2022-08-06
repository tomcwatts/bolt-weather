import { ArrowDown24Filled, ArrowUp24Filled } from '@fluentui/react-icons';
import { useStyletron } from 'baseui';
import { Cell } from 'baseui/layout-grid';
import { formatTemperature } from '../utils/formatters';
import { OpenWeatherResponse } from '../utils/types';
import { WeatherStatCard } from './WeatherStatCard';

export default function WeatherTodayMeta({
  unit,
  weather,
}: {
  unit: string;
  weather: OpenWeatherResponse;
}) {
  const [css, theme] = useStyletron();
  const currentWeather = weather.current;
  const { feels_like } = currentWeather;

  const feelsLikeText = css({
    fontSize: theme.sizing.scale600,
    lineHeight: 1,
    fontWeight: 500,
    marginTop: 0,
    marginBottom: 0,
    paddingRight: theme.sizing.scale600,
    display: 'none',
    alignSelf: 'center',
    backgroundImage: 'linear-gradient(32deg, #D7752F 0%, #FA7070 100%)',
    '-webkitTextFillColor': 'transparent',
    '-webkitTextStrokeColor': 'transparent',
    '-webkitBackgroundClip': 'text',
    [theme.mediaQuery.small]: {
      display: 'flex',
    },
    [theme.mediaQuery.medium]: {
      alignSelf: 'flex-end',
      // marginTop: theme.sizing.scale900,
    },
  });

  const metaContain = css({
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    [theme.mediaQuery.medium]: {
      flexFlow: 'column wrap',
      justifyContent: 'flex-start',
      paddingLeft: 0,
      paddingRight: 0,
      marginTop: theme.sizing.scale900,
    },
  });

  return (
    <>
      <Cell span={[4, 2, 2]}>
        <div className={metaContain}>
          <WeatherStatCard
            label="Min"
            value={formatTemperature(unit, weather.daily[0].temp.min)}
            iconColor={theme.colors.backgroundTertiary}
            icon={<ArrowDown24Filled color={theme.colors.contentSecondary} />}
          />
        </div>
      </Cell>
      <Cell span={[6, 2, 2]}>
        <div className={metaContain}>
          <WeatherStatCard
            label="Max"
            iconColor={theme.colors.backgroundTertiary}
            value={formatTemperature(unit, weather.daily[0].temp.max)}
            icon={<ArrowUp24Filled color={theme.colors.contentSecondary} />}
          />
          <p className={feelsLikeText}>
            Feels like&nbsp;
            {formatTemperature(unit, feels_like)}
          </p>
        </div>
      </Cell>
    </>
  );
}
