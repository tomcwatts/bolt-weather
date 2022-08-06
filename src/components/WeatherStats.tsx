import {
  ArrowCircleDownRight24Filled,
  ArrowTrending24Filled,
  Drop24Filled,
  WeatherDrizzle24Filled,
  WeatherSqualls24Filled,
  WeatherSunny24Filled,
  WeatherSunnyHigh24Filled,
  WeatherSunnyLow24Filled,
} from '@fluentui/react-icons';
import { useStyletron } from 'baseui';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { formatTimeWithSuffix, formatWindSpeed } from '../utils/formatters';
import { OpenWeatherResponse } from '../utils/types';
import { useColorSchemeStore } from '../stores/colorScheme';
import { WeatherStatCard } from './WeatherStatCard';
interface Props {
  unit: string;
  weather: OpenWeatherResponse;
}

export default function WeatherStats(props: Props) {
  const [css] = useStyletron();
  const colorScheme = useColorSchemeStore((state) => state.colorScheme);
  const isDark = colorScheme === 'dark';
  return (
    <>
      <FlexGrid
        flexGridColumnCount={[1, 3, 4, 4]}
        flexGridRowGap={['scale0', 'scale600']}
        flexGridColumnGap={['scale0', 'scale100', 'scale900']}
        marginBottom="scale900"
      >
        <FlexGridItem>
          <WeatherStatCard
            compact
            label="Chance of rain"
            value={`${Math.round(props.weather?.daily[0]?.pop * 100)}%`}
            icon={<WeatherDrizzle24Filled color="#83b4cf" />}
          />
        </FlexGridItem>
        <FlexGridItem>
          <WeatherStatCard
            compact
            label="Wind"
            value={formatWindSpeed(
              props.weather?.daily[0]?.wind_speed,
              props.unit === 'c'
            )}
            icon={
              <ArrowCircleDownRight24Filled
                color={isDark ? '#d2d2d2' : '#969eb0'}
                className={css({
                  // Rotate icon based on wind direction
                  transform: `rotate(${props.weather?.daily[0]?.wind_deg}deg)`,
                })}
              />
            }
          />
        </FlexGridItem>
        <FlexGridItem>
          <WeatherStatCard
            compact
            label="Sunrise"
            value={`${formatTimeWithSuffix(props.weather?.daily[0]?.sunrise)}`}
            icon={<WeatherSunnyHigh24Filled color="#ffc755" />}
          />
        </FlexGridItem>
        <FlexGridItem>
          <WeatherStatCard
            compact
            label="Sunset"
            value={`${formatTimeWithSuffix(props.weather?.daily[0]?.sunset)}`}
            icon={<WeatherSunnyLow24Filled color="#5a7ec6" />}
          />
        </FlexGridItem>

        <FlexGridItem>
          <WeatherStatCard
            compact
            label="UV Index"
            value={Math.round(props.weather?.daily[0]?.uvi * 10) / 10}
            icon={<WeatherSunny24Filled color="#fba087" />}
          />
        </FlexGridItem>
        <FlexGridItem>
          <WeatherStatCard
            compact
            label="Pressure"
            value={`${props.weather?.daily[0].pressure} hPa`}
            icon={<ArrowTrending24Filled color="#db8cea" />}
          />
        </FlexGridItem>
        <FlexGridItem>
          <WeatherStatCard
            compact
            label="Humidity"
            value={`${props.weather?.daily[0].humidity}%`}
            icon={<Drop24Filled color="#6bbbea" />}
          />
        </FlexGridItem>
        <FlexGridItem>
          <WeatherStatCard
            compact
            label="Gusts"
            value={formatWindSpeed(
              props.weather?.daily[0].wind_gust,
              props.unit === 'c'
            )}
            icon={<WeatherSqualls24Filled color="#78e07d" />}
          />
        </FlexGridItem>
      </FlexGrid>
    </>
  );
}
