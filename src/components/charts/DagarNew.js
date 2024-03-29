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
import AnalysInfo from '../layout/AnalysInfo';
import DagarPerKurs from './DagarPerKurs';
import { Help, Info } from './Help';

const DagarNew = ({ kurskod, startDatum }) => {
  const [dagar, setDagar] = useState();
  const [loading, setLoading] = useState(true);
  const [coursesWithState, setCoursesWithState] = useState();
  const [nrStudents, setNrStudents] = useState();
  const [nrCourses, setNrCourses] = useState();

  const colorArray = [
    '#FD7272',
    '#54a0ff',
    '#2ecc71',
    '#9b59b6',
    '#34495e',
    '#16a085',
    '#27ae60',
    '#2980b9',
    '#8e44ad',
    '#2c3e50',
    '#f1c40f',
    '#e67e22',
    '#e74c3c',
    '#ecf0f1',
    '#95a5a6',
    '#f39c12',
    '#d35400',
    '#c0392b',
    '#bdc3c7',
    '#7f8c8d',
    '#55efc4',
    '#81ecec',
    '#74b9ff',
    '#a29bfe',
    '#dfe6e9',
    '#00b894',
    '#00cec9',
    '#0984e3',
    '#6c5ce7',
    '#ffeaa7',
    '#fab1a0',
    '#ff7675',
    '#fd79a8',
    '#fdcb6e',
    '#e17055',
    '#d63031',
    '#feca57',
    '#5f27cd',
    '#54a0ff',
    '#01a3a4',
  ];

  var randomColor = Math.floor(Math.random() * 16777215).toString(16);

  useEffect(() => {
    setLoading(true);
    let activeFormatted = kurskod.map((kurs) => {
      return { ...kurskod }, { kurs, active: true };
    });
    setCoursesWithState(activeFormatted);
    const formattedKursKoder = formatDataToRequest(kurskod, 'kurskod');
    getDagarNew(formattedKursKoder, startDatum).then((res) => {
      setDagar(res.data);
      setLoading(false);
      setNrStudents(res.total_studenter);
      setNrCourses(res.total_kurser);
    });
  }, [kurskod, startDatum]);

  //Hide course when clicked on label.
  const handleActive = (e) => {
    for (var i = 0; i < coursesWithState.length; i++) {
      if (coursesWithState[i].kurs == e.value) {
        let newArr = [...coursesWithState];
        let item = { ...newArr[i] };
        item.active = !item.active;
        newArr[i] = item;
        setCoursesWithState(newArr);
      }
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <Grid
      display='flex'
      flexWrap='wrap'
      rowGap={2}
      justifyContent='center'
      width='100%'
      style={{ marginBottom: '50px' }}
    >
      <AnalysInfo
        firstVal={nrStudents && nrStudents}
        firstTitle='Antalet studenter analyserade'
        secondVal={nrCourses && nrCourses}
        secondTitle='Antalet kurser analyserade'
      />
      <Grid
        display='flex'
        justifyContent='space-evenly'
        style={{ width: '90%' }}
      >
        <Card
          style={{
            width: '100%',
            height: 'auto',
          }}
        >
          <Info text='Grafen visar procentuella antalet som klarat kurserna vid resultatrapporteringarna. Välj kurser från filtreringen till höger för att visa data för flera kurser. Tryck på labeln för att dölja linje från grafen, tryck igen för att visa.' />
          <Help text='Dra muspekaren över graferna för att få mer information om dem. Tryck på labeln för att dölja linje från grafen, tryck igen för att visa.' />
          <CardContent>
            <Typography variant='h1' fontWeight='medium' align='center'>
              Dagar till avklarad kurs för flera kurser
            </Typography>
            <ResponsiveContainer height={300} width='90%'>
              <LineChart data={dagar} margin={10}>
                <CartesianGrid strokeDasharray='6 6' vertical={false} />
                <XAxis
                  dataKey='antalDagar'
                  type='number'
                  label={{
                    value: 'Antal dagar till avslutad kurs',
                    position: 'insideBottom',
                  }}
                  height={40}
                  domain={[0, 'dataMax']}
                />
                <YAxis
                  label={{
                    value: 'Procent',
                    angle: -90,
                    position: 'insideLeft',
                  }}
                />
                <Tooltip />
                <Legend verticalAlign='top' onClick={handleActive} />
                {coursesWithState &&
                  coursesWithState.map((item, indx) => (
                    <Line
                      type='monotone'
                      dataKey={item.kurs}
                      hide={!item.active}
                      dot={false}
                      stroke={colorArray[indx]}
                      connectNulls
                      key={indx}
                    />
                  ))}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        display='flex'
        justifyContent='space-evenly'
        style={{ width: '90%' }}
      >
        <DagarPerKurs kurskod={kurskod} />
      </Grid>
    </Grid>
  );
};

export default DagarNew;
