import React from 'react';
import { Button, Typography } from '@mui/material';

/**
 * Komponent för att testa de olika styles som finns i temat.
 * Kan användas som lekyta för att testa komponenter
 * @returns komponent
 */

const SandBox = () => {
  return (
    <div style={{ padding: 50, border: 'solid' }}>
      <Typography>Default typsnitt och storlek</Typography>
      {/*Testar olika typer av rubriker*/}
      <Typography variant="h1">h1 Civilingenjör i medieteknik</Typography>
      <Typography variant="h2">h2 Civilingenjör i medieteknik</Typography>
      <Typography variant="h3">h3 Civilingenjör i medieteknik</Typography>
      <Typography variant="body">body Civilingenjör i medieteknik</Typography>

      <Typography>Default färger</Typography>
      {/*Testar olika typer av färger*/}
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <Button variant="contained" color="secondary">
        Secondary
      </Button>
      <Button variant="contained" color="error">
        Error
      </Button>
      <Button variant="contained" color="warning">
        Warning
      </Button>
    </div>
  );
};

export default SandBox;
