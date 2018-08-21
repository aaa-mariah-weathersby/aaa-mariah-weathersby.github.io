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
    
      <FormControl className={classes.margin}>

        <Input
          classes={{
            underline: classes.cssUnderline,
          }}
          id="custom-css-input"
        />
      </FormControl>

     </div>
  );
}

InputField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputField);