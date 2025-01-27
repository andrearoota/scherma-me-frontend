'use client';

import Link from 'next/link';
import {
  IconArrowRight,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconChevronDown,
  IconChevronUp,
  IconCoffee,
  IconHome,
  IconListNumbers,
  IconMail,
  IconUsersGroup,
} from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Flex,
  Group,
  HoverCard,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useComputedColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import LogoOnDark from '@/assets/logo/logoOnDark';
import LogoOnLight from '@/assets/logo/logoOnLight';
import ColorSchemeToggle from '../Buttons/ColorSchemeToggle';
import { SearchControl } from '../Search/SearchButton/SearchControl';
import { SearchMobileControl } from '../Search/SearchButton/SearchMobileControl';
import { categoriesItems } from '../Sections/Homepage';
import classes from './index.module.css';

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();
  const isDark = useComputedColorScheme() === 'dark';

  const links = categoriesItems.map((item) => (
    <Button
      fullWidth
      variant="light"
      size="xs"
      component={Link}
      href={item.route}
      rightSection={<IconArrowRight size={14} />}
    >
      {item.title}
    </Button>
  ));

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" align="center" h="100%">
          <Link href="/" style={{ display: 'flex' }}>
            {isDark ? <LogoOnDark height={24} /> : <LogoOnLight height={24} />}
          </Link>

          <Group visibleFrom="sm">
            <SearchControl />
          </Group>

          <Group h="100%" gap={0} visibleFrom="md">
            <HoverCard width={400} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Ranking
                    </Box>
                    <IconChevronDown size={16} color={theme.colors.blue[6]} />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                <Text fw={500} px="md">
                  Categorie
                </Text>

                <Divider my="sm" />

                <SimpleGrid cols={2}>{links}</SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>
            <Link href="#" className={classes.link}>
              Club
            </Link>
            <Box ml="xs">
              <ColorSchemeToggle />
            </Box>
          </Group>

          <Group hiddenFrom="md" gap={5}>
            <Flex hiddenFrom="sm" p={5}>
              <SearchMobileControl />
            </Flex>
            <Burger opened={drawerOpened} onClick={toggleDrawer} />
          </Group>
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Menu"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />
          <Link href="/" className={classes.link}>
            <IconHome size={24} />
            <Text component="span" mx={5}>
              Home
            </Text>
          </Link>
          <Box className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <IconListNumbers size={24} stroke={1.5} />
              <Text component="span" mx={5}>
                Ranking
              </Text>
              {linksOpened ? (
                <IconChevronUp size={16} color={theme.colors['scherma-me-primary'][8]} />
              ) : (
                <IconChevronDown size={16} color={theme.colors['scherma-me-primary'][8]} />
              )}
            </Center>
          </Box>
          <Collapse in={linksOpened}>
            <Stack gap="xs" px="lg">
              {links}
            </Stack>
          </Collapse>
          <Link href="/club" className={classes.link}>
            <IconUsersGroup size={24} stroke={1.5} />
            <Text component="span" ml={5}>
              Statistiche Club
            </Text>
          </Link>

          <Divider my="md" />

          <SimpleGrid cols={2} px="md">
            <Box>
              <Title order={5} mb="xs">
                Social
              </Title>

              <Group justify="flex-start" wrap="nowrap">
                <ActionIcon
                  size="xl"
                  variant="default"
                  component="a"
                  target="_blank"
                  href="https://www.instagram.com/scherma.me/"
                >
                  <IconBrandInstagram stroke={1.5} />
                </ActionIcon>
                <ActionIcon
                  size="xl"
                  variant="default"
                  component="a"
                  target="_blank"
                  href="https://www.facebook.com/scherma.me"
                >
                  <IconBrandFacebook stroke={1.5} />
                </ActionIcon>
              </Group>
            </Box>
            <Box>
              <Title order={5} mb="xs">
                Cambia tema
              </Title>
              <Group justify="flex-start" wrap="nowrap">
                <ColorSchemeToggle />
              </Group>
            </Box>
          </SimpleGrid>

          <Divider my="md" />

          <Title order={5} px="md">
            Sviluppatore
          </Title>

          <a
            href="https://www.linkedin.com/in/andrea-rota-6a2328146/"
            target="_blank"
            className={classes.link}
            rel="noreferrer"
          >
            <IconBrandLinkedin size={24} stroke={1.5} />
            <Text component="span" ml={5}>
              Chi sono
            </Text>
          </a>
          <a
            href="mailto:andrea.rota.98@gmail.com"
            target="_blank"
            className={classes.link}
            rel="noreferrer"
          >
            <IconMail size={24} stroke={1.5} />
            <Text component="span" ml={5}>
              Contattami
            </Text>
          </a>
          <a
            href="https://paypal.me/rota98?locale.x=it_IT"
            target="_blank"
            className={classes.link}
            rel="noreferrer"
          >
            <IconCoffee size={24} stroke={1.5} />
            <Text component="span" ml={5}>
              Supporta il progetto
            </Text>
          </a>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
