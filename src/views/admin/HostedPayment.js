import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
  CardActionArea,
  CardActions,
  Button,
  Modal,
} from '@material-ui/core';
// @material-ui/icons components
// import LocationOn from "@material-ui/icons/LocationOn";
// import School from "@material-ui/icons/School";

// core components
import UserHeader from 'components/Headers/UserHeader.js';

import componentStyles from 'assets/theme/views/admin/profile.js';
import SinglePayment from 'components/Modal/Payment/SinglePayment';
// import boxShadows from "assets/theme/box-shadow.js";

// redux
import { connect } from 'react-redux';
import { getMerchantProfile } from 'store/actions/merchantActions';

const useStyles = makeStyles(componentStyles, {
  root: {
    width: '40%',
  },
  muted: {
    color: '#ccc',
  },
});

function HostedPayment(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [singleOpen, setSingleOpen] = useState(false);
  const { getMerchantProfile, merchant_subdomain } = props;

  useEffect(() => {
    let setProfile = async () => {
      await getMerchantProfile();
    };
    setProfile();
  }, []);
  const handleSingleOpen = () => {
    setSingleOpen(true);
  };
  const handleModalClose = () => {
    setSingleOpen(false);
  };
  const singlePage = (
    <div className='bg-modal-container'>
      <SinglePayment closeModal={handleModalClose} />
    </div>
  );
  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container
        width='40%'
        component={Box}
        marginTop='-40%'
        classes={classes.root}
      >
        <Modal
          open={singleOpen}
          onClose={handleModalClose}
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
        >
          {singlePage}
        </Modal>
        <Grid container>
          <Grid
            item
            xs={12}
            xl={12}
            component={Box}
            marginBottom='3rem'
            classes={{ root: classes.gridItemRoot + ' ' + classes.order2 }}
          >
            <Card
              classes={{
                root: classes.cardRoot + ' ' + classes.cardRootSecondary,
              }}
            >
              <CardHeader
                subheader={
                  <Grid
                    container
                    component={Box}
                    alignItems='center'
                    justifyContent='space-between'
                  >
                    <Grid item xs='auto'>
                      <Box
                        component={Typography}
                        variant='h3'
                        marginBottom='0!important'
                      >
                        Hosted Payment Options
                      </Box>
                    </Grid>
                  </Grid>
                }
                classes={{ root: classes.cardHeaderRoot }}
              ></CardHeader>
              <CardContent>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='h2'>
                        Single Page Payment
                      </Typography>
                      <Typography
                        variant='body2'
                        color='textSecondary'
                        component='p'
                      >
                        Create a custom single page with a unique link to
                        receive payments from your customers
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    {merchant_subdomain ? (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          width: '100%',
                        }}
                      >
                        <p>
                          http://app.junctionapi.com/merchant/
                          {merchant_subdomain}
                        </p>
                        <Button
                          size='large'
                          color='default'
                          onClick={handleSingleOpen}
                        >
                          Edit
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size='large'
                        color='default'
                        onClick={handleSingleOpen}
                      >
                        Choose
                      </Button>
                    )}
                  </CardActions>
                </Card>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='h2'>
                        Manual Payment Selector
                      </Typography>
                      <Typography
                        variant='body2'
                        color='textSecondary'
                        color='gray'
                        component='p'
                      >
                        Give your customers the power to select their preferred
                        payment gateway
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    {/* <Button size="large" color="default">
                      Choose
                    </Button> */}
                    <i style={{ color: '#ccc' }}>coming soon...</i>
                  </CardActions>
                </Card>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='h2'>
                        Automatic Selection Page
                      </Typography>
                      <Typography
                        variant='body2'
                        color='textSecondary'
                        component='p'
                      >
                        Ensure that all payments are successful by automatically
                        receiving funds through any successful gateway
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    {/* <Button size='large' color='default'>
                      Choose
                    </Button> */}
                    <i style={{ color: '#ccc' }}>coming soon...</i>
                  </CardActions>
                </Card>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    merchant_subdomain: state?.merchantReducers?.merchant_subdomain,
  };
};

export default connect(mapStateToProps, {
  getMerchantProfile,
})(HostedPayment);
