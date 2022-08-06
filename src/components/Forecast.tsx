import { Grid24Regular, TableSimple24Regular } from '@fluentui/react-icons';
import { styled, useStyletron } from 'baseui';
import { Button, KIND, SHAPE, SIZE } from 'baseui/button';
import { Card } from 'baseui/card';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import * as React from 'react';
import Icon from '../components/Icon';
import {
  formatDate,
  formatDay,
  formatTemperature,
  formatTimeByHour,
} from '../utils/formatters';
import useWeather from '../utils/useWeather';
import ExtendedForecast from './ExtendedForecast';
import { Heading2 } from './Headings';
import WeatherInfoIcon from './WeatherInfoIcon';

export default function Forecast() {
  const { weather, tempUnit } = useWeather();
  const [css, theme] = useStyletron();
  const [tableView, setTableView] = React.useState(false);

  // Styles
  const TimeLabel = styled('p', () => ({
    ...theme.typography.LabelXSmall,
    color: theme.colors.contentSecondary,
    marginTop: 0,
    marginBottom: theme.sizing.scale200,
    fontWeight: 600,
    [theme.mediaQuery.medium]: {
      ...theme.typography.LabelSmall,
    },
  }));
  const dayContent = css({
    ...theme.typography.LabelMedium,
    flex: '1 1 40%',
    color: theme.colors.contentSecondary,
    marginTop: '0',
    marginBottom: '0',
    textAlign: 'left',
    textTransform: 'uppercase',
    fontWeight: 600,
    [theme.mediaQuery.small]: {
      flex: '1 0 100%',
    },
  });
  const StyledLabel = styled<'p', { $bold?: boolean; $small?: boolean }>(
    'p',
    ({ $bold, $small }) => ({
      ...($small ? theme.typography.LabelXSmall : theme.typography.LabelMedium),
      marginTop: 0,
      marginBottom: 0,
      fontWeight: $bold ? 700 : 400,
      [theme.mediaQuery.small]: {
        ...($small ? theme.typography.LabelSmall : theme.typography.LabelLarge),
      },
    })
  );
  const StyledLabelWeek = styled<'p', { $bold?: boolean; $small?: boolean }>(
    'p',
    ({ $bold, $small }) => ({
      ...($small ? theme.typography.LabelXSmall : theme.typography.LabelMedium),
      marginTop: 0,
      flex: '0 0 50%',
      textAlign: 'left',
      marginBottom: 0,
      fontWeight: $bold ? 700 : 400,
      color: theme.colors.contentSecondary,
      [theme.mediaQuery.small]: {
        ...($small
          ? theme.typography.LabelXSmall
          : theme.typography.HeadingSmall),
        fontWeight: $bold ? 800 : 400,
      },
      [theme.mediaQuery.medium]: {
        ...($small
          ? theme.typography.LabelSmall
          : theme.typography.HeadingMedium),
        fontWeight: $bold ? 800 : 400,
      },
    })
  );
  const minMax = css({
    ...theme.typography.LabelXSmall,
    width: '100%',
    display: 'flex',
  });

  const dayHeader = css({
    ...theme.typography.LabelMedium,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: '1 0 100%',
    color: theme.colors.contentSecondary,
    marginTop: theme.sizing.scale400,
    textAlign: 'left',
    textTransform: 'uppercase',
    fontWeight: 600,
  });

  const dayHeaderIcon = css({
    position: 'absolute',
    right: theme.sizing.scale200,
    top: theme.sizing.scale200,
  });

  const date = css({
    ...theme.typography.LabelXSmall,
    color: theme.colors.contentTertiary,
    marginBottom: theme.sizing.scale300,
    width: '100%',
    display: 'flex',
  });

  // Overrides
  const hourlyCardOverrides = {
    Root: {
      style: {
        backgroundColor: theme.colors.backgroundSecondary,
        marginLeft: '0',
        marginRight: '0',
        marginTop: '0',
        marginBottom: '0',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        [theme.mediaQuery.medium]: {
          display: 'block',
        },
      },
    },
    Contents: {
      style: () => ({
        marginLeft: '0',
        marginRight: '0',
        marginBottom: '0',
      }),
    },
  };
  const cardOverrides = {
    Root: {
      style: {
        backgroundColor: theme.colors.backgroundSecondary,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        textAlign: 'center',
        marginBottom: 0,
      },
    },
    Body: {
      style: {
        marginBottom: '0',
      },
    },
    Contents: {
      style: {
        marginTop: 0,
        marginBottom: theme.sizing.scale400,
        marginLeft: theme.sizing.scale400,
        marginRight: 0,
        [theme.mediaQuery.small]: {
          marginBottom: 0,
          marginLeft: 0,
        },
      },
    },
  };

  return (
    <section>
      <Heading2>Hourly</Heading2>
      <div className={css({ marginBottom: theme.sizing.scale600 })}>
        <FlexGrid
          flexGridColumnCount={[4, 8, 8, 8]}
          flexGridColumnGap={['scale200', 'scale200', 'scale500']}
          flexGridRowGap={['scale200', '0', '0']}
        >
          {weather?.hourly
            ?.map((forecast, index: number) => {
              const {
                dt,
                weather: [{ icon }],
                temp,
              } = forecast;
              return (
                <FlexGridItem key={`${dt}-${index}`}>
                  <Card overrides={hourlyCardOverrides}>
                    <div
                      className={css({
                        textAlign: 'center',
                        marginBottom: '0',
                      })}
                    >
                      <TimeLabel>{formatTimeByHour(dt)}</TimeLabel>
                      <Icon
                        icon={icon}
                        size={theme.mediaQuery.medium ? '68px' : '24px'}
                      />
                      <StyledLabel $bold>
                        {formatTemperature(tempUnit, temp)}
                      </StyledLabel>
                    </div>
                  </Card>
                </FlexGridItem>
              );
            })
            .slice(1, 9)}
        </FlexGrid>
      </div>

      <div
        className={css({
          display: 'flex',
        })}
      >
        <div
          className={css({
            flex: '1',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          })}
        >
          <Heading2>This week</Heading2>
          <Button
            shape={SHAPE.circle}
            kind={KIND.secondary}
            size={SIZE.compact}
            onClick={() => setTableView(!tableView)}
            overrides={{
              BaseButton: {
                style: {
                  flex: '0 0 36px',
                  marginLeft: theme.sizing.scale600,
                  transitionProperty: 'all',
                  backgroundColor: theme.colors.backgroundSecondary,
                  transitionDuration: theme.animation.timing200,
                  ':hover': {
                    boxShadow: `${theme.colors.accent} 0px 0px 0px 2px`,
                  },
                },
              },
            }}
          >
            {tableView ? (
              <Grid24Regular
                className={css({ pointerEvents: 'none' })}
                color={theme.colors.contentSecondary}
              />
            ) : (
              <TableSimple24Regular
                className={css({ pointerEvents: 'none' })}
                color={theme.colors.contentSecondary}
              />
            )}
          </Button>
        </div>
      </div>
      <div>
        {tableView ? (
          <ExtendedForecast unit={tempUnit} weather={weather} />
        ) : (
          <FlexGrid
            flexGridColumnCount={[2, 2, 3, 3]}
            flexGridRowGap={['scale200', 'scale200', 'scale500']}
            flexGridColumnGap={['scale200', 'scale200', 'scale500']}
            marginBottom="scale900"
          >
            {weather?.daily
              ?.map((forecast, index: number) => {
                const {
                  dt,
                  weather: [{ icon }],
                  temp: { min, max },
                } = forecast;
                return (
                  <FlexGridItem key={`${dt}-${index}`}>
                    <Card overrides={cardOverrides}>
                      <div className={css({ display: 'flex' })}>
                        <div
                          className={css({
                            flex: '0 1 40%',
                            display: 'none',
                            [theme.mediaQuery.small]: { display: 'block' },
                          })}
                        >
                          <Icon icon={icon} size={'120px'} />
                        </div>
                        <div
                          className={css({
                            position: 'relative',
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignContent: 'flex-start',
                            flex: '1 1 auto',
                          })}
                        >
                          <div
                            className={css({
                              flex: '0 1 auto',
                              display: 'inline-flex',
                              marginRight: theme.sizing.scale200,
                              [theme.mediaQuery.small]: { display: 'none' },
                            })}
                          >
                            <Icon icon={icon} size={'24px'} />
                          </div>
                          <div className={dayContent}>
                            <div className={dayHeader}>
                              {formatDay(dt)}{' '}
                              <span className={dayHeaderIcon}>
                                <WeatherInfoIcon
                                  weather={forecast}
                                  unit={tempUnit}
                                />
                              </span>
                            </div>
                            <span className={date}>{formatDate(dt)} </span>
                          </div>
                          <div
                            className={css({
                              display: 'flex',
                              flex: '1 1 100%',
                              marginLeft: theme.sizing.scale900,
                              [theme.mediaQuery.small]: {
                                marginLeft: '0',
                              },
                            })}
                          >
                            <StyledLabelWeek $bold>
                              {formatTemperature(tempUnit, min)}
                              <span className={minMax}>min</span>
                            </StyledLabelWeek>
                            <StyledLabelWeek $bold>
                              {formatTemperature(tempUnit, max)}
                              <span className={minMax}>max</span>
                            </StyledLabelWeek>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </FlexGridItem>
                );
              })
              .slice(1, 7)}
          </FlexGrid>
        )}
      </div>
    </section>
  );
}
