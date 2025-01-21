'use client';

import { createTheme, DefaultMantineColor, MantineColorsTuple } from '@mantine/core';

/**
 * Extend MantineThemeColorsOverride interface to add custom colors
 */
type ExtendedCustomColors = 'scherma-me-primary' | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}

const schermaMePrimary: MantineColorsTuple = [
  '#ebfcff',
  '#d7f6fc',
  '#aaeefa',
  '#7ce5f9',
  '#60def8',
  '#53d9f8',
  '#4bd7f8',
  '#3ebedd',
  '#2da9c6',
  '#0093ad',
];

export const theme = createTheme({
  primaryColor: 'scherma-me-primary',
  primaryShade: 8,
  black: '#202122',
  fontFamily: 'Verdana, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: { fontFamily: 'Readex Pro, sans-serif', fontWeight: '500' },
  defaultRadius: 'md',
  colors: {
    'scherma-me-primary': schermaMePrimary,
  },
  defaultGradient: {
    deg: 90,
    from: 'scherma-me-primary.7',
    to: 'scherma-me-primary.9',
  }
});
