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
        case 'EDITOR_OPEN_FILE':
        case 'EDITOR_CLOSE_FILE':
        case 'EDITOR_LOAD_START':
        case 'EDITOR_LOAD_SUCCESS':
        case 'EDITOR_UPDATE_CONTENT':
        case 'EDITOR_SYNC_START':
        case 'EDITOR_SYNC_SUCCESS':
        case 'EDITOR_SYNC_UPDATE':
          return Object.assign({}, state, payload);
        case 'PROJECTS_SHOULD_OPEN':
          return Object.assign({}, state, {
            filename: '',
            content: ''
          })
        default: 
          return state;
      }
    }
  },

  doEditorCloseFile: () => ({ dispatch, store }) => {
    dispatch({ type: 'EDITOR_CLOSE_FILE', payload: { filename: '', content: ''}});
  },

  doEditorOpenFile: (file) => ({ dispatch, store }) => {
    dispatch({ type: 'EDITOR_OPEN_FILE', payload: { filename: file, shouldLoad: true }});
  },

  doEditorUpdateContent: (content) => ({ dispatch, store }) => {
    dispatch({ type: 'EDITOR_UPDATE_CONTENT', payload: { content: content, syncMessage: '' }});
  },

  doEditorLoad: () => ({ dispatch, store }) => {
    dispatch({ type: 'EDITOR_LOAD_START', payload:{ shouldLoad: false, content: 'Loading...', syncMessage: 'Loading file from server...' }});
    const root = store.selectApiDocsRoot();
    const projectSlug = store.selectProjectSlug();
    const filename = store.selectEditorFilename();
    xhr.get(`${root}/${projectSlug}/preview/${filename}`, (err, response, body) => {
      if(err){
        // do something
      }else{
        dispatch({ type: 'EDITOR_LOAD_SUCCESS', payload:{ content: body || '', syncMessage: '' }});
      }
    })
  },

  doEditorSync: () => ({ dispatch, store }) => {
    dispatch({ type: 'EDITOR_SYNC_START', payload: { syncMessage: 'Saving file to server...' }});
    const root = store.selectApiRoot();
    const projectSlug = store.selectProjectSlug();
    const filename = store.selectEditorFilename();
    const content = store.selectEditorContent();
    xhr.put(`${root}/projects/${projectSlug}/${filename}`,
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