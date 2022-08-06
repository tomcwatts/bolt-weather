import useSWR from 'swr';
import { mockWeatherResponse } from './mockData';
import { WeatherData } from './types';
import { useLocationStore } from '../stores/location';

export default function useWeather(): WeatherData {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const location = useLocationStore((state) => state.currentLocation);
  const tempUnit = useLocationStore((state) => state.tempUnit);
  const useFakeData = useLocationStore((state) => state.useFakeData);

  // Use SWR to fetch data via the Next API route (src/pages/api/weather.ts)
  const { data, error } = useSWR(`/api/weather?location=${location}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // If data comes back with a message, it's an error.
  const err = !!(data && data.message) || !!error;

  return {
    weather: useFakeData ? mockWeatherResponse : data,
    isLoading: !error && !data,
    isError: err,
    tempUnit,
  };
}
