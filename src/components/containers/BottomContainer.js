import { Stack, Typography, useTheme } from '@mui/material';
import React from 'react';

const BottomContainer = () => {
  const theme = useTheme();
    return (
    <Stack
            
      height='10vh'
      style={{ backgroundColor: 'black' }}
      width='100%'
      direction='column'
      alignItems='flex-start'
      justifyContent='center'
    >
      <Typography marginLeft='1%' color='white' fontWeight={'bold'}>
        Kandidatarbete 2022. Hassan, Jane, John, Max, Rikard, Tim
      </Typography>
      <Typography marginLeft='1%' color='white'>
        Baseras på data från Evaliuate och Ladok.
      </Typography>
            </Stack>
  );
};

export default BottomContainer;
