import React from 'react';
import { connect } from 'redux-bundler-react';
import Navbar from './navbar/navbar';
import Editor from './editor/editor';
import Sidebar from './sidebar/sidebar';
import Modal from './modal-window/modal';

class App extends React.Component {
  constructor(props){
    super(props);
    this.renderModal = this.renderModal.bind(this);
  }

  renderModal(){ 
    const { modalContent } = this.props;
    if(!modalContent) return null;
    return (
      <Modal>
        {
          modalContent
        }
      </Modal>
    )
  }

  render(){
    const { mainContainerHeight } = this.props;
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <div className="row" style={{height: `${mainContainerHeight}px`}}>
            <div className="col-3" style={{position:'relative',padding:0}}>
              <Sidebar />
            </div>
            <div className="col-9" style={{position:'relative',padding:0}}>
              <div style={{height:'100%'}}>
                <Editor />
              </div>
            </div>
          </div>
        </div>
        {
          this.renderModal()
        }
      </div>
    );
  }
}

export default connect(
  'selectMainContainerHeight',
  'selectModalContent',
  App
);
