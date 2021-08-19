import React from "react";

// @material-ui/core components
import {
  makeStyles,
  withStyles,
  createMuiTheme
} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import AnchorLink from "react-anchor-link-smooth-scroll";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

// @material-ui/icons

import Slide from "@material-ui/core/Slide";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import PropTypes from "prop-types";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import classNames from "classnames";
import green from "@material-ui/core/colors/green";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import ThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import Tilt from "react-tilt";

import linkedIn from "../../../assets/img/i.png";
import github from "../../../assets/img/g.png";
import email from "../../../assets/img/e.png";
import cancel from "../../../assets/img/cancel.svg";
import twitter from "../../../assets/img/twitter.svg";
import stack from "../../../assets/img/stack.svg";
import phone from "../../../assets/img/phone.svg";
import pin from "../../../assets/img/pin.svg";
import design from "../../../assets/img/design.gif";

import template1 from "../../../assets/img/template1.jpg";
import template2 from "../../../assets/img/template2.jpg";

import FileUploader from "react-firebase-file-uploader";
import firebase from "@firebase/app";
import "@firebase/storage";
import axios from "axios";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import placeholder from "../../../assets/img/placeholder.png";
import firebaseConfig from "firebase-config";

firebase.initializeApp(firebaseConfig);

const useStyles = makeStyles(styles);
const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: {
      main: "#fff"
    }
  }
});

// const redTheme = createMuiTheme({
//   palette: {
//     primary: red,
//     secondary: {
//       main: "#fff"
//     }
//   }
// });

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)"
  },
  active: {
    "& $line": {
      borderColor: "#4caf50"
    }
  },
  completed: {
    "& $line": {
      borderColor: "#4caf50"
    }
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1
  }
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center"
  },
  active: {
    color: "#4caf50"
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor"
  },
  completed: {
    color: "#4caf50",
    zIndex: 1,
    fontSize: 18
  }
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool
};

function getSteps() {
  return [
    "Sign-up Successfully",
    "Basic Information",
    "Add Skills and Testimonials",
    "Add Experience and Projects"
  ];
}

