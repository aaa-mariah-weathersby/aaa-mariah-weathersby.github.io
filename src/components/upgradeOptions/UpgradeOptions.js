import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './upgradeOptions.css';

import * as routeActions from '../routes/actions'
import constants from './constants'
import * as actions from './actions'
import * as footerActions from '../addOns/actions'
import * as footerStateActions from '../pricingFooter/actions'

import Input from '../common/inputField/inputField'
import Button from '../common/button/button'
import AddOns from '../common/addOnOption/addOnOption'
import UgradeOpt from '../common/upgradeOptionsC/upgradeOptionsC'
import RadioUpgrade from '../common/inputField/inputRadio'
import Helper from '../common/helper/helper'

class InsurancePriorCompany extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: "upgradeOptions",
      option: 
        this.props.fieldVals.option ? this.props.fieldVals.option : "",
      active: false 
    };

  }

  componentDidMount = () => {

    const footerState = {
      range: false,
      stacked: true,
      buy: true,
      stage: 'B'
    }

    this.props.actions.updateFooterState(footerState)
    this.props.actions.updateFooterSavings(75)

    this.props.actions.renderBack(true)
    this.props.actions.updateFooter(true)
    console.log('upgradeEval: ', this)
  }

  captureInput = (e) => {
    this.setState(
      { option: e.target.value },
      () => this.activate()

    )

  }

  evalDefault = (paymentType) => {
    if (this.props.fieldVals.option == paymentType){      
      console.log("evalDefault: ", paymentType)
      return 'checekd'

    }

  }

  activate = () => {
    const state = this.state

    if (
      state.option !== ""
    ) {
      this.setState(
        { active: true },
        () => { 
          this.props.actions.persistPageState(state)
          console.log("update: ", this)
        }
      );
    }
  }

  render() {

    return (
      <div id={"UpgradeOpts-Page"} className={"content-wrapper"}>
        <div className={"content-viewport"}>

          <h1>Would you like to upgrade your AAA membership?</h1>
          <div className={"sub-content-wrapper"}
            style={ this.props.activeFooter ? { paddingBottom: '7.5em '} : null }
          >

          <form>

            <label 
              className={
                this.state.option == 'Classic' ? 'add-on active' : 'add-on'
              }
            >
              <div className={'radio-set'}>
                <input
                  type={'radio'}
                  name={'membership'}
                  value={'Classic'}
                  onChange={ (e) => { this.captureInput(e) }}
                  checked={this.evalDefault('Classic')}
                />
                <div className={"check"}></div>
              </div>

              <div className={"opt-info"}>
                <h3>Classic</h3>
                <h2>$25 <span>$58</span> </h2>

                <p>Towing service up to 100 miles</p>
                <p className={"dead-link"}>Learn More</p>
                <p className={"discounts"}>$00.00 per year - policy discount applied</p>
              </div>

            </label>

            <label 
              className={
                this.state.option == 'Plus' ? 'add-on active' : 'add-on'
              }
            >
              <div className={'radio-set'}>
                <input
                  type={'radio'}
                  name={'membership'}
                  value={'Plus'}
                  onChange={ (e) => { this.captureInput(e) }}
                  checked={this.evalDefault('Plus')}
                />
                <div className={"check"}></div>
              </div>

              <div className={"opt-info"}>
                <h3>Plus</h3>
                <h2>$93</h2>

                <p>Towing service up to 100 miles</p>
                <p className={"dead-link"}>Learn More</p>
                <p className={"discounts"}>$00.00 per year - policy discount applied</p>
              </div>

            </label>
            
            <label 
              className={
                this.state.option == 'Premier' ? 'add-on active' : 'add-on'
              }
            >              <div className={'radio-set'}>
                <input
                  type={'radio'}
                  name={'membership'}
                  value={'Premier'}
                  onChange={ (e) => { this.captureInput(e) }}
                  checked={this.evalDefault('Premier')}
                />
                <div className={"check"}></div>
              </div>

              <div className={"opt-info"}>
                <h3>Premier</h3>
                <h2>$125</h2>

                <p>Towing service up to one 200 mile tow and three 100 mile tows</p>
                <p className={"dead-link"}>Learn More</p>
                <p className={"discounts"}>$00.00 per year - policy discount applied</p>
              </div>

            </label>          

          </form>

          </div>

        </div>
      </div>
    );  
  }
}

const mapStateToProps = state => {
  return {
    fieldVals: state.upgradeOpts.pageState.upgradeOptions,
    activeFooter: state.addOns.footer
  }
}

const mapDispatchToProps = (dispatch) => {
  const actionsToBind = Object.assign({}, routeActions, actions, footerActions, footerStateActions);
  return {
      actions: bindActionCreators(actionsToBind, dispatch)
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsurancePriorCompany);
