import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Loading from './Loading';

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
    <DataGrid
      style={{ width: 1000 }}
      rows={rows}
      columns={columns}
      checkboxSelection
      autoHeight
      components={{ Toolbar: GridToolbar }}
    />
  );
}
