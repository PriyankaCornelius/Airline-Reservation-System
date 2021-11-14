const express = require('express');
var cookieParser = require('cookie-parser');
var config = require('../store/config');
var dbconnection = config.dbconnection;
const router = express.Router();

router.get('/getflights/:id', function (req, res) {
  console.log('Inside customer getuserprofile');
  //console.log(req.body);
  const personId = req.params.id;
  console.log(personId);
  dbconnection.query(
    'SELECT p.f_name,p.m_name, p.l_name, p.dob, p.email, p.contact_country_code, p.contact, p.address, p.profilePicture, c.customer_flyer_num, c.mileage_reward from Persons p JOIN Customers c on c.person_id = p.person_id where p.person_id = ?; ',
    [personId],
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
