import React from 'react';
import { Grid, Typography } from '@mui/material';
import LiuLogo from '../../img/LiU_primary_black.png';
import { ResponsiveContainer } from 'recharts';

const TopContainer = () => {
  return (
    <Grid
      container
      direction='row'
      width='100%'
      borderBottom={'1px solid #D3D3D3'}
      height='7vh'
      alignItems='center'
    >
      <Grid item md={2} sm={2} lg={2}></Grid>
      <Grid item md={8} sm={8} lg={8}>
        <Typography
          variant='h1'
          fontWeight={'bold'}
          fontSize={28}
          textAlign='center'
          width='100%'
        >
          Instrumentpanel för grundutbildningen på Liu
        </Typography>
      </Grid>
      <Grid
        item
        md={2}
        sm={2}
        lg={2}
        textAlign='center'
        justifyContent={'center'}
      >
        <img src={LiuLogo} width={'50%'}></img>
      </Grid>
    </Grid>
  );
};

export default TopContainer;
