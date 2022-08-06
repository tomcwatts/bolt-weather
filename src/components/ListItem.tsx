import { useStyletron } from 'baseui';
import { Button, ButtonOverrides, KIND, SIZE } from 'baseui/button';
import * as React from 'react';

interface Props {
  children?: React.ReactNode;
  endEnhancer?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const DropdownListItem: React.FunctionComponent<Props> = (
  props: Props
) => {
  const [, theme] = useStyletron();

  const buttonOverrides: ButtonOverrides = {
    BaseButton: {
      style: {
        width: '100%',
        justifyContent: 'space-between',
        fontWeight: 500,
        color: theme.colors.contentPrimary,
        backgroundColor: theme.colors.backgroundPrimary,
        ':hover': {
          backgroundColor: theme.colors.backgroundTertiary,
        },
      },
    },
    StartEnhancer: { style: { alignSelf: 'flex-start' } },
  };

  const button = (
    <Button
      kind={KIND.tertiary}
      size={SIZE.compact}
      onClick={props.onClick}
      overrides={buttonOverrides}
      startEnhancer={props.icon ?? undefined}
      endEnhancer={props.endEnhancer}
    >
      {props.children}
    </Button>
  );

  return <li>{button}</li>;
};
