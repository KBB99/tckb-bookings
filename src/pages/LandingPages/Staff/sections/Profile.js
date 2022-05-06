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
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKAvatar from "components/MKAvatar";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import {ReactSession} from 'react-client-session';
import { useState } from "react";
import MKInput from "components/MKInput";
import MKAlert from "components/MKAlert";
// Images
import profilePicture from "assets/images/bruce-mars.jpg";
import {fetchAirlineFlights, fetchFlightRatings, fetchFrequentCustomer, fetchEarnedRevenue, fetchTopDestinations, postNewFlight, changeFlightStatus, addAirplane, addAirport, fetchReport, fetchTotalRevenue, fetchTopDestinationStuff} from "../../../../functions/connects.js";
import {useNavigate, useLocation} from 'react-router-dom';
function addMonths(date, months) {
  date.setMonth(date.getMonth() + months);
  return date;
}

function Profile() {
  const navigate = useNavigate();
  const [flightNumber, setFlightNumber] = useState("")
  const [departureTime, setDepartureTime] = useState("")
  const [arrivalTime, setArrivalTime] = useState("")
  const [aircraftID, setAircraftID] = useState("")
  const [newAircraftID, setNewAircraftID] = useState("")
  const [departureAirport, setDepartureAirport] = useState("")
  const [arrivalAirport, setArrivalAirport] = useState("")
  const [status, setStatus] = useState("")
  const [basePrice, setBasePrice] = useState("")
  const [seats, setSeats] = useState("")
  const [manuCompany, setManuCompany] = useState("")
  const [age, setAge] = useState("")
  const [airPlaneCompanyName, setAirPlaneCompanyName] = useState("")
  const [airportCode, setAirportCode] = useState("")
  const [airportName, setAirportName] = useState("")
  const [airportCity, setAirportCity] = useState("")
  const [airportCountry, setAirportCountry] = useState("")
  const [airportType, setAirportType] = useState("")
  const {state} = useLocation();


  return (
    <MKBox component="section" py={{ xs: 6, sm: 12 }}>
      <Container>
        <Grid container item xs={12} justifyContent="center" mx="auto">
          <MKBox mt={{ xs: -16, md: -20 }} textAlign="center" onClick={()=>console.log(ReactSession.get("username"))}>
            <MKAvatar src={profilePicture} alt="Burce Mars" size="xxl" shadow="xl" />
          </MKBox>
          <Grid container justifyContent="center" py={6}>
            <Grid item xs={12} md={7} mx={{ xs: "auto", sm: 6, md: 1 }}>
              <MKBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <MKTypography variant="h3">{ReactSession.get("firstName")} {ReactSession.get("lastName")}</MKTypography>
                <MKButton variant="outlined" color="info" size="small" href='/'>
                  Search Flights
                </MKButton>
              </MKBox>
              {state&&state.showAlert&&<MKAlert color="success">{state.alertMessage}</MKAlert>}
              <MKButton variant="body1" fontWeight="light" color="text" onClick={()=>fetchAirlineFlights(navigate)}>
                <MKTypography
                  component="a"
                  href="#"
                  variant="body1"
                  fontWeight="light"
                  color="info"
                  mt={3}
                  sx={{
                    width: "max-content",
                    display: "flex",
                    alignItems: "center",

                    "& .material-icons-round": {
                      transform: `translateX(3px)`,
                      transition: "transform 0.2s cubic-bezier(0.34, 1.61, 0.7, 1.3)",
                    },

                    "&:hover .material-icons-round, &:focus .material-icons-round": {
                      transform: `translateX(6px)`,
                    },
                  }}
                >
                  View Flights<Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
                </MKTypography>
              </MKButton>
              <MKButton variant="body1" fontWeight="light" color="text" onClick={()=>fetchFrequentCustomer(navigate)}>
                <MKTypography
                  component="a"
                  href="#"
                  variant="body1"
                  fontWeight="light"
                  color="info"
                  mt={3}
                  sx={{
                    width: "max-content",
                    display: "flex",
                    alignItems: "center",

                    "& .material-icons-round": {
                      transform: `translateX(3px)`,
                      transition: "transform 0.2s cubic-bezier(0.34, 1.61, 0.7, 1.3)",
                    },

                    "&:hover .material-icons-round, &:focus .material-icons-round": {
                      transform: `translateX(6px)`,
                    },
                  }}
                >
                  View Frequent Customers<Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
                </MKTypography>
              </MKButton>
              <MKButton variant="body1" fontWeight="light" color="text" onClick={()=>navigate("/pages/landing-pages/airline-reports")}>
                <MKTypography
                  component="a"
                  href="#"
                  variant="body1"
                  fontWeight="light"
                  color="info"
                  mt={3}
                  sx={{
                    width: "max-content",
                    display: "flex",
                    alignItems: "center",

                    "& .material-icons-round": {
                      transform: `translateX(3px)`,
                      transition: "transform 0.2s cubic-bezier(0.34, 1.61, 0.7, 1.3)",
                    },

                    "&:hover .material-icons-round, &:focus .material-icons-round": {
                      transform: `translateX(6px)`,
                    },
                  }}
                >
                  Reports <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
                </MKTypography>
              </MKButton>
              <MKButton variant="body1" fontWeight="light" color="text" onClick={()=>fetchTotalRevenue(addMonths(new Date(),-12),new Date(),navigate)}>
                <MKTypography
                  component="a"
                  href="#"
                  variant="body1"
                  fontWeight="light"
                  color="info"
                  mt={3}
                  sx={{
                    width: "max-content",
                    display: "flex",
                    alignItems: "center",

                    "& .material-icons-round": {
                      transform: `translateX(3px)`,
                      transition: "transform 0.2s cubic-bezier(0.34, 1.61, 0.7, 1.3)",
                    },

                    "&:hover .material-icons-round, &:focus .material-icons-round": {
                      transform: `translateX(6px)`,
                    },
                  }}
                >
                  Revenue<Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
                </MKTypography>
              </MKButton>
                <MKButton variant="body1" fontWeight="light" color="text" onClick={()=>fetchTopDestinationStuff(navigate)}>
                  <MKTypography
                    component="a"
                    href="#"
                    variant="body1"
                    fontWeight="light"
                    color="info"
                    mt={3}
                    sx={{
                      width: "max-content",
                      display: "flex",
                      alignItems: "center",

                      "& .material-icons-round": {
                        transform: `translateX(3px)`,
                        transition: "transform 0.2s cubic-bezier(0.34, 1.61, 0.7, 1.3)",
                      },

                      "&:hover .material-icons-round, &:focus .material-icons-round": {
                        transform: `translateX(6px)`,
                      },
                    }}
                  >
                    View Top Destinations<Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
                  </MKTypography>
                </MKButton>
            </Grid>
          </Grid>
          <MKBox component="form" role="form">
            <MKBox mb={2}>
              <MKBox mb={2}>
                <MKInput type="text" label="Flight Number" fullWidth onChange={(e)=>setFlightNumber(e.target.value)} value={flightNumber}/>
              </MKBox>
              <MKBox mb={2}>
                <MKInput type="text" label="Departure Time" fullWidth onChange={(e)=>setDepartureTime(e.target.value)} value={departureTime}/>
              </MKBox>
              <MKBox mb={2}>
                <MKInput type="text" label="Aircraft ID" fullWidth onChange={(e)=>setAircraftID(e.target.value)} value={aircraftID}/>
              </MKBox>
              <MKBox mb={2}>
                <MKInput type="text" label="Departure Airport" fullWidth onChange={(e)=>setDepartureAirport(e.target.value)} value={departureAirport}/>
              </MKBox>
              <MKBox mb={2}>
                <MKInput type="text" label="Arrival Airport" fullWidth onChange={(e)=>setArrivalAirport(e.target.value)} value={arrivalAirport}/>
              </MKBox>
              <MKBox mb={2}>
                <MKInput type="text" label="Arrival Time" fullWidth onChange={(e)=>setArrivalTime(e.target.value)} value={arrivalTime}/>
              </MKBox>
              <MKBox mb={2}>
                <MKInput type="text" label="Status" fullWidth onChange={(e)=>setStatus(e.target.value)} value={status}/>
              </MKBox>
              <MKBox mb={2}>
                <MKInput type="text" label="Base Price" fullWidth onChange={(e)=>setBasePrice(e.target.value)} value={basePrice}/>
              </MKBox>
              <MKButton color="info" onClick={() => postNewFlight(navigate,flightNumber,departureTime,aircraftID, departureAirport, arrivalAirport, arrivalTime,status, basePrice)}>
                Create Flight
              </MKButton>
            </MKBox>
          </MKBox>
          <MKBox component="form" role="form">
            <MKBox mb={2}>
              <MKBox mb={2}>
                <MKInput type="text" label="Airport Code" fullWidth onChange={(e)=>setAirportCode(e.target.value)} value={airportCode}/>
              </MKBox>
              <MKBox mb={2}>
                <MKInput type="text" label="Airport Name" fullWidth onChange={(e)=>setAirportName(e.target.value)} value={airportName}/>
              </MKBox>
              <MKBox mb={2}>
                <MKInput type="text" label="Airport City" fullWidth onChange={(e)=>setAirportCity(e.target.value)} value={airportCity}/>
              </MKBox>
              <MKBox mb={2}>
                <MKInput type="text" label="Airport Country" fullWidth onChange={(e)=>setAirportCountry(e.target.value)} value={airportCountry}/>
              </MKBox>
              <MKBox mb={2}>
                <MKInput type="text" label="Airport Type" fullWidth onChange={(e)=>setAirportType(e.target.value)} value={airportType}/>
              </MKBox>
              <MKButton color="info" onClick={() => addAirport(navigate,airportCode, airportName, airportCity, airportCountry,airportType)}>
                Add Airport
              </MKButton>
            </MKBox>
          </MKBox>
          <MKBox component="form" role="form">
            <MKBox mb={2}>
              <MKBox mb={2}>
                <MKInput type="text" label="Aircraft ID" fullWidth onChange={(e)=>setNewAircraftID(e.target.value)} value={newAircraftID}/>
              </MKBox>
              <MKBox mb={2}>
                <MKInput type="text" label="Seats" fullWidth onChange={(e)=>setSeats(e.target.value)} value={seats}/>
              </MKBox>
              <MKBox mb={2}>
                <MKInput type="text" label="Manufacturing Company" fullWidth onChange={(e)=>setManuCompany(e.target.value)} value={manuCompany}/>
              </MKBox>
              <MKBox mb={2}>
                <MKInput type="text" label="Age" fullWidth onChange={(e)=>setAge(e.target.value)} value={age}/>
              </MKBox>
              <MKButton color="info" onClick={() => addAirplane(navigate,newAircraftID, seats, manuCompany, age)}>
                Add Airplane
              </MKButton>
            </MKBox>
          </MKBox>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Profile;
