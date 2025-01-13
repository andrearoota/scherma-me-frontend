'use client';

import { Container, Box, SimpleGrid, Text, Title, useMantineTheme } from '@mantine/core';
import { CirclePackingDatum } from '../Charts/PackedBubbleChart';
import { Header } from '../Header';
import { PreviewRankCard } from '../PreviewRankCard';
import { SearchHomeControl } from '../SearchControl/SearchHomeControl';
import classes from './Welcome.module.css';

const stats: CirclePackingDatum = {
  name: 'weapons',
  children: [
    {
      name: 'Fioretto',
      loc: Math.floor(Math.random() * 1000),
    },
    {
      name: 'Sciabola',
      loc: Math.floor(Math.random() * 1000),
    },
    {
      name: 'Spada',
      loc: Math.floor(Math.random() * 1000),
    },
  ],
};

const PreviewRankCards = [
  {
    title: 'Under 14',
    date: '12/12/2024',
    total: 1887,
    stats,
    route: '/ranking/under-14',
  },
  {
    title: 'Cadetti',
    date: '12/12/2024',
    total: 1887,
    stats,
    route: '/ranking/under-16',
  },
  {
    title: 'Giovani',
    date: '12/12/2024',
    total: 1887,
    stats,
    route: '/ranking/under-18',
  },
  {
    title: 'Under 23',
    date: '12/12/2024',
    total: 1887,
    stats,
    route: '/ranking/under-20',
  },
  {
    title: 'Assoluti',
    date: '12/12/2024',
    total: 1887,
    stats,
    route: '/ranking/senior',
  },
  {
    title: 'Master',
    date: '12/12/2024',
    total: 1887,
    stats,
    route: '/ranking/veterani',
  },
  {
    title: 'Paralimpici',
    date: '12/12/2024',
    total: 1887,
    stats,
    route: '/ranking/veterani',
  },
  {
    title: 'Non vedenti',
    date: '12/12/2024',
    total: 1887,
    stats,
    route: '/ranking/veterani',
  }
];

export function Welcome() {
  const theme = useMantineTheme();

  const previewRankCards = PreviewRankCards.map((props, index) => (
    <PreviewRankCard key={index} {...props} />
  ));
  return (
    <Container fluid>
      <Header />
      <Title className={classes.title} ta="center" mt={100}>
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
      <SimpleGrid cols={{ base: 2, md: 4 }} mt={100}>
        {previewRankCards}
      </SimpleGrid>
    </Container>
  );
}
