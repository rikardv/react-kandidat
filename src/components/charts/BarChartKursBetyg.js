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
import { Card, CardContent, Typography } from '@mui/material';
import formatDataToRequest from '../../functions/formatDataToRequest';

const BarChartKursBetyg = ({ programKod, kursKoder, selectedCourses }) => {
  const [kursutvarderingsbetyg, setKursUtvarderingsBetyg] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const formattedKurskoder = formatDataToRequest(kursKoder, 'kurskod');
    getKursUtvarderingsBetyg(formattedKurskoder).then((res) => {
      setKursUtvarderingsBetyg(res.data);
      setLoading(false);
    });
  }, [programKod, kursKoder]);
  //Kräver DataKey för varje period då vi vill kunna använda namn som datakey för Xaxeln och utvärderingsbetyget för Yaxeln
  //Hämtar data i formatet [{name:****, 2019HT: ****,2020VT: ****, etc.... }]
  return loading ? (
    <Loading />
  ) : (
    <Card style={{ width: '90%', height: 550 }}>
      <CardContent>
        <Typography variant='h1' fontWeight='medium' align='center'>
          Snittbetyg för kurser i EvaLIUate
        </Typography>
        <ResponsiveContainer height={500} width='100%'>
          <BarChart data={kursutvarderingsbetyg} height={250}>
            <CartesianGrid
              strokeDasharray='3 0'
              CartesianGrid
              stroke='#d9d9d9'
              vertical={false}
            />
            <XAxis
              height={100}
              angle={-90}
              textAnchor='end'
              interval={0}
              tickMargin={10}
              dataKey='name'
              label={{ value: 'Kurskod', position: 'insideBottom' }}
            />

            <YAxis
              type='number'
              domain={[0, 5]}
              ticks={[1, 2, 3, 4, 5]}
              label={{
                value: 'Snittbetyg',
                angle: -90,
                position: 'insideLeft',
              }}
            />

            <Tooltip />
            <Legend verticalAlign='top' align='right' />

            <Bar dataKey='2019HT' fill='#8884d8' />
            <Bar dataKey='2020VT' fill='#8224d8' />
            <Bar dataKey='2020HT' fill='#2284d8' />
            <Bar dataKey='2021VT' fill='#888422' />
            <Bar dataKey='2021HT' fill='#8822d8' />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BarChartKursBetyg;
