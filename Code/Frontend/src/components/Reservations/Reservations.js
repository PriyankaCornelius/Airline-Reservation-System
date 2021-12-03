import React, { Component } from 'react';
import './Reservations.css';
import axios from 'axios';
import { url } from '../Constants';
import NavBar from '../navigation';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import EmployeeNavBar from '../employeeNavigation';
class Reservations extends Component {
    constructor(props) {
      super(props);
this.state={
reservationList:[],
userDetails:this.props.userDetails
}
    }
async componentDidMount(){
await this.getReservations();
}
componentDidUpdate(prevState){
  

}
getReservations=()=>{
    const personId=sessionStorage.getItem("personid");
    axios
    .get(url + '/reservations?personId='+personId)
    .then((response) => {
    
      console.log(response);

      if (response.status === 200) {
          this.setState({
              reservationList:response.data
          })
      }
    })
    .catch((error) => {
        console.log(error.response);
        alert(error.response.data.errorDesc);
        this.setState({         
          errorMsg: error.response.data.errorDesc,
        });
      });
}
changeReservation=(ticketNumber)=>{
    sessionStorage.setItem("ticketNumber",ticketNumber);
    this.props.history.push({ pathname: "/searchFlights",ticketNumber});
}
cancelReservation=(ticketNumber)=>{
const ticketId=ticketNumber;
const personId=parseInt(sessionStorage.getItem("personid"));
const cancelReservationReq={
    ticketId:ticketId,
    personId:personId
}
console.log(cancelReservationReq);
axios
.post(url + '/cancelFlight',cancelReservationReq)
.then((response) => {

  console.log(response);

  if (response.status === 200) {
      const reservationIndex=this.state.reservationList.findIndex(reservation=>reservation.ticket_number===ticketId);
      if(reservationIndex>-1){
       const reservationList=this.state.reservationList;
       reservationList[reservationIndex].date_of_cancellation=moment().format("YYYY-MM-DD");
      // reservationList.splice(reservationIndex,1);
      alert("Reservation with number "+ticketId+" has been cancelled");
       this.setState({
        reservationList:reservationList
       })
      }
      else{

      }
     
  }
})
.catch((error) => {
    console.log(error.response);
    alert(error.response.data.errorDesc);
    this.setState({         
      errorMsg: error.response.data.errorDesc,
    });
  });
}
    render(){
        console.log('in render')
        console.log(this.state.reservationList);
        let reservations;
        if(this.state.reservationList.length>0){
  reservations=this.state.reservationList.map((reservation,index)=>{
      const status=reservation.date_of_cancellation===null?'Reserved':'Cancelled';
      const currTime=moment();
      console.log(currTime);
      console.log(reservation.departure_time);
      const deptTime=moment(reservation.departure_time);
      const cancelReservationFlag=deptTime.isSameOrAfter(currTime);
     
      const changeReservation=cancelReservationFlag===true&&status==='Reserved'?(<div><button
        className="cancelReservation"
        onClick={() => {
          this.cancelReservation(reservation.ticket_number);
        }}
      >
        Cancel
      </button>
      <button
        className="changeReservation"
        onClick={() => {
          this.changeReservation(reservation.ticket_number);
        }}
      >
        Change
      </button></div>):(<span></span>);
    return (
        <div className="flex-item" key={reservation.ticket_number}>
          {/* onClick={() => this.props.groupExpDtls(userGroup.group_id)} */}
          <span>Ticket Number </span>
          <span>{reservation.ticket_number}</span>
          <span style={{float:'right',marginTop:'15px',fontSize:'25px'}}>{status}</span>
          <br/>
          <span>Source Airport</span>
          <span> {reservation.source_airport_code}</span>
          <br/>
          <span>Dest Airport </span>
          <span>{reservation.destination_airport_code}</span>
          {changeReservation}
          {/* <button
            className="acceptInvitation"
            onClick={() => {
              this.acceptInvitation(pendingInvite.groupId._id);
            }}
          >
            Accept
          </button> */}
        </div>
    );
  })
        }
        else{
            reservations=(<span>No Reservations</span>)
        }
        const role = sessionStorage.getItem('person_role');
return(
    
    <div className="reservation">
       <Grid
              item
              xs={12}
             
              sx={{
                backgroundImage:
                  'url(https://as1.ftcdn.net/v2/jpg/02/43/57/78/1000_F_243577802_0G1xRWDLeKlAyMnJ1KlJN4GuhZPe2QFt.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
              }}
          >
        {role === '1' ? (<EmployeeNavBar></EmployeeNavBar>) : <NavBar />}
    <div className="reservations">
      <div className="flex-container" style = {{background :"white", "margin-left": "27%", width: "50%", "border-radius": "15px"}}>
        <div style = {{marginLeft: "2%", marginBottom: "15px"}}>
          <h2>Reservations</h2>        
          {reservations}
        </div>
      </div>
    </div>
    </Grid>
    </div>
);
    }
}
export default Reservations;
    
 

