import React, { Component } from 'react';
import NavBar from './navigation';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Review from './review';
import TravellerInfo from './travellerInfo';
import { Grid, TextField, Checkbox, Typography, Box } from '@mui/material';

class TravelTicket extends React.Component {
    render() { 
        const userDetails=JSON.parse(sessionStorage.getItem('userDetails'));
        console.log('user details');
        console.log(userDetails);
    const departingflightSelected = JSON.parse(sessionStorage.getItem('departingflightSelected'));
    console.log(departingflightSelected);
    const returningflightSelected = JSON.parse(sessionStorage.getItem('returningFlightSelected'));
    const returnPrice=returningflightSelected===null||returningflightSelected===undefined?0:returningflightSelected.totalFare;

    // departingflightSelected['firstname'] = this.state.firstname;
    // departingflightSelected['middlename'] = this.state.middlename;
    // departingflightSelected['lastname'] = this.state.lastname;
    // departingflightSelected['dob'] = this.state.dob;
    // departingflightSelected['passportNumber'] = this.state.passportNumber;
    // departingflightSelected['gender'] = this.state.gender;
        return (
            <div>
                <NavBar></NavBar>
                
                <Container component='main' maxWidth='lg' sx={{ mb: 4 }}>
                <Paper variant='' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Card sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Review/> 
                    </Card>
                     
                    
                <CardContent sx={{ flex: 3 }}>    
                <Grid container spacing={3}>
                <Grid item xs={12} md={3} >
                <Typography component="h5" variant="h5" sx={{ marginBlock:4, color:"gray" }}>
                Passenger Name
                </Typography>
                <Typography component="h5" variant="h5" sx={{ marginBlock:4, color:"gray" }}>
                Passport Number
                </Typography>
                <Typography component="h5" variant="h5" sx={{ marginBlock:4, color:"gray" }}>
                Date of birth
                </Typography>
                {/* <Typography component="h5" variant="h5" sx={{ marginBlock:4, color:"gray" }}>
                Gender
                </Typography> */}
                </Grid>
                
                
                <Grid item xs={12} md={3}>
                <Typography component="h5" variant="h5" sx={{ marginBlock:4 }}>
                {userDetails.firstName} {userDetails.middleName} {userDetails.lastName}
                </Typography>
                <Typography component="h5" variant="h5" sx={{ marginBlock:4 }}>
                {userDetails.passportNumber} 
                </Typography>
                <Typography component="h5" variant="h5" sx={{ marginBlock:4 }}>
                {userDetails.dob} 
                </Typography>
              
                </Grid>
                
                <Grid item xs={12} md={3} >
                {/* <Typography component="h5" variant="h5" sx={{ marginBlock:4 }}>
                Seat Number
                </Typography> */}
              
                <Typography component="h5" variant="h5" sx={{ marginBlock:4,color:"gray" }}>
                Fare Total
                </Typography>
                <Typography component="h5" variant="h5" sx={{ marginBlock:4,color:"gray" }}>
                Date of booking
                </Typography>
                </Grid>
                
                <Grid item xs={12} md={3} >
                
                
                <Typography component="h5" variant="h5" sx={{ marginBlock:4 }}>
                {departingflightSelected.totalFare+returnPrice} 
                </Typography>
                <Typography component="h5" variant="h5" sx={{ marginBlock:4 }}>
                {departingflightSelected.currentDate} 
                </Typography>
                </Grid>
                </Grid>
                </CardContent>
                
                </Paper>
                </Container>
            </div>
        )
      
    }
}
 
export default TravelTicket;