import React, {useState, useEffect} from 'react';
// nodejs library that concatenate classes
import classNames from "classnames";
import {GoogleLogout} from "react-google-login";


import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";

import Menu from "@material-ui/icons/Menu";
import styles from "assets/jss/material-kit-react/components/headerStyle.js";

const useStyles = makeStyles(styles);

export default function Header(props) {
    const classes = useStyles();
    const {setEmail, isLoggedIn, setIsLoggedIn} = props;

    const logout = response => {
        setEmail("");
        setIsLoggedIn(false);
    }

    const [mobileOpen, setMobileOpen] = useState(false);
    useEffect(() => {
        if(props.changeColorOnScroll){
            window.addEventListener('scroll', () => {
                const { color, changeColorOnScroll } = props;
                const windowsScrollTop = window.pageYOffset;
                if (windowsScrollTop > changeColorOnScroll.height) {
                document.body
                    .getElementsByTagName("header")[0]
                    .classList.remove(classes[color]);
                document.body
                    .getElementsByTagName("header")[0]
                    .classList.add(classes[changeColorOnScroll.color]);
                } else {
                document.body
                    .getElementsByTagName("header")[0]
                    .classList.add(classes[color]);
                document.body
                    .getElementsByTagName("header")[0]
                    .classList.remove(classes[changeColorOnScroll.color]);
                }
            });
        }
    });
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }
    const { color, leftLinks, brand, fixed, absolute } = props;
    const appBarClasses = classNames({
        [classes.appBar]: true,
        [classes[color]]: color,
        [classes.absolute]: absolute,
        [classes.fixed]: fixed
    });
    const brandComponent = <Button className={classes.title}>{brand}</Button>;
    return (
        <AppBar className={appBarClasses}>
        <Toolbar className={classes.container}>
            {leftLinks !== undefined ? brandComponent : null}
            <div className={classes.flex}>
            {leftLinks !== undefined ? (
                <Hidden smDown implementation="css">
                {leftLinks}
                </Hidden>
            ) : (
                brandComponent
            )}
            </div>
            {
                isLoggedIn ? (
                    <GoogleLogout
                        clientId="230939070961-rffr63fitbrvv09fdanau0gst5a68lt3.apps.googleusercontent.com"
                        buttonText="Logout"
                        onLogoutSuccess={logout}
                        >
                    </GoogleLogout>) : null
            }
        </Toolbar>
        </AppBar>
    );
    }

    Header.defaultProp = {
    color: "white"
    };

    Header.propTypes = {
    color: PropTypes.oneOf([
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "transparent",
        "white",
        "rose",
        "dark"
    ]),
    leftLinks: PropTypes.node,
    brand: PropTypes.string,
    fixed: PropTypes.bool,
    absolute: PropTypes.bool,
    changeColorOnScroll: PropTypes.shape({
        height: PropTypes.number.isRequired,
        color: PropTypes.oneOf([
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "transparent",
        "white",
        "rose",
        "dark"
        ]).isRequired
    })
}