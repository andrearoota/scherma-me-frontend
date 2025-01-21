import { IconLaurelWreath1, IconLaurelWreath2, IconLaurelWreath3 } from '@tabler/icons-react';
import { Divider, Flex, Skeleton, Stack, Text } from '@mantine/core';

export interface PodiumProps {
  rank: string[];
}

export default function Podium({ rank }: PodiumProps): JSX.Element {
  const noData = rank.length === 0;
  return (
    <Flex gap="md" justify="center" align="end" mx="md" ta="center">
      <Stack gap={0} align="center">
        <IconLaurelWreath2 size={56} color="#D7D7D7" />
        {noData ? (
          <Skeleton height={20} width="100%" maw={120} />
        ) : (
          <Text
            size="md"
            fw="bold"
            variant="gradient"
            gradient={{ from: '#D7D7D7', to: '#A7A7AD', deg: 90 }}
          >
            {rank[1] ?? '-'}
          </Text>
        )}
      </Stack>
      <Divider orientation="vertical" />
      <Stack gap={0} align="center">
        <IconLaurelWreath1 size={64} color="#D6AF36" />
        {noData ? (
          <Skeleton height={20} width="100%" maw={120} />
        ) : (
          <Text
            size="md"
            fw="bold"
            variant="gradient"
            gradient={{ from: '#D6AF36', to: '#FEE101', deg: 90 }}
          >
            {rank[0] ?? '-'}
          </Text>
        )}
      </Stack>
      <Divider orientation="vertical" />
      <Stack gap={0} align="center">
        <IconLaurelWreath3 size={48} color="#824A02" />
        {noData ? (
          <Skeleton height={20} width="100%" maw={120} />
        ) : (
          <Text
            size="md"
            fw="bold"
            variant="gradient"
            gradient={{ from: '#824A02', to: '#A77044', deg: 90 }}
          >
            {rank[2] ?? '-'}
          </Text>
        )}
      </Stack>
    </Flex>
  );
}
