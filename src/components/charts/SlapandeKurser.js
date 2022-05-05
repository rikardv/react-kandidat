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
import { Help, Info } from './Help';

const SlapandeKurser = ({ startDatum, programKod }) => {
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
    <Grid
      container
      width='95%'
      display='flex'
      flexWrap='wrap'
      justifyContent='space-evenly'
      flexDirection='row'
    >
      <Help
        text={
          'Håll muspekaren över staplarna i histogrammet för att se data för en specifik student.'
        }
      />
      <AnalysInfo
        firstVal={nrStudents && nrStudents}
        firstTitle='Totalt antal studenter analyserade'
        secondVal={nrSlapande && nrSlapande}
        secondTitle='Totalt antal studenter med släpande kurser'
      />
      {slapande &&
        slapande.map((res, indx) => (
          <div
            key={indx}
            style={{
              width: '100%',
              marginBottom: '20px',
              padding: '15px',
              paddingBottom: '40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              fontSize={34}
              color={theme.palette.primary.main}
              fontWeight='bold'
              marginBottom={1}
            >
              {res.program_namn ?? res.program}
            </Typography>

            <Grid
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <Card style={{ width: '60%' }}>
                <Info
                  text={
                    'Histogrammet visar antalet studenter som har ett specifikt antal släpande kurser på programmet ' +
                    res.program +
                    '.'
                  }
                />
                <CardContent>
                  <Typography variant='h2' fontWeight='medium' align='center'>
                    Antal släpande kurser per student
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
                          value: 'Kurser släpande',
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
                title={'Antalet studenter med eller utan släpande kurser'}
                total={res.dataPie[0].value}
                under={res.dataPie[1].value}
                info={
                  'Diagrammet visar antalet studenter på programmet ' +
                  res.program +
                  ' som har släpande kurser i rött, samt antalet studenter som inte har några släpande kurser i grönt.'
                }
              />
            </Grid>
          </div>
        ))}
    </Grid>
  );
};

export default SlapandeKurser;
