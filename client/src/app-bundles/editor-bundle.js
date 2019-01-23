import xhr from 'xhr';
import { debounce } from 'lodash';

export default {
  name: 'editor',

  getReducer: () => {
    const initialState = {
      filename: '',
      content: '',
      dirty: false,
      saved: false,
      shouldLoad: false,
      syncMessage: ''
    }

    return (state = initialState, { type, payload }) => {
      switch(type){
        case 'EDITOR_LOAD_START':
        case 'EDITOR_LOAD_SUCCESS':
        case 'EDITOR_UPDATE_CONTENT':
        case 'EDITOR_SYNC_START':
        case 'EDITOR_SYNC_SUCCESS':
        case 'EDITOR_SYNC_UPDATE':
          return Object.assign({}, state, payload);
        default: 
          return state;
      }
    }
  },

  doEditorOpenFile: (file) => ({ dispatch, store }) => {
    dispatch({ type: 'EDITOR_OPEN_FILE', payload: { filename: file.filename, shouldLoad: true }});
  },

  doEditorUpdateContent: (content) => ({ dispatch, store }) => {
    dispatch({ type: 'EDITOR_UPDATE_CONTENT', payload: { content: content, syncMessage: '' }});
  },

  doEditorLoad: () => ({ dispatch, store }) => {
    dispatch({ type: 'EDITOR_LOAD_START', payload:{ content: 'Loading...', syncMessage: 'Loading file from server...' }});
    const projectSlug = store.selectProjectSlug();
    const filename = store.selectEditorFilename();
    xhr.get(`/api/docs/${projectSlug}/preview/${filename}`, (err, response, body) => {
      if(err){
        // do something
      }else{
        dispatch({ type: 'EDITOR_LOAD_SUCCESS', payload:{ content: body, syncMessage: '' }});
      }
    })
  },

  doEditorSync: () => ({ dispatch, store }) => {
    dispatch({ type: 'EDITOR_SYNC_START', payload: { syncMessage: 'Saving file to server...' }});
    const projectId = store.selectProjectId();
    const filename = store.selectEditorFilename();
    const content = store.selectEditorContent();
    xhr.post(`/api/files/${projectId}/${filename}`,
    {
      body: content
    },
    (err, response, body) => {
      dispatch({ type: 'EDITOR_SYNC_SUCCESS', payload: { syncMessage: 'All edits saved to server.' }});
      window.setTimeout(() => {
        dispatch({ type: 'EDITOR_SYNC_UPDATE', payload: { syncMessage: '' }});
      }, 3000)
    })
  },

  selectEditorFilename: (state) => {
    return state.editor.filename;
  },

  selectEditorContent: (state) => {
    return state.editor.content;
  },

  selectEditorSyncMessage: (state) => {
    return state.editor.syncMessage;
  },

  reactEditorShouldLoad: (state) => {
    if(state.editor.shouldLoad) return { actionCreator: 'doEditorLoad' };
  },

  reactEditorDirty: (state) => {
    if(state.editor.dirty) return { actionCreator: 'doEditorSync'}
  }
}