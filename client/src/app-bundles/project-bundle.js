import xhr from 'xhr';

export default {
  name: 'projects',

  getReducer: () => {
    const initialState = {
      openProjectId: null,
      openProjectSlug: null,
      openProjectName: null,
      openProjectFiles: [],
      projectList: [],
      projectTypes: [],
      shouldOpen: false,
      shouldLoad: false,
      shouldLoadTypes: true
    }

    return (state = initialState, { type, payload }) => {
      switch(type){
        case 'PROJECTS_SHOULD_OPEN':
        case 'PROJECTS_OPEN_START':
        case 'PROJECTS_LOAD_START':
        case 'PROJECTS_LOAD_SUCCESS':
        case 'PROJECTS_LOAD_TYPES_START':
        case 'PROJECTS_LOAD_TYPES_SUCCESS':
          return Object.assign({}, state, payload);
        default:
          return state;
      }
    }
  },

  doProjectsCreateNew: (projectName, projectType) => ({ dispatch, store }) => {
    const root = store.selectApiRoot();
    xhr.post(`${root}/projects`,{
        body:{
          projectName: projectName,
          projectType: projectType
        }
      },
      (err, respones, body) => {
        if(err){
          // do something
        }else{
          const project = JSON.parse(body);
          dispatch({ type: 'PROJECTS_CREATE_NEW', payload: { shouldOpen: true, openProjectSlug: project.slug }});
        }
      }
    )
  },

  doProjectsLoadTypes: () => ({ dispatch, store }) => {
    dispatch({ type: 'PROJECTS_LOAD_TYPES_START', payload: { shouldLoadTypes: false }});
    const root = store.selectApiRoot();
    xhr.get(`${root}/projects/types`, (err, response, body) => {
      if(err){
        // do something
      }else{
        const projectTypes = JSON.parse(body);
        dispatch({ type: 'PROJECTS_LOAD_TYPES_SUCCESS', payload: { projectTypes: projectTypes }});
      }
    })
  },

  doProjectsLoad: () => ({ dispatch, store }) => {
    dispatch({ type: 'PROJECTS_LOAD_START', payload: { shouldLoad: false }});
    xhr.get(`/projects/`, (err, response, body) => {
      if(err){
        // do something
      }else{
        const projects = JSON.parse(body);
        dispatch({ type: 'PROJECTS_LOAD_SUCCESS', payload: { projectList: projects }});
      }
    })
  },

  doProjectsOpen: (projectId) => ({ dispatch, store }) => {
    dispatch({ type: 'PROJECTS_SHOULD_OPEN', payload: { openProjectId: projectId, shouldOpen: true }});
  },

  doProjectsShouldOpen: () => ({ dispatch, store }) => {
    dispatch({ type: 'PROJECTS_OPEN_START', payload: { shouldOpen: false }});
    const projectId = store.selectProjectId();
    xhr.get(`/projects/${projectId}`, (err, response, body) => {
      if(err){
        // do something
      }else{
        const project = JSON.parse(body);
        dispatch({ type: 'PROJECTS_OPEN_SUCCESS', payload: { 
          openProjectName: project.name,
          openProjectSlug: project.slug,
          openProjectFiles: project.files
         }});
      }
    })
  },

  selectProjectId: (state) => {
    return state.projects.openProjectId;
  },

  selectProjectSlug: (state) => {
    return state.projects.openProjectSlug;
  },

  selectProjectFiles: (state) => {
    return state.projects.openProjectFiles;
  },

  selectProjectTypes: (state) => {
    return state.projects.projectTypes;
  },

  reactProjectShouldOpen: (state) => {
    if(state.projects.shouldOpen) return { actionCreator: 'doProjectsShouldOpen' };
  },

  reactProjectShouldLoad: (state) => {
    if(state.projects.shouldLoad) return { actionCreator: 'doProjectsLoad' };
  },

  reactProjectShouldLoadTypes: (state) => {
    if(state.projects.shouldLoadTypes) return { actionCreator: 'doProjectsLoadTypes' };
  }
}