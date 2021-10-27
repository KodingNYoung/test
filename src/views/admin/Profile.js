import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import { Typography, Tooltip } from '@material-ui/core';
// @material-ui/icons components
import { ErrorAlert, SuccessAlert } from 'components/Alert/Alerts';
// core components
import UserHeader from 'components/Headers/UserHeader.js';

import componentStyles from 'assets/theme/views/admin/profile.js';

// redux
import { connect } from 'react-redux';
import {
  getMerchantProfile,
  updateMerchantProfile,
} from 'store/actions/merchantActions';
import { getAvailableProcessors } from 'store/actions/paymentActions';

const useStyles = makeStyles(componentStyles);

function Profile(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [processors, setProcessors] = useState([]);
  const [loading, setLoading] = useState({
    content: false,
    submit: false,
  });
  const [alert, setAlert] = useState(null);
  const [data, setData] = useState({
    bank_account_name: '',
    bank_account_number: '',
    bank_name: '',
    phone_number: '',
    rave_encryption_k: '',
    rave_pk: '',
    rave_sk: '',
  });
  const {
    getMerchantProfile,
    updateMerchantProfile,
    merchant_profile,
    getAvailableProcessors,
    available_processors,
  } = props;
  useEffect(() => {
    setLoading({ ...loading, content: true });
    getProfileData();
    getProcessors();
    setLoading({ ...loading, content: false });
  }, []);
  useEffect(() => {
    setData({
      phone_number: merchant_profile?.phone_number,
      bank_name: merchant_profile?.bank_name,
      bank_account_number: merchant_profile?.bank_account_number,
      bank_account_name: merchant_profile?.bank_account_name,
      rave_pk: merchant_profile?.rave_pk,
      rave_sk: merchant_profile?.rave_sk,
      rave_encryption_k: merchant_profile?.rave_encryption_k,
    });
  }, [merchant_profile]);
  const getProfileData = async () => {
    await getMerchantProfile();
  };
  const getProcessors = async () => {
    await getAvailableProcessors();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, submit: true });

    const res = await updateMerchantProfile(data);
    setLoading({ ...loading, submit: false });
    if (res.status === 'success') {
      setAlert(<SuccessAlert message={res.message} />);
    } else {
      setAlert(<ErrorAlert message={res.message} />);
    }
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };
  const handleTextChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };
  return (
    <>
      {alert && alert}
      <UserHeader />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop='-40%'
        classes={{ root: classes.containerRoot }}
      >
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
                        My Account
                      </Box>
                    </Grid>
                  </Grid>
                }
                classes={{ root: classes.cardHeaderRoot }}
              ></CardHeader>
              <CardContent>
                <Box
                  component={Typography}
                  variant='h6'
                  color={theme.palette.gray[600] + '!important'}
                  paddingTop='.25rem'
                  paddingBottom='.25rem'
                  fontSize='.75rem!important'
                  letterSpacing='.04em'
                  marginBottom='1.5rem!important'
                  classes={{ root: classes.typographyRootH6 }}
                >
                  User Information
                </Box>
                <div className={classes.plLg4}>
                  {!loading.content ? (
                    <>
                      <Grid container>
                        <Grid item xs={12} lg={6}>
                          <FormInput label='Full Name'>
                            <Tooltip
                              title='You cannot edit this value'
                              placement='top-start'
                            >
                              <Box
                                paddingLeft='0.75rem'
                                paddingRight='0.75rem'
                                component={FilledInput}
                                autoComplete='off'
                                type='test'
                                value={merchant_profile?.fullname}
                                onChange={handleTextChange}
                                name='fullname'
                                disabled
                              />
                            </Tooltip>
                          </FormInput>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <FormInput label='Email'>
                            <Tooltip
                              title='You cannot edit this value'
                              placement='top-start'
                            >
                              <Box
                                type='email'
                                name='email'
                                value={merchant_profile?.email}
                                onChange={handleTextChange}
                                paddingLeft='0.75rem'
                                paddingRight='0.75rem'
                                component={FilledInput}
                                autoComplete='off'
                                disabled
                              />
                            </Tooltip>
                          </FormInput>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={12} lg={6}>
                          <FormInput label='Business Name'>
                            <Tooltip
                              title='You cannot edit this value'
                              placement='top-start'
                            >
                              <Box
                                type='text'
                                name='business_name'
                                value={merchant_profile?.business_name}
                                onChange={handleTextChange}
                                disabled
                                paddingLeft='0.75rem'
                                paddingRight='0.75rem'
                                component={FilledInput}
                                autoComplete='off'
                              />
                            </Tooltip>
                          </FormInput>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <FormInput label='Phone'>
                            <InputBox
                              type='text'
                              name='phone_number'
                              placeholder={data?.phone_number}
                              onChange={handleTextChange}
                              value={data?.phone_number}
                            />
                          </FormInput>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={12} lg={6}>
                          <FormInput label='Role'>
                            <Tooltip
                              title='You cannot edit this value'
                              placement='top-start'
                            >
                              <Box
                                type='text'
                                name='role'
                                onChange={handleTextChange}
                                value={merchant_profile?.role}
                                disabled
                                paddingLeft='0.75rem'
                                paddingRight='0.75rem'
                                component={FilledInput}
                                autoComplete='off'
                              />
                            </Tooltip>
                          </FormInput>
                        </Grid>
                        <Grid item xs={12} lg={6}></Grid>
                      </Grid>
                    </>
                  ) : (
                    'Loading...'
                  )}
                </div>
                <Box
                  component={Divider}
                  marginBottom='1.5rem!important'
                  marginTop='1.5rem!important'
                />
                <Box
                  component={Typography}
                  variant='h6'
                  color={theme.palette.gray[600] + '!important'}
                  paddingTop='.25rem'
                  paddingBottom='.25rem'
                  fontSize='.75rem!important'
                  letterSpacing='.04em'
                  marginBottom='1.5rem!important'
                  classes={{ root: classes.typographyRootH6 }}
                >
                  Payout Information
                </Box>
                <div className={classes.plLg4}>
                  {!loading.content ? (
                    <Grid container>
                      <Grid item xs={12} lg={4}>
                        <FormInput label='Bank'>
                          <InputBox
                            type='text'
                            name='bank_name'
                            onChange={handleTextChange}
                            value={data?.bank_name}
                          />
                        </FormInput>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <FormInput label='Account Name'>
                          <InputBox
                            type='text'
                            name='bank_account_name'
                            onChange={handleTextChange}
                            value={data?.bank_account_name}
                          />
                        </FormInput>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <FormInput label='Account Number'>
                          <InputBox
                            type='number'
                            name='bank_account_number'
                            onChange={handleTextChange}
                            value={data?.bank_account_number}
                          />
                        </FormInput>
                      </Grid>
                    </Grid>
                  ) : (
                    'Loading...'
                  )}
                </div>
                <Box
                  component={Divider}
                  marginBottom='1.5rem!important'
                  marginTop='1.5rem!important'
                />
                <Box
                  component={Typography}
                  variant='h6'
                  color={theme.palette.gray[600] + '!important'}
                  paddingTop='.25rem'
                  paddingBottom='.25rem'
                  fontSize='.75rem!important'
                  letterSpacing='.04em'
                  marginBottom='1.5rem!important'
                  classes={{ root: classes.typographyRootH6 }}
                >
                  Payment Configuration
                </Box>
                <div className={classes.plLg4}>
                  {!loading.content
                    ? available_processors
                      ? available_processors.map((processor, id) => {
                          return (
                            <Grid container key={id}>
                              <Grid item xs={12}>
                                <FormLabel>{processor.toUpperCase()}</FormLabel>
                              </Grid>
                              <Grid item xs={12} lg={4}>
                                <FormInput label='Public Key'>
                                  <InputBox
                                    type='text'
                                    placeholder='****************'
                                    onChange={handleTextChange}
                                    value={data.rave_pk}
                                    name='rave_pk'
                                  />
                                </FormInput>
                              </Grid>
                              <Grid item xs={12} lg={4}>
                                <FormInput label='Secret Key'>
                                  <InputBox
                                    type='text'
                                    placeholder='****************'
                                    onChange={handleTextChange}
                                    value={data.rave_sk}
                                    name='rave_sk'
                                  />
                                </FormInput>
                              </Grid>
                              <Grid item xs={12} lg={4}>
                                <FormInput label='Token'>
                                  <InputBox
                                    type='text'
                                    placeholder='***********'
                                    onChange={handleTextChange}
                                    value={data.rave_encryption_k}
                                    name='rave_encryption_k'
                                  />
                                </FormInput>
                              </Grid>
                            </Grid>
                          );
                        })
                      : null
                    : 'Loading...'}
                </div>
                <Box
                  component={Divider}
                  marginBottom='1.5rem!important'
                  marginTop='1.5rem!important'
                />
                <Grid
                  container
                  component={Box}
                  alignItems='center'
                  justifyContent='flex-end'
                >
                  <Grid item xs='auto'>
                    <Box
                      justifyContent='flex-end'
                      display='flex'
                      flexWrap='wrap'
                    >
                      <Button
                        variant='contained'
                        color='default'
                        size='large'
                        onClick={handleSubmit}
                        disabled={loading.submit}
                        style={{ border: 0 }}
                      >
                        {loading.submit ? 'Updating' : 'Update'}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const FormInput = ({ label, children }) => {
  return (
    <FormGroup>
      <FormLabel>{label}</FormLabel>
      <FormControl
        variant='filled'
        component={Box}
        width='100%'
        marginBottom='1rem!important'
      >
        {children}
      </FormControl>
    </FormGroup>
  );
};

const InputBox = ({ type, placeholder, onChange, value, name, disabled }) => {
  return (
    <Box
      paddingLeft='0.75rem'
      paddingRight='0.75rem'
      component={FilledInput}
      autoComplete='off'
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      name={name}
      disabled={disabled}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    merchant_profile: state?.merchantReducers?.merchant_profile,
    available_processors: state?.paymentReducers?.available_processors,
  };
};

export default connect(mapStateToProps, {
  getMerchantProfile,
  updateMerchantProfile,
  getAvailableProcessors,
})(Profile);
