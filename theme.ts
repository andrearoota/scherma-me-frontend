'use client';

import { createTheme, MantineColorsTuple } from '@mantine/core';

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
  fontFamily: 'Verdana, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: { fontFamily: 'Readex Pro, sans-serif', fontWeight: '500' },
  
  colors: {
    schermaMePrimary,
  },
});
