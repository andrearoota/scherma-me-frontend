import { Dispatch, SetStateAction, useMemo } from 'react';
import { Flex, MultiSelect } from '@mantine/core';
import { province, Province } from '@/assets/itProvReg';
import unique from '@/utils';

export interface SelectProvinceProps {
  provinceFilter: Province[];
  setProvinceFilter: Dispatch<SetStateAction<Province[]>>;
}

export default function SelectProvince({
  provinceFilter,
  setProvinceFilter,
}: SelectProvinceProps): JSX.Element {
  const { provinceNames, uniqueRegionNames } = useMemo(
    () => ({
      provinceNames: province.map((p) => p.provincia),
      uniqueRegionNames: unique(province, 'regione').map((r) => r.regione),
    }),
    [province]
  );

  const { provinceValue, regionValue } = useMemo(
    () => ({
      provinceValue: provinceFilter.map((p) => p.provincia),
      regionValue: unique(provinceFilter, 'regione').map((p) => p.regione),
    }),
    [provinceFilter]
  );

  return (
    <Flex direction={{ base: 'column', xs: 'row' }} gap={{ base: 'xs', xs: 'md' }} align="stretch">
      <MultiSelect
        label="Seleziona la regione"
        placeholder="Regioni"
        data={uniqueRegionNames}
        value={regionValue}
        onChange={(value) =>
          setProvinceFilter(province.filter((prov) => value.includes(prov.regione)))
        }
        searchable
        flex={1}
      />
      <MultiSelect
        label="Seleziona la provincia"
        placeholder="Province"
        data={provinceNames}
        value={provinceValue}
        onChange={(value) =>
          setProvinceFilter(province.filter((prov) => value.includes(prov.provincia)))
        }
        searchable
        flex={1}
      />
    </Flex>
  );
}
