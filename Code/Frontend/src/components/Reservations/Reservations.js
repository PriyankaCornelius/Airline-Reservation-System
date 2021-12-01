import React, { Component } from 'react';
import './Reservations.css';
import axios from 'axios';
import { url } from '../Constants';
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
    render(){
        console.log('in render')
        console.log(this.state.reservationList);
        let reservations;
        if(this.state.reservationList.length>0){
  reservations=this.state.reservationList.map((reservation,index)=>{
      const status=reservation.date_of_cancellation===null?'Reserved':'Cancelled';
    return (
        <div className="flex-item" key={reservation.ticket_number}>
          {/* onClick={() => this.props.groupExpDtls(userGroup.group_id)} */}
          <span>Ticket Number </span>
          <span>{reservation.ticket_number}</span>
          <span style={{float:'right',marginTop:'15px',fontSize:'25px'}}>{status}</span>
          <br/>
          <span>Source Airport</span>
          <span> {reservation.source_airport}</span>
          <br/>
          <span>Dest Airport </span>
          <span>{reservation.dest_airport}</span>
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
       
return(
    <div className="reservation-grid-container">
    <div className="reservations">
      <h2>Reservations</h2>
      <div className="flex-container">{reservations}</div>
    </div>
    </div>
);
    }
}
export default Reservations;
    
 

