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
    const filetype = new RegExp(/\.(.+)/).exec(file);
    const activeClass = classnames({
      "list-group-item": true,
      "active": file === editorFilename
    })
    let iconClass = 'mdi mdi-document icon-inline';
    if(filetype){
      iconClass = classnames({
        "mdi": true,
        "mdi-code-not-equal-variant": filetype[1] === 'html',
        "mdi-pound": filetype[1] === 'css',
        "mdi-nodejs": filetype[1] === 'js',
        "icon-inline": true
      })
    }
    return (
      <li className={ activeClass }>
        {
          this.renderCloseButton()
        }
        <div onClick={ this.openFile}  >
          <i className={ iconClass }></i>
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