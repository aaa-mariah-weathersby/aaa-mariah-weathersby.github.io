import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './driverInfo.css';

import * as routeActions from '../routes/actions'
import * as actions from './actions'
import constants from './constants'

import Button from '../common/button/button.secondary'

class MoreDriverQuestion extends Component {

  constructor(props) {
    super(props);

    this.state = {
      driverList: "" 
    };

  }

  componentDidMount = () => {
    console.log("driver lists: ", this)
  }

  captureToggleYes = () => {
    const _this = this
    this.props.actions.updateRouteAction(constants.MORE_DRIVER_QUESTION.NAME, _this)
  }

  listDrivers = () => {
    return this.state.driverList;
  }

  render() {

    return (
      <div id={"ThankYou-Page"} className={"content-wrapper"}>
        
        <div className={"content-viewport"}>
          <h1>Would you like to add another driver?</h1>

          <div className={"sub-content-wrapper"}>

            <Button 
              action={this.captureToggleYes} 
              text={"Yes, add another driver"}
              classCSS={"button secondary"}
              // componentId={"more-driver-proceed"} 
              secondary={true}
            />

            <Button 
              action={() => {}} 
              text={"No, I'm the only driver"}
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
    contactInfo: state.contactInfo,
    driverList: state.driverList,
    fieldVals: state
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
)(MoreDriverQuestion);
