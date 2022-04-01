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
import getAvbrott from '../../connections/test/getAvbrott';

const Histogram = () => {
  const [avbrott, setAvbrott] = useState([]);

  useEffect(() => {
    getAvbrott().then((data) => {
      setAvbrott(data.data);
    });
  }, []);
  return (
    <BarChart width={1000} height={250} data={avbrott}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="kurskod" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="avbrott" fill="#8884d8" />
    </BarChart>
  );
};

export default Histogram;
