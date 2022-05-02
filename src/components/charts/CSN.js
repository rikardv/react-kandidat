import React, { useEffect, useState } from 'react';
import getCSN from '../../connections/getCSN';
import {
  ComposedChart,
  Area,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Loading from '../layout/Loading';
import { useTheme, Card, CardContent, Typography, Grid } from '@mui/material';
import formatDataToRequest from '../../functions/formatDataToRequest';
import AnalysInfo from '../layout/AnalysInfo';
import StudentPopUp from '../layout/StudentPopUp';
import CustomPieChart from './CustomPieChart';
import { Help } from './Help';

const CSN = ({ startDatum, programKod, kursKoder }) => {
  const [HP, setHP] = useState();
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const [selectedPerson, setSelectedPerson] = useState();

  useEffect(() => {
    //Hämtar hur mycket HP en person och gränsen för CSN
    setLoading(true);
    const formattedProgramKod = formatDataToRequest(programKod, 'program');
    getCSN(formattedProgramKod, startDatum).then((res) => {
      setHP(res.data);
      //Hämtning klar - avbryt laddning
      setLoading(false);
    });
  }, [programKod, startDatum]);

  const closeDialog = () => {
    setSelectedPerson();
  };

  return loading ? (
    <Loading></Loading>
  ) : (
    <Grid
      container
      width='90%'
      display='flex'
      flexWrap='wrap'
      justifyContent='space-evenly'
      flexDirection='row'
      rowGap={2}
    >
              <Help text={"Tryck på ett personnummer i grafen för att få mer infomation om studentens studieresultat."}/>
      <AnalysInfo
        firstVal={
          HP && HP.reduce((total, currentVal) => total + currentVal.total, 0)
        }
        firstTitle='Antal studenter analyserade'
        secondVal={
          HP && HP.reduce((total, currentVal) => total + currentVal.under, 0)
        }
        secondTitle='Antal studenter under CSN gräns'
      />

      {selectedPerson && (
        <StudentPopUp personNummer={selectedPerson} handleClose={closeDialog} />
      )}

      {HP &&
        HP.map((res, indx) => (
          <Grid
            display='flex'
            justifyContent='space-evenly'
            key={indx}
            width="100%"

          >
            <Card
              style={{
                width: '55%',
                height: 'auto',
              }}
            >
              <CardContent>
                <Typography variant='h1' fontWeight='medium' align='center'>
                  Studenter under- eller nära CSN-gränsen för {res.program}
                </Typography>
                <ResponsiveContainer height={200} width='100%'>
                  <ComposedChart
                    data={res.sort_HP}
                    onClick={(e) => setSelectedPerson(e.activeLabel)}
                  >
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
                    <Legend verticalAlign='top' align='right'/>
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
            <CustomPieChart
              title={'Under och över CSN gränsen för ' + res.program}
              total={res.total}
              under={res.under}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default CSN;