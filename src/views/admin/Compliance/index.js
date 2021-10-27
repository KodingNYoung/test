import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ComplianceHeader from "components/Headers/ComplianceHeader";
import Policy from "./Policy";
import Evidence from "./Evidence";
import Penetration from "./Penetration";
import ASVscan from "./ASVscan";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
    marginTop: "-6rem",
    paddingLeft: "39px",
    paddingRight: "39px",
  },
}));

const Compliance = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <ComplianceHeader />
      {/* Page content */}
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab
              label="Policies"
              {...a11yProps(0)}
              style={{ background: "#525f7f" }}
            />
            <Tab
              label="Evidence"
              {...a11yProps(1)}
              style={{ background: "#525f7f" }}
            />
             <Tab
              label="Penetration Tests"
              {...a11yProps(2)}
              style={{ background: "#525f7f" }}
            />
            <Tab
              label="ASV Scans"
              {...a11yProps(3)}
              style={{ background: "#525f7f" }}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Policy />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Evidence />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Penetration />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ASVscan />
        </TabPanel>
      </div>
    </>
  );
};

export default Compliance;
