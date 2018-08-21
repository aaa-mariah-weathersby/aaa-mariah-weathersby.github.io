import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import './input.radio.css'

const theme = createMuiTheme({
  palette: {
    primary: { 
      main: "#0099ff" 
    }, 
    secondary: {
      light: '#0099ff',
      main: '#0099ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#0099ff',
    },
  },
});

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    // margin: theme.spacing.unit * 3,
  },
  formControlLabel: {
      margin: 'none',
  },
  group: {
    // margin: `${theme.spacing.unit}px 0`,
  },
});

class RadioButtonsGroup extends React.Component {


constructor(props) {
    super(props);

    this.state = {
        value: this.props.default ? this.props.default : '',
    };
    
    this.radios = null;

}

  componentDidMount = () => {
    console.log(this.props.options)

    this.raidos =          
        Object.keys(this.props.options).map( key => (
            <FormControlLabel
                value={key}
                control={<Radio />}
                label={this.props.options[key]}
            />
        ))
    }

  handleChange = event => {
    this.setState(
      { value: event.target.value },
      () => {
        if (this.props.callback)
          this.props.callback(this)
      }
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>

          <FormControl 
              component="fieldset" 
              required 
              className={classes.formControl + " radio-group"}>
            {/* <FormLabel component="legend">Gender</FormLabel> */}

            <RadioGroup
              aria-label="gender"
              name="gender2"
              className={classes.group}
              value={this.state.value}
              onChange={this.handleChange}
            >

              {
                  Object.keys(this.props.options).map( key => (
                      <FormControlLabel
                          value={key}
                          className={"radio-group-label"}
                          control={
                            <Radio 
                              color="primary"
                            />
                          }
                          label={this.props.options[key]}
                      />
                  ))
              }

            </RadioGroup>

          </FormControl>

        </MuiThemeProvider>
      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);
