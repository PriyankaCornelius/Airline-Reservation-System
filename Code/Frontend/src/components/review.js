import React, { Component } from 'react';
import { Grid, TextField, Checkbox, Typography, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import FlightIcon from '@mui/icons-material/Flight';
class Review extends React.Component {

    render() { 
    const departingflightSelected = JSON.parse(sessionStorage.getItem('departingflightSelected'));
    const returningflightSelected = JSON.parse(sessionStorage.getItem('returningFlightSelected'));
        console.log("returningflightSelected", returningflightSelected);
    // arrival_time: "3:45:56 PM"
    // business: "$2854.21"
    // departure_time: "10:40:56 AM"
    // destination: "JFK"
    // duration: "5h 5m "
    // economy: "$1604.71"
    // economy_plus: "$1904.96"
    // first_class: "$2354.46"
    // flight_num: 675
    // number_of_stops: "2 stops"
    // origin: "LAX"
        return <div>

            <Grid container spacing={3}>
            <Grid item xs={12}>
            <CardActionArea component="a">
            <Card sx={{ display: 'flex',justifyContent:"center", padding:'10px' }}>
            <CardContent sx={{ flex: 3 }}>    
            <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
                <Typography component="h4" variant="h4">
                Date
                </Typography>
                <Typography component="h2" variant="h2">
                {departingflightSelected.departure_time}
                </Typography>
                <Typography component="h4" variant="h4">
                {departingflightSelected.origin}
                </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
                <FlightIcon sx={{ fontSize: 40 , transform: "rotate(90deg)"}}></FlightIcon>
                <Typography component="h5" variant="h5">
                {departingflightSelected.number_of_stops}
                </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
                <Typography component="h4" variant="h4">
                Date
                </Typography>
                <Typography component="h2" variant="h2">
                {departingflightSelected.arrival_time}
                </Typography>
                <Typography component="h4" variant="h4">
                {departingflightSelected.destination}
                </Typography>
            </Grid>
            
               </Grid> 
            </CardContent>
            </Card>
            </CardActionArea>
            </Grid>
            {returningflightSelected ? (
               
            <Grid item xs={12}>
            <CardActionArea component="a">
            <Card sx={{ display: 'flex',justifyContent:"center",  padding:'10px' }}>
            <CardContent sx={{ flex: 3 }}>
            <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
                <Typography component="h4" variant="h4">
                Date
                </Typography>
                <Typography component="h2" variant="h2">
                {returningflightSelected.departure_time}
                </Typography>
                <Typography component="h4" variant="h4">
                {returningflightSelected.origin}
                </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
            <FlightIcon sx={{ fontSize: 40 , transform: "rotate(90deg)"}}></FlightIcon>
            <Typography component="h5" variant="h5">
            {returningflightSelected.number_of_stops}
            </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
                <Typography component="h4" variant="h4">
                Date
                </Typography>
                <Typography component="h2" variant="h2">
                {returningflightSelected.arrival_time}
                </Typography>
                <Typography component="h4" variant="h4">
                {returningflightSelected.destination}
                </Typography>
            </Grid>
            </Grid>
            </CardContent>
            </Card>
            </CardActionArea>    
            </Grid>
            ):<div></div>}
            
            
                
            </Grid>
        </div>;
    }
}
 
export default Review;