var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
const multer = require('multer');
app.set('view engine', 'ejs');
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(
  session({
    secret: 'cmpe202',
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  })
);

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

const dbconnection = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  ssl: true,
  database: '',
  multipleStatements: true,
});

app.get('/getuserdetails/:id', function (req, res) {
  console.log('Inside  getuserprofile');
  //console.log(req.body);
  const userid = req.params.id;
  console.log(userid);
  dbconnection.query(
    'SELECT * FROM users where userid = ? ',
    [userid],
    async (err, output, fields) => {
      if (err) {
        //console.log(err);
        res.status(400).send('Error!');
      } else {
        //console.log(output)
        res.status(200).send(output);
      }
    }
  );
});

app.listen(3001);
console.log('Server Listening on port 3001');
