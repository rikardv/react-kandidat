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

const Dagar = (data) => {
  //Denna används för datesToDays och består av kurskod, personnummer, startdatum, senaste tentadatum, betyg (0 för U, 1 för G).
  const [newData, setNewData] = useState([]);
  useEffect(() => {
    setNewData(data.data);
  }, [data]);

  //Denna ska användas för att skapa const graf = newData2.map((res) => som kallar på datesToDays (?)
  //består av kurskod, antal unika personnummer,
  const [newData2, setNewData2] = useState([]);
  useEffect(() => {
    setNewData2(data.data2);
  }, [data.data2]);

  //loopar igenom gamla arrayen
  const datesToDays = newData.map((res) => {
    var nr_g = 0; //för att lagra antal godkända.
    var nr_days = 0; //för att lagra antal dagar.
    var start = new Date(res.kursStart); //hämta tiden då kursen påbörjades.
    const _MS_PER_DAY = 1000 * 60 * 60 * 24; //för att omvandla till dagar.

    //om godkänd i kursen.
    if (res.failOrPass == 1) {
      var slut = new Date(res.tentaDatum); //hämta tiden då senaste tentan utfördes.
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
    var Differnce_In_Time = today.getTime() - start.getTime(); //beräkna tiden mellan idag och när kursen påbörjades.
    var nr_days = Differnce_In_Time / _MS_PER_DAY; //omvandla till dagar.

    return {
      kurskod: res.kurskod,
      antal_dagar: nr_days,
      antal_g: nr_g,
    };
  });

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

  const sortedSimiliar = addSimiliar(datesToDays).sort((a, b) =>
    a.antal_dagar > b.antal_dagar ? 1 : -1
  );

  const calcPercentage = () => {
    let res = [];

    for (var i = 0; i < sortedSimiliar.length; i++) {
      res[i] = {
        procent:
          (sortedSimiliar[i].antal_g / data.data2[0].pnr) * 100 +
          (i != 0 ? res[i - 1].procent : 0),
        antal_dagar: parseFloat(sortedSimiliar[i].antal_dagar),
      };
    }

    res.pop({
      procent: 0,
      antal_dagar: 0,
    });

    return res;
  };

  return (
    <ResponsiveContainer width="80%" height={250}>
      <LineChart width={1000} height={250} data={calcPercentage()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" dataKey="antal_dagar" domain={[0, 'dataMax']} />
        <YAxis dataKey="procent" domain={[0, 100]} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="procent" />
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
