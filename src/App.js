import React, { useEffect, useState } from 'react';
import getBetyg from './connections/test/getBetyg.js';
import PieChartComponent from './components/charts/PieChart.js';
import getAvbrott from './connections/test/getAvbrott.js';
import Histogram from './components/charts/Histogram.js';

import getKursUtvarderingsBetyg from './connections/getKursUtvarderingsBetyg.js';
import BarChartKursBetyg from './components/charts/BarChartKursBetyg.js';
const App = () => {
  const [betyg, setBetyg] = useState();
  const [avbrott, setAvbrott] = useState();
  const [kursutvarderingsbetyg, setKursUtvarderingsBetyg] = useState();

  useEffect(() => {
    /**
     * Test funktioner för att hämta data
     * Dessa kan tas bort/modifieras sedan
     */
    getBetyg().then((res) => {
      setBetyg(res.data);
      console.log(res.data);
    });

    getAvbrott().then((res) => {
      setAvbrott(res.data);
      console.log(res.data);
    });

    /**
     * Riktiga funktioner för att hämta data
     */
    getKursUtvarderingsBetyg(10).then((res) => {
      setKursUtvarderingsBetyg(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div>
      {betyg && <PieChartComponent data={betyg}></PieChartComponent>}
      {kursutvarderingsbetyg && (
        <BarChartKursBetyg data={kursutvarderingsbetyg} />
      )}
      {avbrott && <Histogram data={avbrott} />}
    </div>
  );
};

export default App;
