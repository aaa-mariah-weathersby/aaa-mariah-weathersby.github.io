import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './review.css';

import * as routeActions from '../routes/actions'
// import * as actions from './actions'
import constants from './constants'
import * as footerActions from '../addOns/actions'

import Input from '../common/inputField/inputField'
import Button from '../common/button/button'

class Review extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: "review",
      cardNumber: 0,
      expirationDate: 0,
      CVV: 0,
      active: false
    };

  }

  captureInput = (e) => {
    var name = e.target.name
    this.setState(
      { [e.target.name]: e.target.value },
      () => {
        this.activate()
      }
    )

  }

  activate = () => {
    const state = this.state

    if (
      state.cardNumber !== 0
      && state.expirationDate !== 0
      && state.CVV !== 0
    ) {
      this.setState(
        { active: true },
        () => { 
          this.props.actions.persistPageState(state)
        }
      );
    }
  }

  onProceed = () => {
    this.props.actions.persistPageState(this.state)
    this.props.actions.updateRouteAction(constants.NAME, this)

  }

  componentDidMount = () => {
    this.props.actions.renderBack(true)
    this.props.actions.updateFooter(false)
  }

  render() {

    return (
      <div id={"Review-Page"} className={"content-wrapper"}>

        <div className={"content-viewport"}>
          <h1>We're at the finish line!</h1>

          <div className={"sub-content-wrapper thank-you-content"}>   
          
          <Input 
              title={"Card Number"}
              name={"cardNumber"}
              type={"number"}
              subCopy={"Visa, Mastercard, American Express, Discover"}
              defaultVal={this.props.fieldVals.cardNumber}
              action={(input) => this.captureInput(input)}
              // inputRef={(input) => this.fields.year_field = input}
          />  

          <div className={"int-row"}>
            <Input 
                title={"Expiration Date"}
                name={"expirationDate"}
                type={"number"}
                subCopy={"MM/YY"}
                className={"half-input"}
                defaultVal={this.props.fieldVals.expirationDate}
                action={(input) => this.captureInput(input)}
                // inputRef={(input) => this.fields.year_field = input}
            />  

            <Input 
                title={"CVV"}
                name={"CVV"}
                type={"number"}
                className={"half-input"}
                defaultVal={this.props.fieldVals.CVV}
                action={(input) => this.captureInput(input)}
                // inputRef={(input) => this.fields.year_field = input}
            />     
          </div>

          <p className={"dead-link"}>Where is the CVV?</p>
          <br/>

          <div className={"driver-info"}>
            <p>{this.props.driverName.firstName + " " + this.props.driverName.lastName}</p>
            <p>{this.props.driverAddress}</p>
          </div>

            <Button 
              action={this.onProceed} 
              text={"Submit"}
              classCSS={"button"}
              isActive={this.props.fieldVals.active}
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
    driverName: state.contactInfo,
    driverAddress: state.carInfo.pageState.carLocation.address,
    fieldVals: state.review.pageState.review,
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
)(Review);
