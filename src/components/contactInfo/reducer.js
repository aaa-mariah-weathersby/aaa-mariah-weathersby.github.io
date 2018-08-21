import c from './constants'

const initialState = {
      firstName: "",
      lastName: "",
      email: "",
      active: false
  }
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {

      case c.PERSIST_INFO:
        return { ...state, ...action.payload}    

      default:
          return state;
    
    }
  }