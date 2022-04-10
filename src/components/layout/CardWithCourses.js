import React, { useEffect, useState } from "react";
import getKurserFranProgram from "../../connections/getKurserFranProgram";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { listSubheaderClasses } from "@mui/material";

/* Tar in selectedProgram som parameter, denna avänds i Autocomplete för att filtrera listan så att
bara dom kurser som är en del av programmet visas upp */
const CardWithCourses = ({ selectedProgram, setSelectedKurs }) => {
  const [kurser, setKurser] = useState([]);
  const [value, setValue] = React.useState(null);
  useEffect(() => {
    getKurserFranProgram(selectedProgram).then((res) => {
      setKurser(res.data);
    });
  }, [selectedProgram]);

  //Gör en ny lista som kan användas för att söka efter kurser med mui autocomplete
  //Ful lösning men Fungerar iaf med MUI....
  const kursnamn = [];
  kurser.map((kurs) =>
    kursnamn.push(kurs.UTBILDNING_KOD + " : " + kurs.UTBILDNING_SV)
  );

  //Tar ut kurskoden från Den valda kursen
  const selectedCourse = (value) => {
    let course = value;
    let splitList = [];
    splitList = course.split(":");

    //Sätter SelectedKurs till kurskoden på vald kurs i autocomplete
    setSelectedKurs(splitList[0]);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          selectedCourse(newValue);
        }}
        disablePortal
        id='combo-box-demo'
        options={kursnamn}
        sx={{ width: 400 }}
        renderInput={(params) => <TextField {...params} label='Kurser' />}
      />
    </div>
  );
};

export default CardWithCourses;
