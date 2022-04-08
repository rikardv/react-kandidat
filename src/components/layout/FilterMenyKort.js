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

const FilterMeny = ({ titel, data }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

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
          <PopUp open={open} onClose={handleClose} />
        </Stack>
        <Stack spacing={1}>
          {data.map((pgr) => (
            <>
              <Chip
                label={<Typography variant='h3'>{pgr}</Typography>}
                onDelete={() => console.log('')}
              />
              <Divider />
            </>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FilterMeny;
