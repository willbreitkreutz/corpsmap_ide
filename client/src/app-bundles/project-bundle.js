import xhr from 'xhr';

export default {
  name: 'projects',

  getReducer: () => {
    const initialState = {
      creatingNew: false,
      openProjectId: null,
      openProjectSlug: null,
      openProjectName: null,
      openProjectFiles: [],
      projectList: [],
      projectTypes: [],
      shouldOpen: false,
      shouldLoad: true,
      shouldLoadTypes: true,
      shouldLoadFiles: false
    }

    return (state = initialState, { type, payload }) => {
      switch(type){
        case 'PROJECTS_SHOULD_OPEN':
        case 'PROJECTS_OPEN_START':
        case 'PROJECTS_OPEN_SUCCESS':
        case 'PROJECTS_LOAD_START':
        case 'PROJECTS_LOAD_SUCCESS':
        case 'PROJECTS_LOAD_TYPES_START':
        case 'PROJECTS_LOAD_TYPES_SUCCESS':
        case 'PROJECTS_CREATE_NEW_START':
        case 'PROJECTS_CREATE_NEW_SUCCESS':
        case 'PROJECTS_FILE_CREATED':
        case 'PROJECTS_LOAD_FILES_START':
        case 'PROJECTS_LOAD_FILES_SUCCESS':
          return Object.assign({}, state, payload);
        default:
          return state;
      }
    }
  },

  doProjectsCreateNew: ({projectName, projectType}) => ({ dispatch, store }) => {
    dispatch({ type: 'PROJECTS_CREATE_NEW_START', payload: { creatingNew: true }});
    const root = store.selectApiRoot();
    xhr.post(`${root}/projects`,{
        body:JSON.stringify({
          projectName: projectName,
          projectType: projectType
        }),
        headers: {
          "Content-Type": "application/json"
        }
      },
      (err, respones, body) => {
        if(err){
          // do something
        }else{
          const project = JSON.parse(body);
          dispatch({ type: 'PROJECTS_CREATE_NEW_SUCCESS', payload: { shouldOpen: true, openProjectSlug: project.slug, creatingNew: false, shouldLoad: true }});
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
    const root = store.selectApiRoot();
    xhr.get(`${root}/projects`, (err, response, body) => {
      if(err){
        // do something
      }else{
        const projects = JSON.parse(body);
        dispatch({ type: 'PROJECTS_LOAD_SUCCESS', payload: { projectList: projects }});
      }
    })
  },

  doProjectsOpen: (slug) => ({ dispatch, store }) => {
    dispatch({ type: 'PROJECTS_SHOULD_OPEN', payload: { openProjectSlug: slug, shouldOpen: true }});
  },

  doProjectsShouldOpen: () => ({ dispatch, store }) => {
    dispatch({ type: 'PROJECTS_OPEN_START', payload: { shouldOpen: false }});
    const root = store.selectApiRoot();
    const slug = store.selectProjectSlug();
    xhr.get(`${root}/projects/${slug}`, (err, response, body) => {
      if(err){
        // do something
      }else{
        const project = JSON.parse(body);
        store.doModalClose();
        dispatch({ type: 'PROJECTS_OPEN_SUCCESS', payload: { 
          openProjectName: project.name,
          openProjectSlug: project.slug,
          openProjectFiles: project.files
         }});
      }
    })
  },

  doProjectsLoadFiles: () => ({ dispatch, store }) => {
    dispatch({ type: 'PROJECTS_LOAD_FILES_START', payload: { shouldLoadFiles: false }});
    const root = store.selectApiRoot();
    const slug = store.selectProjectSlug();
    xhr.get(`${root}/projects/${slug}/files`, (err, response, body) => {
      if(err || response.statusCode !== 200){
        // do something
      }else{
        const files = JSON.parse(body);
        dispatch({ type: 'PROJECTS_LOAD_FILES_SUCCESS', payload: { openProjectFiles: files }});
      }
    })
  },

  doProjectsNewFile: (filename) => ({ dispatch, store }) => {
    const slug = store.selectProjectSlug();
    const root = store.selectApiRoot();
    xhr.post(`${root}/projects/${slug}/${filename}`, (err, response, body) => {
      if(err || response.statusCode !== 200){
        // do something
        console.log(err, response);
      }else{
        dispatch({ type: 'PROJECTS_FILE_CREATED', payload:{ shouldLoadFiles: true }})
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

  selectProjectList: (state) => {
    return state.projects.projectList;
  },

  selectProjectName: (state) => {
    return state.projects.openProjectName
  },

  reactProjectShouldOpen: (state) => {
    if(state.projects.shouldOpen) return { actionCreator: 'doProjectsShouldOpen' };
  },

  reactProjectShouldLoad: (state) => {
    if(state.projects.shouldLoad) return { actionCreator: 'doProjectsLoad' };
  },

  reactProjectShouldLoadTypes: (state) => {
    if(state.projects.shouldLoadTypes) return { actionCreator: 'doProjectsLoadTypes' };
  },

  reactProjectShouldLoadFiles: (state) => {
    if(state.projects.shouldLoadFiles) return { actionCreator: 'doProjectsLoadFiles' };
  }
}