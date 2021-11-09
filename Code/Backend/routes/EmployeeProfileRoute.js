const express = require('express');
var config = require('../store/config');
var dbconnection = config.dbconnection;
const router = express.Router();

router.get('/getAllEmployeesDetails', function (req, res) {
  console.log('Inside employee getAllEmployeesDetails');
  //console.log(req.body);  
  
  dbconnection.query(
    'SELECT * from Persons p JOIN Employees e on e.person_id = p.person_id;',   
    async (err, output, fields) => {
      if (err) {
        res.status(400).send('Error!');
      } else {
        //console.log(output)
        res.status(200).send(output);
      }
    }
  );
});

router.get('/getEmployeeDetails', function (req, res) {
    console.log('Inside employee getEmployeeDetails');
    //console.log(req.body);  
    const personId = req.params.id;

    dbconnection.query(
      'SELECT * from Persons p JOIN Employees e on e.person_id = p.person_id where p.person_id = ?;', 
       [personId],   
      async (err, output, fields) => {
        if (err) {
          res.status(400).send('Error!');
        } else {
          //console.log(output)
          res.status(200).send(output);
        }
      }
    );
  });
  

router.post('/employeeUpdateProfile', (req, res) => {
  console.log('Inside  customer updateprofile');
  console.log(req.body);
  const person_id = req.body.person_id;
  const f_name = req.body.f_name;
  const m_name = req.body.m_name;
  const l_name = req.body.l_name;
  const dob = req.body.dob;
  const email = req.body.email;
  const contact_country_code = req.body.contact_country_code;
  const contact = req.body.contact;
  const address = req.body.address;
  const profilePicture = req.body.profilePicture;
  sqlquery =
    "UPDATE Persons SET f_name = '" +
    f_name +
    "' , m_name = '" +
    m_name +
    "' , l_name = '" +
    l_name +
    "' , dob = '" +
    dob +
    "' , email = '" +
    email +
    "' , contact_country_code = '" +
    contact_country_code +
    "' , contact = '" +
    contact +
    "' , address = '" +
    address +
    "' , profilePicture = '" +
    profilePicture +
    "' WHERE person_id = " +
    person_id;

  dbconnection.query(sqlquery, (err, output, fields) => {
    if (err) {
      res.status(400).send('Error!');
    } else {
      req.session.cookie.email = email;
      res.status(200).send({
        email: email,
        profilePicture: profilePicture,
      });
    }
  });
});



module.exports = router;
