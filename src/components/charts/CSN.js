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
import { Help, Info } from './Help';

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
      width='100%'
      display='flex'
      flexWrap='wrap'
      justifyContent='space-evenly'
      flexDirection='row'
      rowGap={2}
    >
      <Help text={"Klicka på en stapel i diagrammet \"Studenter under- eller nära CSN-gränsen\" för att få mer infomation om studieresultat för en specifik student."}/>
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
          <div key={indx} width="100%" style={{ backgroundColor: "#dde3ed", marginBottom: "20px", padding: "15px", paddingBottom: "40px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1 style={{color: "#11636C", margin: 0, marginBottom: "15px"}}>{res.program}</h1>
          <Grid style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
            <Card
              style={{
                width: '75%',
                height: 'auto',
              }}
                >
              <Info text={"Histogrammet visar vilka studenter som ligger under eller nära CSN-gränsen."} />
              <CardContent>
                <Typography variant='h1' fontWeight='medium' align='center'>
                  Studenter under- eller nära CSN-gränsen
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
              title={'Andel studenter under och över CSN gränsen'}
              total={res.total}
              under={res.under}
              info={"Diagramet visar antalet studenter på programmet " + res.program + " som ligger över samt under CSN-gränsen."}
            />
          </Grid>
          </div>
        ))}
    </Grid>
  );
};

export default CSN;