import React, { useState } from 'react';
import { ErrorAlert, SuccessAlert } from 'components/Alert/Alerts';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
// @material-ui/icons components
import Email from '@material-ui/icons/Email';
import Lock from '@material-ui/icons/Lock';
import Skeleton from '@material-ui/lab/Skeleton';
// core components
import componentStyles from 'assets/theme/views/auth/login.js';

// redux
import { LoginUser } from 'store/actions/authActions';
import { connect } from 'react-redux';

const useStyles = makeStyles(componentStyles, {
  root: {
    width: 300,
  },
});

function Login(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [displayAlert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { LoginUser } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = await LoginUser({
      email: username,
      password,
    });
    if (token.status === 'success') {
      setAlert(true);
      setMessage(token.message);
      setLoading(false);
      setTimeout(() => {
        setAlert(false);
        props.history.push(
          token.user_type === 'merchant' ? '/admin/dashboard' : '/auditor'
        );
      }, 1500);
    }
    if (token.status === 'failed') {
      setAlert(true);
      setError(true);
      setMessage(token.message);
      setTimeout(() => {
        setAlert(false);
        setError(false);
      }, 2000);
    }
    setLoading(false);
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
              <Typography variant='h1'>Sign In</Typography>
              <Box fontSize='80%' fontWeight='400' component='small'>
                sign in with credentials
              </Box>
            </Box>
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
            <FormControlLabel
              value='end'
              control={<Checkbox color='primary' />}
              label='Remember me'
              labelPlacement='end'
              classes={{
                root: classes.formControlLabelRoot,
                label: classes.formControlLabelLabel,
              }}
            />
            <Box textAlign='center' marginTop='1.5rem' marginBottom='1.5rem'>
              {loading ? (
                <div className={classes.root}>
                  <Skeleton />
                  <Skeleton animation={false} />
                  <Skeleton animation='wave' />
                </div>
              ) : (
                <Button variant='contained' onClick={handleSubmit}>
                  Sign in
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
        <Grid container component={Box} marginTop='1rem'>
          <Grid item xs={6} component={Box} textAlign='left'>
            <a
              href='/auth/reset_password'
              // onClick={(e) => e.preventDefault()}
              className={classes.footerLinks}
            >
              Forgot password
            </a>
          </Grid>
          <Grid item xs={6} component={Box} textAlign='right'>
            <a
              href='/auth/register'
              // onClick={(e) => e.preventDefault()}
              className={classes.footerLinks}
            >
              Create new account
            </a>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { LoginUser })(Login);
