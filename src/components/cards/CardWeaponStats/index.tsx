// @mui
import { Card, CardContent, Grid, Stack, Typography } from '@mui/material'

// Echarts
import { PieEchart, type EChartsOption } from '../../echartsComponent/PieEchart'
import { weapons, type RankingApi } from '../../../pages/Ranking'
import formatNumber from '../../../utils/formatNumber'
import { themeEcharts } from '../../../assets/themeEcharts'
import CircleIcon from '@mui/icons-material/Circle'
import { styled } from '@mui/material/styles'

// ----------------------------------------------------------------------

interface CardWeaponStatsProps {
  chartData: Array<{ name: string, value: number }>
  rankingData: RankingApi[]
}

// ----------------------------------------------------------------------

const StyledCircleIcon = styled(CircleIcon)(({ theme }) => ({
  alignSelf: 'center',
  fontSize: '1rem',
  marginRight: theme.spacing(0.5)
}))

// ----------------------------------------------------------------------

export default function CardWeaponStats ({ chartData, rankingData }: CardWeaponStatsProps): JSX.Element {
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
        data: chartData.map((item, index) => {
          return {
            name: weapons[item.name],
            value: item.value,
            itemStyle: {
              color: themeEcharts.color[index]
            }
          }
        })
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
                  Object.keys(weapons).map((item, index) => {
                    return (
                      <Grid item xs={'auto'} key={index}>
                      <Stack>
                        <Typography variant="h4" component='p' sx={{ color: (theme) => theme.palette.primary.main }}>
                        {rankingData.reduce((acc, curr) => curr.data.weapon.trim().toLowerCase() === item ? acc + curr.data.rows.length : acc, 0)}
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
      </Card>
  )
}
