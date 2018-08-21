import { combineReducers } from 'redux';

import Home from './components/home/reducer'
import ContactInfo from './components/contactInfo/reducer'
import DriverList from './components/driverInfo/reducer'
import CarInfo from './components/carInfo/reducer'
import InsuranceInfo from './components/insuranceInfo/reducer'
import AddOns from './components/addOns/reducer'
import StartDate from './components/startDate/reducer'
import Modals from './components/common/modal/modalScreens/reducer'
import ProgressBar from './components/progressBar/reducer'
import SelectCoverage from './components/selectCoverage/reducer'
import PaymentFrequency from './components/paymentFrequency/reducer'
import PaymentOpts from './components/paymentOptions/reducer'
import UpgradeOpts from './components/upgradeOptions/reducer'
import Recap from './components/recap/reducer'
import Footer from './components/pricingFooter/reducer'
import Route from './components/routes/reducer'

const rootReducer = combineReducers({
    home: Home,
    contactInfo: ContactInfo,
    driverList: DriverList,
    carInfo: CarInfo,
    insuranceInfo: InsuranceInfo,
    modals: Modals,
    addOns: AddOns,
    progress: ProgressBar,
    startDate: StartDate,
    route: Route,
    coverage: SelectCoverage,
    paymentFrequency: PaymentFrequency,
    paymentOpts: PaymentOpts,
    upgradeOpts: UpgradeOpts,
    review: Recap,
    footer: Footer
});

export default rootReducer;