// !!! DISINSTALLA MONTSERRAT !!!
//
//
// React
import * as React from 'react'
// @mui
import Box from '@mui/material/Box'
import { Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2' // Grid version 2

import { LineEchart, type EChartsOption } from '../components/echartsComponent/TestAthleteDEMO'

export default function TestAthlete (): JSX.Element {
  const option: EChartsOption =
  {
    color: ['#0071bc', '#ebc42b', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
    textStyle: {
      fontFamily: 'Montserrat'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      left: 'center'
    },
    grid: {
      left: '1%',
      right: '3%',
      top: '60',
      bottom: '1%',
      containLabel: true
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      inverse: true,
      minInterval: 1,
      min: 1,
      max: 'dataMax',
      splitArea: {
        show: false
      }
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {}
      }
    },
    series: [
      {
        type: 'line',
        name: 'fioretto',
        smooth: false,
        data: [
          [
            '2019-02-19T00:00:00.000Z',
            31,
            1271214,
            '5.9195'
          ],
          [
            '2019-03-12T00:00:00.000Z',
            18,
            1288127,
            '15.15028125'
          ],
          [
            '2019-05-05T00:00:00.000Z',
            10,
            1289360,
            '26.98496875'
          ],
          [
            '2019-08-31T00:00:00.000Z',
            10,
            1290478,
            '26.98496875'
          ],
          [
            '2019-09-01T00:00:00.000Z',
            10,
            1296674,
            '26.98496875'
          ],
          [
            '2019-10-28T00:00:00.000Z',
            7,
            1292848,
            '36.366375'
          ],
          [
            '2019-11-26T00:00:00.000Z',
            4,
            1293467,
            '39.7075'
          ],
          [
            '2019-12-01T00:00:00.000Z',
            4,
            1284132,
            '39.7075'
          ],
          [
            '2020-01-29T00:00:00.000Z',
            4,
            1286067,
            '39.863125'
          ],
          [
            '2020-07-03T00:00:00.000Z',
            6,
            1287210,
            '37.535625'
          ],
          [
            '2020-09-01T00:00:00.000Z',
            6,
            1294738,
            '37.535625'
          ],
          [
            '2021-05-18T00:00:00.000Z',
            6,
            1297790,
            '18.7678125'
          ],
          [
            '2021-06-09T00:00:00.000Z',
            9,
            1298763,
            '18.7678125'
          ],
          [
            '2021-07-02T00:00:00.000Z',
            5,
            1299747,
            '47.6832375'
          ],
          [
            '2021-08-31T00:00:00.000Z',
            5,
            1293694,
            '47.6832375'
          ],
          [
            '2021-09-01T00:00:00.000Z',
            5,
            1295612,
            '47.6832375'
          ],
          [
            '2021-12-07T00:00:00.000Z',
            3,
            1356876,
            '47.179175'
          ],
          [
            '2022-01-18T00:00:00.000Z',
            3,
            1410949,
            '31.140933333333'
          ],
          [
            '2022-03-10T00:00:00.000Z',
            5,
            1455150,
            '31.140933333333'
          ],
          [
            '2022-05-10T00:00:00.000Z',
            7,
            1499368,
            '39.110266666667'
          ],
          [
            '2022-06-18T00:00:00.000Z',
            6,
            1531430,
            '39.410566666667'
          ],
          [
            '2022-09-01T00:00:00.000Z',
            5,
            1582444,
            '39.410566666667'
          ],
          [
            '2022-11-02T00:00:00.000Z',
            3,
            1596065,
            '47.341733333333'
          ],
          [
            '2022-12-12T00:00:00.000Z',
            3,
            1633952,
            '43.135233333333'
          ],
          [
            '2022-12-21T00:00:00.000Z',
            4,
            1641700,
            '43.135233333333'
          ],
          [
            '2023-01-17T00:00:00.000Z',
            4,
            1650932,
            '43.135233333333'
          ],
          [
            '2023-01-24T00:00:00.000Z',
            1,
            1655562,
            '58.8784'
          ],
          [
            '2023-02-13T00:00:00.000Z',
            1,
            1674999,
            '58.8784'
          ],
          [
            '2023-03-20T00:00:00.000Z',
            1,
            1705585,
            '58.8784'
          ],
          [
            '2023-04-03T00:00:00.000Z',
            1,
            1716389,
            '58.8784'
          ],
          [
            '2023-05-08T00:00:00.000Z',
            4,
            1772916,
            '51.763625'
          ],
          [
            '2023-05-28T00:00:00.000Z',
            4,
            1790647,
            '51.763625'
          ],
          [
            '2023-07-12T00:00:00.000Z',
            4,
            1817615,
            '51.763625'
          ],
          [
            '2023-08-31T00:00:00.000Z',
            4,
            1816533,
            '51.763625'
          ]
        ],
        selectedMode: 'single',
        symbol: 'circle',
        symbolSize: 3,
        lineStyle: {
          width: 3,
          color: '#0071bc'
        },
        emphasis: {
          scale: 4
        },
        markPoint: {
          data: [
            {
              type: 'min',
              name: 'min'
            }
          ]
        },
        markLine: {
          symbol: [
            'none',
            'none'
          ],
          label: {
            show: true,
            position: 'start',
            formatter: '{b}'
          },
          silent: true,
          data: [
            {
              name: 'RMAAA',
              xAxis: '2019-02-19T00:00:00.000Z'
            },
            {
              name: 'RMBBB',
              xAxis: '2021-12-07T00:00:00.000Z'
            }
          ]
        }
      },
      {
        type: 'line',
        name: 'spada',
        smooth: false,
        data: [
          [
            '2017-11-05T00:00:00.000Z',
            93,
            1277485,
            '2.14575'
          ],
          [
            '2018-02-20T00:00:00.000Z',
            44,
            1279123,
            '10.981'
          ],
          [
            '2018-04-27T00:00:00.000Z',
            50,
            1280379,
            '13.218'
          ],
          [
            '2018-05-15T00:00:00.000Z',
            50,
            1281750,
            '13.218'
          ],
          [
            '2018-06-05T00:00:00.000Z',
            52,
            1283062,
            '14.3710875'
          ],
          [
            '2018-08-31T00:00:00.000Z',
            52,
            1267511,
            '14.3710875'
          ],
          [
            '2018-09-01T00:00:00.000Z',
            51,
            1291772,
            '14.3710875'
          ],
          [
            '2019-01-22T00:00:00.000Z',
            47,
            1269969,
            '16.5892125'
          ],
          [
            '2019-02-19T00:00:00.000Z',
            44,
            1271331,
            '16.3282125'
          ],
          [
            '2019-03-12T00:00:00.000Z',
            44,
            1288261,
            '16.804375'
          ],
          [
            '2019-05-05T00:00:00.000Z',
            27,
            1289483,
            '18.654125'
          ],
          [
            '2019-08-31T00:00:00.000Z',
            27,
            1290599,
            '18.654125'
          ],
          [
            '2019-09-01T00:00:00.000Z',
            26,
            1296798,
            '18.654125'
          ],
          [
            '2019-10-28T00:00:00.000Z',
            30,
            1284274,
            '18.20425'
          ],
          [
            '2019-12-17T00:00:00.000Z',
            21,
            1285369,
            '21.40775'
          ],
          [
            '2020-01-29T00:00:00.000Z',
            19,
            1286185,
            '24.34'
          ],
          [
            '2020-07-03T00:00:00.000Z',
            18,
            1287289,
            '30.925'
          ],
          [
            '2020-09-01T00:00:00.000Z',
            18,
            1294817,
            '30.925'
          ],
          [
            '2021-05-18T00:00:00.000Z',
            22,
            1297889,
            '15.4625'
          ],
          [
            '2021-06-09T00:00:00.000Z',
            16,
            1298832,
            '31.9235'
          ],
          [
            '2021-07-02T00:00:00.000Z',
            18,
            1299846,
            '34.1714'
          ],
          [
            '2021-08-31T00:00:00.000Z',
            18,
            1293793,
            '34.1714'
          ],
          [
            '2021-09-01T00:00:00.000Z',
            16,
            1295711,
            '34.1714'
          ],
          [
            '2021-12-07T00:00:00.000Z',
            6,
            1356916,
            '52.0572125'
          ],
          [
            '2022-01-18T00:00:00.000Z',
            6,
            1410982,
            '46.726'
          ],
          [
            '2022-03-10T00:00:00.000Z',
            8,
            1455194,
            '46.726'
          ],
          [
            '2022-05-10T00:00:00.000Z',
            7,
            1499420,
            '46.726'
          ],
          [
            '2022-06-18T00:00:00.000Z',
            11,
            1531485,
            '42.4028'
          ],
          [
            '2022-09-01T00:00:00.000Z',
            11,
            1582509,
            '42.4028'
          ],
          [
            '2022-11-02T00:00:00.000Z',
            13,
            1596138,
            '42.4028'
          ],
          [
            '2022-11-19T00:00:00.000Z',
            13,
            1611751,
            '42.4028'
          ],
          [
            '2022-12-12T00:00:00.000Z',
            18,
            1634049,
            '24.798925'
          ],
          [
            '2022-12-21T00:00:00.000Z',
            22,
            1641801,
            '24.798925'
          ],
          [
            '2023-01-17T00:00:00.000Z',
            27,
            1651065,
            '16.907466666667'
          ],
          [
            '2023-01-24T00:00:00.000Z',
            32,
            1655707,
            '16.907466666667'
          ],
          [
            '2023-02-13T00:00:00.000Z',
            44,
            1675172,
            '14.3388'
          ],
          [
            '2023-03-02T00:00:00.000Z',
            44,
            1688274,
            '14.3388'
          ],
          [
            '2023-04-03T00:00:00.000Z',
            57,
            1716594,
            '11.613466666667'
          ],
          [
            '2023-04-16T00:00:00.000Z',
            57,
            1734953,
            '11.613466666667'
          ],
          [
            '2023-05-08T00:00:00.000Z',
            78,
            1773162,
            '5.2833333333333'
          ],
          [
            '2023-05-28T00:00:00.000Z',
            78,
            1790893,
            '5.2833333333333'
          ],
          [
            '2023-07-12T00:00:00.000Z',
            78,
            1817861,
            '5.2833333333333'
          ],
          [
            '2023-08-31T00:00:00.000Z',
            78,
            1816779,
            '5.2833333333333'
          ]
        ],
        selectedMode: 'single',
        symbol: 'circle',
        symbolSize: 3,
        lineStyle: {
          width: 3,
          color: '#ebc42b'
        },
        emphasis: {
          scale: 4
        },
        markPoint: {
          data: [
            {
              type: 'min',
              name: 'min'
            }
          ]
        },
        markLine: {
          symbol: [
            'none',
            'none'
          ],
          label: {
            show: true,
            position: 'start',
            formatter: '{b}'
          },
          silent: true,
          data: [
            {
              name: 'RMAAA',
              xAxis: '2017-11-05T00:00:00.000Z'
            },
            {
              name: 'RMBBB',
              xAxis: '2021-12-07T00:00:00.000Z'
            }
          ]
        }
      }
    ]
  }

  return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={0} paddingY={4} textAlign='center' sx={{ background: 'linear-gradient(135deg,#0071bc,#0053bc)', color: '#ffffff', borderBottom: '15px solid #0071bc' }}>
                <Grid xs={12}>
                    <Typography variant="h3" component="h1" fontSize='1.8rem!important' fontWeight={700} marginBottom='0.6em'>
                    ROSSI MARIO
                    </Typography>
                </Grid>
                <Grid xs={12}>
                    <Typography variant="subtitle1" component="h1" fontSize='12px' textTransform='uppercase'>
                        Associazione Scherma ASD
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={0} paddingY={4}>
                <Grid xs={12}>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={2}
                        color='#fff'
                    >
                        <Card sx={{ background: 'linear-gradient(135deg,#0071bc,#0053bc)' }}>
                            <CardContent>
                                <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={0.5}
                                color='#fff'
                                >
                                    <Typography variant="h3" fontWeight={600} fontSize='1.4rem!important'>
                                        <br></br>
                                        000000
                                    </Typography>
                                    <Typography variant="body2" lineHeight={0.8} textTransform='uppercase'>
                                    codice fis
                                    </Typography>
                                </Stack>

                            </CardContent>
                        </Card>
                        <Card sx={{ background: 'linear-gradient(135deg,#0071bc,#0053bc)' }}>
                            <CardContent>
                                <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={0.5}
                                color='#fff'
                                textAlign='center'
                                >
                                    <Typography variant="h3" fontWeight={600} fontSize='1.4rem!important'>
                                        assoluti
                                        <br></br>
                                        master cat.0
                                    </Typography>
                                    <Typography variant="body2" lineHeight={0.8} textTransform='uppercase'>
                                    categoria
                                    </Typography>
                                </Stack>

                            </CardContent>
                        </Card>
                        <Card sx={{ background: 'linear-gradient(135deg,#0071bc,#0053bc)' }}>
                            <CardContent>
                                <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={0.5}
                                color='#fff'
                                textAlign='center'
                                >
                                    <Typography variant="h3" fontWeight={600} fontSize='1.4rem!important'>
                                        fioretto
                                        <br></br>
                                        spada
                                    </Typography>
                                    <Typography variant="body2" lineHeight={0.8} textTransform='uppercase'>
                                    specialità
                                    </Typography>
                                </Stack>

                            </CardContent>
                        </Card>

                    </Stack>
                </Grid>
            </Grid>

            <Grid container spacing={2} paddingY={2} paddingX='15vw'>
                <Grid container xs={6} sx={{ background: '#eff9fe' }}>
                    <Grid xs={12}>
                        <Typography variant='h5' fontSize='1.4rem!important' fontWeight={700} textTransform='uppercase' align='center' color='#182983'>
                            Ranking attuali
                        </Typography>
                    </Grid>
                    <Grid xs={12}>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            justifyItems='stretch'
                            alignItems="stretch"
                            spacing={2}
                        >
                            <Card sx={{ background: 'linear-gradient(135deg,#0071bc,#0053bc)' }}>
                                <CardContent>
                                    <Stack
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="flex-end"
                                    spacing={0.5}
                                    color='#fff'
                                    >
                                        <Typography variant="h3" fontWeight={700} lineHeight='0.72'>
                                            47
                                        </Typography>
                                        <Typography variant="body2" lineHeight={0.8}>
                                        spm<br></br>assoluti
                                        </Typography>
                                    </Stack>

                                </CardContent>
                            </Card>
                            <Card sx={{ background: 'linear-gradient(135deg,#0071bc,#0053bc)' }} >
                                <CardContent>
                                    <Stack
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="flex-end"
                                    spacing={0.5}
                                    color='#fff'
                                    >
                                        <Typography variant="h3" fontWeight={700} lineHeight='0.72'>
                                            5
                                        </Typography>
                                        <Typography variant="body2" lineHeight={0.8}>
                                        spm<br></br>master cat.0
                                        </Typography>
                                    </Stack>

                                </CardContent>
                            </Card>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container xs={6} sx={{ background: 'linear-gradient(135deg,#0071bc,#0053bc)' }}>
                    <Grid xs={12}>
                        <Typography variant='h5' fontSize='1.4rem!important' fontWeight={700} textTransform='uppercase' align='center' color='#ebc42b'>
                            Ultimi risultati
                        </Typography>
                    </Grid>
                    <Grid xs={12}>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="stretch"
                            spacing={2}
                        >
                            <Card>
                                <CardContent>
                                    <Stack
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="flex-end"
                                    spacing={0.5}
                                    >
                                        <Typography variant="h3" color='#182983' fontWeight={700} lineHeight='0.72'>
                                            7
                                        </Typography>
                                        <Typography variant="body2" lineHeight={0.8}>
                                        spm <br></br>
                                        prova nazionale assoluti
                                        </Typography>
                                    </Stack>

                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent>
                                    <Stack
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="flex-end"
                                    spacing={0.5}
                                    >
                                        <Typography variant="h3" color='#182983' fontWeight={700} lineHeight='0.72'>
                                            2
                                        </Typography>
                                        <Typography variant="body2" lineHeight={0.8}>
                                        fm <br></br>
                                        3ª prova master
                                        </Typography>
                                    </Stack>

                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent>
                                    <Stack
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="flex-end"
                                    spacing={0.5}
                                    >
                                        <Typography variant="h3" color='#182983' fontWeight={700} lineHeight='0.72'>
                                            12
                                        </Typography>
                                        <Typography variant="body2" lineHeight={0.8}>
                                        spm <br></br>
                                        3ª prova master
                                        </Typography>
                                    </Stack>

                                </CardContent>
                            </Card>
                        </Stack>
                    </Grid>
                </Grid>

            </Grid>

            <Grid container spacing={0} paddingY={4} marginTop={4} textAlign='center' sx={{ background: 'linear-gradient(135deg,#0071bc,#0053bc)', color: '#ffffff' }}>
                <Grid xs={12}>
                    <Typography variant="h3" component="h1" fontSize='1.8rem!important' fontWeight={700} marginBottom='0em'>
                    STORICO
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={0} paddingX='15vw'>
                <Grid xs={12} paddingBottom={2} textAlign='center' alignSelf='center'>
                    <Typography variant='subtitle1'>
                        Seleziona la categoria
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent='center'
                        spacing={1}
                        >
                        <Chip label="Cadetti" variant="outlined" color='primary' />
                        <Chip label="Giovani" variant="outlined" color='primary' />
                        <Chip label="Assoluti" variant="outlined" color='primary' />
                        <Chip label="Master" variant="filled" color='primary' />
                    </Stack>
                </Grid>
                <Grid xs={12} paddingBottom={2}>
                    <Card sx={{ background: '#eff9fe', borderRadius: 0, boxShadow: 'none' }} >
                        <CardContent>
                            <Typography variant='h6' fontSize='1.4rem!important' fontWeight={700} textTransform='uppercase' align='center' color='#182983' gutterBottom>
                            Storico ranking
                            </Typography>
                            <LineEchart
                                option={option}
                                style={{ height: '100%', minHeight: '50vh', maxHeight: '50vh' }}
                            />
                        </CardContent>
                        </Card>
                </Grid>
                <Grid xs={12} paddingX={2}>
                    <Card>
                        <CardContent>
                            <Typography variant='h6' gutterBottom>
                                Storico club
                            </Typography>
                            <LineEchart
                                option={option}
                                style={{ height: '100%', minHeight: '50vh', maxHeight: '50vh' }}
                            />
                        </CardContent>
                        </Card>
                </Grid>

            </Grid>

        </Box>
  )
}
