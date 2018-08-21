import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './insuranceInfo.css';

import * as routeActions from '../routes/actions'
import * as footerActions from '../addOns/actions'
import constants from './constants'
import * as footerStateActions from '../pricingFooter/actions'

import Button from '../common/button/button.secondary'

class InsuranceSpecialist extends Component {

  componentDidMount = () => {
    this.props.actions.renderBack(true)
    this.props.actions.updateFooter(true)

    const footerState = {
      range: false,
      stacked: true,
      buy: true,
      btnOut: true
    }

    this.props.actions.updateFooterState(footerState)    

  }

  onProceed = () => {
    const _this = this
    this.props.actions.updateRouteAction(constants.NAME, _this)
  }


  render() {

    return (
      <div id={"InsuranceSpecialist-Page"} className={"content-wrapper"}>
        
        <div className={"content-viewport"}>

        <h1>Would you like a AAA insurance specialist to contact you after your purchase?</h1>

        <div className={"sub-content-wrapper"}>

          <Button 
            action={this.onProceed} 
            text={"Yes, call me to review my policy"}
            classCSS={"button secondary"}
            // componentId={"more-driver-dead"} 
            secondary={true}
          />

          <Button 
            action={this.onProceed} 
            text={"No, thanks"}
            classCSS={"button secondary"}
            // componentId={"more-driver-dead"} 
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
)(InsuranceSpecialist);
