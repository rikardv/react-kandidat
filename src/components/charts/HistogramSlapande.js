import React, { useEffect, useState } from 'react';
import getSlapande from '../../connections/getSlapande';
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
import Loading from '../layout/Loading';
import { useTheme } from '@mui/material';

const HistogramSlapande = () => {
  const [slapande, setSlapande] = useState();
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    //Hämtar antalet släpande kurser för personer
    getSlapande('6CMEN', '2019-08-19').then((res) => {
      setSlapande(res.data);
      //Hämtning klar - avbrytt laddning
      setLoading(false);
    });
  }, []);
  return loading ? (
    <Loading></Loading>
  ) : (
    <ResponsiveContainer height={500} width='90%'>
      <BarChart data={slapande}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='name'
          label={{
            value: 'Kurser släpande',
            position: 'insideBottomRight',
            offset: 0,
          }}
        />
        <YAxis
          dataKey='value'
          label={{
            value: 'Antal personer',
            angle: -90,
            position: 'insideLeft',
          }}
        />
        <Tooltip />
        <Legend />
        <Bar fill={theme.palette.primary.main} dataKey='value' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HistogramSlapande;
