import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from 'assets/theme/theme.js';

import 'assets/plugins/nucleo/css/nucleo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'assets/scss/argon-dashboard-react.scss';

// route components
import AuthLayout from './views/auth/Auth';
import Marketplace from './views/marketplace/index';
import PublicLayout from './views/auditor/Public';

import AdminLayout from 'layouts/Admin.js';
import { AdminRoute, AuditorRoute } from 'PrivateRoute';
import PaymentLayout from 'layouts/Payment';

// redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store';

const configuredStore = configureStore();

ReactDOM.render(
  <Provider store={configuredStore.store}>
    <PersistGate loading={null} persistor={configuredStore.persistor}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <BrowserRouter>
          <Switch>
            {/* auth pages */}
            <Route path='/auth' render={(props) => <AuthLayout {...props} />} />
            <Route
              path='/marketplace'
              render={(props) => <Marketplace {...props} />}
            />
            <AuditorRoute
              path='/auditor'
              render={(props) => <PublicLayout {...props} />}
            />

            <AdminRoute
              path='/admin'
              render={(props) => <AdminLayout {...props} />}
            />
            <Route
              path='/merchant'
              render={(props) => <PaymentLayout {...props} />}
            />

            <Redirect from='/' to='/auth/login' />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
  document.querySelector('#root')
);
