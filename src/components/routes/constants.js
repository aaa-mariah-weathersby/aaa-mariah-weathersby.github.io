import Home from '../home/constants'
import Contact from '../contactInfo/constants'
import Driver from '../driverInfo/constants'
import Car from '../carInfo/constants'
import PriorInsurance from '../insuranceInfo/constants'
import BackgroundCheck from '../backgroundCheck/constants'
import AdditionalQuestions from '../additionalQuestions/constants'
import Modals from '../common/modal/modalScreens/constants'
import SelectCoverage from '../selectCoverage/constants'
import AddOns from '../addOns/constants'
import UpgradeOpts from '../upgradeOptions/constants'
import InsuranceSpecialist from '../insuranceSpecialist/constants'
import StartDate from '../startDate/constants'
import ThankYou from '../thankYou/constants'
import ReviewPlan from '../reviewPlan/constants';
import PaymentFreq from '../paymentFrequency/constants'
import AutoPay from '../automaticPayments/constants'
import PaymentOpts from '../paymentOptions/constants'
import Review from '../recap/constants'

const contactPath = Contact.PATH;

export const constants = {
    STEPS: {
        home: {
            key: Home.NAME,
            path: Home.PATH,
            val: 0,
        },        
        contactInfo: {
            key: Contact.NAME,
            path: Contact.PATH,
            val: 1,
        },
        driverInfo: {
            key: Driver.DRIVER_INFO.NAME,
            path: Driver.DRIVER_INFO.PATH,
            val: 2,
            // mobileHelper: "We'll save all of this for you in case you need to come back to it."            
        },
        moreDrivers: {
            key: Driver.MORE_DRIVER_QUESTION.NAME,
            path: Driver.MORE_DRIVER_QUESTION.PATH,
            val: 3
        },
        
        additionalDriver: {
            key: Driver.ADDITIONAL_DRIVER.NAME,
            path: Driver.ADDITIONAL_DRIVER.PATH,
            val: 4
        },

        additionalDriverRelationship: {
            key: Driver.ADDITIONAL_DRIVER_RELATIONSHIP.NAME,
            path: Driver.ADDITIONAL_DRIVER_RELATIONSHIP.PATH,
            val: 5
        },
        driverList: {
            key: Driver.DRIVER_LIST.NAME,
            path: Driver.DRIVER_LIST.PATH,
            val: 6
        },
        driverConfirmation: {
            key: Driver.DRIVER_CONFIRMATION.NAME,
            path: Driver.DRIVER_CONFIRMATION.PATH,
            val: 7
        },
        carLocation: {
            key: Car.CAR_LOCATION.NAME,
            path: Car.CAR_LOCATION.PATH,
            val: 8
        },
        carLocationShared: {
            key: Car.CAR_LOCATION_SHARED.NAME,
            path: Car.CAR_LOCATION_SHARED.PATH,
            val: 9
        },
        carSelection: {
            key: Car.CAR_SELECTION.NAME,
            path: Car.CAR_SELECTION.PATH,
            val: 10,
            // mobileHelper: "We ran a quick check through th eDMV to help speed thing up a bit"
        },
        carList: {
            key: Car.CAR_LIST.NAME,
            path: Car.CAR_LIST.PATH,
            val: 11,
        },
        // Help Me Modal Here ? ? ?
        priorInsurance: {
            key: PriorInsurance.INSURANCE_PRIOR.NAME,
            path: PriorInsurance.INSURANCE_PRIOR.PATH,
            val: 12
        },
        priorInsuranceCompany: {
            key: PriorInsurance.INSURANCE_PRIOR_COMPANY.NAME,
            path: PriorInsurance.INSURANCE_PRIOR_COMPANY.PATH,
            val: 13
        },
        backgroundCheck: {
            key: BackgroundCheck.NAME,
            path: BackgroundCheck.PATH,
            val: 14
        },
        additionalQuestions: {
            key: AdditionalQuestions.ADDITIONAL_QUESTIONS.NAME,
            path: AdditionalQuestions.ADDITIONAL_QUESTIONS.PATH,
            val: 15,
        },
        // accidentModal: {
        //     key: Modals.ACCIDENT_MODAL.NAME,
        //     path: Modals.ACCIDENT_MODAL.PATH,
        //     val: 14,
        //     mobileHelper: "Honesty is the best policy. No pun intended ;)"            
        // },
        // carLoanModal: {
        //     key: Modals.CAR_LOAN_MODAL.NAME,
        //     path: Modals.CAR_LOAN_MODAL.PATH,
        //     val: 15,
        // },
        selectCoverage: {
            key: SelectCoverage.SELECT_COVERAGE.NAME,
            path: SelectCoverage.SELECT_COVERAGE.PATH,
            val: 16,
            // mobileHelper: "Honesty is the best policy. No pun intended ;)"            
        },
        paymentFrequency: {
            key: PaymentFreq.NAME,
            path: PaymentFreq.PATH,
            val: 17,
        },
        addOns: {
            key: AddOns.NAME,
            path: AddOns.PATH,
            val: 18,
        },
        upgradeOptions: {
            key: UpgradeOpts.NAME,
            path: UpgradeOpts.PATH,
            val: 19,
        },
        insuranceSpecialist: {
            key: InsuranceSpecialist.NAME,
            path: InsuranceSpecialist.PATH,
            val: 20,
        },
        startDate: {
            key: StartDate.NAME,
            path: StartDate.PATH,
            val: 21,
        },
        reviewPlan: {
            key: ReviewPlan.NAME,
            path: ReviewPlan.PATH,
            val: 22,
        },  
        autoPay: {
            key: AutoPay.NAME,
            path: AutoPay.PATH,
            val: 23,            
        },         
        paymentOptions: {
            key: PaymentOpts.NAME,
            path: PaymentOpts.PATH,
            val: 24,            
        },
        review: {
            key: Review.NAME,
            path: Review.PATH,
            val: 25, 
        },
        thankYou: {
            key: ThankYou.NAME,
            path: ThankYou.PATH,
            val: 26,
        }


    },
    UPDATE_ROUTE: "UPDATE_ROUTE",
    MOBILE_HELPERS: {
        contactPath: {
            content: "Well save all fo this for you in case you need to come back to it",
        },
    },
    RENDER_BACK: "RENDER_BACK"

};

export default constants;
