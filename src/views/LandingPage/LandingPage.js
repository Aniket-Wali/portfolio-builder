import React, {useState} from "react";

// node library for contatenating different classes
import classNames from "classnames";
// material-ui core components
import { makeStyles } from "@material-ui/core/styles";
import GoogleLogin from "react-google-login";
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

  const  responseGoogleSignup = async res => {
    console.log(res.Ts.Et);
    setEmail(res.Ts.Et);
    setIsLoggedIn(true);
  }


  const matches = useMediaQuery("(min-width: 960px)");
  const phone = useMediaQuery("(max-width: 700px)");

  return (
    <div>
      <GoogleLogin
        clientId="230939070961-rffr63fitbrvv09fdanau0gst5a68lt3.apps.googleusercontent.com"
        onSuccess={responseGoogleSignup}
        onFailure={responseGoogleSignup}
        buttonText="Login With Google"
        cookiePolicy={'single_host_origin'}
        />
        <div>
          { isLoggedIn ? ( email + " is Logged in" ) : ( "Not Logged in" ) }
        </div>
    </div>
  );
}
