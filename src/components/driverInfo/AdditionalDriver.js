import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import uuid from 'uuid';

import './driverInfo.css';

import * as routeActions from '../routes/actions'
import * as actions from './actions'
import constants from './constants'

import Input from '../common/inputField/inputField'
import { Button } from 'ace-design-system'
import Birthday from '../common/inputField/inputField.birthday'

const INIT_STATE = {
  firstName: "", 
  lastName: "", 
  birthDate: {}, 
  active: false 
}

class AdditionalDriver extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: "additionalDriverInfo",
      id: uuid(),
      firstName: "", 
      lastName: "", 
      date: {
        month: "",
        day: "",
        year: ""
      }, 
      active: false 
    };

    this.fields = {};

  }

  componentDidMount = () => {
    this.props.actions.renderBack(true)

    if(this.props.fieldVals.active === false)
      this.props.actions.updateSecondaryDriver(this.state)

    console.log("addDriver state: ", this)

  }

  onProceed = () => {
    const _this = this
    this.props.actions.updateSecondaryDriver(this.state)

    this.props.actions.updateRouteAction(constants.ADDITIONAL_DRIVER.NAME, _this)

  }

  captureInput = (inputField) => {
    var stateKey = inputField.target.name
    var stateVal = inputField.target.value
    console.log("captureINput: ", this)

    this.setState({ [stateKey]: stateVal });
    this.activate()

  }

  captureBirthdate = (fields) => {
    console.log("capture: ", fields)
    this.setState(
      { date: { ...fields.state } },
      () => this.activate()
    )

  }

  clear = () => {

    this.setState(
      { ...INIT_STATE },
      () => {
        for (var field in this.fields) {
          var currField = this.fields[field]
          currField.value = ""
        }
    
        this.props.actions.updateSecondaryDriver(this.state)
      }
    );
  }

  activate = () => {
    const state = this.state

    if (
      state.firstName !== ""
      && state.lastName !== "" 
      && state.date.month !== "" 
      && state.date.day !== "" 
      && state.date.year !== "" 
    ){
      this.setState(
        { active: true },
        () => {
          this.props.actions.persistPageState(state)
          this.props.actions.updateSecondaryDriver(this.state)

          console.log("update secondary driver: ", this)
        }
      );


    }
  }

  render() {

    return (
      <div id={"ThankYou-Page"} className={"content-wrapper"}>

        <div className={"content-viewport"}>
          <h1>Additional driver info.</h1>

            <div className={"sub-content-wrapper"}>

              <Input 
                title={"First Name"}
                name={"firstName"}
                defaultVal={this.props.fieldVals.firstName}
                action={(input) => this.captureInput(input)}
                type={"text"}
                inputRef={(input) => this.fields.firstName_field = input}
              />

              <Input 
                title={"Last Name"}
                name={"lastName"}
                action={this.captureInput}
                defaultVal={this.props.fieldVals.lastName}
                type={"text"}
                inputRef={(input) => this.fields.lastName_field = input}
              />

              {/* <Birthday
                callback={this.captureBirthdate}
              /> */}

              <Birthday
                callback={this.captureBirthdate}
                title={"Birthdate"}
                def_Month={this.props.fieldVals.date.month}
                def_Day={this.props.fieldVals.date.day}
                def_Year={this.props.fieldVals.date.year}
                // ref={this.date_fields}
              />

              <br />
              
              <p         
                onClick={this.clear}
                className={"dead-link"}
              >Remove Driver</p>

              {/* <Button 
                action={this.onProceed} 
                text={"Continue"}
                classCSS={"button"}
                componentId={"home-proceed"} 
                isActive={this.props.fieldVals.active}
              /> */}

              <br/> 
              <Button
                label={"Continue"}
                onClick={this.onProceed}
                active={this.props.fieldVals.active}
              />

            </div>
          
          </div>

      </div>
    );  
  }
}

const mapStateToProps = state => {
  return {
    fieldVals: state.driverList.pageState.additionalDriverInfo,
    fieldValsB: state.driverList
  }
}

const mapDispatchToProps = (dispatch) => {
  const actionsToBind = Object.assign({}, actions, routeActions);
  return {
      actions: bindActionCreators(actionsToBind, dispatch)
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdditionalDriver);
