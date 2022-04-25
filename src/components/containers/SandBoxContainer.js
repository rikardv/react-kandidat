import React from 'react';
import { Typography, Card, CardContent, Stack } from '@mui/material';
import AllaStudeter from '../layout/AllaStudenter';

/**
 * Komponent för att testa de olika styles som finns i temat.
 * Kan användas som lekyta för att testa komponenter
 * @returns komponent
 */

const SandBox = ({ programKod, startDatum }) => {
  return (
    <Stack spacing={3} direction='row'>
      <Card>
        <CardContent>
          <AllaStudeter programKod={programKod} startDatum={startDatum} />
        </CardContent>
      </Card>
    </Stack>
  );
};

export default SandBox;
