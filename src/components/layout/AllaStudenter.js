import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Loading from './Loading';
import getStudenter from '../../connections/getStudenter';
import formatDataToRequest from '../../functions/formatDataToRequest';
import {
  Card,
  CardContent,
  Typography,
  Tooltip,
  IconButton,
  useTheme,
} from '@mui/material';
import StudentPopUp from './StudentPopUp';
import { localeText } from '../../functions/gridLocaleText';
import Info from '@mui/icons-material/Info';

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
  const theme = useTheme();

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
          <Typography variant='h1' fontWeight='medium'>
            Lista över studenter som går valda program
          </Typography>
          <Tooltip
            title='Klicka på ett personnummer för att se studentens studieresultat!'
            style={{
              marginLeft: 'auto',
            }}
          >
            <IconButton>
              <Info sx={{ color: theme.palette.primary.main }} />
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
