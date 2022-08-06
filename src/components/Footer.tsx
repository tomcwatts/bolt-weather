import { useStyletron } from 'baseui';

export default function Footer() {
  const [css, theme] = useStyletron();

  // Styles
  const footer = css({
    ...theme.typography.LabelSmall,
    paddingTop: theme.sizing.scale1000,
    color: theme.colors.contentSecondary,
    textAlign: 'center',
  });
  const link = css({
    textDecoration: 'none',
    backgroundImage: 'linear-gradient(32deg, #D7752F 0%, #FA7070 100%)',
    '-webkitTextFillColor': 'transparent',
    '-webkitTextStrokeColor': 'transparent',
    '-webkitBackgroundClip': 'text',
  });

  return (
    <footer className={footer}>
      Created by&nbsp;
      <a
        href="https://github.com/tomcwatts"
        rel="author"
        aria-label="Tom Watts"
        className={link}
      >
        Tom Watts &nbsp;
      </a>
      &#8226; &nbsp;Open source on &nbsp;
      <a
        href="https://github.com/tomcwatts/bolt-weather"
        rel="author"
        aria-label="Github"
        className={link}
      >
        Github
      </a>{' '}
    </footer>
  );
}
