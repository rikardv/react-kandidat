import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import getKursUtvarderingsBetyg from '../../connections/getKursUtvarderingsBetyg';

const BarChartKursBetyg = () => {
  const [kursutvarderingsbetyg, setKursUtvarderingsBetyg] = useState();

  useEffect(() => {
    getKursUtvarderingsBetyg(10).then((res) => {
      setKursUtvarderingsBetyg(res.data);
    });
  }, [kursutvarderingsbetyg]);
  //Kräver DataKey för varje period då vi vill kunna använda namn som datakey för Xaxeln och utvärderingsbetyget för Yaxeln
  //Hämtar data i formatet [{name:****, 2019HT: ****,2020VT: ****, etc.... }]
  return (
    <BarChart width={1000} height={250} data={kursutvarderingsbetyg}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis type="number" domain={[0, 5]} />
      <Tooltip />
      <Legend />
      <Bar dataKey="2019HT" fill="#8884d8" />
      <Bar dataKey="2019VT" fill="#82ca9d" />
      <Bar dataKey="2020HT" fill="#2284d8" />
      <Bar dataKey="2020VT" fill="#8224d8" />
      <Bar dataKey="2021HT" fill="#8822d8" />
      <Bar dataKey="2021VT" fill="#888422" />
    </BarChart>
  );
};

export default BarChartKursBetyg;
