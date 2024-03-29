import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Loading from './Loading';
import { localeText } from '../../functions/gridLocaleText';

const columns = [
  { field: 'kurskod', headerName: 'Kurskod' },
  { field: 'kurs', headerName: 'Kurs', minWidth: 330 },
  { field: 'betyg', headerName: 'Betyg' },
  {
    field: 'start_datum',
    headerName: 'Startdatum',
  },
  {
    field: 'dagar',
    headerName: 'Dagar till avklarad kurs',
  },
  { field: 'avklarad', headerName: 'Avklarad Kurs' },
  { field: 'omtentor', headerName: 'Antal omtentor' },
];

export default function DataTable({ rows, loading }) {
  return loading ? (
    <Loading title='Laddar information om studenten....' />
  ) : (
    <div style={{ display: 'flex' }}>
      <Tooltip
        title='Denna sida visar de kurser en specifik student l�ser!'
        placement='right-start'
      >
        <IconButton style={{ marginLeft: 'auto' }}>
          <QuestionMarkIcon />
        </IconButton>
      </Tooltip>
      <DataGrid
        style={{ width: 1000 }}
        rows={rows}
        columns={columns}
        checkboxSelection
        autoHeight
        components={{ Toolbar: GridToolbar }}
        localeText={localeText}
      />
    </div>
  );
}
