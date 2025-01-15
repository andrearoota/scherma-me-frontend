'use client';

import { useRouter } from 'next/navigation';
import { IconArrowRight } from '@tabler/icons-react';
import { Box, Button, Center, Container, Grid, Text, Title, useMantineTheme } from '@mantine/core';
import { StatsApi } from '@/api';
import { AthleteStatsCard } from '../Cards/AthleteStatsCard';
import { BirthdaysCard } from '../Cards/BirthdaysCard';
import { ClubStatsCard } from '../Cards/ClubStatsCard';
import { MatchStatsCard } from '../Cards/MatchStatsCard';
import { PointStatsCard } from '../Cards/PointStatsCard';
import { SearchHomeControl } from '../Search/SearchButton/SearchHomeControl';
import classes from './Welcome.module.css';

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
    route: '/ranking/palalimpici',
  },
  {
    title: 'Non vedenti',
    route: '/ranking/non-vedenti',
  },
];

export function Welcome() {
  const theme = useMantineTheme();
  const generalStats = StatsApi.useGeneralStats();
  const router = useRouter();

  return (
    <>
      <Box h="calc(100vh - 65px)" display="flex" style={{ flexDirection: 'column' }}>
        <Center h="100%">
          <div>
            <Title className={classes.title} ta="center">
              Quanto sei nel{' '}
              <Text
                inherit
                variant="gradient"
                component="span"
                gradient={{
                  from: theme.colors.schermaMePrimary[6],
                  to: theme.colors.schermaMePrimary[9],
                }}
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
                  component="a"
                  href={props.route}
                  onClick={(event) => {
                    event.preventDefault();
                    router.push(props.route);
                  }}
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
