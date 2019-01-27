import React from 'react';
import { connect } from 'redux-bundler-react';
import classnames from 'classnames';

class NewProject extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      projectType: '',
      projectName: ''
    }
    this.save = this.save.bind(this);
    this.close = this.close.bind(this);
    this.setProjectType = this.setProjectType.bind(this);
    this.setProjectName = this.setProjectName.bind(this);
    this.clearProjectType = this.clearProjectType.bind(this);
    this.renderProjectTypes = this.renderProjectTypes.bind(this);
    this.renderProjectName = this.renderProjectName.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  close(){
    const { doModalClose } = this.props;
    doModalClose();
  }

  handleKeyUp(e){
    const { keyCode } = e;
    if(keyCode === 13) this.save();
  }

  save(){
    const { projectName, projectType } = this.state;
    const { doProjectsCreateNew } = this.props;
    const enableSave = !!projectName && !!projectType;
    if(enableSave) doProjectsCreateNew(this.state);
  }

  setProjectType(e){
    const projectType = e.currentTarget.dataset.type;
    this.setState({
      projectType: projectType
    })
  }

  clearProjectType(){
    this.setState({
      projectType: ''
    })
  }

  setProjectName(e){
    const projectName = e.currentTarget.value;
    this.setState({
      projectName: projectName
    })
  }

  renderProjectTypes(){
    const { projectTypes } = this.props;
    const { projectType } = this.state;
    if(projectType) return <li className="list-group-item pointer" onClick={this.clearProjectType}><i className="mdi mdi-check-circle icon-inline"></i>{projectType}</li>
    return projectTypes.map((type, i) => {
      return (
        <li key={i} data-type={type} onClick={this.setProjectType} className="list-group-item pointer">
          <i className="mdi mdi-checkbox-blank-circle icon-inline"></i>{type}
        </li>
      )
    })
  }

  renderProjectName(){
    const { projectType, projectName } = this.state;
    if(!projectType) return null;
    return (
      <div className="form-group" style={{marginTop: '15px'}}>
        <label>What should we call the project?</label>
        <input value={projectName} onChange={this.setProjectName} type="text" className="form-control"></input>
      </div>
    )
  }
  
  render(){
    const { projectName, projectType } = this.state;
    const enableSave = !!projectName && !!projectType;
    const saveClass = classnames({
      "btn": true,
      "btn-sm": true,
      "btn-primary": true,
      "disabled": !enableSave
    })
    return (
      <div className="modal-content" onKeyUp={this.handleKeyUp}>
        <div className="modal-header">
          <h5>New Project</h5>
          <button onClick={ this.close } type="button" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <p>What type of project do you want to create?</p>
          <ul className="list-group">
            { this.renderProjectTypes() }
          </ul>
          {
            this.renderProjectName()
          }
        </div>
        <div className="modal-footer">
          <div className="pull-right">
            <button onClick={ this.save } disabled={!enableSave} className={saveClass}>Save</button>
            <button onClick={ this.close } className="btn btn-sm btn-secondary">Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect (
  'selectProjectTypes',
  'doProjectsCreateNew',
  'doModalClose',
  NewProject
)