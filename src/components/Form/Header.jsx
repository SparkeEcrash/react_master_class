import React, {Component} from "react";

class Header extends Component {
  
  render() {
      return (
        <React.Fragment>
          <h1>{this.props.title}</h1>
          {this.props.children}
        </React.Fragment>
      );
  }
}

export default Header;