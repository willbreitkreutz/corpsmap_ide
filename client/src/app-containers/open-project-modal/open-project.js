import React from 'react';
import { connect } from 'redux-bundler-react';

class OpenProject extends React.Component {
  constructor(props){
    super(props);
    this.close = this.close.bind(this);
    this.openProject = this.openProject.bind(this);
    this.renderProjectList = this.renderProjectList.bind(this);
  }

  close(){
    const { doModalClose } = this.props;
    doModalClose();
  }

  openProject(e){
    const { doProjectsOpen } = this.props;
    const slug = e.currentTarget.dataset.slug;
    doProjectsOpen(slug);
  }

  renderProjectList(){
    const { projectList } = this.props;
    return projectList.map((project, i) => {
      return (
        <li key={i} data-slug={project.slug} onClick={this.openProject} className="list-group-item pointer">
          <i className="mdi mdi-checkbox-blank-circle icon-inline"></i>{project.name}
        </li>
      )
    })
  }
  
  render(){
    return (
      <div className="modal-content" onKeyUp={this.handleKeyUp}>
        <div className="modal-header">
          <h5>Open Project</h5>
          <button onClick={ this.close } type="button" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <ul className="list-group">
            { this.renderProjectList() }
          </ul>
        </div>
      </div>
    )
  }
}

export default connect (
  'selectProjectList',
  'doProjectsOpen',
  'doModalClose',
  OpenProject
)