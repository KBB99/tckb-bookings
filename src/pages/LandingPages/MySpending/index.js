
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

// Image
import bgImage from "assets/images/illustrations/illustration-reset.jpg";
import {fetchFlights, purchaseTicket, cancelFlight, postFeedback} from "../../../functions/connects.js";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';

function MySpending() {
    const {state} = useLocation();
    const [modalVisible, setModalVisible] = useState(false)
    const [flight, setFlight] = useState([])
    const [comment, setComment] = useState("")
    const [stars, setStars] = useState("")
    const navigate = useNavigate();

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
                    Your Spending
                  </MKTypography>
                </MKBox>
                <MKBox p={3}>
                  <MKTypography variant="body2" color="text" mb={3}>
                    Displaying your spending.
                  </MKTypography>
                  <MKBox width="100%" component="form" method="post" autocomplete="off">
                    {state.totalSpent} {state.months}
                  </MKBox>
                </MKBox>
              </MKBox>
          <MKBox pt={6} px={1} mt={6}>
            <DefaultFooter content={footerRoutes} />
          </MKBox>
        </>
      );
}

export default MySpending;
