'use client';

import { AxiosRequestConfig } from 'axios';
import { SWRConfig } from 'swr';
import { AxiosClient } from '@/api/axios';

export default function SWRProvider({ children }: { children: any }) {
  return (
    <SWRConfig
      value={{
        fetcher: ([url, config]: [string, AxiosRequestConfig]) =>
          AxiosClient.get(url, config).then((res) => res.data),
        dedupingInterval: 10000, // Avoid re-fetching data within 10 seconds
        revalidateOnFocus: false, // Disable re-fetching data when the window regains focus
      }}
    >
      {children}
    </SWRConfig>
  );
}
