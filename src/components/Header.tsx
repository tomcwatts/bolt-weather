import { useStyletron } from 'baseui';
import Meta from '../components/Meta';
import AutoComplete from './AutoComplete';
import SettingsButton from './SettingsButton';

export default function Header() {
  const [css] = useStyletron();
  return (
    <div className={css({ minWidth: '100%', width: '100%' })}>
      <Meta />
      <header
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        })}
      >
        <AutoComplete />
        <SettingsButton />
      </header>
    </div>
  );
}
