import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './carInfo.css';

import * as routeActions from '../routes/actions'
import * as actions from './actions'
import constants from './constants'

import Input from '../common/inputField/inputField'
import Button from '../common/button/button'
import AutoSelect from  '../common/autoselect/autoselect'

class CarLocation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: "carLocation",
      address: "", 
      apartment: "",
      active: false,
      initLoader: false 
    };

  }

  componentDidMount = () => {
    this.props.actions.renderBack(true)

  }

  captureFields = (fieldsComponent) => {

    console.log("capture fields: ", fieldsComponent)

    this.setState(
      { address: fieldsComponent.state.single },
      () => this.activate()
    )

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
    setTimeout( () => {
      this.props.actions.persistCarLocation( { "location" : this.state })
      this.props.actions.updateRouteAction(constants.CAR_LOCATION.NAME, this)

    }, 2500);

  }

  onProceed = () => {
    this.setState(
      { initLoader: true },
      () => this.saveAndProceed()
    );


  }

  activate = () => {
    const state = this.state
    console.log("this updated: ", this)

    if ( state.address !== "" ) {
      this.setState({ active: true });
      this.props.actions.persistPageState(this.state)

    }
  }

  render() {

    return (
      <div id={"CarLocation-Page"} className={"content-wrapper"}>
        <div className={"content-viewport"}>

          <h1>Where does your car live when it's not out and about?</h1>

          <div className={"sub-content-wrapper"}>

            <AutoSelect 
              options={[
                { label: '2601 South Hill Street, Los Angeles, CA, USA' },
                { label: '2601 South San Pedro Street, Los Angeles, CA 90043' },
                { label: '2601 South Grand Street, Los Angeles, CA, 90036' },
                { label: '2601 South Santa Fe Street, Los Angeles, CA 90046' },
                { label: 'South Figueroa Street, Los Angeles, CA, 90045' }                
              ]}
              title={"Address"}
              // defaultVal={this.props.fieldVals.address}
              callback={this.captureFields}
              // inputRef={(input) => this.address_field = input}
            />

            <Input 
              title={"Apartment"}
              name={"apartment"}
              defaultVal={this.props.fieldVals.apartment}
              action={(input) => this.captureInput(input)}
              inputRef={(input) => this.apartment_field = input}
            />

            <Button 
              action={this.onProceed} 
              text={"Continue"}
              classCSS={"button loader"}
              isActive={
                this.props.fieldVals.active ? this.props.fieldVals.active : this.state.active
              }
              loader={this.state.initLoader}
              // loader={true}
              componentId={"home-proceed"} 
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
)(CarLocation);
