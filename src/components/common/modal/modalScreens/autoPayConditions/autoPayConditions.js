import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './autoPayConditions.css';

import * as routeActions from '../../../../routes/actions'
import constants from '../../../../automaticPayments/constants'
import * as actions from '../actions'

import Button from '../../../button/button'


class AutoPayConditions extends Component {

  render() {

    return (
      <div id={"accident-modal"} >
        <h1> Do you agree to the terms and conditions for auto pay?</h1>
        <div className={"sub-content-wrapper"}>
            <p className={"disclaimer-copy"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <Button 
              action={this.props.navAction} 
              text={"I Agree"}
              classCSS={"button"}
              isActive={true}
              // componentId={"more-driver-proceed"} 
            />  

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
  const actionsToBind = Object.assign({}, actions, routeActions);
  return {
      actions: bindActionCreators(actionsToBind, dispatch)
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutoPayConditions);
