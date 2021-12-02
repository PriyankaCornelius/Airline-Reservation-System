import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import Seat from './seat';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Row, Col, Navbar } from 'react-bootstrap';
import { Container } from "react-bootstrap";
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import axios from 'axios';
const EconomySeat = styled(Button)({
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    background:'#4275BD',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
});
const EconomyPlusSeat = styled(Button)({
    background:'#fff',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'black',
    height: 48,
    padding: '0 30px',
});
const BusinessSeat = styled(Button)({
  background:'#403075',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});
const FirstClassSeat = styled(Button)({
  background:'#D4BA6A',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});
class SeatBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seats: [],
      seatSelected: '',
      disableBtn:false
    }
  }
  componentDidMount() {
    const data = {
      params: {
        aircraftId:1
      }
    };
    console.log("data is ", data)
    axios.get("http://localhost:3001/getSeatInfo/",data)
      .then(response => {
        console.log("received seat info");
        console.log("length",response.data.length);
        this.setState({
          seats:response.data
        })
      })
     
    
  }
  seatClickHandler = seat => {
    console.log("seat sel", seat);
    
    const departingflightSelected = JSON.parse(sessionStorage.getItem('departingflightSelected'));
    const returningflightSelected = JSON.parse(sessionStorage.getItem('returningFlightSelected'));
   
    if (departingflightSelected.seatID) {
      if (returningflightSelected) {
        returningflightSelected['seatID'] = seat.seat_id;
        returningflightSelected['seatPrice'] = seat.flight_class_price;
        returningflightSelected['seatClass'] = seat.flight_class_name;
        sessionStorage.setItem('returningFlightSelected', JSON.stringify(returningflightSelected))
      }
      else {
        console.log("no return tkt");
      }
    }
    else {
      departingflightSelected['seatID'] = seat.seat_id;
      departingflightSelected['seatPrice'] = seat.flight_class_price;
      departingflightSelected['seatClass'] = seat.flight_class_name;
      sessionStorage.setItem('departingflightSelected', JSON.stringify(departingflightSelected));
    }

    this.setState({
      seatSelected : (<div>
        <Grid item xs={8} md={10}>
      <CardActionArea component="a">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
          <Typography component="h3" variant="h3">
          {seat.flight_class_name}
            </Typography>
            <Typography component="h2" variant="h2" color="text.secondary">
            {seat.seat_num}{seat.seat_pos}
            </Typography>
          </CardContent>
          <CardContent sx={{ flex: 1 }}>
          <Typography component="h3" variant="h3">
              USD {seat.flight_class_price}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image='https://i.pinimg.com/originals/3c/2e/23/3c2e23ab8b8fccab1b54572ae07e2117.png'
            alt="alt"
          />
        </Card>
      </CardActionArea>
    </Grid>
    <br></br>
      </div>)
    }) 
  }
    render() { 
      
      return <div>
        <h1>Seat Booking </h1>
         {this.state.seatSelected}
         <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 10, sm: 0}}>
          {this.state.seats.map((seat, index) => {
            var SeatButton;
            // if () SeatButton = <BusinessSeat onClick={()=>this.seatClickHandler(seat)}>{seat.seat_num}{seat.seat_pos}</BusinessSeat>
             if (seat.flight_class_id === 4) SeatButton = <BusinessSeat onClick={()=>this.seatClickHandler(seat)}>{seat.seat_num}{seat.seat_pos}</BusinessSeat>
            else if (seat.flight_class_id === 3) SeatButton = <FirstClassSeat onClick={()=>this.seatClickHandler(seat)}>{seat.seat_num}{seat.seat_pos}</FirstClassSeat>
            else if (seat.flight_class_id === 2) SeatButton = <EconomyPlusSeat onClick={()=>this.seatClickHandler(seat)}>{seat.seat_num}{seat.seat_pos}</EconomyPlusSeat>
            else SeatButton = <EconomySeat onClick={()=>this.seatClickHandler(seat)}>{seat.seat_num}{seat.seat_pos}</EconomySeat>
            return (
              <Grid item xs={2} sm={4} md={4} key={index}>
                {SeatButton}
              </Grid>
            )
          })}
          </Grid>
            
        </div>;
    }
}
 
export default SeatBooking;