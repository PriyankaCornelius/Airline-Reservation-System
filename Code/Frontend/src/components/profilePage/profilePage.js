import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import Button from 'react-bootstrap/Button';
import { Form, Image } from 'react-bootstrap';
import { uploadFile } from 'react-s3';
import Navheader from '../navbar/navbar';

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
    const personid1 = sessionStorage.getItem('personid');
    this.setState({
      personid: personid1,
    });
    this.getusercurrentdetails(personid1);
  }

  getusercurrentdetails = (personid) => {
    axios
      .get(`http://localhost:3001/getuserdetails/${personid}`, {
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
        // sessionStorage.setItem('username', response.data[0].f_name);
        // sessionStorage.setItem('useremail', response.data[0].email);
        // sessionStorage.setItem('profilepic', response.data[0].profilePicture);
        // sessionStorage.setItem(
        //   'customer_flyernum',
        //   response.data[0].customer_flyer_num
        // );
        // sessionStorage.setItem(
        //   'mileage_reward',
        //   response.data[0].mileage_reward
        // );
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
    };

    const emailpattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,4})$/;
    const phnpattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    const dobpattern = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;

    const { firstname, email, contact, dob } = this.state;

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

    if (!dobpattern.test(dob)) {
      formisvalid = false;
      formerrors.doberrors = 'Date of birth not of format "YYYY-MM-DD"!';
      console.log(formerrors.doberrors);
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
        .post('http://localhost:3001/customerUpdateProfile', data)
        .then((response) => {
          // console.log('Status Code : ', response.status);
          if (response.status === 200) {
            // console.log(response.data);
            sessionStorage.setItem('firstname', response.data.f_name);
            sessionStorage.setItem('useremail', response.data.email);
            sessionStorage.setItem('profilepic', response.data.profilePicture);
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
      redirectVar = <Redirect to='/' />;
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
    const { firstnameerrors, emailerrors, contacterrors, doberrors } =
      this.state;
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
        <Navheader />
        <div className='profilepage-block'>
          <h2 className='h2'> Your account </h2>
          <h3 className='h3'> Flyer Number : {customer_flyer_num}</h3>
          <section>
            <div className='avatar-div'>
              <Image src={profilepic} className='avatar1' alt='profile pic' />
              <br />
              <label htmlFor='profile_avatar'>
                <strong> Change your avatar </strong> <br />
                <input
                  type='file'
                  name='profile_avatar'
                  id='profile_avatar'
                  onChange={this.profilephtochangeHandler}
                />
              </label>
            </div>
          </section>

          <section>
            <Form
              ref={this.profileform}
              id='profileform'
              className='profileform'
            >
              <section className='center-block'>
                <div className='basic_div'>
                  <strong>Your Name </strong>
                  <br />
                  <label htmlFor='firstname'>
                    <strong>First Name:</strong>
                    <input
                      type='text'
                      name='firstname'
                      id='firstname'
                      defaultValue={firstname}
                      onChange={this.firstnamechangeHandler}
                    />
                  </label>
                  {firstnameerrors && (
                    <span className='errmsg' style={{ color: 'maroon' }}>
                      {' '}
                      {firstnameerrors}{' '}
                    </span>
                  )}
                  <label htmlFor='middlename'>
                    <strong>Middle Name:</strong>
                    <input
                      type='text'
                      name='middlename'
                      id='middlename'
                      defaultValue={middlename}
                      onChange={this.middlenamechangeHandler}
                    />
                  </label>
                  <label htmlFor='lastname'>
                    <strong>Last Name:</strong>
                    <input
                      type='text'
                      name='lastname'
                      id='lastname'
                      defaultValue={lastname}
                      onChange={this.lastnamechangeHandler}
                    />
                  </label>
                  <br />
                  <br />
                  <label htmlFor='email'>
                    <strong>Your Email Address</strong> <br />
                    <input
                      type='email'
                      name='email'
                      id='email'
                      defaultValue={email}
                      onChange={this.emailChangeHandler}
                    />
                  </label>
                  {emailerrors && (
                    <span className='errmsg' style={{ color: 'maroon' }}>
                      {' '}
                      {emailerrors}{' '}
                    </span>
                  )}
                  <br />
                  <br />
                  <label htmlFor='dob'>
                    <strong> Your date of birth </strong> <br />
                    <input
                      type='dob'
                      name='dob'
                      id='dob'
                      defaultValue={dob === null ? 'YYYY-MM-DD' : dob}
                      onChange={this.dobChangeHandler}
                    />
                  </label>
                  {doberrors && (
                    <span className='errmsg' style={{ color: 'maroon' }}>
                      {' '}
                      {doberrors}{' '}
                    </span>
                  )}
                </div>
              </section>

              <section className='right-block'>
                <div className='default_div'>
                  <label htmlFor='address'>
                    <strong> Your Address:</strong> <br />
                    {/* <textarea rows='2' cols='25'> */}
                    <input
                      type='text'
                      name='address'
                      id='address'
                      defaultValue={address}
                      onChange={this.addressChangeHandler}
                    />
                    {/* </textarea> */}
                  </label>
                  <br />
                  <br />
                  <label htmlFor='phonenumber'>
                    <strong> Your phone number </strong>
                    <br />
                    <strong> Country Code: </strong>
                    <br />
                    <input
                      type='text'
                      name='contact_county_code'
                      id='contact_county_code'
                      defaultValue={contact_country_code}
                      onChange={this.contactCountryCodeChangeHandler}
                    />
                    <br />
                    <strong> Contact: </strong>
                    <br />
                    <input
                      type='text'
                      name='contact'
                      id='contact'
                      defaultValue={contact}
                      onChange={this.contactChangeHandler}
                    />
                  </label>
                  {contacterrors && (
                    <span className='errmsg' style={{ color: 'maroon' }}>
                      {' '}
                      {contacterrors}{' '}
                    </span>
                  )}
                  <br />

                  <br />
                </div>
                <div className='savebtn' data-testid='Saveupdates'>
                  <Button className='Save-default' onClick={this.submitsave}>
                    Save
                  </Button>
                </div>
              </section>
            </Form>
          </section>
        </div>
      </div>
    );
  }
}

export default Profilepage;
