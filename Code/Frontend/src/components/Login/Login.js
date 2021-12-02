import { url } from '../Constants';
import React, { Component } from 'react';
import axios from 'axios';
import LoginHeader from '../Login/Header/LoginHeader';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import './Login.css';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
  checkAuthentication = (e) => {
    var headers = new Headers();
    e.preventDefault();
    const loginDetails = {
      email: this.state.email,
      password: this.state.password,
    };
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
          if (response.data[0].person_role_id === 2) {
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

            sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
          } else {
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
              profilePicture: response.data[0].profilePicture,
              airportId: response.data[0].airport_id,
            };
            sessionStorage.setItem('personid', response.data[0].person_id);
            sessionStorage.setItem('username', response.data[0].f_name);
            sessionStorage.setItem('useremail', response.data[0].email);
            sessionStorage.setItem(
              'profilepic',
              response.data[0].profilePicture
            );
            sessionStorage.setItem(
              'customer_flyernum',
              response.data[0].customer_flyer_num
            );
            sessionStorage.setItem(
              'mileage_reward',
              response.data[0].mileage_reward
            );

            sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
          }
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
        alert(error.response.data.errorDesc);
        this.setState({
          loginSuccessful: false,
          errorMsg: error.response.data.errorDesc,
        });
      });
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
    if (this.state.loginSuccessful) {
      this.props.history.push({
        pathname: '/home',
        userDetails: {
          email: this.state.email,
          personId: this.state.personId,
          firstName: this.state.firstName,
          middleName: this.state.middleName,
          lastName: this.state.lastName,
          dob: this.state.dob,
          phoneNumber: this.state.phoneNumber,
          countryCode: this.state.countryCode,
          roleId: this.state.roleId,
        },
      });
    }
    return (
      <div className='main-container'>
        <LoginHeader />
        <form onSubmit={this.checkAuthentication}>
          <div className='login-container'>
            <div className='login-content'>
              <div className='login-email-label'>Email address</div>
              <input
                type='email'
                name='email'
                placeholder='Email'
                onChange={this.loginEmailChanged}
                size="30"
                required
              />

              <div className='login-email-label'>Password</div>
              <input
                type='password'
                name='password'
                placeholder='Password'
                onChange={this.passwordChanged}
                size="30"
                required
              />
              <br />
              <button type='submit'>Log in</button>
            </div>
          </div>
        </form>
        {/* <GoogleLogin
              clientId="857063878187-8os7dud08rq5prsjvss674o1pnuafcse.apps.googleusercontent.com"
              buttonText="Sign In with Google"
              onSuccess={this.responseGoogleSuccess}
              onFailure={this.responseGoogleError}
              isSignedIn={true}
             cookiePolicy={"single_host_origin"}
            /> */}
      </div>
    );
  }
}
export default Login;
