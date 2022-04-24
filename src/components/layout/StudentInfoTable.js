import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'kurs', headerName: 'Kurs' },
  { field: 'betyg', headerName: 'Betyg' },
  {
    field: 'beslutsdatum',
    headerName: 'Beslutsdatum',
  },
];

const columnsSecond = [
  { field: 'kurskod', headerName: 'Kurs' },
  { field: 'omtentor', headerName: 'Omtentor' },
];

export default function DataTable({ rows, betyg }) {
  return (
    <DataGrid
      rows={rows}
      columns={betyg ? columns : columnsSecond}
      checkboxSelection
      autoHeight
    />
  );
}
