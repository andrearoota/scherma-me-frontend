import '@mantine/core/styles.css';
import '@mantine/spotlight/styles.css'; // Import spotlight styles
import '@mantine/charts/styles.css'; // Import charts styles
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import '@fontsource/readex-pro/300.css';
import '@fontsource/readex-pro/500.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import SWRProvider from '@/customContext/SWRProvider';
import { theme } from '../theme';

// TODO: Add metadata
export const metadata = {
  title: 'Scherma.me',
  description: 'LOREM IPSUM',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <SWRProvider>
          <MantineProvider theme={theme} defaultColorScheme="auto">
            <Header />
            {children}
            <Footer />
          </MantineProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
