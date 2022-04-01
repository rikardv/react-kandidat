import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

const Histogram = (data) => {
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    setNewData(data.data);
  }, [data]);
  return (
    <BarChart width={1000} height={250} data={newData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="kurskod" />
      <YAxis  />
      <Tooltip />
      <Legend />
      <Bar dataKey="avbrott" fill="#8884d8" />
    </BarChart>
  );
};

export default Histogram;
