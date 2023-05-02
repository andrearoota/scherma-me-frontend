import { useMemo } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { Stack, useTheme } from '@mui/material'

import MaterialReactTable, {
  type MRT_ColumnDef
} from 'material-react-table'

import { MRT_Localization_IT } from 'material-react-table/locales/it'

import formatNumber from '../../../utils/formatNumber'
import { type Row, type RankingApi } from '../../../pages/Ranking'

// ---------------------------------------------

interface TableProps {
  data: RankingApi | undefined
  isError: boolean
  isLoading: boolean
}

// ---------------------------------------------

export default function TableRankingBase ({ data, isError, isLoading }: TableProps): JSX.Element {
  const theme = useTheme()
  const columns = useMemo<Array<MRT_ColumnDef<Row>>>(
    () => [
      {
        accessorKey: 'position',
        header: 'Pos',
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
      }
    ],
    []
  )

  return (
        <MaterialReactTable
            columns={columns}
            data={data?.data.rows ?? []} // data is undefined on first render
            localization={MRT_Localization_IT}
            enableColumnActions={false}
            enableFullScreenToggle={false}
            enableDensityToggle={false}
            enableSorting={false}
            enableHiding={false}
            enableColumnFilters={false}
            enableExpanding={true}
            enableExpandAll={true}
            state={{ density: 'compact', isLoading }}
            rowCount={data?.data.rows.length ?? 0} // Not get lenght from api because get all data
            renderDetailPanel={({ row }) => (
                <Box
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
                    <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>{row.original.club.name.toLowerCase() ?? row.original.club.code_letter.toUpperCase()}</Typography>
                  </Stack>
                </Box>
            )}
            defaultColumn={{
              minSize: 20, // allow columns to get smaller than default
              maxSize: 100, // allow columns to get larger than default
              size: 0 // make columns wider by default
            }}
            muiTableProps={{
              sx: {
                tableLayout: 'auto'
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
            muiTablePaginationProps={{
              rowsPerPageOptions: [10]
            }}
            muiTableHeadCellProps={{
              align: 'center'
            }}
            displayColumnDefOptions={{
              'mrt-row-expand': {
                size: 0,
                muiTableBodyCellProps: {
                  align: 'center',
                  sx: {
                    padding: 0,
                    paddingLeft: 0 // necessary for extra css
                  }
                },
                muiTableHeadCellProps: {
                  align: 'center',
                  sx: {
                    padding: 0
                  }
                }

              }
            }}
        />
  )
};
