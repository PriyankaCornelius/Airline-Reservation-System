import React from "react";
// import { Tabs, Tab, Divider, Grid } from "@material-ui/core";
// import SignIn from "./signIn";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
// import EmployersJobPost from "../Employer/employersJobPost";
// import indeedLogo from "../../Images/IndeedIcon.png";
// import { Link } from "react-router-dom";
// import UploadResume from "./uploadResume";
//  import ProfileIconData from "./profileIconData";
import { Grid, Divider, Tabs, Tab, Link } from '@mui/material';
import { Navbar } from 'react-bootstrap';

const NavBar = (props) => {
  let RIGHT_PROFILE_TABS;
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
      label:<span className="navBarText">Profile</span>,
      to: "/profilePage",
      value: "profilePage",
      href: "/profile",
    },
      {
          label: <span className="navBarText">Logout</span>,
          to: "/login",
          value: "logout",
          href: "/login"
      }
  ];

  if (user === "Signed In") {
    RIGHT_PROFILE_TABS = [
      {
        value: "profile",
        icon: <PersonIcon width={20} height={20} onClick={handleClick} />,
        style: {
          textTransform: "none",
          padding: 0,
          margin: 10,
          minWidth: "30px",
          color: "black",
        },
      },

      {
        label: "Employers / Post Job",
        // href: "/employersPostJobs",
        value: "employersPostJobs",
        style: {
          textTransform: "none",
          padding: 0,
          margin: 10,
          minWidth: "20px",
          color: "black",
        },
      },
    ];
  } else {
    RIGHT_PROFILE_TABS = [
      {
        label: "Upload your resume",
        // href: "/uploadResume",
        // component: <UploadResume />,
        value: "uploadResume",
        style: {
          textTransform: "none",
          padding: 0,
          margin: 10,
          minWidth: "20px",
          color: "black",
        },
      },
      {
        label: "Sign in",
        // href: "/signIn",
        // component: <SignIn />,
        value: "signIn",
        style: {
          textTransform: "none",
          padding: 0,
          margin: 10,
          minWidth: "20px",
          color: "#121858",
          fontWeight: 600,
        },
      },
      {
        label: "Employers / Post Job",
        // href: "/employersPostJobs",
        // component: <EmployersJobPost />,
        value: "employersPostJobs",
        style: {
          textTransform: "none",
          padding: 0,
          margin: 10,
          minWidth: "20px",
          color: "black",
        },
      },
    ];
  }
    return (
      
    <div>
        <Navbar className="nav" expand="lg" color='blue'>
      <Grid container>
        <Grid item md={5}>
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
        <Grid item md={4}>
          <Tabs value={props.currentTab} scrollButtons="false">
            {RIGHT_PROFILE_TABS.map((tab) => {
              return (
                <Tab
                  key={tab.value}
                  value={tab.value}
                  href={tab.href}
                  label={tab.label}
                  style={tab.style}
                  icon={tab.icon}
                />
              );
            })}
            
          </Tabs>
        </Grid>
      </Grid></Navbar>
      <Divider></Divider>
    </div>
  );
};

export default NavBar;
