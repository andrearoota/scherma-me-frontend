import { IconFriends } from '@tabler/icons-react';
import { DonutChart } from '@mantine/charts';
import { ColorSwatch, Flex, Group, Paper, Text, ThemeIcon, useMantineTheme } from '@mantine/core';
import { AthletesForStatsResponse } from '@/api/modules/stats/interfaces';
import classes from './index.module.css';

export interface AthleteStatsCardProps {
  stats: AthletesForStatsResponse[];
}

export function AthleteStatsCard({ stats }: AthleteStatsCardProps) {
  const theme = useMantineTheme();
  const colors = [theme.colors.violet[5], theme.colors.orange[5]];

  const totalAthletes = stats.reduce((acc, curr) => acc + curr.count, 0);
  const data = stats.map((stat, index) => ({
    name: stat.gender,
    value: stat.count,
    color: colors[index],
  }));
  return (
    <Paper radius="md" withBorder className={classes.card} mt={20}>
      <ThemeIcon className={classes.icon} size={60} radius={60}>
        <IconFriends size={32} stroke={1.5} />
      </ThemeIcon>
      <Text ta="center" fw={700} className={classes.title}>
        Atleti in attività
      </Text>
      <Text c="dimmed" ta="center" fz="sm">
        {totalAthletes} in totale
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
