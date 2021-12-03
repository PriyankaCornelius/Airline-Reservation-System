import React, { Component } from 'react';
import { url } from '../Constants';
import './Signup.css';
import axios from 'axios';
import LoginHeader from '../Login/Header/LoginHeader';
import Grid from '@mui/material/Grid';
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      middleName: '',
      phoneNumber: '',
      countryCode: '',
      dob: '',
      roleId: 0,
      email: '',
      password: '',
      personId: 0,
      signUpDone: false
     
    };
  }
  firstNameChanged = (e) => {
    const name = e.target.value;
    this.setState({
      firstName: name,
    });
  };
  middleNameChanged = (e) => {
    const name = e.target.value;
    this.setState({
      middleName: name,
    });
  };
  lastNameChanged = (e) => {
    const name = e.target.value;
    this.setState({
      lastName: name,
    });
  };
  dobChanged = (e) => {
    const dob = e.target.value;
    this.setState({
      dob: dob,
    });
  };
  emailChanged = (e) => {
    const email = e.target.value;
    this.setState({
      email: email,
    });
  };
  passwordChanged = (e) => {
    const passwd = e.target.value;
    this.setState({
      password: passwd,
    });
  };
  phnNumberChanged = (e) => {
    const phnNumber = e.target.value;
    this.setState({
      phoneNumber: phnNumber,
    });
  };
  countryCodeChanged = (e) => {
    const countryCode = e.target.value;
    this.setState({
      countryCode: countryCode,
    });
  };
  roleChanged=(e)=>{
    const userRole=e.target.value;
    this.setState({
      roleId:parseInt(userRole)
    })
  }
  signUp = (e) => {
    //var headers = new Headers();
    //headers.append("Access-Control-Allow-Credential",true);
    e.preventDefault();
    const signupDetails = {
      firstName: this.state.firstName,
      middleName: this.state.middleName,
      lastName: this.state.lastName,
      dob: this.state.dob,
      email: this.state.email,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber,
      countryCode: this.state.countryCode,
      roleId:this.state.roleId
    };
    console.log(signupDetails);

    axios
      .post(url + '/signup', signupDetails)
      .then((response) => {
        console.log(response);
        console.log('Status Code : ', response.status);
        if (response.status === 201) {
          console.log(response);
          const userDetails = {
            personId: response.data.personId,
            flyerId: response.data.flyerNumber,
            firstName: this.state.firstName,
            middleName: this.state.middleName,
            lastName: this.state.lastName,
            dob: this.state.dob,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            countryCode: this.state.countryCode,
            roleId: this.state.roleId,
            signUpDone: true,
          };
          sessionStorage.setItem('personid', response.data.personId);
          sessionStorage.setItem('username', response.data.firstName);
          sessionStorage.setItem('useremail', response.data.email);
          sessionStorage.setItem('profilepic', response.data.profilePicture);
          sessionStorage.setItem(
            'customer_flyernum',
            response.data.customerFlyerNum
          );
          sessionStorage.setItem(
            'mileage_reward',
            response.data.mileageReward
          );
          sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
          this.setState({
            signUpDone: true,
            personId: response.data.personId,
            roleId: response.data.roleId,
          });
        } else {
          this.setState({
            signUpDone: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.errorDesc);
        this.setState({
          signUpDone: false,
          // errorMsg: error.response.data.errorDesc
        });
      });
  };

  render() {
    if (this.state.signUpDone) {
      this.props.history.push({
        pathname: '/searchFlights',
        ticketNumber:0,
      });
    }

    return (
      <div className='main-container'>
          <Grid
              item
              xs={12}
             
              sx={{
                backgroundImage:
                  'url(https://as1.ftcdn.net/v2/jpg/02/43/57/78/1000_F_243577802_0G1xRWDLeKlAyMnJ1KlJN4GuhZPe2QFt.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '1000px',
              }}
          >
        <LoginHeader />

        <div style = {{background:"white", height: "900px", marginTop:"2%", width: "35%", marginLeft: "33%", borderRadius: "15px"}}>
        <div style = {{marginLeft: "2%", paddingTop: "8px"}}>
        <form onSubmit={this.signUp}>
          <div className='signup-container'>
            <div className='signup-content'>
              <div>
                {' '}
                <strong> First Name</strong>
              </div>

              <input
                type='text'
                name='firstName'
                placeholder='First Name'
                onChange={this.firstNameChanged}
              />
              <div>
                {' '}
                <strong> Middle Name</strong>
              </div>
              <input
                type='text'
                name='middleName'
                placeholder='Middle Name'
                onChange={this.middleNameChanged}
              />

              <div>
                {' '}
                <strong>Last Name</strong>
              </div>
              <input
                type='text'
                name='lastName'
                placeholder='Last Name'
                onChange={this.lastNameChanged}
              />

              <br />
              <strong>DOB</strong>

              <input
                type='text'
                name='dob'
                placeholder='mm/dd/yyyy'
                onChange={this.dobChanged}
              ></input>
              <div className='signup-email-passwd'>
                <strong>Email address</strong>
                <input
                  type='email'
                  name='custEmail'
                  placeholder='Email'
                  className='signup-email'
                  onChange={this.emailChanged}
                ></input>
                <strong>Password</strong>
                <input
                  type='password'
                  name='custPasswd'
                  placeholder='Password'
                  onChange={this.passwordChanged}
                ></input>
               <strong>Role</strong>
               <br />
                 <select
                  name='roles'
                  value={this.state.role}
                  onChange={this.roleChanged}
                >
                  <option value='0'>Select Role </option>
                  <option value='1'>Employee</option>
                  <option value='2'>Customer</option>
                </select>
                <br />
                <strong>Country Code</strong>
                <br />
                <select
                  name='countryCodes'
                  value={this.state.countryCode}
                  onChange={this.countryCodeChanged}
                >
                  <option value='0'>Select Country Code </option>
                  <option value='+1'>United States(+1)</option>
                  <option value='+91'>India(+91)</option>
                </select>
                <br />
                <strong>Phone Number</strong>

                <input
                  type='text'
                  name='phoneNumber'
                  placeholder='Phone Number'
                  onChange={this.phnNumberChanged}
                ></input>

                <button className='signup-btn' type='submit'>
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </form>
        </div>
        </div>
        </Grid>
      </div>
    );
  }
}

export default Signup;
