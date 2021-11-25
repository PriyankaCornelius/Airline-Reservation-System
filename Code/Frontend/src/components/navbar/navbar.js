import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Image } from 'react-bootstrap';
import './navbar.css';
// #fb7a00

class Navheader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () => {
    cookie.remove('cookie', { path: '/' });
    sessionStorage.clear();
  };

  render() {
    let isloggedin = null;
    if (cookie.load('cookie')) {
      console.log('Able to read cookie');
      const profilepic = sessionStorage.getItem('profilepic');
      isloggedin = (
        <ul className='nav navbar-nav navbar-right'>
          <li>
            <Button className='Home-default' variant='default'>
              <Link to='/dashboard'> Home </Link>
            </Button>
          </li>
          <li>
            <Image
              src={profilepic}
              className='avatar'
              alt='profile pic'
              roundedCircle
            />
          </li>
          <li>
            Hi, {sessionStorage.getItem('username')}{' '}
            {sessionStorage.getItem('mileage_reward')}{' '}
            {/* <Dropdown id='nav-dropdown' default>
              Hi, {sessionStorage.getItem('username')}{' '}
              {sessionStorage.getItem('mileage_reward')}
              <Dropdown.Toggle variant='default' />
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link
                    className='logout-class'
                    to='/'
                    onClick={this.handleLogout}
                  >
                    Logout
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
          </li>
          <li>
            <Link className='nav-link1' to='/profile'>
              My Profile{' '}
            </Link>
          </li>
          <li>
            <Link className='logout-class' to='/' onClick={this.handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      console.log('Not Able to read cookie');
      isloggedin = (
        <ul className='nav navbar-nav navbar-right'>
          <li>
            <Button className='login-default'>
              <Link to='/login'>Login </Link>
            </Button>

            <Button className='Signup-default'>
              <Link to='/signup'>Create Account</Link>
            </Button>
          </li>
        </ul>
      );
    }
    return (
      <div>
        <Navbar className='navbar-default'>
          <Navbar.Brand className='Navbar-Brand' variant='light' href='/'>
            <img
              src='/Icon_flight.png'
              className='icon'
              alt='icon'
              style={{
                marginBottom: '2rem',
              }}
            />
            <span
              className='NavItem'
              style={{
                marginBottom: '2rem',
                color: 'white',
              }}
            >
              Airline Reservation System
            </span>
          </Navbar.Brand>

          <Navbar.Collapse className='nav navbar-nav navbar-right'>
            {/* <ul class='nav navbar-nav navbar-right'> */}
            <span
              className=''
              style={{
                marginLeft: '-20rem',
                marginRight: '0.5rem',
                color: 'white',
              }}
            >
              Login to view balance points{' '}
            </span>
            <Nav>{isloggedin}</Nav>
            {/* </ul> */}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
export default Navheader;
