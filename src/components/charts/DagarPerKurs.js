import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
} from 'recharts';
import CourseList from '../layout/CourseList';
import getDagar from '../../connections/getDagarPerKurs';
import { Typography, Card, CardContent } from '@mui/material';
import getKursStartDatum from '../../connections/getKursStartDatum';
import getDagarPerKurs from '../../connections/getDagarPerKurs';
import formatDataToRequest from '../../functions/formatDataToRequest';
import Loading from '../layout/Loading';
import { Help } from './Help';

const DagarPerKurs = ({ kurskod }) => {
  const [dagarData, setDagarData] = useState([]);
  const [startDatum, setStartdatum] = useState([]);
  const [datesWithState, setDatesWithState] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(kurskod[0]);
  const [loading, setLoading] = useState(true);

  var colorArray = [
    '#FF6633',
    '#FF33FF',
    '#58508d',
    '#bc5090',
    '#ff6361',
    '#ffa600',
  ];

  useEffect(() => {
    setLoading(true);
    async function fetchAPI() {
      let kurs_datum = await getKursStartDatum(selectedCourse).then((res) => {
        return res.data;
      });

      setStartdatum(kurs_datum);

      let temp_arr_datum = kurs_datum.map((val) => {
        return val.STUDIEPERIOD_STARTDATUM;
      });

      const formattedStartDatum = formatDataToRequest(
        temp_arr_datum,
        'startdatum'
      );

      getDagarPerKurs(formattedStartDatum, selectedCourse).then((res) => {
        setDagarData(res.data);
        let activeFormatted = res.dates.map((datum) => {
          return { ...res.dates }, { datum, active: true };
        });
        setDatesWithState(activeFormatted);

        setLoading(false);
      });
    }

    fetchAPI();
  }, [selectedCourse]);

  //Hide course when clicked on label.
  const handleActive = (e) => {
    for (var i = 0; i < datesWithState.length; i++) {
      if (datesWithState[i].datum == e.value) {
        let newArr = [...datesWithState];
        let item = { ...newArr[i] };
        item.active = !item.active;
        newArr[i] = item;
        setDatesWithState(newArr);
      }
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <Card style={{ width: '90%' }}>
      <Help info={true} text="Grafen visar procentuella antalet som klarat kursen vid de olika resultatrapporteringarna. Genom att välja kurser från filtreringen uppdateras listan över kuser i listan i grafen." position="relative" x="-10px" y = "10px"/>
      <CardContent>
        <Typography variant='h1' fontWeight='medium' align='center'>
          Antal dagar till avslutad kurs för specifk kurs vid olika år.
        </Typography>
        <CourseList
          kurskod={kurskod}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
        />

        <ResponsiveContainer height={300} width='100%'>
          <LineChart data={dagarData}>
            <CartesianGrid strokeDasharray='6 6' vertical={false} />
            <XAxis
              type='number'
              dataKey='antalDagar'
              height={40}
              domain={[0, 'dataMax']}
            >
              <Label
                value='Antal dagar till avslutad kurs'
                offset={0}
                position='insideBottom'
              />
            </XAxis>
            <YAxis
              domain={[0, 100]}
              label={{
                value: 'Procent',
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign='top' onClick={handleActive} />
            {datesWithState &&
              datesWithState.map((res, indx) => (
                <Line
                  type='monotone'
                  dataKey={res.datum}
                  hide={!res.active}
                  stroke={colorArray[indx]}
                  connectNulls
                  dot={false}
                  key={indx}
                />
              ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DagarPerKurs;
