/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from '@material-ui/core/Chip';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import styles from './styles'
import baseStyles from '../inputField/styles'
import './autoselect.css'

class Option extends React.Component {
  handleClick = event => {
    this.props.onSelect(this.props.option, event);
  };

  render() {
    const { children, isFocused, isSelected, onFocus } = this.props;

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {children}
      </MenuItem>
    );
  }
}

function SelectWrapped(props) {
  const { classes, ...other } = props;

  return (
    <Select
      optionComponent={Option}
      noResultsText={<Typography>{'No results found'}</Typography>}
      arrowRenderer={arrowProps => {
        return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
      }}
      clearRenderer={() => <ClearIcon />}
      valueComponent={valueProps => {
        const { value, children, onRemove } = valueProps;

        const onDelete = event => {
          event.preventDefault();
          event.stopPropagation();
          onRemove(value);
        };

        if (onRemove) {
          return (
            <Chip
              tabIndex={-1}
              label={children}
              className={classes.chip}
              deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
              onDelete={onDelete}
            />
          );
        }

        return <div className="Select-value">{children}</div>;
      }}
      {...other}
    />
  );
}


class IntegrationReactSelect extends React.Component {
  state = {
    single: null,
  };
  
  options = this.props.options.map(
      suggestion => ({
        value: suggestion.label,
        label: suggestion.label,
      }));

  componentDidMount = () => {
      console.log("this: ", this)
  }

  handleChange = name => value => {
    console.log("handleChange")
    this.setState(
        { [name]: value,},
        () => {
            if (this.props.callback)
                this.props.callback(this)
        }
    );


  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root + " auto-select"}>
        <label>{this.props.title}</label>
        <Input
          fullWidth
          inputComponent={SelectWrapped}
          value={this.state.single}
          onChange={this.handleChange('single')}
          placeholder={"   "}
          id="react-select-single"
          inputProps={{
            className: 'auto-select-input',
            classes,
            name: 'react-select-single',
            instanceId: 'react-select-single',
            simpleValue: true,
            options: this.options,
          }}
        />
        
      </div>
    );
  }
}

IntegrationReactSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, baseStyles)(IntegrationReactSelect);
