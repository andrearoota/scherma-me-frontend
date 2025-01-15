'use client';

import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from '@tabler/icons-react';
import { ActionIcon, Container, Group, Stack, Text, useComputedColorScheme } from '@mantine/core';
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
    <Text
      key={index}
      className={classes.link}
      component="a"
      href={link.link}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </Text>
  ));

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <a href="#">{isDark ? <LogoOnDark height={30} /> : <LogoOnLight height={30} />}</a>

          <Text size="xs" c="dimmed" className={classes.description}>
            Questo progetto è nato con l'obiettivo di dare forma ai ranking Excel pubblicati dalla{' '}
            <a href="https://federscherma.it/" target="_blank" rel="noreferrer">
              Federazione Italiana Scherma
            </a>
            , pertanto ogni dato presente in scherma.me è liberamente consultabile dal sito
            ufficiale FIS
          </Text>
        </div>
        <Stack className={classes.groups}>{links}</Stack>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © {thisYear}{' '}
          <a
            href="https://www.facebook.com/andrea.rota.520"
            rel="noopener noreferrer"
            target="_blank"
          >
            Andrea Rota
          </a>
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
