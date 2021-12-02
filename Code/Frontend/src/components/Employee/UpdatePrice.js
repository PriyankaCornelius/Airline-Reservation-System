import React, { Component } from 'react';
import axios from 'axios';
import { url } from '../Constants';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import Navheader from '../navbar/navbar';
import '../navbar/navbar.css';
import './UpdatePrice.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import TimePicker from 'react-time-picker';


class UpdatePrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };   
  }

  componentDidMount() {
    

    axios.defaults.withCredentials = true;
      // make a post request with the user data
      axios
        .get(url + "/getAirports")
        .then((response) => {
            console.log(response);

            axios
            .get(url + "/getAllFlights")
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err.response);          
                alert("Something went wrong");       
            })
        })
        .catch((err) => {
            console.log(err.response);          
            alert("Something went wrong");       
        })        
  } 

 
  render() {
    let redirectVar = null;
    if (!cookie.load('cookie')) {
      redirectVar = <Redirect to='/' />;
    }   
    return (
     <div>
         <Navheader></Navheader>
         <div>
             <select id = 'dropdownFlightNum'>

             </select>
         </div>
    </div>
    );
  }
}

export default UpdatePrice;
