import { IconVs } from '@tabler/icons-react';
import { DonutChart, DonutChartCell } from '@mantine/charts';
import { ColorSwatch, Flex, Group, Paper, Text, ThemeIcon, useMantineTheme } from '@mantine/core';
import { MatchesForStatsResponse } from '@/api/modules/stats/interfaces';
import classes from './index.module.css';

export interface MatchStatsCardProps {
  stats: MatchesForStatsResponse | undefined;
}

export function MatchStatsCard({ stats }: MatchStatsCardProps) {
  if (stats === undefined) {
    return null;
  }

  const theme = useMantineTheme();
  const colors = [theme.colors.violet[5], theme.colors.orange[5]];

  const totalMatches = stats.directElimination + stats.pool;
  const data: DonutChartCell[] = [
    {
      name: 'Diretta',
      value: stats.directElimination,
      color: colors[0],
    },
    {
      name: 'Girone',
      value: stats.pool,
      color: colors[1],
    },
  ];

  return (
    <Paper radius="md" withBorder className={classes.card} mt={20}>
      <ThemeIcon className={classes.icon} size={60} radius={60}>
        <IconVs size={32} stroke={1.5} />
      </ThemeIcon>
      <Text ta="center" fw={700} className={classes.title}>
        Assalti
      </Text>
      <Text c="dimmed" ta="center" fz="sm">
        {totalMatches}
      </Text>

      <Group justify="center" mt="md">
        {data.map((stat) => (
          <Flex key={stat.name} align="center" mr="xs">
            <ColorSwatch size={16} color={stat.color} withShadow={false} mr={6} />
            <Text c="dimmed" fz="sm">
              {stat.name}
            </Text>
          </Flex>
        ))}
      </Group>

      <Flex justify="center">
        <DonutChart
          paddingAngle={2.5}
          data={data}
          labelsType="percent"
          withTooltip={false}
          withLabels
          pieProps={{ cornerRadius: 5 }}
        />
      </Flex>
    </Paper>
  );
}
