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

const Dagar = (data) => {
  //Denna används för datesToDays och består av kurskod, personnummer, startdatum, senaste tentadatum, betyg (0 för U, 1 för G).
  const [newData, setNewData] = useState([]);
  useEffect(() => {
    setNewData(data.data);
  }, [data]);

  //beräkna antal dagar till avslutad kurs för varje person som läst kursen.
  const datesToDays = newData.map((res) => {
    var nr_g = 0; //för att lagra antal godkända.
    var nr_days = 0; //för att lagra antal dagar.
    var start = new Date(res.kursStart); //hämta tiden då kursen påbörjades.
    const _MS_PER_DAY = 1000 * 60 * 60 * 24; //för att omvandla till dagar.

    //om godkänd i kursen.
    if (res.failOrPass === 1) {
      var slut = new Date(res.tentaDatum); //hämta tiden då senaste tentan utfördes.
      var Difference_In_Time = slut.getTime() - start.getTime(); //beräkna tiden mellan idag och när kursen påbörjades.
      //UNDIVK BUGG OM NÅGON SKULLE LÄST KURSEN VID ETT TIDIGARE TILLFÄLLE PÅ EN ANNAN UTBILDNING
      //behöver även en check för att kolla om listan är tom (dvs ingen har läst kursen än).
      if (Difference_In_Time <= 0) {
        return {
          kurskod: res.kurskod,
          antal_dagar: nr_days,
          antal_g: nr_g,
        };
      }
      nr_days = Difference_In_Time / _MS_PER_DAY; //omvandla till dagar.

      nr_g += 1; //antal godkända ökar med 1.
      return {
        kurskod: res.kurskod,
        antal_dagar: nr_days,
        antal_g: nr_g,
      };
    }

    //om ej godkänd i kursen har man inte avslutat kursen på nr_days dagar. nr_g blir därmed 0.
    var today = new Date(); //skapa objekt med dagens datum..
    var Differnce_In_Time = today.getTime() - start.getTime(); //beräkna tiden mellan idag och när kursen påbörjades.
    nr_days = Math.round(Differnce_In_Time / _MS_PER_DAY); //omvandla till dagar.

    return {
      kurskod: res.kurskod,
      antal_dagar: nr_days,
      antal_g: nr_g,
    };
  });

  //Summerar alla som klarat kursen vid ett visst datum.
  const addSimiliar = (datesToDays) => {
    const res = Array.from(
      datesToDays.reduce(
        (m, { antal_dagar, antal_g }) =>
          m.set(antal_dagar, (m.get(antal_dagar) || 0) + antal_g),
        new Map()
      ),
      ([antal_dagar, antal_g]) => ({ antal_dagar, antal_g })
    );

    return res;
  };

  //Sorterar alla dagar som folk klarat kursen.
  const sortedSimiliar = addSimiliar(datesToDays).sort((a, b) =>
    a.antal_dagar > b.antal_dagar ? 1 : -1
  );

  //Beräknar procentuellt hur många som klarat kursen.
  const calcPercentage = () => {
    let res = []; //Används för att plotta grafen.
    //Första elementet sätts till 0 för att grafen ska börja i origo.
    res[0] = {
      procent: 0,
      antal_dagar: 0,
    };
    //För varje dag i den sorterade listan beräknar vi den procentuella förändringen i antalet som klarat kursen och avrundar till två decimaler.
    //data.data2[0].pnr är antalet som är registrerade på kursen. * 100 för att få i procent.
    for (var i = 0; i < sortedSimiliar.length; i++) {
      res[i + 1] = {
        procent:
          Math.round(
            ((sortedSimiliar[i].antal_g / data.data2[0].pnr) * 100 +
              (i !== 0 ? res[i].procent : 0)) *
              100
          ) / 100,
        antal_dagar: sortedSimiliar[i].antal_dagar,
      };
    }
    return res;
  };

  return (
    <ResponsiveContainer width='80%' height={250}>
      <LineChart width={1000} height={250} data={calcPercentage()}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis type='number' dataKey='antal_dagar' domain={[0, 'dataMax']}>
          <Label
            value='Antal dagar till avslutad kurs'
            offset={0}
            position='insideBottom'
          />
        </XAxis>
        <YAxis
          dataKey='procent'
          domain={[0, 100]}
          label={{ value: 'Procent', angle: -90, position: 'insideLeft' }}
        />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign='top' height={30} />
        <Line type='monotone' dataKey='procent' />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Dagar;
