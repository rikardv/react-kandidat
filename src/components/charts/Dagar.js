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
import DatesList from './DatesList';
import getDagar from '../../connections/test/getDagar';
import { Button } from '@mui/material';

const Dagar = () => {
  const [dagarData, setDagarData] = useState([]);
  const kurskod = 'TNM046';
  var colorArray = [
    '#FF6633',
    '#FFB399',
    '#FF33FF',
    '#FFFF99',
    '#00B3E6',
    '#E6B333',
    '#3366E6',
    '#999966',
    '#99FF99',
    '#B34D4D',
    '#80B300',
    '#809900',
    '#E6B3B3',
  ];

  const handleSelectDate = (startdatum) => {
    getDagar(kurskod, startdatum).then((res) => {
      setDagarData([...dagarData, res.data]);
    });
  };

  const clearData = () => {
    setDagarData([]);
  };

  const [isHidden, setIsHidden] = useState({
    start_datum: false,
  });

  //Toggla linjer.
  const toggle = (event) => {
    isHidden[event] = !isHidden[event];
    setIsHidden({ ...isHidden });
  };

  return (
    <>
      <ResponsiveContainer width='80%' height={250}>
        <LineChart width={1000} height={250}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis type='number' dataKey='antal_dagar' domain={[0, 'dataMax']}>
            <Label
              value='Antal dagar till avslutad kurs'
              offset={0}
              position='insideBottom'
            />
          </XAxis>
          <YAxis
            dataKey='andel_procent'
            domain={[0, 100]}
            label={{ value: 'Procent', angle: -90, position: 'insideLeft' }}
          />
          <YAxis />
          <Tooltip />
          <Legend
            verticalAlign='top'
            height={30}
            onClick={() => toggle('start_datum')}
          />
          {dagarData &&
            dagarData.map((data, indx) => (
              <Line
                type='monotone'
                dataKey='andel_procent'
                name={data[0].start_datum}
                data={data}
                stroke={colorArray[indx]}
                connectNulls
                dot={false}
                hide={isHidden.start_datum}
              />
            ))}
        </LineChart>
      </ResponsiveContainer>

      <DatesList kurskod={kurskod} handleSelectDate={handleSelectDate} />
      <Button onClick={() => clearData()} variant='outlined'>
        Rensa
      </Button>
    </>
  );
};

export default Dagar;
