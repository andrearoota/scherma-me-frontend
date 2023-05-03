// React
import * as React from 'react'
// @mui
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'

// Components
import CardPodium from '../components/cards/CardPodium'
import CheckboxChip from '../components/CheckboxChip'
import CardGenderStats from '../components/cards/CardGenderStats'

// Danfojs
import { DataFrame, toJSON } from 'danfojs'
import CardWeaponStats from '../components/cards/CardWeaponStats'
import { Divider } from '@mui/material'
import CardClubStats from '../components/cards/CardClubStats'
import unique from '../utils/unique'

// ----------------------------------------------------------------------
export interface RankingApi {
  data: {
    id: number
    category: number
    date: string
    season: number
    weapon: string
    version: number
    gender: string[1]
    rows: Row[]
  }
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

export default function Ranking (): JSX.Element {
  const [rankingData, setRankingData] = React.useState<RankingApi[]>([])
  const [weaponFilter, setWeaponFilter] = React.useState<string[]>([])
  const [genderFilter, setGenderFilter] = React.useState<string[]>([])
  const [genderChartData, setGenderChartData] = React.useState<Array<{ name: string, value: number }>>([])
  const [weaponChartData, setWeaponChartData] = React.useState<Array<{ name: string, value: number }>>([])
  const [clubChartData, setClubChartData] = React.useState<Array<{ name: string, value: number }>>([])
  const [filter, setFilter] = React.useState<Array<{ weapon: string, gender: string }>>([])
  /* const [categoryFilter, setCategoryFilter] = React.useState<string[]>([]) */

  React.useEffect(() => {
    const newFilter: Array<{ weapon: string, gender: string }> = []
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
          weapon,
          gender
        })
      })
    })
    setFilter(newFilter)

    const activeData: RankingApi[] = []

    rankingData.forEach((ranking) => {
      if (newFilter.some(item => item.gender === ranking.data.gender.trim().toLowerCase() && item.weapon === ranking.data.weapon.trim().toLowerCase())) {
        activeData.push(ranking)
      }
    })

    setRankingData(activeData)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weaponFilter, genderFilter])

  React.useEffect(() => {
    if (rankingData.length === 0) {
      setGenderChartData([])
      setWeaponChartData([])
      setClubChartData([])
      return undefined
    }

    let data: Athlete[] = []
    rankingData.forEach((item) => {
      data = data.concat(item.data.rows.map((row) => {
        return { ...row.athlete, gender: item.data.gender, weapon: item.data.weapon, club: row.club.code_letter }
      }))
    })

    // Remove duplicates
    const df = new DataFrame(unique(data, 'fis_code'))

    setGenderChartData(Object.entries(toJSON(df.groupby(['gender']).count()) ?? {}).map(([key, value]) => {
      return {
        name: value.gender === 'M' ? 'Maschi' : 'Femmine',
        value: value.fis_code_count
      }
    }))

    const newClubChartData: Array<{ name: string, value: number }> = []
    Object.keys(weapons).forEach((item) => {
      let clubs: string[] = []

      rankingData.forEach((ranking) => {
        if (ranking.data.weapon.trim().toLowerCase() === item) {
          clubs = clubs.concat(ranking.data.rows.map((row): string => {
            return row.club.code_letter
          }))
        }
      })

      const countClub = new Set(clubs).size

      if (countClub > 0) {
        newClubChartData.push({
          name: weapons[item],
          value: countClub
        })
      }
    })

    setClubChartData(newClubChartData ?? [])

    const newWeaponChartData: Array<{ name: string, value: number }> = []
    Object.keys(weapons).forEach((item) => {
      const value = rankingData.reduce((acc, curr) => {
        if (curr.data.weapon.trim().toLowerCase() === item) {
          acc += curr.data.rows.length
        }
        return acc
      }, 0)
      if (value > 0) {
        newWeaponChartData.push({
          name: weapons[item],
          value
        })
      }
    })

    setWeaponChartData(newWeaponChartData ?? [])
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
            <Grid container spacing={2}>
              <Grid xs={12} md={6} xl={3}>
                <CardGenderStats chartData={genderChartData} rankingData={rankingData} />
              </Grid>
              <Grid xs={12} md={6} xl={3}>
                <CardWeaponStats chartData={weaponChartData} rankingData={rankingData} />
              </Grid>
              <Grid xs={12} md={6} xl={3}>
                <CardClubStats chartData={clubChartData} rankingData={rankingData} />
              </Grid>
            </Grid>
        </Box>
  )
}
