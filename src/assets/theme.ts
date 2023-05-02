import { createTheme } from '@mui/material/styles'

export const themeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#005a6b',
      main: '#00687b',
      dark: '#339aad'
    },
    secondary: {
      light: '#ff4081',
      main: '#4b6269',
      dark: '#c51162'
    },
    background: {
      default: '#fbfcfe'
    }
  },
  typography: {
    h1: {
      fontFamily: 'Readex Pro'
    },
    h2: {
      fontFamily: 'Readex Pro'
    },
    h3: {
      fontFamily: 'Readex Pro'
    },
    h4: {
      fontFamily: 'Readex Pro'
    },
    h5: {
      fontFamily: 'Readex Pro'
    },
    h6: {
      fontFamily: 'Readex Pro'
    }
  },
  shape: {
    borderRadius: 25
  }
})
