import React, { useEffect, useState } from 'react';
import getBetyg from './connections/test/getBetyg.js';
import PieChartComponent from './components/charts/PieChart.js';
import getAvbrott from './connections/test/getAvbrott.js';
import Histogram from './components/charts/Histogram.js';
import getDagar from './connections/test/getDagar.js';
import Dagar from './components/charts/Dagar.js';

const App = () => {
  const [betyg, setBetyg] = useState();
  const [avbrott, setAvbrott] = useState();
  const [dagar, setDagar] = useState();
  const [registrerade, setRegistrerade] = useState();
  const kurs = 'TNG033';

  useEffect(() => {
    getBetyg().then((res) => {
      setBetyg(res.data);
    });

    getAvbrott().then((res) => {
      setAvbrott(res.data);
    });

    getDagar(kurs).then((res) => {
      setDagar(res.data);
      setRegistrerade(res.data2);
    });
  }, []);

  return (
    <div>
      {betyg && <PieChartComponent data={betyg}></PieChartComponent>}
      {avbrott && <Histogram data={avbrott} />}
      {kurs}
      {dagar && registrerade && <Dagar data={dagar} data2={registrerade} />}
    </div>
  );
};

export default App;
