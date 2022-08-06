import { useStyletron } from 'baseui';
import { Spinner } from 'baseui/spinner';

export default function Loader(props: { isLoading: boolean }) {
  const [css, theme] = useStyletron();
  return props.isLoading ? (
    <div
      className={css({
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%',
        flex: '1 1 100%',
      })}
    >
      <Spinner
        $borderWidth={theme.sizing.scale100}
        $size={theme.sizing.scale1600}
      />
      <div
        className={css({
          ...theme.typography.HeadingXSmall,
          color: theme.colors.contentPrimary,
          paddingBlockStart: theme.sizing.scale650,
          paddingBlockEnd: theme.sizing.scale500,
        })}
      >
        Loading...
      </div>
    </div>
  ) : null;
}
