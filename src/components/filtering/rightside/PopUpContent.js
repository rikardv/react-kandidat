import React from 'react';
import { Stack, Typography, Chip } from '@mui/material';

/* I den här filen tar vi in data som ska visas i filtreringskorten. Data är både valbara data samt vald data som skickas in separat. 
Funktioner som skickas in är handleSelection och handleDelete som används för att flytta objekt mellan de två listorna. 
Iconer är Add- respektive ClearIcon och search är sökningen som gjorts. Search används för att filtrera data efter sökningen.
*/

const PopUpContent = ({ data, funktion, icon, search }) => {
  var limit = 20;

  return (
    <Stack
      marginTop={3}
      display='flex'
      flexWrap='wrap'
      rowGap={1}
      direction='row'
      spacing={3}
    >
      {data
        .filter((element) => {
          if (search == '') return element;
          else if (element.toLowerCase().includes(search.toLowerCase()))
            return element;
        })
        .slice(0, limit)
        .map((element) => (
          <>
            <Chip
              style={{ marginLeft: 15, marginBottom: 3, paddingRight: 3 }}
              variant='outlined'
              key={element}
              clickable={true}
              label={
                <Typography variant='h3' fontWeight='medium'>
                  {element}
                </Typography>
              }
              onClick={() => funktion(element)}
              onDelete={() => funktion(element)}
              deleteIcon={icon}
            ></Chip>
          </>
        ))}
    </Stack>
  );
};

export default PopUpContent;
