export default {
  name: 'api',

  getReducer: () => {
    const initialState = {
      root: 'http://localhost:3002/api/v1',
      docsRoot: 'http://localhost:3002/apps',
      appRoot: 'http://localhost:3002/apps'
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
  },

  selectApiDocsRoot: (state) => {
    return state.api.docsRoot;
  },

  selectApiAppRoot: (state) => {
    return state.api.appRoot;
  }
}