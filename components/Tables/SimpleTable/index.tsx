import { useMemo } from 'react';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { MRT_Localization_IT } from 'mantine-react-table/locales/it';

interface SimpleTableProps<T extends Record<string, any>> {
  data: T[] | undefined;
  isError: boolean;
  isLoading: boolean;
  headers: Record<keyof T, string>;
}

export default function SimpleTable<T extends Record<string, any>>({
  data,
  isError,
  isLoading,
  headers,
}: SimpleTableProps<T>): JSX.Element {
  const columns = useMemo<MRT_ColumnDef<T>[]>(
    () =>
      Object.keys(headers).map<MRT_ColumnDef<T>>((key) => ({
        accessorKey: key as string,
        header: headers[key as keyof T],
      })),
    [headers]
  );

  const table = useMantineReactTable({
    columns,
    data: data ?? [],
    localization: MRT_Localization_IT,
    enableSorting: false,
    enableMultiSort: false,
    enableColumnActions: false,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableColumnFilters: false,
    enableExpanding: false,
    enableExpandAll: false,
    enableToolbarInternalActions: false,
    initialState: {
      sorting: [{ id: Object.keys(headers)[0], desc: false }],
      pagination: { pageSize: 5, pageIndex: 0 },
    },
    state: {
      density: 'xs',
      showGlobalFilter: true,

      isLoading,
      showAlertBanner: isError,
    },
    defaultColumn: {
      minSize: 20,
      maxSize: 100,
      size: 0,
    },
    mantineToolbarAlertBannerProps: isError
      ? {
          color: 'red',
          title: 'Errore nel caricamento dei dati',
        }
      : undefined,
    mantinePaperProps: {
      shadow: 'none', //use a larger shadow
      withBorder: false,
    },
    mantinePaginationProps: {
      showRowsPerPage: false,
    },
  });

  return <MantineReactTable table={table} />;
}
