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

  //Stäng pop-upen.
  const handleClose = () => {
    onClose();
  };

  const [selected, setSelected] = useState([]); //För att lagra valda program /kurser.
  const [newList, setNewList] = useState(data); //skapa ny lista för att kunna göra justeringar i den.

  //När man väljer ett program/kurs... så läggs elementet till i listan över valda och tas bort från listan över valbara.
  const handleSelection = (element) => {
    setSelected([...selected, element]);
    setNewList(newList.filter((item) => item !== element));
  };

  //När man tar bort ett program/kurs... så läggs elementet till i listan över valbara och tas bort från listan över valda.
  const handleDelete = (element) => {
    setNewList([...newList, element]);
    setSelected(selected.filter((item) => item !== element));
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
      {newList.length == 0 ? (
        <Typography>Alla {titel} Är Valda</Typography>
      ) : (
        <Stack marginTop={3} direction='row' spacing={3}>
          {newList.map((element) => (
            <>
              <Chip
                style={{ marginBottom: 3, marginLeft: 15 }}
                variant='outlined'
                key={element}
                clickable={true}
                label={
                  <Typography variant='h3' fontWeight='medium'>
                    {element}
                  </Typography>
                }
                onClick={() => handleSelection(element)}
                onDelete={() => handleSelection(element)}
                deleteIcon={<AddIcon />}
              ></Chip>
            </>
          ))}
        </Stack>
      )}

      {newList.length == 0 ? (
        <></>
      ) : (
        <TextField
          label={'Sök ' + titel}
          variant='outlined'
          size='small'
          style={{ margin: 15 }}
        />
      )}
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
      {selected.length == 0 ? (
        <Typography>
          Inga Valda {titel}, Var God Välj {titel} Ovan!
        </Typography>
      ) : (
        <Stack marginTop={3} direction='row' spacing={3}>
          {selected.map((element) => (
            <>
              <Chip
                style={{ marginBottom: 14, marginLeft: 15 }}
                variant='outlined'
                clickable={true}
                label={
                  <Typography variant='h3' fontWeight='medium'>
                    {element}
                  </Typography>
                }
                onDelete={() => handleDelete(element)}
                onClick={() => handleDelete(element)}
                deleteIcon={<ClearIcon />}
              ></Chip>
            </>
          ))}
        </Stack>
      )}
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
