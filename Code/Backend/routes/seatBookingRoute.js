const express = require('express');
const { NEWDATE } = require('mysql/lib/protocol/constants/types');
var config = require('../store/config');
var dbconnection = config.dbconnection;
const router = express.Router();

router.get('/getSeatInfo/', function (req, res) {
    console.log('Inside customer getSeatInfo');
    //console.log(req.body);  
    const aircraftId = req.query.aircraftId;
    // console.log("*********************",aircraftId);
  const sql1 = 'SELECT * from Seats s JOIN Flight_Class f on s.flight_class_id = f.flight_class_id where s.aircraft_id=?';
    dbconnection.query(
      'SELECT * from Seats s JOIN Flight_Class f on s.flight_class_id = f.flight_class_id where s.aircraft_id=?',aircraftId,
      
      async (err, output, fields) => {
        if (err) {
            console.log("error while fetching seat details",err);
          res.status(400).send('Error!');
        } else {
            console.log("seat info received");
          res.status(200).send(output);
        }
      }
    );
});


router.post('/postTravelTicket/', function (req, res) {
  console.log('Inside customer postTravelTicket');
  console.log("reqbody", req.body);
  var sqlquery;
  if (req.body.ticketNumber) {
     sqlquery = "REPLACE INTO Tickets(ticket_number, source_airport_code, destination_airport_code, date_of_booking, date_of_travel, flight_num, person_id, seat_id, price, created_date) values(" 
  + req.body.ticketNumber+ ",'" + req.body.origin + "','" + req.body.destination + "','" + req.body.currentDate + "','" + req.body.travelDate + "'," + req.body.flight_num + "," + req.body.personId + "," + req.body.seatID + "," + req.body.totalFare + ",'" + req.body.currentDate + "')";   
  }
  else {
     sqlquery = "Insert into Tickets( source_airport_code, destination_airport_code, date_of_booking, date_of_travel, flight_num, person_id, seat_id, price, created_date) values('" + req.body.origin + "','" + req.body.destination + "','" + req.body.currentDate + "','" + req.body.travelDate + "'," + req.body.flight_num + "," + req.body.personId + "," + req.body.seatID + "," + req.body.totalFare + ",'" + req.body.currentDate + "');"+"UPDATE Customers SET mileage_reward =mileage_reward+ (SELECT route_distance from Routes where flight_num ="+req.body.flight_num+"), miles_travelled = miles_travelled+(SELECT route_distance from Routes where flight_num ="+req.body.flight_num+") where person_id = "+req.body.personId+";";   
console.log(sqlquery);
  }
  
  dbconnection.query(sqlquery, (err, output, fields) => {
    if (err) {
      console.log("error", err)
      res.status(400).send('Error!');
    } else {
      console.log("seat info received");
      res.status(200).send(output);
    }
  })
});

router.get('/checkIfSeatIsBooked/', function (req, res) {
console.log('Inside customer checkIfSeatIsBooked');
  console.log(req.query.travelDate)
  console.log("date ***************")
const sql1 = "SELECT * from Tickets where date_of_travel= '" +  req.query.travelDate + "' AND flight_num= " +  req.query.flight_num + " AND seat_id= " +  req.query.seatID;
  dbconnection.query(
    sql1,
    async (err, output, fields) => {
      if (err) {
          console.log("error while checkIfSeatIsBooked",err);
        res.status(400).send('Error!');
      } else {
          console.log("seat info received : checkIfSeatIsBooked");
        res.status(200).send(output);
      }
    }
  );
});
  
module.exports = router;