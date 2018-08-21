import c from './constants';

const initialState = {
  location: { address: "", apartment: "" },
  // id : { makeModel, year, annualMileage }
  cars: {},  
  pageState: {
    carLocation: {
      address: "",
      apartent: "", 
      active: false
    },
    carSelection: {
      makeModel: "Mini Cooper Clubman S Wagon 4 Door", 
      year: "2017",
      annualMileage: "",
      active: false 
    },
    carLocationShared:{
      page: "carLocationShared",
      shared: "",
      address: "", 
      apartment: "",
      active: false,
    }
  },

}
  
export default function reducer(state = initialState, action) {
  switch (action.type) {

    case c.CAR_LOCATION.PERSIST_CAR_LOCATION: {
      return Object.assign({}, state, {
        address: action.payload.location.address,
        apartment: action.payload.location.apartment
      });   
    }

    case c.CAR_SELECTION.PERSIST_CAR_SELECTION:
    return { 
      ...state, 
      cars: {
        ...state.cars,
        [action.payload.car.id]: {...action.payload.car}
        }
      }

    case c.PERSIST_PAGE_STATE:
    return { 
      ...state,
      pageState: {
        ...state.pageState,
        [action.payload.page]: {...action.payload}
      }
    };


    default:
        return state;
  }
}