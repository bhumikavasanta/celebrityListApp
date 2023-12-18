import React from 'react';
import {
  Button, Dialog, DialogContent, DialogActions
} from '@mui/material';
import './Styles.css'; // Import the CSS file

function DeleteAlert(props) {
  const { open, handleClose, handleDelete } = props;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent className="dialogContent">
        <div>Are you sure you want to delete?</div>
        <div onClick={handleClose} className="closeButton">
          x
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ backgroundColor: 'white', color: 'black' }}>
          Cancel
        </Button>
        <Button onClick={handleDelete} style={{ backgroundColor: 'orangered', color: 'white' }}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteAlert;
