import { createTheme } from '@mui/material/styles';
/**
 * Globalt tema för appen, färger, fonts, storlekar
 * Globala styles läggs in här som är tänkt att återanvändas
 */

const theme = createTheme({
  typography: {
    fontFamily: 'Korolev',
    h1: {
      fontSize: 24,
    },

    h2: {
      fontSize: 16,
    },

    h3: {
      fontSize: 12,
    },

    body: {
      fontSize: 10,
    },
  },

  palette: {
    primary: {
      main: '#11636C',
    },

    secondary: {
      main: '#E8B49ECC',
    },

    error: {
      main: '#ff6442',
    },

    warning: {
      main: '#efa350',
    },
  },
});

export default theme;
