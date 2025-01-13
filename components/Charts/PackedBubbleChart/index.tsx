import { ResponsiveCirclePacking } from '@nivo/circle-packing';
import { useMantineTheme } from '@mantine/core';

export type CirclePackingDatum = {
  name: string;
  children: { name: string; loc: number }[];
};

// Palette di colori univoci
const uniqueColors = ['red', 'yellow', 'hsl(120, 70%, 50%)'];

export default function CirclePacking({ data }: { data: CirclePackingDatum }) {
  const theme = useMantineTheme();
  const uniqueColors = [theme.colors.blue[6], theme.colors.green[6], theme.colors.red[6]];

  return (
    <ResponsiveCirclePacking
      data={data}
      id="name"
      value="loc"
      label={(node) => `${node.id} - ${node.value}`}
      colors={(node) => {
        const index = data.children.findIndex((child) => child.name === node.id);
        return uniqueColors[index % uniqueColors.length];
      }}
      childColor={{
        from: 'color',
      }}
      padding={2}
      leavesOnly={true}
      enableLabels={true}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 2]],
      }}
      borderWidth={1}
      animate={false}
      motionConfig="wobbly"
      isInteractive={false}
    />
  );
}
