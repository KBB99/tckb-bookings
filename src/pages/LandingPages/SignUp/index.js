/**
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";
import {fetchSignUpCustomer, fetchSignUpStaff} from "../../../functions/connects.js";

// Material Kit 2 React page layout routes
import routes from "routes";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function SignInBasic() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [buildingNumber, setBuildingNumber] = useState("")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [state_, setState_] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [passportNumber, setPassportNumber] = useState("")
  const [passportExpiration, setPassportExpiration] = useState("")
  const [passportCountry, setPassportCountry] = useState("")
  const [isStaff, setIsStaff] = useState(false)
  const [companyName, setCompanyName] = useState("")
  const [dob, setDob] = useState("")


  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "https://www.creative-tim.com/product/material-kit-react",
          label: "free download",
          color: "info",
        }}
        transparent
        light
      />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Sign up
                </MKTypography>
                <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <FacebookIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <GitHubIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <GoogleIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                </Grid>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  <MKBox mb={2}>
                    <MKButton color={(isStaff)?"info":"primary"}  onClick={()=>setIsStaff(!isStaff)}>{(isStaff)?"Sign Up Customer":"Sign Up Staff"}</MKButton>
                  </MKBox>

                    {(isStaff)?<div><MKBox mb={2}>
                    <MKInput type="text" label="First Name" fullWidth onChange={(e)=>setFirstName(e.target.value)} value={firstName}/>
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput type="text" label="Last Name" fullWidth onChange={(e)=>setLastName(e.target.value)} value={lastName}/>
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput type="text" label="Date of Birth" fullWidth onChange={(e)=>setDob(e.target.value)} value={dob}/>
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput type="text" label="Phone Number" fullWidth onChange={(e)=>setPhoneNumber(e.target.value)} value={phoneNumber}/>
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput type="text" label="Company Name" fullWidth onChange={(e)=>setCompanyName(e.target.value)} value={companyName}/>
                  </MKBox>
                  </div>
                      :<div><MKBox mb={2}>
                      <MKInput type="text" label="First Name" fullWidth onChange={(e)=>setFirstName(e.target.value)} value={firstName}/>
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput type="text" label="Last Name" fullWidth onChange={(e)=>setLastName(e.target.value)} value={lastName}/>
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput type="text" label="Building Number" fullWidth onChange={(e)=>setBuildingNumber(e.target.value)} value={buildingNumber}/>
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput type="text" label="Street" fullWidth onChange={(e)=>setStreet(e.target.value)} value={street}/>
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput type="text" label="City" fullWidth onChange={(e)=>setCity(e.target.value)} value={city}/>
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput type="text" label="State" fullWidth onChange={(e)=>setState_(e.target.value)} value={state_}/>
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput type="text" label="Phone Number" fullWidth onChange={(e)=>setPhoneNumber(e.target.value)} value={phoneNumber}/>
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput type="text" label="Passport Number" fullWidth onChange={(e)=>setPassportNumber(e.target.value)} value={passportNumber}/>
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput type="text" label="Passport Expiration" fullWidth onChange={(e)=>setPassportExpiration(e.target.value)} value={passportExpiration}/>
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput type="text" label="Passport Country" fullWidth onChange={(e)=>setPassportCountry(e.target.value)} value={passportCountry}/>
                    </MKBox></div>}
                  <MKBox mb={2}>
                    <MKInput type="email" label="Email" fullWidth onChange={(e)=>setUsername(e.target.value)} value={username}/>
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput type="password" label="Password" fullWidth onChange={(e)=>setPassword(e.target.value)} value={password}/>
                  </MKBox>
                  <MKBox display="flex" alignItems="center" ml={-1}>
                    <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                    <MKTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      onClick={handleSetRememberMe}
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;Remember me
                    </MKTypography>
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" color="info" fullWidth onClick={()=>{
                        if (isStaff){
                          fetchSignUpStaff(username, password, companyName, firstName, lastName, dob, phoneNumber);
                        }
                        else{
                          fetchSignUpCustomer(username, password, firstName, lastName, buildingNumber, street, city, state_, phoneNumber, passportNumber, passportExpiration, passportCountry);
                        }
                      }
                    }>
                      sign up
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Already have an account?{" "}
                      <MKTypography
                        component={Link}
                        to="/pages/authentication/sign-in"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign in
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
      </MKBox>
    </>
  );
}

export default SignInBasic;
