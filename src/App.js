import React, { useEffect, useState } from 'react';
import getTestData from './connections/getTestData.js';
import PieChartComponent from './charts/PieChartComponent.js';
import getTestHistogram from './connections/getTestHistogram.js';
import Histogram from './charts/Histogram.js';
const App = () => {
  const [testData, setTestData] = useState();
  const [testHistogram, setTestHistogram] = useState();

  useEffect(() => {
    getTestData().then((res) => {
      setTestData(res.data);
      console.log(res.data);
    });

    getTestHistogram().then((res) => {
      setTestHistogram(res.data);
    });
  }, []);

  return (
    <div>
      {testData && <PieChartComponent data={testData}></PieChartComponent>}
      {testHistogram && <Histogram data={testHistogram} />}
    </div>
  );
};

export default App;
