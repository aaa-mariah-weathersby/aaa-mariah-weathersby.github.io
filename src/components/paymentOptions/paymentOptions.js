import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './paymentOptions.css';

import * as routeActions from '../routes/actions'
import * as actions from './actions'
import constants from './constants'
import * as footerActions from '../addOns/actions'

import Radio from '../common/inputField/input.radio'
import Button from '../common/button/button'

class PaymentOptions extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: "paymentOptions",
      paymentType: "" 
    };

  }

  componentDidMount = () => {
    this.props.actions.renderBack(true)
    this.props.actions.updateFooter(false)
  }

  storeInput = (radioSet) => {
    this.setState(
      { paymentType: radioSet.state.value},
      console.log("storeInput: ", radioSet)
    )
  }

  onProceed = () => {
    this.props.actions.persistPageState(this.state)
    this.props.actions.updateRouteAction(constants.NAME, this)
  }

  render() {

    return (
      <div id={"PaymentOptions-Page"} className={"content-wrapper"}>

        <div className={"content-viewport"}>
          <h1>How would you like to pay?</h1>

          <div className={"sub-content-wrapper thank-you-content"}>        
            <Radio
              options={
                {
                  card: "Credit or Debit Card",
                  bank: "Bank Account",
                  paypal: "PayPal"
                }
              }
              default={this.props.fieldVals.paymentType}
              callback={this.storeInput}
            />

            <Button 
              action={this.onProceed} 
              text={"Continue"}
              classCSS={"button"}
              isActive={true}
              // componentId={"more-driver-proceed"} 
            />   

          </div>
        </div>

      </div>
    );  
 
  }
}

const mapStateToProps = state => {
  return {
    all: state,
    fieldVals: state.paymentOpts.pageState.paymentOptions
  }
}

const mapDispatchToProps = (dispatch) => {
  const actionsToBind = Object.assign({}, routeActions, footerActions, actions);
  return {
      actions: bindActionCreators(actionsToBind, dispatch)
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentOptions);
