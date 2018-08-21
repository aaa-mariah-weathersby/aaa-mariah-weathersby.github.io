import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './insuranceInfo.css';

import * as routeActions from '../routes/actions'
import constants from './constants'

import Button from '../common/button/button.secondary'

class InsurancePrior extends Component {

  componentDidMount = () => {

  }

  captureToggleYes = () => {
    const _this = this
    this.props.actions.updateRouteAction(constants.INSURANCE_PRIOR.NAME, _this)
  }

  captureToggleNo = () => {

  }

  render() {

    return (
      <div id={"InsurancePrior-Page"} className={"content-wrapper"}>
        
        <div className={"content-viewport"}>

          <h1>Have you had auto insurance in the last 12 months?</h1>
          
          <div className={"sub-content-wrapper"}>

            <Button 
              action={this.captureToggleYes} 
              text={"Yes, I have"}
              classCSS={"button secondary"}
              // componentId={"more-driver-proceed"} 
              secondary={true}
            />

            <Button 
              action={this.captureToggleNo} 
              text={"No, I have not"}
              classCSS={"button secondary flat"}
              // componentId={"more-driver-proceed"} 
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
  const actionsToBind = Object.assign({}, routeActions);
  return {
      actions: bindActionCreators(actionsToBind, dispatch)
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsurancePrior);
