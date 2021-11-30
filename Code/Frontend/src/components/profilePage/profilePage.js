import React, { Component } from 'react';
import axios from 'axios';
import { url } from '../Constants';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { Form, Image } from 'react-bootstrap';
import { uploadFile } from 'react-s3';
// import Navheader from '../navbar/navbar';
import NavBar from '../navigation';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Grid, TextField, Button, Typography } from '@mui/material';

// import DefaultAvatar from '../../../public/Profile_photos/default_avatar.png'; // import DefaultAvatar from '../  Profile_photos/default_avatar.png';

import '../navbar/navbar.css';
import './profilePage.css';

class Profilepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personid: '',
      profilePicture: null,
      firstname: '',
      middlename: '',
      lastname: '',
      dob: '',
      email: '',
      customer_flyer_num: '',
      mileage_reward: '',
      contact_country_code: '',
      contact: '',
      address: '',
      redirecttohome: null,
      updatedpic: false,
      setSelectedfile: null,
      firstnameerrors: '',
      emailerrors: '',
      countrycodeerrors: '',
      contacterrors: '',
      doberrors: '',
    };

    // Bind the handlers to this class
    this.firstnamechangeHandler = this.firstnamechangeHandler.bind(this);
    this.middlenamechangeHandler = this.middlenamechangeHandler.bind(this);
    this.lastnamechangeHandler = this.lastnamechangeHandler.bind(this);
    this.dobChangeHandler = this.dobChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.contactCountryCodeChangeHandler =
      this.contactCountryCodeChangeHandler.bind(this);
    this.contactChangeHandler = this.contactChangeHandler.bind(this);
    this.profilephtochangeHandler = this.profilephtochangeHandler.bind(this);
    this.addressChangeHandler = this.addressChangeHandler.bind(this);
    this.submitsave = this.submitsave.bind(this);
  }

  componentDidMount() {
    // sessionStorage.setItem('personid', 1);
    // const personid1 = JSON.parse(
    //   sessionStorage.getItem('userDetails')
    // ).personId;
    const personid1 = sessionStorage.getItem('personid');
    this.setState({
      personid: personid1,
    });
    this.getusercurrentdetails(personid1);
  }

  getusercurrentdetails = (personid) => {
    axios
      .get(url + `/getuserdetails/${personid}`, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((response) => {
        console.log('response.data');
        console.log(response.data);
        this.setState({
          firstname: response.data[0].f_name,
          middlename: response.data[0].m_name,
          lastname: response.data[0].l_name,
          email: response.data[0].email,
          profilePicture: response.data[0].profilePicture,
          address: response.data[0].address,
          contact: response.data[0].contact,
          contact_country_code: response.data[0].contact_country_code,
          dob: response.data[0].dob,
          customer_flyer_num: response.data[0].customer_flyer_num,
          mileage_reward: response.data[0].mileage_reward,
        });
      })
      .catch((err) => console.log(err));
  };

  firstnamechangeHandler = (e) => {
    this.setState({
      firstname: e.target.value,
    });
  };
  middlenamechangeHandler = (e) => {
    this.setState({
      middlename: e.target.value,
    });
  };
  lastnamechangeHandler = (e) => {
    this.setState({
      lastname: e.target.value,
    });
  };

  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  contactCountryCodeChangeHandler = (e) => {
    this.setState({
      contact_country_code: e.target.value,
    });
  };
  contactChangeHandler = (e) => {
    this.setState({
      contact: e.target.value,
    });
  };
  addressChangeHandler = (e) => {
    this.setState({
      address: e.target.value,
    });
  };
  dobChangeHandler = (e) => {
    this.setState({
      dob: e.target.value,
    });
  };

  profilephtochangeHandler = (e) => {
    const S3_BUCKET = 'cmpe202spartans';
    const REGION = 'us-east-2';
    const ACCESS_KEY = 'AKIAIKOUILTMTMLWTNDQ';
    const SECRET_ACCESS_KEY = '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';

    const config = {
      bucketName: S3_BUCKET,
      region: REGION,
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
    };
    this.setState({
      // profilephoto: e.target.files[0],
      setSelectedfile: e.target.files[0],
      updatedpic: true,
    });
    const { setSelectedfile } = this.state;
    // console.log(setSelectedfile);
    uploadFile(e.target.files[0], config)
      .then((data) => {
        const loc = data.location;
        // console.log(loc);
        this.setState({
          profilePicture: loc,
        });
      })
      .catch((err) => console.error(err));
  };

  isformvalid = () => {
    let formisvalid = true;
    const formerrors = {
      firstnameerrors: '',
      emailerrors: '',
      doberrors: '',
      contacterrors: '',
      countrycodeerrors: '',
    };

    const emailpattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,4})$/;
    // const phnpattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    const phnpattern = /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    const countrycodepattern = /^(\+\d{1,2})/;
    const dobpattern = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;

    const { firstname, email, contact, dob, contact_country_code } = this.state;

    if (firstname.length === 0) {
      formisvalid = false;
      formerrors.firstnameerrors = 'FirstName cannot be blank!';
      console.log(formerrors.firstnameerrors);
    }

    if (!emailpattern.test(email)) {
      formisvalid = false;
      if (email.length === 0) {
        formerrors.emailerrors = 'Email address cannot be blank!';
      } else {
        formerrors.emailerrors = 'Email ID is not Valid!';
      }
      console.log(formerrors.emailerrors);
    }

    if (!dobpattern.test(dob) && dob.length > 0) {
      formisvalid = false;
      formerrors.doberrors = 'Date of birth not of format "YYYY-MM-DD"!';
      console.log(formerrors.doberrors);
    }

    if (contact.length < 1 && contact_country_code.length > 0) {
      formisvalid = false;
      formerrors.countrycodeerrors = 'Please enter phone number!';
      console.log(formerrors.countrycodeerrors);
    }

    if (
      !countrycodepattern.test(contact_country_code) &&
      contact_country_code.length > 0
    ) {
      console.log('here');
      formisvalid = false;
      formerrors.countrycodeerrors = 'Country Code is not valid!';
      console.log(formerrors.countrycodeerrors);
    }

    if (!phnpattern.test(contact) && contact.length > 0) {
      formisvalid = false;
      formerrors.contacterrors = 'Phone Number is not valid!';
      console.log(formerrors.contacterrors);
    }

    this.setState((prevstate) => ({
      ...prevstate,
      ...formerrors,
    }));
    return formisvalid;
  };

  submitsave = (e) => {
    e.preventDefault();
    const {
      personid,
      profilePicture,
      firstname,
      lastname,
      middlename,
      dob,
      email,
      contact_country_code,
      contact,
      address,
    } = this.state;

    const formisvalidated = this.isformvalid();

    if (formisvalidated) {
      const data = {
        personid,
        firstname,
        lastname,
        middlename,
        dob,
        email,
        address,
        contact_country_code,
        contact,
        profilePicture,
      };
      console.log(data);

      axios
        .post(url + '/customerUpdateProfile', data)
        .then((response) => {
          // console.log('Status Code : ', response.status);
          if (response.status === 200) {
            // console.log(response.data);
            sessionStorage.setItem('personid', response.data[0].person_id);
            sessionStorage.setItem('username', response.data[0].f_name);
            sessionStorage.setItem('useremail', response.data[0].email);
            sessionStorage.setItem(
              'profilepic',
              response.data[0].profilePicture
            );
            sessionStorage.setItem(
              'customer_flyernum',
              response.data[0].customer_flyer_num
            );
            sessionStorage.setItem(
              'mileage_reward',
              response.data[0].mileage_reward
            );
            this.getusercurrentdetails(personid);
            this.setState({
              updatedpic: false,
            });
            //const redirectVar1 = <Redirect to="/dashboard" />;
            //this.setState({ redirecttohome: redirectVar1 });
          } else {
            this.setState({
              redirecttohome: null,
            });
          }
        })
        .catch((err) => {
          console.log(err.response);
          alert(err.response.data);
          this.setState({
            errorMessage: err.response.data,
          });
          const { errorMessage } = this.state;
          console.log(errorMessage);
        });
    }
  };

  render() {
    let redirectVar = null;
    if (!cookie.load('cookie')) {
      redirectVar = <Redirect to='/login' />;
    }
    //const { redirecttohome } = this.state;
    const {
      personid,
      profilePicture,
      firstname,
      lastname,
      middlename,
      dob,
      email,
      contact_country_code,
      contact,
      address,
      customer_flyer_num,
    } = this.state;

    const { redirecttohome } = this.state;
    const {
      firstnameerrors,
      emailerrors,
      contacterrors,
      doberrors,
      countrycodeerrors,
    } = this.state;
    // console.log(redirecttohome);
    const imagename = sessionStorage.getItem('profilepic');
    // console.log(imagename);
    let profilepic;
    profilepic = imagename;
    if (imagename === 'null' || imagename === '' || imagename === ' ') {
      profilepic =
        'https://cmpe202spartans.s3.us-east-2.amazonaws.com/default_pic.png';
      console.log(profilepic);
    } else {
      profilepic = imagename;
      console.log(profilepic);
    }
    // console.log(profilepic);
    // if (profilephoto) profilepic = DefaultAvatar;
    return (
      <div>
        {/* {redirectVar} */}
        <NavBar />

        <Container component='main' maxWidth='lg' sx={{ mb: 4 }}>
          <Paper variant='' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Card sx={{ display: 'flex', justifyContent: 'center' }}>
              <CardMedia
                type='file'
                component='img'
                sx={{ width: 400 }}
                image='https://www.scarymommy.com/wp-content/uploads/2019/11/michael-scott-quotes.jpg'
                alt='alt'
              />
              {/* <Image src={profilepic} className='avatar1' alt='profile pic' />
          <label htmlFor='profile_avatar'>
                <strong> Change your avatar </strong> <br />
                <input
                  type='file'
                  name='profile_avatar'
                  id='profile_avatar'
                  onChange={this.profilephtochangeHandler}
                />
              </label> */}

              <CardContent sx={{ flex: 1 }}>
                <Form
                  ref={this.profileform}
                  id='profileform'
                  className='profileform'
                  onSubmit={this.submitsave}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id='firstname'
                        name='firstname'
                        label='First Name'
                        fullWidth
                        autoComplete='firstname'
                        variant='standard'
                        value={firstname}
                        onChange={this.firstnamechangeHandler}
                        type='text'
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id='middlename'
                        name='middlename'
                        label='Middle Name'
                        fullWidth
                        autoComplete='Middle Name'
                        variant='standard'
                        value={middlename}
                        onChange={this.middlenamechangeHandler}
                        type='text'
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id='lastname'
                        name='lastname'
                        label='Last Name'
                        fullWidth
                        autoComplete='Last Name'
                        variant='standard'
                        value={lastname}
                        onChange={this.lastnamechangeHandler}
                        type='text'
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id='email'
                        name='email'
                        label='Email'
                        fullWidth
                        autoComplete='Email'
                        variant='standard'
                        value={email}
                        onChange={this.emailChangeHandler}
                        type='email'
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>Date of Birth</Typography>
                      <TextField
                        id='dob'
                        name='dob'
                        // label="Date of Birth"
                        fullWidth
                        autoComplete='Date of Birth'
                        variant='standard'
                        // value={dob === null ? 'YYYY-MM-DD' : dob}
                        value={dob}
                        onChange={this.dobChangeHandler}
                        type={'date'}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id='address'
                        name='address'
                        label='Address'
                        fullWidth
                        autoComplete='Address'
                        variant='standard'
                        value={address}
                        onChange={this.addressChangeHandler}
                        type='text'
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        id='contact_county_code'
                        name='contact_county_code'
                        label='Country Code'
                        fullWidth
                        autoComplete='Country Code'
                        variant='standard'
                        value={contact_country_code}
                        onChange={this.contactCountryCodeChangeHandler}
                        type='text'
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <TextField
                        id='contact'
                        name='contact'
                        label='Contact Number'
                        fullWidth
                        autoComplete='Contact '
                        variant='standard'
                        value={this.state.contact}
                        onChange={this.contactChangeHandler}
                        type={'number'}
                        required
                      />
                    </Grid>
                    <Button
                      type='submit'
                      variant='contained'
                      sx={{ mt: 3, ml: 50 }}
                      // onClick={this.submitsave}
                    >
                      Save
                    </Button>
                  </Grid>
                </Form>
              </CardContent>
            </Card>
          </Paper>
        </Container>
      </div>
    );
  }
}

export default Profilepage;
