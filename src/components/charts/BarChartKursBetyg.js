import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import getKursUtvarderingsBetyg from '../../connections/getKursUtvarderingsBetyg';
import Loading from '../layout/Loading';

const BarChartKursBetyg = () => {
  const [kursutvarderingsbetyg, setKursUtvarderingsBetyg] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getKursUtvarderingsBetyg(10).then((res) => {
      setKursUtvarderingsBetyg(res.data);
      setLoading(false);
    });
  }, []);
  //Kräver DataKey för varje period då vi vill kunna använda namn som datakey för Xaxeln och utvärderingsbetyget för Yaxeln
  //Hämtar data i formatet [{name:****, 2019HT: ****,2020VT: ****, etc.... }]
  return loading ? (
    <Loading />
  ) : (
    <ResponsiveContainer height={400}>
      <BarChart data={kursutvarderingsbetyg} height={250}>
        <CartesianGrid strokeDasharray='3 0' />
        <XAxis dataKey='name' tick={false} />

        <YAxis type='number' domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />

        <Tooltip />
        <Legend />

        <Bar dataKey='2019HT' fill='#8884d8' />
        <Bar dataKey='2019VT' fill='#82ca9d' />
        <Bar dataKey='2020HT' fill='#2284d8' />
        <Bar dataKey='2020VT' fill='#8224d8' />
        <Bar dataKey='2021HT' fill='#8822d8' />
        <Bar dataKey='2021VT' fill='#888422' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartKursBetyg;
