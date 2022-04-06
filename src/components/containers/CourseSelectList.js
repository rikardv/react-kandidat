import React, { useEffect, useState } from 'react';
import { List, ListItem,ListItemButton } from '@mui/material';
import CardWithCourses from '../layout/CardWithCourses';
import getProgramKoder from '../../connections/getProgramKoder';

const CourseSelectList = ({setSelectedProgram}) => {  
    const [allaKurser, setAllaKurser] = useState();
    const [loading, setLoading] = useState();
        useEffect(() => {
          getProgramKoder(10).then((res) => {
            setAllaKurser(res.data);
            setLoading(false);
            
          });
          
        }, []);
    
    
    return loading ? (
            <p>loading</p>
    ): (<List>{allaKurser && allaKurser.map((kurs) => <ListItemButton key={kurs.YTTERSTA_KURSPAKETERING_SV} onClick={() => setSelectedProgram(kurs.YTTERSTA_KURSPAKETERING_KOD)}>{kurs.YTTERSTA_KURSPAKETERING_SV}</ListItemButton>)}</List>)

    
  };
  
  export default CourseSelectList;
  