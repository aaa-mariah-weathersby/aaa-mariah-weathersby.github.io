import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './carInfo.css';

import * as routeActions from '../routes/actions'
import * as actions from './actions'
import constants from './constants'

import Button from '../common/button/button.secondary'

class CarList extends Component {

  componentDidMount = () => {
    this.props.actions.renderBack(true)
  }

  captureToggleYes = () => {
  }

  captureToggleNo = () => {
    const _this = this
    this.props.actions.updateRouteAction(constants.CAR_LIST.NAME, _this)
  }

  render() {

  
    const listCars = Object.values(this.props.carInfo.cars).map(c => {
      return <li key={ c.id }>{ c.year+ ' ' +c.makeModel }</li>;
    });

    return (
      <div id={"CarList-Page"} className={"content-wrapper"}>
        
        <div className={"content-viewport"}>
          <h1>Would you like to add another car?</h1>

          <div className={"sub-content-wrapper"}>

            {/* <Toggle
              label = {""}
              opt1 = {opt1}
              opt2 = {opt2}
              toggleAction_opt1 = {this.captureToggleYes}
              toggleAction_opt2 = {this.captureToggleNo}
            /> */}

            <Button 
              action={this.captureToggleYes} 
              text={"Yes, add another car"}
              classCSS={"button secondary"}
              // componentId={"more-driver-proceed"} 
            />

            <Button 
              action={this.captureToggleNo} 
              text={"No, that's all"}
              classCSS={"button secondary"}
              // componentId={"more-driver-proceed"} 
            />           

            {/* <h3>Vehicles added:</h3>
            <ul>{ listCars }</ul> */}

          </div>
        </div>

      </div>
    );  
  }
}

const mapStateToProps = state => {
  return {
    carInfo: state.carInfo,
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
)(CarList);
