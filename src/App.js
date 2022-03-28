import React, { useEffect, useState } from 'react';
import getBetyg from './connections/test/getBetyg.js';
import PieChartComponent from './components/charts/PieChart.js';
import getAvbrott from './connections/test/getAvbrott.js';
import Histogram from './components/charts/Histogram.js';
const App = () => {
  const [betyg, setBetyg] = useState();
  const [avbrott, setAvbrott] = useState();

  useEffect(() => {
    getBetyg().then((res) => {
      setBetyg(res.data);
    });

    getAvbrott().then((res) => {
      setAvbrott(res.data);
    });
  }, []);

  return (
    <div>
      {betyg && <PieChartComponent data={betyg}></PieChartComponent>}
      {avbrott && <Histogram data={avbrott} />}
    </div>
  );
};

export default App;
