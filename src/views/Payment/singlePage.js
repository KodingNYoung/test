import React, { useState } from 'react';
import { ErrorAlert, SuccessAlert } from 'components/Alert/Alerts';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Grid,
  FormControl,
  FilledInput,
  // TextField,
} from '@material-ui/core';

// core components
import componentStyles from 'assets/theme/views/auth/login.js';
import publicIp from 'public-ip';
// pin input
import PintInput from 'components/PinInput/PintInput';

// redux
import { connect } from 'react-redux';
import {
  getMerchantByDomainName,
  initiatePayment,
  authorizePayment,
} from 'store/actions/paymentActions';

const useStyles = makeStyles(componentStyles);

function SinglePage(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [displayAlert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
  const [processor, setProcessor] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardPin, setCardPin] = useState(new Array(4).fill(''));
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');
  const [transaction_id, setTransactionId] = useState('');
  const [otp, setOTP] = useState('');
  const [domain, setDomain] = useState('');
  const [ip, setIp] = useState('');
  const [href, setHref] = useState({});
  const [loading, setLoading] = useState({ merchant: false });

  const {
    getMerchantByDomainName,
    payment_merchant,
    initiatePayment,
    authorizePayment,
  } = props;

  React.useEffect(() => {
    setLoading({ ...loading, merchant: true });
    getIp();
    const href = window.location;
    setHref(href);
    const segments = new URL(href).pathname.split('/');
    const last = segments.pop() || segments.pop(); // Handle potential trailing slash
    checkMerchant(last);
    setLoading({ ...loading, merchant: true });
  }, []);

  const checkMerchant = async (domain) => {
    const merchant = await getMerchantByDomainName(domain);
    if (merchant.status !== 'success') {
      window.location.replace('/merchant/notfound');
      return;
    } else {
      localStorage.setItem('bgColor', payment_merchant?.bkg_color);
      setDomain(domain);
    }
  };
  const getIp = async () => {
    let ip = await publicIp.v4();
    setIp(ip);
  };
  const updateProcessor = (e) => {
    setProcessor(e);
    setPage(2);
  };

  // onchange
  const handlePinChange = (e, index) => {
    const element = e.target;
    if (isNaN(element.value) || element.value === ' ') return;
    element.type = 'text';

    const newToken = cardPin.map((digit, i) => {
      if (index === i) {
        return element.value;
      }
      return digit;
    });
    setCardPin(newToken);
    // if it was backspace that was pressed
    if (element.value === '') {
      // if it has a previous box
      if (element.previousElementSibling) {
        element.previousElementSibling.focus();
      } else {
        // if it doesn't
        return;
      }
    } else if (element.nextElementSibling) {
      // if it wasn't a backspace and there is a next box
      element.nextElementSibling.focus();
    }
    setTimeout(() => {
      return (element.type = 'password');
    }, 500);
  };

  const submitOTP = async (e) => {
    e.preventDefault();
    const data = {
      otp,
      transaction_id: transaction_id.toString(),
    };
    let authorizePay = await authorizePayment(data, domain);
    if (authorizePay.data.status === 'successful') {
      setPage(5);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      card_number: cardNumber,
      cvv,
      expiry_month: expiryDate.split('-')[1],
      expiry_year: expiryDate.split('-')[0].slice(-2),
      currency: 'NGN',
      amount,
      email,
      fullname: fullName,
      ip,
      source: href.href,
      card_pin: cardPin.join(''),
      gateway: processor,
    };

    let initiatePay = await initiatePayment(data, domain);
    if (initiatePay.status === 'success') {
      setPage(4);
      setTransactionId(initiatePay.data.id);
    } else {
      setAlert(true);
      setError(true);
      setMessage(initiatePay.message);
      setTimeout(() => {
        setAlert(false);
        setError(false);
      }, 3000);
    }
  };
  return (
    <>
      {displayAlert && error ? (
        <ErrorAlert message={message} />
      ) : displayAlert && error === false ? (
        <SuccessAlert message={message} />
      ) : null}
      <Grid item xs={12} lg={5} md={7}>
        <Card classes={{ root: classes.cardRoot }}>
          <CardHeader
            className={classes.cardHeader}
            title={
              <Box
                fontSize='80%'
                fontWeight='400'
                component='small'
                color={theme.palette.gray[600]}
              >
                Make Payment to:
              </Box>
            }
            titleTypographyProps={{
              component: Box,
              textAlign: 'center',
              marginBottom: '1rem!important',
              marginTop: '.5rem!important',
              fontSize: '1rem!important',
            }}
            subheader={
              <Box textAlign='center'>
                <Box
                  component={Button}
                  variant='contained'
                  marginRight='.5rem!important'
                  classes={{ root: classes.buttonRoot }}
                >
                  <Box component='span' marginRight='4px'>
                    <Box
                      alt='...'
                      component='img'
                      width='20px'
                      className={classes.buttonImg}
                      src={payment_merchant?.logo_url}
                    ></Box>
                  </Box>
                  <Box component='span' marginLeft='.75rem'>
                    {payment_merchant?.business_name}
                  </Box>
                </Box>
              </Box>
            }
          ></CardHeader>
          {page === 1 ? (
            <CardContent classes={{ root: classes.cardContent }}>
              <Box
                color={theme.palette.gray[600]}
                textAlign='center'
                marginBottom='1rem'
                fontSize='1rem'
              >
                <Box fontSize='80%' fontWeight='400' component='small'>
                  Select preferred payment gateway
                </Box>
              </Box>
              <Box display='flex' justifyContent='space-between'>
                <Box textAlign='left' maxWidth='50%'>
                  <Box
                    component={Button}
                    variant='contained'
                    marginRight='.5rem!important'
                    classes={{ root: classes.buttonRoot }}
                    onClick={() => updateProcessor('rave')}
                  >
                    <Box component='span' marginRight='4px'>
                      <Box
                        alt='...'
                        component='img'
                        width='40px'
                        className={classes.buttonImg}
                        src='https://cdn.filestackcontent.com/OITnhSPCSzOuiVvwnH7r'
                      ></Box>
                    </Box>
                    <Box component='span' marginLeft='.75rem'>
                      RAVE
                    </Box>
                  </Box>
                </Box>
                <Box textAlign='left' maxWidth='50%'>
                  <Box
                    component={Button}
                    variant='contained'
                    marginRight='.5rem!important'
                    classes={{ root: classes.buttonRoot }}
                  >
                    <Box component='span' marginRight='4px'>
                      <Box
                        alt='...'
                        component='img'
                        width='40px'
                        className={classes.buttonImg}
                        src='https://website-v3-assets.s3.amazonaws.com/assets/img/hero/Paystack-mark-white-twitter.png'
                      ></Box>
                    </Box>
                    <Box component='span' marginLeft='.75rem'>
                      Paystack
                    </Box>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          ) : page === 2 ? (
            <CardContent>
              <FormControl
                variant='filled'
                component={Box}
                width='100%'
                marginBottom='1rem!important'
              >
                Your Full Name
                <FilledInput
                  autoComplete='off'
                  type='text'
                  placeholder='Full name'
                  onChange={(e) => setFullName(e.target.value)}
                />
              </FormControl>
              <FormControl
                variant='filled'
                component={Box}
                width='100%'
                marginBottom='1rem!important'
              >
                Your Email
                <FilledInput
                  autoComplete='off'
                  type='email'
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl
                variant='filled'
                component={Box}
                width='100%'
                marginBottom='1rem!important'
              >
                Name on Card
                <FilledInput
                  autoComplete='off'
                  type='text'
                  placeholder='Name on Card'
                  onChange={(e) => setCardName(e.target.value)}
                />
              </FormControl>
              <FormControl
                variant='filled'
                component={Box}
                width='100%'
                marginBottom='1rem!important'
              >
                Card Number
                <FilledInput
                  autoComplete='off'
                  type='number'
                  placeholder='Card Number'
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </FormControl>
              <Grid style={{ display: 'flex' }}>
                <Grid item xs={6} lg={6} md={6}>
                  <FormControl
                    variant='filled'
                    component={Box}
                    width='100%'
                    marginBottom='1rem!important'
                  >
                    Expiry Date
                    <FilledInput
                      autoComplete='off'
                      type='month'
                      placeholder='Expiry Date'
                      onChange={(e) => setExpiryDate(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6} lg={6} md={6}>
                  <FormControl
                    variant='filled'
                    component={Box}
                    width='100%'
                    marginBottom='1rem!important'
                  >
                    CVV
                    <FilledInput
                      autoComplete='off'
                      type='number'
                      placeholder='CVV'
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <FormControl
                variant='filled'
                component={Box}
                width='100%'
                marginBottom='1rem!important'
              >
                Amount
                <FilledInput
                  autoComplete='off'
                  type='number'
                  placeholder='Amount'
                  onChange={(e) => setAmount(e.target.value)}
                />
              </FormControl>
            </CardContent>
          ) : page === 3 ? (
            <CardContent>
              <Box fontSize='100%' fontWeight='400' size='medium'>
                Enter Card Pin:
              </Box>

              <PintInput
                pinDigits={cardPin}
                name='card_pin'
                onChange={handlePinChange}
              />
            </CardContent>
          ) : page === 4 ? (
            <CardContent>
              <Box fontSize='100%' fontWeight='400' size='medium'>
                Enter OTP:
              </Box>
              {
                /* <form
                noValidate
                autoComplete="off"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "1rem",
                }}
              >
                <input
                  id="filled-basic"
                  label="*"
                  variant="filled"
                  type="number"
                  max="1"
                  style={{ width: "20%" }}
                  onChange={(e) => {
                    setOTP(e.target.value);
                  }}
                />
              </form> */
                <FormControl
                  variant='filled'
                  component={Box}
                  width='100%'
                  marginBottom='1rem!important'
                >
                  OTP{' '}
                  <FilledInput
                    autoComplete='off'
                    type='number'
                    placeholder='Enter OTP'
                    onChange={(e) => {
                      setOTP(e.target.value);
                    }}
                  />
                </FormControl>
              }
            </CardContent>
          ) : page === 5 ? (
            <CardContent>Payment Successful</CardContent>
          ) : null}
          <CardActions>
            {page === 1 ? null : page === 2 ? (
              <Box display='flex' justifyContent='space-between' width='100%'>
                <Button variant='contained' onClick={() => setPage(page - 1)}>
                  Back
                </Button>
                <Button variant='contained' onClick={() => setPage(page + 1)}>
                  Continue
                </Button>
              </Box>
            ) : page === 3 ? (
              <Button variant='contained' onClick={handleSubmit}>
                Submit
              </Button>
            ) : page === 4 ? (
              <Button variant='contained' onClick={submitOTP}>
                Submit
              </Button>
            ) : page === 5 ? (
              <Box display='flex' justifyContent='space-between' width='100%'>
                <Button variant='contained' onClick={() => setPage(1)}>
                  Make Another Payment
                </Button>
                <Button
                  variant='contained'
                  onClick={() =>
                    window.open('https://junctionapi.com', '_blank')
                  }
                >
                  Visit JunctionAPI
                </Button>
              </Box>
            ) : null}
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    payment_merchant: state?.paymentReducers?.payment_merchant,
  };
};
export default connect(mapStateToProps, {
  getMerchantByDomainName,
  initiatePayment,
  authorizePayment,
})(SinglePage);
