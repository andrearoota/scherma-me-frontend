// @mui
import { Card, CardContent, Grid, Stack, Typography } from '@mui/material'

// Echarts
import { PieEchart, type EChartsOption } from '../../echartsComponent/PieEchart'
import { type RankingApi, genders } from '../../../pages/Ranking'
import formatNumber from '../../../utils/formatNumber'
// ----------------------------------------------------------------------

interface CardGenderStatsProps {
  chartData: Array<{ name: string, value: number }>
  rankingData: RankingApi[]
}

export default function CardGenderStats ({ chartData, rankingData }: CardGenderStatsProps): JSX.Element {
  const option: EChartsOption = {
    tooltip: {
      trigger: 'none'
    },
    legend: {
      bottom: 'bottom',
      left: 'center',
      selectedMode: false,
      icon: 'circle'
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
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
        data: chartData
      }
    ]
  }

  const genderGrid: JSX.Element[] = genderGridBuilder(chartData)

  return (

      <Card>
        <CardContent>
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Grid item xs={4} sm={12}>
              <Grid container direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ flexGrow: 1 }}>
                <Grid item xs={4}>
                <Stack>
                  <Typography variant="h3" component='p' sx={{ color: (theme) => theme.palette.primary.main }}>
                    {chartData.reduce((acc, curr) => acc + curr.value, 0)}
                  </Typography>
                  <Typography variant="body2">
                    Atleti
                  </Typography>
                </Stack>
                </Grid>
                {genderGrid}
              </Grid>
            </Grid>
            <Grid item xs={8} sm={12} display={'flex'}>
              <Grid container direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ flexGrow: 1 }}>
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
      </Card>
  )
}

function genderGridBuilder (data: Array<{ name: string, value: number }>): JSX.Element[] {
  return Object.keys(genders).map((item, index) => {
    return (
      <Grid item xs={4} key={index}>
      <Stack>
        <Typography variant="h3" component='p' sx={{ color: (theme) => theme.palette.primary.main }}>
        {data.find((element) => element.name[0].toLowerCase() === item[0].toLowerCase())?.value ?? 0}
        </Typography>
        <Typography variant="body2">
          {item === 'm' ? 'Maschi' : 'Femmine'}
        </Typography>
      </Stack>
    </Grid>
    )
  })
}
