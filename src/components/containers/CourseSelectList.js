import React, { useEffect, useState } from 'react';
import { List, ListItem } from '@mui/material';

import getProgramKoder from '../../connections/getProgramKoder';

const CourseSelectList = () => {

    const [state, setState] = useState({
        loading: true,
        response: null,
        error: null
        });
    
    const [allaKurser, setAllaKurser] = useState();

        useEffect(() => {
          getProgramKoder(10).then((res) => {
            setAllaKurser(res.data);
            
          });
          
        }, []);

   // LÖS MED LOADSTATE, Datan måste hämtas innan det kan målas ut eller en Mappas...
    const listaAllaKuser = allaKurser.map((kurs)=> console.log(kurs))
    
    
        
    
    return (
             <List>
                 
             </List>
    );
  };
  
  export default CourseSelectList;
  