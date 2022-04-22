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

  //Hide course when clicked on label.
  const handleActive = (e) => {
    console.log(e.value);
    for (var i = 0; i < dagar.length; i++) {
      console.log(dagar[i].kurs);
      if (dagar[i].kurs == e.value) {
        let newArr = [...dagar];
        let item = { ...newArr[i] };
        item.active = !item.active;
        newArr[i] = item;
        setDagar(newArr);
      }
    }
  };

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
            Antal dagar till avklarad kurs
          </Typography>
          <ResponsiveContainer height={500} width='100%'>
            <LineChart>
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
              <Legend verticalAlign='top' height={30} onClick={handleActive} />
              {dagar &&
                dagar.map((res, indx) => (
                  <Line
                    type='monotone'
                    dataKey='andelProcent'
                    data={res.data}
                    name={res.kurs}
                    hide={res.active}
                    dot={false}
                    connectNulls
                  />
                ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default DagarNew;
