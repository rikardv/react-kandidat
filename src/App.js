import React, { useEffect, useState } from 'react';
import getBetyg from './connections/test/getBetyg.js';
import PieChartComponent from './components/charts/PieChart.js';
import getAvbrott from './connections/test/getAvbrott.js';
import Histogram from './components/charts/Histogram.js';
import theme from './style/themeprovider';
import { ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import SandBox from './components/layout/SandBox.js';

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
      <div>
        <SandBox />
        {betyg && <PieChartComponent data={betyg}></PieChartComponent>}
        {avbrott && <Histogram data={avbrott} />}
      </div>
    </ThemeProvider>
  );
};

export default App;
