const componentStyles = (theme) => ({
  header: {
    position: "relative",
    background:
      "linear-gradient(87deg," + '#53c6e9' + ",#1790cf)",
    paddingBottom: "8rem",
    paddingTop: "3rem",
    [theme.breakpoints.up("md")]: {
      paddingTop: "8rem",
    },
  },
  a_header: {
    position: "relative",
    paddingBottom: "8rem",
    // background:
    //   "linear-gradient(87deg," + '#53c6e9' + ",#1790cf)",
    paddingTop: "1rem",
    // [theme.breakpoints.up("lg")]: {
    //   paddingTop: "8rem",
    // },
  },
  containerRoot: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "39px",
      paddingRight: "39px",
    },
  },
});

export default componentStyles;
