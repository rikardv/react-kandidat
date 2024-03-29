import React, { useState } from 'react';
import Evaliuate from './components/charts/Evaliuate.js';
import Avhopp from './components/charts/Avhopp.js';
import theme from './style/themeProvider';
import { ThemeProvider, Typography, Grid, Stack } from '@mui/material';
import VisualiseringMeny from './components/filtering/leftside/VisualiseringMeny.js';
import FiltreringContainer from './components/filtering/rightside/FiltreringContainer.js';
import SlapandeKurser from './components/charts/SlapandeKurser.js';
import CSN from './components/charts/CSN.js';
import Betygsfordelning from './components/charts/Betygsfordelning.js';
import Omtenta from './components/charts/Omtenta.js';
import DagarNew from './components/charts/DagarNew.js';
import BottomContainer from './components/containers/BottomContainer.js';
import TopContainer from './components/containers/TopContainer.js';
import AllaStudenter from './components/layout/AllaStudenter.js';

const App = () => {
  /**
   * Variable for setting what component to view
   * CSN-gräns as default
   */
  const [selectedView, setSelectedView] = useState(1);
  const [selectedProgramsTemp, setSelectedProgram] = useState([
    '6CMEN: Civilingenjörsprogram i medieteknik',
  ]); //Alla progarmkoder lagras i denna, defaultvärde satt.
  const [selectedCoursesTemp, setSelectedCourses] = useState([
    'TNM061: 3-D Datorgrafik',
  ]); //Alla kurser lagras i denna temporärt och kursnamnet filtreras sedan bort.
  const [selectedStartDates, setSelectedStartDates] = useState(['2019-08-19']); //Alla startdatum lagras i denna, defaultvärde satt.

  //Filtrera bort kursnamnet så vi endast skickar kurskoden till API:et.
  const selectedCourses = [];
  selectedCoursesTemp.map((course) =>
    selectedCourses.push(course.split(':')[0])
  );

  //Filtrera bort programnamet likt ovan
  const selectedPrograms = [];
  selectedProgramsTemp.map((program) => {
    selectedPrograms.push(program.split(':')[0]);
  });

  //Function that takes in user selection and return component accordingly
  const componentToRender = (selectedView) => {
    switch (selectedView) {
      case 1:
        return (
          //CSN
          <CSN
            startDatum={selectedStartDates[0]}
            programKod={selectedPrograms}
            kursKoder={selectedCourses}
          />
        );

      case 2:
        return (
          //Släpande kurser
          <>
            <SlapandeKurser
              startDatum={selectedStartDates}
              programKod={selectedPrograms}
              kursKoder={selectedCourses}
            />
          </>
        );

      case 3:
        return (
          //Betygsfördelning
          <Betygsfordelning
            programKod={selectedPrograms}
            kursKoder={selectedCourses}
          />
        );

      case 4:
        return (
          //Avhopp per kurs
          <Avhopp
            startDatum='2012-01-03'
            slutDatum='2022-03-04'
            programKod={selectedPrograms}
            kursKoder={selectedCourses}
          />
        );
      case 5:
        return (
          //Kursbetyg evaliuate
          <Evaliuate
            programKod={selectedPrograms[0]}
            kursKoder={selectedCourses}
          />
        );

      case 6:
        return (
          <DagarNew
            startDatum={selectedStartDates[0]}
            kurskod={selectedCourses}
          />
        );
      case 7:
        return (
          //Betygsfördelning
          <Omtenta
            programKod={selectedPrograms[0]}
            kursKoder={selectedCourses}
          />
        );
      case 8:
        return (
          <AllaStudenter
            programKod={selectedPrograms}
            startDatum={selectedStartDates[0]}
          />
        );
      default:
        <Typography>Något gick snett om du hamnade här</Typography>;
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <TopContainer />
      <Grid container direction='row' style={{ minHeight: '80vh' }}>
        <Grid item sm={2} md={2} lg={2}>
          <VisualiseringMeny
            selectedView={selectedView}
            setSelectedView={setSelectedView}
          />
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
          <Stack
            direction='column'
            spacing={3}
            justifyContent='center'
            alignItems={'center'}
          >
            {componentToRender(selectedView)}
          </Stack>
        </Grid>
        <Grid item sm={2} md={2} lg={2}>
          <FiltreringContainer
            selectedProgram={selectedPrograms}
            setSelectedProgram={setSelectedProgram}
            selectedCourses={selectedCourses}
            setSelectedCourses={setSelectedCourses}
            selectedStartDates={selectedStartDates}
            setSelectedStartDates={setSelectedStartDates}
          />
        </Grid>
      </Grid>
      <BottomContainer />
    </ThemeProvider>
  );
};

export default App;
