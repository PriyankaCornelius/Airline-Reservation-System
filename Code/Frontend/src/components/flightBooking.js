import React, { Component } from 'react';
// import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TravellerInfo from './travellerInfo';
import SeatBooking from './seatBooking';
import Review from './review';
import Payments from './paymentsPage';
import NavBar from './navigation';
class FlightBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [
        'Review trip itinerary',
        'Add traveller details',
        'Seat Booking Departing Flight',
        'Seat Booking Returning Flight',
      ],
      activeStep: 0,
    };
  }

  // Copyright() {
  //     return (
  //       <Typography variant="body2" color="text.secondary" align="center">
  //         {'Copyright © '}
  //         <Link color="inherit" href="https://mui.com/">
  //           Your Website
  //         </Link>{' '}
  //         {new Date().getFullYear()}
  //         {'.'}
  //       </Typography>
  //     );
  // }

  getStepContent(step) {
    switch (step) {
      case 0:
        return <Review />;
      case 1:
        return <TravellerInfo />;
      case 2:
        return <SeatBooking />;
      case 3: {
        const returningflightSelected = JSON.parse(
          sessionStorage.getItem('returningFlightSelected')
        );
        if (returningflightSelected) return <SeatBooking />;
        else return <h3>No Return Flight Selected</h3>;
      }
      default:
        throw new Error('Unknown step');
    }
  }

  handleNext = (event) => {
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  };

  render() {
    let redirectVar = null;
    if (!cookie.load('cookie')) {
      redirectVar = <Redirect to='/login' />;
    }

    const theme = createTheme();
    return (
      <div>
        {redirectVar}
        <NavBar />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar
            position='absolute'
            color='default'
            elevation={0}
            sx={{
              position: 'relative',
              borderBottom: (t) => `1px solid ${t.palette.divider}`,
            }}
          >
            {/* <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar> */}
          </AppBar>
          <Container component='main' maxWidth='md' sx={{ mb: 4 }}>
            <Paper
              variant='outlined'
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
              <Typography component='h1' variant='h4' align='center'>
                Flight Booking
              </Typography>
              <Stepper activeStep={this.state.activeStep} sx={{ pt: 3, pb: 5 }}>
                {this.state.steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {this.state.activeStep === this.state.steps.length ? (
                  <React.Fragment>
                    {/* <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography> */}
                    <Typography variant='subtitle1'>
                      <Payments></Payments>
                    </Typography>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {this.getStepContent(this.state.activeStep)}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      {this.state.activeStep !== 0 && (
                        <Button onClick={this.handleBack} sx={{ mt: 3, ml: 1 }}>
                          Back
                        </Button>
                      )}

                      <Button
                        variant='contained'
                        onClick={this.handleNext}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        {this.state.activeStep === this.state.steps.length - 1
                          ? 'Book flight'
                          : 'Next'}
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
              </React.Fragment>
            </Paper>
            {/* <Copyright /> */}
          </Container>
        </ThemeProvider>
        );
      </div>
    );
  }
}

export default FlightBooking;
