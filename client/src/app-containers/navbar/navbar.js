import React from 'react';
import { connect } from 'redux-bundler-react';
import Toolbar from './toolbar/toolbar';

class Navbar extends React.Component {
  // constructor(props){
  //   super(props);
  // }
  componentDidMount(){
    const { doViewUpdateNavHeight } = this.props;
    doViewUpdateNavHeight(this.el.clientHeight);
  }
  render(){
    const { editorSyncMessage } = this.props;
    return (
      <nav ref={(el) => { this.el = el }} className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">IDE</a>
        <Toolbar />
        <span className="nav-item" style={{color:'#ffffff'}}>{ editorSyncMessage }</span>
      </nav>
    )
  }
}

export default connect(
  'doViewUpdateNavHeight',
  'selectEditorSyncMessage',
  Navbar
);