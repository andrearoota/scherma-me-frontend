import { useMemo } from 'react';
import { Flex, Paper, Skeleton, Stack, Text } from '@mantine/core';
import { Row } from '@/api/modules/ranking/interfaces';

interface ShortStatsCardProps {
  rows?: Row[];
}

export default function ShortStatsCard({ rows }: ShortStatsCardProps): JSX.Element {
  const { avgYear, count, oldestMember, newestMember } = useMemo(() => {
    if (!rows) {
      return {};
    }

    const count = rows.length;
    const avgYear = rows.reduce((acc, curr) => acc + curr.athlete.birthYear, 0) / count;
    const oldestMember = rows.reduce((acc, curr) =>
      acc.athlete.fisCode < curr.athlete.fisCode ? acc : curr
    );
    const newestMember = rows.reduce((acc, curr) =>
      acc.athlete.fisCode > curr.athlete.fisCode ? acc : curr
    );

    return { count, avgYear, oldestMember, newestMember };
  }, [rows]);

  return (
    <Paper radius="xl" p="md">
      <Flex direction="column" gap="md" justify="center" align="center" ta="center" mx="md">
        <Stack gap={0}>
          {count ? (
            <Text fw="bold" size="md">
              {count}
            </Text>
          ) : (
            <Skeleton height={20} width={120} />
          )}
          <Text c="dimmed" size="xs" tt="uppercase" fw="bold">
            Atleti
          </Text>
        </Stack>
        <Stack gap={0}>
          {avgYear ? (
            <Text fw="bold" size="md">
              {Math.round(avgYear)}
            </Text>
          ) : (
            <Skeleton height={20} width={120} />
          )}
          <Text c="dimmed" size="xs" tt="uppercase" fw="bold">
            Media anno
          </Text>
        </Stack>
        <Stack gap={0}>
          {oldestMember ? (
            <Text fw="bold" size="md">
              {oldestMember.athlete.fullName}
            </Text>
          ) : (
            <Skeleton height={20} width={120} />
          )}
          <Text c="dimmed" size="xs" tt="uppercase" fw="bold">
            Tesserato meno recente
          </Text>
        </Stack>
        <Stack gap={0}>
          {newestMember ? (
            <Text fw="bold" size="md">
              {newestMember.athlete.fullName}
            </Text>
          ) : (
            <Skeleton height={20} width={120} />
          )}
          <Text c="dimmed" size="xs" tt="uppercase" fw="bold">
            Tesserato più recente
          </Text>
        </Stack>
      </Flex>
    </Paper>
  );
}
