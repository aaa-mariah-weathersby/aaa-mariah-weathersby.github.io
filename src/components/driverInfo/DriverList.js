import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './driverInfo.css';

import * as routeActions from '../routes/actions'
import * as actions from './actions'
import * as footerActions from '../addOns/actions'
import constants from './constants'

import Button from '../common/button/button.secondary'

import icon from '../../images/memberIcon/membership.png'

class DriverList extends Component {

  constructor(props) {
    super(props);

    this.driversList = [];

  }

  componentDidMount = () => {
    this.props.actions.renderBack(true)
    this.props.actions.updateFooter(false)
  }

  captureToggleYes = () => {
  }

  captureToggleNo = () => {
    const _this = this
    this.props.actions.updateRouteAction(constants.DRIVER_LIST.NAME, _this)
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
      <div id={"Driver-List"} className={"content-wrapper"}>
          <div className={"content-viewport"}>

            <h1>Are there any more drivers you need to add?</h1>
            <div className={"sub-content-wrapper"}>

              <Button 
                // action={this.captureToggleYes} 
                text={"Yes, add another driver"}
                classCSS={"button secondary"}
                // componentId={"more-driver-proceed"} 
                secondary={true}
                active={false}
              />

              <Button 
                action={this.captureToggleNo} 
                text={"No, that's it"}
                classCSS={"button secondary flat"}
                // componentId={"more-driver-proceed"} 
                secondary={true}
                active={false}
              />              

              <br/>
              <div className={"drivers-list-container"}>
                <h3>Drivers Added:</h3>
                <ul className={"drivers-list-ul"}>
                  { listDrivers }
                </ul>
              </div>
              
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
  const actionsToBind = Object.assign({}, actions, routeActions, footerActions);
  return {
      actions: bindActionCreators(actionsToBind, dispatch)
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DriverList);
