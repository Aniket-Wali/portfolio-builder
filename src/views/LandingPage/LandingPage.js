import React, {useState} from "react";

// node library for contatenating different classes
import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";

import Header from "components/Header/Header.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";


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
  const [loading, setLoading] = useState(false);

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
      <Parallax filter image={require("assets/img/landing-bg.jpg")}>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container} id="section1">
          {isLoggedIn ? (
            <div className={classes.section}>
              <GridContainer justify="center">
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  style={{ textAlign: "center" }}
                >
                  <h3
                    className={classes.title}
                    style={{ color: "#222", marginTop: "100px" }}
                  >
                    {"Welcome " + email}
                  </h3>
                </GridItem>
                <div style={{ marginTop: "50px", marginBottom: "80px" }} >
                  <GoogleLogout
                    clientId="230939070961-rffr63fitbrvv09fdanau0gst5a68lt3.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={logout}
                  >
                  </GoogleLogout>
                </div>
              </GridContainer>
            </div>
          ) : (
            <div className={classes.section}>
              <GridContainer justify="center">
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  style={{ textAlign: "center" }}
                >
                  <h1
                    className={classes.title}
                    style={{ color: "#222", marginTop: "100px" }}
                  >
                    Hey there.
                  </h1>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <Tilt
                    className="Tilt"
                    options={{ max: 25 }}
                    // style={{ height: 250, width: 250 }}
                    glare={true}
                  >
                    <div className="Tilt-inner">
                      <Card
                        className={classes.root}
                        style={{
                          textAlign: "center",
                          margin: "15vh 0",
                          minWidth: "200px",
                          boxShadow: "0 6px 20px rgba(200, 230, 201, 0.5)",
                          border: "2px #4CAF50 solid",
                          borderRadius: "10px"
                        }}
                      >
                        <CardContent>
                          <Typography
                            variant="h5"
                            component="h2"
                            style={{ color: "#388E3C" }}
                          >
                            Login to continue
                          </Typography>
                          <div
                            style={{ marginTop: "25px", marginBottom: "10px" }}
                          >
                            {loading ? (
                              <CircularProgress style={{ color: "green" }} />
                            ) : (
                              <span
                                onClick={() => {
                                  setLoading(true);
                                  setTimeout(() => {
                                    setLoading(false);
                                  }, 10000);
                                }}
                              >
                                <GoogleLogin
                                  clientId="230939070961-rffr63fitbrvv09fdanau0gst5a68lt3.apps.googleusercontent.com"
                                  buttonText="Login with Google"
                                  onSuccess={responseGoogleSignup}
                                  isSignedIn={true}
                                />
                              </span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </Tilt>
                </GridItem>
                {/* <GridItem
                  xs={12}
                  sm={12}
                  md={6}
                  style={{ padding: "20px", marginBottom: "100px" }}
                >
                  {matches ? (
                    <img src={loginImg} alt="login" style={{ width: "100%" }} />
                  ) : null}
                </GridItem> */}
              </GridContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
