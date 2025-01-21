import { useMemo, useState } from 'react';
import { IconArrowRight, IconInfoCircle } from '@tabler/icons-react';
import {
  MantineReactTable,
  MRT_Row,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { MRT_Localization_IT } from 'mantine-react-table/locales/it';
import { Button, Flex, NumberFormatter, Stack, Text, useMantineTheme } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { RankingResponse, Row } from '@/api/modules/ranking/interfaces';
import ModalRank from './ModalRank';

// ---------------------------------------------

interface TableProps {
  data: RankingResponse | undefined;
  isError: boolean;
  isLoading: boolean;
}

// ---------------------------------------------

export default function Table({ data, isError, isLoading }: TableProps): JSX.Element {
  const theme = useMantineTheme();
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

  const [opened, { open, close }] = useDisclosure(false);
  const [selectedRowId, setSelectedRowId] = useState<number>();
  const openModal = (row: MRT_Row<Row>) => {
    setSelectedRowId(row.original.id);
    open();
  };

  const rows = useMemo(() => {
    return data?.rows ?? [];
  }, [data]);

  // Define column configurations
  const columns = useMemo<MRT_ColumnDef<Row>[]>(() => {
    const commonColumns: MRT_ColumnDef<Row>[] = [
      {
        accessorKey: 'position',
        header: '#',
        accessorFn: (row) => {
          switch (row.position) {
            case 1:
              return '🥇';
            case 2:
              return '🥈';
            case 3:
              return '🥉';
            default:
              return row.position;
          }
        },
        sortingFn: (rowA, rowB) => rowA.original.position - rowB.original.position,
        minSize: 60,
        maxSize: 60,
        mantineTableBodyCellProps: { fw: 'bold' },
      },
      {
        accessorKey: 'athlete.fullName',
        header: 'Nome',
        grow: true,
        mantineTableBodyCellProps: { style: { whiteSpace: 'wrap' } },
        size: isDesktop ? undefined : 120,
        maxSize: Number.MAX_SAFE_INTEGER,
      },
      {
        accessorKey: 'totalPoints',
        header: 'Punti',
        Cell: ({ cell }) => (
          <NumberFormatter
            value={cell.getValue<number>()}
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={3}
            fixedDecimalScale
          />
        ),
        minSize: 0,
        size: 120,
        mantineTableBodyCellProps: { align: 'right' },
      },
    ];

    const desktopOnlyColumns: MRT_ColumnDef<Row>[] = [
      { accessorKey: 'athlete.birthYear', header: 'Anno', size: 110 },
      { accessorKey: 'athlete.fisCode', header: 'FIS', size: 110 },
      { accessorKey: 'club.codeLetter', header: 'Club', size: 110 },
    ];

    return isDesktop ? [...commonColumns, ...desktopOnlyColumns] : commonColumns;
  }, [isDesktop]);

  // Render detail panel for mobile view
  const renderDetailPanel = ({ row }: { row: MRT_Row<Row> }) => {
    if (isDesktop) {
      return null;
    }

    return (
      <Flex gap="xl">
        {[
          { label: 'Anno', value: row.original.athlete?.birthYear ?? '-' },
          { label: 'FIS', value: row.original.athlete?.fisCode ?? '-' },
          {
            label: 'Club',
            value:
              row.original.club?.name?.toLowerCase() ??
              row.original.club?.codeLetter?.toUpperCase() ??
              '-',
          },
        ].map(({ label, value }) => (
          <Stack gap={0} key={label} align="center">
            <Text size="md">{value}</Text>
            <Text c="dimmed" size="xs" tt="uppercase" fw="bold">
              {label}
            </Text>
          </Stack>
        ))}
      </Flex>
    );
  };

  // Row actions
  const renderRowActions = ({ row }: { row: MRT_Row<Row> }) => {
    return (
      <Button
        variant="light"
        size="xs"
        onClick={openModal.bind(null, row)}
        rightSection={<IconArrowRight size={14} />}
      >
        Dettagli
      </Button>
    );
  };

  const table = useMantineReactTable({
    columns,
    data: rows,
    localization: { ...MRT_Localization_IT, expand: '' },
    enableExpanding: !isDesktop,
    enableExpandAll: false,
    enableStickyHeader: true,
    enablePagination: true,
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions,
    enableDensityToggle: false,
    enableHiding: false,
    enableFullScreenToggle: false,
    enableColumnActions: false,
    layoutMode: 'grid-no-grow',
    paginationDisplayMode: 'pages',
    state: { isLoading, showAlertBanner: isError },
    initialState: {
      density: 'xs',
      sorting: [{ id: 'position', desc: false }],
    },
    renderDetailPanel: isDesktop ? undefined : renderDetailPanel,
    mantinePaperProps: { withBorder: false, shadow: 'none' },
    mantineToolbarAlertBannerProps: isError
      ? {
          icon: <IconInfoCircle />,
          variant: 'light',
          color: 'red',
          title: 'Errore nel caricamento dei dati',
        }
      : undefined,
    mantineTableBodyCellProps: { wrap: 'wrap' },
    mantinePaginationProps: {
      showRowsPerPage: false,
      siblings: 0,
      boundaries: 0,
    },
    displayColumnDefOptions: {
      'mrt-row-expand': {
        size: 40,
      },
      'mrt-row-actions': {
        header: undefined,
        size: 123,
      },
    },
  });

  return (
    <>
      <MantineReactTable table={table} />
      <ModalRank row={selectedRowId} opened={opened} onClose={close} />
    </>
  );
}
