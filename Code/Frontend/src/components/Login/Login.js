import { url } from '../Constants';
import React, { Component } from 'react';
import axios from 'axios';
import LoginHeader from '../Login/Header/LoginHeader';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import './Login.css';
import Grid from '@mui/material/Grid';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailerrrors: '',
      passworderrors: '',
    };
  }
  loginEmailChanged = (e) => {
    const loginEmail = e.target.value;
    this.setState({
      email: loginEmail,
    });
  };
  passwordChanged = (e) => {
    const loginPasswd = e.target.value;
    this.setState({
      password: loginPasswd,
    });
  };
  isformvalid = () => {
    let formisvalid = true;
    const formerrors = {
      emailerrors: '',

      passworderrors: '',
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
      email,

      password,
    } = this.state;

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

    this.setState((prevstate) => ({
      ...prevstate,
      ...formerrors,
    }));
    return formisvalid;
  };

  checkAuthentication = (e) => {
    var headers = new Headers();
    e.preventDefault();
    const loginDetails = {
      email: this.state.email,
      password: this.state.password,
    };
    const formisvalidated = this.isformvalid();

    if (formisvalidated) {
      axios.defaults.withCredentials = true;

      axios.defaults.withCredentials = true;

      axios
        .post(url + '/login', loginDetails)
        //axios
        //.post( "http://localhost:8080/api/test/login", loginDetails)
        .then((response) => {
          console.log('Status Code : ', response.status);
          console.log(response);

          if (response.status === 200) {
            console.log(response.data);
            // if (response.data[0].person_role_id === 2) {

          
              const userDetails = {
                personId: response.data[0].person_id,
                firstName: response.data[0].f_name,
                middleName: response.data[0].m_name,
                lastName: response.data[0].l_name,
                dob: response.data[0].dob,
                email: response.data[0].email,
                phoneNumber: response.data[0].contact,
                countryCode: response.data[0].contact_country_code,
                roleId: response.data[0].person_role_id,
                flyerNumber: response.data[0].customer_flyer_num,
                profilePicture: response.data[0].profilePicture,
              };
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
            // } else {
            //   const userDetails = {
            //     personId: response.data[0].person_id,
            //     firstName: response.data[0].f_name,
            //     middleName: response.data[0].m_name,
            //     lastName: response.data[0].l_name,
            //     dob: response.data[0].dob,
            //     email: response.data[0].email,
            //     phoneNumber: response.data[0].contact,
            //     countryCode: response.data[0].contact_country_code,
            //     roleId: response.data[0].person_role_id,
            //     profilePicture: response.data[0].profilePicture,
            //     airportId: response.data[0].airport_id,
            //   };
            //   sessionStorage.setItem('personid', response.data[0].person_id);
            //   sessionStorage.setItem('username', response.data[0].f_name);
            //   sessionStorage.setItem('useremail', response.data[0].email);
            //   sessionStorage.setItem(
            //     'profilepic',
            //     response.data[0].profilePicture
            //   );
            //   sessionStorage.setItem(
            //     'customer_flyernum',
            //     response.data[0].customer_flyer_num
            //   );
            //   sessionStorage.setItem(
            //     'mileage_reward',
            //     response.data[0].mileage_reward
            //   );

            //   sessionStorage.setItem(
            //     'userDetails',
            //     JSON.stringify(userDetails)
            //   );
            // }
            this.setState({
              loginSuccessful: true,
            });
          } else {
            this.setState({
              loginSuccessful: false,
            });
          }
        })
        .catch((error) => {
          console.log(error.response);
          alert("Enter Valid Credentials");
          this.setState({
            loginSuccessful: false,
            errorMsg: error.response.data.errorDesc,
          });
        });
    }
  };

  responseGoogleSuccess = (response) => {
    console.log(response);
    let userInfo = {
      name: response.profileObj.name,
      emailId: response.profileObj.email,
    };
    this.setState({ userInfo, isLoggedIn: true });
  };

  // Error Handler
  responseGoogleError = (response) => {
    console.log(response);
  };
  render() {
    let redirectVar = null;
    const userDetails=sessionStorage.getItem("userDetails");
    if (!userDetails===null||!userDetails===undefined) {
      redirectVar = <Redirect to='/searchFlights' />;
    }
    if (this.state.loginSuccessful) {
      this.props.history.push({
        pathname: '/searchflights',
        ticketNumber: 0,
      });
    }
    const {
      emailerrors,

      passworderrors,
    } = this.state;

    return (
      <div className='main-container'>
        {redirectVar}
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
          <LoginHeader />
          <div
            style={{
              background: 'white',
              height: '600px',
              width: '30%',
              marginLeft: '34%',
              borderRadius: '15px',
            }}
          >
            <form onSubmit={this.checkAuthentication}>
              <div className='login-container' style={{ opacity: '1.0' }}>
                <div className='login-content'>
                  <div className='login-email-label'>Email address</div>
                  <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    onChange={this.loginEmailChanged}
                    size='30'
                    required
                  />

                  {emailerrors && (
                    <span className='errmsg' style={{ color: 'maroon' }}>
                      {' '}
                      {emailerrors}{' '}
                    </span>
                  )}
                  <br />

                  <div className='login-email-label'>Password</div>
                  <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    onChange={this.passwordChanged}
                    size='30'
                    required
                  />

                  {passworderrors && (
                    <span className='errmsg' style={{ color: 'maroon' }}>
                      {' '}
                      {passworderrors}{' '}
                    </span>
                  )}
                  <br />

                  <br />
                  <button type='submit'>Log in</button>
                </div>
              </div>
            </form>
          </div>
          {/* <GoogleLogin
              clientId="857063878187-8os7dud08rq5prsjvss674o1pnuafcse.apps.googleusercontent.com"
              buttonText="Sign In with Google"
              onSuccess={this.responseGoogleSuccess}
              onFailure={this.responseGoogleError}
              isSignedIn={true}
             cookiePolicy={"single_host_origin"}
            /> */}
        </Grid>
      </div>
    );
  }
}
export default Login;
