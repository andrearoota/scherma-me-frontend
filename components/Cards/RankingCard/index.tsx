import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { Divider, Paper, Stack } from '@mantine/core';
import { RankingApi } from '@/api';
import { RankingResponse } from '@/api/modules/ranking/interfaces';
import { Gender } from '@/assets/enum/genderEnum';
import { Weapon } from '@/assets/enum/weaponEnum';
import Podium from '@/components/Podium';
import Table from './Table';

interface PodiumExtendedCardProps {
  filter: { gender: Gender; weapon: Weapon; category: string };
  filteredData: RankingResponse | undefined;
  setOriginalRankingData: Dispatch<SetStateAction<RankingResponse[]>>;
}

export default function RankingCard({
  filter,
  setOriginalRankingData,
  filteredData,
}: PodiumExtendedCardProps): JSX.Element {
  const { data, isError, isLoading } = RankingApi.useRanking(
    filter.category,
    filter.weapon,
    filter.gender
  );

  useEffect(() => {
    if (!data || isError || isLoading) {
      return;
    }

    setOriginalRankingData((prev) =>
      prev.some((item) => item.id === data.id) ? prev : [...prev, data]
    );
  }, [data, isError, isLoading, filteredData, setOriginalRankingData]);

  const podium = useMemo(() => {
    return (
      filteredData?.rows
        .sort((a, b) => a.position - b.position)
        .slice(0, 3)
        .map((row) => row.athlete.fullName) ?? []
    );
  }, [filteredData]);

  return (
    <Paper radius="xl" p="md">
      <Stack gap={0}>
        <Podium rank={podium} />
        <Divider mt="sm" />
        <Table data={filteredData} isError={isError} isLoading={isLoading} />
      </Stack>
    </Paper>
  );
}
