

export default {
  name: 'files',

  getReducer: () => {
    const initialState = {
      files:{}
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

  doFilesSync: () => ({ dispatch, state }) => {

  },

  selectFiles: (state) => {
    return state.files.files;
  }
}