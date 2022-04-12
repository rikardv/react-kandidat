import React from 'react';
import { Stack, Typography, Chip } from '@mui/material';
import { valueToPercent } from '@mui/base';

const PopUpContent = ({ data, funktion, icon, search }) => {
  //Använder  en load för att se till att programmen har laddats klart innan dom målas ut i listan
  //Listan kan bytas ut till hur vi nu vill displaya allt :)
  console.log(search);

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
