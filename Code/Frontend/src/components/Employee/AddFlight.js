import React, { Component } from 'react';
import axios from 'axios';
import { url } from '../Constants';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
//import Navheader from '../navbar/navbar';
import '../navbar/navbar.css';
import './AddFlight.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import TimePicker from 'react-time-picker';
import Grid from '@mui/material/Grid';
import Navheader from '../navigation';
import EmployeeNavBar from '../employeeNavigation';


class AddFlight extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };   
  }

  componentDidMount() {
    this.setState({
      time: new Date(),
      depTime: new Date(),
      arrivalTime: new Date()
    })
    // sessionStorage.setItem('personid', 1);
    // const personid1 = JSON.parse(
    //   sessionStorage.getItem('userDetails')
    // ).personId;
    const personid1 = sessionStorage.getItem('personId');
    this.setState({
      personid: personid1,
      endDate: new Date(),
      startDate: new Date()
    });

    axios.defaults.withCredentials = true;
      // make a post request with the user data
      axios
        .get(url + "/getAirports")
        .then((response) => {
          console.log('Status Code : ', response.status);
          this.setState({
            airportsList : response.data
          });
         
          var htmlSource =  document.getElementById('dropdownSource').innerHTML ;
          var htmlDestination =  document.getElementById('dropdownDestination').innerHTML ;
          var htmlSourceCity =  document.getElementById('dropdownSourceCity').innerHTML ;
          var htmlDestinationCity =  document.getElementById('dropdownDestinationCity').innerHTML ;
          var cities = new Map([[Int32Array.prototype, [String.prototype]]]);
          const set = new Set();

          for(var i = 0; i < response.data.length; i++)
          {
           
              if(set.has(response.data[i].country_name))
              {
                  const arr = cities.get(response.data[i].country_id);
                  arr.push(response.data[i]);                  
                  continue;
              }

              htmlSource += "<option value = '"+ response.data[i].country_id+"'>" + response.data[i].country_name+ "</option>";
              htmlDestination += "<option value = '"+ response.data[i].country_id+"'>" + response.data[i].country_name+ "</option>";             
              set.add(response.data[i].country_name);
              const arr = [];
              arr.push(response.data[i])
              cities.set(response.data[i].country_id, arr);
              
          }

          this.setState({
              countryCityBinding: cities
          })

          document.getElementById('dropdownSource').innerHTML = htmlSource;
          document.getElementById('dropdownDestination').innerHTML = htmlDestination;
          document.getElementById('dropdownSourceCity').innerHTML = htmlSourceCity;
          document.getElementById('dropdownDestinationCity').innerHTML = htmlDestinationCity;


          if (response.status === 200) {

            axios
            .get(url + "/getAircrafts")
            .then((response) => {
              console.log('Status Code : ', response.status);
              if (response.status === 200) {
                this.setState({
                    aircraftsList : response.data  
                  });

                  var htmlAircrafts = document.getElementById('dropdownAircraft').innerHTML;
                  for(var i = 0; i < response.data.length; i++)
                  {
                    htmlAircrafts += '<option value = ' + response.data[i].aircraft_id + '>' + response.data[i].aircraft_model+ '</option>';
                  }
        
                  document.getElementById('dropdownAircraft').innerHTML = htmlAircrafts;
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
        })
        .catch((err) => {
          console.log(err.response);
          alert("Something went wrong");
        //   this.setState({
        //     errorMessage: err.response.data,
        //   });
        });    
  } 

  checkValidation = () => {
    const srcCountryId = document.getElementById('dropdownSource').value;
    const desCountryId = document.getElementById('dropdownDestination').value;
    const srcAirportId = document.getElementById('dropdownSourceCity').value;
    const desAirportId = document.getElementById('dropdownDestinationCity').value;    
    const aircraftId = document.getElementById('dropdownAircraft').value;
    const numberOfStops = document.getElementById('dropdownNoOfStops').value;
    const depDate = document.getElementById('endDate').value;
    const arrivalDate = document.getElementById('startDate').value;
    const flightNum = document.getElementById('txtFlightNum').value;
    const flightPrice = document.getElementById('txtFlightPrice').value;
    const depTime = this.state.depTime;
    const arrivalTime = this.state.arrivalTime;

    
    if(flightPrice === '' || srcCountryId === '' || desCountryId === '' || srcAirportId === '' || desAirportId === '' || aircraftId === '' || numberOfStops === '' || depDate === '' || arrivalDate === '' || flightNum === '' || depTime === '' || arrivalTime === '')
      return null;

      const data = {
        arrivalTime : arrivalTime,
        departureTime : depTime,
        flightStatus : 'Scheduled',
        originAirportId: srcAirportId,
        destinationAirportId: desAirportId,
        aircraftId: aircraftId,
        flightNum: flightNum,
        routeDistance: '2500',
        numberOfStops: numberOfStops,
        arrivalDate: arrivalDate,
        departureDate: depDate,
        flightPrice: flightPrice
      }

      return data;
  }

  createFlight = () => {    
    const data = this.checkValidation();

    if(data == null)
    {
      alert("Please enter all the details");
      return;
    }    

    axios
    .post(url + "/addFlight", data)
    .then((response) => {
      console.log('Status Code : ', response.status);
      if (response.status === 200) {
         alert("Flight added successfully");
         this.setDefaultValues();
      }
    })
    .catch((err) => {
      console.log(err.response);
      //alert(err.response.data);
      alert("Flight number already exists.");

    //   this.setState({
    //     errorMessage: err.response.data,
    //   });
    });    
  }

  setDefaultValues = () => {
    document.getElementById('dropdownSource').value = '';
    document.getElementById('dropdownDestination').value = '';
    document.getElementById('dropdownSourceCity').value = '';
    document.getElementsByClassName('hiddenElements')[0].style.display = 'none';
    document.getElementsByClassName('hiddenElements')[1].style.display = 'none'; 
    document.getElementById('dropdownDestinationCity').value = '';  
    document.getElementById('dropdownAircraft').value = '';
    document.getElementById('dropdownNoOfStops').value = '';
    document.getElementById('endDate').value = '';
    document.getElementById('startDate').value = '';
    document.getElementById('txtFlightNum').value = '';
    document.getElementById('txtFlightPrice').value = '';
  }

  onChangeSourceCountry = (e) => {
      if(e.target.value == '')
        return;

        if(document.getElementById('dropdownSource').value === '' || document.getElementById('dropdownDestination').value === '')
          return;
      const src = this.state.countryCityBinding.get(parseInt(document.getElementById('dropdownSource').value));
      const des = this.state.countryCityBinding.get(parseInt(document.getElementById('dropdownDestination').value));

      var html = '<option value = "">Select Departure Airport</option>';
      for(var i = 0; i < src.length; i++)
      {
        html += "<option value = '"+ src[i].airport_id+"'>" + src[i].airport_name + ' - ' + src[i].city_name + "</option>";        
      }
      var htmldes =  '<option value = "">Select Arrival Airport</option>'
      for(var i = 0; i < des.length; i++)
      {
        htmldes += "<option value = '"+ des[i].airport_id+"'>" + des[i].airport_name + ' - ' + des[i].city_name + "</option>";
      }
      
      document.getElementById('dropdownSourceCity').innerHTML = html;
      document.getElementsByClassName('hiddenElements')[0].style.display = '';
      document.getElementsByClassName('hiddenElements')[1].style.display = '';      
      document.getElementById('dropdownDestinationCity').innerHTML = htmldes;
  }

  onChangeSourceCity = (e) => {
    const srcCity = document.getElementById('dropdownSourceCity').value;
    const desCity = document.getElementById('dropdownDestinationCity').value;

    if(srcCity === desCity)
    {
      alert("Source and destination airports cannot be same");
      e.target.value = '';
    }
  }

  returnstartDateChangeHandler = (e) => {
    var dateFromString = new Date(e.toString());
    let date = dateFromString.toLocaleDateString();
    date = date.slice(0, 11);
    let date1 = date.replace(/(\d\d)\/(\d\d)\/(\d{4})/, '$3-$1-$2');
    this.setState({
      returnDate: date1,
      startDate: new Date(date),
    });
  };
  returnEndDateChangeHandler = (e) => {
    var dateFromString = new Date(e.toString());
    let date = dateFromString.toLocaleDateString();
    date = date.slice(0, 11);
    let date1 = date.replace(/(\d\d)\/(\d\d)\/(\d{4})/, '$3-$1-$2');
    this.setState({
      returnDate: date1,
      endDate: new Date(date),
    });
  };
  onChangeDepTimePicker = (e) => {
    this.setState({
      depTime:e
    })
  }

  onChangeArrivalTimePicker = (e) => {
    this.setState({
      arrivalTime:e
    })
  }

  // onFocus = (e) => {
  //   document.getElementById('btnCreateFlight').style.background = 'yellow';
  // }
  render() {
    let redirectVar = null;
    const userDetails=sessionStorage.getItem("userDetails");
    if (userDetails===null||userDetails===undefined){
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
                height: '100%',
              }}
          >
         <EmployeeNavBar></EmployeeNavBar>

         <div id = 'divBorder' style = {{background: "white", marginLeft: "29%"}}>
           <label style = {{fontSize:"32px", marginBottom:"3%", marginLeft:"1%"}}>Add Flight</label>
         <table id = 'tblCreateFlight'>
           <tr>
             <td>Source Country:</td>
            <td>
              {/* <label>Source : </label> */}
              <select id = 'dropdownSource'  onChange ={this.onChangeSourceCountry}>
              <option value = ''>Select Source Country</option>  
              </select>
            </td>
           </tr>
           <tr>
           <td>Destination Country:</td>
            <td>
              {/* <label>Destination : </label> */}
              <select id = 'dropdownDestination' onChange ={this.onChangeSourceCountry}>  
              <option value = ''>Select Destination Country</option>            
              </select>
            </td>
          </tr>
          <tr class = 'hiddenElements' style = {{display:"none"}}>
           <td>Departure Airport:</td>
            <td>
              <select id = 'dropdownSourceCity'  onChange = {this.onChangeSourceCity}>            
              </select>
            </td>
          </tr>
          <tr class = 'hiddenElements' style = {{display:"none"}}>
          <td>Arrival Airport</td>
            <td>
              <select id = 'dropdownDestinationCity'  onChange = {this.onChangeSourceCity}>           
              </select>
            </td>
           </tr>
          
          <tr>
          <td>Aircraft Model:</td>
            <td>
              <select id = 'dropdownAircraft' >
                <option value = ''>Select Aircrafts</option>               
              </select>
            </td>
            </tr>
            <tr>
            <td>Number of Stops:</td>
            <td>
              <select id = 'dropdownNoOfStops'>
                <option>Select Number of stops</option>
                <option value = '0'>0</option>
                <option value = '1'>1</option>
                <option value = '2'>2</option>
                <option value = '3'>3</option>
                <option value = '4'>4</option>
                <option value = '5'>5</option>
              </select>  
            </td>
          </tr>
          <tr>
          <td>Departure Date:</td>
            <td>
              <DatePicker
                selected= {this.state.endDate}
                onChange={this.returnEndDateChangeHandler}
                id = 'endDate'
              />
            </td>
          </tr>
          <tr>
          <td>Arrival Date:</td>
            <td>
              <DatePicker
                selected= {this.state.startDate}
                onChange={this.returnstartDateChangeHandler}
                id = 'startDate'
              />
            </td>
          </tr>
          
            <tr>
            <td>Flight Number:</td>
            <td>
              <input type = 'number' class = 'numberClass' placeholder = 'Enter Flight Number' id = 'txtFlightNum'></input>
            </td>
          </tr>
          <tr>
            <td>
              Flight Price:
            </td>
            <td>
              <input type = 'number' class = 'numberClass' placeholder = 'Enter Flight Price' id = 'txtFlightPrice'></input>
            </td>
          </tr>
          
            <tr>
            <td>
              Departure Time:
            </td>
            <td>
              <TimePicker
              onChange={this.onChangeDepTimePicker}
              value={this.state.time}
              id = "endTime"
              />
             
            </td>
          </tr>
          <tr>
            <td>
              Arrival Time:
            </td>
            <td>
              <TimePicker
              onChange={this.onChangeArrivalTimePicker}
              value={this.state.time}
              id = "startTime"
              />
              
            </td>
          </tr>

         
         </table>
      
         <button id = 'btnCreateFlight' onClick = {this.createFlight}>Add Flight</button>  
         </div> 
         </Grid>   
     </div>
    );
  }
}

export default AddFlight;
