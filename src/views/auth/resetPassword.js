import React, { useState } from 'react';
import { ErrorAlert, SuccessAlert } from 'components/Alert/Alerts';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
// @material-ui/icons components
import Email from '@material-ui/icons/Email';
import Lock from '@material-ui/icons/Lock';
import Skeleton from '@material-ui/lab/Skeleton';
// core components
import componentStyles from 'assets/theme/views/auth/login.js';

// redux
import { connect } from 'react-redux';
import {
  resetPassword,
  verifyPasswordToken,
  getPasswordToken,
} from 'store/actions/authActions';

const useStyles = makeStyles(componentStyles, {
  root: {
    width: 300,
  },
});

function ResetPassword(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [username, setUserName] = useState('');
  const [new_token, setToken] = useState('');
  const [password, setPassword] = useState();
  const [displayAlert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('get_token');

  const { resetPassword, verifyPasswordToken, getPasswordToken } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (page === 1) {
      const token = await getPasswordToken({
        email: username,
      });
      console.log(token);
      if (token.status === 'success') {
        setMessage(token.message);
        setStatus('enter_token');
      }
      setLoading(false);
    }
    if (page === 2) {
      const verifyToken = await verifyPasswordToken({
        email: username,
        token: new_token,
      });
      if (verifyToken.status === 'failed') {
        setMessage('Token is not correct');
        setAlert(true);
        setError(true);
        setLoading(false);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      } else {
        const reset = await resetPassword({
          password,
          token: new_token,
        });
        setLoading(false);
        console.log(reset);
        if (reset.status === 'success') {
          setLoading(false);
          setMessage(reset.message);
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
            props.history.push('/auth/login');
          }, 3000);
        } else {
          setLoading(false);
          setMessage(reset.message);
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
          }, 3000);
        }
      }
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
          <CardContent classes={{ root: classes.cardContent }}>
            <Box
              color={theme.palette.gray[600]}
              textAlign='center'
              marginBottom='1rem'
              marginTop='.5rem'
              fontSize='1rem'
            >
              <Box fontSize='80%' fontWeight='400' component='small'>
                Reset Password
              </Box>
            </Box>
            {page === 1 ? (
              status === 'get_token' ? (
                <FormControl
                  variant='filled'
                  component={Box}
                  width='100%'
                  marginBottom='1rem!important'
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
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </FormControl>
              ) : (
                message
              )
            ) : page === 2 ? (
              <div>
                <FormControl
                  variant='filled'
                  component={Box}
                  width='100%'
                  marginBottom='1rem!important'
                >
                  <FilledInput
                    autoComplete='off'
                    type='number'
                    placeholder='Token'
                    startAdornment={
                      <InputAdornment position='start'>
                        <Lock />
                      </InputAdornment>
                    }
                    onChange={(e) => setToken(e.target.value)}
                  />
                </FormControl>
                <FormControl
                  variant='filled'
                  component={Box}
                  width='100%'
                  marginBottom='1rem!important'
                >
                  <FilledInput
                    autoComplete='off'
                    type='password'
                    placeholder='Password'
                    startAdornment={
                      <InputAdornment position='start'>
                        <Lock />
                      </InputAdornment>
                    }
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
              </div>
            ) : null}
            <Box textAlign='center' marginTop='1.5rem' marginBottom='1.5rem'>
              {loading ? (
                <div className={classes.root}>
                  <Skeleton />
                  <Skeleton animation={false} />
                  <Skeleton animation='wave' />
                </div>
              ) : status === 'get_token' || ('enter_token' && page === 2) ? (
                <Button variant='contained' onClick={handleSubmit}>
                  Submit
                </Button>
              ) : (
                <Button variant='contained' onClick={() => setPage(2)}>
                  Continue
                </Button>
              )}
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

export default connect(mapStateToProps, {
  resetPassword,
  verifyPasswordToken,
  getPasswordToken,
})(ResetPassword);
