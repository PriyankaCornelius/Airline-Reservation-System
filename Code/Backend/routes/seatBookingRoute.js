const express = require('express');
var config = require('../store/config');
var dbconnection = config.dbconnection;
const router = express.Router();

router.get('/getSeatInfo/', function (req, res) {
    console.log('Inside customer getSeatInfo');
    //console.log(req.body);  
    const aircraftId = req.query.aircraftId;
    // console.log("*********************",aircraftId);
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
  
module.exports = router;