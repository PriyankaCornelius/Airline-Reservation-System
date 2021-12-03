import React, { Component } from "react";

import { Link } from "react-router-dom";
import "./LoginHeader.css";
class LoginHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="header">
        <div className="headerContainer">
          <div className="left-side-header">
          <h2 style = {{paddingLeft: "10%", width: "96%", float: "left"}}>FlyUnited</h2>
          <div className="login-header" style = {{marginLeft: "90%", marginTop: "3%"}}>
            <Link to="/">
            </Link>
            <div className="loginLinks">
              <Link to="/login">
                <button className="login">Log in</button>
              </Link>
              <Link to="/Signup">
                <button className="signup">Sign up</button>
              </Link>
            </div>
          </div>
          </div>
          
        </div>
      </div>
    );
  }
}
export default LoginHeader;
