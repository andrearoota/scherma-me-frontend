import { ReactNode } from 'react';
import { Flex, Paper, Stack, Text, Title } from '@mantine/core';
import classes from './index.module.css';

export interface InfoProps {
  title: string;
  value: string;
}

interface TitlePageCardProps {
  title: string;
  subtitles?: InfoProps[];
  tooltip?: ReactNode;
}

export default function TitlePageCard({
  title,
  subtitles,
  tooltip,
}: TitlePageCardProps): JSX.Element {
  return (
    <Paper radius="xl" p="xl" pos="relative" className={classes.wrapper}>
      <Stack gap="xs" ta="center">
        <Title order={1} c="white" className={classes.title}>
          {title}
        </Title>
        <Flex gap="md" justify="center">
          {subtitles?.map((item, index) => (
            <Stack key={index} gap={0}>
              <Text c="scherma-me-primary.0" size="xl" tt="lowercase" fw="bold" lh="xs">
                {item.value}
              </Text>
              <Text c="scherma-me-primary.2" size="sm" tt="uppercase" fw="bold" lh="xs">
                {item.title}
              </Text>
            </Stack>
          ))}
        </Flex>
      </Stack>
      {tooltip}
    </Paper>
  );
}
