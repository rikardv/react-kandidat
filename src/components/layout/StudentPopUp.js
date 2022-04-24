import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import getStudentInfo from '../../connections/getStudentInfo';
import { Grid, Typography, Stack, Box } from '@mui/material';
import StudentInfoTable from '../layout/StudentInfoTable';
import getStudentStats from '../../connections/getStudentStats';

export default function StudentPopUp({ personNummer, handleClose }) {
  const [program, setProgram] = useState();
  const [kurser, setKurser] = useState();
  const [name, setName] = useState();
  const [tableBetyg, setTableBetyg] = useState();
  const [tableOmtentor, setTableOmtentor] = useState();

  useEffect(() => {
    getStudentInfo(personNummer).then((res) => {
      setKurser(res.kurser);
      setProgram(res.program);
      setName(res.namn);
    });

    getStudentStats(personNummer).then((res) => {
      setTableBetyg(res.tableBetyg);
      setTableOmtentor(res.tableOmtentor);
    });
  }, []);
  return (
    <div>
      <Dialog
        fullScreen
        fullWidth
        open
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {name &&
            name.map((person) => person.FORNAMN + ' ' + person.EFTERNAMN)}
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
              <Typography>Klarade kurser</Typography>
              <StudentInfoTable rows={tableBetyg && tableBetyg} betyg />
            </Box>
            <Box>
              <Typography>Omtentor i kurser</Typography>
              <StudentInfoTable
                rows={tableOmtentor && tableOmtentor}
                betyg={false}
              />
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} autoFocus variant='contained'>
            Stäng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
