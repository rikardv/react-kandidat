import React from 'react';
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

const FilterMeny = ({ titel, data }) => {
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
          <IconButton>
            <AddIcon />
          </IconButton>
        </Stack>
        <Stack spacing={1}>
          {data.map((pgr) => (
            <>
              <Chip
                label={<Typography variant='body'>{pgr}</Typography>}
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
