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
      signUpDone: false,
      firstnameerrors: '',
      emailerrors: '',
      doberrors: '',
      contacterrors: '',
      countrycodeerrors: '',
      passworderrors: '',
      roleerrors: '',
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
  roleChanged = (e) => {
    const userRole = e.target.value;
    this.setState({
      roleId: parseInt(userRole),
    });
  };
  isformvalid = () => {
    let formisvalid = true;
    const formerrors = {
      firstnameerrors: '',
      emailerrors: '',
      doberrors: '',
      contacterrors: '',
      countrycodeerrors: '',
      passworderrors: '',
      roleerrors: '',
    };

    const emailpattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,4})$/;
    // const phnpattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    const phnpattern = /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    const countrycodepattern = /^(\+\d{1,2})/;
    const dobpattern = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
    const pwdpattern =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,50}$/;

    const {
      firstName,
      email,
      phoneNumber,
      dob,
      countryCode,
      password,
      roleId,
    } = this.state;

    if (firstName.length === 0) {
      formisvalid = false;
      formerrors.firstnameerrors = 'FirstName cannot be blank!';
      console.log(formerrors.firstnameerrors);
    }

    if (!emailpattern.test(email)) {
      formisvalid = false;
      if (email.length === 0) {
        formerrors.emailerrors = 'Email address cannot be blank!';
      } else {
        formerrors.emailerrors = 'Email ID is not Valid!';
      }
      console.log(formerrors.emailerrors);
    }

    if (!pwdpattern.test(password)) {
      formisvalid = false;
      formerrors.passworderrors =
        'Password is not valid and must contain minimum 8 characters with a numeric, special character , lower and upper case letters!';
      console.log(formerrors.passworderrors);
    }

    if (!dobpattern.test(dob) && dob.length > 0) {
      formisvalid = false;
      formerrors.doberrors = 'Date of birth not of format "YYYY-MM-DD"!';
      console.log(formerrors.doberrors);
    }

    if (roleId === 0) {
      formisvalid = false;
      formerrors.roleerrors = 'Please enter your role!';
    }

    if (phoneNumber.length < 1 && countryCode.length > 0) {
      formisvalid = false;
      formerrors.countrycodeerrors = 'Please enter phone number!';
      console.log(formerrors.countrycodeerrors);
    }

    if (!countrycodepattern.test(countryCode) && countryCode.length > 0) {
      console.log('here');
      formisvalid = false;
      formerrors.countrycodeerrors = 'Country Code is not valid!';
      console.log(formerrors.countrycodeerrors);
    }

    if (!phnpattern.test(phoneNumber) && phoneNumber.length > 0) {
      formisvalid = false;
      formerrors.contacterrors = 'Phone Number is not valid!';
      console.log(formerrors.contacterrors);
    }

    this.setState((prevstate) => ({
      ...prevstate,
      ...formerrors,
    }));
    return formisvalid;
  };

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
      roleId: this.state.roleId,
    };
    console.log(signupDetails);

    const formisvalidated = this.isformvalid();

    if (formisvalidated) {
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

            /*
             sessionStorage.setItem('personid', response.data[0].person_id);
              sessionStorage.setItem('username', response.data[0].f_name);
              sessionStorage.setItem('useremail', response.data[0].email);
              sessionStorage.setItem(
                'profilepic',
                response.data[0].profilePicture
              );
              //2->Passenger 1-> Employee
              sessionStorage.setItem(
                'person_role',
                response.data[0].person_role_id
              );
              sessionStorage.setItem(
                'customer_flyernum',
                response.data[0].customer_flyer_num
              );
              sessionStorage.setItem(
                'mileage_reward',
                response.data[0].mileage_reward
              );

              sessionStorage.setItem(
                'userDetails',
                JSON.stringify(userDetails)
              );
            */
            sessionStorage.setItem('personid', response.data.personId);
            sessionStorage.setItem('username', response.data.firstName);
            sessionStorage.setItem('useremail', response.data.email);
            sessionStorage.setItem('profilepic', response.data.profilePicture);
            sessionStorage.setItem(
              'person_role',
              signupDetails.roleId
            );
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
    }
  };

  render() {
    if (this.state.signUpDone) {
      this.props.history.push({
        pathname: '/searchFlights',
        ticketNumber: 0,
      });
    }
    const {
      firstnameerrors,
      emailerrors,
      contacterrors,
      doberrors,
      countrycodeerrors,
      roleerrors,
      passworderrors,
    } = this.state;

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

          <div
            style={{
              background: 'white',
              height: '900px',
              marginTop: '2%',
              width: '35%',
              marginLeft: '33%',
              borderRadius: '15px',
            }}
          >
            <div style={{ marginLeft: '2%', paddingTop: '8px' }}>
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
                      {firstnameerrors && (
                        <span className='errmsg' style={{ color: 'maroon' }}>
                          {' '}
                          {firstnameerrors}{' '}
                        </span>
                      )}{' '}
                      <br />
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
                      placeholder='YYYY-MM-DD'
                      onChange={this.dobChanged}
                    ></input>
                    {doberrors && (
                      <span className='errmsg' style={{ color: 'maroon' }}>
                        {' '}
                        {doberrors}{' '}
                      </span>
                    )}
                    <br />
                    <div className='signup-email-passwd'>
                      <strong>Email address</strong>
                      <input
                        type='email'
                        name='custEmail'
                        placeholder='Email'
                        className='signup-email'
                        onChange={this.emailChanged}
                      ></input>
                      {emailerrors && (
                        <span className='errmsg' style={{ color: 'maroon' }}>
                          {' '}
                          {emailerrors}{' '}
                        </span>
                      )}
                      <br />
                      <strong>Password</strong>
                      <input
                        type='password'
                        name='custPasswd'
                        placeholder='Password'
                        onChange={this.passwordChanged}
                      ></input>
                      {passworderrors && (
                        <span className='errmsg' style={{ color: 'maroon' }}>
                          {' '}
                          {passworderrors}{' '}
                        </span>
                      )}
                      <br />
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
                      {roleerrors && (
                        <span className='errmsg' style={{ color: 'maroon' }}>
                          {' '}
                          {roleerrors}{' '}
                        </span>
                      )}
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
                      {countrycodeerrors && (
                        <span className='errmsg' style={{ color: 'maroon' }}>
                          {' '}
                          {countrycodeerrors}{' '}
                        </span>
                      )}
                      <br />
                      <strong>Phone Number</strong>

                      <input
                        type='text'
                        name='phoneNumber'
                        placeholder='Phone Number'
                        onChange={this.phnNumberChanged}
                      ></input>
                      {contacterrors && (
                        <span className='errmsg' style={{ color: 'maroon' }}>
                          {' '}
                          {contacterrors}{' '}
                        </span>
                      )}
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
