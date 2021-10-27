import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Typography, Button, IconButton, Box } from '@material-ui/core';
import { Clear, Warning } from '@material-ui/icons';
// import { red } from '@mui/material/colors';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    minWidth: '350px',
    width: '60%',
    maxWidth: '600px',
    border: 0,
    outline: 0,
    borderRadius: '4px',
  },

  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '1rem',
  },
  submitBtn: {
    border: 0,
    backgroundColor: 'red',
    '&::disabled': {
      backgroundColor: '#ccc',
    },
  },
}));

const DeleteModal = ({
  open,
  closeModal,
  item,
  handleDeletePortfolio,
  handleDeleteCertification,
  deleting,
}) => {
  // styles
  const classes = useStyles();

  // functions
  const handleClose = () => {
    closeModal('delete');
  };
  const handleDelete = async () => {
    // console.log(item);
    if (item.item.toLowerCase() === 'portfolio') {
      await handleDeletePortfolio(item.id);
    } else {
      await handleDeleteCertification(item.id);
    }
    handleClose();
  };
  return (
    <Modal open={open} onClose={handleClose} className={classes.modal}>
      <div className={classes.container}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant='h3'>
            <Warning tyle={{ color: 'red' }} />
            <span> Delete {item.item}</span>
          </Typography>
          <IconButton onClick={handleClose}>
            <Clear />
          </IconButton>
        </header>
        <Typography style={{ textAlign: 'center' }} variant='body1'>
          <Box>
            Are you sure you want to delete this{' '}
            {item.item.toLowerCase() === 'portfolio'
              ? 'project'
              : item.item.toLowerCase()}
            ?
          </Box>
        </Typography>
        <footer className={classes.footer}>
          <Button
            variant='contained'
            type='submit'
            className={classes.submitBtn}
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </footer>
      </div>
    </Modal>
  );
};

export default DeleteModal;
