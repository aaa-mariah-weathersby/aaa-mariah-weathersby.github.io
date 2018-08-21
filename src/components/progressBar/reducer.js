import c from './constants'

import r from '../routes/constants'
const routes = r.STEPS;
const routeLength = Object.keys(routes).length - 2;

const initialState = {
    currentKey: '0',
    currentVal: 0,
    precVal: 0,
    highestVal: 0,
  }
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {

      case c.UPDATE_PROGRESS_BAR:

        const newVal = action.payload.val
        const updateHighVal = 
          newVal > state.highestVal ? newVal : state.highestVal

        var newPercVal = Math.floor((newVal/routeLength) * 100);

        newPercVal = newPercVal.toString() + "%"

        return Object.assign({}, state, {
          currentKey: action.payload.key,
          currentVal: action.payload.val,
          precVal: newPercVal,
          highestVal: updateHighVal
        });      

      default:
          return state;
    }
  }