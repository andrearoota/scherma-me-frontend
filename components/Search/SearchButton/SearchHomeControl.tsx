import { IconSearch } from '@tabler/icons-react';
import cx from 'clsx';
import { BoxProps, ElementProps, Group, rem, Text, UnstyledButton } from '@mantine/core';
import { Search } from '../Spotlight';
import classes from './SearchControl.module.css';
import { spotlight } from '@mantine/spotlight';

interface SearchControlProps extends BoxProps, ElementProps<'button'> {}

export function SearchHomeControl({ className, ...others }: SearchControlProps) {
  return (
    <>
      <UnstyledButton
        {...others}
        className={cx(classes.root, className)}
        onClick={() => {
          spotlight.open();
        }}
      >
        <Group gap="xs">
          <IconSearch style={{ width: rem(15), height: rem(15) }} stroke={1.5} />
          <Text fz="sm" c="dimmed" pr={80}>
            Cerca un atleta o club
          </Text>
        </Group>
      </UnstyledButton>
      <Search />
    </>
  );
}
