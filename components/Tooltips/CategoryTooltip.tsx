import { useMemo } from 'react';
import { IconInfoCircle } from '@tabler/icons-react';
import { ActionIcon, ActionIconProps, Popover, Text } from '@mantine/core';
import { Category } from '@/api/modules/ranking/interfaces';

interface CategoryTooltipProps {
  category?: Category;
  ActionIconProps?: ActionIconProps;
}

export default function CategoryTooltip({
  category,
  ActionIconProps,
}: CategoryTooltipProps): JSX.Element {
  if (!category) {
    return <></>;
  }

  const text: string = useMemo(() => {
    if (category.startYear === 1900) {
      return `La categoria ${category.name} comprende atleti nati prima del ${category.endYear} (incluso)`;
    }
    if (category.endYear === 2025) {
      return `La categoria ${category.name} include gli atleti di tutte le età`;
    }
    return `La categoria ${category.name} comprende atleti nati tra il ${category.startYear} e il ${category.endYear} (inclusi)`;
  }, [category]);

  return (
    <Popover width={200} offset={2} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <ActionIcon
          variant="transparent"
          radius="xl"
          color="scherma-me-primary.0"
          aria-label="Info categoria"
          pos="absolute"
          right={10}
          top={10}
          {...ActionIconProps}
        >
          <IconInfoCircle style={{ width: '90%', height: '90%' }} stroke={1.5} />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs" ta="center">
          {text}
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
}
