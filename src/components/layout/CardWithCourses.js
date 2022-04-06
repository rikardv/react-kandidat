import React, { useEffect, useState } from "react";
import getKurserFranProgram from "../../connections/getKurserFranProgram";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { listSubheaderClasses } from "@mui/material";

const CardWithCourses = ({ selectedProgram }) => {
  const [kurser, setKurser] = useState([]);

  useEffect(() => {
    getKurserFranProgram(selectedProgram).then((res) => {
      setKurser(res.data);
    });
  }, [selectedProgram]);

  const kursnamn = [];
  kurser.map((kurs) =>
    kursnamn.push(kurs.UTBILDNING_KOD + " : " + kurs.UTBILDNING_SV)
  );

  return (
    <div sytle={{ height: 520, width: "100%" }}>
      <Autocomplete
        disablePortal
        id='combo-box-demo'
        options={kursnamn}
        sx={{ width: 400 }}
        renderInput={(params) => <TextField {...params} label="Kurser" />}
      />
      
    </div>
  );
};

export default CardWithCourses;
