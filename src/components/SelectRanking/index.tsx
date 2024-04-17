
// React
import * as React from 'react'

// @mui
import Grid from '@mui/material/Unstable_Grid2'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import { useQuery } from '@tanstack/react-query'
import { getListRankings } from '../../api/ranking'
import groupBy from '../../utils/groupBy'
import { type ListRankingsAPI } from '../../pages/RankingSinglePage'
import { useNavigate } from 'react-router-dom'

// ----------------------------------------------------------------------

interface SelectRankingProps {
  filterRanking: { category: string, weapon: string, gender: string, ranking: ListRankingsAPI }
  setfilterRanking: React.Dispatch<React.SetStateAction<{ category: string, weapon: string, gender: string, ranking: ListRankingsAPI }>>
}

export type ListRankings = Record<string, ListRankingsAPI[]>

// ----------------------------------------------------------------------

export default function SelectRanking ({ filterRanking, setfilterRanking }: SelectRankingProps): JSX.Element {
  const [listRankings, setListRankings] = React.useState<ListRankings>()
  const navigate = useNavigate()

  useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['listRankings'],
    queryFn: async () => {
      const data = await getListRankings(`/${filterRanking.category ?? ''}/${filterRanking.weapon ?? ''}/${filterRanking.gender ?? ''}`)
      setListRankings(groupBy(data, 'season') as unknown as ListRankings)
      if (filterRanking.ranking.season === 0) {
        const lastRanking = data.reduce((prev: any, current: any) => (prev.date > current.date) ? prev : current)
        setfilterRanking({
          category: filterRanking.category ?? '',
          weapon: filterRanking.weapon ?? '',
          gender: filterRanking.gender ?? '',
          ranking: { id: lastRanking.id, date: lastRanking.date, season: lastRanking.season }
        })
      }
    }
  })

  return (
        <Grid container spacing={2}>
        <Grid xs={12} md={'auto'}>
        <FormControl fullWidth>
          <InputLabel id="season-select-label">Stagione</InputLabel>
          <Select
            labelId="season-select-label"
            id="season-select"
            label="Stagione"
            value={filterRanking.ranking.season === 0 ? '' : filterRanking.ranking.season}
            onChange={(event) => {
              const season = parseInt(event.target.value as string)
              const listRankingsBySeason = listRankings ?? [] as unknown as ListRankings
              const lastRanking = listRankingsBySeason[season].reduce((prev: any, current: any) => (prev.date > current.date) ? prev : current)
              setfilterRanking({ ...filterRanking, ranking: { ...lastRanking } })
            }}
          >
            {
              Object.keys(listRankings ?? {}).map((item: string) => {
                return (
                  <MenuItem key={item} value={item}>{`${item}/${parseInt(item.substring(2, 4)) + 1}`}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
        </Grid>

        <Grid xs={12} md={'auto'}>
        <FormControl fullWidth>
          <InputLabel id="version-select-label">Versione</InputLabel>
          <Select
            labelId="version-select-label"
            id="version-select"
            label="Versione"
            value={filterRanking.ranking.date === '' ? '' : filterRanking.ranking.id}
            onChange={(event) => {
              setfilterRanking({ ...filterRanking, ranking: { ...filterRanking.ranking, id: parseInt(event.target.value.toString()) } })
              navigate(`..\\${parseInt(event.target.value.toString())}`)
            }}
          >
            {
              listRankings !== undefined &&
              (listRankings[filterRanking.ranking.season] ?? []).sort((a: ListRankingsAPI, b: ListRankingsAPI) => Date.parse(a.date) - Date.parse(b.date)).map((item) => {
                const date = new Date(item.date)
                return (
                  <MenuItem key={item.id} value={item.id}>{date.toLocaleDateString('en-GB')}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
        </Grid>
      </Grid>
  )
}
