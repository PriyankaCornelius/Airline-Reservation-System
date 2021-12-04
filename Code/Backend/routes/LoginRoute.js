const { sign } = require('crypto');
const express = require('express');
var config = require('../store/config');
const moment = require('moment');
var dbconnection = config.dbconnection;
const router = express.Router();
router.post('/login', function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const loginQuery =
    "Select p.person_id,p.f_name, p.m_name,p.l_name,p.dob, p.email,p.person_role_id, p.profilePicture,p.contact_country_code,p.contact, p.passport_num, c.customer_flyer_num, c.miles_travelled, c.mileage_reward, e.employed_date, e.employee_shift, e.employee_location_country_id, e.employee_position, e.airport_id, e.employee_job_type from Persons p left outer join Employees e on e.person_id=p.person_id left outer join Customers c  on  c.person_id=p.person_id where p.email='" +
    email +
    "' and p.password='" +
    password +
    "'";
  console.log(loginQuery);
  dbconnection.query(loginQuery, async (err, output, fields) => {
    if (err) {
      const loginResponse = {
        errorCode: 'E01',
        errorDesc: 'Incorrect email/password. Please try again',
      };
      console.log('error');
      res.status(500).send(loginResponse);
    } else {
      console.log(output);
      console.log(output.length);
      if (output.length === 0) {
        const loginResponse = {
          errorCode: 'E01',
          errorDesc: 'Incorrect email/password. Please try again',
        };
        res.status(500).send(loginResponse);
      } else {
        res.cookie('cookie', email, {
          maxAge: 900000,
          httpOnly: false,
          path: '/',
        });
        req.session.cookie.email = email;
        res.status(200).send(output);
      }
    }
  });
});

router.post('/Signup', function (req, res) {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const middleName = req.body.middleName;
  const lastName = req.body.lastName;
  const dob = req.body.dob;
  // const parsedDate = moment(dob, 'MM/DD/YYYY').format('YYYY-MM-DD');
  const roleId = req.body.roleId;
  // console.log(parsedDate);

  const phoneNumber = req.body.phoneNumber;
  const countryCode = req.body.countryCode;
  console.log(req.body);
  const signupQuery =
    " INSERT INTO  Persons(email,password,f_name,m_name,l_name,dob,contact,contact_country_code,person_role_id) values('" +
    email +
    "','" +
    password +
    "','" +
    firstName +
    "','" +
    middleName +
    "','" +
    lastName +
    "','" +
    dob +
    "','" +
    phoneNumber +
    "','" +
    countryCode +
    "','" +
    roleId +
    "')";
  console.log(signupQuery);

  dbconnection.query(signupQuery, async (err, output, fields) => {
    if (err) {
      const signupResponse = {
        errorCode: 'E01',
        errorDesc: 'Something went wrong.Please try again.',
      };
      res.status(500).send(signupResponse);
    } else {
      console.log(output);
      //console.log(output);
      const personId = output.insertId;
      const flyerId = Math.floor(Math.random() * 900000000000) + 100000000000;

      const flyerNumberQuery =
        "INSERT INTO Customers(person_id,customer_flyer_num) values('" +
        personId +
        "','" +
        flyerId +
        "')";
      console.log(flyerId);
      console.log(personId);
      console.log(flyerNumberQuery);
      dbconnection.query(flyerNumberQuery, async (err, result, fields) => {
        if (err) {
          res.status(400).send('Error!');
        } else {
          let signupResponse = {
            personId: personId,
            customerFlyerNum: flyerId,
            roleId: 2,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            mileageReward: 0,
          };
          res.cookie('cookie', email, {
            maxAge: 900000,
            httpOnly: false,
            path: '/',
          });

          req.session.cookie.email = email;
          res.status(201).send(signupResponse);
        }
      });
    }
  });
});
module.exports = router;
