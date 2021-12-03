import React, { Component } from 'react';
import axios from 'axios';
import { url } from '../Constants';
import { Redirect } from 'react-router';
import Select from 'react-select';
import cookie from 'react-cookies';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import NavBar from '../navigation';
import 'react-datepicker/dist/react-datepicker.css';
import './searchFlights.css';
import '../navbar/navbar.css';
import CssBaseline from '@mui/material/CssBaseline';

import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();
class SearchFlight extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      origin: '',
      destination: '',
      roundtrip: false,
      middlename: '',
      startDate: new Date(),
      endDate: new Date(),
      departureDate: '',
      returnDate: '',
      selectAirports: [],
      srcairports: [{ city: '', stateCode: '', airportCode: '' }],
      dstairports: [{ city: '', stateCode: '', airportCode: '' }],
      redirecttohome: null,
      redirecttopage: null,
      originerrors: '',
      destinationerrors: '',
      departureDateerrors: '',
      returnDateerrors: '',
      ticketId: this.props.location.ticketNumber,
    };

    // Bind the handlers to this class
    this.originChangeHandler = this.originChangeHandler.bind(this);
    this.destinationChangeHandler = this.destinationChangeHandler.bind(this);
    this.departureDateChangeHandler =
      this.departureDateChangeHandler.bind(this);
    this.returnDateChangeHandler = this.returnDateChangeHandler.bind(this);
    this.roundtripChangeHandler = this.roundtripChangeHandler.bind(this);
  }

  componentDidMount() {
    this.getairports();
  }

  originChangeHandler = (id, e) => {
    const { srcairports } = this.state;
    const updatedList = [...srcairports];
    updatedList[id].airportCode = e.value;
    console.log(updatedList);
    this.setState(updatedList);

    this.setState({
      origin: e.value,
    });
  };
  destinationChangeHandler = (id, e) => {
    const { dstairports } = this.state;
    const updatedList = [...dstairports];
    updatedList[id].airportCode = e.value;
    console.log(updatedList);
    this.setState(updatedList);
    this.setState({
      destination: e.value,
    });
  };
  departureDateChangeHandler = (e) => {
    var dateFromString = new Date(e.toString());
    let date = dateFromString.toLocaleDateString();
    date = date.slice(0, 11);
    let date1 = date.replace(/(\d\d)\/(\d\d)\/(\d{4})/, '$3-$1-$2');
    this.setState({
      departureDate: date1,
      startDate: new Date(date),
    });
  };

  returnDateChangeHandler = (e) => {
    var dateFromString = new Date(e.toString());
    let date = dateFromString.toLocaleDateString();
    date = date.slice(0, 11);
    let date1 = date.replace(/(\d\d)\/(\d\d)\/(\d{4})/, '$3-$1-$2');
    this.setState({
      returnDate: date1,
      endDate: new Date(date),
    });
  };

  roundtripChangeHandler = (e) => {
    const { roundtrip } = this.state;
    this.setState({
      roundtrip: !roundtrip,
    });
  };

  getairports = () => {
    axios
      .get(url + '/getairports', {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((response) => {
        const { data } = response;
        console.log(response.data);
        const airporttext = data.map((txt) => ({
          value: txt.airport_code,
          label: `${txt.city_name},${txt.state_code} - ${txt.airport_code}`,
        }));
        console.log(airporttext);
        console.log(response.data);
        this.setState({ selectAirports: airporttext });
      })
      .catch((err) => console.log(err));
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

    const {
      origin,
      destination,
      departureDate,
      returnDate,
      roundtrip,
      startDate,
      endDate,
    } = this.state;

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
    if (origin.length > 0 && destination.length > 0 && origin == destination) {
      formisvalid = false;
      formerrors.destinationerrors = 'Origin and Destination cannot be same!';
      console.log(formerrors.destinationerrors);
    }
    if (departureDate.length === 0) {
      formisvalid = false;
      formerrors.departureDateerrors = 'Departure Date cannot be blank!';
      console.log(formerrors.departureDateerrors);
    }
    if (departureDate.length > 0 && startDate < new Date()) {
      formisvalid = false;
      formerrors.departureDateerrors = 'Departure Date cannot be in past!';
      console.log(formerrors.departureDateerrors);
    }

    if (roundtrip == true && returnDate.length === 0) {
      formisvalid = false;
      formerrors.returnDateerrors = 'Return Date cannot be blank!';
      console.log(formerrors.returnDateerrors);
    }

    if (
      roundtrip == true &&
      returnDate.length > 0 &&
      (endDate < new Date() || endDate < startDate)
    ) {
      formisvalid = false;
      formerrors.returnDateerrors =
        'Return Date cannot be before depature date!';
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
      if (roundtrip) {
        const departingparams = {
          origin1: origin,
          destination1: destination,
          departureDate: departureDate,
        };
        axios
          .get(url + '/getflights', { params: departingparams })
          .then((response) => {
            // console.log('Status Code : ', response.status);
            if (response.status === 200) {
              console.log(response.data);
              const departingresponse = response.data;
              const retunringparams = {
                origin1: destination,
                destination1: origin,
                departureDate: returnDate,
              };
              axios
                .get(url + '/getflights', { params: retunringparams })
                .then((response1) => {
                  // console.log('Status Code : ', response.status);
                  if (response1.status === 200) {
                    console.log(response1.data);
                    const redirectVar1 = (
                      <Redirect
                        to={{
                          pathname: '/displayflights',
                          state: {
                            departingresData: departingresponse,
                            returningresData: response1.data,
                            origin: origin,
                            destination: destination,
                            departureDate: departureDate,
                            returnDate: returnDate,
                            roundtrip: roundtrip,
                          },
                        }}
                      />
                    );
                    this.setState({
                      redirecttopage: redirectVar1,
                    });

                    //const redirectVar1 = <Redirect to="/dashboard" />;
                    //this.setState({ redirecttohome: redirectVar1 });
                  } else {
                    this.setState({
                      redirecttohome: null,
                    });
                  }
                })
                .catch((err) => {
                  console.log(err.response1);
                  alert(err.response1.data);
                  this.setState({
                    errorMessage: err.response1.data,
                  });
                  const { errorMessage } = this.state;
                  console.log(errorMessage);
                });

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
      } else {
        const departingparams = {
          origin1: origin,
          destination1: destination,
          departureDate: departureDate,
        };
        axios
          .get(url + '/getflights', { params: departingparams })
          .then((response) => {
            // console.log('Status Code : ', response.status);
            if (response.status === 200) {
              console.log(response.data);
              const departingresponse = response.data;
              const redirectVar1 = (
                <Redirect
                  to={{
                    pathname: '/displayflights',
                    state: {
                      departingresData: departingresponse,
                      returningresData: null,
                      origin: origin,
                      destination: destination,
                      departureDate: departureDate,
                      returnDate: returnDate,
                    },
                  }}
                />
              );
              this.setState({
                redirecttopage: redirectVar1,
              });
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
    }
  };

  render() {
    let redirectVar = null;
    if (!cookie.load('cookie')) {
      redirectVar = <Redirect to='/' />;
    }

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
      srcairports,
      dstairports,
      selectAirports,
      startDate,
      endDate,
      redirecttopage,
    } = this.state;

    return (
      <div>
        {redirectVar}
        <NavBar />
        <ThemeProvider theme={theme}>
          <Grid
            container
            component='main'
            sx={{ height: '50vh', alignContent: 'center' }}
          >
            <CssBaseline />
            <Grid
              item
              xs={12}
              // sm={4}
              // md={7}
              sx={{
                backgroundImage:
                  'url(https://as1.ftcdn.net/v2/jpg/02/43/57/78/1000_F_243577802_0G1xRWDLeKlAyMnJ1KlJN4GuhZPe2QFt.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
              }}
            >
              <Container
                component='main'
                maxWidth='lg'
                sx={{ md: 4, marginTop: '280px' }}
              >
                <Paper
                  variant=''
                  sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                >
                  {/* <Card sx={{ display: 'flex', justifyContent: 'center' }}> */}
                  <CardContent sx={{ flex: 1 }}>
                    {/* <div className='profilepage-block'> */}
                    <section>
                      <Form>
                        <label
                          htmlFor='roundtrip'
                          className=''
                          style={{
                            marginLeft: '3.2rem',
                            fontSize: '20px',
                          }}
                        >
                          <input
                            type='checkbox'
                            name='roundtrip'
                            id='roundtrip'
                            defaultValue='Origin'
                            onChange={this.roundtripChangeHandler}
                          />{' '}
                          Round Trip
                        </label>

                        <section className='center-block'>
                          <div className='basic_div'>
                            <div
                              className=''
                              style={{
                                width: '1000px',
                                display: 'flex',
                                flexDirection: 'row',
                                fontSize: '20px',
                                fontWeight: '250',
                              }}
                            >
                              <br />
                              {srcairports.map((airport, id) => (
                                <div
                                  className=''
                                  style={{
                                    width: '200px',
                                    fontSize: '15px',
                                  }}
                                >
                                  <span>
                                    <strong>Origin </strong>
                                  </span>
                                  <Select
                                    options={selectAirports}
                                    className='div-select'
                                    type='text'
                                    value={{
                                      label: airport.airportCode,
                                      value: airport.airportCode,
                                    }}
                                    name={`airports${id + 1}_airportcode`}
                                    id={`airports${id + 1}_airportcode`}
                                    onChange={(e) =>
                                      this.originChangeHandler(id, e)
                                    }
                                    // autoComplete="off"
                                    required
                                  />
                                  {originerrors && (
                                    <span
                                      className='errmsg'
                                      style={{ color: 'maroon' }}
                                    >
                                      {' '}
                                      {originerrors}{' '}
                                    </span>
                                  )}{' '}
                                </div>
                              ))}

                              {/* <label htmlFor='origin'>
                    <strong>Origin </strong>
                    <br />
                    <input
                      type='text'
                      name='origin'
                      id='origin'
                      defaultValue='Origin'
                      onChange={this.originChangeHandler}
                    />
                    <br />
                    {originerrors && (
                      <span className='errmsg' style={{ color: 'maroon' }}>
                        {' '}
                        {originerrors}{' '}
                      </span>
                    )}{' '}
                  </label> */}
                              {dstairports.map((airport, id) => (
                                <div
                                  className=''
                                  style={{
                                    width: '200px',
                                    marginLeft: '5rem',
                                    fontSize: '15px',
                                  }}
                                >
                                  <span>
                                    <strong>Destination </strong>
                                  </span>
                                  <Select
                                    options={selectAirports}
                                    className='div-select'
                                    type='text'
                                    value={{
                                      label: airport.airportCode,
                                      value: airport.airportCode,
                                    }}
                                    name={`airports${id + 1}_airportcode`}
                                    id={`airports${id + 1}_airportcode`}
                                    onChange={(e) =>
                                      this.destinationChangeHandler(id, e)
                                    }
                                    // autoComplete="off"
                                    required
                                  />
                                  {destinationerrors && (
                                    <span
                                      className='errmsg'
                                      style={{ color: 'maroon' }}
                                    >
                                      {' '}
                                      {destinationerrors}{' '}
                                    </span>
                                  )}{' '}
                                </div>
                              ))}

                              {/* <label
                    htmlFor='destination'
                    style={{
                      marginLeft: '5rem',
                    }}
                  >
                    <strong>Destination </strong>
                    <br />
                    <input
                      type='text'
                      name='destination'
                      id='destination'
                      defaultValue='Destination'
                      onChange={this.destinationChangeHandler}
                    />
                    <br />
                    {destinationerrors && (
                      <span className='errmsg' style={{ color: 'maroon' }}>
                        {' '}
                        {destinationerrors}{' '}
                      </span>
                    )}{' '}
                  </label> */}
                              <label
                                htmlFor='departureDate'
                                className=''
                                style={{ marginLeft: '5rem' }}
                              >
                                <strong>Departure Date </strong>
                                <br />
                                <DatePicker
                                  selected={startDate}
                                  onChange={this.departureDateChangeHandler}
                                  className='searchDatePicker'
                                  style={{ marginLeft: '5rem' }}
                                />
                                {/* <input
                      type='text'
                      name='departureDate'
                      id='departureDate'
                      defaultValue='YYYY-MM-DD'
                      onChange={this.departureDateChangeHandler}
                    /> */}
                                <br />
                                {departureDateerrors && (
                                  <span
                                    className='errmsg'
                                    style={{ color: 'maroon' }}
                                  >
                                    {' '}
                                    {departureDateerrors}{' '}
                                  </span>
                                )}{' '}
                              </label>
                              <label
                                htmlFor='returnDate'
                                className=''
                                style={{ marginLeft: '5rem' }}
                              >
                                <strong>Return Date </strong> <br />
                                <DatePicker
                                  selected={endDate}
                                  className='searchDatePicker'
                                  onChange={this.returnDateChangeHandler}
                                  disabled={!roundtrip}
                                />
                                {returnDateerrors && (
                                  <span
                                    className='errmsg'
                                    style={{ color: 'maroon' }}
                                  >
                                    {' '}
                                    {returnDateerrors}{' '}
                                  </span>
                                )}
                                {/* <input
                      type='text'
                      name='returnDate'
                      id='returnDate'
                      defaultValue='YYYY-MM-DD'
                      onChange={this.returnDateChangeHandler}
                    /> */}
                              </label>
                              <br />
                              <br />
                            </div>
                          </div>
                        </section>
                        <Button
                          className='Save-default'
                          onClick={this.submitsave}
                          style={{
                            marginLeft: '50rem',
                            marginTop: '2rem',
                            backgroundColor: '#1c3f60',
                          }}
                        >
                          Search
                        </Button>
                        {/* <section >
                <div className='savebtn' data-testid='Saveupdates'>
                  <br />
                  <Button
                    className='Save-default'
                    onClick={this.submitsave}
                    style={{
                      marginLeft: '60rem',
                    }}
                  >
                    Search
                  </Button>
                </div>
              </section> */}
                      </Form>
                    </section>
                    {/* </div> */}
                    {redirecttopage}
                  </CardContent>
                  {/* </Card> */}
                </Paper>
              </Container>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
    );
  }
}

export default SearchFlight;
