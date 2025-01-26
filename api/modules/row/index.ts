import useSWR from 'swr';
import { RowResponse } from './interfaces';

const basePath = 'rows';

export function useRow(id: number) {
  const { data, error, isLoading } = useSWR<RowResponse>([`${basePath}/${id}`]);

  return {
    data,
    isLoading,
    isError: !!error,
  };
}
