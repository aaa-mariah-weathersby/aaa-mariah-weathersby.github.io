import _ from "lodash";
import c from './constants';

const initialState = { 
  birthdate: "", 
  married: "",
  active: false, 
  drivers: {
    primary: {
      date : {
        month: "", 
        day: "", 
        year: ""
      },
      email: "",
      firstName: "",
      lastName: "",
      married: "",
    },
    secondary: {
      date : {
        month: "", 
        day: "", 
        year: ""
      },
      email: "",
      firstName: "",
      lastName: "",
      relationship: "",
      // page: "driverInfo"
    }
  },
  pageState: {
    additionalDriverInfo: {
      id: "",
      firstName: "", 
      lastName: "", 
      date: {
        month: "",
        day: "",
        year: ""        
      }, 
      active: false
    },
    driverInfo: {
      date: {
        month: "",
        day: "",
        year: ""
      }, 
      married: "",
      active: false 
    }
  },
}
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {


      case c.UPDATE_PRIMARY: {
        return { ...state, 
          drivers: {
            ...state.drivers,
            primary: {
              ...state.drivers.primary,
              ...action.payload
            }
          }
        };
      }

      case c.UPDATE_SECONDARY: {
        console.log("create secondary driver")
        return { ...state, 
          drivers: {
            ...state.drivers,
            secondary: {
              ...state.drivers.secondary,
              ...action.payload
            }
          }
        }
      }

      case c.UPDATE_DRIVER: {
        console.log("udpate driver: ", action)
        if (action.payload.id in state.drivers){
          return { ...state, 
            drivers: {
              ...state.drivers,
              [action.payload.id]: action.payload 
            }          
          } 
        }      
      }

      case c.PERSIST_PAGE_STATE:
        return { 
          ...state,
          pageState: {
            ...state.pageState,
            [action.payload.page]: {...action.payload}
          }
        }

      case c.DRIVER_CONFIRMATION.REMOVE_DRIVER:
        // 'action.payload' is the 'id' of action.payload.driver.id
        return _.omit(state, action.payload);

      case c.PERSIST_ADD_DRIVER_PAGE_STATE: {
        return { 
          ...state,
          pageState: {
            ...state.pageState,
            additionalDriverInfo: {
              ...state.pageState.additionalDriverInfo,
                id: action.payload.id,
                firstName: action.payload.firstName, 
                lastName: action.payload.lastName, 
                birthDate: action.payload.birthDate, 
                active: action.payload.active
            }
          }
        };
      }

      default:
          return state;
    }
  }