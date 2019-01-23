import React from 'react';
import { connect } from 'redux-bundler-react';

class Modal extends React.Component {
  render(){
    const { children } = this.props;
    return (
      <div>
        <div className="modal-backdrop" style={{opacity:0.4}}></div>
        <div className="modal fade show" style={{display:'block'}}>
          <div className="modal-dialog">
            {
              children
            }
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  Modal
);