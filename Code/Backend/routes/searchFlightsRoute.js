const express = require('express');
// const jwt = require('jsonwebtoken');
// const passport = require('passport');
var cookieParser = require('cookie-parser');
var config = require('../store/config');
var dbconnection = config.dbconnection;
const router = express.Router();

router.get('/getflights', function (req, res) {
  console.log('Inside search flights');
  //console.log(req.body);
  const origin = req.body.origin;
  const destination = req.body.destination;
  const departureDate = req.body.departureDate;
  // const departureDate = new Date(departure).toDateString();
  console.log(departureDate);
  const arrivalDate = req.body.arrivalDate;
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
        console.log(output);

        res.status(200).send(output);
      }
    }
  );
});

module.exports = router;
