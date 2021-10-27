import React, { useState, useRef } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
// @material-ui/icons components
// core components

import componentStyles from "assets/theme/views/admin/profile.js";
import "index.css";
const useStyles = makeStyles(componentStyles);

function Merchant(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [upload, setUpload] = useState(false);
  const [respond, setRespond] = useState(false);
  const [file, setFile] = useState();

  const fileInput = useRef(null);
  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };
  return (
    <>
      <h2 id="simple-modal-title">View {props.type}</h2>
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        // marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            xl={12}
            component={Box}
            marginBottom="3rem"
            classes={{ root: classes.gridItemRoot + " " + classes.order2 }}
          >
            <Card
              classes={{
                root: classes.cardRoot + " " + classes.cardRootSecondary,
              }}
            >
              <CardHeader
                subheader={
                  <Grid
                    container
                    component={Box}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item xs="auto">
                      <Box
                        component={Typography}
                        variant="h3"
                        marginBottom="0!important"
                      >
                        {props.title}
                      </Box>
                    </Grid>
                    <Grid item xs="auto">
                      <Box
                        justifyContent="flex-end"
                        display="flex"
                        flexWrap="wrap"
                      >
                        <Button
                          variant="contained"
                          color="default"
                          size="medium"
                          onClick={() => window.open(props.btnurl, "_blank")}
                        >
                          Download {props.type}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                }
                classes={{ root: classes.cardHeaderRoot }}
              ></CardHeader>
              <CardContent>
                <Box
                  component={Typography}
                  variant="h6"
                  color={theme.palette.gray[600] + "!important"}
                  paddingTop=".25rem"
                  paddingBottom=".25rem"
                  fontSize=".75rem!important"
                  letterSpacing=".04em"
                  marginBottom="1.5rem!important"
                  classes={{ root: classes.typographyRootH6 }}
                >
                  Policy Description
                </Box>
                <div className={classes.plLg2}>
                  <Grid container>
                    <Typography>{props.description}</Typography>
                  </Grid>
                </div>
                <Box
                  component={Typography}
                  variant="h6"
                  color={theme.palette.gray[600] + "!important"}
                  paddingTop=".25rem"
                  paddingBottom=".25rem"
                  fontSize=".75rem!important"
                  letterSpacing=".04em"
                  marginBottom="1.5rem!important"
                  marginTop="1.5rem!important"
                  classes={{ root: classes.typographyRootH6 }}
                >
                  Version History
                  <IconButton
                    aria-label="add"
                    className={classes.mlLg4 + " " + classes.addButton}
                    onClick={() => setUpload(!upload)}
                  >
                    {upload ? <RemoveIcon /> : <AddIcon />}
                  </IconButton>
                </Box>
                {upload ? (
                  <div>
                    <input
                      ref={fileInput}
                      onChange={handleFileUpload}
                      type="file"
                      style={{ display: "none" }}
                    />
                    <Button
                      onClick={() => fileInput.current.click()}
                      type="button"
                      style={{ width: "100%" }}
                    >
                      Upload File
                    </Button>
                    <Grid container>
                      <Grid item xs={12} lg={6}>
                        <p>{file ? file.name : null}</p>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Button
                          variant="contained"
                          type="submit"
                          style={{ float: "right", margin: 8 }}
                          className={classes.addButton}
                        >
                          Create
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                ) : null}

                <div>
                  <Grid container>
                    <Grid item xs={12} lg={6}>
                      <FormGroup>
                        <FormLabel>Date Uploaded</FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            component={FilledInput}
                            autoComplete="off"
                            type="text"
                            disabled
                            aria-readonly
                            value="02 March 2029"
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <FormGroup>
                        <FormLabel>Download</FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                        >
                          <Button
                            variant="contained"
                            size="medium"
                            color="default"
                            className={classes.margin}
                          >
                            Click Here to Download Version
                          </Button>
                        </FormControl>
                      </FormGroup>
                    </Grid>
                  </Grid>
                </div>
                <Box
                  component={Divider}
                  marginBottom="1.5rem!important"
                  marginTop="1.5rem!important"
                />
                <Box
                  component={Typography}
                  variant="h6"
                  color={theme.palette.gray[600] + "!important"}
                  paddingTop=".25rem"
                  paddingBottom=".25rem"
                  fontSize=".75rem!important"
                  letterSpacing=".04em"
                  marginBottom="1.5rem!important"
                  classes={{ root: classes.typographyRootH6 }}
                >
                  Comments
                  <IconButton
                    aria-label="add"
                    className={classes.mlLg4 + " " + classes.addButton}
                    onClick={() => setRespond(!respond)}
                  >
                    {respond ? <RemoveIcon /> : <AddIcon />}
                  </IconButton>
                </Box>
                {respond ? (
                  <FormGroup>
                    <FormLabel>Your Message</FormLabel>
                    <FormControl
                      variant="filled"
                      component={Box}
                      width="100%"
                      marginBottom="1rem!important"
                    >
                      <div
                        style={{
                          marginBottom: "1.5rem",
                          textAlign: "left",
                        }}
                      >
                        <Box
                          paddingLeft="0.75rem"
                          paddingRight="0.75rem"
                          component={FilledInput}
                          autoComplete="off"
                          multiline
                          defaultValue="Enter your message here"
                          rows="2"
                        />
                      </div>
                    </FormControl>
                    <Grid container>
                      <Grid item xs={12} lg={6}>
                        <p></p>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Button
                          variant="contained"
                          type="submit"
                          style={{ float: "right", margin: 8 }}
                          className={classes.addButton}
                        >
                          Send
                        </Button>
                      </Grid>
                    </Grid>
                  </FormGroup>
                ) : null}
                <div
                  className={classes.plLg4}
                  style={{ maxHeight: "300px", overflowY: "scroll" }}
                >
                  <Grid container>
                    <Grid item xs={12}>
                      <FormGroup>
                        <FormLabel>Jessica Jones</FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                        >
                          <div
                            style={{
                              marginBottom: "1.5rem",
                              textAlign: "left",
                            }}
                          >
                            <Box
                              paddingLeft="0.75rem"
                              paddingRight="0.75rem"
                              component={FilledInput}
                              autoComplete="off"
                              multiline
                              value="A beautiful Dashboard for Bootstrap 4. It is Free and Open Source."
                              rows="2"
                              disabled
                            />
                          </div>
                        </FormControl>
                        <FormLabel style={{ textAlign: "right" }}>
                          Peter Auditor
                        </FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                        >
                          <div
                            style={{
                              marginBottom: "1.5rem",
                              textAlign: "right",
                            }}
                          >
                            <Box
                              paddingLeft="0.75rem"
                              paddingRight="0.75rem"
                              component={FilledInput}
                              autoComplete="off"
                              textAlign="right"
                              disabled
                              multiline
                              value="A beautiful Dashboard for Bootstrap 4. It is Free and Open Source."
                              rows="2"
                            />
                          </div>
                        </FormControl>
                        <FormLabel>Jessica Jones</FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                        >
                          <div
                            style={{
                              marginBottom: "1.5rem",
                              textAlign: "left",
                            }}
                          >
                            <Box
                              paddingLeft="0.75rem"
                              paddingRight="0.75rem"
                              component={FilledInput}
                              autoComplete="off"
                              multiline
                              value="A beautiful Dashboard for Bootstrap 4. It is Free and Open Source."
                              rows="2"
                              disabled
                            />
                          </div>
                        </FormControl>
                      </FormGroup>
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className={classes.buttonContainedError}
            >
              Delete
            </Button>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Button
              variant="contained"
              size="large"
              color="default"
              className={classes.margin}
              style={{ float: "right" }}
            >
              Approve
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Merchant;
