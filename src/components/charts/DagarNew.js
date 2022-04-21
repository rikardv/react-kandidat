import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
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
      console.log(res.data);
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
      {dagar &&
        dagar.map((res, indx) => (
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
                <LineChart data={res.data}>
                  <CartesianGrid horizontal={false} vertical={false} />
                  <XAxis
                    dataKey='antalDagar'
                    label={{
                      value: 'Antal dagar till avslutad kurs',
                      position: 'insideBottom',
                    }}
                    domain={[0, 'dataMax']}
                    height={40}
                  />
                  <YAxis
                    domain={[0, 100]}
                    label={{
                      value: 'Procent',
                      angle: -90,
                      position: 'insideLeft',
                    }}
                  />

                  <Line dataKey='andelProcent' />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ))}
    </Grid>
  );
};

export default DagarNew;
