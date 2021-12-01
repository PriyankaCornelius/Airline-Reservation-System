import React, { Component } from "react";

import "./HomePage.css";
import { Link, Route } from "react-router-dom";



import { Redirect } from "react-router";
import cookie from "react-cookies";


import { BrowserRouter, HashRouter } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import profilePage from "../profilePage/profilePage";
import Navheader from '../navbar/navbar';

import NavBar from "./NavBar/NavBar";
import SearchFlight from "../SearchFlights/searchFlights";
import Reservations from "../Reservations/Reservations";
class HomePage extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      loggedIn: true,
      userDetails: this.props.location.userDetails,
      appPodDtls: [],
      appPodDtlsLoaded: false

    };
  }
  logOut = loggedin => {
    console.log("logged in", loggedin);
    console.log(this.state.loggedIn);
    this.setState({
      loggedIn: loggedin
    });

  };
  componentWillMount() {
    console.log('will mount')
    const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
    this.setState({
      userDetails: userDetails
    });



  }

  async componentDidMount() {

    const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
    if (userDetails != null)
      this.setState({
        userDetails: userDetails
      })
    

  }


  componentDidUpdate(prevProps, prevState) {
    console.log('component updated')
  }

 


    


    



  render() {
    let header = null;
    if (!this.state.loggedIn) {
      console.log("redirect");
    
      sessionStorage.clear();
      return <Redirect to="/" />;
    } else
      return (
        <HashRouter>
          <div>
            <Navheader/>
            {/* <Header userDetails={this.state.userDetails} loggedIn={this.state.loggedIn} logOut={this.logOut} /> */}
            <div className="grid-container">
              <div className="left-side">
                <NavBar
                  userDetails={this.state.userDetails}
                />
              </div>

              <div className="center-area">
                <Route path="/searchFlights"
                  render={props => (
                    <SearchFlight {...props}
                      userDetails={this.state.userDetails}
                    
                    />)}

                  exact />
               
               <Route
                  path="/myReservations"
                  render={props => (
                    <Reservations
                      {...props}
                      userDetails={this.state.userDetails}
                    

                    />
                  )}
                  exact
                />

                <Route
                  path="/myprofile"
                  render={props => (
                    <profilePage
                      {...props}
                      userDetails={this.state.userDetails}
                      userDetailsUpdated={this.changeduserDetails}

                    />
                  )}
                  exact
                />

              </div>

            </div>
          </div>
        </HashRouter>
      );
  }
}




export default HomePage;
