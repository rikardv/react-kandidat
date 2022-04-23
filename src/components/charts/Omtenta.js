/**
 * Function that visualizes how many re-exams students have done before passing an exam.
 * NOTE: Only data from students who passed the exam at some point will be concidered in this function.
 */

import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  Label,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import getOmtenta from '../../connections/getOmtenta';
import Loading from '../layout/Loading';
import AnalysInfo from '../layout/AnalysInfo';
import { Grid } from '@mui/material';
let graphData = [];
const Omtenta = () => {
  const [loading, setLoading] = useState(true);
  const [omTenta, setOmtenta] = useState();

  useEffect(() => {
    // res = data (re-exam data), data2 (how many students have done the tenta), data3 (data of students who passed the exam)
    getOmtenta().then((res) => {
      //Filtering out the students who have not passed the exam yet.
      let student_data = res.data.filter((person) => {
        for (let i = 0; i < res.data3.length; ++i) {
          if (res.data3[i].persnr == person.persnr) return true;
        }

        return false;
      });

      // Storing the students based on how many re-exams they have done before passing the exam.
      let counter = [[], [], [], [], []];
      let v = 0;
      for (let i = 0; i < student_data.length; ++i) {
        if (student_data[i].value > 5) v = 4;
        else v = student_data[i].value - 1;

        ++counter[v];
      }

      // Rearanging the data to suit the recharts histogram
      graphData = [];
      for (let i = 0; i < counter.length - 1; ++i)
        graphData.push({
          name: i + 1,
          value: (100 * counter[i]) / res.data2[0].value,
        });

      graphData.push({
        name: '5+',
        value: (100 * counter[4]) / res.data2[0].value,
      });

      setOmtenta(graphData);

      setLoading(false);
    });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Grid container width='100%'>
      <AnalysInfo
        firstVal={69}
        firstTitle='Placeholder'
        secondVal={69}
        secondTitle='Placeholder'
      />
      <ResponsiveContainer width={'100%'} height={500}>
        <BarChart
          width={500}
          height={300}
          data={omTenta}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name'>
            <Label
              value='Antal omtentor tills klarad tenta'
              offset={0}
              position='insideBottom'
            />
          </XAxis>
          <YAxis>
            <Label value='Antal studnter i procent' offset={0} angle={-90} />
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey='value' fill='#8884d8' />
        </BarChart>
      </ResponsiveContainer>
    </Grid>
  );
};

export default Omtenta;
