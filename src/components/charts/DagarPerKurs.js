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

const DagarPerKurs = ({ kurskod }) => {
  const [dagarData, setDagarData] = useState([]);
  const [startDatum, setStartdatum] = useState([]);
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

      const formattedStartDatum = formatDataToRequest(
        kurs_datum.map((val) => {
          return val.STUDIEPERIOD_STARTDATUM;
        }),
        'startdatum'
      );
      getDagarPerKurs(formattedStartDatum, selectedCourse).then((res) => {
        setDagarData(res.data);
        console.log(res.data);
        setLoading(false);
      });
    }

    fetchAPI();
  }, [selectedCourse]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <CourseList
        kurskod={kurskod}
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
      />

      <Card style={{ width: '90%', height: 550 }}>
        <CardContent>
          <Typography variant='h1' fontWeight='medium' align='center'>
            Antal dagar till avslutad kurs
          </Typography>

          <ResponsiveContainer height={500} width='100%'>
            <LineChart>
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

              <Legend verticalAlign='top' />
              {dagarData &&
                dagarData.map((res, indx) => (
                  <Line
                    type='monotone'
                    dataKey={res.startdatum}
                    stroke={colorArray[indx]}
                    connectNulls
                    dot={false}
                  />
                ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default DagarPerKurs;
