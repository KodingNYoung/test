import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
// @material-ui/icons component

import componentStyles from "assets/theme/components/header.js";

const useStyles = makeStyles(componentStyles);

const PageHeader = () => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <div className={classes.header}>
        <Container
          maxWidth={false}
          component={Box}
          classes={{ root: classes.containerRoot }}
        >
          <div>
            <Grid container>
              <Grid item xl={3} lg={6} xs={12}></Grid>
              <Grid item xl={3} lg={6} xs={12}></Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </>
  );
};

export default PageHeader;
