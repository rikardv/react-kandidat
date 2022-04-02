import React, { useState } from 'react';
import MenyKort from '../layout/MenyKort';
import { Grid } from '@mui/material';

const HeaderContainer = ({ selectedView, setSelectedView }) => {
  return (
    <Grid
      container
      justifyContent='space-evenly'
      style={{ padding: 5, maxWidth: 1500 }}
    >
      <MenyKort
        rubrik='TILLFÄLLEN TILL KLARAD TENTA'
        index={1}
        activeIndex={selectedView}
        setActiveIndex={setSelectedView}
      ></MenyKort>
      <MenyKort
        rubrik='EFTERSLÄP'
        index={2}
        activeIndex={selectedView}
        setActiveIndex={setSelectedView}
      ></MenyKort>
      <MenyKort
        rubrik='BETYGSFÖRDELNING'
        antal='6'
        flagged={true}
        index={3}
        activeIndex={selectedView}
        setActiveIndex={setSelectedView}
      ></MenyKort>
      <MenyKort
        rubrik='AVHOPP PER KURS/PROGRAM'
        antal='6'
        index={4}
        activeIndex={selectedView}
        setActiveIndex={setSelectedView}
      ></MenyKort>
    </Grid>
  );
};

export default HeaderContainer;
