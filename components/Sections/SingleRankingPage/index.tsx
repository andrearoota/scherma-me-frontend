'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Container, Grid, Stack, Title, useMantineColorScheme } from '@mantine/core';
import { Athlete, RankingResponse } from '@/api/modules/ranking/interfaces';
import { Gender } from '@/assets/enum/genderEnum';
import { Weapon } from '@/assets/enum/weaponEnum';
import { Province } from '@/assets/itProvReg';
import ClubStatsCard from '@/components/Cards/ClubStatsCard';
import FiltersCard from '@/components/Cards/FiltersCard';
import GenderStatsCard from '@/components/Cards/GenderStatsCard';
import PodiumExtendedCard from '@/components/Cards/RankingCard';
import ShortStatsCard from '@/components/Cards/ShortStatsCard';
import TitlePageCard from '@/components/Cards/TitlePageCard';
import CardWeaponStats from '@/components/Cards/WeaponStatsCard';
import CategoryTooltip from '@/components/Tooltips/CategoryTooltip';
import unique from '@/utils';
import ClubStatsSection, { ClubStats } from './ClubStatsSection';

export interface ChartsData extends Athlete {
  gender: Gender;
  weapon: Weapon;
  club: string;
  points: number;
}

const filterAthletesByProvince = (
  originalRankingData: RankingResponse[],
  provinceFilter: Province[]
): ChartsData[] => {
  const provinceCodes = new Set(provinceFilter.map((prov) => prov.sigla_prov));

  return originalRankingData.flatMap(({ gender, weapon, rows }) =>
    rows
      .filter(({ club }) => !provinceFilter.length || provinceCodes.has(club.codeLetter))
      .map(({ athlete, club, totalPoints }) => ({
        ...athlete,
        gender: gender.name.trim().toLowerCase() as Gender,
        weapon: weapon.name.trim().toLowerCase() as Weapon,
        club: club.codeLetter,
        points: totalPoints,
      }))
  );
};

const calculateClubStats = (athletes: ChartsData[]): Record<string, ClubStats> => {
  return athletes.reduce((acc: Record<string, ClubStats>, athlete) => {
    const { club, gender, weapon, points } = athlete;
    if (!acc[club]) {
      acc[club] = {
        name: club,
        athletes: 0,
        points: 0,
        weaponByAthletes: { fioretto: 0, sciabola: 0, spada: 0 },
        weaponByPoints: { fioretto: 0, sciabola: 0, spada: 0 },
        genderByAthletes: { femminile: 0, maschile: 0 },
        genderByPoints: { femminile: 0, maschile: 0 },
      };
    }
    acc[club].athletes++;
    acc[club].points += points;
    acc[club].weaponByAthletes[weapon]++;
    acc[club].weaponByPoints[weapon] += points;
    acc[club].genderByAthletes[gender]++;
    acc[club].genderByPoints[gender] += points;
    return acc;
  }, {});
};

export default function RankingPage() {
  const { category, weapon, gender, id } = useParams<{
    category: string;
    weapon: string;
    gender: string;
    id: string;
  }>();

  const isDark = useMantineColorScheme().colorScheme === 'dark';

  const [originalRankingData, setOriginalRankingData] = useState<RankingResponse[]>([]);
  const [provinceFilter, setProvinceFilter] = useState<Province[]>([]);

  // Memoized filtered ranking data
  const filteredRankingData = useMemo(() => {
    if (provinceFilter.length === 0) {
      return originalRankingData;
    }
    return originalRankingData.map((ranking) => ({
      ...ranking,
      rows: ranking.rows.filter((row) =>
        provinceFilter.some((province) => row.club.codeLetter.startsWith(province.sigla_prov))
      ),
    }));
  }, [originalRankingData, provinceFilter]);

  // Derived stats
  const { athletes, uniqueAthletes, clubs } = useMemo(() => {
    const athletes = filterAthletesByProvince(filteredRankingData, provinceFilter);
    const uniqueAthletes = unique(athletes, 'fisCode');
    const clubs = Object.entries(calculateClubStats(uniqueAthletes)).map(([name, stats]) => ({
      ...stats,
      name,
    }));
    return { athletes, uniqueAthletes, clubs };
  }, [filteredRankingData, provinceFilter]);

  const [rankingFilter, setRankingFilter] = useState({
    category,
    weapon,
    gender,
    ranking: { id: parseInt(id ?? '', 10), date: '', season: 0 },
  });

  return (
    <Box bg={isDark ? 'dark.9' : 'scherma-me-primary.1'} py="md">
      <Container>
        <Stack gap="md" align="stretch">
          <TitlePageCard
            title={`Ranking ${originalRankingData[0]?.category.name.toLowerCase() ?? ''}`}
            subtitles={[
              {
                title: 'Arma',
                value: originalRankingData[0]?.weapon.name,
              },
              {
                title: 'Genere',
                value: originalRankingData[0]?.gender.name,
              },
            ]}
            tooltip={<CategoryTooltip category={originalRankingData[0]?.category} />}
          />
          <FiltersCard
            SelectRankingProps={{
              rankingFilter,
              setRankingFilter,
            }}
            SelectProvinceProps={{
              provinceFilter,
              setProvinceFilter,
            }}
          />
        </Stack>
      </Container>
      <Container fluid>
        <Title order={2} mt="md" mb="sm">
          Classifica
        </Title>
        <Grid>
          <Grid.Col span={{ base: 12, sm: 'content' }}>
            <PodiumExtendedCard
              filter={{
                weapon,
                gender,
                category: rankingFilter.category,
              }}
              setOriginalRankingData={setOriginalRankingData}
              filteredData={filteredRankingData[0]}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 'content' }}>
            <ShortStatsCard rows={filteredRankingData[0]?.rows} />
          </Grid.Col>
        </Grid>
        {/* Stats section */}
        <Title order={4} my="md" title="Statistiche" />
        <Grid>
          <Grid.Col span={{ base: 12, sm: 'content' }}>
            <GenderStatsCard
              chartData={uniqueAthletes}
              tableData={clubs.map((e) => ({ club: e.name, ...e.genderByAthletes }))}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 'content' }}>
            <CardWeaponStats
              chartData={athletes}
              tableData={clubs.map((e) => ({ club: e.name, ...e.weaponByAthletes }))}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 'content' }}>
            <ClubStatsCard chartData={athletes} />
          </Grid.Col>
        </Grid>

        <Title order={4} my="md" title="Classifiche club" />
        <ClubStatsSection data={clubs} disableSpecificColumns />
      </Container>
    </Box>
  );
}
