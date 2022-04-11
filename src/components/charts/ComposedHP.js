import React, { useEffect, useState } from 'react';
import getHP from '../../connections/getHP';
import {
  ComposedChart,
  Line,
  Area,
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

const ComposedHP = ({ startDatum, programKod, kursKoder }) => {
  const [HP, setHP] = useState();
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    //Hämtar hur mycket HP en person och gränsen för CSN
    getHP(programKod, startDatum).then((res) => {
      setHP(res.data);
      //Hämtning klar - avbryt laddning
      setLoading(false);
      console.log(res.data);
    });
  }, [programKod]);

  return loading ? (
    <Loading></Loading>
  ) : (
    <ResponsiveContainer height={500} width='90%'>
      <ComposedChart width={730} height={250} data={HP}>
        <XAxis dataKey='name' tick={false} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke='#f5f5f5' />

        <Bar dataKey='actual' barSize={8} fill='#413ea0' />
        <Area
          type='monotone'
          dataKey='required'
          fill={theme.palette.secondary.main}
          opacity={0.7}
          stroke='#ff7300'
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ComposedHP;
