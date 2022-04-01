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
  const kurs = 'TNA001';
  const startdatum = '2021-08-17'; //startdatum för när man började utbildningen. (Måste vara exakt just nu, annars måste vi ändra i handler och sätta > istället för =)

  useEffect(() => {
    getBetyg().then((res) => {
      setBetyg(res.data);
    });

    getAvbrott().then((res) => {
      setAvbrott(res.data);
    });

    getDagar(kurs, startdatum).then((res) => {
      setDagar(res.data);
      setRegistrerade(res.data2);
    });
  }, []);

  return (
    <div>
      Kurs: {kurs}
      <div>Startdatum: {startdatum}</div>
      {dagar && registrerade && <Dagar data={dagar} data2={registrerade} />}
    </div>
  );
};

export default App;
