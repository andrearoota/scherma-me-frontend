'use client';

// React
import * as React from 'react';
import { useParams, useSearchParams } from 'next/navigation';
// @mui
import { Box, Divider, Grid, Group, Text } from '@mantine/core';
import { province, Province } from '@/assets/itProvReg';
import CardPodium from '@/components/Cards/PodiumStatsCard';
import unique from '@/utils';

// Components
/* import CheckboxChip from '../components/CheckboxChip';
import ExpandMoreIcon from '../components/ExpandMoreIcon';
import StatsRankingSection from '../sections/guest/statsRanking';
 */
// ----------------------------------------------------------------------
export interface Ranking {
  data: {
    id: number;
    category: Category;
    date: string;
    season: Season;
    weapon: Weapon;
    version: number;
    gender: Gender;
    rows: Row[];
  };
}

export interface Category {
  id: number;
  name: string;
  start_year?: number;
  end_year?: number;
}

export interface Gender {
  id: string[1];
  name: string;
}

export interface Weapon {
  id: string;
  name: string;
}

export interface Season {
  id: number;
  name: string;
}

export interface Athlete {
  full_name: string;
  fis_code: string;
  birth_year: number;
}

export interface Club {
  code_letter: string;
  name: string;
}

export interface Row {
  id: number;
  position: number;
  total_points: number;
  athlete: Athlete;
  club: Club;
}

export interface ChartsData extends Athlete {
  gender: string;
  weapon: string;
  club: string;
  points: number;
}

// ----------------------------------------------------------------------

export const weapons: Record<string, string> = {
  f: 'fioretto',
  sc: 'sciabola',
  sp: 'spada',
};

export const genders: Record<string, string> = {
  f: 'femminile',
  m: 'maschile',
};

// ----------------------------------------------------------------------

