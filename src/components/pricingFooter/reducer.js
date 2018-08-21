import c from './constants'

const initialState = {
    footerState: {
        range: false,
        stacked: false,
        buy: false,
        savings: 0,
        stage: null,
        btnOut: false
    }
  }
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {

      case c.UPDATE_FOOTER_STATE:
        return Object.assign({}, state.footerState, {
            range: action.payload.range,
            stacked: action.payload.stacked,
            buy: action.payload.buy,
            stage: action.payload.stage,
            btnOut: action.payload.btnOut,
        }); 
      
      case c.UPDATE_FOOTER_SAVINGS:
        return Object.assign({}, state, {
          savings: action.payload
        })

      default:
          return state;
    }
  }