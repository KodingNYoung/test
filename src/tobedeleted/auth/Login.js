import React, { useState } from 'react';
import { loginAuditor } from 'server/AuditorServer/AuditorServer';
import { ErrorAlert, SuccessAlert } from 'components/Alert/Alerts';
import { setToken } from 'utils';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Checkbox from '@material-ui/core/Checkbox';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
// @material-ui/icons components
import Email from '@material-ui/icons/Email';
import Lock from '@material-ui/icons/Lock';

// core components
import componentStyles from 'assets/theme/views/auth/login.js';

const useStyles = makeStyles(componentStyles);

function Login(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [displayAlert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginAuditor({
      email: username,
      password,
    });
    if (token.status === 'success') {
      setAlert(true);
      setMessage(token.message);
      setToken(token.token);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      props.history.push('/home');
    }
    if (token.status === 'failed') {
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
                Sign in with
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
                      src={
                        require('assets/img/icons/common/github.svg').default
                      }
                    ></Box>
                  </Box>
                  <Box component='span' marginLeft='.75rem'>
                    Github
                  </Box>
                </Box>
                <Button
                  variant='contained'
                  classes={{ root: classes.buttonRoot }}
                >
                  <Box component='span' marginRight='4px'>
                    <Box
                      alt='...'
                      component='img'
                      width='20px'
                      className={classes.buttonImg}
                      src={
                        require('assets/img/icons/common/google.svg').default
                      }
                    ></Box>
                  </Box>
                  <Box component='span' marginLeft='.75rem'>
                    Google
                  </Box>
                </Button>
              </Box>
            }
          ></CardHeader>
          <CardContent classes={{ root: classes.cardContent }}>
            <Box
              color={theme.palette.gray[600]}
              textAlign='center'
              marginBottom='1rem'
              marginTop='.5rem'
              fontSize='1rem'
            >
              <Box fontSize='80%' fontWeight='400' component='small'>
                Or sign in with credentials
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
              <Button variant='contained' onClick={handleSubmit}>
                Sign in
              </Button>
            </Box>
          </CardContent>
        </Card>
        <Grid container component={Box} marginTop='1rem'>
          <Grid item xs={6} component={Box} textAlign='left'>
            <a
              href='#admui'
              onClick={(e) => e.preventDefault()}
              className={classes.footerLinks}
            >
              Forgot password
            </a>
          </Grid>
          <Grid item xs={6} component={Box} textAlign='right'>
            <a
              href='/auth/login'
              // onClick={(e) => e.preventDefault()}
              className={classes.footerLinks}
            >
              Login as Merchant
            </a>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
