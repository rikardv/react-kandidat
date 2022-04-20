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
import { Button, Typography, Card, CardContent } from '@mui/material';
import Loading from '../layout/Loading';

const Dagar = ({ kurskod }) => {
  const [dagarData, setDagarData] = useState([]);
  const [emptyMessage, setEmptyMessage] = useState(false);
  const [loading, setLoading] = useState(false);


  var colorArray = [
    '#FF6633',
    '#FF33FF',
    '#58508d',
    '#bc5090',
    '#ff6361',
    '#ffa600',
  ];

  const handleSelectDate = (startdatum) => {
    startLoad();
    getDagar(kurskod, startdatum).then((res) => {
     

      if (res.data.length == 1) {
        setEmptyMessage(true);
        setLoading(true);
      } else {
        setLoading(false);
        setEmptyMessage(false);
        setDagarData([...dagarData, { res: res.data, active: false }]);
        
      }
    });
  };

  const startLoad = () =>{
    
    setLoading(true);
  }

  const clearData = () => {
    setDagarData([]);
  };

  const handleActive = (e) => {
    for (var i = 0; i < dagarData.length; i++) {
      if (dagarData[i].res[0].start_datum == e.value) {
        let newArr = [...dagarData];
        let item = { ...newArr[i] };
        item.active = !item.active;
        newArr[i] = item;
        setDagarData(newArr);
      }
    }
  };
  useEffect(() => {
    //console.log(dagarData[0]);
  });
  return (
   
    <>
      <div>
        Kurs: {kurskod}
        <DatesList kurskod={kurskod} handleSelectDate={handleSelectDate} startLoad={()=> startLoad()} />
        <Button onClick={() => clearData()} variant='outlined'>
          Rensa
        </Button>
      </div>
    {loading ? (//Inte det lättaste att fixa en load som ser bra ut, men jag tror det här är det bästa jag kan göra utan att börja skicka en massa parametrar
    <Loading></Loading>
  ) : ( <Card style={{ width: '90%', height: 550 }}>
  <CardContent>
    <Typography variant='h1' fontWeight='medium' align='center'>
      Antal dagar till avslutad kurs
    </Typography>
    <ResponsiveContainer height={500} width='100%'>
      <LineChart>
        <CartesianGrid
          strokeDasharray='3 3'
          horizontal={false}
          vertical={false}
        />
        <XAxis
          type='number'
          dataKey='antal_dagar'
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
          dataKey='andel_procent'
          domain={[0, 100]}
          label={{ value: 'Procent', angle: -90, position: 'insideLeft' }}
        />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign='top' height={30} onClick={handleActive} />
        {dagarData &&
          dagarData.map((data, indx) => (
            <Line
              type='monotone'
              dataKey='andel_procent'
              name={data.res[0].start_datum}
              data={data.res}
              hide={data.active}
              stroke={colorArray[indx]}
              connectNulls
              dot={false}
            />
          ))}
      </LineChart>
    </ResponsiveContainer>
  </CardContent>
</Card> )}
    {emptyMessage ? (
      <Typography>
        Den är ännu ingen som klarat kursen med det här registreringsdatumet!
      </Typography>
    ) : null}
  </>
)
};
       
   


export default Dagar;
