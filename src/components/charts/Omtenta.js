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
import { Help, Info } from './Help';

const Omtenta = (props) => {
  const [loading, setLoading] = useState(true);
  const [omTenta, setOmtenta] = useState();
  const [howManyStudents, setHowManyStudents] = useState('0');
  const [howManyCourses, setHowManyCourses] = useState('0');
  useEffect(() => {
    // res = data (re-exam data), data2 (how many students have done the tenta), data3 (data of students who passed the exam)
    getOmtenta(props.kursKoder).then((res) => {
      setLoading(true);
      let graphData = [
        { name: 1 },
        { name: 2 },
        { name: 3 },
        { name: 4 },
        { name: '5+' },
      ];
      for (let k in props.kursKoder) {
        let kurs = props.kursKoder[k];
        setLoading(true);

        //Filtering out the students who have not passed the exam yet.
        let student_data = res.data[kurs].filter((person) => {
          for (let i = 0; i < res.data3[kurs].length; ++i) {
            if (res.data3[kurs][i].persnr == person.persnr) return true;
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
        for (let i = 0; i < counter.length - 1; ++i)
          graphData[i][kurs] =
            Math.round((10000 * counter[i]) / res.data2[kurs][0].value) / 100;

        graphData[4][kurs] =
          Math.round((10000 * counter[4]) / res.data2[kurs][0].value) / 100;
      }

      let a = {};
      for (let prop in res.data3)
        for (let i = 0; i < res.data3[prop].length; ++i)
          a[res.data3[prop][i].persnr] = '';

      setHowManyStudents(Object.keys(a).length);
      setHowManyCourses(props.kursKoder.length);
      setOmtenta(graphData);
      setLoading(false);
    });
  }, [props]);

    return loading ? (
        <Loading />
    ) : (
            <Grid container width='100%' style={{display: "flex", flexDirection: "column", alignItems: "center"} }>
      <Help text="Lägg till fler kurser i filtret till höger för att jämföra hur många omtentor som görs i varje kurs."/>
      <AnalysInfo
        firstVal={howManyStudents}
        firstTitle='Antal studenter'
        secondVal={howManyCourses}
        secondTitle='Antal kurser'
      />
                <Grid style={{ backgroundColor: "white", width: "90%", height: "500px" }}>
                    <Info text="Grafen visar hur många omtentor det krävs för att klara en kurs. Datan visas i procent." />

      <ResponsiveContainer width='100%' height='90%'>
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
          {Object.keys(omTenta[0]).map((kurs) => {
            if (kurs != 'name')
              return (
                <Bar
                  key={kurs}
                  dataKey={kurs}
                  fill={'#' + Math.floor(Math.random() * 16777215).toString(16)}
                />
              );
          })}
        </BarChart>
      </ResponsiveContainer>
    </Grid>
    </Grid>
  );
};

export default Omtenta;
