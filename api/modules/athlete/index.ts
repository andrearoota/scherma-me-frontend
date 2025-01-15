import useSWR from 'swr';
import { buildRequestConfig } from '../../utils/helper';
import { AthleteAndStatsResponse, AthleteForSearchResponse } from './interfaces';

export const basePath = 'athletes';

export function useSearchAthletes(search: string) {
  const config = buildRequestConfig({ search });

  const { data, error, isLoading, mutate } = useSWR<AthleteForSearchResponse[]>([
    `${basePath}`,
    config,
  ]);

  return {
    athletes: data, // The fetched athletes data
    isLoading, // Loading state
    isError: !!error, // Error state
    mutate, // Function to manually update the cache
  };
}

export function useAthleteDetails(fisCode: string) {
  // Use SWR to fetch athlete details
  const { data, error, isLoading, mutate } = useSWR<AthleteAndStatsResponse>(
    fisCode ? `${basePath}/${fisCode}` : null // SWR key (null disables fetching if fisCode is not provided)
  );

  return {
    athlete: data, // The fetched athlete data
    isLoading, // Loading state
    isError: !!error, // Error state
    mutate, // Function to manually update the cache
  };
}
