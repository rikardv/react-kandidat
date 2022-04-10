import React from 'react';
import { Button, Typography, Card, CardContent, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Dagar from '../charts/Dagar';
import CourseSelectList from './CourseSelectList';
import CardWithCourses from '../layout/CardWithCourses';

/**
 * Komponent för att testa de olika styles som finns i temat.
 * Kan användas som lekyta för att testa komponenter
 * @returns komponent
 */

const SandBox = ({ selectedProgram, setSelectedProgram }) => {
  const theme = useTheme();
  return (
    <Stack spacing={3} direction='row'>
      <Card>
        <CardContent>
          <Typography variant='h1'>Dagar till klarad kurs</Typography>
          <Dagar />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant='h1'>
            Programlista och kurser i program
          </Typography>{' '}
          <CourseSelectList
            setSelectedProgram={setSelectedProgram}
          ></CourseSelectList>
          <CardWithCourses selectedProgram={selectedProgram} />
        </CardContent>
      </Card>
    </Stack>
  );
};

export default SandBox;
