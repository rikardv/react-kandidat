import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const Dagar = (data, data2) => {
  //Denna används för datesToDays och består av kurskod, personnummer, startdatum, senaste tentadatum, betyg (0 för U, 1 för G).
  const [newData, setNewData] = useState([]);
  useEffect(() => {
    setNewData(data.data);
  }, [data]);

  //Denna ska användas för att skapa const graf = newData2.map((res) => som kallar på datesToDays (?)
  //består av kurskod, antal unika personnummer,
  const [newData2, setNewData2] = useState([]);
  useEffect(() => {
    setNewData2(data2.data2);
  }, [data2]);

  //loopar igenom gamla arrayen
  const datesToDays = newData.map((res) => {
    var nr_g = 0; //för att lagra antal godkända.
    var nr_days = 0; //för att lagra antal dagar.
    var start = new Date(res.startdatum); //hämta tiden då kursen påbörjades.
    const _MS_PER_DAY = 1000 * 60 * 60 * 24; //för att omvandla till dagar.

    //om godkänd i kursen.
    if (res.betyg == 1) {
      var slut = new Date(res.senasteTenta); //hämta tiden då senaste tentan utfördes.
      var Difference_In_Time = slut.getTime() - start.getTime(); //beräkna tiden mellan idag och när kursen påbörjades.
      var nr_days = Difference_In_Time / _MS_PER_DAY; //omvandla till dagar.
      nr_g += 1; //antal godkända ökar med 1.
      return {
        kurskod: res.kurskod,
        antal_dagar: nr_days,
        antal_g: nr_g,
      };
    }

    //om ej godkänd i kursen har man inte avslutat kursen på nr_days dagar. nr_g blir därmed 0.
    var today = new Date(); //skapa objekt med dagens datum.
    var date =
      today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDay(); //hämta dagens datum.
    var Differnce_In_Time = date.getTime() - start.getTime(); //beräkna tiden mellan idag och när kursen påbörjades.
    var nr_days = Differnce_In_Time / _MS_PER_DAY; //omvandla till dagar.
    return {
      kurskod: res.kurskod,
      antal_dagar: nr_days,
      antal_g: nr_g,
    };
  });

  return (
    <ResponsiveContainer width='80%' height={250}>
      <LineChart width={1000} height={250} data={datesToDays}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='antal_dagar' />
        <YAxis dataKey='antal_g' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type='monotone' dataKey='kurskod' />
        {newData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={'#11636C'} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Dagar;

/*import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const Dagar = (data) => {
  const [newData, setNewData] = useState([]);
  useEffect(() => {
    setNewData(data.data);
  }, [data]);

  const datesToDays = newData.map((res) => {
    //loopar igenom gamla arrayen
    // res.startdatum är startdatum
    // res.senasteTenta är slutdatum
    //beräkna nr_days utifrån dessa

    //om godkänd i kursen.
    if (res.betyg == 1) {
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      var nr_days = 0;

      var start = new Date(res.startdatum);
      var slut = new Date(res.senasteTenta);
      var Difference_In_Time = slut.getTime() - start.getTime();
      var nr_days = Difference_In_Time / _MS_PER_DAY;
      return {
        kurskod: res.kurskod,
        antal_dagar: nr_days,
      };
    }
  });

  return (
    <ResponsiveContainer width='80%' height={250}>
      <LineChart width={1000} height={250} data={datesToDays}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='kurskod' />
        <YAxis dataKey='antal_dagar' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type='monotone' dataKey='antal_dagar' />
        {newData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={'#11636C'} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Dagar;
*/
