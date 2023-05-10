// @mui
import { Card, CardContent, Grid, Stack, Typography } from '@mui/material'

// Echarts
import { GaugeEchart, type EChartsOption } from '../../echartsComponent/GaugeEchart'
import { weapons, type ChartsData } from '../../../pages/RankingPage'
import CircleIcon from '@mui/icons-material/Circle'
import { styled } from '@mui/material/styles'
import { themeEcharts } from '../../../assets/themeEcharts'

// ----------------------------------------------------------------------

interface CardClubStatsProps {
  chartData: ChartsData[]
}

// ----------------------------------------------------------------------

const StyledCircleIcon = styled(CircleIcon)(({ theme }) => ({
  alignSelf: 'center',
  fontSize: '1rem',
  marginRight: theme.spacing(0.5)
}))

// ----------------------------------------------------------------------

export default function CardClubStats ({ chartData }: CardClubStatsProps): JSX.Element {
  const uniqueClubs = new Set(chartData.map((item) => item.club).flat()).size

  const dataForChart: Array<{ name: string, value: number }> = []

  Object.values(weapons).forEach((weapon) => {
    dataForChart.push({
      name: weapon,
      value: new Set(chartData.filter((item) => item.weapon === weapon).map((item) => item.club).flat()).size
    })
  })

  const option: EChartsOption = {
    legend: {
      show: true,
      bottom: 'bottom',
      left: 'center',
      selectedMode: false,
      icon: 'circle'
    },
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        radius: '80%',
        pointer: {
          show: false
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            borderWidth: 1,
            borderColor: '#fff'
          }
        },
        axisLine: {
          lineStyle: {
            width: 27
          }
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        data: dataForChart.map((item) => {
          return {
            name: item.name,
            value: item.value,
            title: {
              show: false
            },
            detail: {
              show: false
            }
          }
        }),
        max: uniqueClubs,
        detail: {
          show: false
        }
      }
    ]
  }
  const clubGrid: JSX.Element[] = clubGridBuilder(dataForChart)

  return (

      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
              Club per arma
          </Typography>
          <Grid container sx={{ flexGrow: 1 }}>
            <Grid item xs={4} sm={12}>
              <Grid container direction={{ xs: 'column', sm: 'row' }} sx={{ flexGrow: 1 }} display={'flex'} justifyContent={{ xs: 'space-between', sm: 'space-around' }} alignItems={'baseline'}>
                <Grid item xs={'auto'}>
                <Stack>
                  <Typography variant="h3" component='p' sx={{ color: (theme) => theme.palette.primary.main }}>
                    {uniqueClubs}
                  </Typography>
                  <Typography variant="body2">
                    Totale
                  </Typography>
                </Stack>
                </Grid>
                {clubGrid}
              </Grid>
            </Grid>
            <Grid item xs={8} sm={12} display={'flex'}>
              <Grid container direction={{ xs: 'column', sm: 'row' }} sx={{ flexGrow: 1 }}>
                <Grid item xs={12} display={'flex'} alignItems={'center'}>
                  <GaugeEchart
                    option={option}
                    style={{ height: '100%', minHeight: '175px', maxHeight: '225px' }}
                  />
                </Grid>
              </Grid>
            </Grid>
            </Grid>
        </CardContent>
      </Card>
  )
}

function clubGridBuilder (data: Array<{ name: string, value: number }>): JSX.Element[] {
  return Object.keys(weapons).map((item, index) => {
    return (
      <Grid item xs={'auto'} key={index}>
      <Stack>
        <Typography variant="h4" component='p' sx={{ color: (theme) => theme.palette.primary.main }}>
        {data.find((element) => element.name.toLowerCase() === weapons[item].toLowerCase())?.value ?? 0}
        </Typography>
        <Stack direction={'row'}>
          <StyledCircleIcon sx={{ color: themeEcharts.color[index] }} />
          <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
            {weapons[item]}
          </Typography>
        </Stack>
      </Stack>
    </Grid>
    )
  })
}