export default function RankingGeneralPage(): JSX.Element {
  // Constants
  const { category } = useParams();
  const searchParams = useSearchParams();

  // Data
  const [rankingData, setRankingData] = React.useState<Ranking[]>([]);

  // Filters
  const [weaponFilter, setWeaponFilter] = React.useState<string[]>(
    searchParams.get('weapons')?.split(',') ?? []
  );
  const [genderFilter, setGenderFilter] = React.useState<string[]>(
    searchParams.get('genders')?.split(',') ?? []
  );
  const [provinceFilter, setProvinceFilter] = React.useState<Province[]>([]);
  const [filter, setFilter] = React.useState<
    Array<{ category: Category; weapon: string; gender: string }>
  >([]);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = (): void => {
    setExpanded(!expanded);
  };

  // Charts data
  const [chartsData, setChartsData] = React.useState<{
    athletes: ChartsData[];
    uniqueAthletes: ChartsData[];
    clubs: any;
  }>({ athletes: [], uniqueAthletes: [], clubs: [] });

  React.useEffect(() => {
    const newFilter: Array<{ category: Category; weapon: string; gender: string }> = [];
    weaponFilter.forEach((weapon: string) => {
      if (weapon.toLowerCase() === 'all') {
        return undefined;
      }

      genderFilter.forEach((gender: string) => {
        if (gender.toLowerCase() === 'all') {
          return undefined;
        }

        let categoryList: Category[] = [];

        switch (category) {
          case 'assoluti':
            categoryList = [{ name: category, id: 1 }];
            break;
          case 'cadetti':
            categoryList = [{ name: category, id: 3 }];
            break;
          case 'giovani':
            categoryList = [{ name: category, id: 2 }];
            break;
          case 'under14':
            categoryList = [
              { name: 'bambine', id: 4 },
              { name: 'giovanissime', id: 5 },
              { name: 'ragazze', id: 6 },
              { name: 'allieve', id: 7 },
              { name: 'ragazze+allieve', id: 8 },
            ];
            break;
          case 'master':
            categoryList = [
              { name: 'Master cat. 0', id: 9 },
              { name: 'Master cat. 1', id: 10 },
              { name: 'Master cat. 2', id: 11 },
              { name: 'Master cat. 3', id: 12 },
            ];
            break;
          case 'paralimpico':
            categoryList = [
              { name: 'Paralimpico cat. A', id: 15 },
              { name: 'Paralimpico cat. B', id: 16 },
              { name: 'Paralimpico cat. C', id: 17 },
            ];
            break;
        }

        categoryList.forEach((category) => {
          newFilter.push({
            category,
            weapon,
            gender,
          });
        });
      });
    });
    setFilter(newFilter);

    const searchParams: { weapons?: string; genders?: string } = {};
    if (weaponFilter.length > 0) {
      searchParams.weapons = weaponFilter.join(',');
    }
    if (genderFilter.length > 0) {
      searchParams.genders = genderFilter.join(',');
    }

    searchParams.weapons = weaponFilter.join(',');
    searchParams.genders = genderFilter.join(',');

    const activeData: Ranking[] = [];

    rankingData.forEach((ranking) => {
      if (isActiveRanking(ranking, newFilter)) {
        activeData.push(ranking);
      }
    });

    setRankingData(activeData);
  }, [weaponFilter, genderFilter, category]);

  React.useEffect(() => {
    const allDataIsUpdated = rankingData.filter((ranking) => isActiveRanking(ranking, filter));

    if (rankingData.length === 0 || allDataIsUpdated.length !== rankingData.length) {
      setChartsData({ athletes: [], uniqueAthletes: [], clubs: [] });
      return undefined;
    }

    let listAthletes: ChartsData[] = [];
    rankingData.forEach((item) => {
      item.data.gender.name = item.data.gender.name.trim().toLowerCase();
      item.data.weapon.name = item.data.weapon.name.trim().toLowerCase();
      listAthletes = listAthletes.concat(
        item.data.rows.reduce((previousValue: ChartsData[], currentValue: Row) => {
          // Filter by province
          if (
            provinceFilter.length === 0 ||
            provinceFilter.some((province) =>
              currentValue.club.code_letter.startsWith(province.sigla_prov)
            )
          ) {
            return [
              ...previousValue,
              {
                ...currentValue.athlete,
                gender: item.data.gender.name,
                weapon: item.data.weapon.name,
                club: currentValue.club.code_letter,
                points: currentValue.total_points,
              },
            ];
          }
          return previousValue;
        }, [])
      );
    });

    const listUniqueAthletes = unique(listAthletes, 'fis_code');

    let listClubsStats = listUniqueAthletes.reduce((previousValue: any, currentValue) => {
      const name = currentValue.club;
      if (!Object.hasOwn(previousValue, name)) {
        previousValue[name] = {
          athletes: 0,
          points: 0,
          weaponByAthletes: { fioretto: 0, sciabola: 0, spada: 0 },
          weaponByPoints: { fioretto: 0, sciabola: 0, spada: 0 },
          genderByAthletes: { femminile: 0, maschile: 0 },
          genderByPoints: { femminile: 0, maschile: 0 },
        };
      }
      previousValue[name].athletes++;
      previousValue[name].genderByAthletes[currentValue.gender]++;
      return previousValue;
    }, {});

    listAthletes.forEach((athlete) => {
      const club = athlete.club;
      const gender = athlete.gender;
      const newObject = listClubsStats[club];

      newObject.weaponByAthletes[athlete.weapon]++;

      newObject.points += athlete.points;

      newObject.weaponByPoints[athlete.weapon] += athlete.points;

      newObject.genderByPoints[gender] += +athlete.points;
    });

    listClubsStats = Object.keys(listClubsStats).map((codeLetter) => {
      return { name: codeLetter, ...listClubsStats[codeLetter] };
    });

    setChartsData({
      athletes: listAthletes,
      uniqueAthletes: listUniqueAthletes,
      clubs: listClubsStats,
    });
  }, [provinceFilter, rankingData]);

  return (
    <Box>
      <Grid>
        <Grid.Col>
          {/*           <CheckboxChip
            listOfChips={[
              { label: 'Fioretto', value: 'f' },
              { label: 'Sciabola', value: 'sc' },
              { label: 'Spada', value: 'sp' },
            ]}
            setSelectedChips={setWeaponFilter}
            selectedChips={weaponFilter}
            title="Seleziona l'arma"
          />
 */}{' '}
        </Grid.Col>
        <Divider orientation="vertical" variant="middle" />
        <Grid.Col>
          {/*           <CheckboxChip
            listOfChips={[
              { label: 'Femminile', value: 'f' },
              { label: 'Maschile', value: 'm' },
            ]}
            setSelectedChips={setGenderFilter}
            selectedChips={genderFilter}
            title="Seleziona il genere"
          />
 */}{' '}
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col>
          {/*           <Button onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
            Filtri aggiuntivi
            <ExpandMoreIcon expand={expanded} />
          </Button>
 */}{' '}
        </Grid.Col>
        <Grid.Col>
          {/*           <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  limitTags={2}
                  options={unique(province, 'regione').sort(
                    (a, b) => -b.regione.localeCompare(a.regione)
                  )}
                  getOptionLabel={(option: Province) => option.regione}
                  onChange={(_event: React.ChangeEvent<{}>, value: Province[]) => {
                    setProvinceFilter(
                      province.filter((prov) => value.some((a) => a.regione === prov.regione))
                    );
                  }}
                  value={unique(provinceFilter, 'regione').filter(
                    (prov) =>
                      provinceFilter.filter((p) => prov.regione === p.regione).length ===
                      province.filter((p) => prov.regione === p.regione).length
                  )}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Seleziona la regione"
                      placeholder="Regioni"
                      sx={{ minWidth: '25ch' }}
                    />
                  )}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  limitTags={2}
                  options={province.sort((a, b) => -b.provincia.localeCompare(a.provincia))}
                  getOptionLabel={(option: Province) => option.provincia}
                  filterSelectedOptions
                  onChange={(_event: React.ChangeEvent<{}>, value: Province[]) => {
                    setProvinceFilter(value);
                  }}
                  value={provinceFilter}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Seleziona la provincia"
                      placeholder="Province"
                      sx={{ minWidth: '25ch' }}
                    />
                  )}
                />
              </Grid.Col>
            </Grid>
          </Collapse>
 */}{' '}
        </Grid.Col>
      </Grid>
      {/* Rankings section */}
      <Text variant="h4" my={2}>
        Ranking
      </Text>
      <Group>
        {filter.map((item, index): JSX.Element => {
          const filter = {
            weapon: weapons[item.weapon],
            gender: genders[item.gender],
            category: item.category,
          };

          return (
            <></>
            /*             <CardPodium
              key={index}
              filter={filter}
              setRankingData={setRankingData}
              filterProv={provinceFilter.map((p) => p.sigla_prov)}
            />
 */
          );
        })}
      </Group>
      {/* Stats section */}
      {/*       <StatsRankingSection
        athletes={chartsData.athletes}
        uniqueAthletes={chartsData.uniqueAthletes}
        clubs={chartsData.clubs}
      />
 */}{' '}
    </Box>
  );
}

function isActiveRanking(
  ranking: Ranking,
  filter: Array<{ category: Category; weapon: string; gender: string }>
): boolean {
  return filter.some(
    (item) =>
      item.gender === ranking.data.gender.id.trim().toLowerCase() &&
      item.weapon === ranking.data.weapon.id.trim().toLowerCase() &&
      item.category.id === ranking.data.category.id
  );
}
