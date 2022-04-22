import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Typography, Card, CardContent, Grid } from '@mui/material';
import formatDataToRequest from '../../functions/formatDataToRequest';
import getDagarNew from '../../connections/getDagarNew';
import Loading from '../layout/Loading';

const DagarNew = ({ kurskod, startDatum }) => {
  const [dagar, setDagar] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const formattedKursKoder = formatDataToRequest(kurskod, 'kurskod');
    getDagarNew(formattedKursKoder, startDatum).then((res) => {
      setDagar(res.data);
      setLoading(false);
    });
  }, [kurskod, startDatum]);

  return (
    <Grid
      display='flex'
      flexWrap='wrap'
      rowGap={2}
      justifyContent='space-evenly'
      width='100%'
    >
      <Card
        style={{
          width: '90%',
          height: 'auto',
        }}
      >
        <CardContent>
          <Typography variant='h1' fontWeight='medium' align='center'>
            TEMP
          </Typography>
          <ResponsiveContainer height={500} width='100%'>
            <LineChart data={dagar}>
              <CartesianGrid horizontal={false} vertical={false} />
              <XAxis
                dataKey='antalDagar'
                type='number'
                label={{
                  value: 'Antal dagar till avslutad kurs',
                  position: 'insideBottom',
                }}
                height={40}
              />
              <YAxis
                label={{
                  value: 'Procent',
                  angle: -90,
                  position: 'insideLeft',
                }}
              />
              <Tooltip />
              <Legend />
              {kurskod && kurskod.map((kurs) => <Line dataKey={kurs} />)}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default DagarNew;
