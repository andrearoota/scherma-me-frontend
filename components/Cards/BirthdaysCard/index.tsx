import { useMemo } from 'react';
import { IconCake } from '@tabler/icons-react';
import { Box, Divider, Group, Paper, Stack, Text, ThemeIcon } from '@mantine/core';
import { BirthdaysForStatsResponse } from '@/api/modules/stats/interfaces';
import { toSeoUrl } from '@/utils';
import classes from './index.module.css';

export interface BirthdaysCardProps {
  birthdays: BirthdaysForStatsResponse[];
}

export function BirthdaysCard({ birthdays }: BirthdaysCardProps) {
  const thisYear = new Date().getFullYear();

  const items = useMemo(() => {
    return birthdays
      .sort((a, b) => a.fullName.localeCompare(b.fullName))
      .map((birthday, index) => (
        <div key={birthday.fisCode}>
          <Divider display={index > 0 ? 'block' : 'none'} my="xs" />
          <Box ta="center">
            <Group justify="space-between">
              <Text fz="sm" c="dimmed">
                {thisYear - birthday.birthYear} anni
              </Text>
              <Text fz="sm" c="dimmed">
                {birthday.codeLetter}
              </Text>
            </Group>
            <Text
              fw={500}
              component="a"
              href={`${birthday.fisCode}/${toSeoUrl(birthday.fullName)}`}
            >
              {birthday.fullName}
            </Text>
          </Box>
        </div>
      ));
  }, [birthdays, thisYear]);

  return (
    <Paper radius="md" withBorder className={classes.card} mt={20}>
      <ThemeIcon className={classes.icon} size={60} radius={60}>
        <IconCake size={32} stroke={1.5} />
      </ThemeIcon>

      <Text ta="center" fw={700} className={classes.title}>
        Compleanni
      </Text>
      <Text c="dimmed" ta="center" fz="sm">
        {new Date().toLocaleDateString('en-GB')}
      </Text>

      <Stack justify="center" gap={0} mt="md">
        {items}
      </Stack>
    </Paper>
  );
}
