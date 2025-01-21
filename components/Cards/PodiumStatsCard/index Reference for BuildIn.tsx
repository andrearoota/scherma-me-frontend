import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Link from 'next/link';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import {
  Badge,
  Box,
  Button,
  Card,
  Collapse,
  Grid,
  Skeleton,
  Text,
  Title,
} from '@mantine/core';
import { RankingApi } from '@/api';
import { Category, RankingResponse, Row } from '@/api/modules/ranking/interfaces';
import SimpleTable from '@/components/Tables/SimpleTable';
import { firstLetterCapitalize } from '@/utils';

interface CardPodiumProps {
  filter: { gender: string; weapon: string; category: Category };
  filterProv: string[];
  setRankingData: Dispatch<SetStateAction<RankingResponse[]>>;
}

export default function PodiumStatsCard({
  filter,
  setRankingData,
  filterProv,
}: CardPodiumProps): JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const [dataTable, setDataTable] = useState<RankingResponse | undefined>(undefined);

  const handleExpandClick = (): void => {
    setExpanded((prev) => !prev);
  };

  const { data, isError, isLoading } = RankingApi.useRanking(
    filter.category.name,
    filter.weapon,
    filter.gender
  );

  useEffect(() => {
    if (!isError && !isLoading) {
      setRankingData((prev) => {
        return prev.some((item) => item.id === data?.id) ? prev : [...prev, data];
      });

      const newData = JSON.parse(JSON.stringify(data));

      if (newData !== undefined) {
        newData.data.rows = newData.data.rows.reduce((previousValue: Row[], currentValue: Row) => {
          if (
            filterProv.length === 0 ||
            filterProv.some((province) => currentValue.club.codeLetter.startsWith(province))
          ) {
            return [...previousValue, currentValue];
          }
          return previousValue;
        }, []);
      }
      setDataTable(newData);
    }
  }, [data, isError, isLoading, setRankingData, filterProv]);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Box display="flex" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Title order={4}>{firstLetterCapitalize(`${filter.weapon} ${filter.gender}`)}</Title>
        <Badge>{dataTable?.category.name}</Badge>
      </Box>
      <Grid gutter="sm" align="center" justify="center" ta="center" mt="md">
        <Grid.Col span={4}>
          <Card shadow="sm" padding="sm" radius="md" withBorder>
            <Text size="xl" fw={700} color="orange">
              🥈
            </Text>
            {isLoading || isError ? (
              <Skeleton height={20} width={120} />
            ) : (
              <Text>{dataTable?.rows[1]?.athlete.fullName ?? '-'}</Text>
            )}
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card shadow="md" padding="sm" radius="md" withBorder>
            <Text size="xl" fw={700} color="yellow">
              🥇
            </Text>
            {isLoading || isError ? (
              <Skeleton height={20} width={120} />
            ) : (
              <Text>{dataTable?.rows[0]?.athlete.fullName ?? '-'}</Text>
            )}
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card shadow="sm" padding="sm" radius="md" withBorder>
            <Text size="xl" fw={700} color="teal">
              🥉
            </Text>
            {isLoading || isError ? (
              <Skeleton height={20} width={120} />
            ) : (
              <Text>{dataTable?.rows[2]?.athlete.fullName ?? '-'}</Text>
            )}
          </Card>
        </Grid.Col>
      </Grid>
      <Box mt="md" display="flex" style={{ justifyContent: 'space-between' }}>
        <Button
          variant="outline"
          component={Link}
          href={`../rankings/${dataTable?.category.name.replaceAll(' ', '').replaceAll('/', '-').toLowerCase() ?? ''}/${dataTable?.weapon.name ?? ''}/${dataTable?.gender.name ?? ''}/latest`}
        >
          Approfondisci
        </Button>
        <Button variant="subtle" size="compact-sm" onClick={handleExpandClick}>
          {expanded ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
        </Button>
      </Box>
      <Collapse in={expanded}>
        <SimpleTable data={dataTable} isError={isError} isLoading={isLoading} />
      </Collapse>
    </Card>
  );
}
