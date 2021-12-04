import React from "react";
import cookie from 'react-cookies';
import { Grid, Divider, Tabs, Tab, Link } from '@mui/material';
import { Navbar } from 'react-bootstrap';

const EmployeeNavBar = (props) => {
  
  let user = "Signed In";
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const LEFT_PROFILE_TABS = [
    {
      icon: <span className="logoText">FlyUnited</span>,
      to: "/",
      href: "/searchFlights",
    },
    {
      label: <span className="navBarText">Search Flights</span>,
      to: "/searchFlights",
      value: "searchFlights",
      href: "/searchFlights",
    },
    {
      label:<span className="navBarText">Reservations</span>,
      to: "/reservations",
      value: "reservations",
      href: "/reservations",
    },
    {
      label:<span className="navBarText">Profile</span>,
      to: "/profilePage",
      value: "profilePage",
      href: "/profile",
      },
      {
        label:<span className="navBarText">Add Flight</span>,
        to: "/AddFlight",
        value: "AddFlight",
        href: "/employee-addFlight",
      },
      {
        label:<span className="navBarText">Cancel Flight</span>,
        to: "/CancelFlight",
        value: "CancelFlight",
        href: "/employee-cancelFlight",
      },
      {
        label:<span className="navBarText">Update Price</span>,
        to: "/UpdatePrice",
        value: "UpdatePrice",
        href: "/employee-updateFlightPrice",
      },
      {
          label: <span className="navBarText" onClick={()=>{sessionStorage.clear();}}>Logout</span>,
          to: "/login",
          value: "logout",
          href: "/login"
      }
  ];

 
    return (
      
    <div>
        <Navbar className="nav" expand="lg" color='blue'>
      <Grid container>
        <Grid item md={12}>
          <Tabs
            value={props.currentTab}
            scrollButtons="false"
            indicatorColor="primary"
          >
            {LEFT_PROFILE_TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                href={tab.href}
                component={Link}
                to={tab.to}
                label={tab.label}
                color={tab.color}
                style={{
                  textTransform: "none",
                  padding: 0,
                  margin: 10,
                  minWidth: "20px",
                }}
                icon={tab.icon}
                indicatorColor="primary"
                textColor="primary"
              />
            ))}
          </Tabs>
        </Grid>
        <Grid item md={3}>
          <Tabs>
            <Tab
              style={{
                textTransform: "none",
                padding: 0,
                margin: 10,
                minWidth: "20px",
              }}
            ></Tab>
          </Tabs>
        </Grid>
        
      </Grid></Navbar>
      <Divider></Divider>
    </div>
  );
};

export default EmployeeNavBar;
