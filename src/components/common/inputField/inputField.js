import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import './input.css'
import styles from './styles.js'


function InputField(props) {

  const { classes } = props;

  return (
    <div className={classes.container}>

      <TextField
        defaultValue={props.defaultVal}
        label={props.title}
        id="bootstrap-input"
        inputRef={props.inputRef}
        onChange={props.action}
        name={props.name}
        fullWidth={true}
        type={props.type}
        autoComplete={'off'}
        className={props.className}

        InputProps={{
          disableUnderline: true,
          classes: {
            root: classes.bootstrapRoot,
            input: classes.bootstrapInput,
          },
          ...props.inputProps,
        }}
        InputLabelProps={{
          shrink: true,
          className: classes.bootstrapFormLabel,
        }}
      />

      {(props.subCopy)
      ? <sub className={"input-sub-copy"}> {props.subCopy} </sub> 
      : null } 

    </div>
  );
}

InputField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputField);