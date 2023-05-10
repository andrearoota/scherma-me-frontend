// @mui
import { Button, Card, CardActions, CardContent, Collapse, Grid, Stack, Typography } from '@mui/material'

// Echarts
import { PieEchart, type EChartsOption } from '../../echartsComponent/PieEchart'
import { genders, type ChartsData } from '../../../pages/RankingPage'
import formatNumber from '../../../utils/formatNumber'
import CircleIcon from '@mui/icons-material/Circle'
import { styled } from '@mui/material/styles'
import { themeEcharts } from '../../../assets/themeEcharts'
import * as React from 'react'
import ExpandMoreIcon from '../../ExpandMoreIcon'
import TableBase from './TableBase'

// ----------------------------------------------------------------------

interface CardGenderStatsProps {
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

export default function CardGenderStats ({ chartData, tableData }: CardGenderStatsProps): JSX.Element {
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = (): void => {
    setExpanded(!expanded)
  }

  const dataForChart: Array<{ name: string, value: number, itemStyle: any }> = [
    {
      name: genders.f,
      value: 0,
      itemStyle: {
        color: themeEcharts.color[0]
      }
    },
    {
      name: genders.m,
      value: 0,
      itemStyle: {
        color: themeEcharts.color[1]
      }
    }
  ]

  chartData.forEach((item) => {
    item.gender === 'femminile' ? dataForChart[0].value++ : dataForChart[1].value++
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

  const genderGrid: JSX.Element[] = genderGridBuilder(dataForChart)

  return (

      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
              Atleti
          </Typography>
          <Grid container sx={{ flexGrow: 1 }}>
            <Grid item xs={4} sm={12}>
              <Grid container direction={{ xs: 'column', sm: 'row' }} sx={{ flexGrow: 1 }} display={'flex'} justifyContent={{ xs: 'space-between', sm: 'space-around' }} alignItems={'baseline'}>
                <Grid item xs={'auto'}>
                <Stack>
                  <Typography variant="h3" component='p' sx={{ color: (theme) => theme.palette.primary.main }}>
                    {dataForChart.reduce((acc, curr) => acc + curr.value, 0)}
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

function genderGridBuilder (data: Array<{ name: string, value: number, itemStyle: any }>): JSX.Element[] {
  return data.map((item) => {
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
