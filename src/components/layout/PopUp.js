import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  Typography,
  Chip,
  Stack,
  Divider,
  TextField,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';

const PopUp = (props) => {
  const { onClose, open, data, titel } = props;

  const handleClose = () => {
    onClose();
  };

  const [selected, setSelected] = useState([]);

  const handleSelection = (e, program) => {
    setSelected({ program });
    console.log(selected);
  };

  return (
    <Dialog fullWidth={true} onClose={handleClose} open={open}>
      <DialogTitle>
        <Typography variant='h2' fontWeight='medium' align='left'>
          Lägg till {titel}
          <CloseIcon
            style={{ marginLeft: 'auto' }}
            onClick={handleClose}
            fontSize='small'
          />
        </Typography>
      </DialogTitle>
      <Divider />
      <Stack marginTop={3} direction='row' spacing={3}>
        {data.map((program) => (
          <>
            <Chip
              style={{ marginBottom: 3, marginLeft: 15 }}
              variant='outlined'
              key={program}
              clickable={true}
              label={
                <Typography variant='h3' fontWeight='medium'>
                  {program}
                </Typography>
              }
              onClick={(e) => handleSelection(e, program)}
              onDelete={(e) => handleSelection(e, program)}
              deleteIcon={<AddIcon />}
            ></Chip>
          </>
        ))}
      </Stack>
      <TextField
        label={'Sök ' + titel}
        variant='outlined'
        size='small'
        style={{ margin: 15 }}
      />
      <Divider />
      <DialogTitle>
        <Typography
          style={{ marginTop: 20 }}
          variant='h2'
          fontWeight='medium'
          align='left'
        >
          Valda {titel}
        </Typography>
      </DialogTitle>
      <Divider />
      <Stack marginTop={3} direction='row' spacing={3}>
        {data.map((program) => (
          <>
            <Chip
              style={{ marginBottom: 14, marginLeft: 15 }}
              variant='outlined'
              clickable={true}
              label={
                <Typography variant='h3' fontWeight='medium'>
                  {program}
                </Typography>
              }
              onDelete={(e) => handleSelection(e, program)}
              deleteIcon={<ClearIcon />}
            ></Chip>
          </>
        ))}
      </Stack>
      <Button
        style={{
          marginBottom: 15,
          width: 50,
          borderRadius: 11,
          marginLeft: 'auto',
          marginRight: 15,
        }}
        variant='contained'
        size='small'
      >
        Spara
      </Button>
    </Dialog>
  );
};

export default PopUp;
