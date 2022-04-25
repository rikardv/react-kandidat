import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Loading from './Loading';
import getStudenter from '../../connections/getStudenter';
import formatDataToRequest from '../../functions/formatDataToRequest';

const columns = [
  { field: 'PERSONNUMMER', headerName: 'Personnummer' },
  { field: 'FORNAMN', headerName: 'Förnamn' },
  { field: 'EFTERNAMN', headerName: 'Efternamn' },
  { field: 'YTTERSTA_KURSPAKETERING_SV', headerName: 'Program', minWidth: 330 },
  {
    field: 'YTTERSTA_KURSPAKETERINGSTILLFALLE_STARTDATUM',
    headerName: 'Startdatum',
  },
  {
    field: 'YTTERSTA_KURSPAKETERINGSTILLFALLE_SLUTDATUM',
    headerName: 'Slutdatum',
  },
];

export default function AllaStudeter({ programKod, startDatum }) {
  const [table, setTable] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let formattedProgramKoder = formatDataToRequest(programKod, 'programKod');
    getStudenter(formattedProgramKoder, startDatum).then((res) => {
      setLoading(true);
      setTable(res.data);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <DataGrid
      style={{ width: 950 }}
      rows={table}
      columns={columns}
      checkboxSelection
      autoHeight
    />
  );
}
