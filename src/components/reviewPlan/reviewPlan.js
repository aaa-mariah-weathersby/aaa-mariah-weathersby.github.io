import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './reviewPlan.css';
import logo from '../../images/memberIcon/membership.png'

import * as routeActions from '../routes/actions'
// import * as actions from './actions'
import constants from './constants'
import * as footerActions from '../addOns/actions'

import Button from '../common/button/button'

class ReviewPlan extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: "reviewPlan",
    };

  }

  componentDidMount = () => {
    this.props.actions.renderBack(true)
    this.props.actions.updateFooter(false)

  }

  onProceed = () => {
    const _this = this
    this.props.actions.updateRouteAction(constants.NAME, _this)

  }

  payments = (paymentOpt) => {

    switch(paymentOpt){
      
      case 'monthly':
        return (
          <div className={"payment-content-section"}>

            <div className={"payment-header"}>
              12 Monthly Payments
            </div>

            <div className={"payment-content"}>
              <p>Auto insurance first payment</p>
              <p className={"additive"}>$000.00</p>
            </div>

            <div className={"payment-content"}>
              <p>
                Classic membership first payment
                <sub>Membership discount applied</sub>
              </p>
              <p className={"additive"}>$000.00</p>
            </div>

            <div className={"payment-content"}>
              <p><b>Payment Due Today</b></p>
              <p className={"additive"}>$000.00</p>
            </div>  

            <div className={"payment-content"}>
              <p>+11 remaining payments <br/> Show installments</p>
              <p className={"additive"}>$000.00</p>
            </div>          
            <hr/>

            <div className={"payment-content"}>
              <p>
                <b>12 Month Premium</b>
                <sub>All eligible discound applied including Auto Pay</sub>
              </p>
              <p className={"additive"}><b>$000.00</b></p>
            </div>                        
            <hr/>

            <div className={"payment-content"}>
              <p>Eligible discounts applied <br/> Show discounts</p>
              <p className={"additive"}>$-000.00</p>
            </div>

        </div>)
        

        case 'yearly':
        return (
          <div className={"payment-content-section"}>

            <div className={"payment-header"}>
              Pay in Full
            </div>

            <div className={"payment-content"}>
              <p>Auto insurance first payment</p>
              <p className={"additive"}>$000.00</p>
            </div>

            <div className={"payment-content"}>
              <p>
                Classic membership first payment
                <sub>Membership discount applied</sub>
              </p>
              <p className={"additive"}>$000.00</p>
            </div>

            <div className={"payment-content"}>
              <p><b>Payment Due Today</b></p>
              <p className={"additive"}>$000.00</p>
            </div>  
            
            <div className={"payment-content"}>
              <p>+11 remaining payments <br/> Show installments</p>
              <p className={"additive"}>$000.00</p>
            </div>          
            <hr/>

            <div className={"payment-content"}>
              <p>
                <b>12 Month Premium</b>
                <sub>All eligible discound applied including Auto Pay</sub>
              </p>
              <p className={"additive"}><b>$000.00</b></p>
            </div>                        
            <hr/>

            <div className={"payment-content"}>
              <p>Eligible discounts applied <br/> Show discounts</p>
              <p className={"additive"}>-$000.00</p>
            </div> 

          </div>
        )


    }

  }

  render() {

    var drivers =
      Object.keys(this.props.drivers).map( 
        key => {
          console.log(key)
          var currDriver = this.props.drivers[key]
          var el = 
          
          <div className={'review-driver'}>

            <div className={'edit-row'}>
              <img src={logo} />
              <h4 className={"driver-header label"}>
                {`${currDriver.firstName} ${currDriver.lastName}`}
              </h4>
              <p className={'edit'}>edit</p>
            </div>


            <section>
              <p className={"label"}>DL #:</p>
              <p className={"content"}>00000000000</p>
            </section>

            <section>
              <p className={"label"}>DOB:</p>
              <p className={"content"}>
                {`${currDriver.date.day}/${currDriver.date.month}/${currDriver.date.year}`}  
              </p>
            </section>

            {
              key == 'primary' ? 
              <section>
                <p className={"label"}>Address:</p>
                <p className={"content"}>{this.props.vehicle.location.address}</p>
              </section>
              :
              <section>
                <p className={"label"}>Relationship:</p>
                <p className={"content"}>{currDriver.relationship}</p>
              </section>
            }
            
          </div>          
          
          
          // <li>{`${key.firstName} ${key.lastName}`}</li>
          return el
        }
      )


    return (
      <div id={"ReviewPlan-Page"} className={"content-wrapper"}>

        <div className={"content-viewport"}>
          <h1>Let's review your plan</h1>

          <div className={"sub-content-wrapper thank-you-content"}>        

            <div className={"review-section"}>
              <h3>Coverage</h3>

              <section>
                <div className={'edit-row'}>
                  <p className={"label"}>Policy Start Date: <span>edit</span></p>
                </div>

                <p className={"content"}>{
                  `${this.props.coverageDate.month}/${this.props.coverageDate.day}/${this.props.coverageDate.year}`
                }</p>
              </section>

              <section>
                <div className={'edit-row'}>
                  <p className={"label"}>Standard Coverage: <span>edit</span></p>
                </div>

                <p className={"dead-link"}>Show coverage details</p>
              </section>              
              
            </div>

            <div className={"review-section"}>
              <h3>Vehicles</h3>

              <div className={'edit-row'}>
                <h4 className={"label"}>Standard Coverage: <span>edit</span></h4>
              </div>              

              <section>
                <p className={"label"}>Annual Mileage:</p>
                <p className={"content"}></p>
              </section>

              <section>
                <p className={"label"}>Odometer Reading:</p>
                <p className={"content"}>00000000000</p>
              </section>

              <section>
                <p className={"label"}>VIN:</p>
                <p className={"content"}>00000000000</p>
              </section>              

            </div>            

            <div className={"review-section"}>
              <h3>Drivers</h3>
              <h4>Included on this policy</h4>              

              {drivers}
              <br/>
              
            </div>

            <div className={"review-section"}>
              <h3>Payment Plan</h3>
              
              <section>
                
                <div className={'edit-row'}>
                  <p className={"label"}>Auto Pay: <span>edit</span></p>
                </div>

                <p className={"content"}>Yes</p>
              </section>

              <section>
                {this.payments(this.props.paymentFrequency)}
              </section>

            </div>            

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
    selectedCoverage: state.coverage.pageState.selectCoverage.selectedCoverage,
    vehicle: state.carInfo,
    drivers: state.driverList.drivers,
    coverageDate: state.startDate.pageState.startDate.date,
    paymentFrequency: state.paymentFrequency.pageState.paymentFrequency.freqSelection,
    all: state,
  }
}

const mapDispatchToProps = (dispatch) => {
  const actionsToBind = Object.assign({}, routeActions, footerActions);
  return {
      actions: bindActionCreators(actionsToBind, dispatch)
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewPlan);
