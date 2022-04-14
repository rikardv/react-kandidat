import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FilterMenyKort from '../layout/FilterMenyKort';
import getProgramKoder from '../../connections/getProgramKoder';
import getKurserFranProgram from '../../connections/getKurserFranProgram';
import Loading from '../layout/Loading';
import getProgramStartDatum from '../../connections/getProgramStartDatum';
import formatDataToRequest from '../../functions/formatDataToRequest';

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
  const [loading, setLoading] = useState(true);
  const formattedProgramKoder = formatDataToRequest(selectedProgram, 'program');
  //Hämtar valt program
  useEffect(() => {
    getKurserFranProgram(formattedProgramKoder).then((res) => {
      setCourses(res.data);
      setLoading(false);
    });
  }, [selectedProgram]);

  //Hämtar och stätter alla kurser för valt program.
  useEffect(() => {
    getProgramKoder().then((res) => {
      setPrograms(res.data);
      setLoading(false);
    });
  }, []);

  //Hämtar och stätter alla startdatum för valt program.
  useEffect(() => {
    getProgramStartDatum(formattedProgramKoder).then((res) => {
      setStartDates(res.data);
      setLoading(false);
    });
  }, [selectedProgram]);

  //Gör en ny lista för att kunna skicka med kurskod och kursnamn i samma.
  //Ful lösning men Fungerar iaf med MUI Autocomplete.
  const coursenames = [];
  for (var i = 0; i < courses.length; i++) {
    courses[i].map((course) => {
      //Do not duplicate courses.
      if (
        !coursenames.includes(
          course.UTBILDNING_KOD + ': ' + course.UTBILDNING_SV
        )
      ) {
        coursenames.push(course.UTBILDNING_KOD + ': ' + course.UTBILDNING_SV);
      }
    });
  }

  const startDatesMapped = [];
  for (var i = 0; i < startDates.length; i++) {
    startDates[i].map((date) => {
      //Do not duplicate dates.
      if (
        !startDatesMapped.includes(
          date.YTTERSTA_KURSPAKETERINGSTILLFALLE_STARTDATUM
        )
      ) {
        startDatesMapped.push(
          date.YTTERSTA_KURSPAKETERINGSTILLFALLE_STARTDATUM
        );
      }
    });
  }
  console.log(coursenames);

  return loading ? (
    <Loading />
  ) : (
    <Stack justifyContent={'center'} alignItems='center' spacing={3}>
      <Typography style={{ margin: 10 }} variant='h1'>
        Filtreringar
      </Typography>
      {/*FilterMenyKort för program*/}
      <FilterMenyKort
        titel='Program'
        data={programs.map((e) => e.YTTERSTA_KURSPAKETERING_KOD)}
        selected={selectedProgram}
        setSelected={setSelectedProgram}
      />
      {/*FilterMenyKort för kurser*/}
      <FilterMenyKort
        titel='Kurser'
        data={coursenames}
        selected={selectedCourses}
        setSelected={setSelectedCourses}
      />
      {/*FilterMenyKort för antagningsdatum*/}
      <FilterMenyKort
        titel='Antagningsdatum'
        data={startDatesMapped}
        selected={selectedStartDates}
        setSelected={setSelectedStartDates}
      />
    </Stack>
  );
};

export default FiltreringContainer;
