import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { Grid, TextField, Checkbox, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Redirect } from 'react-router';
import {url} from './Constants'
import axios from 'axios';

export default function ErrorRadios() {
  const [value, setValue] = React.useState('');
  const departingflightSelected = JSON.parse(sessionStorage.getItem('departingflightSelected'));
   const returningflightSelected = JSON.parse(sessionStorage.getItem('returningFlightSelected'));
  // const data = {businessPrice: departingflightSelected.business, economyPrice: departingflightSelected.economy, economyPlusPrice: departingflightSelected.economy_plus, firstClassPrice:departingflightSelected.first_class};
  // const returnData = {businessPrice: returningflightSelected.business, economyPrice: returningflightSelected.economy, economyPlusPrice: returningflightSelected.economy_plus, firstClassPrice:returningflightSelected.first_class};

   const seatClassName = departingflightSelected.seatClass;
   var depPrice = '';
   if(seatClassName === 'Business')
      {depPrice = departingflightSelected.business;}
    else if(seatClassName === 'Economy')
      {depPrice = departingflightSelected.economy}
      else if(seatClassName === 'Economy Plus')
      {depPrice = departingflightSelected.economy_plus} 
      else if(seatClassName === 'First Class')
      {depPrice = departingflightSelected.first_class}

      const returnClassName = returningflightSelected.seatClass;
      var returnPrice = '';
      if(returnClassName === 'Business')
         {returnPrice = returningflightSelected.business;}
       else if(returnClassName === 'Economy')
         {returnPrice = returningflightSelected.economy}
         else if(returnClassName === 'Economy Plus')
         {returnPrice = returningflightSelected.economy_plus} 
         else if(returnClassName === 'First Class')
         {returnPrice = returningflightSelected.first_class}
  // const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState();
  // const [seatPrice, setSeatPrice] = React.useState(departingflightSelected.seatPrice);
  const [flightFare, setFlightFare] = React.useState(departingflightSelected.business);
  // const [returnseatPrice, setReturnSeatPrice] = React.useState(returningflightSelected.seatPrice);
  const [returnflightFare, setReturnFlightFare] = React.useState(returningflightSelected.business);
 
  const [totalFare, setTotalFare] = React.useState(parseInt(depPrice.slice(1)));
  const [retTotalFare, setretTotalFare] = React.useState(parseInt(returnPrice.slice(1)));

  const [mileageRewardsEarned, setMileageRewardsEarned] = React.useState('MileagePlus Earnings for this trip : 12$');
  const [roundTripFare, setRoundTripFare] = React.useState( parseInt(depPrice.slice(1))+  parseInt(returnPrice.slice(1)));
  const [insufficientBalance, setInsufficientBalance] = React.useState('');
  const [mileageRewards, setMileageRewards] = React.useState(localStorage.getItem('mileageRewardBalance'));
  // const [reducedMileageRewards, setReducedMileageRewards] = React.useState((totalFare>mileageRewards)? (mileageRewards - totalFare) : 0);
  const [tripMileageRewards, settripMileageRewards] = React.useState();
  const [showTicket, setShowTicket] = React.useState();
 

  // this.setState({
  //   ticketPrice: data.ticketPrice
  // })
  // alert(roundTripFare);
  console.log(roundTripFare);
  // setRoundTripFare(roundTripFare);

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    // setError(false);
  };

//   const data = {
//     personId : sessionStorage.getItem('personId'),
//     ticketPrice : roundTripFare
//   }


