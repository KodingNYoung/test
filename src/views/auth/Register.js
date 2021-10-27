import React, { useState } from 'react';
import { ErrorAlert, SuccessAlert } from 'components/Alert/Alerts';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
// @material-ui/icons components
import Email from '@material-ui/icons/Email';
import Lock from '@material-ui/icons/Lock';
import School from '@material-ui/icons/School';

// core components
import componentStyles from 'assets/theme/views/auth/register.js';
import { Business, Phone, Visibility } from '@material-ui/icons';

// redux
import { RegisterMerchant } from 'store/actions/authActions';
import { connect } from 'react-redux';

const useStyles = makeStyles(componentStyles);

function Register(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [business_name, setBusinessName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [fullname, setFullName] = useState();
  const [phone_number, setPhoneNumber] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [displayAlert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const { RegisterMerchant } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await RegisterMerchant({
      business_name,
      password,
      email,
      fullname,
      phone_number,
    });
    if (token.status === 'success') {
      setAlert(true);
      setMessage(token.message);
      setTimeout(() => {
        setAlert(false);
        setError(false);
        props.history.push('/auth/login');
      }, 3000);
    } else {
      setAlert(true);
      setError(true);
      setMessage(token.message);
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
      <Grid item xs={12} lg={6} md={8}>
        <Card classes={{ root: classes.cardRoot }}>
          <CardContent classes={{ root: classes.cardContent }}>
            <Box
              color={theme.palette.gray[600]}
              textAlign='center'
              marginBottom='1.5rem'
              marginTop='.5rem'
              fontSize='1rem'
            >
              <Typography variant='h1'>Sign Up</Typography>
              <Box fontSize='80%' fontWeight='400' component='small'>
                Sign in as an ADMIN
              </Box>
            </Box>
            <FormControl
              variant='filled'
              component={Box}
              width='100%'
              marginBottom='1.5rem!important'
            >
              <FilledInput
                autoComplete='off'
                type='text'
                placeholder='Full Name'
                startAdornment={
                  <InputAdornment position='start'>
                    <School />
                  </InputAdornment>
                }
                onChange={(e) => setFullName(e.target.value)}
              />
            </FormControl>
            <FormControl
              variant='filled'
              component={Box}
              width='100%'
              marginBottom='1.5rem!important'
            >
              <FilledInput
                autoComplete='off'
                type='email'
                placeholder='Email'
                startAdornment={
                  <InputAdornment position='start'>
                    <Email />
                  </InputAdornment>
                }
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl
              variant='filled'
              component={Box}
              width='100%'
              marginBottom='1.5rem!important'
            >
              <FilledInput
                autoComplete='off'
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                startAdornment={
                  <InputAdornment position='start'>
                    <Lock />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position='end'>
                    <Visibility
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: 'pointer' }}
                    />
                  </InputAdornment>
                }
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl
              variant='filled'
              component={Box}
              width='100%'
              marginBottom='1.5rem!important'
            >
              <FilledInput
                autoComplete='off'
                type='text'
                placeholder='Company Name'
                startAdornment={
                  <InputAdornment position='start'>
                    <Business />
                  </InputAdornment>
                }
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </FormControl>
            <FormControl
              variant='filled'
              component={Box}
              width='100%'
              marginBottom='1.5rem!important'
            >
              <FilledInput
                autoComplete='off'
                type='text'
                placeholder='Phone Number'
                startAdornment={
                  <InputAdornment position='start'>
                    <Phone />
                  </InputAdornment>
                }
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </FormControl>
            <Box
              fontStyle='italic'
              fontSize='1rem'
              color={theme.palette.gray[600]}
              marginBottom='.5rem'
            >
              <Box component='small' fontSize='80%'>
                Already have an account:{' '}
                <Box
                  component='span'
                  fontWeight='700'
                  color={theme.palette.success.main}
                >
                  <a
                    href='/auth/login'
                    style={{ textDecoration: 'none', color: '#1790cf' }}
                  >
                    Login
                  </a>
                </Box>
              </Box>
            </Box>
            <FormControlLabel
              value='end'
              control={<Checkbox color='primary' />}
              label={
                <>
                  I agree with the{' '}
                  <Box
                    color={theme.palette.primary.main}
                    component='a'
                    textDecoration='none'
                  >
                    Privacy Policy
                  </Box>
                </>
              }
              labelPlacement='end'
              classes={{
                root: classes.formControlLabelRoot,
                label: classes.formControlLabelLabel,
              }}
            />
            <Box textAlign='center' marginTop='1.5rem' marginBottom='1.5rem'>
              <Button
                className='primary_button'
                variant='contained'
                onClick={handleSubmit}
              >
                Create account
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { RegisterMerchant })(Register);
