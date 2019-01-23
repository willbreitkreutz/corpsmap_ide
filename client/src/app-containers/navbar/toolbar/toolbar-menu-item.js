import React from 'react';

class MenuItem extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    const { onClick } = this.props;
    onClick(Object.assign({}, this.props));
  }

  render(){
    const { title } = this.props;
    return (
      <div onClick={ this.handleClick } className="dropdown-item">{ title }</div>
    )
  }
}

export default MenuItem;