// eslint-disable-next-line react/display-name
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PortfolioBuilder(props) {
  const storage = firebase.storage();

  const classes = useStyles();

  function formatDate(date) {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    if (date !== null) {
      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();
      return day + " " + monthNames[monthIndex] + " " + year;
    } else return null;
  }

  const [activeStep, setActiveStep] = React.useState(1);
  const [loading, setLoading] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const [template, setTemplate] = React.useState(1);

  const [profileName, setProfileName] = React.useState("");
  const [phoneNum, setPhoneNum] = React.useState("");

  const [profile, setProfile] = React.useState({
    image: "",
    imageURL: "",
    progress: 0
  });
  const [aboutMe, setAboutMe] = React.useState("");
  const [linkedInLink, setLinkedIn] = React.useState("");
  const [githubLink, setGithub] = React.useState("");
  const [emailLink, setEmail] = React.useState("");
  const [twitterLink, setTwitter] = React.useState("");
  const [stackLink, setStack] = React.useState("");

  const [currentLocation, setCurrentLocation] = React.useState("");
  const [skillDescription, setSkillDescription] = React.useState("");

  const [response, setResponse] = React.useState(false);

  const [skills, setSkills] = React.useState([
    { id: 1, skill_name: "", skill_level: "Beginner" }
  ]);
  const [tests, setTests] = React.useState([
    { id: 1, testimonial_name: "", testimonial_cred: "", testimonial_desc: "" }
  ]);
  const [langs, setLangs] = React.useState([
    { id: 1, name: "", level: "Native Speaker" }
  ]);

  const [pubs, setPubs] = React.useState([
    {
      id: 1,
      title: "",
      journal_name: "",
      supervisor: "",
      publish_date: formatDate(new Date("2019-08-18T21:11:54")),
      article_link: ""
    }
  ]);
  const [exps, setExps] = React.useState([
    {
      id: 1,
      company_url: "",
      position: "",
      company: "",
      duration: {
        start: formatDate(new Date("2019-08-18T21:11:54")),
        end: formatDate(new Date("2019-08-17T21:11:54"))
      },
      timeline: "18 August 2019 - 17 August 2019",
      summary: ""
    }
  ]);
  const [edus, setEdus] = React.useState([
    {
      id: 1,
      college_name: "",
      degree_name: "",
      college_url: "",
      summary: "",
      duration: {
        start: formatDate(new Date("2019-08-18T21:11:54")),
        end: formatDate(new Date("2019-08-18T21:11:54"))
      },
      timeline: "18 August 2019 - 17 August 2019"
    }
  ]);
  const [achs, setAchs] = React.useState([
    {
      id: 1,
      achievement_title: "",
      achievement_description: "",
      achievement_date: formatDate(new Date("2019-08-18T21:11:54")),
      achievement_url: ""
    }
  ]);
  const [pros, setPros] = React.useState([
    {
      id: 1,
      git_url: "",
      title: "",
      proj_image: "",
      proj_desc: "",
      proj_demo: ""
    }
  ]);

  const steps = getSteps();
  const [portfolioLink, setPortfolioLink] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const handleNext = e => {
    e.preventDefault();
    // setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  /* const handleReset = () => {
    setActiveStep(0);
  }; */

  const addSkill = () => {
    setSkills(oldArray => {
      return [
        ...oldArray,
        {
          id: skills[skills.length - 1].id + 1,
          skill_name: "",
          skill_level: "Beginner"
        }
      ];
    });
    console.log(skills);
  };

  const deleteSkill = id => {
    setSkills(skills.filter(e => e.id !== id));
    skills.filter(e => e.id > id).forEach(e => e.id--);
  };

  const addTest = () => {
    var testNum = tests.length + 1;
    setTests(oldArray => {
      return [
        ...oldArray,
        {
          id: testNum,
          testimonial_name: "",
          testimonial_cred: "",
          testimonial_desc: ""
        }
      ];
    });
    console.log(tests);
  };

  const deleteTest = id => {
    setTests(tests.filter(e => e.id !== id));
    tests.filter(e => e.id > id).forEach(e => e.id--);
  };

  const addLang = () => {
    var langNum = langs.length + 1;
    setLangs(oldArray => {
      return [...oldArray, { id: langNum, name: "", level: "Native Speaker" }];
    });
    console.log(langs);
  };

  const deleteLang = id => {
    setLangs(langs.filter(e => e.id !== id));
    langs.filter(e => e.id > id).forEach(e => e.id--);
  };

  const addPub = () => {
    var pubNum = pubs.length + 1;
    setPubs(oldArray => {
      return [
        ...oldArray,
        {
          id: pubNum,
          title: "",
          journal_name: "",
          supervisor: "",
          publish_date: formatDate(new Date("2019-08-18T21:11:54")),
          article_link: ""
        }
      ];
    });
    console.log(pubs);
  };

  const deletePub = id => {
    setPubs(pubs.filter(e => e.id !== id));
    pubs.filter(e => e.id > id).forEach(e => e.id--);
  };

  const addExp = () => {
    var expNum = exps.length + 1;
    setExps(oldArray => {
      return [
        ...oldArray,
        {
          id: expNum,
          company_url: "",
          position: "",
          company: "",
          duration: {
            start: formatDate(new Date("2019-08-18T21:11:54")),
            end: formatDate(new Date("2019-08-18T21:11:54"))
          },
          timeline: "18 August 2019 - 17 August 2019",
          summary: ""
        }
      ];
    });
    console.log(exps);
  };

  const deleteExp = id => {
    setExps(exps.filter(e => e.id !== id));
    exps.filter(e => e.id > id).forEach(e => e.id--);
  };

  const addEdu = () => {
    var eduNum = edus.length + 1;
    setEdus(oldArray => {
      return [
        ...oldArray,
        {
          id: eduNum,
          college_name: "",
          degree_name: "",
          college_url: "",
          summary: "",
          duration: {
            start: formatDate(new Date("2019-08-18T21:11:54")),
            end: formatDate(new Date("2019-08-18T21:11:54"))
          },
          timeline: "18 August 2019 - 17 August 2019"
        }
      ];
    });
    console.log(edus);
  };

  const deleteEdu = id => {
    setEdus(edus.filter(e => e.id !== id));
    edus.filter(e => e.id > id).forEach(e => e.id--);
  };

  const addAch = () => {
    var achNum = achs.length + 1;
    setAchs(oldArray => {
      return [
        ...oldArray,
        {
          id: achNum,
          achievement_title: "",
          achievement_description: "",
          achievement_date: formatDate(new Date("2019-08-18T21:11:54")),
          achievement_url: ""
        }
      ];
    });
    console.log(achs);
  };

  const deleteAch = id => {
    setAchs(achs.filter(e => e.id !== id));
    achs.filter(e => e.id > id).forEach(e => e.id--);
  };

  const addProj = () => {
    var projNum = pros.length + 1;
    setPros(oldArray => {
      return [
        ...oldArray,
        {
          id: projNum,
          git_url: "",
          title: "",
          proj_image: "",
          proj_desc: "",
          proj_demo: ""
        }
      ];
    });
    console.log(pros);
  };

  const deleteProj = id => {
    setPros(pros.filter(e => e.id !== id));
    pros.filter(e => e.id > id).forEach(e => e.id--);
  };

  // const handleDateChangePub = date => {
  //   setSelectedDatePub(date);
  //   console.log(date);
  // };

  const handleUploadProfileStart = () => {
    setLoading(1);
    setProfile({ imageURL: "1" });
  };

  const handleUploadProfileSuccess = filename => {
    setProfile({
      image: filename,
      progress: 100
    });

    firebase
      .storage()
      .ref("profile")
      .child(filename)
      .getDownloadURL()
      .then(url => setProfile({ imageURL: url }))
      .then(setLoading(0));
  };

  const handleChangeName = event => {
    setProfileName(event.target.value);
  };

  const handleChangeAbout = event => {
    setAboutMe(event.target.value);
  };

  const handleLinkedIn = event => {
    setLinkedIn(event.target.value);
  };

  const handleGithub = event => {
    setGithub(event.target.value);
  };

  const handleEmail = event => {
    setEmail(event.target.value);
  };
  const handleTwitter = event => {
    setTwitter(event.target.value);
  };
  const handlePhoneNum = event => {
    setPhoneNum(event.target.value);
  };
  const handleStack = event => {
    setStack(event.target.value);
  };
  const handleCurrentLocation = event => {
    setCurrentLocation(event.target.value);
  };
  const handleSkillDescription = event => {
    setSkillDescription(event.target.value);
  };

  const handleSkills = (field, id, evn) => {
    if (field === "skill_name") {
      setSkills([
        ...skills.slice(0, id),
        { ...skills[id], skill_name: evn.target.value },
        ...skills.slice(id + 1, skills.length)
      ]);
    }
    if (field === "skill_level") {
      setSkills([
        ...skills.slice(0, id),
        { ...skills[id], skill_level: evn.target.value },
        ...skills.slice(id + 1, skills.length)
      ]);
    }
  };

  const handleTests = (field, id, evn) => {
    if (field === "testimonial_name") {
      setTests([
        ...tests.slice(0, id),
        { ...tests[id], testimonial_name: evn.target.value },
        ...tests.slice(id + 1, tests.length)
      ]);
    }
    if (field === "testimonial_cred") {
      setTests([
        ...tests.slice(0, id),
        { ...tests[id], testimonial_cred: evn.target.value },
        ...tests.slice(id + 1, tests.length)
      ]);
    }
    if (field === "testimonial_desc") {
      setTests([
        ...tests.slice(0, id),
        { ...tests[id], testimonial_desc: evn.target.value },
        ...tests.slice(id + 1, tests.length)
      ]);
    }
  };

  const handleLangs = (field, id, evn) => {
    if (field === "name") {
      setLangs([
        ...langs.slice(0, id),
        { ...langs[id], name: evn.target.value },
        ...langs.slice(id + 1, langs.length)
      ]);
    }
    if (field === "level") {
      setLangs([
        ...langs.slice(0, id),
        { ...langs[id], level: evn.target.value },
        ...langs.slice(id + 1, langs.length)
      ]);
    }
  };

  const handlePubs = (field, id, evn) => {
    if (field === "title") {
      setPubs([
        ...pubs.slice(0, id),
        { ...pubs[id], title: evn.target.value },
        ...pubs.slice(id + 1, pubs.length)
      ]);
    }
    if (field === "journal_name") {
      setPubs([
        ...pubs.slice(0, id),
        { ...pubs[id], journal_name: evn.target.value },
        ...pubs.slice(id + 1, pubs.length)
      ]);
    }
    if (field === "supervisor") {
      setPubs([
        ...pubs.slice(0, id),
        { ...pubs[id], supervisor: evn.target.value },
        ...pubs.slice(id + 1, pubs.length)
      ]);
    }
    if (field === "publish_date") {
      setPubs([
        ...pubs.slice(0, id),
        { ...pubs[id], publish_date: evn },
        ...pubs.slice(id + 1, pubs.length)
      ]);
    }
    if (field === "article_link") {
      setPubs([
        ...pubs.slice(0, id),
        { ...pubs[id], article_link: evn.target.value },
        ...pubs.slice(id + 1, pubs.length)
      ]);
    }
  };

  const handleExps = (field, id, evn) => {
    if (field === "company_url") {
      setExps([
        ...exps.slice(0, id),
        { ...exps[id], company_url: evn.target.value },
        ...exps.slice(id + 1, exps.length)
      ]);
    }
    if (field === "position") {
      setExps([
        ...exps.slice(0, id),
        { ...exps[id], position: evn.target.value },
        ...exps.slice(id + 1, exps.length)
      ]);
    }
    if (field === "company") {
      setExps([
        ...exps.slice(0, id),
        { ...exps[id], company: evn.target.value },
        ...exps.slice(id + 1, exps.length)
      ]);
    }
    if (field === "start") {
      setExps([
        ...exps.slice(0, id),
        {
          ...exps[id],
          duration: { start: evn, end: exps[id].duration.end },
          timeline: evn + "-" + exps[id].duration.end
        },
        ...exps.slice(id + 1, exps.length)
      ]);
    }
    if (field === "end") {
      setExps([
        ...exps.slice(0, id),
        {
          ...exps[id],
          duration: { start: exps[id].duration.start, end: evn },
          timeline: exps[id].duration.start + "-" + evn
        },
        ...exps.slice(id + 1, exps.length)
      ]);
    }
    if (field === "summary") {
      setExps([
        ...exps.slice(0, id),
        { ...exps[id], summary: evn.target.value },
        ...exps.slice(id + 1, exps.length)
      ]);
    }
  };

  const handleEdus = (field, id, evn) => {
    if (field === "college_name") {
      setEdus([
        ...edus.slice(0, id),
        { ...edus[id], college_name: evn.target.value },
        ...edus.slice(id + 1, edus.length)
      ]);
    }
    if (field === "degree_name") {
      setEdus([
        ...edus.slice(0, id),
        { ...edus[id], degree_name: evn.target.value },
        ...edus.slice(id + 1, edus.length)
      ]);
    }
    if (field === "college_url") {
      setEdus([
        ...edus.slice(0, id),
        { ...edus[id], college_url: evn.target.value },
        ...edus.slice(id + 1, edus.length)
      ]);
    }
    if (field === "summary") {
      setEdus([
        ...edus.slice(0, id),
        { ...edus[id], summary: evn.target.value },
        ...edus.slice(id + 1, edus.length)
      ]);
    }
    if (field === "start") {
      setEdus([
        ...edus.slice(0, id),
        {
          ...edus[id],
          duration: { start: evn, end: edus[id].duration.end },
          timeline: evn + "-" + edus[id].duration.end
        },
        ...edus.slice(id + 1, edus.length)
      ]);
    }
    if (field === "end") {
      setEdus([
        ...edus.slice(0, id),
        {
          ...edus[id],
          duration: { start: edus[id].duration.start, end: evn },
          timeline: edus[id].duration.start + "-" + evn
        },
        ...edus.slice(id + 1, edus.length)
      ]);
    }
  };

  const handleAchs = (field, id, evn) => {
    if (field === "achievement_title") {
      setAchs([
        ...achs.slice(0, id),
        { ...achs[id], achievement_title: evn.target.value },
        ...achs.slice(id + 1, achs.length)
      ]);
    }
    if (field === "achievement_description") {
      setAchs([
        ...achs.slice(0, id),
        { ...achs[id], achievement_description: evn.target.value },
        ...achs.slice(id + 1, achs.length)
      ]);
    }
    if (field === "achievement_date") {
      setAchs([
        ...achs.slice(0, id),
        { ...achs[id], achievement_date: evn },
        ...achs.slice(id + 1, achs.length)
      ]);
    }
    if (field === "achievement_url") {
      setAchs([
        ...achs.slice(0, id),
        { ...achs[id], achievement_url: evn.target.value },
        ...achs.slice(id + 1, achs.length)
      ]);
    }
  };

  const handlePros = (field, id, evn) => {
    if (field === "git_url") {
      setPros([
        ...pros.slice(0, id),
        { ...pros[id], git_url: evn.target.value },
        ...pros.slice(id + 1, pros.length)
      ]);
    }
    if (field === "title") {
      setPros([
        ...pros.slice(0, id),
        { ...pros[id], title: evn.target.value },
        ...pros.slice(id + 1, pros.length)
      ]);
    }
    if (field === "proj_desc") {
      setPros([
        ...pros.slice(0, id),
        { ...pros[id], proj_desc: evn.target.value },
        ...pros.slice(id + 1, pros.length)
      ]);
    }
    if (field === "proj_demo") {
      setPros([
        ...pros.slice(0, id),
        { ...pros[id], proj_demo: evn.target.value },
        ...pros.slice(id + 1, pros.length)
      ]);
    }
    if (field === "proj_image") {
      const imageFb = evn.target.files[0];
      const uploadTask = storage.ref(`images/${imageFb.name}`).put(imageFb);
      // firebase
      // .storage()
      // .ref("profile")
      // .child(evn.target.files[0])
      // .getDownloadURL()
      // .then(url => setPros([...pros.slice(0, id), {...pros[id], proj_image : url}]));
      uploadTask.on(
        "state_changed",
        snapshot => {
          // progress function ...
          // eslint-disable-next-line no-unused-vars
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPros([
            ...pros.slice(0, id),
            { ...pros[id], proj_image: "loading" },
            ...pros.slice(id + 1, pros.length)
          ]);
        },
        error => {
          // Error function ...
          console.log(error);
        },
        () => {
          // complete function ...
          storage
            .ref("images")
            .child(imageFb.name)
            .getDownloadURL()
            .then(url => {
              setPros([
                ...pros.slice(0, id),
                { ...pros[id], proj_image: url },
                ...pros.slice(id + 1, pros.length)
              ]);
            });
        }
      );
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  function ClipBoard(result) {
    navigator.clipboard.writeText(result);
  }

  const handleCopy = () => {
    setCopied(true);
    ClipBoard(portfolioLink);
  };

  const handleTemplate = (temp, e) => {
    setTemplate(temp);
    handleNext(e);
    console.log(temp);
  };

  const matches = useMediaQuery("(min-width:600px)");
  return (
    <div className={classes.section} id="top">
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          {activeStep === 2 ? (
            <h2 className={classes.title}>Showcase your Skills.</h2>
          ) : activeStep === 3 ? (
            <h2 className={classes.title}>Almost Done!</h2>
          ) : (
            <h2 className={classes.title}>Let's Begin!</h2>
          )}
          {matches ? (
            <Stepper
              alternativeLabel
              activeStep={activeStep}
              connector={<QontoConnector />}
              style={{ marginTop: "40px", marginBottom: "50px" }}
            >
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel StepIconComponent={QontoStepIcon}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          ) : null}
          <div>
            <form onSubmit={handleNext}>
              {activeStep === 1 ? (
                <div>
                  <div>
                    <ThemeProvider theme={theme}>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={8}>
                          <TextField
                            id="fullname"
                            label="Name"
                            style={{ margin: 8, marginLeft: "0px" }}
                            placeholder="Enter your full name"
                            required
                            autoFocus
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                              shrink: true
                            }}
                            variant="outlined"
                            value={profileName}
                            onChange={handleChangeName}
                          />
                          <TextField
                            label="About Me"
                            style={{ margin: 8, marginLeft: "0px" }}
                            fullWidth
                            id="aboutme"
                            multiline
                            rows="8"
                            placeholder="Tell us about yourself"
                            variant="outlined"
                            value={aboutMe}
                            required
                            onChange={handleChangeAbout}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                          {loading ? (
                            <CircularProgress style={{ marginTop: "50px" }} />
                          ) : null}
                          {profile.imageURL === "" ? (
                            <img
                              src={placeholder}
                              className={classes.imageRaised}
                              alt="placeholder"
                              style={{
                                width: "150px",
                                margin: "auto",
                                marginTop: "30px",
                                marginBottom: "20px"
                              }}
                            />
                          ) : (
                            <img
                              src={profile.imageURL}
                              className={classes.imageRaised}
                              alt="placeholder"
                              style={{
                                width: "150px",
                                margin: "auto",
                                marginTop: "30px",
                                marginBottom: "20px"
                              }}
                            />
                          )}

                          <br />
                          <div style={{ textAlign: "center" }}>
                            <FileUploader
                              accept="images/*"
                              name="image"
                              required
                              style={{ marginLeft: "30%" }}
                              storageRef={firebase.storage().ref("profile")}
                              onUploadStart={handleUploadProfileStart}
                              onUploadSuccess={handleUploadProfileSuccess}
                            />
                          </div>
                        </GridItem>
                        <ThemeProvider
                          theme={theme}
                          className={classes.contentCard}
                        >
                          <GridItem
                            xs={12}
                            sm={12}
                            md={12}
                            style={{ marginTop: "20px" }}
                          >
                            <h4
                              style={{
                                color: "black",
                                marginTop: "40px",
                                fontWeight: "500"
                              }}
                            >
                              Skill Description:
                            </h4>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <TextField
                              required
                              id="skill-desc"
                              variant="outlined"
                              label="Skill Description"
                              fullWidth
                              style={{ margin: 8, marginLeft: "0px" }}
                              value={skillDescription}
                              onChange={handleSkillDescription}
                            />
                          </GridItem>
                        </ThemeProvider>
                        <GridItem
                          xs={12}
                          sm={12}
                          md={12}
                          style={{ marginTop: "20px" }}
                        >
                          <h4
                            style={{
                              color: "black",
                              fontWeight: "500",
                              marginTop: "40px"
                            }}
                          >
                            Social links:
                          </h4>
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={12}
                          md={4}
                          style={{ marginTop: "20px" }}
                        >
                          <TextField
                            className={classes.margin}
                            id="linkedin"
                            variant="outlined"
                            label="LinkedIn"
                            fullWidth
                            required
                            value={linkedInLink}
                            onChange={handleLinkedIn}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <img
                                    className={classes.svgIcon}
                                    src={linkedIn}
                                    alt="linkedIn"
                                    style={{ width: "20px" }}
                                  />
                                </InputAdornment>
                              )
                            }}
                          />
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={12}
                          md={4}
                          style={{ marginTop: "20px" }}
                        >
                          <TextField
                            className={classes.margin}
                            id="github"
                            variant="outlined"
                            label="Github"
                            fullWidth
                            value={githubLink}
                            required
                            onChange={handleGithub}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <img
                                    src={github}
                                    alt="github"
                                    style={{ width: "20px" }}
                                  />
                                </InputAdornment>
                              )
                            }}
                          />
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={12}
                          md={4}
                          style={{ marginTop: "20px" }}
                        >
                          <TextField
                            className={classes.margin}
                            id="email"
                            variant="outlined"
                            label="Email Id"
                            fullWidth
                            required
                            value={emailLink}
                            onChange={handleEmail}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <img
                                    src={email}
                                    alt="email"
                                    style={{ width: "20px" }}
                                  />
                                </InputAdornment>
                              )
                            }}
                          />
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={12}
                          md={4}
                          style={{ marginTop: "20px" }}
                        >
                          <TextField
                            className={classes.margin}
                            id="phone"
                            variant="outlined"
                            label="Phone No."
                            fullWidth
                            value={phoneNum}
                            onChange={handlePhoneNum}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <img
                                    src={phone}
                                    alt="phone"
                                    style={{ width: "20px" }}
                                  />
                                </InputAdornment>
                              )
                            }}
                          />
                        </GridItem>

                        <GridItem
                          xs={12}
                          sm={12}
                          md={4}
                          style={{ marginTop: "20px" }}
                        >
                          <TextField
                            className={classes.margin}
                            id="twitter"
                            variant="outlined"
                            label="twitter"
                            fullWidth
                            value={twitterLink}
                            onChange={handleTwitter}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <img
                                    src={twitter}
                                    alt="twitter"
                                    style={{ width: "20px" }}
                                  />
                                </InputAdornment>
                              )
                            }}
                          />
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={12}
                          md={4}
                          style={{ marginTop: "20px" }}
                        >
                          <TextField
                            className={classes.margin}
                            id="stack"
                            variant="outlined"
                            label="Stack Overflow"
                            fullWidth
                            value={stackLink}
                            onChange={handleStack}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <img
                                    src={stack}
                                    alt="Stack overflow"
                                    style={{ width: "20px" }}
                                  />
                                </InputAdornment>
                              )
                            }}
                          />
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={12}
                          md={12}
                          style={{ marginTop: "20px" }}
                        >
                          <TextField
                            className={classes.margin}
                            id="location"
                            variant="outlined"
                            label="Current Location"
                            fullWidth
                            value={currentLocation}
                            onChange={handleCurrentLocation}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <img
                                    src={pin}
                                    alt="Location"
                                    style={{ width: "20px" }}
                                  />
                                </InputAdornment>
                              )
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                    </ThemeProvider>
                  </div>
                  <div>
                    <ThemeProvider theme={theme}>
                      <ButtonGroup>
                        <AnchorLink href="#top">
                          <Button
                            disabled={activeStep === 1}
                            onClick={handleBack}
                            color="primary"
                            className={classNames(
                              classes.button,
                              classes.buttonWide
                            )}
                          >
                            Back
                          </Button>
                        </AnchorLink>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classNames(
                            classes.button,
                            classes.buttonWide
                          )}
                          type="submit"
                        >
                          <Typography style={{ color: "white" }}>
                            {activeStep === steps.length - 1
                              ? "Finish"
                              : "Next"}
                          </Typography>
                        </Button>
                      </ButtonGroup>
                    </ThemeProvider>
                  </div>
                </div>
              ) : null}

            </form>
          </div>
        </GridItem>
      </GridContainer>
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          maxWidth={"sm"}
          fullWidth
        >
          <DialogTitle id="alert-dialog-slide-title">
            {!response ? "Building you portfolio " : "You are all set!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {!response ? (
                <h1 style={{ textAlign: "center" }}>
                  <img src={design} alt="design" />
                </h1>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <h4>Here&apos;s your Portfolio&apos;s short link:</h4>
                  <a
                    href={portfolioLink}
                    style={{
                      border: "1px solid #f0f0f0",
                      borderRadius: "5px",
                      padding: "15px",
                      fontWeight: "500",
                      fontSize: "18px",
                      color: "#4caf50"
                    }}
                    id="portfolio"
                  >
                    {portfolioLink}
                  </a>
                </div>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {!response ? (
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            ) : (
              <div>
                <Tooltip
                  title={!copied ? "Copy to clipboard" : "Copied"}
                  aria-label="add"
                >
                  <Button onClick={handleCopy} color="primary">
                    Copy Link
                  </Button>
                </Tooltip>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
              </div>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
