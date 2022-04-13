import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import getAvbrott from '../../connections/test/getAvbrott';
import { useTheme, Card, CardContent, Typography } from '@mui/material';
import Loading from '../layout/Loading';

const HistogramAvhopp = ({
  programKod,
  selectedCourses,
  startDatum,
  slutDatum,
}) => {
  // const program = '6CDDD'; //6CMEN, 6CDDD, 6CIEN, 6CMJU, 6KGDK
  // const startDatum = '2012-01-03';
  // const slutDatum = '2022-03-04';
  const theme = useTheme();
  const [avbrott, setAvbrott] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAvbrott(programKod, startDatum, slutDatum).then((data) => {
      setAvbrott(data.data);
      setLoading(false);
    });
  }, [programKod]);
  return loading ? (
    <Loading />
  ) : (
    <Card style={{ width: '90%', height: 550 }}>
      <CardContent>
        <Typography variant='h1' fontWeight='medium' align='center'>
          Studenter under- eller nära CSN-gränsen
        </Typography>
        <ResponsiveContainer height={500} width='100%'>
          <BarChart data={avbrott}>
            <CartesianGrid
              strokeDasharray='3 3'
              horizontal={false}
              vertical={false}
            />
            <XAxis
              height={100}
              dataKey='kurskod'
              angle={-90}
              textAnchor='end'
              interval={0}
              tickMargin={10}
              label={{ value: 'Kurskod', position: 'insideBottom' }}
            />
            <YAxis
              label={{
                value: 'Antal studenter',
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <Tooltip />

            <Bar dataKey='avbrott' fill={theme.palette.primary.main} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default HistogramAvhopp;
