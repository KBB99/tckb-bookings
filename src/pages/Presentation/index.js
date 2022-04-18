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

// Images
import bgImage from "assets/images/bg-coworking.jpeg";

const fetchFlights = (origin, destination) => {
  console.log(origin, destination)
}

function HeaderOne() {

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  return (
    <MKBox component="header" position="relative">
      <MKBox component="nav" position="absolute" top="0.5rem" width="100%">
        <Container>
          <Grid container flexDirection="row" alignItems="center">
            <MKTypography
              component={Link}
              href="#"
              variant="button"
              color="white"
              fontWeight="regular"
              py={0.8125}
              mr={2}
            >
              TCKB Bookings
            </MKTypography>
            <MKButton
              variant="outlined"
              color="white"
              sx={{ display: { xs: "block", lg: "none" }, ml: "auto" }}
            >
              <MKBox component="i" color="white" className="fas fa-bars" />
            </MKButton>
            <MKBox
              component="ul"
              display={{ xs: "none", lg: "flex" }}
              p={0}
              my={0}
              mx="auto"
              sx={{ listStyle: "none" }}
            >
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="#"
                  variant="button"
                  color="white"
                  fontWeight="regular"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  Home
                </MKTypography>
              </MKBox>
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="#"
                  variant="button"
                  color="white"
                  fontWeight="regular"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  About Us
                </MKTypography>
              </MKBox>
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="#"
                  variant="button"
                  color="white"
                  fontWeight="regular"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  Contact Us
                </MKTypography>
              </MKBox>
            </MKBox>
            <MKBox
              component="ul"
              display={{ xs: "none", lg: "flex" }}
              p={0}
              m={0}
              sx={{ listStyle: "none" }}
            >
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="#"
                  variant="button"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  <MKBox component="i" color="white" className="fab fa-twitter" />
                </MKTypography>
              </MKBox>
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="#"
                  variant="button"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  <MKBox component="i" color="white" className="fab fa-facebook" />
                </MKTypography>
              </MKBox>
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="#"
                  variant="button"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  <MKBox component="i" color="white" className="fab fa-instagram" />
                </MKTypography>
              </MKBox>
            </MKBox>
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
              <MKInput label="Origin (i.e. Los Angeles)" type="text" value={origin} onChange={(e)=>setOrigin(e.target.value)} style={{backgroundColor:"white"}}/>
              <MKInput label="Destination (i.e. Shanghai)" type="text" value={destination} onChange={(e)=>setDestination(e.target.value)} style={{backgroundColor:"white"}}/>
            </Stack>
            <Stack direction="row" spacing={1} mt={3}>
              <MKButton color="white" onClick={()=>fetchFlights(origin, destination)}>Search</MKButton>
              <MKButton variant="text" color="white">
                Surprise Me
              </MKButton>
            </Stack>
          </Grid>
        </Container>
      </MKBox>
    </MKBox>
  );
}

export default HeaderOne;
