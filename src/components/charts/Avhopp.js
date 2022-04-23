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
import getAvhopp from '../../connections/getAvhopp';
import { useTheme, Card, CardContent, Typography, Grid } from '@mui/material';
import Loading from '../layout/Loading';
import formatDataToRequest from '../../functions/formatDataToRequest';
import AnalysInfo from '../layout/AnalysInfo';

const Avhopp = ({ programKod, selectedCourses, startDatum, slutDatum }) => {
  // const program = '6CDDD'; //6CMEN, 6CDDD, 6CIEN, 6CMJU, 6KGDK
  // const startDatum = '2012-01-03';
  // const slutDatum = '2022-03-04';
  const theme = useTheme();
  const [avbrott, setAvbrott] = useState([]);
  const [nrAvbrott, setNrAvbrott] = useState();
  const [nrKurser, setNrKurser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const formattedProgramKod = formatDataToRequest(programKod, 'program');
    getAvhopp(formattedProgramKod, startDatum, slutDatum).then((data) => {
      setAvbrott(data.data);
      setNrAvbrott(data.total_avhopp);
      setNrKurser(data.total_kurser);
      setLoading(false);
    });
  }, [programKod]);
  return loading ? (
    <Loading />
  ) : (
    <Grid
      display='flex'
      flexWrap='wrap'
      rowGap={2}
      justifyContent='space-evenly'
      width='100%'
    >
      <AnalysInfo
        firstVal={nrKurser && nrKurser}
        firstTitle='Antalet kurser analyserade'
        secondVal={nrAvbrott && nrAvbrott}
        secondTitle='Antalet totala avhopp '
      />
      {avbrott &&
        avbrott.map((res, indx) => (
          <Card
            style={{
              width: '90%',
              height: 'auto',
            }}
          >
            <CardContent>
              <Typography variant='h1' fontWeight='medium' align='center'>
                Avhopp per kurs för {res.program}
              </Typography>
              <ResponsiveContainer height={500} width='100%'>
                <BarChart data={res.data}>
                  <CartesianGrid horizontal={false} vertical={false} />
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
        ))}
    </Grid>
  );
};

export default Avhopp;
