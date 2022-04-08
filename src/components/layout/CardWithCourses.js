import React, { useEffect, useState } from "react";
import getKurserFranProgram from "../../connections/getKurserFranProgram";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { listSubheaderClasses } from "@mui/material";

const CardWithCourses = ({ selectedProgram,setSelectedKurs}) => {
  const [kurser, setKurser] = useState([]);
  const [value, setValue] = React.useState(null);
  useEffect(() => {
    getKurserFranProgram(selectedProgram).then((res) => {
      setKurser(res.data);
    });
  }, [selectedProgram]);

  //Gör en ny lista som kan användas för att söka efter kurser med mui autocomplete
  const kursnamn = [];
  kurser.map((kurs) =>
    kursnamn.push(kurs.UTBILDNING_KOD + " : " + kurs.UTBILDNING_SV)
    
  );
  
  //Tar ut kurskoden från Den valda kursen
  const selectedCourse = (value) =>
  {let course = value;
    let splitList = []
  splitList = course.split(":")

  //Detta värde ska skickas vidare till nästa funktion!!! 
setSelectedKurs(splitList[0])};

  console.log(kursnamn);

  //Ska göras, autocomple on change if(value != null) sätt skicka value till en grafkomponent
  return (
    <div sytle={{ height: 520, width: "100%" }}>
      {`value: ${value !== null ? `'${value}'` : 'null'}`}
      {/* ^ används för test */}
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
       
        
        renderInput={(params) => <TextField {...params} label="Kurser" />}
      />

      
    </div>
  );
};

export default CardWithCourses;
