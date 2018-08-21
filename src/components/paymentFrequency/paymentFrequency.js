import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './paymentFrequency.css';

import * as routeActions from '../routes/actions'
// import * as actions from './actions'
import * as footerStateActions from '../pricingFooter/actions'
import constants from './constants'
import * as footerActions from '../addOns/actions'

import Button from '../common/button/button'

class PaymentFrequency extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: "paymentFrequency",
      freqSelection: "",
      defaultEval: false,
    };

    this.paymentOptions = {
      
    }

  }

  onProceed = () => {
    const _this = this
    this.props.actions.persistPageState(this.state)
    this.props.actions.updateRouteAction(constants.NAME, _this)

  }

  payments = (paymentOpt) => {

    switch(paymentOpt){
      
      case 'monthly':
        return (
          <div className={"payment-content-section"}>

            <div className={"payment-header"}>
              12 Monthly Payments
              <p>Auto Pay is required</p>
            </div>

            <div className={"payment-content"}>
              <p>Auto insurance first payment</p>
              <p className={"additive"}>$000.00</p>
            </div>

            <div className={"payment-content"}>
              <p>
                Classic membership first payment
                <sub>Membership discount applied</sub>
              </p>
              <p className={"additive"}>$000.00</p>
            </div>

            <div className={"payment-content"}>
              <p><b>Payment Due Today</b></p>
              <p className={"additive"}>$000.00</p>
            </div>  

            <div className={"payment-content"}>
              <p>+11 remaining payments <br/> Show installments</p>
              <p className={"additive"}>$000.00</p>
            </div>          
            <hr/>

            <div className={"payment-content"}>
              <p>
                <b>12 Month Premium</b>
                <sub>All eligible discound applied including Auto Pay</sub>
              </p>
              <p className={"additive"}><b>$000.00</b></p>
            </div>                        
            <hr/>

            <div className={"payment-content"}>
              <p>Eligible discounts applied <br/> Show discounts</p>
              <p className={"additive"}>$-000.00</p>
            </div>

        </div>)
        

        case 'yearly':
        return (
          <div className={"payment-content-section"}>

            <div className={"payment-header"}>
              Pay in Full
              <p>Auto Pay is optional</p>
            </div>

            <div className={"payment-content"}>
              <p>Auto insurance first payment</p>
              <p className={"additive"}>$000.00</p>
            </div>

            <div className={"payment-content"}>
              <p>
                Classic membership first payment
                <sub>Membership discount applied</sub>
              </p>
              <p className={"additive"}>$000.00</p>
            </div>

            <div className={"payment-content"}>
              <p><b>Payment Due Today</b></p>
              <p className={"additive"}>$000.00</p>
            </div>  
            
            <div className={"payment-content"}>
              <p>+11 remaining payments <br/> Show installments</p>
              <p className={"additive"}>$000.00</p>
            </div>          
            <hr/>

            <div className={"payment-content"}>
              <p>
                <b>12 Month Premium</b>
                <sub>All eligible discound applied including Auto Pay</sub>
              </p>
              <p className={"additive"}><b>$000.00</b></p>
            </div>                        
            <hr/>

            <div className={"payment-content"}>
              <p>Eligible discounts applied <br/> Show discounts</p>
              <p className={"additive"}>-$000.00</p>
            </div> 

          </div>
        )


    }

  }

  componentDidMount = () => {

    const footerState = {
      range: true,
      stacked: false,
      buy: false
    }

    this.props.actions.updateFooterState(footerState)

    this.props.actions.renderBack(true)
    this.props.actions.updateFooter(true)

  }

  componentDidUpdate = () => {
    console.log("paymentFrequency: ", this)
  }

  evalDefault = (paymentType) => {

    if (!this.state.defaultEval 
        && this.props.fieldVals.freqSelection == paymentType ){
      
      console.log("evalDefault Int: ", paymentType)

      this.setState(
        { defaultEval: true },
        // () => { return 'checked' }
      )

      return 'checekd'

    }

  }

  captureInput = (e) => {
    this.setState(
      { freqSelection: e.target.value },
      () => {
        this.props.actions.persistPageState(this.state)
        console.log("updated state: ", this)
      }
    )

  }

  render() {

    return (
      <div id={"PaymentFrequency-Page"} className={"content-wrapper"}>

        <div className={"content-viewport"}>
          <h1>How frequently would you like to pay?</h1>

          <div className={"sub-content-wrapper thank-you-content"}
              style={ this.props.activeFooter ? { paddingBottom: '7.5em '} : null }
          >        

            <form>

              <label 
                className={
                  this.state.freqSelection == 'monthly' ? 'active' : 
                    this.props.fieldVals.freqSelection == 'monthly' ? 'active' : null
                }
              > 
                <div className={'radio-set'}>
                  <input
                    type={'radio'}
                    name={'payment-freq'}
                    value={'monthly'}
                    onChange={ (e) => { this.captureInput(e) }}

                    // checked={
                    //   this.props.fieldVals.freqSelection == 'monthly' ? 'checked' : 
                    //     this.state.freqSelection == "monthly" ? 'checked' : "" 
                    // }
                    checked={this.evalDefault('monthly')}

                  />   
                  <div className='check'></div>
                </div>             
                {this.payments('monthly')}

              </label>

              <label 
                className={
                  this.state.freqSelection == 'yearly' ? 'active' : 
                    this.props.fieldVals.freqSelection == 'yearly' ? 'active' : null                }
              > 
                <div className={'radio-set'}>
                  <input
                    type={'radio'}
                    name={'payment-freq'}
                    value={'yearly'}
                    onChange={ (e) => { this.captureInput(e) }}
                    // checked={
                    //   this.props.fieldVals.freqSelection == 'yearly' ? 'checked' : "" 
                    // }
                    checked={this.evalDefault('yearly')}
                  />
                  <div className={"check"}></div>
                </div>
                {this.payments('yearly')}

                </label>

            </form>

            <Button 
              action={this.onProceed} 
              text={"Continue"}
              classCSS={"button"}
              isActive={true}
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
    all: state,
    activeFooter: state.addOns.footer,
    fieldVals: state.paymentFrequency.pageState.paymentFrequency
  }
}

const mapDispatchToProps = (dispatch) => {
  const actionsToBind = Object.assign({}, routeActions, footerActions, footerStateActions);
  return {
      actions: bindActionCreators(actionsToBind, dispatch)
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentFrequency);
