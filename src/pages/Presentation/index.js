// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import React, { useState } from 'react';
import moment from 'moment';
import {useNavigate, createSearchParams} from 'react-router-dom';
import {ReactSession} from 'react-client-session';

// Images
import bgImage from "assets/images/bg-coworking.jpeg";

const fetchFlights = (origin, destination,departureDate,returnDate) => {
  console.log(origin, destination)
  var data = {origin: origin, destination: destination}
  if (departureDate != ""){
    data.departureDate = departureDate
  }
  fetch('https://hvizbzrm4k.execute-api.us-east-1.amazonaws.com/prod/1',{
      method: 'POST',
      mode: 'cors',
      cache: "no-cache",
      body: JSON.stringify(data)
    }
  ).then(res => res.json())
  .then(res => console.log(res)).catch(err=>console.log(err))
}

function HeaderOne({navigation}) {

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const navigate = useNavigate();

  return (
    <MKBox component="header" position="relative">
      <MKBox component="nav" position="absolute" top="0.5rem" width="100%">
        <Container>
          <Grid container flexDirection="row" alignItems="center">
            {(ReactSession.get("username")!=null)&&<MKTypography
              component={Link}
              href={ReactSession.get("usertype")=="customer"?"/pages/landing-pages/author":"/pages/landing-pages/staff"}
              variant="button"
              color="white"
              fontWeight="regular"
              py={0.8125}
              mr={2}
            >
              Home
            </MKTypography>}
            {(ReactSession.get("username")==null)?<MKButton
              variant="outlined"
              color="white"
              href="/pages/authentication/sign-in"
              sx={{ display: { xs: "block", lg: "none" }, ml: "auto" }}
            >
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="/pages/authentication/sign-in"
                  color="white"
                  variant="button"
                  p={1}
                  // onClick={(e) => e.preventDefault()}
                >
                  Sign In
                </MKTypography>
              </MKBox>
            </MKButton>:
            <MKButton
              variant="outlined"
              color="white"
              href="/pages/authentication/sign-in"
              sx={{ display: { xs: "block", lg: "none" }, ml: "auto" }}
              onClick={()=>ReactSession.set("username",null)}
            >
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="/pages/authentication/sign-in"
                  color="white"
                  variant="button"
                  p={1}
                  // onClick={(e) => e.preventDefault()}
                >
                  Log out
                </MKTypography>
              </MKBox>
            </MKButton>
          }
            <MKBox
              component="ul"
              display={{ xs: "none", lg: "flex" }}
              p={0}
              my={0}
              mx="auto"
              sx={{ listStyle: "none" }}
            >

            </MKBox>
            {(ReactSession.get("username")==null)?<MKBox
              component="ul"
              display={{ xs: "none", lg: "flex" }}
              p={0}
              m={0}
              sx={{ listStyle: "none" }}
            >
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="/pages/authentication/sign-in"
                  color="white"
                  variant="button"
                  p={1}
                  // onClick={(e) => e.preventDefault()}
                >
                  Sign In
                </MKTypography>
              </MKBox>
            </MKBox>
            :
            <MKBox
              component="ul"
              display={{ xs: "none", lg: "flex" }}
              p={0}
              m={0}
              sx={{ listStyle: "none" }}
              onClick={()=>ReactSession.set("username",null)}

            >
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="/pages/authentication/sign-in"
                  color="white"
                  variant="button"
                  p={1}
                  // onClick={(e) => e.preventDefault()}
                >
                  Sign out
                </MKTypography>
              </MKBox>
            </MKBox>
          }
          </Grid>
        </Container>
      </MKBox>
      <MKBox
        display="flex"
        alignItems="center"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) => `${linearGradient(rgba(gradients.dark.main, 0.5), rgba(gradients.dark.state, 0.5))}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} md={7} lg={6} flexDirection="column" justifyContent="center">
            <MKTypography
              variant="h1"
              color="white"
              mb={3}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Explore
            </MKTypography>
            <MKTypography variant="body1" color="white" opacity={0.8} pr={6} mr={6}>
              Travel around the world and find your true self.
            </MKTypography>
            <Stack direction="row" spacing={1} mt={3}>
              <MKButton color={(isRoundTrip)?"info":"white"} onClick={()=>setIsRoundTrip(!isRoundTrip)}>Round Trip</MKButton>
            </Stack>
            <Stack direction="row" spacing={1} mt={3}>
              <MKInput label="Origin (i.e. JFK)" type="text" value={origin} onChange={(e)=>setOrigin(e.target.value)} style={{backgroundColor:"white"}}/>
              <MKInput label="Destination (i.e. PVG)" type="text" value={destination} onChange={(e)=>setDestination(e.target.value)} style={{backgroundColor:"white"}}/>
            </Stack>
            <Stack direction="row" spacing={1} mt={3}>
              <MKInput label="Departure Date (MM/DD/YY)" type="text" value={departureDate} onChange={(e)=>setDepartureDate(e.target.value)} style={{backgroundColor:"white"}}/>
              {isRoundTrip&&<MKInput label="Return Date (MM/DD/YY)" type="text" value={returnDate} onChange={(e)=>setReturnDate(e.target.value)} style={{backgroundColor:"white"}}/>}
            </Stack>
            <Stack direction="row" spacing={1} mt={3}>
              <MKButton color="white" onClick={()=>navigate({pathname:'/pages/landing-pages/contact-us',search: createSearchParams({origin:origin, destination:destination, departureDate:departureDate,returnDate:returnDate}).toString() }) }>Search</MKButton>
            </Stack>
{/*    <div>
  <h1>SQL Response</h1>
  <ul>
    {[
('China Eastern', 'A101', '(2022, 4, 7, 11, 0)', 'CE-111', 'JFK', 'PVG', '(2022, 4, 8, 15, 0)', 'o', '7000.00'),
('China Eastern', 'A202', '(2022, 4, 10, 16, 0)', 'CE-222', 'JFK', 'PVG', '(2022, 4, 11, 20, 0)', 'd', '6500.00')
].map((row, i) => (
      <li key={i}>
        <p>Airline: {row[0]}</p>
        <p>Flight Number: {row[1]}</p>
        <p>Departure Date: {moment(row[2]).format('MMMM Do YYYY, h:mm:ss a')}</p>
        <p>Flight Code: {row[3]}</p>
        <p>Departure Airport: {row[4]}</p>
        <p>Arrival Airport: {row[5]}</p>
        <p>Arrival Date: {moment(row[6]).format('MMMM Do YYYY, h:mm:ss a')}</p>
        <p>Flight Type: {row[7]}</p>
        <p>Price: {row[8]}</p>
      </li>
    ))}
  </ul>
</div>*/}
          </Grid>
        </Container>
      </MKBox>
    </MKBox>
  );
}

export default HeaderOne;
