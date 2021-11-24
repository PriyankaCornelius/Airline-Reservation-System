const express = require('express');
// const jwt = require('jsonwebtoken');
// const passport = require('passport');
var cookieParser = require('cookie-parser');
var config = require('../store/config');
var dbconnection = config.dbconnection;
const router = express.Router();

router.get('/getflights', function (req, res) {
  console.log('Inside search flights');
  console.log(req.query);
  const origin = req.query.origin1;
  const destination = req.query.destination1;
  const departureDate = req.query.departureDate;
  // const departureDate = new Date(departure).toDateString();
  const returnDate = req.query.returnDate;
  dbconnection.query(
    "SELECT * from flights_search where origin = '" +
      origin +
      "' and destination ='" +
      destination +
      "' and Date(departure_time) = '" +
      departureDate +
      "' ;",
    async (err, output, fields) => {
      if (err) {
        res.status(400).send('Error!');
      } else {
        // console.log(output);
        res.status(200).send(output);
      }
    }
  );
});

router.get('/getairports', function (req, res) {
  console.log('Inside get airports');
  dbconnection.query(
    'SELECT c.city_name,c.state_code,a.airport_code FROM Airports a JOIN Cities c on a.city_id = c.city_id ',
    async (err, output, fields) => {
      if (err) {
        res.status(400).send('Error!');
      } else {
        // console.log(output);
        res.status(200).send(output);
      }
    }
  );
});

router.get('/getsrcdstairports', function (req, res) {
  console.log('Inside get getsrcdstairports');
  console.log(req.query);
  const origin = req.query.origin;
  const destination = req.query.destination;
  dbconnection.query(
    "SELECT c.city_name,c.state_code,a.airport_code FROM Airports a JOIN Cities c on a.city_id = c.city_id WHERE a.airport_code = '" +
      origin +
      "' or a.airport_code ='" +
      destination +
      "';",
    async (err, output, fields) => {
      if (err) {
        res.status(400).send('Error!');
      } else {
        // console.log(output);
        res.status(200).send(output);
      }
    }
  );
});

module.exports = router;
