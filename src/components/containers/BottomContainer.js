import { Stack, Typography, useTheme } from '@mui/material';
import React from 'react';

const BottomContainer = () => {
  const theme = useTheme();
  return (
    <Stack
      height='5vh'
      style={{ backgroundColor: 'black' }}
      width='100%'
      direction='row'
      alignItems='center'
    >
      <Typography marginLeft='1%' color='white' fontWeight={'bold'}>
        Kandidatarbete 2022
      </Typography>
      <Typography marginLeft='1%' color='white'>
        Hassan, Jane, John, Max, Rikard, Tim
      </Typography>
    </Stack>
  );
};

export default BottomContainer;
