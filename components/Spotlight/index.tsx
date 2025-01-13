import { useRouter } from 'next/navigation';
import { IconSearch } from '@tabler/icons-react';
import { Button, em, rem } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  createSpotlight,
  spotlight,
  Spotlight,
  SpotlightActionGroupData,
} from '@mantine/spotlight';
import { spotlightStore } from '@mantine/spotlight/lib/spotlight.store';

let actions: SpotlightActionGroupData[] = [
  {
    group: 'Pages',
    actions: [
      { id: 'home', label: 'Home page', description: 'Where we present the product' },
      { id: 'careers', label: 'Careers page', description: 'Where we list open positions' },
      { id: 'about-us', label: 'About us page', description: 'Where we tell what we do' },
    ],
  },

  {
    group: 'Apps',
    actions: [
      { id: 'svg-compressor', label: 'SVG compressor', description: 'Compress SVG images' },
      { id: 'base64', label: 'Base 64 converter', description: 'Convert data to base 64 format' },
      { id: 'fake-data', label: 'Fake data generator', description: 'Lorem ipsum generator' },
    ],
  },
];

export const [searchStore, searchHandlers] = createSpotlight();

export function Search() {
  const router = useRouter();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  actions = actions.map((group) => ({
    ...group,
    actions: group.actions.map((action) => ({
      ...action,
      onClick: () => router.push(action.id),
    })),
  }));

  return (
    <Spotlight
      store={searchStore}
      shortcut={['mod + K', 'mod + P', '/']}
      actions={actions}
      highlightQuery
      radius="md"
      fullScreen={isMobile}
      limit={7}
      nothingFound="Nothing found..."
      searchProps={{
        leftSection: <IconSearch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />,
        placeholder: 'Search...',
      }}
    />
  );
}
