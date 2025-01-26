import { useMemo } from 'react';
import { Flex, Paper, SimpleGrid, Skeleton, Stack, Text } from '@mantine/core';
import { Row } from '@/api/modules/ranking/interfaces';
import BaseInfoTooltip from '@/components/Tooltips/BaseInfoTooltip';

interface ShortStatsCardProps {
  rows?: Row[];
}

export default function ShortStatsCard({ rows }: ShortStatsCardProps): JSX.Element {
  const { avgYear, medianYear, athletes, oldestMember, newestMember, clubs } = useMemo(() => {
    if (!rows || !rows.length) {
      return {};
    }

    const athletes = rows.length;
    const clubs = new Set(rows.map((row) => row.club.codeLetter)).size;
    const avgYear = rows.reduce((acc, curr) => acc + curr.athlete.birthYear, 0) / athletes;
    const oldestMember = rows.reduce((acc, curr) =>
      acc.athlete.fisCode < curr.athlete.fisCode ? acc : curr
    );
    const newestMember = rows.reduce((acc, curr) =>
      acc.athlete.fisCode > curr.athlete.fisCode ? acc : curr
    );

    const sortedByYear = rows.sort((a, b) => a.athlete.birthYear - b.athlete.birthYear);
    const half = Math.floor(athletes / 2);

    const medianYear =
      athletes % 2
        ? sortedByYear[half].athlete.birthYear
        : (sortedByYear[half - 1].athlete.birthYear + sortedByYear[half].athlete.birthYear) / 2;

    return { athletes, avgYear, medianYear, oldestMember, newestMember, clubs };
  }, [rows]);

  return (
    <Paper radius="xl" p="md">
      <Flex direction="column" gap="md" justify="center" align="center" ta="center" mx="md">
        <SimpleGrid cols={2} w="100%">
          <Stack gap={0}>
            {athletes ? (
              <Text fw="bold" size="md">
                {athletes}
              </Text>
            ) : (
              <Skeleton height={20} width="100%" />
            )}
            <Text c="dimmed" size="xs" tt="uppercase" fw="bold">
              Atleti
            </Text>
          </Stack>
          <Stack gap={0}>
            {clubs ? (
              <Text fw="bold" size="md">
                {clubs}
              </Text>
            ) : (
              <Skeleton height={20} width="100%" />
            )}
            <Text c="dimmed" size="xs" tt="uppercase" fw="bold">
              Club
            </Text>
          </Stack>
        </SimpleGrid>
        <SimpleGrid cols={2} w="100%">
          <Stack gap={0}>
            {avgYear ? (
              <Text fw="bold" size="md">
                {Math.round(avgYear)}
              </Text>
            ) : (
              <Skeleton height={20} width="100%" />
            )}
            <Text c="dimmed" size="xs" tt="uppercase" fw="bold">
              Media anno
            </Text>
          </Stack>
          <Stack gap={0}>
            {medianYear ? (
              <Text fw="bold" size="md">
                {Math.round(medianYear)}
              </Text>
            ) : (
              <Skeleton height={20} width="100%" />
            )}
            <Text c="dimmed" size="xs" tt="uppercase" fw="bold" pos="relative">
              Mediana anno
              <BaseInfoTooltip text="La mediana è il valore centrale di un insieme di dati ordinati." />
            </Text>
          </Stack>
        </SimpleGrid>
        <Stack gap={0}>
          {oldestMember ? (
            <Text fw="bold" size="md">
              {oldestMember.athlete.fullName}
            </Text>
          ) : (
            <Skeleton height={20} width="100%" />
          )}
          <Text c="dimmed" size="xs" tt="uppercase" fw="bold" pos="relative">
            Tesserato meno recente
            <BaseInfoTooltip text="Il tesserato con la tessera FIS più bassa." />
          </Text>
        </Stack>
        <Stack gap={0}>
          {newestMember ? (
            <Text fw="bold" size="md">
              {newestMember.athlete.fullName}
            </Text>
          ) : (
            <Skeleton height={20} width="100%" />
          )}
          <Text c="dimmed" size="xs" tt="uppercase" fw="bold">
            Tesserato più recente
            <BaseInfoTooltip text="Il tesserato con la tessera FIS più alta." />
          </Text>
        </Stack>
      </Flex>
    </Paper>
  );
}
