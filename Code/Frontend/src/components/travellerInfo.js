import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from 'axios';

class TravellerInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      middlename: '',
      lastname: '',
      dob: '',
      passportNumber: '',
      mileage_reward: '',
      passporterrrors: '',
    };
  }
  componentDidMount() {
    // sessionStorage.setItem('personid', 1);
    const personid1 = sessionStorage.getItem('personid');
    let userDetails=JSON.parse(sessionStorage.getItem('userDetails'));
    this.setState({
      personid: personid1,
      passportNumber:userDetails.passport_num
    });
    
    
    
    
    this.getTravellerInfo(personid1);
  }
  getTravellerInfo = (personid) => {
    axios
      .get(`http://localhost:3001/getuserdetails/${personid}`, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((response) => {
        console.log('response.data');
        console.log(response.data);
        this.setState({
          firstname: response.data[0].f_name,
          middlename: response.data[0].m_name,
          lastname: response.data[0].l_name,
          dob: response.data[0].dob,
          passportNumber: response.data[0].passport_num,
          mileage_reward: response.data[0].mileage_reward,
        });
        localStorage.setItem('mileageRewardBalance', this.state.mileage_reward);
      })
      .catch((err) => console.log(err));
  };
  firstnamechangeHandler = (e) => {
    this.setState({
      firstname: e.target.value,
    });
  };
  middlenamechangeHandler = (e) => {
    this.setState({
      middlename: e.target.value,
    });
  };
  lastnamechangeHandler = (e) => {
    this.setState({
      lastname: e.target.value,
    });
  };
  dobChangeHandler = (e) => {
    this.setState({
      dob: e.target.value,
    });
  };
  passportNumberChangeHandler = (e) => {
    this.setState({
      passportNumber: e.target.value,
    });

    let userDetails=JSON.parse(sessionStorage.getItem('userDetails'));
    userDetails.passportNumber=e.target.value;
    sessionStorage.setItem("userDetails",JSON.stringify(userDetails));
  };
  genderChangeHandler = (e) => {
    this.setState({
      gender: e.target.value,
    });
    let userDetails=JSON.parse(sessionStorage.getItem('userDetails'));
    userDetails.gender=e.target.value;
    sessionStorage.setItem("userDetails",JSON.stringify(userDetails));
  };
  isformvalid = () => {
    let formisvalid = true;
    const formerrors = {
      passporterrrors: '',
    };

    const { passportNumber } = this.state;

    if (passportNumber.length == 0) {
      formisvalid = false;

      formerrors.passporterrrors = 'Passport Number cannot be blank!';

      console.log(formerrors.emailerrors);
    }

    this.setState((prevstate) => ({
      ...prevstate,
      ...formerrors,
    }));
    return formisvalid;
  };

  handleSubmit = (e) => {
    if (this.isformvalid()) {
      e.preventDefault();
      console.log('inside form valid');

      const departingflightSelected = JSON.parse(
        sessionStorage.getItem('departingflightSelected')
      );
      const returningflightSelected = JSON.parse(
        sessionStorage.getItem('returningFlightSelected')
      );

      departingflightSelected['firstname'] = this.state.firstname;
      departingflightSelected['middlename'] = this.state.middlename;
      departingflightSelected['lastname'] = this.state.lastname;
      departingflightSelected['dob'] = this.state.dob;
      departingflightSelected['passportNumber'] = this.state.passportNumber;
      departingflightSelected['gender'] = this.state.gender;
      sessionStorage.setItem(
        'departingflightSelected',
        JSON.stringify(departingflightSelected)
      );

      if (returningflightSelected) {
        returningflightSelected['firstname'] = this.state.firstname;
        returningflightSelected['middlename'] = this.state.middlename;
        returningflightSelected['lastname'] = this.state.lastname;
        returningflightSelected['dob'] = this.state.dob;
        returningflightSelected['passportNumber'] = this.state.passportNumber;
        returningflightSelected['gender'] = this.state.gender;
        sessionStorage.setItem(
          'returningFlightSelected',
          JSON.stringify(returningflightSelected)
        );
      } else {
        console.log('no return tkt');
      }
    }
   

  };
  render() {
    const { passporterrrors } = this.state;
    return (
      <div>
        <h1>Traveller details</h1>
        <Box component='form' noValidate onSubmit={this.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                id='f_name'
                name='f_name'
                label='First Name'
                fullWidth
                autoComplete='f_name'
                variant='standard'
                value={this.state.firstname}
                onChange={this.firstnamechangeHandler}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id='m_name'
                name='m_name'
                label='Middle Name'
                fullWidth
                autoComplete='Middle Name'
                variant='standard'
                value={this.state.middlename}
                onChange={this.middlenamechangeHandler}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id='l_name'
                name='l_name'
                label='Last Name'
                fullWidth
                autoComplete='Last Name'
                variant='standard'
                value={this.state.lastname}
                onChange={this.lastnamechangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='passport_num'
                name='passport_num'
                label='Passport Number'
                fullWidth
                autoComplete='Passport Number'
                variant='standard'
                value={this.state.passportNumber}
                onChange={this.passportNumberChangeHandler}
              />
            </Grid>
            {passporterrrors && (
              <span className='errmsg' style={{ color: 'maroon' }}>
                {' '}
                {passporterrrors}{' '}
              </span>
            )}
            <br />
            <Grid item xs={12} sm={6}>
              <TextField
                id='dob'
                name='dob'
                label='Date of Birth'
                fullWidth
                autoComplete='Date of Birth'
                variant='standard'
                value={this.state.dob}
                onChange={this.dobChangeHandler}
                type='date'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id='gender'
                name='gender'
                label='Gender'
                fullWidth
                autoComplete='Gender'
                variant='standard'
                value={this.state.gender}
                onChange={this.genderChangeHandler}
              />
            </Grid>
            <Button type='submit' variant='contained' sx={{ mt: 3, ml: 50 }}>
              Submit
            </Button>
          </Grid>
        </Box>
      </div>
    );
  }
}

export default TravellerInfo;
