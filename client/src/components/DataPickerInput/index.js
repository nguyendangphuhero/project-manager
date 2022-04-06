import 'date-fns';
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import { Grid, Button, IconButton, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { editStyles, EditInput } from "./styles";

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

const DatePickerInput = ({ editDatePicker, value, handleChange, handleClose }) => {
  // The first commit of Material-UI
  const classes = editStyles();
  const [error, setError] = useState();
  const handleSaveButtonClick = () => {
    setError();
    editDatePicker(value);
    handleClose();
  };
  // const [valuee, setValue] = React.useState(new Date());


  return (
    <Grid container>
      <Grid item xs={12}>
        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDateTimePicker
              variant="inline"
              ampm={false}
              value={value}
              onChange={handleChange}
              onError={console.log}
              disablePast
              format="yyyy/MM/dd HH:mm"
            />
          </Grid>
        </MuiPickersUtilsProvider> */}
       
        <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Time Finish"
        value={value}
        onChange={handleChange}
      />
    </LocalizationProvider>


      </Grid>
      <Grid
        item
        xs={12}
        container
        alignItems="center"
        style={{ paddingTop: "4px" }}
      >
        <Grid item>
          <Button
            className={classes.addList}
            variant="contained"
            color="primary"
            onClick={handleSaveButtonClick}
          >
            Save
          </Button>
        </Grid>
        <Grid item xs={2}>
          <IconButton
            style={{ marginLeft: "16px" }}
            className={classes.cancelButton}
            aria-label="cancel"
            onClick={() => {
              handleClose();
            }}
          >
            <Close />
          </IconButton>
        </Grid>
      </Grid>
      {error && <Typography className={classes.error}>{error}</Typography>}
    </Grid>

  );
};

export default DatePickerInput;
