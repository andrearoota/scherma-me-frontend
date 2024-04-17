// !!! DISINSTALLA MONTSERRAT !!!
//
//
// React
import * as React from 'react'
// @mui
import Box from '@mui/material/Box'
import { Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2' // Grid version 2
import { useMemo } from 'react'
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import DownloadIcon from '@mui/icons-material/Download'

// example data type
interface Competition {
  date: string
  weapon: string
  place: string
  state: string
  name: string
  type: string
  category: string
}

const data: Competition[] = [
  {
    date: '21-22 ott 2023',
    weapon: '6 armi',
    place: 'sedi a cura CR',
    state: 'ITA',
    name: '1ª prova Regionale/Interregionale GPG',
    type: 'Gare Regionali o Interregionali',
    category: 'U14'
  },
  {
    date: '2-3 dic 2023',
    weapon: 'sc',
    place: 'S. Severo',
    state: 'ITA',
    name: '1ª prova Gran Prix Kinder Joy of Moving',
    type: 'Calendario Nazionale',
    category: 'U14'
  },
  {
    date: '9-10 dic 2023',
    weapon: 'f',
    place: 'Ancona',
    state: 'ITA',
    name: '1ª prova Gran Prix Kinder Joy of Moving',
    type: 'Calendario Nazionale',
    category: 'U14'
  },
  {
    date: '13-14 gen 2024',
    weapon: '6 armi',
    place: 'sedi a cura CR',
    state: 'ITA',
    name: '2ª prova Regionale/Interregionale GPG',
    type: 'Calendario Nazionale',
    category: 'U14'
  }
]

export default function TestCalendar (): JSX.Element {
  const columns = useMemo<Array<MRT_ColumnDef<Competition>>>(
    () => [
      {
        accessorKey: 'date', // access nested data with dot notation
        header: 'Data',
        size: 100
      },
      {
        accessorKey: 'weapon',
        header: 'Armi',
        size: 90
      },
      {
        accessorKey: 'place', // normal accessorKey
        header: 'Luogo',
        size: 110
      },
      {
        accessorKey: 'state',
        header: 'Stato',
        size: 71
      },
      {
        accessorKey: 'name',
        header: 'Nome',
        size: 280
      },
      {
        accessorKey: 'type',
        header: 'Tipologia',
        size: 220
      },
      {
        accessorKey: 'category',
        header: 'cat.',
        size: 55
      },
      {
        header: ' ',
        enableColumnActions: false,
        size: 250,
        muiTableBodyCellProps: ({
          cell
        }) => ({
          sx: {
            justifyContent: 'start'
          }
        }),
        Cell: () => <>
        <Button variant="contained" size='small' sx={{ borderRadius: '10rem', marginRight: '0.5rem', backgroundColor: '#182983', boxShadow: 'none' }}>Comunicato</Button>
        <Button variant="contained" size='small' sx={{ borderRadius: '10rem', backgroundColor: '#ebc42b', boxShadow: 'none' }}>Diretta gara</Button>
        </>
      }
    ],
    []
  )

  return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={0}>
                <Grid xs={12} paddingBottom={2} textAlign='center' alignSelf='center'>
                    <Typography variant='subtitle1'>
                        Seleziona la categoria
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent='center'
                        spacing={1}
                        >
                        <Chip label="Under 14" variant="filled" color='primary' />
                        <Chip label="Cadetti" variant="outlined" color='primary' />
                        <Chip label="Giovani" variant="outlined" color='primary' />
                        <Chip label="Under 23" variant="outlined" color='primary' />
                        <Chip label="Assoluti" variant="outlined" color='primary' />
                        <Chip label="Master" variant="outlined" color='primary' />
                        <Chip label="Paralimpico" variant="outlined" color='primary' />
                    </Stack>
                </Grid>
                <Grid xs={12} paddingBottom={2} textAlign='center' alignSelf='center'>
                    <Typography variant='subtitle1'>
                        {'Seleziona l\'arma'}
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent='center'
                        spacing={1}
                        >
                        <Chip label="Fioretto" variant="filled" color='primary' />
                        <Chip label="Sciabola" variant="filled" color='primary' />
                        <Chip label="Spada" variant="outlined" color='primary' />
                    </Stack>
                </Grid>
                <Grid xs={12} paddingBottom={2}>
                    <Card sx={{ background: '#eff9fe', borderRadius: 0, boxShadow: 'none' }} >
                        <CardContent>
                            <Stack
                              direction='row'
                              justifyContent='flex-end'
                              >
                                 <Button variant="contained" size='medium' endIcon={<DownloadIcon />} sx={{ borderRadius: '10rem', marginRight: '0.5rem', backgroundColor: '#182983', boxShadow: 'none' }}>
                                  Scarica calendario
                                 </Button>
                              </Stack>
                            <MaterialReactTable
                              columns={columns}
                              data={data}
                              layoutMode='grid'
                              enableTopToolbar={false}
                              enableSorting={false}
                              enableColumnActions={false}
                              muiTableHeadCellProps={{
                                sx: {
                                  flex: '0 0 auto',
                                  color: '#182983'
                                }
                              }}
                              muiTableHeadCellColumnActionsButtonProps={{
                                sx: {
                                  position: 'absolute',
                                  right: 0,
                                  top: '0.25rem'
                                }
                              }}
                              muiTableBodyCellProps={{
                                sx: {
                                  flex: '0 0 auto',
                                  justifyContent: 'center'
                                }
                              }}
                              muiTableBodyRowProps={{
                                sx: {
                                  backgroundColor: 'transparent'
                                }
                              }}
                              muiTableBodyProps={{
                                sx: {
                                  backgroundColor: 'transparent'
                                }
                              }}
                              muiTablePaperProps={{
                                sx: {
                                  backgroundColor: 'transparent',
                                  boxShadow: 'none'
                                }
                              }}
                              muiTopToolbarProps={{
                                sx: {
                                  backgroundColor: 'transparent'
                                }
                              }}
                              muiTableHeadRowProps={{
                                sx: {
                                  backgroundColor: 'transparent',
                                  textTransform: 'uppercase',
                                  fontWeight: 700,
                                  color: '#182983'
                                }
                              }}
                              />
                        </CardContent>
                        </Card>
                </Grid>
            </Grid>

        </Box>
  )
}
