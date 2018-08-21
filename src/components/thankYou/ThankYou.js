import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './thankYou.css';

import * as routeActions from '../routes/actions'
// import * as actions from './actions'
import constants from './constants'
import * as footerActions from '../addOns/actions'

import Toggle from '../common/toggle/toggle'
import Helper from '../common/helper/helper'

class ThankYou extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: "thankYou",
      initModal: false,
      modalView: 1
    };

  }

  componentDidMount = () => {
    this.props.actions.renderBack(false)
    this.props.actions.updateFooter(false)
  }

  exitModal = () => {
    this.setState({
      initModal: false
    })  
    this.props.actions.updateRouteAction(constants.ADDITIONAL_QUESTIONS.NAME, this)

  }

  onProceed = () => {

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
      <div id={"ThankYou-Page"} className={"content-wrapper"}>

        <div className={"content-viewport"}>
          <h1>Thank you for your payment!</h1>

          <div className={"sub-content-wrapper thank-you-content"}>

            <p>You have chosen Auto Insurance x 2 drivers x Basic Coverage</p>
            <br/>
            <p>A confirmation email will be sent to you</p>
            <br/>

            <p><b>Your confirmation number: </b> AAA1234567</p>
            <p><b>Total Cost: </b> $00.00/mo (12 month plan)</p>
            <br/>

            <Helper
                content={"We appreciate your business " + this.props.driverName + ". Is there anything else I can help you with?"}
                active={true}
                helperClasses={" flex-break"}
                helperContainerClasses={" full"}
            />
            
            <Toggle
              label = {""}
              opt1 = {opt1}
              opt2 = {opt2}
            />

          </div>
        </div>

      </div>
    );  
 
  }
}

const mapStateToProps = state => {
  return {
    carInfo: state,
    driverName: state.contactInfo.firstName
  }
}

const mapDispatchToProps = (dispatch) => {
  const actionsToBind = Object.assign({}, routeActions, footerActions);
  return {
      actions: bindActionCreators(actionsToBind, dispatch)
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThankYou);
