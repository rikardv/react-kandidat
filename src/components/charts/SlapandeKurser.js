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
import { useTheme, Card, CardContent, Typography, Grid } from '@mui/material';
import formatDataToRequest from '../../functions/formatDataToRequest';
import AnalysInfo from '../layout/AnalysInfo';
import CustomPieChart from './CustomPieChart';

const SlapandeKurser = ({ startDatum, programKod, kursKoder }) => {
  const [slapande, setSlapande] = useState();
  const [nrStudents, setNrStudents] = useState();
  const [nrSlapande, setNrSlapande] = useState();
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    //Hämtar antalet släpande kurser för personer
    setLoading(true);
    const formattedProgramKod = formatDataToRequest(programKod, 'program');
    getSlapande(formattedProgramKod, startDatum).then((res) => {
      setSlapande(res.data);
      setNrStudents(res.total);
      setNrSlapande(res.total_slapande);
      //Hämtning klar - avbryt laddning
      setLoading(false);
    });
  }, [programKod, startDatum]);

  return loading ? (
    <Loading />
  ) : (
    <Grid container width='90%'>
      <AnalysInfo
        firstVal={nrStudents && nrStudents}
        firstTitle='Antal studenter analyserade'
        secondVal={nrSlapande && nrSlapande}
        secondTitle='Antal studenter med släpande kurser'
      />
      {slapande &&
        slapande.map((res, indx) => (
          <Grid
            display='flex'
            justifyContent='space-evenly'
            marginTop={2}
            md={12}
            lg={12}
            sm={12}
            key={indx}
          >
            <Card style={{ width: '55%', height: 300 }}>
              <CardContent>
                <Typography variant='h2' fontWeight='medium' align='center'>
                  Antal släpande kurser per student för {res.program}
                </Typography>
                <ResponsiveContainer height={250} width='100%'>
                  <BarChart data={res.data}>
                    <CartesianGrid horizontal={false} vertical={false} />
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
                        position: 'insideBottomLeft',
                        offset: '20',
                      }}
                    />
                    <Tooltip />

                    <Bar fill={theme.palette.primary.main} dataKey='value' />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <CustomPieChart
              title={
                'Antalet studenter med släpande och icke-släpande för ' +
                res.program
              }
              total={res.dataPie[0].value}
              under={res.dataPie[1].value}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default SlapandeKurser;
