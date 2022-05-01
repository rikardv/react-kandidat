import React, { useEffect, useState } from 'react';
import getStudentInfo from '../../connections/getStudentInfo';
import {
  Grid,
  Typography,
  Stack,
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
} from '@mui/material';
import StudentInfoTable from '../layout/StudentInfoTable';
import getStudentGrades from '../../connections/getStudentGrades';

export default function StudentPopUp({ personNummer, handleClose }) {
  const [program, setProgram] = useState();
  const [kurser, setKurser] = useState();
  const [name, setName] = useState();
  const [table, setTable] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudentInfo(personNummer).then((res) => {
      setKurser(res.kurser);
      setProgram(res.program);
      setName(res.namn);
    });

    getStudentGrades(personNummer).then((res) => {
      setTable(res.data);
      setLoading(false);
    });
  }, []);
  return (
    <Dialog
      style={{ width: '100%' }}
      maxWidth={false}
      open
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {name && name.map((person) => person.FORNAMN + ' ' + person.EFTERNAMN)}
        <Typography> {personNummer}</Typography>
      </DialogTitle>
      <DialogContent>
        {/* <Grid container spacing={3}>
            <Grid item md={5}>
              Registrerade program
              {program &&
                program.map((data) => (
                  <>
                    <Typography>{data.YTTERSTA_KURSPAKETERING_SV}</Typography>
                    <Typography>
                      {data.YTTERSTA_KURSPAKETERINGSTILLFALLE_STARTDATUM} -{' '}
                      {data.YTTERSTA_KURSPAKETERINGSTILLFALLE_SLUTDATUM}
                    </Typography>
                  </>
                ))}
            </Grid>
            <Grid item md={7}>
              Registrerade kurser
              {kurser &&
                kurser.map((data) => (
                  <Typography>{data.UTBILDNING_SV}</Typography>
                ))}
            </Grid>
          </Grid> */}
        <Stack direction='row' spacing={1}>
          <Box>
            <Typography>Tillfällig rubrik</Typography>
            <StudentInfoTable rows={table && table} loading={loading} />
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} autoFocus variant='contained'>
          Stäng
        </Button>
      </DialogActions>
    </Dialog>
  );
}
