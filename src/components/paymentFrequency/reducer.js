import c from './constants';

const initialState = {
  pageState: {
    paymentFrequency: {
        active: false,
        page: "paymentFrequency",
        freqSelection: "monthly",
    }
  },

}
  
export default function reducer(state = initialState, action) {
  switch (action.type) {

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