export default {
  name: 'api',

  getReducer: () => {
    const initialState = {
      root: 'http://localhost:3002/api/v1'
    }

    return (state = initialState, { type, payload }) => {
      switch(type){
        case '':
          return Object.assign({}, state, payload);
        default:
          return state;
      }
    }
  },

  selectApiRoot: (state) => {
    return state.api.root;
  }
}