

export default {
  name: 'projects',

  getReducer: () => {
    const initialState = {

    }

    return (state = initialState, { type, payload }) => {
      switch(type){
        case '':
          return Object.assign({}, state, payload);
        default:
          return state;
      }
    }
  }
}