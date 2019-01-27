import React from 'react';
import { connect } from 'redux-bundler-react';
import classnames from 'classnames';

class OpenProject extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      filename: ''
    }
    this.close = this.close.bind(this);
    this.save = this.save.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.setFilename = this.setFilename.bind(this);
  }

  close(){
    const { doModalClose } = this.props;
    doModalClose();
  }

  save(){
    const { doProjectsNewFile } = this.props;
    const { filename } = this.state;
    doProjectsNewFile(filename);
  }

  handleKeyUp(e){
    const { keyCode } = e;
    if(keyCode === 13) this.save();
  }

  setFilename(e){
    const newFilename = e.currentTarget.value;
    this.setState({
      filename: newFilename
    })
  }
  
  render(){
    const { filename } = this.state;
    const enableSave = !!filename;
    const saveClass = classnames({
      "btn": true,
      "btn-sm": true,
      "btn-primary": true,
      "disabled": !enableSave
    })
    return (
      <div className="modal-content" onKeyUp={this.handleKeyUp}>
        <div className="modal-header">
          <h5>New File</h5>
          <button onClick={ this.close } type="button" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group" style={{marginTop: '15px'}}>
            <label>What would you like to call the file?</label>
            <input value={filename} onChange={this.setFilename} type="text" className="form-control"></input>
          </div>
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
  'doProjectsNewFile',
  'doModalClose',
  OpenProject
)