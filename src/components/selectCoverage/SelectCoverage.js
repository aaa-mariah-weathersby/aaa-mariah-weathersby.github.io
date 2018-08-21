import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './selectCoverage.css';

import * as routeActions from '../routes/actions'
import * as footerActions from '../addOns/actions'
import * as footerStateActions from '../pricingFooter/actions'
import * as actions from './actions'
import constants from './constants'

import Opt from '../common/coverageOption/coverageOption.button'

// import CoverageOption from '../common/coverageOption/coverageOption'

class SelectCoverage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: "selectCoverage",
      selectedCoverage: {
        selectedOption: "",
        selectedOptionDetails: "",
        title: ""
      },
    }
  }



  componentDidMount = () => {
    
    const footerState = {
      range: true,
      stacked: false,
      buy: false
    }

    this.props.actions.updateFooterState(footerState)

    this.props.actions.renderBack(true)
    this.props.actions.updateFooter(true)

    console.log('select coverage: ', this)


  }

  toggleDetails = () => {
    this.setState({ toggle: !this.state.toggle })
  }

  alerted = () => {
  }

  onProceed = () => {
    const _this = this
    this.props.actions.persistPageState(this.state)
    this.props.actions.updateRouteAction(constants.SELECT_COVERAGE.NAME, _this)

  }

  storeCoverageOpt = (selectedObj, selectPayments) => {

    if ( selectPayments === 'm' ){
      selectedObj.payments = 'monthly';
    } else {
      selectedObj.payments = 'yearly';
    }

    this.setState(
      { selectedCoverage: selectedObj },
      () => {
        this.onProceed()
        console.log("selectedOpt: ", this)
      }
    )

  }

  render() {

    const mostPop = {
      title: 'Most Popular',
    }

    const minO = {
      title: "Minimum"
    }

    const byo = {
      title: "Build Your Own"
    }

    return (
      <div id={"SelectCoverage-Page"} className={"content-wrapper"}>
        
        <div className={"content-viewport"}>

        <h1>Select a coverage option that works best for you</h1>
        <div className={"sub-content-wrapper"}
            style={ this.props.activeFooter ? { paddingBottom: '7.5em '} : null }
        >

          <Opt
            header={"Most Popular"}

            buttonTitle={"Start today for $000.00"}
            subText={"11 monthly payments"}
            action={() => this.storeCoverageOpt(mostPop, 'm')}

            buttonTitle_beta={"Pay in full for $000.00"}
            subText_beta={"1 annual payment"}
            action_beta={() => this.storeCoverageOpt(mostPop, 'y')}

            buttonID={"most-popular"}

            isActive={true}
          />

          <Opt
            header={"Minimum"}

            buttonTitle={"Start today for $000.00"}
            subText={"11 monthly payments"}
            action={() => this.storeCoverageOpt(minO, 'm')}

            buttonTitle_beta={"Pay in full for $000.00"}
            subText_beta={"1 annual payment"}
            action_beta={() => this.storeCoverageOpt(minO, 'y')}

            buttonID={"most-popular"}

            isActive={true}
          />

          <Opt
            header={"Build Your Own"}

            buttonTitle={"Start today for $000.00"}
            subText={"11 monthly payments"}
            action={() => this.storeCoverageOpt(byo, 'm')}

            buttonTitle_beta={"Pay in full for $000.00"}
            subText_beta={"1 annual payment"}
            action_beta={() => this.storeCoverageOpt(byo, 'y')}

            buttonID={"most-popular"}

            isActive={true}
          />

          <br/>
          
          <span className={"coverage-disclaimer"}>
            <p>All eligible discounts applied using Auto Pay</p>
            <br/>
            <p>We offer convenient monthly payment and auto pay options. Payment methods include credit or debit card. We accept Visa, Mastercard, American Express & Discover.</p>
          </span>

        </div>

        </div>

      </div>
    );  
  }

}

const mapStateToProps = state => {
  return {
    activeFooter: state.addOns.footer,
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
)(SelectCoverage);
