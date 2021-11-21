module.exports = (app) => {
  //app.use('/users', require('./users'));
  app.use('/', require('./customerUpdateProfileRoute'));
  app.use('/', require('./EmployeeProfileRoute'));
  app.use('/', require('./LoginRoute'));
  app.use('/', require('./searchFlightsRoute'));
};
