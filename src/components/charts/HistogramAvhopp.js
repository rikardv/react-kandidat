import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import getAvbrott from '../../connections/test/getAvbrott';
import { useTheme } from '@mui/material/styles';
import Loading from '../layout/Loading';

const HistogramAvhopp = ({
  programKod,
  selectedCourses,
  startDatum,
  slutDatum,
}) => {
  // const program = '6CDDD'; //6CMEN, 6CDDD, 6CIEN, 6CMJU, 6KGDK
  // const startDatum = '2012-01-03';
  // const slutDatum = '2022-03-04';
  const theme = useTheme();
  const [avbrott, setAvbrott] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAvbrott(programKod, startDatum, slutDatum).then((data) => {
      setAvbrott(data.data);
      setLoading(false);
    });
  }, [programKod]);
  return loading ? (
    <Loading />
  ) : (
    <ResponsiveContainer height={550} width='90%'>
      <BarChart data={avbrott}>
        <CartesianGrid
          strokeDasharray='3 3'
          horizontal={false}
          vertical={false}
        />
        <XAxis
          height={100}
          dataKey='kurskod'
          angle={-90}
          textAnchor='end'
          interval={0}
          tickMargin={10}
        />
        <YAxis />
        <Tooltip />

        <Bar dataKey='avbrott' fill={theme.palette.primary.main} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HistogramAvhopp;
