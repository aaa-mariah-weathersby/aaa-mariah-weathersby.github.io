import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// import './insuranceInfo.css';

import * as routeActions from '../routes/actions'
import * as footerActions from '../addOns/actions'
import * as footerStateActions from '../pricingFooter/actions'
import constants from './constants'
import * as actions from './actions'

import Button from '../common/button/button'
import Birthday from '../common/inputField/inputField.birthday'


class StartDate extends Component {

  constructor(props) {
    super(props);

    this.date = new Date();

    this.state = {
      page: "startDate",
      date: {
        month: this.date.getMonth().toString(),
        day: parseInt(this.date.getDate() + 1).toString(),
        year: this.date.getFullYear().toString()
      },
      active: false 
    };

  }

  componentDidMount = () => {

    const footerState = {
      range: false,
      stacked: false,
      buy: true
    }

    this.props.actions.updateFooterState(footerState)

    this.props.actions.renderBack(true)
    this.props.actions.updateFooter(true)

  }
  
  componentDidUpdate = () => {
    console.log("Startdate: ", this)
  }

  captureDate = (fields) => {
    console.log("capture: ", fields)
    this.setState(
      { date: { ...fields.state } },
      () => this.activate()
    )

  }

  captureInput = (inputField) => {
    var stateKey = inputField.target.name
    var stateVal = inputField.target.value

    this.setState(
      { [stateKey]: stateVal },
      () => this.activate()
    );
  }

  onProceed = () => {
    const _this = this
    this.props.actions.persistPageState(this.state)
    this.props.actions.updateRouteAction(constants.NAME, _this)

  }

  activate = () => {
    const state = this.state

    if (
      state.date !== "mm/dd/yyy" || this.start_date.value !== ""
    ) {
      this.setState(
        { active: true },
        () => this.props.actions.persistPageState(state)
      );
    }
  }

  render() {

    return (
        <div id={"InsurancePriorCompany-Page"} className={"content-wrapper"}>
          <div className={"content-viewport"}>
  
            <h1>When do you want your insurance to start?</h1>
  
            <div className={"sub-content-wrapper"}
              style={ this.props.activeFooter ? { paddingBottom: '7.5em '} : null }
            > 

              {/* <Helper
                content={"Just a heads up that the start date may affect the overall pricing."}
                active={true}
              />
              <br /> */}

              <Birthday
                callback={this.captureDate}
                title={"Insurance Start Date"}
                def_Month={
                  this.props.fieldVals.date.month ? 
                    this.props.fieldVals.date.month : this.state.date.month
                }
                def_Day={
                  this.props.fieldVals.date.day ? 
                    this.props.fieldVals.date.day : this.state.date.day
                }
                def_Year={
                  this.props.fieldVals.date.year ? 
                    this.props.fieldVals.date.year : this.state.date.year
                }
              />
  
              <Button 
                action={this.onProceed} 
                text={"Continue"}
                classCSS={"button"}
                // isActive={this.props.fieldVals.active}
                isActive={true}
                componentId={"home-proceed"} 

                helper={true}
                helperActive={true}
                helperContClasses={"button-helper"}
                helperCopy={"Just a heads up that the start date may affect the overall pricing."}
  
              />
  
            </div>
  
          </div>
        </div>
      );  
      
  }
}

const mapStateToProps = state => {
  return {
    activeFooter: state.addOns.footer,
    fieldVals: state.startDate.pageState.startDate,
    all: state
  }
}

const mapDispatchToProps = (dispatch) => {
  const actionsToBind = Object.assign({}, actions, routeActions, footerActions, footerStateActions);
  return {
      actions: bindActionCreators(actionsToBind, dispatch)
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartDate);
