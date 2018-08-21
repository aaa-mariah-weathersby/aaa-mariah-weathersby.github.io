import React from 'react';
import PropTypes from 'prop-types';

import Input from './inputField';

import './input.css'
import './input.birthday.css'
import styles from './styles.js'


class BirthdayFields extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      month: 0,
      day: 0,
      year: 0
    };

    this.fields = {};

  }

  handleChange = (event) => {
      this.setState(
        { [event.target.name]: event.target.value },
        () => {
          if (
            this.state.month != 0 
            && this.state.day != 0
            && this.state.year != 0
            && this.props.callback
          ){
            this.props.callback(this)
          }
        }
      );
    
    if (this.props.callback && this.props.dateOverride)
      this.props.callback(this)

  };

  render(){
    return (
      <div className={"birthdayFields"}
        // ref={(input) => this.fields.birthdate = input}      
      >

        <p className={"birthdate-labels"}>{this.props.title}</p> 

        <div className={"fields"}>
          <span className={" monthField"}>
            <Input 
                name={"month"}
                defaultVal={ this.props.def_Month ? this.props.def_Month : ""}
                action={(input) => this.handleChange(input)}
                type={"number"}
                inputProps={{ min: 0, max: 12 }}
                // inputRef={(input) => this.fields.month_field = input}
            />
          </span>
          <span className={" dayField"}>
            <Input 
                name={"day"}
                defaultVal={ this.props.def_Day ? this.props.def_Day : ""}
                action={(input) => this.handleChange(input)}
                type={"number"}
                inputProps={{ min: 0, max: 31 }}
                // inputRef={(input) => this.fields.date_field = input}
            />
          </span>
          <span className={" yearField"}>
            <Input 
                name={"year"}
                defaultVal={ this.props.def_Year ? this.props.def_Year : ""}
                action={(input) => this.handleChange(input)}
                type={"number"}
                inputProps={{ min: 0, max: 2018 }}
                // inputRef={(input) => this.fields.year_field = input}
            />          
          </span>
        </div>

        <p className={"birthdate-labels"}>MM/DD/YYY</p> 

      </div>
    );
  
  }

}

export default BirthdayFields;
