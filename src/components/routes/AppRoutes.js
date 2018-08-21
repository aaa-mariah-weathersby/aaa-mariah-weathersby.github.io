import React, { Component } from 'react';
import './appRoutes.css';
import './animations.css';

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import routes from './constants'

import Button from '../common/button/button'

import Home from '../home/Home'
import hConfig from '../home/constants'

import ContactInfo from '../contactInfo/ContactInfo'
import cConfig from '../contactInfo/constants'

import DriverInfo from '../driverInfo/DriverInfo'
import MoreDriverQuestion from '../driverInfo/MoreDriverQuestion'
import AdditionalDriver from '../driverInfo/AdditionalDriver'
import AdditionalDriverRelationship from '../driverInfo/AdditionalDriverRelationship'
import DriverList from '../driverInfo/DriverList'
import DriverConfirmation from '../driverInfo/DriverConfirmation'
import dConfig from '../driverInfo/constants'

import CarLocation from '../carInfo/CarLocation';
import CarLocationShared from '../carInfo/CarLocationShared'
import CarSelection from '../carInfo/CarSelection';
import CarList from '../carInfo/CarList';
import carConfig from '../carInfo/constants';

import InsurancePrior from '../insuranceInfo/InsurancePrior';
import InsurancePriorCompany from '../insuranceInfo/InsurancePriorCompany';
import insuranceConfig from '../insuranceInfo/constants';

import HelperMobile from '../common/helper/helperMobile'

import BackgroundCheck from '../backgroundCheck/BackgroundCheck'
import BackgroundCheckConfig from '../backgroundCheck/constants'

import AdditionalQuestionsConfig from '../additionalQuestions/constants'
import AdditionalQuestions from '../additionalQuestions/AdditionalQuestions'

import SelectCoverage from '../selectCoverage/SelectCoverage'
import SelectCoverageConfig from '../selectCoverage/constants'

import AddOns from '../../components/addOns/AddOns'
import AddOnsConfig from '../../components/addOns/constants'

import UpgradeOpts from '../upgradeOptions/UpgradeOptions'
import UpgradeOptsConfig from '../upgradeOptions/constants'

import InsuranceSpecialist from  '../insuranceSpecialist/InsuranceSpecialist'
import InsuranceSpecialistConfig from '../insuranceSpecialist/constants'

import StartDate from '../startDate/StartDate'
import StartDateConfig from '../startDate/constants'

import ReviewPlan from '../reviewPlan/reviewPlan'
import ReviewPlanConfig from '../reviewPlan/constants'

import PaymentFreq from '../paymentFrequency/paymentFrequency'
import PaymentFreqConfig from '../paymentFrequency/constants'

import AutoPay from '../automaticPayments/autoPay'
import AutoPayConfig from '../automaticPayments/constants'

import PaymentOpts from '../paymentOptions/paymentOptions'
import PaymentOptsConfig from '../paymentOptions/constants'

import Recap from '../recap/review'
import RecapConfig from '../recap/constants'

import ThankYou from '../thankYou/ThankYou'
import ThankYouConfig from '../thankYou/constants'

import Footer from '../pricingFooter/footer'

import constants from './constants'
import * as actions from './actions'

import backIcon from '../../images/Back-Arrow.png'

