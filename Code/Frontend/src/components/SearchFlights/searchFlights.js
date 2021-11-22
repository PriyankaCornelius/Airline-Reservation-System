import React, { Component } from 'react';
import axios from 'axios';
import { url } from '../Constants';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import Button from 'react-bootstrap/Button';
import { Form, Image } from 'react-bootstrap';
import { uploadFile } from 'react-s3';
import Navheader from '../navbar/navbar';

// import DefaultAvatar from '../../../public/Profile_photos/default_avatar.png'; // import DefaultAvatar from '../  Profile_photos/default_avatar.png';

import '../navbar/navbar.css';

class SearchFlight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: '',
      destination: '',
      roundtrip: false,
      middlename: '',
      departureDate: '',
      returnDate: '',
      redirecttohome: null,
      originerrors: '',
      destinationerrors: '',
      departureDateerrors: '',
      returnDateerrors: '',
    };

    // Bind the handlers to this class
    this.originChangeHandler = this.originChangeHandler.bind(this);
    this.destinationChangeHandler = this.destinationChangeHandler.bind(this);
    this.departureDateChangeHandler =
      this.departureDateChangeHandler.bind(this);
    this.returnDateChangeHandler = this.returnDateChangeHandler.bind(this);
    this.roundtripChangeHandler = this.roundtripChangeHandler.bind(this);
  }

  //   componentDidMount() {
  //     // sessionStorage.setItem('personid', 1);
  //     // const personid1 = JSON.parse(
  //     //   sessionStorage.getItem('userDetails')
  //     // ).personId;
  //     const personid1 = sessionStorage.getItem('personId');
  //     this.setState({
  //       personid: personid1,
  //     });
  //     this.getusercurrentdetails(personid1);
  //   }

  originChangeHandler = (e) => {
    this.setState({
      origin: e.target.value,
    });
  };
  destinationChangeHandler = (e) => {
    this.setState({
      destination: e.target.value,
    });
  };
  departureDateChangeHandler = (e) => {
    this.setState({
      departureDate: e.target.value,
    });
  };

  returnDateChangeHandler = (e) => {
    this.setState({
      returnDate: e.target.value,
    });
  };

  roundtripChangeHandler = (e) => {
    this.setState({
      roundtrip: e.target.value,
    });
  };

  isformvalid = () => {
    let formisvalid = true;
    const formerrors = {
      originerrors: '',
      destinationerrors: '',
      departureDateerrors: '',
      returnDateerrors: '',
    };

    const emailpattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,4})$/;
    const phnpattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    const dobpattern = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;

    const { origin, destination, departureDate, returnDate } = this.state;

    if (origin.length === 0) {
      formisvalid = false;
      formerrors.originerrors = 'Origin cannot be blank!';
      console.log(formerrors.originerrors);
    }
    if (destination.length === 0) {
      formisvalid = false;
      formerrors.destinationerrors = 'Destination cannot be blank!';
      console.log(formerrors.destinationerrors);
    }
    if (departureDate.length === 0) {
      formisvalid = false;
      formerrors.departureDateerrors = 'Departure Date cannot be blank!';
      console.log(formerrors.departureDateerrors);
    }
    if (returnDate.length === 0) {
      formisvalid = false;
      formerrors.returnDateerrors = 'Destination cannot be blank!';
      console.log(formerrors.returnDateerrors);
    }

    this.setState((prevstate) => ({
      ...prevstate,
      ...formerrors,
    }));
    return formisvalid;
  };

  submitsave = (e) => {
    e.preventDefault();
    const { origin, destination, departureDate, returnDate, roundtrip } =
      this.state;

    const formisvalidated = this.isformvalid();

    if (formisvalidated) {
      const data = {
        origin,
        destination,
        departureDate,
        returnDate,
        roundtrip,
      };
      console.log(data);

      axios
        .get(url + '/getflights', data)
        .then((response) => {
          // console.log('Status Code : ', response.status);
          if (response.status === 200) {
            console.log(response.data);

            //const redirectVar1 = <Redirect to="/dashboard" />;
            //this.setState({ redirecttohome: redirectVar1 });
          } else {
            this.setState({
              redirecttohome: null,
            });
          }
        })
        .catch((err) => {
          console.log(err.response);
          alert(err.response.data);
          this.setState({
            errorMessage: err.response.data,
          });
          const { errorMessage } = this.state;
          console.log(errorMessage);
        });
    }
  };

  render() {
    let redirectVar = null;
    if (!cookie.load('cookie')) {
      redirectVar = <Redirect to='/' />;
    }
    //const { redirecttohome } = this.state;
    const {
      origin,
      destination,
      departureDate,
      returnDate,
      roundtrip,
      originerrors,
      destinationerrors,
      departureDateerrors,
      returnDateerrors,
      redirecttohome,
    } = this.state;

    return (
      <div>
        {/* {redirectVar} */}
        <Navheader />
        <div className='profilepage-block'>
          {/* <h2 className='h2'> Your account </h2>
          <h3 className='h3'> Flyer Number : {customer_flyer_num}</h3> */}

          <section>
            <Form
              ref={this.profileform}
              id='profileform'
              className='profileform'
            >
              <section className='center-block'>
                <div className='basic_div'>
                  <label htmlFor='origin'>
                    <strong>Origin</strong>
                    <input
                      type='text'
                      name='origin'
                      id='origin'
                      defaultValue='Origin'
                      onChange={this.originChangeHandler}
                    />
                  </label>
                  {originerrors && (
                    <span className='errmsg' style={{ color: 'maroon' }}>
                      {' '}
                      {originerrors}{' '}
                    </span>
                  )}
                  <label htmlFor='destination'>
                    <strong>Destination</strong>
                    <input
                      type='text'
                      name='destination'
                      id='destination'
                      defaultValue='Destination'
                      onChange={this.destinationChangeHandler}
                    />
                  </label>
                  {destinationerrors && (
                    <span className='errmsg' style={{ color: 'maroon' }}>
                      {' '}
                      {destinationerrors}{' '}
                    </span>
                  )}
                  <label htmlFor='departureDate'>
                    <strong>Departure Date</strong>
                    <input
                      type='text'
                      name='departureDate'
                      id='departureDate'
                      defaultValue='YYYY-MM-DD'
                      onChange={this.departureDateChangeHandler}
                    />
                  </label>
                  {departureDateerrors && (
                    <span className='errmsg' style={{ color: 'maroon' }}>
                      {' '}
                      {departureDateerrors}{' '}
                    </span>
                  )}

                  <label htmlFor='returnDate'>
                    <strong>Return Date</strong> <br />
                    <input
                      type='text'
                      name='returnDate'
                      id='returnDate'
                      defaultValue='YYYY-MM-DD'
                      onChange={this.returnDateChangeHandler}
                    />
                  </label>
                  {returnDateerrors && (
                    <span className='errmsg' style={{ color: 'maroon' }}>
                      {' '}
                      {returnDateerrors}{' '}
                    </span>
                  )}
                  <br />
                  <br />
                </div>
              </section>
              <section className='right-block'>
                <div className='savebtn' data-testid='Saveupdates'>
                  <Button className='Save-default' onClick={this.submitsave}>
                    Search
                  </Button>
                </div>
              </section>
            </Form>
          </section>
        </div>
      </div>
    );
  }
}

export default SearchFlight;
