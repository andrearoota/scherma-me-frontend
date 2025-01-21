import { useMemo } from 'react';
import { DonutChart, DonutChartCell } from '@mantine/charts';
import { ChartsData } from '@/app/rankings/[category]/[weapon]/[gender]/[id]/page';
import { WeaponEnum } from '@/assets/enum/weaponEnum';
import SimpleTable from '@/components/Tables/SimpleTable';
import StatsCard from '../StatsCard';

interface WeaponStatsData {
  club: string;
  fioretto?: number;
  sciabola?: number;
  spada?: number;
}

interface CardWeaponStatsProps {
  chartData: ChartsData[];
  tableData: WeaponStatsData[];
}

const headers: Record<keyof WeaponStatsData, string> = {
  club: 'Club',
  fioretto: 'Fioretto',
  sciabola: 'Sciabola',
  spada: 'Spada',
};

export default function CardWeaponStats({
  chartData,
  tableData,
}: CardWeaponStatsProps): JSX.Element {
  const dataForChart = useMemo<DonutChartCell[]>(() => {
    return Object.values(WeaponEnum).map((weapon, index) => ({
      name: weapon,
      value: chartData.filter((item) => item.weapon === weapon).length,
      color: `hsl(${index * 45}, 70%, 50%)`, // Example color scheme
    }));
  }, [chartData]);

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

  return <StatsCard title="Atleti per arma" chart={chart} legend={dataForChart} table={table} />;
}
