import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Group, Select } from '@mantine/core';
import { RankingApi } from '@/api';
import { ListRankingsResponse } from '@/api/modules/ranking/interfaces';

// ----------------------------------------------------------------------

export interface SelectRankingProps {
  rankingFilter: {
    category: string;
    weapon: string;
    gender: string;
    ranking: ListRankingsResponse;
  };
  setRankingFilter: Dispatch<
    SetStateAction<{
      category: string;
      weapon: string;
      gender: string;
      ranking: ListRankingsResponse;
    }>
  >;
}

export type ListRankings = Record<string, ListRankingsResponse[]>;

// ----------------------------------------------------------------------

export default function SelectRanking({
  rankingFilter,
  setRankingFilter,
}: SelectRankingProps): JSX.Element {
  const router = useRouter();

  // Fetch rankings data
  const { data: listRankings = [] } = RankingApi.useListRankings(
    rankingFilter.category,
    rankingFilter.weapon,
    rankingFilter.gender
  );

  // Group rankings by season
  const listRankingsBySeason: ListRankings = useMemo(() => {
    const grouped = Array.isArray(listRankings)
      ? Object.groupBy(listRankings, ({ season }) => season.toString())
      : {};
    return Object.keys(grouped).reduce((acc, key) => {
      acc[key] = grouped[key] || [];
      return acc;
    }, {} as ListRankings);
  }, [listRankings]);

  // Automatically select the latest ranking if not already selected
  useEffect(() => {
    if (
      rankingFilter.ranking.season === 0 &&
      Array.isArray(listRankings) &&
      listRankings.length > 0
    ) {
      const lastRanking = listRankings.reduce((prev, current) =>
        prev.date > current.date ? prev : current
      );
      setRankingFilter((prev) => ({
        ...prev,
        ranking: { id: lastRanking.id, date: lastRanking.date, season: lastRanking.season },
      }));
    }
  }, [listRankings, rankingFilter.ranking.season, setRankingFilter]);

  // Generate options for the season dropdown
  const seasonOptions = useMemo(() => {
    return Object.keys(listRankingsBySeason).map((season) => ({
      value: season,
      label: `${season}/${parseInt(season.substring(2, 4), 10) + 1}`,
    }));
  }, [listRankingsBySeason]);

  // Generate options for the version dropdown
  const versionOptions = useMemo(() => {
    const rankingsForSeason = listRankingsBySeason[rankingFilter.ranking.season] || [];
    return rankingsForSeason
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
      .map((item) => ({
        value: item.id.toString(),
        label: new Date(item.date).toLocaleDateString('en-GB'),
      }));
  }, [listRankingsBySeason, rankingFilter.ranking.season]);

  const handleSeasonChange = (value: string | null) => {
    if (!value) {
      return;
    }
    const season = parseInt(value, 10);
    const rankingsForSeason = listRankingsBySeason[season] || [];
    const lastRanking = rankingsForSeason.reduce((prev, current) =>
      prev.date > current.date ? prev : current
    );
    setRankingFilter((prev) => ({
      ...prev,
      ranking: lastRanking,
    }));
  };

  const handleVersionChange = (value: string | null) => {
    if (!value) {
      return;
    }
    const rankingId = parseInt(value, 10);
    setRankingFilter((prev) => ({
      ...prev,
      ranking: { ...prev.ranking, id: rankingId },
    }));
    router.push(`..\\${rankingId}`);
  };

  return (
    <Group gap="md" align="flex-start" grow>
      {/* Season Select */}
      <Select
        label="Stagione"
        placeholder="Seleziona stagione"
        value={rankingFilter.ranking.season === 0 ? null : rankingFilter.ranking.season.toString()}
        onChange={handleSeasonChange}
        data={seasonOptions}
      />

      {/* Version Select */}
      <Select
        label="Versione"
        placeholder="Seleziona versione"
        value={rankingFilter.ranking.date === '' ? null : rankingFilter.ranking.id.toString()}
        onChange={handleVersionChange}
        data={versionOptions}
      />
    </Group>
  );
}
