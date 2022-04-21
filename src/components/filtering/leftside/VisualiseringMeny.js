import React from 'react';
import MenyKort from './MenyKort';
import { Grid, Typography } from '@mui/material';

const HeaderContainer = ({ selectedView, setSelectedView }) => {
  return (
    <Grid container justifyContent='space-evenly' style={{ maxWidth: 1200 }}>
      <Typography variant='h1' style={{ textAlign: 'center', margin: 10 }}>
        Visualisering
      </Typography>
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
        index={3}
        activeIndex={selectedView}
        setActiveIndex={setSelectedView}
      ></MenyKort>
      <MenyKort
        rubrik='AVHOPP PER KURS'
        index={4}
        activeIndex={selectedView}
        setActiveIndex={setSelectedView}
      ></MenyKort>
      <MenyKort
        rubrik='EVALIUATE'
        index={5}
        activeIndex={selectedView}
        setActiveIndex={setSelectedView}
      ></MenyKort>
      <MenyKort
        rubrik='DAGAR TILL AVKLARAD KURS'
        index={6}
        activeIndex={selectedView}
        setActiveIndex={setSelectedView}
      ></MenyKort>
      <MenyKort
        rubrik='OMTENTOR'
        index={7}
        activeIndex={selectedView}
        setActiveIndex={setSelectedView}
      ></MenyKort>
    </Grid>
  );
};

export default HeaderContainer;
