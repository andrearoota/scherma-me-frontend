import { ReactNode } from 'react';
import { IconInfoCircle } from '@tabler/icons-react';
import { ActionIcon, ActionIconProps, Popover, Text } from '@mantine/core';

interface BaseInfoTooltipProps {
  text: string | ReactNode;
  ActionIconProps?: ActionIconProps;
}

export default function BaseInfoTooltip({
  text,
  ActionIconProps,
}: BaseInfoTooltipProps): JSX.Element {
  return (
    <Popover
      width={200}
      offset={2}
      position="top"
      withArrow
      shadow="md"
      middlewares={{ flip: true, inline: true }}
    >
      <Popover.Target>
        <ActionIcon
          variant="transparent"
          radius="xl"
          size="xs"
          color="scherma-me-primary"
          aria-label="Info"
          pos="absolute"
          ml={3}
          {...ActionIconProps}
        >
          <IconInfoCircle />
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
