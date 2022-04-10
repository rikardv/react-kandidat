import React, { useEffect, useState } from 'react';
import BarChartKursBetyg from './components/charts/BarChartKursBetyg.js';
import HistogramAvhopp from './components/charts/HistogramAvhopp.js';
import Dagar from './components/charts/Dagar.js';
import theme from './style/themeProvider';
import SandBoxContainer from './components/containers/SandBoxContainer.js';
import { ThemeProvider, Typography, Grid, Stack } from '@mui/material';
import HeaderContainer from './components/containers/HeaderContainer.js';
import CourseSelectList from './components/containers/CourseSelectList.js';
import CardWithCourses from './components/layout/CardWithCourses.js';
import FiltreringContainer from './components/containers/FiltreringContainer.js';
import HistogramSlapande from './components/charts/HistogramSlapande.js';
import ComposedHP from './components/charts/ComposedHP.js';

const App = () => {
  /**
   * Variable for setting what component to view
   * Tillfällen till klarad tenta as default
   */
  const [selectedView, setSelectedView] = useState(1);
  const [selectedProgram, setSelectedProgram] = useState('');

  //Function that takes in user selection and return component accordingly
  const componentToRender = (selectedView) => {
    switch (selectedView) {
      case 1:
        return <ComposedHP startDatum='2019-08-19' programKod='6CMEN' />;

      case 2:
        return <HistogramSlapande startDatum='2019-08-19' programKod='6CMEN' />;

      case 3:
        return <BarChartKursBetyg />;

      case 4:
        return <HistogramAvhopp/>;

      case 5: 
        return <SandBoxContainer selectedProgram={selectedProgram} setSelectedProgram={setSelectedProgram}/>;
      default:
        <Typography>Något gick snett om du hamnade här</Typography>;
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container direction='row' md={12}>
        <Grid item sm={1} md={1} lg={1}>
          <Typography> Vet inte vad vi vill ha här egentligen</Typography>
        </Grid>
        <Grid
          item
          sm={9}
          md={9}
          lg={9}
          style={{
            borderRight: '1px solid #D3D3D3',
            borderLeft: '1px solid #D3D3D3',
          }}
        >
          <Stack
            direction='column'
            spacing={3}
            justifyContent='center'
            alignItems={'center'}
          >
            <Typography variant='h1' fontWeight={'bold'}>
              Instrumentpanel för grundutbildningen på Liu
            </Typography>
            <HeaderContainer
              selectedView={selectedView}
              setSelectedView={setSelectedView}
            />
            {componentToRender(selectedView)}
          </Stack>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FiltreringContainer />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
