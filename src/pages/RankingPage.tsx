// React
import * as React from 'react'
// @mui
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'

// Components
import CardPodium from '../components/cards/CardPodium'
import CheckboxChip from '../components/CheckboxChip'
import CardGenderStats from '../components/cards/CardGenderStats'

import CardWeaponStats from '../components/cards/CardWeaponStats'
import { Divider, Typography } from '@mui/material'
import CardClubStats from '../components/cards/CardClubStats'
import CardClubsPoints from '../components/cards/CardClubsPoints'
import unique from '../utils/unique'
import CardClubsAthletes from '../components/cards/CardClubsAthletes'
import CardClubsRatio from '../components/cards/CardClubsRatio'

// ----------------------------------------------------------------------
export interface Ranking {
  data: {
    id: number
    category: Category
    date: string
    season: Season
    weapon: Weapon
    version: number
    gender: Gender
    rows: Row[]
  }
}

export interface Category {
  id: number
  name: string
  start_year: number
  end_year: number
}

export interface Gender {
  id: string[1]
  name: string
}

export interface Weapon {
  id: string
  name: string
}

export interface Season {
  id: number
  name: string
}

export interface Athlete {
  full_name: string
  fis_code: string
  birth_year: number
}

export interface Club {
  code_letter: string
  name: string
}

export interface Row {
  id: number
  position: number
  total_points: number
  athlete: Athlete
  club: Club
}

interface RankingPageProps {
  categories: string[]
}

export interface ChartsData extends Athlete {
  gender: string
  weapon: string
  club: string
  points: number
}

// ----------------------------------------------------------------------

export const weapons: Record<string, string> = {
  f: 'fioretto',
  sc: 'sciabola',
  sp: 'spada'
}

export const genders: Record<string, string> = {
  f: 'femminile',
  m: 'maschile'
}

// ----------------------------------------------------------------------

