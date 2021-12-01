import React, { Component } from "react";
import { Link, NavLink, Route } from "react-router-dom";
import "./NavBar.css";





class NavBar extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {

      userDetails: this.props.userDetails,

    };

  }

  componentDidUpdate(prevProps) {

  }
  componentDidMount() {

  }


  render() {
    return (

      <div className="left-side-bar">
        <div className="flex-container">
          <nav id="sidebar" style={{height:'800px'}}>
               

                <ul class="list-unstyled components">
                    <li>
                      <NavLink to="/" activeClassName="active">
                     
                        <label className="ml-4" > Search Flights</label>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/changeFlight" activeClassName="active">
                        <span><i className="fa fa-bar-chart" style={{fontSize:'20px'}}></i></span>
                        <label className="ml-4" > Change Flight</label>
                      
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/myReservations" activeClassName="active">
                        <span><i className="fa fa-tasks" style={{fontSize:'20px'}}></i> </span>
                        <label className="ml-4" > Reservations</label>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/myprofile" activeClassName="active">
                        <span><i className="fa fa-tasks" style={{fontSize:'20px'}}></i> </span>
                        <label className="ml-4" > My Profile</label>
                      </NavLink>
                    </li>
                
                </ul>
            </nav>
          </div>
        </div>
    );
  }
}
export default NavBar;
