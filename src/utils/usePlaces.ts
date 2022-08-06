import useSWR from 'swr';
import { PlacesData } from './types';

export default function usePlaces(location: string): PlacesData {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  // Use SWR to fetch data via the Next API route (src/pages/api/places.ts)
  const { data, error } = useSWR(`/api/places?location=${location}`, fetcher);

  return {
    locations: data,
    isLoading: !error && !data,
    isError: error,
  };
}
