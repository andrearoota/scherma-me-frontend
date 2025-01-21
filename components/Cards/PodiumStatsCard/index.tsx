import { useMemo } from 'react';
import Link from 'next/link';
import { IconArrowRight, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { Badge, Button, Collapse, Divider, Flex, Paper, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Podium, { PodiumProps } from '@/components/Podium';
import SimpleTable from '@/components/Tables/SimpleTable';

interface PodiumStatsCardProps<T extends Record<string, any>> {
  title: string;
  badge?: string;
  tableData?: T[] | undefined;
  headers?: Record<keyof T, string>;
  url?: string;
  rank: PodiumProps['rank'];
}

export default function PodiumStatsCard<T extends Record<string, any>>({
  title,
  tableData,
  headers,
  url,
  badge,
  rank,
}: PodiumStatsCardProps<T>): JSX.Element {
  const [opened, { toggle }] = useDisclosure(false);

  const table = useMemo(
    () =>
      tableData && headers ? (
        <SimpleTable headers={headers} data={tableData} isError={false} isLoading={false} />
      ) : null,
    [tableData]
  );

  return (
    <Paper radius="xl" p="md" pb={opened ? 0 : 'md'}>
      <Stack gap="md">
        <Flex justify="space-between">
          <Title order={3}>{title}</Title>
          {badge && <Badge>{badge}</Badge>}
        </Flex>
        <Podium rank={rank} />
        <Flex justify="flex-end" gap="md">
          {table && (
            <Button
              variant="light"
              size="xs"
              onClick={toggle}
              rightSection={
                opened ? (
                  <IconChevronUp size={20} stroke={1.5} />
                ) : (
                  <IconChevronDown size={20} stroke={1.5} />
                )
              }
            >
              Esplora i dati
            </Button>
          )}
          {url && (
            <Button
              variant="gradient"
              size="xs"
              component={Link}
              href={url}
              rightSection={<IconArrowRight size={14} />}
            >
              Approfondisci
            </Button>
          )}
        </Flex>
      </Stack>
      <Collapse mt="md" in={opened}>
        <Divider mb="xs" />
        {table}
      </Collapse>
    </Paper>
  );
}
