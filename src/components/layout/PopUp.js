import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

const emails = ['Program1', 'Program2'];

const PopUp = (props) => {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Lista över alla program</DialogTitle>

      {emails.map((email) => (
        <ListItem>
          <ListItemText primary={email} />
        </ListItem>
      ))}
    </Dialog>
  );
};

export default PopUp;
