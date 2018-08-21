import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './insuranceInfo.css';

import * as routeActions from '../routes/actions'
import constants from './constants'
import * as actions from './actions'

import Button from '../common/button/button'
import AutoSelect from '../common/autoselect/autoselect'

class InsurancePriorCompany extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: "insurancePriorCompany",
      insuranceCompanyName: "",
      active: false 
    };

  }

  captureFields = (fieldsComponent) => {

    console.log("capture fields: ", fieldsComponent)

    this.setState(
      { insuranceCompanyName: fieldsComponent.state.single },
      () => this.activate()
    )

  }

  onProceed = () => {
    const _this = this
    this.props.actions.updateRouteAction(constants.INSURANCE_PRIOR_COMPANY.NAME, _this)

  }

  activate = () => {
    const state = this.state

    if (
      state.insuranceCompanyName !== ""
    ) {
      this.setState({ active: true });
      this.props.actions.persistPageState(state)
    }
  }

  render() {

    return (
      <div id={"InsurancePriorCompany-Page"} className={"content-wrapper"}>
        <div className={"content-viewport"}>

          <h1>What was the name of the previous insurance company?</h1>

          <div className={"sub-content-wrapper"}>

            {/* <Input 
              title={"Insurance Company Name"}
              name={"insuranceCompanyName"}
              defaultVal={this.props.fieldVals.insuranceCompanyName}
              action={(input) => this.captureInput(input)}
              inputRef={(input) => this.insurance_company_field = input}
            /> */}

            <AutoSelect 
              options={[
                { label: 'AIG' },
                { label: 'Allstate Insurance' },
                { label: 'Auto Owners Group Insurance' },
                { label: 'Farmer\'s Insurance' },
                { label: 'Liberty Mutual Insurance' }                
              ]}
              title={"Insurance Company Name"}
              // defaultVal={this.props.fieldVals.address}
              callback={this.captureFields}
              // inputRef={(input) => this.address_field = input}
            />

            <Button 
              action={this.onProceed} 
              text={"Continue"}
              classCSS={"button"}
              // isActive={this.props.fieldVals.active}
              isActive={true}
              componentId={"home-proceed"} 
            />

          </div>

        </div>
      </div>
    );  
  }
}

const mapStateToProps = state => {
  return {
    fieldVals: state.insuranceInfo.pageState.insurancePriorCompany,
  }
}

const mapDispatchToProps = (dispatch) => {
  const actionsToBind = Object.assign({}, routeActions, actions);
  return {
      actions: bindActionCreators(actionsToBind, dispatch)
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsurancePriorCompany);
