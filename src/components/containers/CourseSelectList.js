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
    const [loading, setLoading] = useState();
        useEffect(() => {
          getProgramKoder(10).then((res) => {
            setAllaKurser(res.data);
            setLoading(false);
            
          });
          
        }, []);

   // LÖS MED LOADSTATE, Datan måste hämtas innan det kan målas ut eller en Mappas...
    const listaAllaKuser = allaKurser.map((kurs)=> console.log(kurs))
    
    
        
    
    return loading ? (
            <p>loading</p>
    ): (<p>not loading</p>);

    
  };
  
  export default CourseSelectList;
  