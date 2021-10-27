import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "server/MerchantServer/server";
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
// @material-ui/icons components
// import LocationOn from "@material-ui/icons/LocationOn";
// import School from "@material-ui/icons/School";

// core components
import UserHeader from "components/Headers/UserHeader.js";

import componentStyles from "assets/theme/views/admin/profile.js";
import { getAvailableProcessors } from "server/MerchantServer/payment";
// import boxShadows from "assets/theme/box-shadow.js";

const useStyles = makeStyles(componentStyles);

function Profile() {
  const classes = useStyles();
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [phone_number, setPhone] = useState("");
  const [bank, setBank] = useState("");
  const [account_name, setAccountName] = useState("");
  const [account_number, setAccountNumber] = useState("");
  const [rave_sk, setRaveSK] = useState("");
  const [rave_pk, setRavePK] = useState("");
  const [rave_encryption_k, setEncryptK] = useState("");

  useEffect(() => {
    const getProfileData = async () => {
      let data = await getProfile();
      try {
        setData(data.data);
      } catch {
        setData([]);
      }
    };
    const getProcessors = async () => {
      let data = await getAvailableProcessors();
      try {
        setProcessors(data.data);
      } catch {
        setProcessors([]);
      }
    };
    getProfileData();
    getProcessors();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProfile = {
      phone_number : phone_number ? phone_number : data.phone_number,
      rave_pk: rave_pk ? rave_pk : data.rave_pk,
      rave_sk: rave_sk ? rave_sk : data.rave_sk,
      rave_encryption_k: rave_encryption_k ? rave_encryption_k : data.rave_encryption_k,
    };
    let update = updateProfile(updatedProfile);
    console.log(update);
  };
  console.log(data);
  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-50%"
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
                        My Account
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
                          size="small"
                          onClick={handleSubmit}
                        >
                          Update
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
                  User Information
                </Box>
                <div className={classes.plLg4}>
                  <Grid container>
                    <Grid item xs={12} lg={6}>
                      <FormGroup>
                        <FormLabel>Fullname</FormLabel>
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
                            value={data?.fullname}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <FormGroup>
                        <FormLabel>Email</FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                        >
                          <Box
                            paddingLeft="0.75rem"
                            paddingRight="0.75rem"
                            color="#000"
                            component={FilledInput}
                            autoComplete="off"
                            type="email"
                            value={data?.email}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} lg={6}>
                      <FormGroup>
                        <FormLabel>Business name</FormLabel>
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
                            value={data?.business_name}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <FormGroup>
                        <FormLabel>Phone Number</FormLabel>
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
                            placeholder={data?.phone_number}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} lg={6}>
                      <FormGroup>
                        <FormLabel>Role</FormLabel>
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
                            value={data?.role}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} lg={6}></Grid>
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
                  Licences and Certifications
                </Box>
                <div className={classes.plLg4}>
                  <Grid container>
                    <Grid item xs={12} lg={3}>
                      <FormGroup>
                        <FormLabel>Name</FormLabel>
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
                            defaultValue=""
                            onChange={(e) => setBank(e.target.value)}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                      <FormGroup>
                        <FormLabel>Issuer</FormLabel>
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
                            defaultValue=""
                            onChange={(e) => setAccountName(e.target.value)}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                      <FormGroup>
                        <FormLabel>Valid until</FormLabel>
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
                            type="date"
                            placeholder=""
                            onChange={(e) => setAccountNumber(e.target.value)}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                      <FormGroup>
                        <FormLabel>Upload File</FormLabel>
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
                            type="file"
                            placeholder=""
                            onChange={(e) => setAccountNumber(e.target.value)}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} lg={3}>
                      <FormGroup>
                        <FormLabel>Name</FormLabel>
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
                            defaultValue="Azure Certificate"
                            onChange={(e) => setBank(e.target.value)}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                      <FormGroup>
                        <FormLabel>Issuer</FormLabel>
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
                            defaultValue="Microsoft"
                            onChange={(e) => setAccountName(e.target.value)}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                      <FormGroup>
                        <FormLabel>Valid until</FormLabel>
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
                            type="date"
                            defaultValue="19/09/2020"
                            onChange={(e) => setAccountNumber(e.target.value)}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                      <FormGroup>
                        <FormLabel>Upload File</FormLabel>
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
                            type="file"
                            placeholder="license"
                            onChange={(e) => setAccountNumber(e.target.value)}
                          />
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
                  Payment Configuration
                </Box>
                <div className={classes.plLg4}>
                  {processors
                    ? processors.map((processor) => {
                        return (
                          <Grid container>
                            <Grid item xs={12}>
                              <FormLabel>{processor.toUpperCase()}</FormLabel>
                            </Grid>
                            <Grid item xs={12} lg={4}>
                              <FormGroup>
                                <FormLabel>Public Key</FormLabel>
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
                                    placeholder={data?.rave_encryption_key}
                                    onChange={(e) => setRavePK(e.target.value)}
                                  />
                                </FormControl>
                              </FormGroup>
                            </Grid>
                            <Grid item xs={12} lg={4}>
                              <FormGroup>
                                <FormLabel>Secret Key</FormLabel>
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
                                    placeholder="****************"
                                    onChange={(e) => setRaveSK(e.target.value)}
                                  />
                                </FormControl>
                              </FormGroup>
                            </Grid>
                            <Grid item xs={12} lg={4}>
                              <FormGroup>
                                <FormLabel>Token</FormLabel>
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
                                    placeholder="***********"
                                    onChange={(e) =>
                                      setEncryptK(e.target.value)
                                    }
                                  />
                                </FormControl>
                              </FormGroup>
                            </Grid>
                          </Grid>
                        );
                      })
                    : null}
                </div>
              </CardContent>
            </Card>
          </Grid>
          {/* <Grid
            item
            xs={12}
            xl={4}
            component={Box}
            marginBottom="3rem!important"
            classes={{ root: classes.order1 + " " + classes.marginBottomXl0 }}
          >
            <Card classes={{ root: classes.cardRoot }}>
              <Box component={Grid} container justifyContent="center">
                <Grid item xs={12} lg={3}>
                  <Box position="relative">
                    <Box
                      component="img"
                      src={
                        require("assets/img/theme/team-4-800x800.jpg").default
                      }
                      alt="..."
                      maxWidth="180px"
                      borderRadius="50%"
                      position="absolute"
                      left="50%"
                      boxShadow={boxShadows.boxShadow + "!important"}
                      className={classes.profileImage}
                    />
                  </Box>
                </Grid>
              </Box>
              <Box
                component={CardHeader}
                border="0!important"
                textAlign="center"
                paddingBottom="0!important"
                paddingTop="8rem!important"
                classes={{ root: classes.cardHeaderRootProfile }}
                subheader={
                  <Box display="flex" justifyContent="space-between">
                    <Button
                      variant="contained"
                      size="small"
                      classes={{ root: classes.buttonRootInfo }}
                    >
                      Connect
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      classes={{ root: classes.buttonRootDark }}
                    >
                      Message
                    </Button>
                  </Box>
                }
              ></Box>
              <Box
                component={CardContent}
                classes={{ root: classes.ptMd4 }}
                paddingTop="0!important"
              >
                <Grid container>
                  <Grid item xs={12}>
                    <Box
                      padding="1rem 0"
                      justifyContent="center"
                      display="flex"
                      className={classes.mtMd5}
                    >
                      <Box
                        textAlign="center"
                        marginRight="1rem"
                        padding=".875rem"
                      >
                        <Box
                          component="span"
                          fontSize="1.1rem"
                          fontWeight="700"
                          display="block"
                          letterSpacing=".025em"
                          className={classes.typographyRootH6}
                        >
                          22
                        </Box>
                        <Box
                          component="span"
                          fontSize=".875rem"
                          color={theme.palette.gray[500]}
                        >
                          Friends
                        </Box>
                      </Box>
                      <Box
                        textAlign="center"
                        marginRight="1rem"
                        padding=".875rem"
                      >
                        <Box
                          component="span"
                          fontSize="1.1rem"
                          fontWeight="700"
                          display="block"
                          letterSpacing=".025em"
                          className={classes.typographyRootH6}
                        >
                          10
                        </Box>
                        <Box
                          component="span"
                          fontSize=".875rem"
                          color={theme.palette.gray[500]}
                        >
                          Photos
                        </Box>
                      </Box>
                      <Box textAlign="center" padding=".875rem">
                        <Box
                          component="span"
                          fontSize="1.1rem"
                          fontWeight="700"
                          display="block"
                          letterSpacing=".025em"
                          className={classes.typographyRootH6}
                        >
                          89
                        </Box>
                        <Box
                          component="span"
                          fontSize=".875rem"
                          color={theme.palette.gray[500]}
                        >
                          Comments
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Box textAlign="center">
                  <Typography variant="h3">
                    Jessica Jones
                    <Box component="span" fontWeight="300">
                      , 27
                    </Box>
                  </Typography>
                  <Box
                    component={Typography}
                    variant="h5"
                    fontWeight="300!important"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box
                      component={LocationOn}
                      width="1.25rem!important"
                      height="1.25rem!important"
                    ></Box>
                    Bucharest, Romania
                  </Box>
                  <Box
                    component={Typography}
                    variant="h5"
                    marginTop="3rem!important"
                  >
                    Solution Manager - Creative Tim Officer
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="1rem"
                  >
                    <Box
                      component={School}
                      width="1.25rem!important"
                      height="1.25rem!important"
                      marginRight=".5rem"
                    ></Box>
                    University of Computer Science
                  </Box>
                  <Box
                    component={Divider}
                    marginTop="1.5rem!important"
                    marginBottom="1.5rem!important"
                  ></Box>
                  <Box
                    component="p"
                    fontWeight="300"
                    lineHeight="1.7"
                    marginBottom="1rem"
                    fontSize="1rem"
                  >
                    Ryan — the name taken by Melbourne-raised, Brooklyn-based
                    Nick Murphy — writes, performs and records all of his own
                    music.
                  </Box>
                  <a
                    href="#mui"
                    className={classes.cardProfileLink}
                    onClick={(e) => e.preventDefault()}
                  >
                    Show More
                  </a>
                </Box>
              </Box>
            </Card>
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}

export default Profile;
