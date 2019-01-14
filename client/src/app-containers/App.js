import React from 'react';
import Navbar from './navbar/navbar';
import Editor from './editor/editor';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-3" style={{position:'relative',padding:0}}>
            </div>
            <div className="col-9" style={{position:'relative',padding:0}}>
              <div style={{height:'100%'}}>
                <Editor />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
