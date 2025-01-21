import useSWR from 'swr';
import { AthleteApi } from '../..';
import { AxiosClient } from '../../axios';
import { buildRequestConfig } from '../../utils/helper';
import { HistoryRankingsResponse, ListRankingsResponse, RankingResponse } from './interfaces';

const basePath = 'rankings';

export function useRanking(category: string, weapon: string, gender: string, id = 'latest') {
  const { data, error, isLoading } = useSWR<RankingResponse>([
    `${basePath}/${category}/${weapon}/${gender}/${id}`,
  ]);

  return {
    data,
    isLoading,
    isError: !!error,
  };
}

export function useListRankings(category: string, weapon: string, gender: string) {
  const { data, error, isLoading } = useSWR<ListRankingsResponse[]>([
    `${basePath}/${category}/${weapon}/${gender}`,
  ]);

  return {
    data,
    isLoading,
    isError: !!error,
  };
}

export async function rows(fisCode: string, params: object) {
  const config = buildRequestConfig(params);
  const { data } = await AxiosClient.get<HistoryRankingsResponse[]>(
    `${AthleteApi.basePath}/${fisCode}/${basePath}`,
    config
  );
  return data;
}
