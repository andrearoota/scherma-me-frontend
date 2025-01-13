import { IconArrowRight, IconCalendarMonth } from '@tabler/icons-react';
import { Badge, Button, Card, Center, Grid, Group, Text, Title } from '@mantine/core';
import CirclePacking, { CirclePackingDatum } from '../Charts/PackedBubbleChart';
import classes from './index.module.css';

export type PreviewRankCardProps = {
  title: string;
  date: string;
  total: number;
  stats: CirclePackingDatum;
  route: string;
};

export function PreviewRankCard({ title, date, total, stats, route }: PreviewRankCardProps) {
  return (
    <Card withBorder p="xl" radius="md" ta="center" className={classes.card}>
      <Title order={3}>{title}</Title>
      <Badge leftSection={<IconCalendarMonth size={14} />} mx="auto" variant="light">
        {date}
      </Badge>

      <Grid my="sm">
        <Grid.Col span={{ base: 3, md: 4 }}>
          <Center h="100%">
            <div>
              <Title order={4}>{total}</Title>
              <Text fz="xs" c="dimmed">
                Atleti
              </Text>
            </div>
          </Center>
        </Grid.Col>
        <Grid.Col
          span={{ base: 9, md: 8 }}
          style={{
            height: '10rem',
          }}
        >
          <CirclePacking data={stats} />
        </Grid.Col>
      </Grid>

      <Button rightSection={<IconArrowRight size={14} />}>Ranking</Button>
    </Card>
  );
}
