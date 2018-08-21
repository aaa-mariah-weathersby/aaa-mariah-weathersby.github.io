import { connect } from 'react-redux'
import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import './footer.css';
import routes from '../routes/constants'

import Button from '../common/button/button'
import ButtonSecondary from '../common/button/button.secondary'

import * as routeActions from '../routes/actions'


class Footer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currVal: 0,
      animating: false
    };

    this.currVal = 0.00;
    this.currLocation = "";

    this.range = 
      <div className={"total-price"}>
        <div className={"footer-current-price"}>
          <h4>Total:</h4>
          <h4 className={"monthly-price"}>
            {`$000.00 - $000.00`}
          </h4>
        </div>
      </div>

    this.stacked = 
      <div className={"total-price"}>
        <div className={"footer-current-price"}>
          <h4>Total:</h4>
          <h4 className={"monthly-price"}>
            {`$00.00`}
          </h4>
        </div>
        <div className={"footer-savings"}>
          <h5>You saved {`$${this.state.currVal}.00`}</h5>
        </div>
      </div>


  }

  nextLocation = () => {

    var currStepVal = routes.STEPS[this.currLocation].val
    var nextStepVal = currStepVal+=1 
    var locationPath = ""

    Object.keys(routes.STEPS).map(
      key => {
        if ( routes.STEPS[key].val == nextStepVal ){
          console.log(routes.STEPS[key].path)
          locationPath = routes.STEPS[key].path
        }
      }
    )

    return locationPath

  }

  componentDidMount = () => {
    this.currLocation = this.props.location.pathname.replace('/', '');
    this.setState(
      { 
        currVal: parseFloat(this.props.selectedCoverage.price),
        animating: false
      }
    )

  }

  onProceed = () => {
    console.log("proceed Call: ", this.props.footerState.stage)
    this.priceChange(this.props.footerState.stage)

    var nextLocation = this.nextLocation(this.currLocation)
    this.props.history.push(nextLocation)

  }

  componentDidUpdate = (prevProps) => {
  }

  stopCountdown = () => {
    this.setState(
      {animating: false},
      () => clearInterval(this.countdown)
    )
  }

  priceChange = (currStage) => {
    console.log("priceChange: ", currStage)
    switch(currStage){
      case 'A':
        console.log("A: ")
        this.countdown(0, 37);
        break;

      case 'B':
        console.log("B: ")
        this.countdown(37, 55);
        break;

      case 'C':
        console.log("C: ")
        this.countdown(85, 90);        
        break;

    }
  }

  countdown = (oldVal, newVal) => {

    var _this = this
    console.log("start anim: ", oldVal, newVal )

    setInterval(
      function() {

        if(newVal > oldVal){
          console.log('larger')
          _this.setState(
            { currVal: oldVal+=1 }
          )
        }

        if (newVal == oldVal){
          _this.stopCountdown()
        }

      }, 100
    )

  }

  content = () => {
    // console.log('content call: ', this, this.props.location.pathname.replace('/', ''))
  }

  render(){
    this.currLocation = this.props.location.pathname.replace('/', '')

    return (

      this.props.isActive ?

      <footer id={"footer"} 
      >

        {
        this.props.footerState.range ?  
        <div className={"total-price"}>
          <div className={"footer-current-price"}>
            <h4>Total:</h4>
            <h4 className={"monthly-price"}>
              {`$000.00 - $000.00`}
            </h4>
          </div>
        </div>
        : 
        <div className={"total-price"}>
          <div className={"footer-current-price"}>
            <h4>Your Total Price:</h4>
            <h4 className={"monthly-price"}>
              {`$000.00`}
            </h4>
          </div>
          <div className={"footer-savings"}>
            {/* <h5>You saved {`$${this.props.footerState.savings}.00`}</h5> */}
            <h5>You saved {`$${this.state.currVal}.00`}</h5>
          </div>
        </div>
        }

        <div className={"footer-CTAs"}>               
            <span>
              
              {
                this.props.footerState.stacked  ?
                <Button
                  action={this.onProceed} 
                  text={"Continue"}
                  classCSS={"button secondary"}
                  ghost={ 
                    this.props.footerState.btnOut                     
                    ? true 
                    : false
                  }
                  componentId={"buy-now-footer"} 
                  isActive={true}          
                />
                : null
              }
              
              { 
                this.props.footerState.buy || this.props.footerState.stacked  ?
                <ButtonSecondary
                // action={this.onProceed} 
                text={"Buy Now"}
                classCSS={"button secondary"}
                componentId={"buy-now-footer"} 
                isActive={false}          
              />
              : null
              }
            </span>
        </div>


      </footer>

      : null


    );
  }
  
}

const mapStateToProps = state => {
  return {
    isActive: state.addOns.footer,
    selectedCoverage: state.coverage.pageState.selectCoverage.selectedCoverage,
    footerState: state.footer,
    all: state
  }
}

const mapDispatchToProps = (dispatch) => {
  const actionsToBind = Object.assign({}, routeActions);
  return {
      actions: bindActionCreators(actionsToBind, dispatch)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer));
{/* <h4 className={"monthly-price"}>{props.monthlyPrice}</h4> */}
