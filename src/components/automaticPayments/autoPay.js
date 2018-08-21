import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'


import './autoPay.css';

import * as routeActions from '../routes/actions'
// import * as actions from './actions'
import constants from './constants'
import * as footerActions from '../addOns/actions'
import routes from '../routes/constants'

import Button from '../common/button/button'


class AutoPay extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: "autoPay",
      checked: false,
      initModal: false,
    };

    this.currLocation = "";


  }

  

  componentDidMount = () => {
    this.props.actions.renderBack(true)
    this.props.actions.updateFooter(false)
    this.currLocation = this.props.location.pathname.replace('/', '');

  }

  exitModal = () => {
    this.props.actions.updateRouteAction(constants.NAME, this)
    this.setState({
      initModal: false
    }) 
  }

  nextLocation = () => {

    var currStepVal = routes.STEPS[this.currLocation].val
    var nextStepVal = currStepVal+=1 
    var locationPath = ""

    Object.keys(routes.STEPS).map(
      key => {
        if ( routes.STEPS[key].val === nextStepVal ){
          console.log(routes.STEPS[key].path)
          locationPath = routes.STEPS[key].path
        }
      }
    )

    return locationPath

  }

  proceedModal = () => {
    var nextLocation = this.nextLocation(this.currLocation)
    this.props.history.push(nextLocation)

  }

  render() {

    return (
      <div id={"AutoPay-Page"} className={"content-wrapper"}>

        {/* {
          (this.state.initModal)
          ? <Modal 
              location={this.props.location}
              exitModal={this.exitModal}
              view={this.state.modalView}
            /> 
          : null
        } */}

        <div className={"content-viewport"}>
          <h1>Would you like to make automatic payments?</h1>

          <div className={"sub-content-wrapper thank-you-content"}> 

            <form className={"check-form"}>
              <label>
                <input
                  type="checkbox"
                  name="autopay"
                  value="autopay"
                  // checked
                />
                <div className={'check'}></div>
                <span>Yes, enroll me in auto pay!</span>
              </label>
            </form>
            <br/>

            <div className={"autpay-content"}>
              <p>Auto Pay is <b>required</b> for monthly payment plans.</p>     
              <p>Auto Pay saves you <span className={"dead-link"}>$00.00</span></p>
              <p>If you do not want to enroll in auto pay, <span className={"dead-link"}>modify your payment plan selection</span></p>
            </div>

            {/* <Check 
              label={"Yes, sign me up for auto pay"}
            />

            <p>Lorem Ipsum dolor ... </p>
            <p className="dead-link">Learn more</p>

            <p>$000.00 monthly = $000.00 every 6 months</p>
            <p>Save an additional $00.00 </p> */}

            <div className={"pay-agreement"}>
              <h5>Auto Pay Agreement</h5>
              <p>By enrolling in Auto Pay, you agree to allow AAA to automatically debit future insurance payments from your account. You also agree to allow your financial institution to debit your account for these payments, and you understand changes to your policy or premium may change the amount debited. You can discontinue automatic insurance payments at any time by logging in online at AAA.com or by calling us at (800) 000-0000. To enroll, simply select the “Enroll” button to show that you agree to have your insurance payments automatically deducted from your account.</p>
            </div>

            <Button 
              action={this.proceedModal} 
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
  }
}

const mapDispatchToProps = (dispatch) => {
  const actionsToBind = Object.assign({}, routeActions, footerActions);
  return {
      actions: bindActionCreators(actionsToBind, dispatch)
  };
};


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AutoPay));