class AppRoutes extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            initMobileHelper: false,
            width: 0,
            renderBack: false
        };
        this.mobileHelperProps = {
            content: "",
            active: true,
            helperClasses: "mobile"
        };
        this.prevProps = {}
        this.currLocation = ''

    }

    componentDidMount = () => {
        // this.currLocation = this.props.location.pathname.replace('/', '');
        console.log("approute: ", this)
    }

    componentDidUpdate = (prevProps) => {
        this.prevProps = prevProps        
        window.scrollTo(0,1)
    }

    updateLocation = (prevProps) => {  

        if(this.props.currentRoute !== prevProps.currentRoute){
            return true
        }
        return false
    }

    updateMobileHelper = (currentRoute) => {

        var trigger = this.updateLocation(this.prevProps);

        if(this.prevProps.currentRoute && this.state.width < 600){
            var is_mobileHelper = constants.STEPS[this.props.currentRoute]

            if(is_mobileHelper.hasOwnProperty("mobileHelper") && trigger){

                this.mobileHelperProps.content = is_mobileHelper.mobileHelper
                var helperComponent = <HelperMobile {...this.mobileHelperProps}/>

                return helperComponent

            } else {
                return null
            }
        } else {
            return null
        }

    }

    nextLocation = () => {
        
        this.currLocation = this.props.location.pathname.replace('/', '');
        var currStepVal = routes.STEPS[this.currLocation].val
        var nextStepVal = currStepVal - 1 
        var locationPath = ""
    
        console.log("lycehe: ", this, currStepVal, nextStepVal )


        Object.keys(routes.STEPS).map(
          key => {
            if ( routes.STEPS[key].val == nextStepVal ){
              console.log(key, routes.STEPS[key].path)
              locationPath = routes.STEPS[key].path
            }
          }
        )

        return locationPath
    
    }

    onBack = () => {
        var nextLocation = this.nextLocation(this.currLocation)
        console.log("onBack: ", nextLocation, this )
        this.props.history.push(nextLocation)
    
      }

    // onBack = () => {
        
    //     // this.props.actions.updateRouteActionBack(this.props.currentRoute)
    // }

    render() {

        // var previousRoutePath = this.nextLocation(this.currLocation);
        var previousRoutePath = "/home";
        var mobileHelper = this.updateMobileHelper(this.props.currentRoute)


    return (
        <div className={"route-wrapper"}>

        
        {
            (this.props.showBack) 
            ?
            // <Link
            //     className={"back-container"}
            //     to={previousRoutePath}
            //     onClick={this.nextLocation}
            // >
            //     <div id={"back-container"}>
            //         <img className={"back-icon"} src={backIcon}/> 
            //         <span className={"back-copy"}>Back</span> 
            //     </div>
            // </Link>

            <div
                className={"back-container"}
                onClick={this.onBack}
            >
                <div id={"back-container"}>
                    <img className={"back-icon"} src={backIcon}/> 
                    <span className={"back-copy"}>Back</span> 
                </div>            
            </div>

            : null

        }

            {mobileHelper}

            <div 
                id={"AppRoutes"}
                className={
                    this.props.spacer 
                    ? 'spacer' : ""
                }
            >

                <TransitionGroup>
                    <CSSTransition 
                        key={this.props.location.key} 
                        classNames="fade" 
                        timeout={500}
                        unmountOnExit
                    >
                    <Switch location={this.props.location} onUpdate={this.initBack}>

                        <Route exact path={'/'} component={Home} />
                        <Route path={hConfig.PATH} component={Home}/>
                        <Route path={'footer'} component={Footer}/>

                        <Route exact path={cConfig.PATH} component={ContactInfo} />

                        <Route exact path={dConfig.DRIVER_INFO.PATH} component={DriverInfo} />
                        <Route exact path={dConfig.MORE_DRIVER_QUESTION.PATH} component={MoreDriverQuestion} />
                        <Route exact path={dConfig.ADDITIONAL_DRIVER.PATH} component={AdditionalDriver} />
                        <Route exact path={dConfig.ADDITIONAL_DRIVER_RELATIONSHIP.PATH} component={AdditionalDriverRelationship} />
                        <Route exact path={dConfig.DRIVER_LIST.PATH} component={DriverList} />
                        <Route exact path={dConfig.DRIVER_CONFIRMATION.PATH} component={DriverConfirmation} />

                        <Route exact path={carConfig.CAR_LOCATION.PATH} component={CarLocation} />
                        <Route exact path={carConfig.CAR_LOCATION_SHARED.PATH} component={CarLocationShared} />
                        <Route exact path={carConfig.CAR_SELECTION.PATH} component={CarSelection} />
                        <Route exact path={carConfig.CAR_LIST.PATH} component={CarList} />

                        {/* Help Me Modal Here */}

                        <Route exact path={insuranceConfig.INSURANCE_PRIOR.PATH} component={InsurancePrior} />
                        <Route exact path={insuranceConfig.INSURANCE_PRIOR_COMPANY.PATH} component={InsurancePriorCompany} />

                        <Route exact path={BackgroundCheckConfig.PATH} component={BackgroundCheck} />

                        <Route path={AdditionalQuestionsConfig.ADDITIONAL_QUESTIONS.PATH} component={AdditionalQuestions} />

                        <Route path={SelectCoverageConfig.SELECT_COVERAGE.PATH} component={SelectCoverage} />
                        <Route path={AddOnsConfig.PATH} component={AddOns} />
                        <Route path={UpgradeOptsConfig.PATH} component={UpgradeOpts} />
                        <Route path={InsuranceSpecialistConfig.PATH} component={InsuranceSpecialist} />
                        <Route path={StartDateConfig.PATH} component={StartDate} />

                        <Route path={ReviewPlanConfig.PATH} component={ReviewPlan} />
                        <Route path={PaymentFreqConfig.PATH} component={PaymentFreq} />
                        <Route path={AutoPayConfig.PATH} component={AutoPay} />
                        
                        <Route path={PaymentOptsConfig.PATH} component={PaymentOpts} />
                        <Route path={RecapConfig.PATH} component={Recap} />
                        
                        <Route path={ThankYouConfig.PATH} component={ThankYou} />
                        


                    </Switch>
                    </CSSTransition>
                </TransitionGroup>

            </div>
        </div>
    );
    }

    }

    const mapStateToProps = state => {
        return {
            currentRoute: state.route.currentRoute,
            routes: state.route,
            showBack: state.route.renderBack,
            spacer: state.addOns.footer
        }
      }
      
    const mapDispatchToProps = (dispatch) => {
        const actionsToBind = Object.assign({}, actions);
        return {
            actions: bindActionCreators(actionsToBind, dispatch)
        };
    };




    export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppRoutes));

    // export default
     
    //     connect(mapStateToProps, mapDispatchToProps)(AppRoutes)
    // ;
