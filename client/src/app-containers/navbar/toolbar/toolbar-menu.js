import React from 'react';
import classnames from 'classnames';

class Menu extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false
    }
    this.toggleOpen = this.toggleOpen.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  toggleOpen(){
    this.setState({
      open: !this.state.open
    })
  } 

  handleMouseLeave(){
    this.setState({
      open: false
    })
  }

  render(){
    const { open } = this.state;
    const { children, title } = this.props;
    const menuClass = classnames({
      "dropdown-menu": true,
      "show": open
    })
    return (
      <div className="nav-item dropdown" onMouseLeave={ this.handleMouseLeave }>
        <span onClick={ this.toggleOpen } className="nav-link dropdown-toggle">{ title }</span>
        <div className={ menuClass } x-placement="bottom-start" style={{top:'35px'}}>
          {
            children
          }
        </div>
      </div>
    )
  }
}

export default Menu;