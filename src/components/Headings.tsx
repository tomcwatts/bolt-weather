import * as React from 'react';
import { useStyletron } from 'baseui';

export function Heading2({
  children,
  marginBottom,
}: {
  children: React.ReactNode;
  marginBottom?: string;
}) {
  const [css, theme] = useStyletron();
  return (
    <h2
      className={css({
        ...theme.typography.HeadingSmall,
        color: theme.colors.contentPrimary,
        fontWeight: 600,
        marginBottom: marginBottom || undefined,
      })}
    >
      {children}
    </h2>
  );
}
