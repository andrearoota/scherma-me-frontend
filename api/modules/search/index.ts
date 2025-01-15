'use client';

import useSWR from 'swr';
import { buildRequestConfig } from '../../utils/helper';
import { SearchResponse } from './interfaces';

export const basePath = 'search';

export function useSearch(q: string) {
  const trimmedQuery = q.trim();
  const config = buildRequestConfig({ q });

  const { data, error, isLoading } = useSWR<SearchResponse[]>(
    trimmedQuery.length >= 2 ? [basePath, config] : null
  );

  return {
    hints: data,
    isLoading,
    isError: !!error,
  };
}
