import { Stack, Typography } from '@mui/material';
import React from 'react';
import FilterMenyKort from '../layout/FilterMenyKort';

const FiltreringContainer = () => {
  return (
    <Stack justifyContent={'center'} alignItems='center' spacing={3}>
      <Typography style={{ margin: 10 }} variant='h1'>
        Filtreringar
      </Typography>
      <FilterMenyKort
        titel='Program'
        data={['Program1', 'Program2', 'Program3']}
      />
      <FilterMenyKort titel='Kurser' data={['Kurs1', 'Kurs2', 'Kurs3']} />
      <FilterMenyKort titel='Antagningsår' data={['År1', 'År2']} />
    </Stack>
  );
};

export default FiltreringContainer;
