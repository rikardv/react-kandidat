import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Loading from './Loading';
import getKursInfo from '../../connections/getKursInfo';
import { Card, CardContent, Typography } from '@mui/material';

const columns = [
  { field: 'Startdatum', headerName: 'Startdatum' },
  { field: 'Registrerade', headerName: 'Registrerade' },
  { field: 'Avklarade', headerName: 'Avklarade' },
  { field: 'Betyg', headerName: 'Betyg' },
  {
    field: 'Betygsfördelning',
    headerName: 'Betygsfördelning',
  },
  {
    field: 'Avhopp',
    headerName: 'Avhopp',
  },
];

export default function KursInfo() {
  const [table, setTable] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getKursInfo('TNA001').then((res) => {
      setLoading(true);
      setTable(res.data);
      setLoading(false);
      console.log(res.data);
    });
  }, []);

  return loading ? (
    <Loading title='Laddar in kursinformation...' />
  ) : (
    <Card style={{ width: '90%', margin: 10 }}>
      <CardContent width='100%' style={{ height: 500 }}>
        <Typography>Header - något ska skrivas här</Typography>
        <DataGrid
          style={{ cursor: 'pointer' }}
          rows={table}
          columns={columns}
          checkboxSelection={false}
          pageSize={30}
        />
      </CardContent>
    </Card>
  );
}
