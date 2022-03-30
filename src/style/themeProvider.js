import { createTheme } from '@mui/material/styles';

/**
 * Globalt tema för appen, färger, fonts, storlekar
 * Globala styles läggs in här som är tänkt att återanvändas
 */

const theme = createTheme({
  typography: {
    fontFamily: "'Mulish', sans-serif",
    h1: {
      fontSize: 30,
    },

    h2: {
      fontSize: 20,
    },

    h3: {
      fontSize: 15,
    },

    body: {
      fontSize: 12,
    },
  },

  palette: {
    primary: {
      main: '#11636C',
      dark: '#0a3b40',
    },

    secondary: {
      main: '#E8B49ECC',
    },

    error: {
      main: '#ef5350',
    },

    warning: {
      main: '#efa350',
      light: '#F1D2C4',
      dark: '#E9B9A5',
    },
  },
});

export default theme;
