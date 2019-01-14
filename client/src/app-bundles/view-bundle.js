import { createSelector } from "redux-bundler";

export default {
  name: 'view',

  getReducer: () => {
    const initialState = {
      navHeight: 30,
      height: window.innerHeight
    }

    return (state = initialState, { type, payload }) => {
      switch(type){
        case 'VIEW_UPDATE_NAV_HEIGHT':
          return Object.assign({}, state, payload);
        default:
          return state;
      }
    }
  },

  doViewUpdateNavHeight: (h) => ({ dispatch, store }) => {
    dispatch({ type: 'VIEW_UPDATE_NAV_HEIGHT', payload: { navHeight: h }});
  },

  selectNavHeight: (state) => {
    return state.view.navHeight;
  },

  selectViewHeight: (state) => {
    return state.view.height;
  },

  selectMainContainerHeight: createSelector(
    'selectViewHeight',
    'selectNavHeight',
    (vh, nh) => {
      return vh - nh;
    }
  ),

  init: (store) => {
    // add a listener for window resize
  }
}