import React, { useEffect, useRef } from 'react';
import { useLocation, Route, Switch, Redirect } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// views
import Login from './Login';
import Register from './Register';
import AuditorRegister from './AuditorRegister.js';
import ResetPassword from './resetPassword';

// core components
// import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthHeader from 'components/Headers/AuthHeader.js';
import AuthFooter from 'components/Footers/AuthFooter.js';

import componentStyles from 'assets/theme/layouts/auth.js';

const useStyles = makeStyles(componentStyles);

const Auth = () => {
  const classes = useStyles();
  const mainContent = useRef(null);
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add(classes.bgDefault);
    return () => {
      document.body.classList.remove(classes.bgDefault);
    };
  });
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  return (
    <>
      <div className='main-content' ref={mainContent}>
        {/* <AuthNavbar /> */}
        <AuthHeader />
        {/* Page content */}
        <Container
          component={Box}
          maxWidth='xl'
          marginTop='-8rem'
          paddingBottom='3rem'
          position='relative'
          zIndex='101'
        >
          <Box component={Grid} container justifyContent='center'>
            <Switch>
              <Route
                path='/auth/auditor/register'
                render={(props) => <AuditorRegister {...props} />}
              />
              <Route
                path='/auth/login'
                render={(props) => <Login {...props} />}
              />
              <Route
                path='/auth/register'
                render={(props) => <Register {...props} />}
              />
              <Route
                path='/auth/reset_password'
                render={(props) => <ResetPassword {...props} />}
              />
              <Redirect from='*' to='/auth/login' />
            </Switch>
          </Box>
        </Container>
      </div>
      <AuthFooter />
    </>
  );
};

export default Auth;
