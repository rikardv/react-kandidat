import React, { useState } from 'react';
import MenyKort from '../layout/MenyKort';
import { Grid } from '@mui/material';

const HeaderContainer = ({ selectedView, setSelectedView }) => {
  return (
    <Grid
      container
      justifyContent="space-evenly"
      style={{ padding: '5%', backgroundColor: '#EEEEEE' }}
    >
      <MenyKort
        rubrik="EVALIUATE"
        index={1}
        activeIndex={selectedView}
        setActiveIndex={setSelectedView}
      ></MenyKort>
      <MenyKort
        rubrik="BETYGSFÖRDELNING"
        index={2}
        activeIndex={selectedView}
        setActiveIndex={setSelectedView}
      ></MenyKort>
      <MenyKort
        rubrik="FLAGGADE KURSER"
        antal="6"
        flagged={true}
        index={3}
        activeIndex={selectedView}
        setActiveIndex={setSelectedView}
      ></MenyKort>
    </Grid>
  );
};

export default HeaderContainer;
