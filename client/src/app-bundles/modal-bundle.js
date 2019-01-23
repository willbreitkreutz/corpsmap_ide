export default {
  name: 'modal',

  getReducer: () => {
    const initialState = {
      content: null
    }

    return (state = initialState, { type, payload }) => {
      switch(type){
        case 'MODAL_OPEN':
        case 'MODAL_CLOSE':
          return Object.assign({}, state, payload);
        default:
          return state;
      }
    }
  },

  doModalOpen: (content) => ({ dispatch }) => {
    dispatch({ type: 'MODAL_OPEN', payload: { content: content }});
  },

  doModalClose: () => ({ dispatch }) => {
    dispatch({ type: 'MODAL_CLOSE', payload: { content: null }});
  },

  selectModalContent: (state) => {
    return state.modal.content;
  }
}