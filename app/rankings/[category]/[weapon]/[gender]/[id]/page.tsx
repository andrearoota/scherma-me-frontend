'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Container, Grid, Stack, Title, useMantineColorScheme } from '@mantine/core';
import { Athlete, RankingResponse } from '@/api/modules/ranking/interfaces';
import { Gender } from '@/assets/enum/genderEnum';
import { Weapon } from '@/assets/enum/weaponEnum';
import { Province } from '@/assets/itProvReg';
import ClubStatsCard from '@/components/Cards/ClubStatsCard';
import FiltersCard from '@/components/Cards/FiltersCard';
import GenderStatsCard from '@/components/Cards/GenderStatsCard';
import PodiumStatsCard from '@/components/Cards/PodiumStatsCard';
import PodiumExtendedCard from '@/components/Cards/RankingCard';
import ShortStatsCard from '@/components/Cards/ShortStatsCard';
import TitlePageCard from '@/components/Cards/TitlePageCard';
import CardWeaponStats from '@/components/Cards/WeaponStatsCard';
import CategoryTooltip from '@/components/Tooltips/CategoryTooltip';
import unique, { formatNumber } from '@/utils';

export interface ChartsData extends Athlete {
  gender: Gender;
  weapon: Weapon;
  club: string;
  points: number;
}

interface ClubStats {
  athletes: number;
  points: number;
  weaponByAthletes: { fioretto: number; sciabola: number; spada: number };
  weaponByPoints: { fioretto: number; sciabola: number; spada: number };
  genderByAthletes: { femminile: number; maschile: number };
  genderByPoints: { femminile: number; maschile: number };
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
  const [filteredRankingData, setFilteredRankingData] = useState<RankingResponse[]>([]);
  const [provinceFilter, setProvinceFilter] = useState<Province[]>([]);
  const [rankingFilter, setRankingFilter] = useState({
    category,
    weapon,
    gender,
    ranking: { id: parseInt(id ?? '', 10), date: '', season: 0 },
  });

  useEffect(() => {
    if (originalRankingData.length === 0) {
      return;
    }

    if (provinceFilter.length === 0) {
      setFilteredRankingData(originalRankingData);
      return;
    }

    const filteredRows = originalRankingData.map((ranking) => ({
      ...ranking,
      rows: ranking.rows.filter((row) =>
        provinceFilter.some((province) => row.club.codeLetter.startsWith(province.sigla_prov))
      ),
    }));

    setFilteredRankingData(filteredRows);
  }, [originalRankingData, provinceFilter]);

  const { athletes, uniqueAthletes, clubs } = useMemo(() => {
    const athletes = filterAthletesByProvince(filteredRankingData, provinceFilter);
    const uniqueAthletes = unique(athletes, 'fisCode');
    const clubs = Object.entries(calculateClubStats(uniqueAthletes)).map(([name, stats]) => ({
      name,
      ...stats,
    }));
    return { athletes, uniqueAthletes, clubs };
  }, [filteredRankingData, provinceFilter]);

  return (
    <Box bg={isDark ? 'dark.9' : 'scherma-me-primary.1'} py="md">
      <Container>
        <Stack gap="md" align="stretch">
          <TitlePageCard
            title={`Ranking ${originalRankingData[0]?.category.name.toLowerCase()}`}
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
                weapon: rankingFilter.weapon,
                gender: rankingFilter.gender,
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

        <Grid>
          <Grid.Col span={{ base: 12, sm: 'content' }}>
            <PodiumStatsCard
              title="Club per punti"
              rank={clubs
                .sort((a, b) => b.points - a.points)
                .map((e) => e.name)
                .slice(0, 3)}
              tableData={clubs
                .sort((a, b) => b.points - a.points)
                .map((e, i) => ({
                  position: i + 1,
                  club: e.name,
                  points: formatNumber(e.points),
                  femminile: formatNumber(e.genderByPoints.femminile),
                  maschile: formatNumber(e.genderByPoints.maschile),
                }))}
              headers={{
                position: '#',
                club: 'Club',
                points: 'Punti',
                femminile: 'Femminile',
                maschile: 'Maschile',
              }}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 'content' }}>
            <PodiumStatsCard
              title="Club per numero di atleti"
              rank={clubs
                .sort((a, b) => b.athletes - a.athletes)
                .map((e) => e.name)
                .slice(0, 3)}
              tableData={clubs
                .sort((a, b) => b.athletes - a.athletes)
                .map((e, i) => ({
                  position: i + 1,
                  club: e.name,
                  athletes: e.athletes,
                  femminile: e.genderByAthletes.femminile,
                  maschile: e.genderByAthletes.maschile,
                }))}
              headers={{
                position: '#',
                club: 'Club',
                athletes: 'Atleti',
                femminile: 'Femminile',
                maschile: 'Maschile',
              }}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 'content' }}>
            <PodiumStatsCard
              title="Club per rapporto punti/atleti"
              rank={clubs
                .map((e, i) => ({
                  position: i + 1,
                  club: e.name,
                  ratio: e.athletes === 0 ? 0 : e.points / e.athletes,
                }))
                .sort((a, b) => b.ratio - a.ratio)
                .map((e) => e.club)
                .slice(0, 3)}
              tableData={clubs
                .map((e, i) => ({
                  position: i + 1,
                  club: e.name,
                  ratio: e.athletes === 0 ? 0 : e.points / e.athletes,
                  femminile: formatNumber(
                    e.genderByAthletes.femminile === 0 ? 0 : e.points / e.genderByAthletes.femminile
                  ),
                  maschile: formatNumber(
                    e.genderByAthletes.maschile === 0 ? 0 : e.points / e.genderByAthletes.maschile
                  ),
                }))
                .sort((a, b) => b.ratio - a.ratio)
                .map((e, i) => ({
                  ...e,
                  position: i + 1,
                  ratio: formatNumber(e.ratio),
                }))}
              headers={{
                position: '#',
                club: 'Club',
                ratio: 'Rapporto',
                femminile: 'Femminile',
                maschile: 'Maschile',
              }}
            />
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
