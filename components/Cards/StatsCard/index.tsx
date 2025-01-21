import { ReactNode } from 'react';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import {
  Button,
  Collapse,
  ColorSwatch,
  Divider,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export interface LegendData {
  name: string;
  value: number;
  color: string;
}

interface StatsCardProps {
  title: string;
  chart: ReactNode;
  total?: number;
  legend: LegendData[];
  table?: ReactNode;
}

export default function StatsCard({
  title,
  chart,
  total,
  legend,
  table,
}: StatsCardProps): JSX.Element {
  const [opened, { toggle }] = useDisclosure(false);

  let legendNodes = legend.map((item, index) => (
    <Stack key={index} gap={0}>
      <Text fw="bold" size="md">
        {item.value}
      </Text>
      <Flex align="center">
        <ColorSwatch size={12} color={item.color} withShadow={false} mr={4} />
        <Text c="dimmed" size="xs" tt="uppercase" fw="bold">
          {item.name}
        </Text>
      </Flex>
    </Stack>
  ));

  if (total) {
    // This is a bit of a hack to make the total appear on top of the legend
    // when the screen is small.
    legendNodes = [
      <Group key="legend" align="end">
        {legendNodes}
      </Group>,
    ];
    legendNodes.unshift(
      <Stack key="total" gap={0}>
        <Text fw="bold" size="lg">
          {total}
        </Text>
        <Text c="dimmed" size="xs" tt="uppercase" fw="bold">
          Totale
        </Text>
      </Stack>
    );
  }
  return (
    <Paper radius="xl" p="md" pb={opened ? 0 : 'md'}>
      <Group wrap="nowrap">
        {chart}
        <Flex gap="md" direction="column" justify="space-between" style={{ alignSelf: 'stretch' }}>
          <div>
            <Title order={3} mb="sm">
              {title}
            </Title>
            <Group gap="md" align="end">
              {legendNodes}
            </Group>
          </div>

          {table && (
            <Button
              variant="light"
              size="xs"
              onClick={toggle}
              rightSection={
                opened ? (
                  <IconChevronUp size={20} stroke={1.5} />
                ) : (
                  <IconChevronDown size={20} stroke={1.5} />
                )
              }
            >
              Esplora i dati
            </Button>
          )}
        </Flex>
      </Group>
      <Collapse mt="md" in={opened}>
        <Divider mb="xs" />
        {table}
      </Collapse>
    </Paper>
  );
}
