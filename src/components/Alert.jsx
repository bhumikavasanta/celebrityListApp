import React from 'react';
import {
  Button, Dialog, DialogContent, DialogActions
} from '@mui/material';
import './Styles.css'; // Import the CSS file

function Alert(props) {
  const { openAlert, handleCloseAlert } = props;

  return (
    <Dialog open={openAlert} onClose={handleCloseAlert}>
      <DialogContent className="dialogContent">
        <div>You are not an adult. You cannot edit any details.</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseAlert} style={{ backgroundColor: 'orangered', color: 'black' }}>
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Alert;
