import { useStyletron } from 'baseui';
import React from 'react';

interface Props {
  label: string;
  value?: number | string;
  icon?: React.ReactNode;
  iconColor?: string;
  compact?: boolean;
}

export function WeatherStatCard(props: Props) {
  const [css, theme] = useStyletron();

  // Styles
  const statCard = css({
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    boxSizing: 'border-box',
    position: 'relative',
    borderRadius: theme.borders.radius300,
    paddingTop: theme.sizing.scale300,
    paddingBottom: theme.sizing.scale300,
    textAlign: 'left',
    [theme.mediaQuery.medium]: {
      flex: 'initial',
      paddingTop: theme.sizing.scale600,
      paddingBottom: theme.sizing.scale600,
    },
  });
  const statIcon = css({
    display: 'flex',
    alignItems: 'center',
    borderRadius: '40px',
    backgroundColor: props.iconColor,
    [theme.mediaQuery.medium]: {
      padding: theme.sizing.scale500,
    },
  });
  const statContents = css({
    display: 'flex',
    flex: '1',
    maxWidth: '100%',
    minWidth: '100px',
    flexFlow: 'column nowrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: theme.sizing.scale400,
  });

  return (
    <div className={statCard}>
      {props.icon && <div className={statIcon}>{props.icon}</div>}
      <div className={statContents}>
        <StatTitle compact={props.compact}>{props.label}</StatTitle>
        <StatValue compact={props.compact}>
          {(props.value ? props.value : 0).toLocaleString()}
        </StatValue>
      </div>
    </div>
  );
}

const StatTitle: React.FunctionComponent<{
  compact?: boolean;
  children: React.ReactNode;
}> = ({ compact, children }) => {
  const [css, theme] = useStyletron();
  const statTitle = css({
    ...(compact ? theme.typography.LabelSmall : theme.typography.LabelMedium),
    color: theme.colors.contentTertiary,
    marginTop: 0,
    marginBottom: compact ? theme.sizing.scale200 : theme.sizing.scale300,
    whiteSpace: 'nowrap',
    maxWidth: 'calc(100% - 10px)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 500,
  });
  return <h4 className={statTitle}>{children}</h4>;
};

const StatValue: React.FunctionComponent<{
  compact?: boolean;
  children: React.ReactNode;
}> = ({ compact, children }) => {
  const [css, theme] = useStyletron();
  const statValue = css({
    ...(compact
      ? theme.typography.HeadingSmall
      : theme.typography.HeadingMedium),
    color: theme.colors.contentPrimary,
    fontSize: compact ? theme.sizing.scale500 : theme.sizing.scale650,
    fontWeight: 700,
    lineHeight: 1,
    marginTop: 0,
    marginBottom: 0,
    [theme.mediaQuery.medium]: {
      fontSize: compact ? theme.sizing.scale700 : theme.sizing.scale1000,
    },
  });
  return <h3 className={statValue}>{children}</h3>;
};
