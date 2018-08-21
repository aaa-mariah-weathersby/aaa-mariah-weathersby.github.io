import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';


import styles from './styles.js'


function InputField(props) {
  const { classes } = props;

  return (
    <div className={classes.container}>

      <MuiThemeProvider theme={theme}>
        <TextField
          className={classes.margin}
          label="MuiThemeProvider"
          id="mui-theme-provider-input"
        />
      </MuiThemeProvider>

    </div>
  );
}

InputField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputField);