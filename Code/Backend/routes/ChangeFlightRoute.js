
const express = require('express');
var config = require('../store/config');
const moment=require('moment');
var dbconnection = config.dbconnection;
const router = express.Router();
router.post('/cancelFlight', function (req, res) {
    const personId = req.body.personId;
    const ticketId=req.body.ticketId;
    const flightId=req.body.flightId;
    const today=new Date();
    const cancelFlightCheckQuery="Select * from Tickets where date_of_cancellation is not null and person_id="+personId+" and ticket_number="+ticketId+" and flightId="+flightId+" and date_of_travel>"+today ;
    const cancelFlightUpdateQuery="update Tickets set date_of_cancellation="+today+",modified_date="+today+" where person_id="+personId+" and ticket_number="+ticketId+" and flightId="+flightId ;
  
    dbconnection.query(
        cancelFlightUpdateQuery,
      async (err, output, fields) => {
        if (err) {
          const cancelFlightResponse={
            "errorCode":"E03",
            "errorDesc":"Unable to cancel the flight. Please check the details"
          }
          res.status(500).send(cancelFlightResponse);
        } else {
          console.log(output)
          console.log(output.length);
          if(output.length===0){
            const cancelFlightResponse={
                "errorCode":"E03",
                "errorDesc":"Unable to cancel the flight. Please check the details"
              }
            res.status(500).send(cancelFlightResponse);
          }
          else{
          res.status(200).send(output);
          }
        }
      }
    );
  });

  router.post('/changeFlight', function (req, res) {
    const personId = req.body.personId;
    const ticketId=req.body.ticketId;
    const flightId=req.body.flightId;
   const price=req.body.price;
   const seatId=req.body.seatId;
   const dateOfTravel=req.body.dateOfTravel;
   const sourceAirportId=req.body.sourceAirportId;
   const destAirportId=req.body.destAirportId;
    const today=new Date();
    const changeFlightUpdateQuery="update Tickets set flightId="+flightId+",modified_date="+today+",price="+price+",seat_id="+seatId+",date_of_Travel="+dateOfTravel+",source_airport_id"+sourceAirportId+",destination_airport_id="+destAirportId+"date_of_booking"+today+" where  ticket_number="+ticketId ;
  
    dbconnection.query(
        changeFlightUpdateQuery,
      async (err, output, fields) => {
        if (err) {
          const changeFlightResponse={
            "errorCode":"E03",
            "errorDesc":"Unable to change the flight"
          }
          res.status(500).send(changeFlightResponse);
        } else {
          console.log(output)
          console.log(output.length);
          if(output.length===0){
            const changeFlightResponse={
                "errorCode":"E03",
                "errorDesc":"Unable to change the flight"
              }
            res.status(500).send(changeFlightResponse);
          }
          else{
          res.status(200).send(output);
          }
        }
      }
    );
  });
  router.post('/bookedFlights', function (req, res) {
    const personId = req.body.personId;
    const today=new Date();
    const bookedFlightsQuery="Select * from Tickets where date_of_cancellation is not null and person_id="+personId+" and date_of_travel>"+today ;
  
    dbconnection.query(
        bookedFlightsQuery,
      async (err, output, fields) => {
        if (err) {
          const bookedFlightsResponse={
            "errorCode":"E03",
            "errorDesc":"Unable to fetch the flight details"
          }
          res.status(500).send(bookedFlightsResponse);
        } else {
          console.log(output)
          console.log(output.length);
          if(output.length===0){
            const bookedFlightsResponse={
              "errorCode":"E01",
              "errorDesc":"No bookings"
            }
            res.status(500).send(bookedFlightsResponse);
          }
          else{
          res.status(200).send(output);
          }
        }
      }
    );
  });

  router.get('/reservations', function (req, res) {
    const personId = req.query.personId;
  
    const getReservationQuery="Select t.*,a.airport_code as source_airport,b.airport_code as dest_airport from Tickets t inner join Airports a on a.airport_id=t.source_airport_id inner join Airports b on b.airport_id=t.destination_airport_id where  t.person_id="+personId+" order by t.created_date desc" ;
    
    dbconnection.query(
      getReservationQuery,
      async (err, output, fields) => {
        if (err) {
          const reservationResponse={
            "errorCode":"E04",
            "errorDesc":"Unable to fetch the reservations"
          }
          res.status(500).send(reservationResponse);
        } else {
          console.log(output)
        
          if(output.length===0){
            const reservationResponse={
                "errorCode":"E05",
                "errorDesc":"No reservations exist"
              }
            res.status(500).send(reservationResponse);
          }
          else{
          res.status(200).send(output);
          }
        }
      }
    );
  });

   module.exports = router;