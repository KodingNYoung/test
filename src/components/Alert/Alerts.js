import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: '20px',
    right: '10px',
    width: 'fit-content',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 2000,
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export function ErrorAlert(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity='error'>
        <AlertTitle>Error</AlertTitle>
        <strong>{props.message}</strong>
      </Alert>
    </div>
  );
}

export function SuccessAlert(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity='success'>
        <AlertTitle>Success</AlertTitle>
        <strong>{props.message}</strong>
      </Alert>
    </div>
  );
}
