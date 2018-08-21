import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// import './driverInfo.css';

import * as routeActions from '../../../../routes/actions'
import constants from '../constants'
import * as actions from '../actions'

import Button from '../../../button/button.secondary'


class Accident extends Component {

  constructor(props) {
    super(props);

    this.state = {
      accident: "", 
    };

  }

  componentDidMount = () => {

  }

  captureInput = (inputField) => {

    var stateKey = inputField.target.name
    var stateVal = inputField.target.value

    this.setState({ [stateKey]: stateVal });

  }

  onProceed = () => {

    const _this = this
    this.props.actions.updateRouteAction(constants.ACCIDENT_MODAL.NAME, _this)

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
        <h1>Have you had any accidents in the last 12 months?</h1>
        <div className={"sub-content-wrapper"}>

          {/* <Helper
            content={"Where you live and accident history are a few major factors in how much insurance costs."}
            active={true}
          />
          <br /> */}


          <Button 
            action={this.props.navAction} 
            text={"Yes, I have"}
            classCSS={"button secondary"}
            // componentId={"more-driver-dead"} 
            secondary={true}
          />


          <Button 
            action={this.props.navAction} 
            text={"No, I haven't"}
            classCSS={"button secondary"}
            // componentId={"more-driver-dead"} 
            secondary={true}
          />

          <div className={"modal-tracker"}>
            <p>Question 1 of 5 </p>
          </div>
            

        </div>


      </div>
    );  
  }
}

const mapStateToProps = state => {
  return {
    contactInfo: state.contactInfo,
    fieldVals: state,
    otherDriver: state.driverList.pageState.additionalDriverInfo.firstName
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
)(Accident);
