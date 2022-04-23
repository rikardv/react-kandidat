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

const DagarNew = ({ kurskod, startDatum }) => {
  const [dagar, setDagar] = useState();
  const [loading, setLoading] = useState(true);
  const [coursesWithState, setCoursesWithState] = useState();
  const [nrStudents, setNrStudents] = useState();
  const [nrCourses, setNrCourses] = useState();

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

  return (
    <Grid
      display='flex'
      flexWrap='wrap'
      rowGap={2}
      justifyContent='space-evenly'
      width='100%'
    >
      <AnalysInfo
        firstVal={nrStudents && nrStudents}
        firstTitle='Antalet studenter analyserade'
        secondVal={nrCourses && nrCourses}
        secondTitle='Antalet kurser analyserade'
      />
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
            <LineChart data={dagar}>
              <CartesianGrid horizontal={false} vertical={false} />
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
              <Legend verticalAlign='top' height={30} onClick={handleActive} />
              {coursesWithState &&
                coursesWithState.map((item) => (
                  <Line
                    type='monotone'
                    dataKey={item.kurs}
                    hide={!item.active}
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
