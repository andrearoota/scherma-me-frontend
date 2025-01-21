'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconSearch } from '@tabler/icons-react';
import { em, rem } from '@mantine/core';
import { useDebouncedValue, useMediaQuery } from '@mantine/hooks';
import { Spotlight, SpotlightActionGroupData } from '@mantine/spotlight';
import { SearchApi } from '@/api';
import { toSeoUrl } from '@/utils';

const baseActions: SpotlightActionGroupData[] = [
  {
    group: 'Atleti',
    actions: [],
  },

  {
    group: 'Club',
    actions: [],
  },
];

export function Search() {
  const router = useRouter();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const [query, setQuery] = useState<string>('');

  const [debouncedQuery] = useDebouncedValue(query, 300);
  const { hints, isLoading, isError } = SearchApi.useSearch(debouncedQuery || '');

  baseActions[0].actions =
    hints
      ?.filter((hint) => hint.fisCode)
      .map((hint) => ({
        id: hint.fisCode!,
        label: hint.fullName || '',
        description: hint.fullName || '',
        onClick: () => router.push(`/${hint.fisCode}/${toSeoUrl(hint.fullName!)}`),
      })) || [];

  baseActions[1].actions =
    hints
      ?.filter((hint) => hint.codeLetter)
      .map((hint) => ({
        id: hint.codeLetter!,
        label: hint.name || hint.codeLetter!,
        description: hint.codeLetter!,
        onClick: () => router.push(`/clubs/${hint.codeLetter}`),
      })) || [];

  return (
    <Spotlight
      shortcut={['mod + K', 'mod + P', '/']}
      actions={baseActions}
      highlightQuery
      radius="md"
      fullScreen={isMobile}
      limit={7}
      onQueryChange={(value) => setQuery(value)}
      query={query}
      nothingFound={
        isLoading
          ? 'Caricamento in corso...'
          : isError
            ? 'Errore durante la ricerca'
            : 'Nessun risultato'
      }
      searchProps={{
        leftSection: <IconSearch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />,
        placeholder: 'Cerca atleti e club',
      }}
    />
  );
}
