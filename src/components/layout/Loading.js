import { CircularProgress, Box, Typography } from '@mui/material';
import React from 'react';

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '50vh',
        alignItems: 'center',
      }}
    >
      <CircularProgress style={{ margin: 5 }} />
      <Typography style={{ margin: 5 }}>Laddar grafer...</Typography>
    </Box>
  );
};

export default Loading;
