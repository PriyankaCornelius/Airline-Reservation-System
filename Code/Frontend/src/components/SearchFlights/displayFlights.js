import React, { Component } from 'react';
import axios from 'axios';
import { url } from '../Constants';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import Button from 'react-bootstrap/Button';
import NavBar from '../navigation';
import 'react-datepicker/dist/react-datepicker.css';
// import DefaultAvatar from '../../../public/Profile_photos/default_avatar.png'; // import DefaultAvatar from '../  Profile_photos/default_avatar.png';

import '../navbar/navbar.css';
import './searchFlights.css';

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
      departingFlightSelected: null,
      returningFlightSelected: null,
      roundtrip: null,
      redirecttopage: null,
      count: 1,
    };
  }
  componentDidMount() {
    const { location } = this.props;
    const departingresponseData = location.state.departingresData;
    const returningresponseData = location.state.returningresData;
    const roundtrip = location.state.roundtrip;
    var htmlvar = document.getElementById('departingTable').innerHTML;
    for (let i = 0; i < departingresponseData.length; i++) {
      htmlvar += '<tr style = "background:#f4f4f485">';
      const economy = '$' + departingresponseData[i].Economy.toFixed(2);
      const economyPlus =
        '$' + departingresponseData[i].Economy_Plus.toFixed(2);
      const firstClass = '$' + departingresponseData[i].First_Class.toFixed(2);
      const business = '$' + departingresponseData[i].Business.toFixed(2);
      let stops = 'Non stop';
      stops =
        departingresponseData[i].number_of_stops === 0
          ? stops
          : departingresponseData[i].number_of_stops + ' stops';
      var departingdata = {
        flight_num: departingresponseData[i].flight_num,
        departure_time: new Date(
          departingresponseData[i].departure_time
        ).toLocaleTimeString('en-US'),
        arrival_time: new Date(
          departingresponseData[i].arrival_time
        ).toLocaleTimeString('en-US'),
        origin: departingresponseData[i].origin,
        destination: departingresponseData[i].destination,
        duration: departingresponseData[i].duration,
        number_of_stops: stops,
        economy: economy,
        economy_plus: economyPlus,
        first_class: firstClass,
        business: business,
      };
      htmlvar +=
        '<td>#' +
        departingresponseData[i].flight_num +
        '</td>' +
        '<td><h5>' +
        new Date(departingresponseData[i].departure_time).toLocaleTimeString(
          'en-US'
        ) +
        '</h5><p>' +
        departingresponseData[i].origin +
        '</p></td>' +
        '<td><h5>' +
        new Date(departingresponseData[i].arrival_time).toLocaleTimeString(
          'en-US'
        ) +
        '</h5>' +
        departingresponseData[i].destination +
        '</td>' +
        '<td>' +
        stops +
        '</td>' +
        '<td>' +
        departingresponseData[i].duration +
        '</td>' +
        '<td>' +
        economy +
        '</td>' +
        '<td>' +
        economyPlus +
        '</td>' +
        '<td>' +
        firstClass +
        '</td>' +
        '<td>' +
        business +
        '</td>' +
        '<td>' +
        "<button id = 'btnBook" +
        JSON.stringify(departingdata) +
        "' style = 'background: #001c68;color:white;width:55px;height:36px;border-radius:5px;border:0px;font-weight:bold; '> Book </button>" +
        '</td>';
      htmlvar += '</tr>';
      //   htmlvar +=
      //     "<<Button className='Save-default' style={{ marginLeft: '80rem',}}> Book </Button>";
    }
    document.getElementById('departingTable').innerHTML = htmlvar;
    for (let i = 0; i < departingresponseData.length; i++) {
      const economy = '$' + departingresponseData[i].Economy.toFixed(2);
      const economyPlus =
        '$' + departingresponseData[i].Economy_Plus.toFixed(2);
      const firstClass = '$' + departingresponseData[i].First_Class.toFixed(2);
      const business = '$' + departingresponseData[i].Business.toFixed(2);
      let stops = 'Non stop';
      stops =
        departingresponseData[i].number_of_stops === 0
          ? stops
          : departingresponseData[i].number_of_stops + ' stops';
      var departingdata = {
        flight_num: departingresponseData[i].flight_num,
        departure_time: new Date(
          departingresponseData[i].departure_time
        ).toLocaleTimeString('en-US'),
        arrival_time: new Date(
          departingresponseData[i].arrival_time
        ).toLocaleTimeString('en-US'),
        origin: departingresponseData[i].origin,
        destination: departingresponseData[i].destination,
        duration: departingresponseData[i].duration,
        number_of_stops: stops,
        economy: economy,
        economy_plus: economyPlus,
        first_class: firstClass,
        business: business,
      };
      document.getElementById(
        'btnBook' + JSON.stringify(departingdata)
      ).onclick = this.redirect;
    }

    if (roundtrip) {
      var htmlvar1 = document.getElementById('returningTable').innerHTML;
      for (let i = 0; i < returningresponseData.length; i++) {
        htmlvar1 += '<tr style = "background:#f4f4f485">';
        const economy = '$' + returningresponseData[i].Economy.toFixed(2);
        const economyPlus =
          '$' + returningresponseData[i].Economy_Plus.toFixed(2);
        const firstClass =
          '$' + returningresponseData[i].First_Class.toFixed(2);
        const business = '$' + returningresponseData[i].Business.toFixed(2);
        let stops = 'Non stop';
        stops =
          returningresponseData[i].number_of_stops === 0
            ? stops
            : returningresponseData[i].number_of_stops + ' stops';
        var returningData = {
          flight_num: returningresponseData[i].flight_num,
          departure_time: new Date(
            returningresponseData[i].departure_time
          ).toLocaleTimeString('en-US'),
          arrival_time: new Date(
            returningresponseData[i].arrival_time
          ).toLocaleTimeString('en-US'),
          origin: returningresponseData[i].origin,
          destination: returningresponseData[i].destination,
          duration: returningresponseData[i].duration,
          number_of_stops: stops,
          economy: economy,
          economy_plus: economyPlus,
          first_class: firstClass,
          business: business,
        };
        htmlvar1 +=
          "<tr> <th> Flight Number</th> <th>Departure Time</th> <th>Arrival Time</th> <th> Number of Stops </th><th> Duration </th><th> Economy </th><th>Economy <br />Plus</th><th>First <br />Class</th><th> Business </th><th style={{ borderTop: 'none' }}></th></tr>";
        htmlvar1 +=
          '<td>#' +
          returningresponseData[i].flight_num +
          '</td>' +
          '<td><h5>' +
          new Date(returningresponseData[i].departure_time).toLocaleTimeString(
            'en-US'
          ) +
          '</h5><p>' +
          returningresponseData[i].origin +
          '</p></td>' +
          '<td><h5>' +
          new Date(returningresponseData[i].arrival_time).toLocaleTimeString(
            'en-US'
          ) +
          '</h5>' +
          returningresponseData[i].destination +
          '</td>' +
          '<td>' +
          stops +
          '</td>' +
          '<td>' +
          returningresponseData[i].duration +
          '</td>' +
          '<td>' +
          economy +
          '</td>' +
          '<td>' +
          economyPlus +
          '</td>' +
          '<td>' +
          firstClass +
          '</td>' +
          '<td>' +
          business +
          '</td>' +
          '<td>' +
          "<button id = 'returnbtnBook" +
          JSON.stringify(returningData) +
          "' style = 'background: #001c68;color:white;width:55px;height:36px;border-radius:5px;border:0px;font-weight:bold; '> Book </button>" +
          '</td>';
        htmlvar1 += '</tr>';
        //   htmlvar +=
        //     "<<Button className='Save-default' style={{ marginLeft: '80rem',}}> Book </Button>";
      }
      document.getElementById('returningTable').innerHTML = htmlvar1;
      for (let i = 0; i < returningresponseData.length; i++) {
        const economy = '$' + returningresponseData[i].Economy.toFixed(2);
        const economyPlus =
          '$' + returningresponseData[i].Economy_Plus.toFixed(2);
        const firstClass =
          '$' + returningresponseData[i].First_Class.toFixed(2);
        const business = '$' + returningresponseData[i].Business.toFixed(2);
        let stops = 'Non stop';
        stops =
          returningresponseData[i].number_of_stops === 0
            ? stops
            : returningresponseData[i].number_of_stops + ' stops';

        var returningData = {
          flight_num: returningresponseData[i].flight_num,
          departure_time: new Date(
            returningresponseData[i].departure_time
          ).toLocaleTimeString('en-US'),
          arrival_time: new Date(
            returningresponseData[i].arrival_time
          ).toLocaleTimeString('en-US'),
          origin: returningresponseData[i].origin,
          destination: returningresponseData[i].destination,
          duration: returningresponseData[i].duration,
          number_of_stops: stops,
          economy: economy,
          economy_plus: economyPlus,
          first_class: firstClass,
          business: business,
        };
        document.getElementById(
          'returnbtnBook' + JSON.stringify(returningData)
        ).onclick = this.redirect;
      }
    }
    this.setState({
      departingResponse: departingresponseData,
      returningResponse: returningresponseData,
      origin: location.state.origin,
      destination: location.state.destination,
      departureDate: location.state.departureDate,
      returnDate: location.state.returnDate,
      roundtrip: location.state.roundtrip,
    });
    this.getairports();
  }
  redirect = (e) => {
    const { roundtrip, count } = this.state;

    if (roundtrip) {
      if (count == 2) {
        sessionStorage.setItem(
          'returningFlightSelected',
          e.target.id.substring(13, e.target.id.length)
        );
        const redirectVar1 = (
          <Redirect
            to={{
              pathname: '/flightBooking',
            }}
          />
        );
        this.setState({
          redirecttopage: redirectVar1,
          count: 1,
        });
      } else {
        sessionStorage.setItem(
          'departingflightSelected',
          e.target.id.substring(7, e.target.id.length)
        );
        this.setState({
          count: 2,
        });
      }
    } else {
      // alert(e.target.id.substring(7, e.target.id.length));
      sessionStorage.setItem(
        'departingflightSelected',
        e.target.id.substring(7, e.target.id.length)
      );
      sessionStorage.setItem('returningFlightSelected', '');
      const redirectVar1 = (
        <Redirect
          to={{
            pathname: '/flightBooking',
          }}
        />
      );
      this.setState({
        redirecttopage: redirectVar1,
      });
    }

    // departingflightSelected , returningFlightSelected
    //     <Redirect
    //     to={{
    //       pathname: '/flightBooking',
    //     }}
    //   />
    // alert(' getlost ');
  };
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
      redirectVar = <Redirect to='/login' />;
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
      redirecttopage,
      roundtrip,
    } = this.state;

    return (
      <div>
        {/* {redirectVar} */}
        <NavBar />
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
                  <table id='departingTable'>
                    <tr>
                      <th>Flight Number</th>
                      <th>Departure Time</th>
                      <th>Arrival Time</th>
                      <th> Number of Stops </th>
                      <th> Duration </th>
                      <th> Economy </th>
                      <th>
                        {' '}
                        Economy <br />
                        Plus
                      </th>
                      <th>
                        {' '}
                        First <br />
                        Class{' '}
                      </th>
                      <th> Business </th>
                      <th style={{ borderTop: 'none' }}></th>
                    </tr>
                  </table>
                  <br />
                  <br />

                  {roundtrip ? (
                    <>
                      <h2>
                        {' '}
                        Return: {destination} To {origin}
                      </h2>
                      <p>
                        {destinationairport} to {originairport}
                        <br />
                        {returnDate}
                      </p>
                    </>
                  ) : (
                    <div>{/* <table id='returningTable'> </table> */}</div>
                  )}
                  <table id='returningTable'></table>
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
        {redirecttopage}
      </div>
    );
  }
}
export default DisplayFlights;
