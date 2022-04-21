import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FilterMenyKort from './FilterMenyKort';
import getProgramKoder from '../../../connections/getProgramKoder';
import getKurserFranProgram from '../../../connections/getKurserFranProgram';
import getProgramStartDatum from '../../../connections/getProgramStartDatum';
import formatDataToRequest from '../../../functions/formatDataToRequest';

/*I den här filen tar vi in flera selected och setSelected-funktioner. Dessa kommer baseras på data vi väljer 
i PopUpContent.js så att vi kan komma åt dom i App.js. Vi kallar på FilterMenyKort som i sin tur kallar på PopUp som slutligen kallar på 
PopUpContent.js*/

const FiltreringContainer = ({
  selectedProgram,
  setSelectedProgram,
  selectedCourses,
  setSelectedCourses,
  selectedStartDates,
  setSelectedStartDates,
}) => {
  const [programs, setPrograms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [startDates, setStartDates] = useState([]);
  const formattedProgramKoder = formatDataToRequest(selectedProgram, 'program');

  //Hämtar valt program
  useEffect(() => {
    getKurserFranProgram(formattedProgramKoder).then((res) => {
      let items = [];
      res.data.map((courses) => {
        courses.map((c) => {
          if (
            !courses.includes(c.UTBILDNING_KOD + ': ' + c.UTBILDNING_SV) &&
            !selectedCourses.includes(c.UTBILDNING_KOD + ': ' + c.UTBILDNING_SV)
          )
            items.push(c.UTBILDNING_KOD + ': ' + c.UTBILDNING_SV);
        });
      });
      setCourses(items);
    });
  }, [selectedProgram]);

  //Hämtar och stätter alla kurser för valt program.
  useEffect(() => {
    getProgramKoder().then((res) => {
      let programsMapped = [];
      res.data.map((programs) => {
        if (
          !programsMapped.includes(programs.YTTERSTA_KURSPAKETERING_KOD) &&
          !selectedProgram.includes(programs.YTTERSTA_KURSPAKETERING_KOD)
        )
          programsMapped.push(programs.YTTERSTA_KURSPAKETERING_KOD);
      });
      setPrograms(programsMapped);
    });
  }, [selectedProgram]);

  //Hämtar och stätter alla startdatum för valt program.
  useEffect(() => {
    getProgramStartDatum(formattedProgramKoder).then((res) => {
      //Formatera om data för startdatum
      let startDatesMapped = [];
      res.data.map((date) => {
        date.map((d) => {
          //Do not duplicate dates.
          if (
            !startDatesMapped.includes(
              d.YTTERSTA_KURSPAKETERINGSTILLFALLE_STARTDATUM
            ) &&
            !selectedStartDates.includes(
              d.YTTERSTA_KURSPAKETERINGSTILLFALLE_STARTDATUM
            )
          )
            startDatesMapped.push(
              d.YTTERSTA_KURSPAKETERINGSTILLFALLE_STARTDATUM
            );
        });
        setStartDates(startDatesMapped);
      });
    });
  }, [selectedProgram]);

  return (
    <Stack justifyContent={'center'} alignItems='center' spacing={3}>
      <Typography style={{ margin: 10 }} variant='h1'>
        Filtreringar
      </Typography>
      {/*FilterMenyKort för program*/}
      <FilterMenyKort
        titel='Program'
        data={programs}
        selected={selectedProgram}
        setSelected={setSelectedProgram}
      />
      {/*FilterMenyKort för kurser*/}
      <FilterMenyKort
        titel='Kurser'
        data={courses && courses}
        selected={selectedCourses}
        setSelected={setSelectedCourses}
      />
      {/*FilterMenyKort för antagningsdatum*/}
      <FilterMenyKort
        titel='Antagningsdatum'
        data={startDates}
        selected={selectedStartDates}
        setSelected={setSelectedStartDates}
      />
    </Stack>
  );
};

export default FiltreringContainer;
