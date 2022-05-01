
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
import {CanvasJSChart} from 'canvasjs-react-charts'
import {ReactSession} from 'react-client-session';

// Image
import bgImage from "assets/images/illustrations/illustration-reset.jpg";
import {fetchTotalRevenue} from "../../../functions/connects.js";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';

function AirlineRevenue() {
    const {state} = useLocation();
    const [newStartDate, setNewStartDate] = useState("")
    const [newEndDate, setNewEndDate] = useState("")
    const navigate = useNavigate();
    const options = {
    			animationEnabled: true,
    			exportEnabled: true,
    			theme: "light2", //"light1", "dark1", "dark2"
    			title:{
    				text: "Monthly Breakdown"
    			},
    			axisY: {
    				includeZero: true
    			},
    			data: [{
    				type: "column", //change type to bar, line, area, pie, etc
    				//indexLabel: "{y}", //Shows y value on all Data Points
    				indexLabelFontColor: "#5A5757",
    				indexLabelPlacement: "outside",
    				dataPoints: state.sales
    			}]
    		}
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
                    {ReactSession.get("companyName")} Revenue
                  </MKTypography>
                </MKBox>
                <MKBox p={3}>
                  <MKBox mb={2}>
                    <MKInput type="text" label="Start Date (YYYY-MM-DD)" fullWidth onChange={(e)=>setNewStartDate(e.target.value)} value={newStartDate}/>
                    <MKInput type="text" label="End Date (YYYY-MM-DD)" fullWidth onChange={(e)=>setNewEndDate(e.target.value)} value={newEndDate}/>
                  </MKBox>
                  <MKButton color="info" onClick={()=>monthlyBreakdown(new Date(newStartDate),new Date(newEndDate),navigate)}>
                    Calculate for new range
                  </MKButton>
                  <MKTypography variant="body2" color="text" mb={3}>
                    Displaying revenue from {state.startDate.toISOString().slice(0, 10).replace('T', ' ')} to {state.endDate.toISOString().slice(0, 10).replace('T', ' ')}
                  </MKTypography>
                  <MKBox width="100%" component="form" method="post" autocomplete="off">
                    Total Made: ${state.totalRevenue}
                    Revenue By Ticket Class: {state.revenueByClass.map((element,index)=>{return(
                        <p>{element[0]}: ${element[1]}
                        </p>)
                      })}
                    <CanvasJSChart options= {options} />
                  </MKBox>
                </MKBox>
              </MKBox>
          <MKBox pt={6} px={1} mt={6}>
            <DefaultFooter content={footerRoutes} />
          </MKBox>
        </>
      );
}

export default AirlineRevenue;
