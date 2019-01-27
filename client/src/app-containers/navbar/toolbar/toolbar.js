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
    this.handleClick = this.handleClick.bind(this);
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

  render(){ 
    return (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item dropdown">
          { this.renderProjectMenu() }
          { this.renderFileMenu() }
        </li>
      </ul>
    )
  }
}

export default connect(
  'doModalOpen',
  'selectProjectName',
  'selectEditorFilename',
  Toolbar
);