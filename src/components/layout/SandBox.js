import React from 'react';
import { Button, CardContent, Typography } from '@mui/material';
import { Card } from '@mui/material';

const SandBox = () => {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography>Default typsnitt och storlek</Typography>
          {/*Testar olika typer av rubriker*/}
          <Typography variant="h1">h1 Civilingenjör i medieteknik</Typography>
          <Typography variant="h2">h2 Civilingenjör i medieteknik</Typography>
          <Typography variant="h3">h3 Civilingenjör i medieteknik</Typography>
          <Typography variant="body">
            body Civilingenjör i medieteknik
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default SandBox;
