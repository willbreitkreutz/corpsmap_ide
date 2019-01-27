import React from 'react';
import { connect } from 'redux-bundler-react';
import classnames from 'classnames';

class FileListItem extends React.Component {
  constructor(props){
    super(props);
    this.openFile = this.openFile.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  openFile(){
    const { doEditorOpenFile, file } = this.props;
    doEditorOpenFile(file);
  }

  handleClose(){
    const { doEditorCloseFile } = this.props;
    doEditorCloseFile();
  }

  renderCloseButton(){
    const { file, editorFilename } = this.props;
    if(file !== editorFilename) return null;
    return (
      <div className="float-right" onClick={ this.handleClose }><i className="mdi mdi-close-circle"></i></div>
    )
  }

  render(){
    const { file, editorFilename } = this.props;
    const activeClass = classnames({
      "list-group-item": true,
      "active": file === editorFilename
    })
    return (
      <li className={ activeClass }>
        {
          this.renderCloseButton()
        }
        <div onClick={this.openFile} >
          <i className="mdi mdi-pound icon-inline"></i>
          { file }
        </div>
      </li>
    )
  }
}

export default connect(
  'doEditorOpenFile', 
  'doEditorCloseFile',
  'selectEditorFilename',
  FileListItem
);