import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup/Signup';


class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                {/* <Route path="/signup" component={Signup} exact /> */}
                <Route path="/login" component={Login} exact />
                <Route path="/signup" component={Signup} exact />
                   
            </div>
        )
    }
}

export default Main;