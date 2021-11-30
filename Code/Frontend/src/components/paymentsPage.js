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
export default function ErrorRadios() {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState();
  const [seatPrice, setSeatPrice] = React.useState(JSON.parse(localStorage.getItem('travelTicket')).seatPrice);
  const [flightFare, setFlightFare] = React.useState(JSON.parse(localStorage.getItem('travelTicket')).seatPrice);
  const [totalFare, setTotalFare] = React.useState(seatPrice+flightFare);
  const [mileageRewardsEarned, setMileageRewardsEarned] = React.useState('MileagePlus Earnings for this trip : 12$');
  const [insufficientBalance, setInsufficientBalance] = React.useState('');
  const [mileageRewards, setMileageRewards] = React.useState(localStorage.getItem('mileageRewardBalance'));

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === 'card') {
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
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
      );
      setError(false);
    } else if (value === 'mileage_rewards') {
      if (totalFare > mileageRewards) {
        console.log("low bal")
        setInsufficientBalance("Insufficient Balance");
        setError(true);
      }
      setHelperText(
        
        <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography component="h5" variant="h5">
          Available Reward Balance
           </Typography>
           <Typography component="h5" variant="h5">
          {mileageRewards}
           </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
        <Card sx={{ display: 'flex' }}>
           <CardContent sx={{ flex: 1 }}>
           <Typography component="h5" variant="h5">
             Fare
           </Typography>
           <Typography component="h5" variant="h5">
             {JSON.parse(localStorage.getItem('travelTicket')).seatClass}
           </Typography>
           <Typography component="h5" variant="h5">
             Total Due
           </Typography>
           </CardContent>
           <CardContent sx={{ flex: 1 }}>
           <Typography component="h5" variant="h5">
              $ {flightFare}
           </Typography>
           <Typography component="h5" variant="h5">
              $ {seatPrice}
           </Typography>
           <Typography component="h5" variant="h5">
              $ {totalFare}
           </Typography>
           </CardContent>
         </Card>
        </Grid>
        
        
        <Grid item xs={12}>
          {insufficientBalance}
          <FormControlLabel
            required
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="I agree to all the terms and conditions"
          />
        </Grid>
      </Grid>
      );
      
    } else {
      setHelperText('Please select an option.');
      setError(true);
    }
  };

  return (
      <form onSubmit={handleSubmit}>
          
      <FormControl
        sx={{ m: 3 }}
        component="fieldset"
        error={error}
        variant="standard"
      >
        <FormLabel component="legend">
        <Typography component="h3" variant="h3">
              Payment Method
        </Typography>     
        </FormLabel>
        <RadioGroup
          aria-label="Payment"
          name="Payment"
          value={value}
          onChange={handleRadioChange}
        >
        <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
        <FormControlLabel value="mileage_rewards" control={<Radio />} label="Mileage Rewards" />
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
          Continue to payment
        </Button>
      </FormControl>
    </form>
  );
}

// Your order number is #2001539. We have emailed your order
//             confirmation, and will send you an update when your order has
// shipped.
            