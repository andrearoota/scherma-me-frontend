// @mui
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Unstable_Grid2'

import LooksOneIcon from '@mui/icons-material/LooksOne'
import LooksTwoIcon from '@mui/icons-material/LooksTwo'
import Looks3Icon from '@mui/icons-material/Looks3'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import TableRankingBase from './TableRankingBase'

import * as React from 'react'

import { Card, CardContent, CardActions, Typography, Button, Collapse, IconButton, type IconButtonProps, Skeleton, Snackbar, Alert, Paper } from '@mui/material'
import { type RankingApi } from '../../../pages/Ranking'
import { useQuery } from '@tanstack/react-query'
import { getRanking } from '../../../api/ranking'

// ----------------------------------------------------------------------

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

interface CardPodiumProps {
  weapon: string
  gender: string
  setRankingData: React.Dispatch<React.SetStateAction<RankingApi[]>>
}

// ----------------------------------------------------------------------

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))

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

export default function CardPodium ({ weapon, gender, setRankingData }: CardPodiumProps): JSX.Element {
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = (): void => {
    setExpanded(!expanded)
  }

  const { data, isError, isLoading } =
        useQuery<RankingApi>({
          queryKey: [
            'table-data',
            weapon,
            gender
          ],
          queryFn: async () => {
            return await getRanking(`/giovani/${weapon}/${gender}`) as RankingApi
          },
          keepPreviousData: true
        })

  React.useEffect(() => {
    if (!isError && !isLoading) {
      setRankingData((prev) => {
        return prev.some(item => item.data.id === data?.data.id) ? prev : [...prev, data]
      }
      )
    }
  }, [data, isError, isLoading, setRankingData])

  return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: 'capitalize' }}>
                    {weapon} {gender}
                </Typography>
                <Grid container alignItems='stretch' textAlign='center'>
                    <Grid xs={4} sx={{ mt: '16px' }}>
                      <StyledPodiumBase elevation={8}>
                        <LooksTwoIcon fontSize='large' sx={{ color: '#E37B0D' }} />
                         {isLoading || isError
                           ? <Skeleton variant="text" sx={{ fontSize: '1rem', width: '10ch' }} />
                           : <StyledPodiumName variant="body1">
                            {data?.data.rows[1].athlete.full_name}
                        </StyledPodiumName>}
                      </StyledPodiumBase>
                    </Grid>
                    <Grid xs={4} sx={{ marginLeft: '-4px', marginRight: '-4px', zIndex: 5 }}>
                      <StyledPodiumBase elevation={12}>
                        <LooksOneIcon fontSize='large' sx={{ color: '#F8C21D' }}/>
                        {isLoading || isError
                          ? <Skeleton variant="text" sx={{ fontSize: '1rem', width: '10ch' }} />
                          : <StyledPodiumName variant="body1">
                            {data?.data.rows[0].athlete.full_name}
                        </StyledPodiumName>}
                      </StyledPodiumBase>
                    </Grid>
                    <Grid xs={4} sx={{ mt: '24px' }}>
                      <StyledPodiumBase elevation={4}>
                        <Looks3Icon fontSize='large' sx={{ color: '#3BACAD' }} />
                        {isLoading || isError
                          ? <Skeleton variant="text" sx={{ fontSize: '1rem', width: '10ch' }} />
                          : <StyledPodiumName variant="body1">
                            {data?.data.rows[2].athlete.full_name}
                        </StyledPodiumName>}
                      </StyledPodiumBase>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button variant='outlined'>Approfondisci</Button>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <TableRankingBase data={data} isError={isError} isLoading={isLoading} />
                </CardContent>
            </Collapse>
            <Snackbar open={isError} autoHideDuration={5000} message={'Errore nel caricamento dei dati!'} key={'bottomcenter'} sx={{ borderRadius: '5px' }}>
                <Alert severity="error" sx={{ borderRadius: '5px' }}>Errore nel caricamento dei dati!</Alert>
            </Snackbar>
        </Card>
  )
}
