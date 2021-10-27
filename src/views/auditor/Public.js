import React, { useEffect, useRef } from 'react';
import { useLocation, Route, Switch, Redirect } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import componentStyles from 'assets/theme/layouts/auth.js';
// core components
// import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthHeader from 'components/Headers/PublicHeader.js';
import AuthFooter from 'components/Footers/AuthFooter.js';
import PublicNavbar from 'components/Navbars/PublicNavbar';

// route components
import Dashboard from './Dashboard';
import Merchant from './Merchant';
import Profile from './Profile/AuditorProfile';

const useStyles = makeStyles(componentStyles);

const Auth = () => {
  return (
    <Switch>
      <Route
        path='/auditor/profile'
        render={(props) => <Profile {...props} />}
      />
      <Route path='/auditor' render={(props) => <Home {...props} />} />
    </Switch>
  );
};

const Home = (props) => {
  const classes = useStyles();
  const mainContent = useRef(null);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  useEffect(() => {
    document.body.classList.add(classes.bgDefault);
    return () => {
      document.body.classList.remove(classes.bgDefault);
    };
  });
  return (
    <>
      <div className='main-content' ref={mainContent}>
        <PublicNavbar {...props} />
        <AuthHeader />
        {/* Page content */}
        <Container
          component={Box}
          maxWidth='lg'
          marginTop='-8rem'
          paddingBottom='3rem'
          position='relative'
          zIndex='101'
        >
          <Box component={Grid} container justifyContent='center'>
            <Switch>
              <Route
                path='/auditor/merchant/:id'
                render={(props) => <Merchant {...props} />}
              />

              <Route
                path='/auditor'
                render={(props) => <Dashboard {...props} />}
              />
              <Redirect from='*' to='/auditor' />
            </Switch>
          </Box>
        </Container>
      </div>
      <AuthFooter />
    </>
  );
};

export default Auth;