//   //roundTripFare = roundTripFare;
//   axios
//   .post(url + '/updateMiles', data)
//   .then((response) => {
//     console.log('response', response.data);
//   })
// .catch((err) => console.log("Something went wrong",err));

  const postTravelTicket = (flightSelected) => {
    // const departingflightSelected = JSON.parse(sessionStorage.getItem('departingflightSelected'));
    // const returningflightSelected = JSON.parse(sessionStorage.getItem('returningFlightSelected'));
    var tktNum = JSON.parse(sessionStorage.getItem("ticketNumber"));
    if (tktNum) {
      flightSelected['ticketNumber']=tktNum
    }
    var personId=JSON.parse(sessionStorage.getItem("personid"));
    flightSelected['personId']=personId;
    flightSelected['value'] = value;
    flightSelected['ticketPrice'] = roundTripFare;

    if (value == 'mileage_rewards'){
        const data = {
    personId : sessionStorage.getItem('personid'),
    ticketPrice : roundTripFare
  }


  //roundTripFare = roundTripFare;
  axios
  .post(url + '/updateMiles', data)
  .then((response) => {
    console.log('response', response.data);
  })
.catch((err) => console.log("Something went wrong",err));
    }
    axios
      .post(`http://localhost:3001/postTravelTicket/`, flightSelected)
      .then((response) => {
        console.log('response', response.data);
      })
    .catch((err) => console.log("tkt creation error",err));
};

  const showTicketHandler = e => {
    const departingflightSelected = JSON.parse(sessionStorage.getItem('departingflightSelected'));
    const returningflightSelected = JSON.parse(sessionStorage.getItem('returningFlightSelected'));

    var dateFromString = new Date();
    let datevalue = dateFromString.getDate(); 
    let month = dateFromString.getMonth();
    let year = dateFromString.getFullYear(); 
    let format = year + "-" + month + "-" + datevalue;

    departingflightSelected['currentDate'] = format;
    departingflightSelected['totalFare'] = totalFare;
   // var roundTripFare = parseInt(totalFare.slice(1));
    sessionStorage.setItem('departingflightSelected', JSON.stringify(departingflightSelected))

    postTravelTicket(departingflightSelected);

    if (returningflightSelected) {
      returningflightSelected['currentDate'] = format;
      returningflightSelected['totalFare'] = retTotalFare;
      //roundTripFare += parseInt(flightFare.slice(1))
      sessionStorage.setItem('returningFlightSelected', JSON.stringify(returningflightSelected))
      postTravelTicket(returningflightSelected);
      
    }
    


    setShowTicket ( <div>
         <Redirect to={{
            pathname: "ticket"
        }}>
        </Redirect>
      </div>)
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === 'card') {
      setInsufficientBalance('');
      setHelperText(
        <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="I agree to the terms and conditions"
            onChange={showTicketHandler}
          />
        </Grid>
      </Grid>
      );
      // setError(false);
    } else if (value === 'mileage_rewards') {
      if (totalFare > mileageRewards) {
        console.log("low bal")
        setInsufficientBalance("Insufficient Balance in Mileage Rewards Account");
        // setReducedMileageRewards(0);
        // setError(true);
      }
      setHelperText(
        
        <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
        <CardActionArea component="a">
        <Card sx={{ display: 'flex' , backgroundColor:"#D4BA6A", justifyContent:"center", marginLeft:'60px', padding:'10px' }}>
          <CardContent sx={{ flex: 3 }}>
          <Typography component="h5" variant="h5">
          Available Reward Balance
          </Typography>
          
          {/* <Typography component="h5" variant="h5">
          Additional Rewards Offered with this trip
          </Typography> */}
          </CardContent>
          
          <CardContent sx={{ flex: 1 }}>
          <Typography component="h5" variant="h5">
          $ {mileageRewards}
          </Typography>
          <Typography component="h5" variant="h5">
         {/* $ {tripMileageRewards} */}
          </Typography>
          </CardContent>
          </Card>
          </CardActionArea> 
        </Grid>
        
        
        
        <Grid item xs={12}>
          {/* {insufficientBalance} */}
          <FormControlLabel
            required
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="I agree to the terms and conditions"
            onChange={showTicketHandler}
          />
        </Grid>
      </Grid>
      );
      
    } else {
      setHelperText('Please select an option.');
      // setError(true);
    }
  };
  
  return (
  <div>
    {showTicket}
      <form onSubmit={handleSubmit}>
      <h4 style={{ color: "red" }}> {insufficientBalance} </h4>
      <FormControl
        fullWidth
        // sx={{ m: 3 }}
        component="fieldset"
        // error={error}
        variant="standard"
      >
        <FormLabel component="legend">
        <Typography component="h3" variant="h3">
              Payment Method
        </Typography>     
        </FormLabel>

        <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
        <RadioGroup
        fullWidth
          aria-label="Payment"
          name="Payment"
          value={value}
          onChange={handleRadioChange}
        >
        <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
        <FormControlLabel value="mileage_rewards" control={<Radio />} label="Mileage Rewards" />
        </RadioGroup>
        </Grid>
        <Grid item xs={12} md={6}>
        <CardActionArea component="a">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
           {/* <Typography component="h5" variant="h5">
             Fare
           </Typography> */}
           {/* <Typography component="h5" variant="h5">
             {departingflightSelected.seatClass} Seat
           </Typography> */}
           <Typography component="h5" variant="h5">
             Total Due
           </Typography>
           </CardContent>
           <CardContent sx={{ flex: 1 }}>
           {/* <Typography component="h5" variant="h5">
              $ {flightFare}
           </Typography>
           <Typography component="h5" variant="h5">
              $ {seatPrice}
           </Typography> */}
           <Typography component="h5" variant="h5">
              $ {roundTripFare}
           </Typography>
           </CardContent>
         </Card>
         </CardActionArea>
        </Grid>
        </Grid>
        <FormHelperText>{helperText}</FormHelperText>

        
        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
          Continue to payment
        </Button>
      </FormControl>
    </form>
    </div>
  );
}

// Your order number is #2001539. We have emailed your order
//             confirmation, and will send you an update when your order has
// shipped.
            