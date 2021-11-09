import React, { Component } from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Profilepage from './profilePage/profilePage';

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* <Route exact path="/" component={LandingPage} /> */}
          <Route path='/profile' component={Profilepage} />
        </Switch>
      </div>
    );
  }
}
// Export The Main Component
export default Main;
