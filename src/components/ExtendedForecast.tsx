import { useStyletron } from 'baseui';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import Icon from '../components/Icon';
import { formatDay, formatTemperature } from '../utils/formatters';
import { OpenWeatherResponse } from '../utils/types';

type WeatherRow = {
  index: number;
  dt: number;
  min: number;
  max: number;
  main: string;
  icon: string;
  pop: number;
  humidity: number;
  pressure: number;
};

export default function ExtendedForecast({
  unit,
  weather,
}: {
  unit: string;
  weather: OpenWeatherResponse;
}) {
  const [css, theme] = useStyletron();

  const tableData: WeatherRow[] = weather?.daily?.map(
    (forecast, index: number) => {
      const {
        dt,
        pop,
        humidity,
        pressure,
        weather: [{ icon, main }],
        temp: { min, max },
      } = forecast;
      return {
        index,
        dt,
        min,
        max,
        main,
        icon,
        pop,
        humidity,
        pressure,
      };
    }
  );
  return (
    <>
      <TableBuilder data={tableData}>
        <TableBuilderColumn header="Day">
          {(row: WeatherRow) => (
            <div className={css({ display: 'flex', alignItems: 'center' })}>
              <Icon icon={row.icon} size={'30px'} />
              <span className={css({ marginLeft: theme.sizing.scale400 })}>
                {formatDay(row.dt)}
              </span>
            </div>
          )}
        </TableBuilderColumn>
        <TableBuilderColumn header="Chance of rain" numeric>
          {(row: WeatherRow) => <span>{`${Math.round(row.pop * 100)}%`}</span>}
        </TableBuilderColumn>
        <TableBuilderColumn header="Humidity" numeric>
          {(row: WeatherRow) => <span>{`${row.humidity}%`}</span>}
        </TableBuilderColumn>
        <TableBuilderColumn header="Pressure" numeric>
          {(row: WeatherRow) => (
            <span>{`${Math.round(row.pressure)} hPa`}</span>
          )}
        </TableBuilderColumn>
        <TableBuilderColumn header="Min" numeric>
          {(row: WeatherRow) => formatTemperature(unit, row.min)}
        </TableBuilderColumn>
        <TableBuilderColumn header="Max" numeric>
          {(row: WeatherRow) => formatTemperature(unit, row.max)}
        </TableBuilderColumn>
      </TableBuilder>
    </>
  );
}
