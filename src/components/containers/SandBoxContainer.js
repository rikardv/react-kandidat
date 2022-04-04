import React from 'react';
import { Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/**
 * Komponent för att testa de olika styles som finns i temat.
 * Kan användas som lekyta för att testa komponenter
 * @returns komponent
 */

const SandBox = () => {
  const theme = useTheme();
  return (
    <div style={{ padding: 50 }}>
      <Typography>Default typsnitt och storlek</Typography>
      {/*Testar olika typer av rubriker*/}
      <Typography variant='h1'>h1 Civilingenjör i medieteknik</Typography>
      <Typography variant='h2'>h2 Civilingenjör i medieteknik</Typography>
      <Typography variant='h3'>h3 Civilingenjör i medieteknik</Typography>
      <Typography variant='body'>body Civilingenjör i medieteknik</Typography>

      <Typography fontWeight='light'>Light</Typography>
      <Typography fontWeight='regular'>Regular</Typography>
      <Typography fontWeight='medium'>Medium</Typography>
      <Typography fontWeight='bold'>Bold</Typography>

      <Typography>Default färger</Typography>
      {/*Testar olika typer av färger*/}
      <Button variant='contained' color='primary'>
        Primary
      </Button>
      <Button
        variant='contained'
        style={{ backgroundColor: theme.palette.primary.light }}
      >
        Primary light
      </Button>

      <Button variant='contained' color='secondary'>
        Secondary
      </Button>
      <Button
        variant='contained'
        color='secondary'
        style={{ backgroundColor: theme.palette.secondary.light }}
      >
        Secondary light
      </Button>
      <Button variant='contained' color='error'>
        Error
      </Button>
      <Button
        variant='contained'
        color='error'
        style={{ backgroundColor: theme.palette.error.light }}
      >
        Error light
      </Button>
      <Button variant='contained' color='warning'>
        Warning
      </Button>
      <Button
        variant='contained'
        color='warning'
        style={{ backgroundColor: theme.palette.warning.light }}
      >
        Warning light
      </Button>
    </div>
  );
};

export default SandBox;
