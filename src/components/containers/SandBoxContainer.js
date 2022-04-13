import React from 'react';
import { Button, Typography, Card, CardContent, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Dagar from '../charts/Dagar';

/**
 * Komponent för att testa de olika styles som finns i temat.
 * Kan användas som lekyta för att testa komponenter
 * @returns komponent
 */

const SandBox = ({ kursKoder }) => {
  const theme = useTheme();
  return (
    <Stack spacing={3} direction='row'>
      <Card>
        <CardContent>
          <Typography variant='h1'>Dagar till klarad kurs</Typography>
          <Dagar kurskod={kursKoder} />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant='h1'>Här är det tomt just nu!</Typography>
          <Typography variant='h2'>
            Men misströsta inte, det kommer nytt content inom kort!{' '}
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default SandBox;
