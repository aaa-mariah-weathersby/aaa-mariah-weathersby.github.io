import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import uuid from 'uuid';

import './driverInfo.css';

import * as routeActions from '../routes/actions'
import * as actions from './actions'
import constants from './constants'

import Input from '../common/inputField/inputField'
import Button from '../common/button/button'
import Select from '../common/select/select'

class AdditionalDriverRelationship extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: "additionalDriverRelationship",
      relationship: "",
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

    this.props.actions.updateRouteAction(constants.ADDITIONAL_DRIVER_RELATIONSHIP.NAME, _this)

  }

  captureInput = (inputField) => {
    var stateKey = inputField.target.name
    var stateVal = inputField.target.value
    console.log("captureINput: ", inputField.target, stateKey, stateVal)

    this.setState({ [stateKey]: stateVal });
    this.activate()

  }

  clear = () => {
    const clearDriver = {
      id: this.state.id,
      firstName: "",
      lastName: "",
      birthDate: "",
      relationship: "",
      active: false
    }
    this.setState(
      { ...clearDriver },
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
      state.firstName !== "" && 
      state.lastName !== "" && 
      state.birthDate !== "" &&
      state.relationship !== ""
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

    const relationshipConfig = {
      "spouse": {
        title: "Spouse",
        value: "Spouse"
      },
      "child": {
        title: "Child",
        value: "Child"
      },
      "parent": {
        title: "Parent",
        value: "Parent"
      },
      "sibling": {
        title: "Sibling",
        value: "Sibling"
      },
      "other": {
        title: "Other",
        value: "Other"
      }       
    }
    const secondaryDriverName = this.props.secondaryDriver.firstName

    return (
      <div id={"ThankYou-Page"} className={"content-wrapper"}>

        <div className={"content-viewport"}>
          <h1>What is your relationship to {secondaryDriverName}?</h1>

            <div className={"sub-content-wrapper"}>

              <Select
                menuItems={relationshipConfig}
                label={"Relationship"}
                callback={this.captureInput}
                fieldName={"relationship"}
                defaultVal={"testing"}
              />

              <br />
              
              <p         
                onClick={this.clear}
                className={"dead-link"}
              >Remove Driver</p>

              <Button 
                action={this.onProceed} 
                text={"Add Driver"}
                classCSS={"button"}
                componentId={"home-proceed"} 
                isActive={true}
              />


            </div>
          
          </div>

      </div>
    );  
  }
}

const mapStateToProps = state => {
  return {
    fieldVals: state,
    secondaryDriver: state.driverList.drivers.secondary
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
)(AdditionalDriverRelationship);
