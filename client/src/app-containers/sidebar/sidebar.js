import React from 'react';
import { connect } from 'redux-bundler-react';
import FileList from './file-list';

class Sidebar extends React.Component {
  render(){
    const { projectFiles } = this.props;
    return (
      <div className="sidebar">
        <FileList files={ projectFiles } />
      </div>
    )
  }
}

export default connect(
  'selectProjectFiles',
  Sidebar
);