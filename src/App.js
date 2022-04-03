import React, { useEffect, useState } from 'react';
import BarChartKursBetyg from './components/charts/BarChartKursBetyg.js';
import Histogram from './components/charts/Histogram.js';
import theme from './style/themeProvider';
import SandBoxContainer from './components/containers/SandBoxContainer.js';
import { ThemeProvider, Typography, Grid } from '@mui/material';
import HeaderContainer from './components/containers/HeaderContainer.js';
import FiltreringContainer from './components/containers/FiltreringContainer.js';

const App = () => {
  /**
   * Variable for setting what component to view
   * Tillfällen till klarad tenta as default
   */
  const [selectedView, setSelectedView] = useState(null);

  //Function that takes in user selection and return component accordingly
  const componentToRender = (selectedView) => {
    switch (selectedView) {
      case 1:
        return (
          <Typography variant='h1'>
            Tillfällen till klarad tenta placeras här
          </Typography>
        );

      case 2:
        return <Typography variant='h1'>Eftersläp placeras här</Typography>;

      case 3:
        return (
          <Typography variant='h1'>Betygsfördelning placeras här</Typography>
        );

      case 4:
        return (
          <Typography variant='h1'>
            Avhopp per kurs/program placeras här
          </Typography>
        );
      default:
        return <Typography>Inget valt</Typography>;
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container direction='row' md={12}>
        <Grid item sm={1} md={1} lg={1}>
          Nav
        </Grid>
        <Grid
          item
          sm={8}
          md={8}
          lg={8}
          style={{
            borderRight: '1px solid #D3D3D3',
            borderLeft: '1px solid #D3D3D3',
          }}
        >
          <HeaderContainer
            selectedView={selectedView}
            setSelectedView={setSelectedView}
          />
          {componentToRender(selectedView)}
        </Grid>
        <Grid item sm={3} md={3} lg={3}>
          <FiltreringContainer />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
