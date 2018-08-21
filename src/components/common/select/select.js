import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import styles from './styles.js'
// import styles from '../inputField/styles'

class SimpleSelect extends React.Component {
  state = {
    age: '',
    name: 'hai',
  };

  componentDidMount = () => {
      if (this.props.defaultVal !== ""){
          this.setState({ 
            name: this.props.defaultVal
          })
    } else {
      // this.setState({ 
      //   name: this.props.defaultVal
      // })        
    }

      console.log("Select mount: ", this)
  }
  
  handleChange = event => {
    this.setState({ 
        [event.target.name]: event.target.value,
        name: event.target.value 
    });
    this.props.callback(event)
  };

  render() {
    const { classes } = this.props;

    const menuItems = 
      Object.values(this.props.menuItems).map (
        menuItem => {
          return  (
            <MenuItem value={menuItem.value}>{menuItem.title}</MenuItem>
          )
        }
      )

    return (
      <form className={classes.root + "testings"} autoComplete="off">

        <FormControl 
            className={classes.formControl}
        >
            
            <InputLabel 
            htmlFor="name-readonly"
            shrink={true}
            className={classes.bootstrapFormLabel}
            >
                {this.props.label}
            </InputLabel>

          <Select
            value={this.state.name}
            onChange={this.handleChange}
            defaultValue={this.props.defaultVal}
            input={
                <Input name={this.props.fieldName} id="name-readonly"
                disableUnderline={true}
                defaultValue={this.props.defaultVal}
                classes= {{
                    root: classes.bootstrapRoot,
                    input: classes.bootstrapInput,
                }}
                />
            }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            
            {menuItems}

          </Select>

        </FormControl>
       
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);
