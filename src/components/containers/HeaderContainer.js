import React, { useState } from 'react';
import MenyKort from '../layout/MenyKort';
import { Grid } from '@mui/material';

const HeaderContainer = ({ selectedView, setSelectedView }) => {
  return (
    <Grid
      container
      justifyContent='space-evenly'
      style={{ padding: 5, maxWidth: 1200 }}
    >
      <MenyKort
        rubrik='CSN-GRÄNS'
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
        rubrik='AVHOPP PER KURS'
        antal='6'
        index={4}
        activeIndex={selectedView}
        setActiveIndex={setSelectedView}
      ></MenyKort>
      <MenyKort
        rubrik='EVALIUATE'
        antal='6'
        index={5}
        activeIndex={selectedView}
        setActiveIndex={setSelectedView}
      ></MenyKort>
      <MenyKort
        rubrik='LEKYTA - här kan du lägga dina komponenter som inte är färdiga för att se hur de ser ut'
        index={6}
        activeIndex={selectedView}
        setActiveIndex={setSelectedView}
      ></MenyKort>
    </Grid>
  );
};

export default HeaderContainer;
