// @mui
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Unstable_Grid2'

import LooksOneIcon from '@mui/icons-material/LooksOne'
import LooksTwoIcon from '@mui/icons-material/LooksTwo'
import Looks3Icon from '@mui/icons-material/Looks3'

import TableRankingExtended from './TableRankingExtended'

import * as React from 'react'

import { Card, CardContent, Typography, Skeleton, Snackbar, Alert, Paper, Chip, Box } from '@mui/material'
import { type Row, type Ranking, type Category } from '../../../pages/RankingGeneralPage'
import { useQuery } from '@tanstack/react-query'
import { getRanking } from '../../../api/ranking'
import { firstLetterCapitalize } from '../../../utils/stringFormatter'
import { type ListRankingsAPI } from '../../../pages/RankingSinglePage'

// ----------------------------------------------------------------------

interface CardPodiumProps {
  filter: { gender: string, weapon: string, category: Category }
  filterProv: string[]
  filterRanking: ListRankingsAPI
  setRankingData: React.Dispatch<React.SetStateAction<Ranking[]>>
}

// ----------------------------------------------------------------------

const StyledPodiumName = styled(Typography)(({ theme }) => ({
  textTransform: 'capitalize',
  fontWeight: 'bold',
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1)
}))

const StyledPodiumBase = styled(Paper)(({ theme }) => ({
  minHeight: theme.spacing(10),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  height: '100%'
}))

// ----------------------------------------------------------------------

export default function CardPodiumExtended ({ filter, setRankingData, filterProv, filterRanking }: CardPodiumProps): JSX.Element {
  const [dataTable, setDataTable] = React.useState<Ranking | undefined>(undefined)

  const { data, isError, isLoading } =
        useQuery<Ranking>({
          queryKey: [
            'table-data',
            filterRanking,
            filter.category.name,
            filter.weapon,
            filter.gender
          ],
          queryFn: async () => {
            let url = `/${filter.category.name}/${filter.weapon}/${filter.gender}`
            url = filterRanking.date === '' ? `${url}/latest` : `${url}/${filterRanking.id}`
            return await getRanking(url) as Ranking
          },
          keepPreviousData: true
        })

  React.useEffect(() => {
    if (!isError && !isLoading) {
      setRankingData([data])

      const newData = JSON.parse(JSON.stringify(data))

      if (newData !== undefined) {
        newData.data.rows = newData.data.rows.reduce((previousValue: Row[], currentValue: Row) => {
          if (filterProv.length === 0 || filterProv.some((province) => currentValue.club.code_letter.startsWith(province))) {
            return [...previousValue, currentValue]
          }
          return previousValue
        }, [])
      }
      setDataTable(newData)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isError, isLoading, setRankingData, filterProv])

  return (
        <Card>
            <CardContent>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} paddingBottom={1}>
                  <Typography variant="h5">
                    {firstLetterCapitalize(`${filter.weapon} ${filter.gender}`)}
                  </Typography>
                  <Chip label={dataTable?.data.category.name} size="small" />
                </Box>
                <Grid container alignItems='stretch' textAlign='center'>
                    <Grid xs={4} sx={{ mt: '16px' }}>
                      <StyledPodiumBase elevation={8}>
                        <LooksTwoIcon fontSize='large' sx={{ color: '#E37B0D' }} />
                         {isLoading || isError
                           ? <Skeleton variant="text" sx={{ fontSize: '1rem', width: '10ch' }} />
                           : <StyledPodiumName variant="body1">
                            {dataTable?.data.rows[1]?.athlete.full_name ?? '-'}
                        </StyledPodiumName>}
                      </StyledPodiumBase>
                    </Grid>
                    <Grid xs={4} sx={{ marginLeft: '-4px', marginRight: '-4px', zIndex: 5 }}>
                      <StyledPodiumBase elevation={12}>
                        <LooksOneIcon fontSize='large' sx={{ color: '#F8C21D' }}/>
                        {isLoading || isError
                          ? <Skeleton variant="text" sx={{ fontSize: '1rem', width: '10ch' }} />
                          : <StyledPodiumName variant="body1">
                            {dataTable?.data.rows[0]?.athlete.full_name ?? '-'}
                        </StyledPodiumName>}
                      </StyledPodiumBase>
                    </Grid>
                    <Grid xs={4} sx={{ mt: '24px' }}>
                      <StyledPodiumBase elevation={4}>
                        <Looks3Icon fontSize='large' sx={{ color: '#3BACAD' }} />
                        {isLoading || isError
                          ? <Skeleton variant="text" sx={{ fontSize: '1rem', width: '10ch' }} />
                          : <StyledPodiumName variant="body1">
                            {dataTable?.data.rows[2]?.athlete.full_name ?? '-'}
                        </StyledPodiumName>}
                      </StyledPodiumBase>
                    </Grid>
                </Grid>
                <Box paddingTop={2}>
                  <TableRankingExtended data={dataTable} isError={isError} isLoading={isLoading} />
                </Box>
            </CardContent>
            <Snackbar open={isError} autoHideDuration={5000} message={'Errore nel caricamento dei dati!'} key={'bottomcenter'} sx={{ borderRadius: '5px' }}>
                <Alert severity="error" sx={{ borderRadius: '5px' }}>Errore nel caricamento dei dati!</Alert>
            </Snackbar>
        </Card>
  )
}
