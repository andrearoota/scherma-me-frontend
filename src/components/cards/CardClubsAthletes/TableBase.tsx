import { useMemo } from 'react'

import { useTheme } from '@mui/material'

import MaterialReactTable, {
  type MRT_ColumnDef
} from 'material-react-table'

import { MRT_Localization_IT } from 'material-react-table/locales/it'

// ---------------------------------------------

interface TableProps {
  data: any[] | undefined
  isError: boolean
  isLoading: boolean
}

// ---------------------------------------------

export default function TableBase ({ data, isError, isLoading }: TableProps): JSX.Element {
  const theme = useTheme()
  const columns = useMemo<Array<MRT_ColumnDef<any>>>(
    () => [
      {
        header: 'Pos.',
        disableSortBy: true,
        Cell: (props) => {
          // eslint-disable-next-line react/prop-types, @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unnecessary-type-assertion
          if (props?.table?.getState().sorting[0]?.desc) {
            // eslint-disable-next-line react/prop-types, @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unnecessary-type-assertion
            return props?.table?.getSortedRowModel()?.flatRows.indexOf(props.row as any) + 1
          }
          // eslint-disable-next-line react/prop-types, @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unnecessary-type-assertion
          const lenght = props?.table?.getSortedRowModel()?.flatRows.length
          // eslint-disable-next-line react/prop-types, @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unnecessary-type-assertion
          return lenght - props?.table?.getSortedRowModel()?.flatRows.indexOf(props.row as any)
        },
        muiTableHeadCellProps: {
          align: 'left'
        },
        muiTableBodyCellProps: {
          align: 'left'
        }
      },
      {
        accessorKey: 'name',
        header: 'Club',
        muiTableHeadCellProps: {
          align: 'left'
        },
        muiTableBodyCellProps: {
          align: 'left'
        }
      },
      {
        header: 'Atleti per sesso',
        id: 'gender',
        columns: [
          {
            header: 'Femminile',
            accessorKey: 'genderByAthletes.femminile'
          },
          {
            header: 'Maschile',
            accessorKey: 'genderByAthletes.maschile'
          }
        ]
      },
      {
        header: 'Atleti per arma',
        id: 'weapon',
        columns: [
          {
            header: 'Fioretto',
            accessorKey: 'weaponByAthletes.fioretto'
          },
          {
            header: 'Sciabola',
            accessorKey: 'weaponByAthletes.sciabola'
          },
          {
            header: 'Spada',
            accessorKey: 'weaponByAthletes.spada'
          }
        ]
      },
      {
        header: 'Totale',
        accessorKey: 'athletes'
      }
    ],
    []
  )

  return (
        <MaterialReactTable
          columns={columns}
          data={data ?? []} // data is undefined on first render
          localization={MRT_Localization_IT}
          enableColumnActions={false}
          enableFullScreenToggle={false}
          enableDensityToggle={false}
          enableSorting={true}
          enableMultiSort={true}
          enableHiding={false}
          enableColumnFilters={false}
          enableExpanding={false}
          enableExpandAll={false}
          initialState={{ sorting: [{ id: 'athletes', desc: true }] }}
          state={{ density: 'compact', isLoading }}
          rowCount={data?.length ?? 0} // Not get lenght from api because get all data
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
            align: 'right'
          }}
          muiTableBodyCellProps={{
            align: 'right'
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
