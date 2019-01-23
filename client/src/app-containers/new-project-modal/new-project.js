import React from 'react';
import { connect } from 'redux-bundler-react';

class NewProject extends React.Component {
  constructor(props){
    super(props);
    this.close = this.close.bind(this);
  }

  close(){
    const { doModalClose } = this.props;
    doModalClose();
  }
  
  render(){
    const { projectTypes } = this.props;
    return (
      <div className="modal-content">
        <div className="modal-header">
          <h5>New Project</h5>
          <button onClick={ this.close } type="button" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <p>What type of project do you want to create?</p>
          <ul className="list-group">
            {
              projectTypes.map((type, i) => {
                return <li key={i} className="list-group-item">{type}</li>
              })
            }
          </ul>
        </div>
        <div className="modal-footer">
        </div>
      </div>
    )
  }
}

export default connect (
  'selectProjectTypes',
  'doModalClose',
  NewProject
)