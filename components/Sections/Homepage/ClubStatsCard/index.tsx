import { IconArrowRight, IconTimeline, IconUsersGroup } from '@tabler/icons-react';
import { BarChart } from '@mantine/charts';
import { Button, Paper, Text, ThemeIcon } from '@mantine/core';
import { ClubsForStatsResponse } from '@/api/modules/stats/interfaces';
import classes from './index.module.css';

export interface ClubStatsCardProps {
  stats: ClubsForStatsResponse[];
}

export function ClubStatsCard({ stats }: ClubStatsCardProps) {
  const clubs = stats.filter((e) => e.weapon !== 'all');

  return (
    <Paper radius="xl" withBorder className={classes.card} mt={20}>
      <ThemeIcon className={classes.icon} size={60} radius={60}>
        <IconUsersGroup size={32} stroke={1.5} />
      </ThemeIcon>
      <Text ta="center" fw={700} className={classes.title}>
        Club in attività
      </Text>
      <Text c="dimmed" ta="center" fz="sm">
        {stats.find((e) => e.weapon === 'all')?.count} in totale
      </Text>

      <BarChart
        mt="md"
        h={200}
        data={clubs}
        dataKey="weapon"
        series={[{ name: 'count', color: 'violet.6' }]}
        withBarValueLabel
        tickLine="none"
        gridAxis="none"
        withYAxis={false}
        withTooltip={false}
        barProps={{ radius: [5, 5, 0, 0] }}
      />

      <Button
        fullWidth
        variant="light"
        leftSection={<IconTimeline size={14} />}
        rightSection={<IconArrowRight size={14} />}
        mt="md"
      >
        Statistiche
      </Button>
    </Paper>
  );
}
