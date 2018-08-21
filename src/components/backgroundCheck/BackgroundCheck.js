import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './backgroundCheck.css';

import * as routeActions from '../routes/actions'
// import * as actions from './actions'
import constants from './constants'

import Helper from '../common/helper/helper'

class BackgroundCheck extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loadingCopy: "Insurance History ..."
    }
  }

  componentDidMount = () => {
    this.props.actions.renderBack(true)
    this.onProceed()
    this.copyChange()
  }

  onProceed = () => {
    setTimeout(this.continue, 5300);
  }

  copyChange = () => {
    var _this = this;

    setInterval(
      function(){ 
        _this.setState(
          { loadingCopy: "Driving History ..."}
        ); 
      }, 3000);
  }

  continue = () => {
   
    clearTimeout(this.onProceed)
    clearInterval(this.copyChange)
    this.props.actions.updateRouteAction(constants.NAME, this)

  }

  render() {

    const custStyling = {
      alignItems: 'center',
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center'
    }

    return (
      <div 
        id={"BackgroundCheck-Page"} 
        className={"content-wrapper"}
      >
        <div className={"content-viewport"}
            style={custStyling}
        >

          <div className={"sub-content-wrapper"}>

            <Helper
                content={"Hang tight, we're running a quick check to make sure we provide you accurate pricing"}
                active={true}
                helperClasses={" flex-break"}
                helperContainerClasses={" full"}
            />
            <br />

            <div className={"background-loader-container"}>
                <div className={"background-check-loader"}>
                    <div className={"background-check-val"}></div>
                </div>
                <p>{this.state.loadingCopy}</p>
            </div>

          </div>


        </div>
      </div>

    );  
  }
}

const mapStateToProps = state => {
  return {
    carInfo: state.carInfo,
    fieldVals: state.carInfo.pageState.carLocation
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
)(BackgroundCheck);
