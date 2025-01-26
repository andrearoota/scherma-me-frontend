import { useMemo } from 'react';
import { DonutChart, DonutChartCell } from '@mantine/charts';
import { useMantineTheme } from '@mantine/core';
import { GenderEnum } from '@/assets/enum/genderEnum';
import SimpleTable from '@/components/Tables/SimpleTable';
import StatsCard from '../StatsCard';
import { ChartsData } from '@/components/Sections/SingleRankingPage';

interface GenderStatsData {
  club: string;
  femminile?: number;
  maschile?: number;
}

interface CardGenderStatsProps {
  chartData: ChartsData[];
  tableData: GenderStatsData[];
}

const headers: Record<keyof GenderStatsData, string> = {
  club: 'Club',
  femminile: 'Femminile',
  maschile: 'Maschile',
};

export default function GenderStatsCard({
  chartData,
  tableData,
}: CardGenderStatsProps): JSX.Element {
  const theme = useMantineTheme();

  const dataForChart = useMemo<DonutChartCell[]>(() => {
    return Object.values(GenderEnum).map((gender, index) => ({
      name: gender,
      value: chartData.filter((item) => item.gender === gender).length,
      color: theme.colors.green[9 - index],
    }));
  }, [chartData, theme.colors.green]);

  const totalAthletes = useMemo(
    () => dataForChart.reduce((acc, curr) => acc + curr.value, 0),
    [dataForChart]
  );

  const chart = useMemo(
    () => (
      <DonutChart
        size={130}
        paddingAngle={2.5}
        data={dataForChart}
        pieProps={{ cornerRadius: 5 }}
      />
    ),
    [dataForChart]
  );

  const table = useMemo(
    () => <SimpleTable headers={headers} data={tableData} isError={false} isLoading={false} />,
    [tableData]
  );

  return (
    <StatsCard
      title="Atleti"
      chart={chart}
      legend={dataForChart}
      table={table}
      total={totalAthletes}
    />
  );
}
