import React from 'react';
import { Typography, Card, CardContent, Stack } from '@mui/material';

/**
 * Komponent för att testa de olika styles som finns i temat.
 * Kan användas som lekyta för att testa komponenter
 * @returns komponent
 */

const SandBox = ({}) => {
  return (
    <Stack spacing={3} direction='row'>
      <Card>
        <CardContent>
          <Typography variant='h1'>
            Hoppsan! Här är det tomt just nu!
          </Typography>
          <Typography variant='h2'>
            Men misströsta inte, det kommer nytt content inom kort!{' '}
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default SandBox;
