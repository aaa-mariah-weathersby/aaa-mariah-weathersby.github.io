import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './contactInfo.css';

import * as routeActions from '../routes/actions'
import * as actions from './actions'
import * as driverInfoActions from '../driverInfo/actions'
import constants from './constants'

import Input from '../common/inputField/inputField'
// import Button from '../common/button/button'
import { Button, Helper } from 'ace-design-system'

class ContactInfo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: "contactInfo",
      firstName: "", 
      lastName: "", 
      email: "", 
      active: false,
      activateHelper: false, 
    };

  }

  componentDidMount = () => {
    this.props.actions.renderBack(false)
  }


  onProceed = () => {
    console.log("proceed")
    const _this = this
    this.props.actions.updateRouteAction(constants.NAME, _this)

  }

  activateHelper = () => {
    this.setState({ activateHelper: true })
  }

  captureInput = (inputField) => {
    var stateKey = inputField.target.name
    var stateVal = inputField.target.value

    this.setState(
      { [stateKey]: stateVal },
      () => this.activate()
    );
    
  }

  createDriver = () => {
    this.props.actions.updatePrimaryDriver(this.state)
  }

  activate = () => {
    const state = this.state
    // this.activateHelper()

    if (
      state.firstName != "" && 
      state.lastName != "" && 
      state.email != ""
    ){
      this.createDriver(this.state)
      this.setState(
        { active: true },
        () => this.props.actions.persistVals(this.state)
      );
      
    }

  }

  render() {
    return (
      <div id={"ThankYou-Page"} className={"content-wrapper"}>
        <div className={"content-viewport"}>
          <h1>First things first.</h1>
          
          <div className={"sub-content-wrapper"}>
            <Input 
              title={"First Name"}
              name={"firstName"}
              type={"text"}
              defaultVal={this.props.fieldVals.firstName}
              action={(input) => this.captureInput(input)}
              inputRef={(input) => this.firstName_field = input}
            />

            <Input 
              title={"Last Name"}
              name={"lastName"}
              defaultVal={this.props.fieldVals.lastName}
              type={"text"}
              action={this.captureInput}
              inputRef={(input) => this.lastName_field = input}
            />

            <Input 
              title={"Email"}
              name={"email"}
              type={"email"}
              defaultVal={this.props.fieldVals.email}
              action={this.captureInput}
              inputRef={(input) => this.email_field = input}
            />

            <Helper
              active={this.state.active}
              content={"We'll save this for you in case you need to come back to it."}
            />

            <br/>

            <Button
              label={"Great, we're off to the races!"}
              onClick={this.onProceed}
              active={this.props.fieldVals.active}
            />

            {/* <Button 
              action={this.onProceed} 
              text={"Great, we're off to the races!"}
              classCSS={"button"}
              componentId={"home-proceed"} 
              helper={true}
              // helperAction={helperAction}
              helperActive={this.state.active}
              helperContClasses={"button-helper"}
              isActive={this.props.fieldVals.active}
              helperCopy={"We'll save this for you in case you need to come back to it."}
            /> */}

          </div>
        </div>

      </div>
    );  
  }
}

const mapStateToProps = state => {
  return {
    fieldVals: state.contactInfo,
    drivers: state.driverList.drivers
  }
}

const mapDispatchToProps = (dispatch) => {
  const actionsToBind = Object.assign({}, actions, routeActions, driverInfoActions);
  return {
      actions: bindActionCreators(actionsToBind, dispatch)
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactInfo);
