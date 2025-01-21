import { useEffect } from 'react';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { Button, Collapse, Divider, Paper, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import ProvinceFilter, { SelectProvinceProps } from '@/components/Selects/SelectProvince';
import SelectRanking, { SelectRankingProps } from '@/components/Selects/SelectRanking';

interface FiltersCardProps {
  SelectProvinceProps: SelectProvinceProps;
  SelectRankingProps: SelectRankingProps;
}

export default function FiltersCard({
  SelectProvinceProps,
  SelectRankingProps,
}: FiltersCardProps): JSX.Element {
  const [opened, { toggle }] = useDisclosure(false);

  useEffect(() => {
    if (!opened) {
      SelectProvinceProps.setProvinceFilter([]);
    }
  }, [opened]);

  return (
    <Paper radius="xl" p="md">
      <Stack gap="md">
        <SelectRanking
          rankingFilter={SelectRankingProps.rankingFilter}
          setRankingFilter={SelectRankingProps.setRankingFilter}
        />
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
          style={{ alignSelf: 'flex-end' }}
        >
          Filtri avanzati
        </Button>
      </Stack>
      <Collapse mt="md" in={opened}>
        <Divider mb="xs" />
        <ProvinceFilter
          provinceFilter={SelectProvinceProps.provinceFilter}
          setProvinceFilter={SelectProvinceProps.setProvinceFilter}
        />
      </Collapse>
    </Paper>
  );
}
