import React, { useEffect, useState } from "react";
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
} from "recharts";

const Dagar = (data) => {
  const [newData, setNewData] = useState([]);
  useEffect(() => {
    setNewData(data.data);
  }, [data]);

  const datesToDays = newData.map((res) => {
    //loopar igenom gamla arrayen
    // res.start_date är start-datum
    // res.end_date är slut-datum
    //beräkna nr_days utifrån dessa
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    var nr_days = 0;

    var start = new Date(res.startdatum);
    var slut = new Date(res.slutdatum);
    var Difference_In_Time = slut.getTime() - start.getTime();
    var nr_days = Difference_In_Time / _MS_PER_DAY;

    return {
      kurskod: res.kurskod,
      antal_dagar: nr_days,
    };
  });

  return (
    <ResponsiveContainer width="80%" height={250}>
      <LineChart width={1000} height={250} data={datesToDays}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="kurskod" />
        <YAxis dataKey="antal_dagar" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="antal_dagar" />
        {newData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={"#11636C"} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Dagar;
