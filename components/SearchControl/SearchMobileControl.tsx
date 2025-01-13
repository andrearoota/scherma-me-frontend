import { IconSearch } from '@tabler/icons-react';
import { rem } from '@mantine/core';
import { spotlight } from '@mantine/spotlight';
import { Search, searchHandlers } from '../Spotlight';

export function SearchMobileControl() {
  return (
    <>
      <IconSearch
        style={{ width: rem(22), height: rem(22) }}
        stroke={1.5}
        onClick={() => {
          searchHandlers.open();
        }}
      />
      <Search />
    </>
  );
}