export default function RankingPage ({ categories }: RankingPageProps): JSX.Element {
  // Data
  const [rankingData, setRankingData] = React.useState<Ranking[]>([])

  // Filters
  const [weaponFilter, setWeaponFilter] = React.useState<string[]>([])
  const [genderFilter, setGenderFilter] = React.useState<string[]>([])
  const [categoryFilter] = React.useState<string[]>(categories)
  const [filter, setFilter] = React.useState<Array<{ category: string, weapon: string, gender: string }>>([])

  // Charts data
  const [chartsData, setChartsData] = React.useState<{ athletes: ChartsData[], uniqueAthletes: ChartsData[], clubs: any }>({ athletes: [], uniqueAthletes: [], clubs: [] })

  React.useEffect(() => {
    const newFilter: Array<{ category: string, weapon: string, gender: string }> = []
    weaponFilter.forEach((weapon: string) => {
      weapon = weapon.toLowerCase()
      if (weapon === 'all') {
        return undefined
      }

      genderFilter.forEach((gender: string) => {
        gender = gender.toLowerCase()
        if (gender === 'all') {
          return undefined
        }

        newFilter.push({
          category: categoryFilter[0],
          weapon,
          gender
        })
      })
    })
    setFilter(newFilter)

    const activeData: Ranking[] = []

    rankingData.forEach((ranking) => {
      if (newFilter.some(item => item.gender === ranking.data.gender.id.trim().toLowerCase() && item.weapon === ranking.data.weapon.id.trim().toLowerCase())) {
        activeData.push(ranking)
      }
    })

    setRankingData(activeData)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weaponFilter, genderFilter])

  React.useEffect(() => {
    if (rankingData.length === 0) {
      setChartsData({ athletes: [], uniqueAthletes: [], clubs: [] })
      return undefined
    }

    let listAthletes: ChartsData[] = []
    rankingData.forEach((item) => {
      item.data.gender.name = item.data.gender.name.trim().toLowerCase()
      item.data.weapon.name = item.data.weapon.name.trim().toLowerCase()
      listAthletes = listAthletes.concat(item.data.rows.map((row) => {
        return {
          ...row.athlete,
          gender: item.data.gender.name,
          weapon: item.data.weapon.name,
          club: row.club.code_letter,
          points: row.total_points
        }
      }))
    })

    const listUniqueAthletes = unique(listAthletes, 'fis_code')

    let listClubsStats = listUniqueAthletes.reduce((previousValue: any, currentValue) => {
      const name = currentValue.club
      if (!Object.prototype.hasOwnProperty.call(previousValue, name)) {
        previousValue[name] = {
          athletes: 0,
          points: 0,
          weaponByAthletes: { fioretto: 0, sciabola: 0, spada: 0 },
          weaponByPoints: { fioretto: 0, sciabola: 0, spada: 0 },
          genderByAthletes: { femminile: 0, maschile: 0 },
          genderByPoints: { femminile: 0, maschile: 0 }
        }
      }
      previousValue[name].athletes++
      previousValue[name].genderByAthletes[currentValue.gender]++
      return previousValue
    }, {})

    listAthletes.forEach((athlete) => {
      const club = athlete.club
      const gender = athlete.gender
      const newObject = listClubsStats[club]

      newObject.weaponByAthletes[athlete.weapon]++

      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      newObject.points += athlete.points
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      newObject.weaponByPoints[athlete.weapon] += athlete.points
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      newObject.genderByPoints[gender] += +athlete.points
    })

    listClubsStats = Object.keys(listClubsStats).map(codeLetter => {
      return { name: codeLetter, ...listClubsStats[codeLetter] }
    })

    setChartsData(
      {
        athletes: listAthletes,
        uniqueAthletes: listUniqueAthletes,
        clubs: listClubsStats
      }
    )
  }, [rankingData])

  return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid xs={12} md={'auto'}>
                    <CheckboxChip
                        listOfChips={[
                          { label: 'Fioretto', value: 'f' },
                          { label: 'Sciabola', value: 'sc' },
                          { label: 'Spada', value: 'sp' }
                        ]}
                        setSelectedChips={setWeaponFilter}
                        selectedChips={weaponFilter}
                        title="Seleziona l'arma"
                    />
                </Grid>
                <Divider orientation="vertical" variant='middle' flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
                <Grid xs={12} md={'auto'}>
                    <CheckboxChip
                        listOfChips={[
                          { label: 'Femminile', value: 'f' },
                          { label: 'Maschile', value: 'm' }
                        ]}
                        setSelectedChips={setGenderFilter}
                        selectedChips={genderFilter}
                        title="Seleziona il genere"
                    />
                </Grid>
            </Grid>
            {/* Rankings section */}
            <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
                Ranking
              </Typography>
            <Grid container spacing={2}>
                {
                    filter.map((item): JSX.Element => {
                      return (
                        <Grid xs={12} md={6} xl={3} key={`${item.weapon}_${item.gender}`}>
                            <CardPodium weapon={weapons[item.weapon]} gender={genders[item.gender]} setRankingData={setRankingData} />
                        </Grid>
                      )
                    })
                }
            </Grid>
            {/* Stats section */}
            <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
                Statistiche
              </Typography>
            <Grid container spacing={2}>
              <Grid xs={12} md={6} xl={3}>
                <CardGenderStats chartData={chartsData.uniqueAthletes} tableData={chartsData.clubs} />
              </Grid>
              <Grid xs={12} md={6} xl={3}>
                <CardWeaponStats chartData={chartsData.athletes} tableData={chartsData.clubs} />
              </Grid>
              <Grid xs={12} md={6} xl={3}>
                <CardClubStats chartData={chartsData.athletes} />
              </Grid>
              <Grid xs={12} md={6} xl={3}>
                <CardClubsPoints tableData={chartsData.clubs} />
              </Grid>
              <Grid xs={12} md={6} xl={3}>
                <CardClubsAthletes tableData={chartsData.clubs} />
              </Grid>
              <Grid xs={12} md={6} xl={3}>
                <CardClubsRatio tableData={chartsData.clubs} />
              </Grid>
            </Grid>
        </Box>
  )
}
