import React from 'react';
import { connect } from 'redux-bundler-react';
import Menu from './toolbar-menu';
import MenuItem from './toolbar-menu-item';
import NewProject from '../../new-project-modal/new-project';

class Toolbar extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(props){
    const { doModalOpen } = this.props;
    switch(props.title){
      case 'New':
        doModalOpen(<NewProject />);
        break;
      default:
        console.log('something went wrong')
    }
  }

  render(){ 
    return (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item dropdown">
          <Menu title="Project">
            <MenuItem onClick={ this.handleClick } title="New" />
            <MenuItem onClick={ this.handleClick } title="Open" />
          </Menu>
        </li>
      </ul>
    )
  }
}

export default connect(
  'doModalOpen',
  Toolbar
);