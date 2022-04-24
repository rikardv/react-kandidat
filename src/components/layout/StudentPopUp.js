import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import getStudentInfo from '../../connections/getStudentInfo';
import { Grid, Typography } from '@mui/material';

export default function StudentPopUp({ personNummer, handleClose }) {
  const [program, setProgram] = useState();
  const [kurser, setKurser] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    getStudentInfo(personNummer).then((res) => {
      setKurser(res.kurser);
      setProgram(res.program);
      setName(res.namn);
    });
  }, []);
  return (
    <div>
      <Dialog
        fullWidth={true}
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
          <Grid container spacing={3}>
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
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Stäng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
