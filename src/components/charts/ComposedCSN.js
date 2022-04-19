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
import { useTheme, Card, CardContent, Typography, Grid } from '@mui/material';
import formatDataToRequest from '../../functions/formatDataToRequest';

const CSN = ({ startDatum, programKod, kursKoder }) => {
  const [HP, setHP] = useState();
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    //Hämtar hur mycket HP en person och gränsen för CSN
    const formattedProgramKod = formatDataToRequest(programKod, 'program');
    getHP(formattedProgramKod, startDatum).then((res) => {
      setHP(res.data);
      //Hämtning klar - avbryt laddning
      setLoading(false);
    });
  }, [programKod, startDatum]);

  return loading ? (
    <Loading></Loading>
  ) : (
    <Grid
      display='flex'
      flexWrap='wrap'
      justifyContent='space-evenly'
      flexDirection='row'
      rowGap={2}
    >
      {HP &&
        HP.map((res, indx) => (
          <Card
            style={{
              width: 'auto',
              height: 'auto',
            }}
          >
            <CardContent>
              <Typography variant='h1' fontWeight='medium' align='center'>
                Studenter under- eller nära CSN-gränsen för {res.program}
              </Typography>
              <ResponsiveContainer height={500} width='100%'>
                <ComposedChart data={res.sort_HP}>
                  <XAxis
                    dataKey='name'
                    tick={false}
                    label={{ value: 'Student', position: 'insideBottom' }}
                  />
                  <YAxis
                    label={{
                      value: 'Antal HP',
                      angle: -90,
                      position: 'insideLeft',
                    }}
                  />
                  <Tooltip />
                  <Legend verticalAlign='top' align='right' />
                  <CartesianGrid horizontal={false} vertical={false} />

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
        ))}
    </Grid>
  );
};

export default CSN;
