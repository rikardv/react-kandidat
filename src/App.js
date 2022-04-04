import React, { useEffect, useState } from 'react';
import BarChartKursBetyg from './components/charts/BarChartKursBetyg.js';
import Histogram from './components/charts/Histogram.js';
import theme from './style/themeProvider';
import SandBoxContainer from './components/containers/SandBoxContainer.js';
import { ThemeProvider, Typography } from '@mui/material';
import HeaderContainer from './components/containers/HeaderContainer.js';
import CourseSelectList from './components/containers/CourseSelectList.js';
import CardWithCourses from './components/layout/CardWithCourses.js';

const App = () => {
  /**
   * Variable for setting what component to view
   * Tillfällen till klarad tenta as default
   */
  const [selectedView, setSelectedView] = useState(null);
  const [selectedProgram,setSelectedProgram] = useState("");

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

            {//Skriver lite här
            }
            <CourseSelectList setSelectedProgram={setSelectedProgram}></CourseSelectList>
            <CardWithCourses selectedProgram={selectedProgram}/>

          </Typography>
        );
      default:
        return <div>No selection..</div>;
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <HeaderContainer
        selectedView={selectedView}
        setSelectedView={setSelectedView}
      />
      {componentToRender(selectedView)}
    </ThemeProvider>
  );
};

export default App;
