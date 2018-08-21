import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './carInfo.css';

import * as routeActions from '../routes/actions'
import * as actions from './actions'
import constants from './constants'

import Button from '../common/button/button.secondary'

import icon from '../../images/homeIcon/fill.png'

class CarLocationShared extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: "carLocationShared",
      shared: "",
      address: "", 
      apartment: "",
      active: false,
    };

  }

  componentDidMount = () => {
    this.props.actions.renderBack(true)
    console.log("car location shared: ", this)

  }

  captureInput = (inputField) => {
    var stateKey = inputField.target.name
    var stateVal = inputField.target.value

    this.setState(
      { [stateKey]: stateVal },
      () => this.activate()
    );
    
  }

  saveAndProceed = () => {
      this.props.actions.persistCarLocation( { "location" : this.state })
      this.props.actions.updateRouteAction(constants.CAR_LOCATION_SHARED.NAME, this)

  }

  onProceed = () => {
    this.setState(
      { initLoader: true },
      () => this.saveAndProceed()
    );


  }

  captureToggle = (val) => {
    this.setState(
      { "shared" : val },
      () => this.activate()
    );


  }

  activate = () => {
    const state = this.state

    if ( state.address !== ""  && state.shared !== "" ) {
      this.setState({ active: true });
      this.props.actions.persistPageState(this.state)

    }
  }

  render() {

    
    return (
      <div id={"CarLocation-Page"} className={"content-wrapper"}>
        <div className={"content-viewport"}>

          <h1>Do you live here too?</h1>
          
          <div className={"address-header"}>
            <img src={icon} />
            <h3>{this.props.carInfo.address}</h3>
          </div>

          <br/>

          <div className={"sub-content-wrapper"}>
          
            <Button 
              action={this.onProceed} 
              text={"Yes, I live here"}
              classCSS={"button secondary"}
              componentId={"home-proceed"} 
              secondary={true}
            />

            <Button 
              action={this.onProceed} 
              text={"No, I don't live here"}
              classCSS={"button secondary"}
              componentId={"home-proceed"} 
              secondary={true}
            />  

          </div>

        </div>
      </div>

    );  
  }
}

const mapStateToProps = state => {
  return {
    carInfo: state.carInfo,
    fieldVals: state.carInfo.pageState.carLocation
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
)(CarLocationShared);
