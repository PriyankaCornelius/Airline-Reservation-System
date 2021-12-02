import React, { Component } from 'react';
import axios from 'axios';
import { url } from '../Constants';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import Navheader from '../navbar/navbar';
import '../navbar/navbar.css';
import './AddFlight.css';
import 'react-datepicker/dist/react-datepicker.css';
import Grid from '@mui/material/Grid';

class UpdateFlightPrice extends Component {
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
            var airportMap = new Map([[Int32Array.prototype, [String.prototype]]]);

            for(var i = 0; i <response.data.length; i++)
            {
              airportMap.set(response.data[i].airport_id, response.data[i]);
            }

            this.setState({
              airportMap : airportMap
            })

            axios
            .get(url + "/getAllFlights")
            .then((response) => {
                console.log(response);
                var html = '<option value = "">Select Flight Number</option>';
                var map = new Map([[Int32Array.prototype, [String.prototype]]]);

                for(var i = 0; i < response.data.length; i++)
                {
                  if(response.data[i].active.data[0] == 0)
                  {continue;}

                  map.set(response.data[i].flight_id, response.data[i]);
                  html += '<option value = "' + response.data[i].flight_id + '">' + response.data[i].flight_num + '</option>';
                }

                this.setState({
                  flightMap : map
                })
                document.getElementById('dropdownFlightNum').innerHTML = html;

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

  onChangeFlightnum = () => {
    const flightNum = document.getElementById('dropdownFlightNum').value;
    var html = '';
    const arr = this.state.flightMap.get(parseInt(flightNum));
    html += "<table id = 'tblUpdatePrice'>";
    html += '<tr><td>Departure Time: </td><td><label>' + arr.departure_time + '</td></label></tr>';
    html += '<tr><td>Arrival Time: </td><td><label>' + arr.arrival_time + '</td></label><tr/>';
    html += '<tr><td>Arrival Airport:</td><td><label>' + this.state.airportMap.get(parseInt(arr.origin_airport_id)).airport_name + '</td></label><tr/>';
    html += '<tr><td>Destination Airport: </td><td><label>' + this.state.airportMap.get(parseInt(arr.destination_airport_id)).airport_name + '</label><tr/>';
    html += '<tr><td>Flight Price:</td><td> <input style = "border: 2px solid;border-radius: 5px;" type = "number" id = "txtFlightPrice" value =' + arr.flight_price + '></input><tr/>';
    html += "</table><br/>";
    html += '<button id = "btnUpdateFlightPrice">Update Flight Price</button>';
    document.getElementById('divFlightDetails').innerHTML = html;
    document.getElementById('divFlightDetails').style.display = '';
    document.getElementById('btnUpdateFlightPrice').onclick = this.cancelFlight;
  }
 
  cancelFlight = () => {
    const data = {
      flightId: document.getElementById('dropdownFlightNum').value,
      flightPrice: document.getElementById('txtFlightPrice').value
    }
    axios
    .post(url + "/updateFlightPrice", data)
    .then((response) => {
      console.log('Status Code : ', response.status);
      if (response.status === 200) {
         alert("Flight price updated successfully");
         window.location.reload();
      }
    })
    .catch((err) => {
      console.log(err.response);
      //alert(err.response.data);
      alert("Something went wrong");

    //   this.setState({
    //     errorMessage: err.response.data,
    //   });
    });    
  }

  render() {
    let redirectVar = null;
    if (!cookie.load('cookie')) {
      redirectVar = <Redirect to='/' />;
    }   
    return (
     <div>
       <Grid
              item
              xs={12}
             
              sx={{
                backgroundImage:
                  'url(https://as1.ftcdn.net/v2/jpg/02/43/57/78/1000_F_243577802_0G1xRWDLeKlAyMnJ1KlJN4GuhZPe2QFt.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
              }}
          >
         <Navheader></Navheader>
         <div style = {{marginLeft:"29%", background:"white"}} id = "divBorder">
          <label style = {{fontSize : "30px"}}>Update Flight Price</label>
         <div>
             <select id = 'dropdownFlightNum' onChange = {this.onChangeFlightnum}>                
             </select>
          </div>
          <div id = 'divFlightDetails' style = {{marginTop: "15px", display: "none"}}>
              
          </div>         
         </div>
         </Grid>
    </div>
    );
  }
}

export default UpdateFlightPrice;
