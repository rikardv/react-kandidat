import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea,
} from 'recharts';
import getEvaliuate from '../../connections/getEvaliuate';
import Loading from '../layout/Loading';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import formatDataToRequest from '../../functions/formatDataToRequest';
import AnalysInfo from '../layout/AnalysInfo';
import KursInfoPopUp from '../layout/KursInfoPopUp';
import { Help } from './Help';
const Evaliuate = ({ programKod, kursKoder, selectedCourses }) => {
  const [kursutvarderingsbetyg, setKursUtvarderingsBetyg] = useState();
  const [nrBetyg, setNrBetyg] = useState();
  const [nrKurser, setNrKurser] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState();
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    const formattedKurskoder = formatDataToRequest(kursKoder, 'kurskod');
    getEvaliuate(formattedKurskoder)
      .then((res) => {
        setKursUtvarderingsBetyg(res.data);
        setNrBetyg(res.total_betyg);
        setNrKurser(res.total_kurser);
        setLoading(false);
      })
      .catch((err) => setErrorMsg(true));
  }, [programKod, kursKoder]);

  const handleClose = () => {
    setSelectedCourse();
  };

  if (errorMsg) {
    return (
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        height={'50vh'}
      >
        <Typography>
          Inget hittades för de valda parameterarna. Försök med andra kurser
          eller program
        </Typography>
      </Grid>
    );
  }

  //Kräver DataKey för varje period då vi vill kunna använda namn som datakey för Xaxeln och utvärderingsbetyget för Yaxeln
  //Hämtar data i formatet [{name:****, 2019HT: ****,2020VT: ****, etc.... }]
  return loading ? (
    <Loading />
  ) : (
    <Grid container justifyContent='center'>
      <Help text="Välj kurser från filtreringen till höger för att visa data för fler kurser. Tryck på en kurskod för att få mer information om kursens studieresultat."/>
      <AnalysInfo
        firstVal={nrBetyg && nrBetyg}
        firstTitle='Antalet totala betyg'
        secondVal={nrKurser && nrKurser}
        secondTitle='Antalet kurser analyserade'
      />
      {selectedCourse && (
        <KursInfoPopUp kursKod={selectedCourse} handleClose={handleClose} />
      )}
      <Card style={{ width: '90%', height: 550 }}>
        <CardContent>
          <Typography variant='h1' fontWeight='medium' align='center'>
            Snittbetyg för kurser i Evaliuate
          </Typography>
          <ResponsiveContainer height={500} width='100%'>
            <BarChart
              data={kursutvarderingsbetyg}
              height={250}
              onClick={(e) => setSelectedCourse(e.activeLabel)}
            >
              <CartesianGrid
                strokeDasharray='3 0'
                CartesianGrid
                stroke='#d9d9d9'
                vertical={false}
              />
              <XAxis
                height={100}
                angle={-90}
                textAnchor='end'
                interval={0}
                tickMargin={10}
                dataKey='name'
                label={{ value: 'Kurskod', position: 'insideBottom' }}
              />

              <YAxis
                type='number'
                domain={[0, 5]}
                ticks={[1, 2, 3, 4, 5]}
                label={{
                  value: 'Snittbetyg',
                  angle: -90,
                  position: 'insideLeft',
                }}
              />

              <Tooltip />
              <Legend verticalAlign='top' align='right' />

              <Bar dataKey='2019HT' fill='#8884d8' />
              <Bar dataKey='2020VT' fill='#8224d8' />
              <Bar dataKey='2020HT' fill='#2284d8' />
              <Bar dataKey='2021VT' fill='#888422' />
              <Bar dataKey='2021HT' fill='#8822d8' />
              <ReferenceArea
                y1={0}
                y2={3}
                stroke='red'
                strokeDasharray='8 8'
                strokeOpacity={0.5}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Evaliuate;
