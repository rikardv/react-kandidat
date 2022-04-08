import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  Typography,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

const PopUp = (props) => {
  const { onClose, open, data, titel } = props;

  const handleClose = () => {
    onClose();
  };

  const [selected, setSelected] = useState([]);

  const handleSelection = () => {
    setSelected([...selected, {}]);
    console.log(selected);
  };

  return (
    <Dialog fullWidth={true} onClose={handleClose} open={open}>
      <DialogTitle>
        <Typography variant='h1' fontWeight='bold' align='left'>
          Lista Över Valbara {titel}
        </Typography>
      </DialogTitle>
      <Stack direction='row' spacing={3}>
        {data.map((program) => (
          <>
            <Chip
              variant='outlined'
              clickable={true}
              label={
                <Typography variant='h3' fontWeight='medium'>
                  {program}
                </Typography>
              }
              onClick={handleSelection}
              onDelete={handleSelection}
              deleteIcon={<AddIcon />}
            ></Chip>
          </>
        ))}
      </Stack>
      <Divider />
      <DialogTitle>
        <Typography variant='h1' fontWeight='bold' align='left'>
          Lista Över Valda {titel}
        </Typography>
      </DialogTitle>
      <Stack direction='row' spacing={3}>
        {data.map((program) => (
          <>
            <Chip
              variant='outlined'
              clickable={true}
              label={
                <Typography variant='h3' fontWeight='medium'>
                  {program}
                </Typography>
              }
              onClick={handleSelection}
              onDelete={handleSelection}
              deleteIcon={<ClearIcon />}
            ></Chip>
          </>
        ))}
      </Stack>
    </Dialog>
  );
};

export default PopUp;
