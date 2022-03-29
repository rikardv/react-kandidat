import { createTheme } from '@mui/material/styles';

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
    },

    secondary: {
      main: '#E8B49ECC',
    },

    error: {
      main: '#ef5350',
    },

    warning: {
      main: '#efa350',
    },
  },
});

export default theme;
