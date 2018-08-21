import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './driverInfo.css';

import * as routeActions from '../routes/actions'
import * as actions from './actions'
import constants from './constants'

import Button from '../common/button/button'

import icon from '../../images/memberIcon/membership.png'

class DriverConfirmation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      driverList: "" 
    };

  }

  componentDidUpdate = () => {
  }

  componentDidMount = () => {
    this.props.actions.renderBack(true)

  }

  onProceed = () => {
    const _this = this
    this.props.actions.updateRouteAction(constants.DRIVER_CONFIRMATION.NAME, _this)
  }

  render() {

    const listDrivers = 
      Object.values(this.props.driverList).map (
        driver => {
          return  (
            <li key={ driver.id }>
              <img 
                className={"member-icon"} 
                src={icon}
                alt={'user-icon'}
              /> 
              { driver.firstName + ' ' + driver.lastName }
            </li>
          )
        }
      )


    return (
      <div id={"Driver-Confirmation"} className={"content-wrapper"}>
        
        <div className={"content-viewport"}>
          <h1>Great!</h1>

            <div className={"sub-content-wrapper"}>

              {/* <h3>Here are the drivers you've added: </h3> */}
              <div className={"drivers-list-container"}>
                <h3>Drivers Added:</h3>
                <ul className={"drivers-list-ul"}>
                  { listDrivers }
                </ul>
              </div>

              <Button 
                action={this.onProceed} 
                text={"Continue"}
                classCSS={"button"}
                componentId={"home-proceed"} 
                isActive="true"
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
    driverList: state.driverList.drivers,
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
)(DriverConfirmation);
