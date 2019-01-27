import React from 'react';
import { connect } from 'redux-bundler-react';
import Menu from './toolbar-menu';
import MenuItem from './toolbar-menu-item';
import NewProject from '../../new-project-modal/new-project';
import OpenProject from '../../open-project-modal/open-project';
import NewFile from '../../new-file-modal/new-file';

class Toolbar extends React.Component {
  constructor(props){
    super(props);
    this.publish = this.publish.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderFileMenu = this.renderFileMenu.bind(this);
    this.renderProjectMenu = this.renderProjectMenu.bind(this);
    this.renderPreviewLink = this.renderPreviewLink.bind(this);
    this.renderPublishLink = this.renderPublishLink.bind(this);
  }

  publish(){
    const { doProjectsPublish } = this.props;
    doProjectsPublish();
  }

  handleClick(props){
    const { doModalOpen } = this.props;
    switch(props.title){
      case 'New Project':
        doModalOpen(<NewProject />);
        break;
      case 'Open Project':
        doModalOpen(<OpenProject />);
        break;
      case 'New File':
        doModalOpen(<NewFile />);
        break;
      default:
        console.log('something went wrong')
    }
  }

  renderProjectMenu(){
    return (
      <Menu title="Project">
        <MenuItem onClick={ this.handleClick } title="New Project" />
        <MenuItem onClick={ this.handleClick } title="Open Project" />
      </Menu>
    )
  }

  renderFileMenu(){
    const { projectName } = this.props;
    if(!projectName) return null;
    return (
      <Menu title="File">
        <MenuItem onClick={ this.handleClick } title="New File" />
      </Menu>
    )
  }

  renderPreviewLink(){
    const { projectName, apiAppRoot, projectSlug} = this.props;
    if(!projectName) return null;
    return (
      <li className="nav-item ml-3">
        <a href={`${apiAppRoot}/${projectSlug}/preview`} target="_blank">
          <button className="btn btn-secondary">Preview {projectName}</button>
        </a>
      </li>
    )
  }

  renderPublishLink(){
    const { projectName, apiAppRoot, projectSlug, projectPublished } = this.props;
    if(!projectName) return null;
    console.log(projectPublished)
    if(!projectPublished){
      return (
        <li className="nav-item ml-3">
            <button onClick={ this.publish } className="btn btn-warning">Publish</button>
        </li>
      )
    }
    return (
      <li className="nav-item ml-3">
        <a href={`${apiAppRoot}/${projectSlug}`} target="_blank">
          <button className="btn btn-warning">Open Published Site</button>
        </a>
      </li>
    )
  }

  render(){ 
    return (
      <ul className="navbar-nav mr-auto">
          { this.renderProjectMenu() }
          { this.renderFileMenu() }
          { this.renderPreviewLink() }
          { this.renderPublishLink() }
      </ul>
    )
  }
}

export default connect(
  'doModalOpen',
  'doProjectsPublish',
  'selectApiAppRoot',
  'selectProjectName',
  'selectProjectSlug',
  'selectProjectPublished',
  'selectEditorFilename',
  Toolbar
);