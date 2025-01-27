import { IconSearch } from '@tabler/icons-react';
import { spotlight } from '@mantine/spotlight';
import { Search } from '../Spotlight';

export function SearchMobileControl() {
  return (
    <>
      <IconSearch
        size={24}
        stroke={1.5}
        onClick={() => {
          spotlight.open();
        }}
      />
      <Search />
    </>
  );
}
