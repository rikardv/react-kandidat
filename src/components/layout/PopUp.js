import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  Typography,
  Divider,
  TextField,
  Button,
  Autocomplete,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import PopUpContent from '../containers/PopUpContent';

/* I den här filen tar vi in open och onClose för att kolla om fönstret är stängt eller inte. I övrigt tar vi in data i form av ....
, en titel och selected/setSelected som alla skickats vidare från FilterMenyKort.js. Vi kallar på PopUpContent för att filtrera data 
som ska visualiseras.
*/

const PopUp = (props) => {
  const { onClose, open, data, titel, selected, setSelected } = props;

  //Stäng pop-upen.
  const handleClose = () => {
    onClose();
  };

  //skapa ny lista för att kunna göra justeringar i den. UseState för att den ska uppdateras.
  const [newList, setNewList] = useState(data);
  useEffect(() => {
    setNewList(data);
  }, [data]);

  //När man väljer ett element så läggs elementet till i listan över valda och tas bort från listan över valbara.
  const handleSelection = (element) => {
    setSelected([...selected, element]);
    setNewList(newList.filter((item) => item !== element));
  };

  //När man tar bort ett element så läggs elementet till i listan över valbara och tas bort från listan över valda.
  const handleDelete = (element) => {
    setNewList([...newList, element]);
    setSelected(selected.filter((item) => item !== element));
  };

  //SearchTerm baseras på det man skriver i Autocomplete.
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Dialog fullWidth={true} onClose={handleClose} open={open}>
      {/*Här är rutan som dyker upp när man öppnar filtreringen.
       */}
      <DialogTitle
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          display: 'flex',
        }}
      >
        <Typography variant='h2' fontWeight='medium'>
          Lägg till {titel}
        </Typography>

        <CloseIcon
          style={{ cursor: 'pointer' }}
          onClick={handleClose}
          fontSize='small'
        />
      </DialogTitle>
      <Divider />
      {/*Här kollar om vi alla kurser är valda eller inte. Annars visas valbara kurser genom att kalla på PopUpContent
          Autocomplete är för att kunna söka efter kurser som sedan filtreras i PopUpContent.*/}
      {newList.length == 0 ? (
        <DialogTitle>
          <Typography>Alla {titel} Är Valda</Typography>
        </DialogTitle>
      ) : (
        <>
          <PopUpContent
            data={newList}
            funktion={handleSelection}
            icon={<AddIcon />}
            search={searchTerm}
          />
          <Autocomplete
            style={{ margin: 15, marginTop: 20 }}
            options={newList}
            renderInput={(params) => (
              <TextField {...params} label={'Sök Efter ' + titel} />
            )}
            onChange={(event, value) =>
              setSearchTerm(value == null ? '' : value)
            }
            freeSolo={true}
          />
        </>
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
      {/*Här kollar om vi inga kurser är valda eller inte. Annars visas valda kurser genom att kalla på PopUpContent*/}
      {selected.length == 0 ? (
        <DialogTitle>
          <Typography>
            Inga Valda {titel}, Var God Välj {titel} Ovan!
          </Typography>
        </DialogTitle>
      ) : (
        <PopUpContent
          data={selected}
          funktion={handleDelete}
          icon={<ClearIcon />}
          search={''}
        />
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
