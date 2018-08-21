import c from './constants';

const initialState = {
  footer: false,
  pageState: {
    addOns: {
      active: false,
      options: {
      }
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

    case c.FOOTER_STATE:
      return { ...state, footer: action.payload}

    default:
        return state;
  }
}