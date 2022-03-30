import React, { useEffect, useState } from 'react';
import getBetyg from './connections/test/getBetyg.js';
import PieChartComponent from './components/charts/PieChart.js';
import getAvbrott from './connections/test/getAvbrott.js';
import Histogram from './components/charts/Histogram.js';
import theme from './style/themeProvider';
import SandBox from './components/layout/SandBox.js';
import MenyKort from './components/layout/MenyKort.js';
import { Grid, Typography, ThemeProvider } from '@mui/material';

const App = () => {
  const [betyg, setBetyg] = useState();
  const [avbrott, setAvbrott] = useState();

  useEffect(() => {
    getBetyg().then((res) => {
      setBetyg(res.data);
      console.log(res.data);
    });

    getAvbrott().then((res) => {
      setAvbrott(res.data);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        justifyContent="space-evenly"
        style={{ padding: '5%', backgroundColor: '#EEEEEE' }}
      >
        <MenyKort rubrik="EVALIUATE"></MenyKort>
        <MenyKort rubrik="BETYGSFÖRDELNING"></MenyKort>
        <MenyKort rubrik="FLAGGADE KURSER" antal="6" flagged></MenyKort>
      </Grid>
      <div>
        <SandBox />
        {betyg && <PieChartComponent data={betyg}></PieChartComponent>}
        {avbrott && <Histogram data={avbrott} />}
      </div>
    </ThemeProvider>
  );
};

export default App;
