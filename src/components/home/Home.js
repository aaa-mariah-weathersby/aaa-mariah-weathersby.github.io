import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './home.css';
import illustration from '../../images/homeIllustration/group3.png'

// import Button from '../common/button/button'
import Modal from '../common/modal/Modal'
import { Button } from 'ace-design-system'

import * as routeActions from '../routes/actions'
import * as progressActions from '../progressBar/actions'

import constants from './constants'

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: "carSelection",
      makeModel: "", 
      year: "",
      annualMileage: "",
      active: false 
    };

    this.styles = {
      position: 'fixed',
      bottom: '1.5%',
      margin: 'auto',
      height: '27.5%',
      left: '-40%',
      zIndex: '-5'
    }

  }

  componentDidMount = () => {
    this.props.actions.renderBack(false)

  }

  componentDidUpdate = () => {
  }

  onProceed = () => {
    const _this = this
    this.props.actions.updateRouteAction(constants.NAME, _this)

  }

  render() {
    return (
      <div id="Home" className={"content-wrapper"}>

      {
        (this.props.location.pathname.includes("/home/modal"))
          ? <Modal location={this.props.location}/> 
          : null
      }
        
        <div className={"primary"}>
          <h1>Auto Insurance <span>Just Got Easier</span></h1>
          <h3>Get a Quote today</h3>
          
          {/* <Button 
            action={this.onProceed} 
            text={"Get the Real Deal"}
            classCSS={"button init"}
            componentId={"home-proceed"} 
            isActive={true}
          /> */}

          <Button
            label={"Get the Real Deal"}
            onClick={this.onProceed}
            active={true}
          />

          <br/>
          <p className={"dead-link"}>Complete your purchase</p>
        
        </div>

        <img 
          src={illustration} 
          id={'home-illustration'}
          // style={this.styles}
          alt={'home-illustration'}
        />

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    base: state
  }
}

const mapDispatchToProps = (dispatch) => {
  const actionsToBind = Object.assign({}, routeActions, progressActions);
  return {
      actions: bindActionCreators(actionsToBind, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
