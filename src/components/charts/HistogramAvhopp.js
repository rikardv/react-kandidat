import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import getAvbrott from '../../connections/test/getAvbrott';
import { useTheme } from '@mui/material/styles';
import Loading from '../layout/Loading';

const HistogramAvhopp = () => {
  const theme = useTheme();
  const [avbrott, setAvbrott] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAvbrott().then((data) => {
      setAvbrott(data.data);
      setLoading(false);
    });
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <ResponsiveContainer height={500} width='90%'>
      <BarChart data={avbrott}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='kurskod' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='avbrott' fill={theme.palette.primary.main} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HistogramAvhopp;
