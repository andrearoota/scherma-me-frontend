import { useMemo } from 'react';
import { RadialBarChart } from '@mantine/charts';
import { ChartsData } from '@/app/rankings/[category]/[weapon]/[gender]/[id]/page';
import { WeaponEnum } from '@/assets/enum/weaponEnum';
import StatsCard, { LegendData } from '../StatsCard';

interface ClubStatsCardProps {
  chartData: ChartsData[];
}

export default function ClubStatsCard({ chartData }: ClubStatsCardProps): JSX.Element {
  const dataForChart = useMemo<LegendData[]>(() => {
    return Object.values(WeaponEnum).map((weapon, index) => ({
      name: weapon,
      value: new Set(
        chartData
          .filter((item) => item.weapon === weapon)
          .map((item) => item.club)
          .flat()
      ).size,
      color: `hsl(${index * 45}, 70%, 50%)`, // Example color scheme
    }));
  }, [chartData]);

  const chart = useMemo(
    () => (
      <RadialBarChart
        w={160}
        h={160}
        data={dataForChart}
        dataKey="value"
      />
    ),
    [dataForChart]
  );

  const uniqueClubs = useMemo(
    () => new Set(chartData.map((item) => item.club).flat()).size,
    [chartData]
  );

  return (
    <StatsCard title="Club per arma" chart={chart} legend={dataForChart} total={uniqueClubs} />
  );
}
