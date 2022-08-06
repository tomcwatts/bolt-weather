import {
  CellularData124Filled,
  ErrorCircle24Filled,
} from '@fluentui/react-icons';
import { useStyletron } from 'baseui';
import { DURATION, useSnackbar } from 'baseui/snackbar';
import * as React from 'react';
import Alerts from '../components/Alerts';
import Footer from '../components/Footer';
import Forecast from '../components/Forecast';
import Header from '../components/Header';
import Icon from '../components/Icon';
import WeatherToday from '../components/WeatherToday';
import useWeather from '../utils/useWeather';
import { useLocationStore } from '../stores/location';
import Loader from '../utils/loadingSheet';

const Index: React.FC = () => {
  const [css, theme] = useStyletron();
  const { isLoading, weather, isError } = useWeather();
  const useFakeData = useLocationStore((state) => state.useFakeData);
  const setUseFakeData = useLocationStore((state) => state.setUseFakeData);
  const { enqueue, dequeue } = useSnackbar();

  // Styles
  const row = {
    paddingLeft: theme.sizing.scale500,
    paddingRight: theme.sizing.scale500,
    width: '100%',
    maxWidth: '1024px',
    marginLeft: 'auto',
    marginRight: 'auto',
  };
  const headerRow = css({
    ...row,
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.sizing.scale900,
    paddingBottom: theme.sizing.scale100,
  });
  const mainRow = css({
    ...row,
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1 1 100%',
    paddingBottom: theme.sizing.scale900,
  });
  const main = css({
    flex: '1',
    width: '100%',
  });

  React.useEffect(() => {
    // Show a notification if there is an issue getting data
    if (!isLoading && isError && !useFakeData) {
      enqueue(
        {
          message: 'Something went wrong.',
          actionMessage: 'Use fake data?',
          startEnhancer: () => <ErrorCircle24Filled />,
          actionOnClick: () => {
            setUseFakeData(true);
          },
          focus: false,
        },
        DURATION.infinite
      );
    }
    // If user opts for fake data, show a persistent notification
    if (!isLoading && useFakeData) {
      enqueue(
        {
          message: 'Using fake data.',
          actionMessage: 'Refresh data',
          startEnhancer: () => <CellularData124Filled />,
          actionOnClick: () => {
            setUseFakeData(false);
          },
          focus: false,
        },
        DURATION.infinite
      );
    }
    // If we have data and we aren't showing fake data, dequeue all notifications
    if (weather && !isError && !isLoading && !useFakeData) {
      dequeue();
    }
  }, [useFakeData, isError, isLoading]);

  return (
    <>
      <div className={headerRow}>
        <Header />
      </div>
      <div className={mainRow}>
        <Loader isLoading={isLoading} />
        {!isLoading && weather && weather.current && (
          <main className={main}>
            <WeatherToday />
            <Forecast />
            <Alerts />
          </main>
        )}
        {isError && !useFakeData && (
          <div
            className={css({
              display: 'flex',
              flex: '1',
              alignItems: 'center',
              justifyContent: 'center',
              flexFlow: 'column nowrap',
              color: theme.colors.contentPrimary,
              ...theme.typography.HeadingXSmall,
              fontWeight: 300,
            })}
          >
            <Icon icon="02n" size={'230px'} />
            Something went wrong getting the weather...
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};

export default Index;
