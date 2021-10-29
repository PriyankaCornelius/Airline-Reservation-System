const express = require('express');
// const jwt = require('jsonwebtoken');
// const passport = require('passport');
var config = require('../store/config');
var dbconnection = config.dbconnection;
const router = express.Router();

router.get('/getuserdetails/:id', function (req, res) {
  console.log('Inside  getuserprofile');
  //console.log(req.body);
  const personId = req.params.id;
  console.log(personId);
  dbconnection.query(
    'SELECT p.f_name, p.l_name, p.dob, p.email, p.contact_country_code, p.contact, p.address, p.profilePicture, c.customer_flyer_num, c.mileage_reward from Persons p JOIN Customers c on c.person_id = p.person_id where p.person_id = ?; ',
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

//   router.post('/updateprofile', passport.authenticate('jwt', { session: false }), (req, res) => {
//     console.log('Inside  updateprofile');
//     console.log(req.body);
//     const _id = req.user._id;
//     const username = req.body.data.username;
//     const email = req.body.data.email;
//     const phonenumber = req.body.data.phonenumber;
//     const defaultcurrency = req.body.data.defaultcurrency;
//     const timezone = req.body.data.timezone;
//     const language = req.body.data.language;
//     const profilepic = req.body.data.profilephoto;
//     Users.findOneAndUpdate(
//       { _id },
//       {
//         $set: {
//           username: username,
//           email: email,
//           userphone: phonenumber,
//           usercurrency: defaultcurrency,
//           userlanguage: language,
//           usertimezone: timezone,
//           userprofilephoto: profilepic,
//         },
//       },
//       { new: true }
//     )
//       .then((user) =>
//         res.status(200).send({
//           username: username,
//           user_id: _id,
//           email: email,
//           profilepic: profilepic,
//           currencydef: defaultcurrency,
//         })
//       )
//       .catch((err) => {
//         console.log(err);
//         res.status(400).send('Error!');
//       });
//   });
module.exports = router;
