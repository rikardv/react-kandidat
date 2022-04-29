import { CircularProgress, Box, Typography } from '@mui/material';
import React from 'react';

const Loading = ({ title }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '50vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress style={{ margin: 5 }} />
      <Typography style={{ margin: 5 }}>{title ?? 'Laddar....'}</Typography>
    </Box>
  );
};

export default Loading;
