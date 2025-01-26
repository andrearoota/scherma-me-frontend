'use client';

import Link from 'next/link';
import { IconBrandFacebook, IconBrandInstagram } from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  Container,
  Flex,
  Group,
  SimpleGrid,
  Text,
  useComputedColorScheme,
} from '@mantine/core';
import LogoOnDark from '@/assets/logo/logoOnDark';
import LogoOnLight from '@/assets/logo/logoOnLight';
import classes from './index.module.css';

const sections = [
  { label: 'Chi sono', link: 'https://www.linkedin.com/in/andrea-rota-6a2328146/' },
  { label: 'Contattami', link: 'mailto:andrea.rota.98@gmail.com' },
  { label: 'Supporta il progetto', link: 'https://paypal.me/rota98?locale.x=it_IT' },
];

export function Footer() {
  const isDark = useComputedColorScheme() === 'dark';
  const thisYear = new Date().getFullYear();

  const links = sections.map((link, index) => (
    <Text size="md" key={index} className={classes.link} component={Link} href={link.link}>
      {link.label}
    </Text>
  ));

  return (
    <footer className={classes.footer}>
      <Container>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <Box ta={{ base: 'center', sm: 'left' }}>
            <Link href="/">
              {isDark ? <LogoOnDark height={30} /> : <LogoOnLight height={30} />}
            </Link>

            <Text size="sm" c="dimmed">
              Questo progetto è nato con l'obiettivo di dare forma ai ranking Excel pubblicati dalla{' '}
              <Text
                component="a"
                href="https://federscherma.it/"
                rel="noreferrer noopener"
                target="_blank"
              >
                Federazione Italiana Scherma
              </Text>
              , pertanto ogni dato presente in scherma.me è liberamente consultabile dal sito
              ufficiale FIS
            </Text>
          </Box>
          <Flex
            direction="column"
            align={{ base: 'center', sm: 'flex-end' }}
            justify={{ base: 'center', sm: 'flex-end' }}
            gap="md"
          >
            {links}
          </Flex>
        </SimpleGrid>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © {thisYear}{' '}
          <Text
            component="a"
            href="https://www.linkedin.com/in/andrea-rota-6a2328146/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Andrea Rota
          </Text>
          . Tutti i diritti riservati.
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandFacebook size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
