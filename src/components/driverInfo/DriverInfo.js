import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import uuid from 'uuid/v4';

import './driverInfo.css';

import * as routeActions from '../routes/actions'
import * as actions from './actions'
import constants from './constants'

import Input from '../common/inputField/inputField'
import Birthday from '../common/inputField/inputField.birthday'
// import Button from '../common/button/button'
import { Button } from 'ace-design-system'

import Toggle from '../common/toggle/toggle'


class DriverInfo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: "driverInfo",
      date: {
        month: "",
        day: "",
        year: ""
      }, 
      married: "",
      active: false 
    };

    this.date_fields= React.createRef();

  }

  componentDidMount = () => {
    this.props.actions.renderBack(true)
    console.log(this)

  }

  componentDidUpdate = () => {
  }

  captureInput = (inputField, toggle=false) => {

    var stateKey = inputField.target.name
    var stateVal = inputField.target.value      
    
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

  captureToggle = (val) => {
    this.setState(
      { "married" : val },
      () => this.activate()
    );


  }

  onProceed = () => {
    const _this = this
    this.props.actions.updatePrimaryDriver(this.state)

    // this.props.actions.captureBirthdate(this.date_fields.current)

    this.props.actions.updateRouteAction(constants.DRIVER_INFO.NAME, _this)

  }

  activate = () => {

    if ( 
      this.state.married !== "" 
      && this.state.date.month !== ""
      && this.state.date.day !== ""
      && this.state.date.year !== ""
    ) {
      this.setState(
        { active: true },
        () => this.props.actions.persistPageState(this.state)
      );

    }
  }

  render() {

    var opt1 = {
      title: "Yes",
      value: "Yes",
      name: "married",
      alt: "Yes" 
    }

    var opt2 = {
      title: "No",
      value: "No",
      name: "married",
      alt: "No" 
    }

    const userFullName = this.props.contactInfo.firstName + " " + this.props.contactInfo.lastName

    return (
      <div id={"ThankYou-Page"} className={"content-wrapper"}>
        <div className={"content-viewport"}>

          <h1>Now just a little bit <span>of driver info.</span></h1>
          <h3>{userFullName}</h3>

          <div className={"sub-content-wrapper"}>

            <Birthday
              callback={this.captureBirthdate}
              title={"Birthdate"}
              def_Month={this.props.fieldVals.date.month}
              def_Day={this.props.fieldVals.date.day}
              def_Year={this.props.fieldVals.date.year}
              ref={this.date_fields}
            />
            
            <Toggle
              label = {"Married?"}

              opt1_classes = { this.props.fieldVals.married == "yes" ? "active" : "" }
              opt2_classes = { this.props.fieldVals.married == "no" ? "active" : "" }

              opt1 = {opt1}
              opt2 = {opt2}

              toggleAction_opt1={() => this.captureToggle("yes")}
              toggleAction_opt2={() => this.captureToggle("no")}
              
              /* ---  BUG: assign default val --- */
              // currentOption={this.props.fieldVals.married}
              /* ---  BUG: assign default val --- */              
            />
            <br/>
            
            <Button
              label={"Onward we go"}
              onClick={this.onProceed}
              active={this.props.fieldVals.active}
            />

            {/* <Button 
              action={this.onProceed} 
              text={"Onward we go"}
              classCSS={"button"}
              componentId={"home-proceed"} 
              isActive={this.props.fieldVals.active}
              // isActive={true}
            /> */}

          </div>

        </div>

      </div>
    );  
  }
}

const mapStateToProps = state => {
  return {
    contactInfo: state.contactInfo,
    fieldVals: state.driverList.pageState.driverInfo,
    drivers: state.driverList
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
)(DriverInfo);
