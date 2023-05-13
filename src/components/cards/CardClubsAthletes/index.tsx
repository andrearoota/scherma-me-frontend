// @mui
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Unstable_Grid2'

import LooksOneIcon from '@mui/icons-material/LooksOne'
import LooksTwoIcon from '@mui/icons-material/LooksTwo'
import Looks3Icon from '@mui/icons-material/Looks3'

import TableBase from './TableBase'

import * as React from 'react'

import { Card, CardContent, CardActions, Typography, Button, Collapse, Skeleton, Paper } from '@mui/material'
import ExpandMoreIcon from '../../ExpandMoreIcon'

// ----------------------------------------------------------------------

interface CardClubsAthletesProps {
  tableData: any[]
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

export default function CardClubsAthletes ({ tableData }: CardClubsAthletesProps): JSX.Element {
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = (): void => {
    setExpanded(!expanded)
  }

  tableData.sort((a, b) => b.athletes - a.athletes)

  return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Club per numero di atleti
                </Typography>
                <Grid container alignItems='stretch' textAlign='center'>
                    <Grid xs={4} sx={{ mt: '16px' }}>
                      <StyledPodiumBase elevation={8}>
                        <LooksTwoIcon fontSize='large' sx={{ color: '#E37B0D' }} />
                         {tableData.length === 0
                           ? <Skeleton variant="text" sx={{ fontSize: '1rem', width: '10ch' }} />
                           : <StyledPodiumName variant="body1">
                            {tableData[1]?.name ?? '-'}
                        </StyledPodiumName>}
                      </StyledPodiumBase>
                    </Grid>
                    <Grid xs={4} sx={{ marginLeft: '-4px', marginRight: '-4px', zIndex: 5 }}>
                      <StyledPodiumBase elevation={12}>
                        <LooksOneIcon fontSize='large' sx={{ color: '#F8C21D' }}/>
                        {tableData.length === 0
                          ? <Skeleton variant="text" sx={{ fontSize: '1rem', width: '10ch' }} />
                          : <StyledPodiumName variant="body1">
                            {tableData[0]?.name ?? '-'}
                        </StyledPodiumName>}
                      </StyledPodiumBase>
                    </Grid>
                    <Grid xs={4} sx={{ mt: '24px' }}>
                      <StyledPodiumBase elevation={4}>
                        <Looks3Icon fontSize='large' sx={{ color: '#3BACAD' }} />
                        {tableData.length === 0
                          ? <Skeleton variant="text" sx={{ fontSize: '1rem', width: '10ch' }} />
                          : <StyledPodiumName variant="body1">
                            {tableData[2]?.name ?? '-'}
                        </StyledPodiumName>}
                      </StyledPodiumBase>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                  >
                    esplora i dati
                  <ExpandMoreIcon
                  expand={expanded}
                  />
                </Button>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <TableBase data={tableData} isError={false} isLoading={false} />
                </CardContent>
            </Collapse>
        </Card>
  )
}
