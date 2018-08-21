import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputMUI from '@material-ui/core/Input';
import InputLabelMUI from '@material-ui/core/InputLabel';
import FormControlMUI from '@material-ui/core/FormControl';

import styles from './styles/input.scss'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export class Input extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          state: null,
        };

        this.themeOverride = createMuiTheme({
            palette: {
                primary: {
                    main: '#0099ff',
                    dark: '#0099ff',
                    contrastText: '#0099ff',
                    light: '#0099ff',
                },
            },
            overrides: {
                MuiFormControl: {
                    root: {
                        margin: 'none',
                    }
                },
                MuiInputLabel: {
                    formControl: {
                        transform: 'inherit',
                        top: 'none',
                        fontSize: '0.9em'
                    },
                    root: {
                    },
                },
                 MuiInput: {
                     focused: {
                         border: '1px #0099FF solid'
                     }
                 }
            }
          })

    }
    
  handleChange = name => event => {
    this.setState(
        {[name]: event.target.value,},
        () => {
            if(this.props.callback)
                this.props.callback(this)
        }
    );
  };


  render = () => {

    return (
        <MuiThemeProvider theme={this.themeOverride}>
            <FormControlMUI
                classes = {{
                    root: `${styles.field_control} field_control`
                }}
            >

                <InputLabelMUI
                    classes = {{
                        formControl: `${styles.input_label} input_label`,
                        root: `${styles.input_label}`
                    }}
                    
                    disableAnimation = {true}
                    shrink={false}
                >
                    {this.props.label}
                </InputLabelMUI>

                <InputMUI
                    disableUnderline = {true}
                    type = {this.props.type ? this.props.type : 'text' }
                    classes = {{
                        root: `${styles.input} input`,
                        // root: `input`,
                        input: `${styles.input_field} input_field`,
                        focused: `${styles.focused}`,
                    }}
                    name = {this.props.name}
                    onChange={this.handleChange(this.props.name)}
                
                />
            </FormControlMUI>
        </MuiThemeProvider>

    )

  }

}

Input.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string
  };
  

export default Input;
// export default withStyles(themeStyles)(Input);