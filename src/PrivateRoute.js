import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from 'utils';
import PublicLayout from './views/auditor/Public';
import AdminLayout from 'layouts/Admin.js';

export function AdminRoute({ children, ...rest }) {
  let auth = getToken();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          <AdminLayout {...children} />
        ) : (
          <Redirect
            to={{
              pathname: '/auth/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export function AuditorRoute({ children, ...rest }) {
  let auth = getToken();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          <PublicLayout {...rest} {...children} />
        ) : (
          <Redirect
            to={{
              pathname: '/auth/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
