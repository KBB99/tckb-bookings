/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import Modal from '@mui/material/Modal';
import MKAlert from "components/MKAlert";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import {ReactSession} from 'react-client-session';

import React from "react";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useParams,
} from "react-router-dom";
// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

// Image
import bgImage from "assets/images/illustrations/illustration-reset.jpg";
import {fetchFlights, purchaseTicket} from "../../../functions/connects.js";
const getQueryParams = (query = null) => (query||window.location.search.replace('?','')).split('&').map(e=>e.split('=').map(decodeURIComponent)).reduce((r,[k,v])=>(r[k]=v,r),{});

class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { loaded: false, flights: [] };
    // this.query = useQuery();
  }
  async componentDidMount(){
    const getQueryParams = (query = null) => (query||window.location.search.replace('?','')).split('&').map(e=>e.split('=').map(decodeURIComponent)).reduce((r,[k,v])=>(r[k]=v,r),{});
    const params = getQueryParams()
    // let { origin, destination, departureDate, returnDate } = useParams();
    var flights = await fetchFlights(params.origin, params.destination,params.departureDate,"")
    console.log(flights)
    this.setState({loaded:true, flights: flights, origin: params.origin, destination: params.destination, departureDate: params.departureDate, returnDate: params.returnDate})
  }
  render(){
    if (this.state.loaded){
      return (
        <>
          <MKBox position="fixed" top="0.5rem" width="100%">
            <DefaultNavbar
              routes={routes}
            />
          </MKBox>

              <MKBox
                bgColor="white"
                borderRadius="xl"
                shadow="lg"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                mt={{ xs: 20, sm: 18, md: 20 }}
                mb={{ xs: 20, sm: 18, md: 20 }}
                mx={3}
              >
                <MKBox
                  variant="gradient"
                  bgColor="info"
                  coloredShadow="info"
                  borderRadius="lg"
                  p={2}
                  mx={2}
                  mt={-3}
                >
                  <MKTypography variant="h3" color="white">
                    Search Results
                  </MKTypography>
                </MKBox>
                <MKBox p={3}>
                  <MKTypography variant="body2" color="text" mb={3}>
                    Displaying flights from {this.state.origin} to {this.state.destination} departing on {this.state.departureDate} {this.state.returnDate&&` and returning on ${this.state.returnDate}`}.
                  </MKTypography>
                  <MKBox width="100%" component="form" method="post" autocomplete="off">
                    {this.state.flights.map((element,index)=>
                      {return(
                        <MKBox>
                          <MKTypography>
                            Airline: {element[0]} | Flight Code: {element[1]} | Departure Time: {element[2]} | Plane ID: {element[3]} | Origin: {element[4]} | Destination: {element[5]} | Arrival Time: {element[6]} | Status: {(element[7]=="o")?"On-Time":"Delayed"} | Price: ${element[8]} {"      "}
                            {(ReactSession.get("username")==null)?<a href="/pages/authentication/sign-in">
                              <MKButton color="info">
                                Sign in to Buy
                                </MKButton>
                            </a>
                            :(new Date(element[2])>=new Date().now)&&(ReactSession.get("userType")!=="staff")&&<MKButton color="info" onClick={()=>this.setState({modalVisible:true, selectedFlight: element})}>
                              Buy
                            </MKButton>}
                          </MKTypography>
                        </MKBox>)
                      }
                    )}
                  </MKBox>
                </MKBox>
              </MKBox>
              <Modal open={this.state.modalVisible} onClose={()=>this.setState({modalVisible:false})}>
                <MKBox pt={4} pb={3} px={3} style={{backgroundColor:"white",alignSelf:"center",display:"flex",justifyContent:"center"}}>
                {this.state.ticketFailed&&<MKAlert color="error" dismissible>Failed to purchase ticket!</MKAlert>}
                  <MKBox component="form" role="form">
                    <MKBox mb={2}>
                      <MKBox mb={2}>
                        <MKInput type="text" label="Class" fullWidth onChange={(e)=>this.setState({travelClass:e.target.value})} value={this.state.travelClass}/>
                      </MKBox>
                      <MKBox mb={2}>
                        <MKInput type="text" label="Card Number" fullWidth onChange={(e)=>this.setState({cardNumber:e.target.value})} value={this.state.cardNumber}/>
                      </MKBox>
                      <MKBox mb={2}>
                        <MKInput type="text" label="Card Type" fullWidth onChange={(e)=>this.setState({cardType:e.target.value})} value={this.state.cardType}/>
                      </MKBox>
                      <MKButton color="info" onClick={async ()=>{
                          var res = await purchaseTicket(this.state.travelClass,this.state.cardNumber,this.state.cardType, this.state.selectedFlight);
                          if (res["success"]){
                            console.log("HERE");
                            window.location.replace("/home/customer");
                          }
                          else{
                            this.setState({ticketFailed:true})
                          }
                        }
                        }>
                        Buy
                      </MKButton>
                    </MKBox>
                  </MKBox>
                </MKBox>
              </Modal>
          <MKBox pt={6} px={1} mt={6}>
            <DefaultFooter content={footerRoutes} />
          </MKBox>
        </>
      );
    }
    else{
      return(
        <MKBox/>
      )
    }
  }
}

export default ContactUs;
