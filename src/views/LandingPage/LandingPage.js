import React, {useState} from "react";

// node library for contatenating different classes
import classNames from "classnames";
// material-ui core components
import { makeStyles } from "@material-ui/core/styles";

import Header from "components/Header/Header.js";


import {GoogleLogin, GoogleLogout} from "react-google-login";
import Tilt from 'react-tilt';

import styles from "assets/jss/material-kit-react/views/landingPage.js"
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";

import { Link } from "react-scroll";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CircularProgress from "@material-ui/core/CircularProgress";
const dashboardRoutes = [];

const useStyles = makeStyles(styles);


export default function LandingPage(props) {

  const classes = useStyles();
  const { ...rest } = props;
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const  responseGoogleSignup =  res => {
    console.log(res.Ts.Et);
    setEmail(res.Ts.Et);
    setIsLoggedIn(true);
  }

  const logout = response => {
    setEmail("");
    setIsLoggedIn(false);
    console.log(response); 
 }



  const matches = useMediaQuery("(min-width: 960px)");
  const phone = useMediaQuery("(max-width: 700px)");

  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Portfolio Builder"
        fixed
        changeColorOnScroll={
          phone
            ? {
                height: 50,
                color: "success"
              }
            : {
                height: 400,
                color: "white"
              }
        }
        {...rest}
      />
    </div>
  );
}
