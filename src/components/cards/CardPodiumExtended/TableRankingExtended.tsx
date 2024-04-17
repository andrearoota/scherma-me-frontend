import { useMemo } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { Stack, useTheme } from '@mui/material'

import MaterialReactTable, {
  type MRT_ColumnDef
} from 'material-react-table'

import { MRT_Localization_IT } from 'material-react-table/locales/it'

import formatNumber from '../../../utils/formatNumber'
import { type Row, type Ranking } from '../../../pages/RankingGeneralPage'
import useResponsive from '../../../hooks/useResponsive'

// ---------------------------------------------

interface TableProps {
  data: Ranking | undefined
  isError: boolean
  isLoading: boolean
}

// ---------------------------------------------

export default function TableRankingBase ({ data, isError, isLoading }: TableProps): JSX.Element {
  const theme = useTheme()

  const isDesktop = useResponsive('up', 'lg')

  const columnsMobile = useMemo<Array<MRT_ColumnDef<Row>>>(
    () => [
      {
        accessorKey: 'position',
        header: '#',
        maxSize: 50,
        muiTableBodyCellProps: {
          align: 'center'
        }
      },
      {
        accessorKey: 'athlete.full_name',
        header: 'Nome'
      },
      {
        accessorFn: (row) => formatNumber(row.total_points),
        header: 'Punti',
        muiTableBodyCellProps: {
          align: 'right'
        }
      },
      {
        header: 'Club',
        accessorKey: 'club.code_letter',
        enableHiding: true
      }
    ],
    []
  )

  const columnsDesktop = useMemo<Array<MRT_ColumnDef<Row>>>(
    () => [
      {
        accessorKey: 'position',
        header: '#',
        maxSize: 50
        /*         muiTableBodyCellProps: {
          align: 'center'
        }
 */ },
      {
        accessorKey: 'athlete.full_name',
        header: 'Nome'
      },
      {
        accessorKey: 'athlete.birth_year',
        header: 'Anno'
      },
      {
        accessorKey: 'athlete.fis_code',
        header: 'FIS'
      },
      {
        accessorFn: (row) => formatNumber(row.total_points),
        header: 'Punti'/* ,
        muiTableBodyCellProps: {
          align: 'right'
        } */
      },
      {
        header: 'Club',
        accessorKey: 'club.code_letter',
        enableHiding: true
      }
    ],
    []
  )

  return (
        <MaterialReactTable
          columns={isDesktop ? columnsDesktop : columnsMobile}
          data={data?.data.rows ?? []} // data is undefined on first render
          localization={MRT_Localization_IT}
          enableColumnActions={true}
          enableFullScreenToggle={true}
          enableDensityToggle={true}
          enableSorting={true}
          enableHiding={true}
          enableColumnFilters={true}
          enableExpanding={!isDesktop}
          enableExpandAll={false}
          enableStickyHeader={true}
          enablePagination={false}
          enableRowVirtualization={true}
          enableColumnResizing={false}
          layoutMode="grid"
          state={{ isLoading }}
          initialState={{ density: 'compact', sorting: [{ id: 'position', desc: false }] }}
          rowCount={data?.data.rows.length ?? 0} // Not get lenght from api because get all data
          renderDetailPanel={({ row }) => (
            isDesktop
              ? false
              : <Box
                  sx={{
                    display: 'grid',
                    margin: 'auto',
                    gridTemplateColumns: '1fr 1fr 2fr',
                    width: '100%'
                  }}
              >
                <Stack spacing={0}>
                  <Typography variant='body2' sx={{ fontWeight: 'bold' }}>Anno</Typography>
                  <Typography variant='body2' >{row.original.athlete.birth_year}</Typography>
                </Stack>
                <Stack spacing={0}>
                  <Typography variant='body2' sx={{ fontWeight: 'bold' }}>FIS</Typography>
                  <Typography variant='body2' >{row.original.athlete.fis_code}</Typography>
                  </Stack>
                <Stack spacing={0}>
                  <Typography variant='body2' sx={{ fontWeight: 'bold' }}>Club</Typography>
                  <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>{row.original.club.name?.toLowerCase() ?? row.original.club.code_letter.toUpperCase()}</Typography>
                </Stack>
              </Box>
          )}
          defaultColumn={{
            minSize: 0 // allow columns to get smaller than default
          }}
          muiTableContainerProps={{
            sx: {
              minHeight: '30rem',
              height: '50vh'
            }
          }}
          muiToolbarAlertBannerProps={
              isError
                ? {
                    color: 'error',
                    children: 'Error loading data'
                  }
                : undefined
          }
          muiTablePaperProps={{
            sx: {
              boxShadow: 'none',
              border: '1px solid rgba(224, 224, 224, 1)'
            }
          }}
          muiTopToolbarProps={{
            sx: {
              borderStartStartRadius: theme.shape.borderRadius,
              borderStartEndRadius: theme.shape.borderRadius
            }
          }}
          muiBottomToolbarProps={{
            sx: {
              borderEndStartRadius: theme.shape.borderRadius,
              borderEndEndRadius: theme.shape.borderRadius
            }
          }}
          muiExpandAllButtonProps={{
            sx: {
              color: theme.palette.primary.main
            }
          }}
          muiExpandButtonProps={{
            sx: {
              color: theme.palette.primary.main
            }
          }}
          /* muiTableHeadCellProps={{
            align: 'center',
            sx: {
              flex: '0 0 auto'
            }
          }} muiTableBodyCellProps={{
            sx: {
              flex: '0 0 auto'
            }
          }} */
        />
  )
};
