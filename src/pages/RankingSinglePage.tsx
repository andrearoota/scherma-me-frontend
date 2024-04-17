// React
import * as React from 'react'
// @mui
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'

// Components
import { type IProvince, province } from '../assets/itProvReg'

import { Autocomplete, Button, Collapse, TextField, Typography } from '@mui/material'
import unique from '../utils/unique'
import ExpandMoreIcon from '../components/ExpandMoreIcon'
import { /* useNavigate,  */useParams/* , useSearchParams */ } from 'react-router-dom'
import StatsRankingSection from '../sections/guest/statsRanking'
import CardPodiumExtended from '../components/cards/CardPodiumExtended'
import SelectRanking from '../components/SelectRanking'

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
  start_year?: number
  end_year?: number
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

export interface ChartsData extends Athlete {
  gender: string
  weapon: string
  club: string
  points: number
}

export interface ListRankingsAPI {
  id: number
  date: string
  season: number
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

export default function RankingSinglePage (): JSX.Element {
  // Constants
  // eslint-disable-next-line prefer-const
  let { category, weapon, gender, id } = useParams()
  /* const [searchParams, setSearchParams] = useSearchParams() */

  // Data
  const [rankingData, setRankingData] = React.useState<Ranking[]>([])

  // Filters
  const [provinceFilter, setProvinceFilter] = React.useState<IProvince[]>([])
  const [rankingFilter, setRankingFilter] = React.useState<{ category: string, weapon: string, gender: string, ranking: ListRankingsAPI }>(
    {
      category: category ?? '',
      weapon: weapon ?? '',
      gender: gender ?? '',
      ranking: { id: parseInt(id ?? ''), date: '', season: 0 }
    }
  )

  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = (): void => {
    setExpanded(!expanded)
  }

  // Charts data
  const [chartsData, setChartsData] = React.useState<{ athletes: ChartsData[], uniqueAthletes: ChartsData[], clubs: any }>({ athletes: [], uniqueAthletes: [], clubs: [] })

  React.useEffect(() => {
    if (rankingData.length === 0) {
      setChartsData({ athletes: [], uniqueAthletes: [], clubs: [] })
      return undefined
    }

    let listAthletes: ChartsData[] = []
    rankingData.forEach((item) => {
      item.data.gender.name = item.data.gender.name.trim().toLowerCase()
      item.data.weapon.name = item.data.weapon.name.trim().toLowerCase()
      listAthletes = listAthletes.concat(item.data.rows.reduce((previousValue: ChartsData[], currentValue: Row) => {
        // Filter by province
        if (provinceFilter.length === 0 || provinceFilter.some((province) => currentValue.club.code_letter.startsWith(province.sigla_prov))) {
          return [...previousValue, {
            ...currentValue.athlete,
            gender: item.data.gender.name,
            weapon: item.data.weapon.name,
            club: currentValue.club.code_letter,
            points: currentValue.total_points
          }]
        }
        return previousValue
      }, []))
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provinceFilter, rankingData])

  return (
        <Box sx={{ flexGrow: 1 }}>
          <SelectRanking filterRanking={rankingFilter} setfilterRanking={setRankingFilter}/>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Button
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                  Filtri aggiuntivi
                <ExpandMoreIcon
                expand={expanded}
                />
                </Button>
            </Grid>
            <Grid xs={12}>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Grid container spacing={2}>
                  <Grid xs={12} md={4}>
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      limitTags={2}
                      options={unique(province, 'regione').sort((a, b) => -b.regione.localeCompare(a.regione))}
                      getOptionLabel={(option: IProvince) => option.regione}
                      onChange={(event, value) => { setProvinceFilter(province.filter(prov => value.some(a => a.regione === prov.regione))) }}
                      value={unique(provinceFilter, 'regione').filter(prov => provinceFilter.filter(p => prov.regione === p.regione).length === province.filter(p => prov.regione === p.regione).length)}
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
                  </Grid>
                  <Grid xs={12} md={4}>
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      limitTags={2}
                      options={province.sort((a, b) => -b.provincia.localeCompare(a.provincia))}
                      getOptionLabel={(option: IProvince) => option.provincia}
                      filterSelectedOptions
                      onChange={(event, value) => { setProvinceFilter(value) }}
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
                  </Grid>
                </Grid>
              </Collapse>
            </Grid>

          </Grid>
          {/* Rankings section */}
          <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
              Ranking
          </Typography>
          <Grid container spacing={2}>
              <Grid xs key={`${rankingFilter.category}_${rankingFilter.weapon}_${rankingFilter.gender}`}>
                  <CardPodiumExtended filter={{
                    weapon: rankingFilter.weapon,
                    gender: rankingFilter.gender,
                    category: { name: rankingFilter.category, id: 1 }
                  }} setRankingData={setRankingData} filterProv={provinceFilter.map(p => p.sigla_prov)} filterRanking={rankingFilter.ranking} />
              </Grid>
          </Grid>
          {/* Stats section */}
          <StatsRankingSection athletes={chartsData.athletes} uniqueAthletes={chartsData.uniqueAthletes} clubs={chartsData.clubs}/>
        </Box>
  )
}
