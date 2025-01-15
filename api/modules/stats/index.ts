'use client';

import useSWR from 'swr';
import { AthleteApi } from '../..';
import { AxiosClient } from '../../axios';
import { buildRequestConfig } from '../../utils/helper';
import { GeneralStatsResponse, StatsResponse } from './interfaces';

const basePath = 'stats';

export async function get(fisCode: string, params: object) {
  const config = buildRequestConfig(params);
  const { data } = await AxiosClient.get<StatsResponse>(
    `${AthleteApi.basePath}/${fisCode}/${basePath}`,
    config
  );
  return data;
}

export function useGeneralStats() {
    const { data, error, isLoading } = useSWR<GeneralStatsResponse>([`${basePath}/general`]);
  
    return {
      data,
      isLoading,
      isError: !!error,
    };
  }
  