import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './additionalQuestions.css';

import * as routeActions from '../routes/actions'
// import * as actions from './actions'
import constants from './constants'

import Modal from  '../common/modal/Modal'
import Helper from '../common/helper/helper'
import Button from '../common/button/button.secondary'

class AdditionalQuestions extends Component {

  constructor(props) {
    super(props);

    this.state = {
      initModal: false,
      modalView: 1
    };

  }

  componentDidMount = () => {
    this.props.actions.renderBack(true)
  }

  toNextModal = () => {
    this.setState({
      modalView: 2
    })    
  }

  exitModal = () => {
    this.setState({
      initModal: false
    })  
    this.props.actions.updateRouteAction(constants.ADDITIONAL_QUESTIONS.NAME, this)

  }


  onProceed = () => {
    this.setState({
      initModal: true
    })
  }


  render() {

    return (
      <div id={"AdditionalQuestions-Page"} className={"content-wrapper"}>

        {
          (this.state.initModal)
          ? <Modal 
              location={this.props.location}
              changeView={this.toNextModal}
              exitModal={this.exitModal}
              view={this.state.modalView}
            /> 
          : null
        }

        <div className={"content-viewport"}>
          <h1>Are you up for answering just a few more quick questions?</h1>

          <div className={"sub-content-wrapper"}>

            <Button 
              action={this.onProceed} 
              text={"Yes, show me discount opportunities!"}
              classCSS={"button secondary"}
              // componentId={"more-driver-proceed"} 
              secondary={true}
            />

            <Button 
              action={() => {}} 
              text={"No, I just want to see my coverage options"}
              classCSS={"button secondary"}
              // componentId={"more-driver-dead"} 
              secondary={true}
            />
            <br/>
            <Helper
              content={"This will help us provide as many discounts and offer the most popular options to you "}
              active={true}
            />

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
)(AdditionalQuestions);
