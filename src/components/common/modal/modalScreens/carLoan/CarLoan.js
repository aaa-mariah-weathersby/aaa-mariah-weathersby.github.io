import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// import './driverInfo.css';

import * as routeActions from '../../../../routes/actions'
import constants from '../constants'
import * as actions from '../actions'

import Input from '../../../inputField/inputField'
import Button from '../../../button/button.secondary'
import Toggle from '../../../toggle/toggle'
import Helper from '../../../helper/helper'

class Accident extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: "carLoanModal",
      DL: "", 
      stateIssued: "",
      active: "",
    };

  }

  componentDidMount = () => {

  }

  captureInput = (inputField) => {

    var stateKey = inputField.target.name
    var stateVal = inputField.target.value

    this.setState({ [stateKey]: stateVal });
    this.activate()

  }

  onProceed = () => {

    const _this = this
    // this.props.actions.updateRouteAction('additionalQuestions', _this)
    this.props.navAction()
  }


  activate = () => {
    const state = this.state

    if ( state.DL !== "" && state.stateIssued !== "" ) {
      this.setState({ active: true });
      this.props.actions.persistPageState(this.state)

    }
  }

  render() {

    var opt1 = {
      title: "Yes",
      value: "Yes",
      alt: "Yes" 
    }

    var opt2 = {
      title: "No",
      value: "No",
      alt: "No" 
    }

    return (
      <div id={"accident-modal"} >

        <h1>Do you have a 4 year degree <span>and belong to your alumni association?</span></h1>
        
        <div className={"sub-content-wrapper"}>



          <Button 
            action={this.onProceed} 
            text={"Yes, I have both"}
            classCSS={"button secondary"}
            componentId={"home-proceed"} 
          />

          <Button 
            action={this.onProceed} 
            text={"No, this does not apply to me"}
            classCSS={"button secondary flat"}
            componentId={"home-proceed"} 
          />     

          <div className={"modal-tracker"}>
            <p>Question 2 of 5 </p>
          </div>    
            
        </div>

      </div>

    );  
  }
}

const mapStateToProps = state => {
  return {
    fieldVals: state.modals.pageState.carLoanModal
  }
}

const mapDispatchToProps = (dispatch) => {
  const actionsToBind = Object.assign({}, routeActions, actions);
  return {
      actions: bindActionCreators(actionsToBind, dispatch)
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Accident);
