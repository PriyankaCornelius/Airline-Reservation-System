import React, { Component } from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Profilepage from './profilePage/profilePage';
import FlightBooking from './flightBooking';
import TravellerInfo from './travellerInfo';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import SearchFlight from './SearchFlights/searchFlights';
import DisplayFlights from './SearchFlights/displayFlights';
import HomePage from './HomePage/HomePage';
class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* <Route exact path="/" component={LandingPage} /> */}
          {/* <Route path='/home' component={SearchFlight} exact /> */}
          <Route path='/home' component={HomePage} exact />
          <Route path='/profile' component={Profilepage} />
          <Route path='/flightBooking' component={FlightBooking} />
          <Route path='/travellerInfo' component={TravellerInfo} />

          <Route path='/login' component={Login} exact />
          <Route path='/signup' component={Signup} exact />
          <Route path='/searchflights' component={SearchFlight} exact />
          <Route path='/displayflights' component={DisplayFlights} exact />
        </Switch>
      </div>
    );
  }
}
// Export The Main Component
export default Main;
