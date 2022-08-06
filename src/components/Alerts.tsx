// import { ExclamationTriangleIcon } from '@modulz/radix-icons';
import { Warning24Filled } from '@fluentui/react-icons';
import { useStyletron } from 'baseui';
import { Banner, KIND } from 'baseui/banner';
// import { useSnackbar } from 'baseui/snackbar';
import { toaster, ToasterContainer } from 'baseui/toast';
import { useEffect, useMemo } from 'react';
import useWeather from '../utils/useWeather';
import { useLocationStore } from '../stores/location';
import { Heading2 } from './Headings';

export default function Alerts() {
  const [css, theme] = useStyletron();
  const useFakeData = useLocationStore((state) => state.useFakeData);
  const {
    weather: { alerts },
  } = useWeather();

  // Memoise the alerts array to prevent re-renders
  const alertsMemoise = useMemo(() => alerts, [alerts]);

  useEffect(() => {
    // Only show alert toast if not using fake data
    alertsMemoise?.length &&
      !useFakeData &&
      toaster.negative('Warnings issued in this area. See alerts below.', {
        overrides: { InnerContainer: { style: { width: '100%' } } },
      });
  }, []);

  if (!alerts) {
    return null;
  }

  return (
    <section>
      <Heading2>Alerts</Heading2>
      <ToasterContainer
        autoHideDuration={4000}
        placement="bottom"
        overrides={{
          ToastBody: {
            style: ({ $theme }) => ({
              width: '100%',
              maxWidth: '440px',
              marginLeft: $theme.sizing.scale300,
              marginRight: $theme.sizing.scale300,
            }),
          },
        }}
      />
      {alerts?.map((alert, index: number) => (
        <div key={index} className={css({ width: '100%' })}>
          <Banner
            kind={KIND.negative}
            title={alert?.event}
            artwork={{
              icon: () => <Warning24Filled color={theme.colors.negative} />,
            }}
            overrides={{
              Root: {
                style: () => ({
                  marginLeft: '0px',
                  marginRight: '0px',
                }),
              },
            }}
          >
            {alert?.description}
          </Banner>
        </div>
      ))}
    </section>
  );
}
