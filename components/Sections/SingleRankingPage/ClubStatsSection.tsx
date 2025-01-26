import { use, useMemo } from 'react';
import { Grid } from '@mantine/core';
import { Gender } from '@/assets/enum/genderEnum';
import { Weapon } from '@/assets/enum/weaponEnum';
import PodiumStatsCard from '@/components/Cards/PodiumStatsCard';
import { formatNumber } from '@/utils';

export interface ClubStats {
  name: string;
  athletes: number;
  points: number;
  weaponByAthletes: Record<Weapon, number>;
  weaponByPoints: Record<Weapon, number>;
  genderByAthletes: Record<Gender, number>;
  genderByPoints: Record<Gender, number>;
}

interface ClubStatsProps {
  data: ClubStats[];
  disableSpecificColumns?: boolean;
}

export default function ClubStatsSection({ data, disableSpecificColumns }: ClubStatsProps) {
  const { sortedByPoints, sortedByAthletes, sortedByRatio } = useMemo(() => {
    const includeGenderColumns = !(disableSpecificColumns ?? false);

    const sortedByPoints = data
      .sort((a, b) => b.points - a.points)
      .map((e, i) => ({
        position: i + 1,
        club: e.name,
        points: formatNumber(e.points),
        ...(includeGenderColumns && {
          femminile: formatNumber(e.genderByPoints.femminile),
          maschile: formatNumber(e.genderByPoints.maschile),
        }),
      }));

    const sortedByAthletes = data
      .sort((a, b) => b.athletes - a.athletes)
      .map((e, i) => ({
        position: i + 1,
        club: e.name,
        athletes: e.athletes,
        ...(includeGenderColumns && {
          femminile: e.genderByAthletes.femminile,
          maschile: e.genderByAthletes.maschile,
        }),
      }));

    const sortedByRatio = data
      .map((e, i) => ({
        position: i + 1,
        club: e.name,
        ratio: e.athletes === 0 ? 0 : e.points / e.athletes,
        ...(includeGenderColumns && {
          femminile: formatNumber(
            e.genderByAthletes.femminile === 0 ? 0 : e.points / e.genderByAthletes.femminile
          ),
          maschile: formatNumber(
            e.genderByAthletes.maschile === 0 ? 0 : e.points / e.genderByAthletes.maschile
          ),
        }),
      }))
      .sort((a, b) => b.ratio - a.ratio)
      .map((e) => ({
        ...e,
        ratio: formatNumber(e.ratio),
      }));

    return { sortedByPoints, sortedByAthletes, sortedByRatio };
  }, [data, disableSpecificColumns]);

  const headers = useMemo(() => {
    // Define base headers for each category
    const baseHeaders: Record<
      'clubByPoints' | 'clubByAthletes' | 'clubByRatio',
      Record<string, string>
    > = {
      clubByPoints: {
        position: '#',
        club: 'Club',
        points: 'Punti',
      },
      clubByAthletes: {
        position: '#',
        club: 'Club',
        athletes: 'Atleti',
      },
      clubByRatio: {
        position: '#',
        club: 'Club',
        ratio: 'Rapporto',
      },
    };

    if (disableSpecificColumns) {
      return baseHeaders;
    }

    return Object.fromEntries(
      Object.entries(baseHeaders).map(([key, value]) => [
        key,
        { ...value, femminile: 'Femminile', maschile: 'Maschile' },
      ])
    );
  }, [disableSpecificColumns]);

  return (
    <Grid>
      <Grid.Col span={{ base: 12, sm: 'content' }}>
        <PodiumStatsCard
          title="Club per punti"
          rank={sortedByPoints.slice(0, 3).map((e) => e.club)}
          tableData={sortedByPoints}
          headers={headers.clubByPoints}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 'content' }}>
        <PodiumStatsCard
          title="Club per numero di atleti"
          rank={sortedByAthletes.slice(0, 3).map((e) => e.club)}
          tableData={sortedByAthletes}
          headers={headers.clubByAthletes}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 'content' }}>
        <PodiumStatsCard
          title="Club per rapporto punti/atleti"
          rank={sortedByRatio.slice(0, 3).map((e) => e.club)}
          tableData={sortedByRatio}
          headers={headers.clubByRatio}
        />
      </Grid.Col>
    </Grid>
  );
}
