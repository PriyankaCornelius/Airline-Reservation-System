import React, { Component } from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Profilepage from './profilePage/profilePage';
import FlightBooking from './flightBooking';
import TravellerInfo from './travellerInfo';
class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* <Route exact path="/" component={LandingPage} /> */}
          <Route path='/profile' component={Profilepage} />
          <Route path='/flightBooking' component={FlightBooking} />
          <Route path='/travellerInfo' component={TravellerInfo} />

        </Switch>
      </div>
    );
  }
}
// Export The Main Component
export default Main;
