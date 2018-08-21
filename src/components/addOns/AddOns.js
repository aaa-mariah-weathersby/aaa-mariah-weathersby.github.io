import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './addOns.css';

import * as routeActions from '../routes/actions'
import * as footerStateActions from '../pricingFooter/actions'
import constants from './constants'
import * as actions from './actions'

import AddOnOpts from '../common/addOnOption/addOnOption'


class AddOns extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: "addOns",
      options: {},
      activeHelper: false,
      helpers: {
        'homeIns': false,
        'rentIns': false,
        'AAA': false,
        'other': false
      },
      active: false 
    };

  }

  componentDidMount = () => {

    const footerState = {
      range: false,
      stacked: true,
      buy: true,
      stage: 'A'
    }

    this.props.actions.updateFooterState(footerState)
    this.props.actions.updateFooterSavings(50)

    this.props.actions.renderBack(true)
    this.props.actions.updateFooter(true)

    // console.log("AddOns: ", this)
  }

  captureInput = (inputField) => {
    var stateKey = inputField.target.name
    var stateVal = inputField.target.value

    this.setState({ [stateKey]: stateVal });
    this.activate()
  }

  onProceed = () => {
    const _this = this
    this.props.actions.updateRouteAction(constants.NAME, _this)

  }

  activateHelper = (helperID) => {



    var helperState = {...this.state.helpers}
    helperState[helperID] = true;

    if (!this.state.activeHelper){
      this.setState(
        { helpers: helperState },
        () => this.setState(
          { activeHelper: true },
          () => console.log("updated state: ", this)

        )
      )
    }


  }

  switchReturn = (switchEl) => {
    console.log('switchReturn: ', switchEl)
    
    let options = {...this.state.options};
    options[switchEl.props.value] = switchEl.state.checked

    this.setState(
      { options },
      () => {
        this.setState({ active: true });
        this.props.actions.persistPageState(this.state)
      }
    )

  }


  render() {

    const helperCopy = "You can always make changes later. We can also have a specialist call and review your policy with you"

    return (
      <div id={"AddOns-Page"} className={"content-wrapper"}>
        <div className={"content-viewport"}>

          <h1>Is there anything else you want to include?</h1>
          <div className={"sub-content-wrapper"}
            style={ this.props.activeFooter ? { paddingBottom: '7.5em '} : null }
          >

            <AddOnOpts               
              title={"Home Owners Insurance"}
              monthlyPrice={"$000.00 - $000.00"}
              additionalSavings={"00.00"}
              switchVal={"Home Owners Insurance"}
              clickBehavior={() => this.activateHelper('homeIns')}

              // isActiveSwitch={true}

              helper={true}
              helperContent={helperCopy}
              helperActive={this.state.helpers.homeIns}

            />

            <AddOnOpts 
              title={"Renters Insurance"}
              monthlyPrice={"$000.00 - $000.00"}
              additionalSavings={"00.00"}
              switchVal={"Renters Insurance"}

              onClick={() => this.activateHelper('homeIns')}
              clickBehavior={this.switchReturn}

              // isActiveSwitch={this.props.fieldVals["Renters Insurance"]}

              helper={true}
              helperContent={helperCopy}
              helperActive={this.props.fieldVals.active}

            />

            <AddOnOpts 
              title={"AAA onBoard"}
              monthlyPrice={"No Charge"}
              additionalSavings={"00.00"}
              switchVal={"AAA onBoard"}
              clickBehavior={this.switchReturn}
              // isActiveSwitch={this.props.fieldVals["AAA onBoard"]}

              helper={true}
              helperContent={helperCopy}
              helperActive={this.props.fieldVals.active}

            />

            <AddOnOpts 
              title={"Other"}
              monthlyPrice={"$000.00 - $000.00"}
              additionalSavings={"00.00"}
              switchVal={"Other"}
              clickBehavior={this.switchReturn}
              // isActiveSwitch={this.props.fieldVals["Other"]}

              helper={true}
              helperContent={helperCopy}
              helperActive={this.props.fieldVals.active}

            />

            {/* <Button 
              action={this.onProceed} 
              text={"Continue"}
              classCSS={"button"}
              componentId={"home-proceed"} 
              isActive={true}
              clickBehavior={this.switchReturn}
            /> */}

          </div>

        </div>
      </div>
    );  
  }
}

const mapStateToProps = state => {
  return {
    fieldVals: state.addOns.pageState.addOns.options,
    activeFooter: state.addOns.footer,
  }
}

const mapDispatchToProps = (dispatch) => {
  const actionsToBind = Object.assign({}, routeActions, actions, footerStateActions);
  return {
      actions: bindActionCreators(actionsToBind, dispatch)
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOns);
