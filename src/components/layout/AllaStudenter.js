import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Loading from './Loading';
import getStudenter from '../../connections/getStudenter';
import formatDataToRequest from '../../functions/formatDataToRequest';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Card, CardContent, Typography } from '@mui/material';
import StudentPopUp from './StudentPopUp';
import { localeText } from '../../functions/gridLocaleText';
import { Help } from '../charts/Help';

const columns = [
  { field: 'PERSONNUMMER', headerName: 'Personnummer', minWidth: 130 },
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

export default function AllaStudenter({ programKod, startDatum }) {
  const [table, setTable] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedPerson, setSelectedPerson] = useState();
  useEffect(() => {
    let formattedProgramKoder = formatDataToRequest(programKod, 'programKod');
    getStudenter(formattedProgramKoder, startDatum).then((res) => {
      setLoading(true);
      setTable(res.data);
      setLoading(false);
    });
  }, [programKod]);

  const handleClose = () => {
    setSelectedPerson();
  };

  const handleClick = (e) => {
    setSelectedPerson(e.row.PERSONNUMMER);
  };

  return loading ? (
    <Loading title='Laddar in studenter.....' />
  ) : (
    <Card style={{ width: '90%', margin: 10 }}>
      <CardContent width='100%'>
        <div style={{ display: 'flex' }}>
          <Typography>Header - något ska skrivas här</Typography>
          <Tooltip
            title='Denna sida visar en lista på de studenter som går detta program!'
            placement='right-start'
          >
            <IconButton style={{ marginLeft: 'auto' }}>
              <QuestionMarkIcon />
            </IconButton>
          </Tooltip>
        </div>
        <DataGrid
          style={{ cursor: 'pointer', height: 500 }}
          rows={table}
          columns={columns}
          checkboxSelection
          onRowClick={(e) => handleClick(e)}
          pageSize={30}
          components={{ Toolbar: GridToolbar }}
          localeText={localeText}
        />
        {selectedPerson && (
          <StudentPopUp
            personNummer={selectedPerson}
            handleClose={handleClose}
          />
        )}
      </CardContent>
    </Card>
  );
}
