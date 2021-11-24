import React, { Component } from 'react';
import axios from 'axios';
import { url } from '../Constants';

import { Redirect } from 'react-router';

import cookie from 'react-cookies';
import Button from 'react-bootstrap/Button';

import Navheader from '../navbar/navbar';
import 'react-datepicker/dist/react-datepicker.css';
// import DefaultAvatar from '../../../public/Profile_photos/default_avatar.png'; // import DefaultAvatar from '../  Profile_photos/default_avatar.png';
import './searchFlights.css';
import '../navbar/navbar.css';

class DisplayFlights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirecttohome: null,
      departingResponse: [],
      returningResponse: [],
      origin: '',
      destination: '',
      departureDate: '',
      returnDate: '',
      originairport: '',
      destinationairport: '',
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const departingresponseData = location.state.departingresData;
    const returningresponseData = location.state.returningresData;
    console.log(departingresponseData);
    console.log(returningresponseData);
    this.setState({
      departingResponse: departingresponseData,
      returningResponse: returningresponseData,
      origin: location.state.origin,
      destination: location.state.destination,
      departureDate: location.state.departureDate,
      returnDate: location.state.returnDate,
    });
    this.getairports();
  }

  getairports = () => {
    const { location } = this.props;

    const params = {
      origin: location.state.origin,
      destination: location.state.destination,
    };
    axios
      .get(url + '/getsrcdstairports', { params: params })
      .then((response) => {
        const { data } = response;
        console.log(response.data);
        let orgairpt;
        let dstairpt;
        const airporttext = data.map((txt) =>
          txt.airport_code == params.origin
            ? (orgairpt = `${txt.city_name},${txt.state_code} - ${txt.airport_code}`)
            : txt.airport_code == params.destination
            ? (dstairpt = `${txt.city_name},${txt.state_code} - ${txt.airport_code}`)
            : ''
        );

        this.setState({
          originairport: orgairpt,
          destinationairport: dstairpt,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    let redirectVar = null;
    if (!cookie.load('cookie')) {
      redirectVar = <Redirect to='/' />;
    }
    //const { redirecttohome } = this.state;
    const {
      redirecttohome,
      departingResponse,
      returningResponse,
      origin,
      destination,
      departureDate,
      returnDate,
      originairport,
      destinationairport,
    } = this.state;

    return (
      <div>
        {/* {redirectVar} */}
        <Navheader />
        <div className='profilepage-block'>
          <section>
            <section className='center-block'>
              <div className='basic_div'>
                <div className='flight-container'>
                  <h2>
                    {' '}
                    Depart: {origin} To {destination}
                  </h2>
                  <p>
                    {originairport} to {destinationairport}
                    <br />
                    {departureDate}
                  </p>
                  <table className='flights_table'>
                    <tbody>
                      <tr>
                        <table className='flights_table1'>
                          <td colSpan='2'>Departing Flights</td>
                          <td className='stops'> Number of Stops </td>
                          <td className='duration'> Duration </td>
                          <td className='economy'> Economy </td>
                          <td className='economy_plus'> Economy Plus</td>
                          <td className='first_class'> First Class </td>
                          <td className='buisness'> Business </td>
                        </table>
                      </tr>
                      {departingResponse.map((flightdetails, i) => (
                        <>
                          <tr key={flightdetails.id} className='Row'>
                            <table className='flights_table1'>
                              <td>
                                <h4>#{flightdetails.flight_num}</h4>
                              </td>
                              <td>
                                <h4>
                                  {new Date(
                                    flightdetails.departure_time
                                  ).toLocaleTimeString('en-US')}
                                  ----{'>'}
                                </h4>
                                <p>{origin}</p>
                              </td>
                              <td>
                                <h4>
                                  {new Date(
                                    flightdetails.arrival_time
                                  ).toLocaleTimeString('en-US')}
                                </h4>
                                <p>{destination}</p>
                              </td>
                              <td>
                                <h4>{flightdetails.number_of_stops}</h4>
                              </td>
                              <td>
                                <h4>{flightdetails.duration}</h4>
                              </td>
                              <td>
                                <h4>{flightdetails.Economy.toFixed(2)}</h4>
                              </td>
                              <td>
                                <h4>{flightdetails.Economy_Plus.toFixed(2)}</h4>
                              </td>
                              <td>
                                <h4>{flightdetails.First_Class.toFixed(2)}</h4>
                              </td>
                              <td>
                                <h4>{flightdetails.Business.toFixed(2)}</h4>
                              </td>
                            </table>
                          </tr>
                          <Button
                            className='Save-default'
                            style={{
                              marginLeft: '80rem',
                            }}
                          >
                            Book
                          </Button>
                          <br />
                          <br />
                        </>
                      ))}
                    </tbody>
                  </table>
                  <br />
                  <h2>
                    {' '}
                    Return: {destination} To {origin}
                  </h2>
                  <p>
                    {destinationairport} to {originairport}
                    <br />
                    {returnDate}
                  </p>
                  <table className='flights_table'>
                    <thead></thead>
                    <tbody>
                      <tr>
                        <table className='flights_table'>
                          <td colSpan='2'>Returning Flights</td>
                          <td> Number of Stops </td>
                          <td> Duration </td>
                          <td> Economy </td>
                          <td> Economy Plus</td>
                          <td> First Class </td>
                          <td> Business </td>
                        </table>
                      </tr>
                      {returningResponse.map((flightdetails, i) => (
                        <section className='Flight-info'>
                          <div className='flights-info-container'>
                            <tr key={flightdetails.id} className='Row'>
                              <td>
                                <h4>#{flightdetails.flight_num}</h4>
                              </td>

                              <td>
                                <h4>
                                  {' '}
                                  {new Date(
                                    flightdetails.departure_time
                                  ).toLocaleTimeString('en-US')}{' '}
                                  ----{'>'}
                                </h4>
                                <p>{origin}</p>
                              </td>
                              <td> </td>
                              <td>
                                <h4>
                                  {' '}
                                  {new Date(
                                    flightdetails.arrival_time
                                  ).toLocaleTimeString('en-US')}{' '}
                                </h4>
                                <p>{destination}</p>
                              </td>
                              <td> </td>
                              <td>
                                <h4>Number Of Stops</h4>
                                <p>{flightdetails.number_of_stops}</p>
                              </td>
                              <td> </td>
                              <td>
                                <h4>Duration</h4>
                                <p>{flightdetails.duration}</p>
                              </td>
                              <td> </td>
                              <td>
                                <h4>Economy</h4>
                                <p>{flightdetails.Economy.toFixed(2)}</p>
                              </td>
                              <td> </td>
                              <td>
                                <h4>Economy Plus</h4>
                                <p>{flightdetails.Economy_Plus.toFixed(2)}</p>
                              </td>
                              <td> </td>
                              <td>
                                <h4>First Class</h4>
                                <p>{flightdetails.First_Class.toFixed(2)}</p>
                              </td>
                              <td> </td>
                              <td>
                                <h4>Business</h4>
                                <p>{flightdetails.Business.toFixed(2)}</p>
                              </td>
                            </tr>

                            <Button
                              className='Save-default'
                              style={{
                                marginLeft: '80rem',
                              }}
                            >
                              Book
                            </Button>
                          </div>
                        </section>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section className='right-block'>
              <div className='savebtn' data-testid='Saveupdates'>
                <br />
              </div>
            </section>
          </section>
        </div>
      </div>
    );
  }
}

export default DisplayFlights;
