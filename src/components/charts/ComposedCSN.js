import React, { useEffect, useState } from 'react';
import getHP from '../../connections/getHP';
import {
  ComposedChart,
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
import { useTheme, Card, CardContent, Typography } from '@mui/material';

const CSN = ({ startDatum, programKod, kursKoder }) => {
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
  }, [programKod, startDatum]);

  return loading ? (
    <Loading></Loading>
  ) : (
    <Card style={{ width: '90%', height: 550 }}>
      <CardContent>
        <Typography variant='h1' fontWeight='medium' align='center'>
          Studenter under- eller nära CSN-gränsen
        </Typography>
        <ResponsiveContainer height={500} width='100%'>
          <ComposedChart data={HP}>
            <XAxis
              dataKey='name'
              tick={false}
              label={{ value: 'Student', position: 'insideBottom' }}
            />
            <YAxis
              label={{ value: 'Antal HP', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip />
            <Legend verticalAlign='top' align='right' />
            <CartesianGrid stroke='#f5f5f5' />

            <Bar
              name='HP för student'
              dataKey='actual'
              barSize={8}
              fill='#413ea0'
            />
            <Area
              name='HP-gräns'
              type='monotone'
              dataKey='required'
              fill={theme.palette.secondary.main}
              opacity={0.7}
              stroke='#ff7300'
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CSN;
