import React from 'react';
import { connect } from 'redux-bundler-react';

class Navbar extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    const { doViewUpdateNavHeight } = this.props;
    doViewUpdateNavHeight(this.el.clientHeight);
  }
  render(){
    return (
      <nav ref={(el) => { this.el = el }} className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">IDE</a>
      </nav>
    )
  }
}

export default connect(
  'doViewUpdateNavHeight',
  Navbar
);