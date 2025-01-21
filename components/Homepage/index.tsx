'use client';

import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';
import { Box, Button, Center, Container, Grid, Text, Title } from '@mantine/core';
import { StatsApi } from '@/api';
import { SearchHomeControl } from '../Search/SearchButton/SearchHomeControl';
import { AthleteStatsCard } from './AthleteStatsCard';
import { BirthdaysCard } from './BirthdaysCard';
import { ClubStatsCard } from './ClubStatsCard';
import { MatchStatsCard } from './MatchStatsCard';
import { PointStatsCard } from './PointStatsCard';
import classes from './index.module.css';

const rankingItems = [
  {
    title: 'Under 14',
    route: '/ranking/under-14',
  },
  {
    title: 'Cadetti',
    route: '/ranking/cadetti',
  },
  {
    title: 'Giovani',
    route: '/ranking/giovani',
  },
  {
    title: 'Under 23',
    route: '/ranking/under-23',
  },
  {
    title: 'Assoluti',
    route: '/ranking/assoluti',
  },
  {
    title: 'Master',
    route: '/ranking/master',
  },
  {
    title: 'Paralimpici',
    route: '/ranking/paralimpici',
  },
  {
    title: 'Non vedenti',
    route: '/ranking/non-vedenti',
  },
];

export function Homepage() {
  const generalStats = StatsApi.useGeneralStats();

  return (
    <>
      <Box h="calc(100vh - 65px)" display="flex" style={{ flexDirection: 'column' }}>
        <Center h="100%">
          <div>
            <Title className={classes.title} ta="center">
              Quanto sei nel{' '}
              <Text
                inherit
                span
                variant="gradient"
              >
                ranking?
              </Text>
            </Title>
            <Box ta="center" mt={20}>
              <SearchHomeControl />
            </Box>
          </div>
        </Center>
        <Container fluid w="100%" my="md">
          <Grid justify="center">
            {rankingItems.map((props, index) => (
              <Grid.Col span={{ base: 6, xs: 4, sm: 'auto' }} key={index}>
                <Button
                  fullWidth
                  variant="gradient"
                  size="lg"
                  component={Link}
                  href={props.route}
                  rightSection={<IconArrowRight size={14} />}
                >
                  {props.title}
                </Button>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container fluid>
        <Grid>
          <Grid.Col span="auto">
            <BirthdaysCard birthdays={generalStats.data?.birthdays || []} />
          </Grid.Col>
          <Grid.Col span="auto">
            <ClubStatsCard stats={generalStats.data?.clubs || []} />
          </Grid.Col>
          <Grid.Col span="auto">
            <AthleteStatsCard stats={generalStats.data?.athletes || []} />
          </Grid.Col>
          <Grid.Col span="auto">
            <MatchStatsCard stats={generalStats.data?.matches} />
          </Grid.Col>
          <Grid.Col span="auto">
            <PointStatsCard stats={generalStats.data?.points} />
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
