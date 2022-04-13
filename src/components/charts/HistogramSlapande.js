import React, { useEffect, useState } from 'react';
import getSlapande from '../../connections/getSlapande';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Loading from '../layout/Loading';
import { useTheme, Card, CardContent, Typography } from '@mui/material';

const HistogramSlapande = ({ startDatum, programKod, kursKoder }) => {
  const [slapande, setSlapande] = useState();
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    //Hämtar antalet släpande kurser för personer
    getSlapande(programKod, startDatum).then((res) => {
      setSlapande(res.data);
      //Hämtning klar - avbryt laddning
      setLoading(false);
    });
  }, [programKod, startDatum]);
  return loading ? (
    <Loading></Loading>
  ) : (
    <Card style={{ width: '90%', height: 550 }}>
      <CardContent>
        <Typography variant='h1' fontWeight='medium' align='center'>
          Antal kurser släpande per student
        </Typography>
        <ResponsiveContainer height={500} width='100%'>
          <BarChart data={slapande}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              height={60}
              dataKey='name'
              tickMargin={5}
              textAnchor='end'
              label={{
                value: 'Antal kurser släpande',
                position: 'insideBottom',
              }}
            />
            <YAxis
              dataKey='value'
              label={{
                value: 'Antal studenter',
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <Tooltip />

            <Bar fill={theme.palette.primary.main} dataKey='value' />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default HistogramSlapande;
