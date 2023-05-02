// routes
import Router from './routes'

// theme
import { ThemeProvider } from '@mui/material/styles'
import { themeOptions } from './assets/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false
    }
  }
})

export default function App (): JSX.Element {
  return (
    <ThemeProvider theme={themeOptions}>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
