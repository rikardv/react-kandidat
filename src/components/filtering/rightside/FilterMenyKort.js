import React, { useState } from 'react';
import {
  Card,
  Typography,
  CardContent,
  Divider,
  Stack,
  IconButton,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PopUp from './PopUp';

/* I den här filen tar vi in en titel, data, selected och setSelected från FilteringContainer. Alla dessa props är olika beroende på 
vilket filtreringskort det handlar om. De olika propsen är för program, kurser och antagningsår. Vi kallar på PopUp som i sin tur kallar på 
PopUpContent för att visualisera och filtrera data baserat på sökning som gjorts. 
 */

const FilterMenyKort = ({ titel, data, selected, setSelected }) => {
  const [open, setOpen] = useState(false);

  //Används i PopUp för att öppna fönstret.
  const handleClickOpen = () => {
    setOpen(true);
  };

  //Används i PopUp för att stänga fönstret.
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card style={{ width: '90%', maxWidth: 200 }}>
      <CardContent>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems={'center'}
        >
          <Typography variant='h3' fontWeight={'bold'}>
            {titel}
          </Typography>
          <IconButton onClick={handleClickOpen}>
            <AddIcon />
          </IconButton>
          <PopUp
            open={open}
            onClose={handleClose}
            data={data}
            titel={titel}
            selected={selected}
            setSelected={setSelected}
          />
        </Stack>
        <Stack spacing={1}>
          {selected.map((pgr) => (
            <>
              <Chip
                variant='outlined'
                label={<Typography variant='h3'>{pgr}</Typography>}
              />
              <Divider />
            </>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FilterMenyKort;
