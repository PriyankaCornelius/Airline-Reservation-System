const { sign } = require('crypto');
const express = require('express');
var config = require('../store/config');
var dbconnection = config.dbconnection;
const router = express.Router();
router.post('/login', function (req, res) {
    const email = req.body.email;
    const password=req.body.password;
    const loginQuery="Select * from Persons p where p.email='"+email+"' and password='"+password+"'";
    dbconnection.query(
        loginQuery,
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
 
  router.post('/Signup', function (req, res) {
    const email = req.body.email;
    const password=req.body.password;
    console.log(req.body);
    const signupQuery=" INSERT INTO  Persons(email,password) values('" +
    email +
    "','"+password+"')";
    console.log(signupQuery);
    dbconnection.query(
        signupQuery,
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
   module.exports = router;