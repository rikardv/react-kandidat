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
import getAvhopp from '../../connections/getAvhopp';
import { useTheme, Card, CardContent, Typography, Grid } from '@mui/material';
import Loading from '../layout/Loading';
import formatDataToRequest from '../../functions/formatDataToRequest';
import AnalysInfo from '../layout/AnalysInfo';
import KursInfoPopUp from '../layout/KursInfoPopUp';
import { Help, Info } from './Help';

const Avhopp = ({ programKod, startDatum, slutDatum }) => {
  const theme = useTheme();
  const [avbrott, setAvbrott] = useState([]);
  const [nrAvbrott, setNrAvbrott] = useState();
  const [nrKurser, setNrKurser] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState();

  useEffect(() => {
    setLoading(true);
    const formattedProgramKod = formatDataToRequest(programKod, 'program');
    getAvhopp(formattedProgramKod, startDatum, slutDatum).then((data) => {
      setAvbrott(data.data);
      setNrAvbrott(data.total_avhopp);
      setNrKurser(data.total_kurser);
      setLoading(false);
    });
  }, [programKod]);

  const handleClose = () => {
    setSelectedCourse();
  };
  return loading ? (
    <Loading />
  ) : (
    <Grid
      display='flex'
      flexWrap='wrap'
      rowGap={2}
      justifyContent='space-evenly'
      width='100%'
    >
      <Help text='Histogrammet visar hur många studenter som hoppat av varje kurs.' />
      <AnalysInfo
        firstVal={nrKurser && nrKurser}
        firstTitle='Antalet kurser analyserade'
        secondVal={nrAvbrott && nrAvbrott}
        secondTitle='Totalt antal avhopp '
      />
      {selectedCourse && (
        <KursInfoPopUp kursKod={selectedCourse} handleClose={handleClose} />
      )}
      {avbrott &&
        avbrott.map((res, indx) => (
          <Grid
            key={indx}
            display='flex'
            justifyContent='space-evenly'
            width='90%'
          >
            <Card
              style={{
                width: '90%',
                height: 'auto',
                marginBottom: '20px',
              }}
            >
              <CardContent>
                <Info
                  text={
                    'Tryck på en kurskod för att få mer infomation om kursens studieresultat.'
                  }
                />
                <Typography variant='h1' fontWeight='medium' align='center'>
                  Avhopp per kurs för {res.program_namn ?? res.program}
                </Typography>

                <ResponsiveContainer height={500} width='100%'>
                  <BarChart
                    data={res.data}
                    onClick={(e) => setSelectedCourse(e.activeLabel)}
                  >
                    <CartesianGrid horizontal={false} vertical={false} />
                    <XAxis
                      height={100}
                      dataKey='kurskod'
                      angle={-90}
                      textAnchor='end'
                      interval={0}
                      tickMargin={10}
                      label={{ value: 'Kurskod', position: 'insideBottom' }}
                    />
                    <YAxis
                      label={{
                        value: 'Antal studenter',
                        angle: -90,
                        position: 'insideLeft',
                      }}
                    />
                    <Tooltip />

                    <Bar dataKey='avbrott' fill={theme.palette.primary.main} />
                  </BarChart>
                </ResponsiveContainer>
                <Typography>Kurs med flest antal avhopp</Typography>
                <Typography>{res.data[0].kurskod}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default Avhopp;
