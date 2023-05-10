// @mui
import { Button, Card, CardActions, CardContent, Collapse, Grid, Stack, Typography } from '@mui/material'

// Echarts
import { PieEchart, type EChartsOption } from '../../echartsComponent/PieEchart'
import { weapons, type ChartsData } from '../../../pages/RankingPage'
import formatNumber from '../../../utils/formatNumber'
import { themeEcharts } from '../../../assets/themeEcharts'
import CircleIcon from '@mui/icons-material/Circle'
import { styled } from '@mui/material/styles'
import TableBase from './TableBase'
import * as React from 'react'
import ExpandMoreIcon from '../../ExpandMoreIcon'

// ----------------------------------------------------------------------

interface CardWeaponStatsProps {
  chartData: ChartsData[]
  tableData: any[]
}

// ----------------------------------------------------------------------

const StyledCircleIcon = styled(CircleIcon)(({ theme }) => ({
  alignSelf: 'center',
  fontSize: '1rem',
  marginRight: theme.spacing(0.5)
}))

// ----------------------------------------------------------------------

export default function CardWeaponStats ({ chartData, tableData }: CardWeaponStatsProps): JSX.Element {
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = (): void => {
    setExpanded(!expanded)
  }

  const dataForChart: Array<{ name: string, value: number, itemStyle: any }> = []
  Object.values(weapons).forEach((weapon, index) => {
    dataForChart.push({
      name: weapon,
      value: chartData.filter((item) => item.weapon === weapon).length,
      itemStyle: {
        color: themeEcharts.color[index]
      }
    })
  })

  const option: EChartsOption = {
    series: [
      {
        type: 'pie',
        radius: ['50%', '80%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'inside',
          formatter: (params) => `${formatNumber(params.percent ?? 0, 0, 0)}%`
        },
        emphasis: {
          disabled: true
        },
        labelLine: {
          show: false
        },
        data: dataForChart
      }
    ]
  }

  return (
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
              Atleti per arma
          </Typography>
          <Grid container sx={{ flexGrow: 1 }}>
            <Grid item xs={4} sm={12}>
              <Grid container direction={{ xs: 'column', sm: 'row' }} sx={{ flexGrow: 1 }} display={'flex'} justifyContent={{ xs: 'space-between', sm: 'space-around' }} alignItems={'baseline'}>
                {
                  dataForChart.map((item, index) => {
                    return (
                      <Grid item xs={'auto'} key={item.name}>
                      <Stack>
                        <Typography variant="h4" component='p' sx={{ color: (theme) => theme.palette.primary.main }}>
                        {item.value}
                        </Typography>
                        <Stack direction={'row'}>
                          <StyledCircleIcon sx={{ color: item.itemStyle.color }} />
                          <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                            {item.name}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    )
                  })
                }
              </Grid>
            </Grid>
            <Grid item xs={8} sm={12} display={'flex'}>
              <Grid container direction={{ xs: 'column', sm: 'row' }} sx={{ flexGrow: 1 }}>
                <Grid item xs={12} display={'flex'} alignItems={'center'}>
                  <PieEchart
                    option={option}
                    style={{ height: '100%', minHeight: '175px', maxHeight: '225px' }}
                  />
                </Grid>
              </Grid>
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
