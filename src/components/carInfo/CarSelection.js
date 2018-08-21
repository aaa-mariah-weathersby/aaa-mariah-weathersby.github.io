import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import uuid from 'uuid/v4';

import './carInfo.css';

import * as routeActions from '../routes/actions'
import * as actions from './actions'
import constants from './constants'

import Input from '../common/inputField/inputField'
import Button from '../common/button/button'

class CarSelection extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: uuid(),
      page: "carSelection",
      makeModel: "", 
      year: "",
      annualMileage: "",
      active: false 
    };

    this.fields = {}

  }

  componentDidMount = () => {
    this.props.actions.renderBack(true)
    
  }

  componentDidUpdate = () => {
    
  }

  captureInput = (inputField) => {
    console.log("car select: ", inputField, this)
    var stateKey = inputField.target.name
    var stateVal = inputField.target.value

    this.setState(
      { [stateKey]: stateVal },
      () => this.activate()
    );
    
  }

  onProceed = () => {
    const _this = this
    var selectedCar = { 
      "car" : {
        makeModel: this.state.makeModel,
        year: this.state.year,  
        annualMileage: this.state.annualMileage
      }
    }

    this.props.actions.persistCarSelection(selectedCar)
    this.props.actions.updateRouteAction(constants.CAR_SELECTION.NAME, _this)

  }

  activate = () => {
    const state = this.state

    if (
      state.annualMileage !== ""
    ) {

      if (state.makeModel === "" || state.year === ""){
        this.setState(
          {
            makeModel: this.fields.makeModel_field.value,
            year: this.fields.year_field.value,
            active: true 
          },
          () => this.props.actions.persistPageState(this.state)      
        )
      }  else {
        this.props.actions.persistPageState(this.state)
      }
      
    }
  }

  clear = () => {
    const clearCar = {
      id: this.state.id,
      makeModel: "", 
      year: "",
      annualMileage: "",
      active: false 
    }
    this.setState(
      { ...clearCar },
      () => {
        for (var field in this.fields) {
          var currField = this.fields[field]
          currField.value = ""
        }
        this.props.actions.persistPageState(this.state)
      }
    );



  }

  render() {

    return (
      <div id={"CarSelection-Page"} className={"content-wrapper"}>
        
        <div className={"content-viewport"}>

          <h1>What cars would you like to include?</h1>

            <div className={"sub-content-wrapper"}>

            <Input 
              title={"Make and Model"}
              name={"makeModel"}
              type={"text"}
              defaultVal={this.props.fieldVals.makeModel}
              action={(input) => this.captureInput(input)}
              inputRef={(input) => this.fields.makeModel_field = input}
            />

            <div className={"input-half"}>
              <Input 
                title={"Year"}
                name={"year"}
                type={"number"}
                defaultVal={this.props.fieldVals.year}
                action={(input) => this.captureInput(input)}
                inputRef={(input) => this.fields.year_field = input}
              />

              <Input 
                title={"Annual Mileage"}
                name={"annualMileage"}
                type={"number"}
                defaultVal={this.props.fieldVals.annualMileage}
                action={(input) => this.captureInput(input)}
                inputRef={(input) => this.fields.annualMileage_field = input}
              />
            </div>

            <p         
              onClick={this.clear}
              className={"dead-link"}
            >Remove Car</p>

            <Button 
              action={this.onProceed} 
              isActive={this.props.fieldVals.active}
              text={"Continue"}
              classCSS={"button"}
              componentId={"home-proceed"} 

              helper={true}
              // helperAction={helperAction}
              helperActive={true}
              helperContClasses={"button-helper"}
              helperCopy={"We ran a quick check to help speed things up a bit."}

            />
            
            </div>

          </div>

      </div>
    );  
  }
}

const mapStateToProps = state => {
  return {
    fieldVals: state.carInfo.pageState.carSelection,
    carInfo: state.carInfo
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
)(CarSelection);
