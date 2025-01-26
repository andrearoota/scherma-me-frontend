import { IconSearch } from '@tabler/icons-react';
import { Button, rem, Text } from '@mantine/core';
import { spotlight } from '@mantine/spotlight';
import { Search } from '../Spotlight';

export function SearchControl() {
  return (
    <>
      <Button
        variant="default"
        onClick={() => {
          spotlight.open();
        }}
        leftSection={<IconSearch style={{ width: rem(15), height: rem(15) }} stroke={1.5} />}
      >
        <Text fz="sm" c="dimmed" pr={80}>
          Cerca un atleta o club
        </Text>
      </Button>
      <Search />
    </>
  );
}
