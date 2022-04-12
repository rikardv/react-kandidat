import React, { useEffect, useState } from 'react';
import BarChartKursBetyg from './components/charts/BarChartKursBetyg.js';
import HistogramAvhopp from './components/charts/HistogramAvhopp.js';
import Dagar from './components/charts/Dagar.js';
import theme from './style/themeProvider';
import SandBoxContainer from './components/containers/SandBoxContainer.js';
import { ThemeProvider, Typography, Grid, Stack } from '@mui/material';
import HeaderContainer from './components/containers/HeaderContainer.js';
import FiltreringContainer from './components/containers/FiltreringContainer.js';
import HistogramSlapande from './components/charts/HistogramSlapande.js';
import ComposedHP from './components/charts/ComposedHP.js';

const App = () => {
  /**
   * Variable for setting what component to view
   * Tillfällen till klarad tenta as default
   */
  const [selectedView, setSelectedView] = useState(1);
  const [selectedProgram, setSelectedProgram] = useState(['6CMEN']);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedStartDates, setSelectedStartDates] = useState(['2019-08-19']);

  /*
  console.log('Valda Program ' + selectedProgram[0]);
  console.log('Valda Kurser ' + selectedCourses);
  console.log('Startdatum ' + selectedStartDates[0]);
*/

  //Function that takes in user selection and return component accordingly
  const componentToRender = (selectedView) => {
    switch (selectedView) {
      case 1:
        return (
          <ComposedHP
            startDatum={selectedStartDates[0]}
            programKod={selectedProgram[0]}
            kursKoder={selectedCourses}
          />
        );

      case 2:
        return (
          <HistogramSlapande
            startDatum='2019-08-19'
            programKod={selectedProgram[0]}
            kursKoder={selectedCourses}
          />
        );

      case 3:
        return (
          <BarChartKursBetyg
            programKod={selectedProgram[0]}
            kursKoder={selectedCourses}
          />
        );

      case 4:
        return (
          <HistogramAvhopp
            startDatum='2012-01-03'
            slutDatum='2022-03-04'
            programKod={selectedProgram[0]}
            kursKoder={selectedCourses}
          />
        );

      case 5:
        return <SandBoxContainer />;
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
          <FiltreringContainer
            selectedProgram={selectedProgram}
            setSelectedProgram={setSelectedProgram}
            selectedCourses={selectedCourses}
            setSelectedCourses={setSelectedCourses}
            selectedStartDates={selectedStartDates}
            setSelectedStartDates={setSelectedStartDates}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
