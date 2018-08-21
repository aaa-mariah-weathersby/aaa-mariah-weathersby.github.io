import c from './constants'

const initialState = {
    currentRoute: c.STEPS["home"].key,
    previousRoute: c.STEPS["home"].key,
    renderBack: false
}
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {

        case c.UPDATE_ROUTE:
            return Object.assign({}, state, {
                currentRoute: action.payload.nextRoute,
                previousRoute: action.payload.prevRoute
            })
        
        case c.RENDER_BACK:
            return Object.assign({}, state, {
                renderBack: action.payload
            })        

        default:
            return state;
    }
  }