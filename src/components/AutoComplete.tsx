import { DismissCircle20Filled, Search24Regular } from '@fluentui/react-icons';
import { useStyletron } from 'baseui';
import { Combobox } from 'baseui/combobox';
import { useState } from 'react';
import useDebounce from '../utils/useDebounce';
import usePlaces from '../utils/usePlaces';
import { useLocationStore } from '../stores/location';

type OptionT = { label: string; id: string };

export default function AutoComplete() {
  const [css, theme] = useStyletron();
  const currentLocation = useLocationStore((state) => state.currentLocation);
  const [value, setValue] = useState(currentLocation);
  const debouncedSearchTerm: string = useDebounce<string>(value, 500);
  const { locations, isLoading } = usePlaces(debouncedSearchTerm);
  const setCurrentLocation = useLocationStore(
    (state) => state.setCurrentLocation
  );
  const defaultOptions: OptionT[] = [
    { label: 'Canberra ACT, Australia', id: 'canberra' },
    { label: 'Sydney NSW, Australia', id: 'sydney' },
    { label: 'Brisbane QLD, Australia', id: 'brisbane' },
    { label: 'Melbourne VIC, Australia', id: 'melbourne' },
    { label: 'Perth WA, Australia', id: 'perth' },
    { label: 'Adelaide SA, Australia', id: 'adelaide' },
  ];
  const asyncOptions: OptionT[] = locations?.length
    ? locations.map((location, index) => ({
        label: location,
        id: `place-${index}`,
      }))
    : [];
  const options = value === '' && !isLoading ? defaultOptions : asyncOptions;

  function mapOptionToString(option: OptionT): string {
    return option.label;
  }
  async function handleChange(nextValue: string, selectedOption?: OptionT) {
    setValue(nextValue);
    if (selectedOption) {
      setCurrentLocation(selectedOption.label);
    }
  }

  // Styles
  const comboBoxOverrides = {
    Root: {
      style: () => ({
        width: '100%',
      }),
    },
    Input: {
      props: {
        placeholder: 'Search for a location',
        startEnhancer: () => <Search24Regular />,
        endEnhancer: () =>
          !value ? null : (
            <div
              className={css({ display: 'inline-flex', cursor: 'pointer' })}
              onClick={() => setValue('')}
            >
              <DismissCircle20Filled color={theme.colors.contentSecondary} />
            </div>
          ),
        overrides: {
          Root: {
            style: () => ({
              borderTopLeftRadius: '40px',
              borderTopRightRadius: '40px',
              borderBottomRightRadius: '40px',
              borderBottomLeftRadius: '40px',
            }),
          },
        },
      },
    },
  };

  return (
    <Combobox
      value={value}
      onChange={(event, value) => handleChange(event, value)}
      mapOptionToString={mapOptionToString}
      options={options}
      name="location-search"
      overrides={comboBoxOverrides}
    />
  );
}
