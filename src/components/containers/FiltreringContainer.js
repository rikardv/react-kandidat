import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FilterMenyKort from '../layout/FilterMenyKort';
import getProgramKoder from '../../connections/getProgramKoder';
import Loading from '../layout/Loading';

const FiltreringContainer = ({
  selectedProgram,
  setSelectedProgram,
  selectedCourses,
  setSelectedCourses,
  selectedStartDates,
  setSelectedStartDates,
}) => {
  const [allaProgram, setAllaProgram] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProgramKoder(10).then((res) => {
      setAllaProgram(res.data);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Stack justifyContent={'center'} alignItems='center' spacing={3}>
      <Typography style={{ margin: 10 }} variant='h1'>
        Filtreringar
      </Typography>
      <FilterMenyKort
        titel='Program'
        data={allaProgram.map((e) => e.YTTERSTA_KURSPAKETERING_KOD)}
        selected={selectedProgram}
        setSelected={setSelectedProgram}
      />
      <FilterMenyKort
        titel='Kurser'
        data={['Kurs1', 'Kurs2', 'Kurs3']}
        selected={selectedCourses}
        setSelected={setSelectedCourses}
      />
      <FilterMenyKort
        titel='Antagningsår'
        data={['År1', 'År2']}
        selected={selectedStartDates}
        setSelected={setSelectedStartDates}
      />
    </Stack>
  );
};

export default FiltreringContainer;
