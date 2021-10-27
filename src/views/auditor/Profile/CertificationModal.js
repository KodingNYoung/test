import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Modal,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    minWidth: '350px',
    width: '60%',
    maxWidth: '600px',
    border: 0,
    outline: 0,
    borderRadius: '4px',
  },
  form: {
    marginTop: theme.spacing(1),
  },
  inputArea: {
    margin: theme.spacing(1, 0),
    maxHeight: '60vh',
    overflowY: 'scroll',
    overflowX: 'hidden',
    padding: theme.spacing(1),
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    marginBottom: theme.spacing(3),
  },
  avatar: {
    minWidth: theme.spacing(10),
    minHeight: theme.spacing(10),
    maxWidth: theme.spacing(15),
    maxHeight: theme.spacing(15),
    width: '30%',
    height: 'auto',
    margin: theme.spacing(1),
  },
  inputAvatarButton: {
    position: 'relative',
    width: '140px',
    padding: '.3rem',
    fontSize: '.3rem',
    cursor: 'pointer',
    '& input': {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: '0',
      left: '0',
      opacity: '0',
      cursor: 'pointer',
    },
  },
  textField: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
}));

const CertificationModal = ({
  open,
  closeModal,
  handleCertificationSubmit,
  handleCertificationUpdate,
  certUpdating,
  mode,
  editData,
}) => {
  // styles
  const classes = useStyles();

  // states
  const [details, setDetails] = useState({
    name: '',
    organization: '',
    issue_date: '',
    exp_date: '',
    credential_id: '',
    credential_url: '',
  });

  // functions
  useEffect(() => {
    if (mode.toLowerCase() === 'edit') {
      setDetails({
        name: editData?.name,
        organization: editData?.organization,
        issue_date: editData?.issue_date,
        exp_date: editData?.exp_date,
        credential_id: editData?.credential_id,
        credential_url: editData?.credential_url,
      });
    } else {
      setDetails({
        name: '',
        organization: '',
        issue_date: '',
        exp_date: '',
        credential_id: '',
        credential_url: '',
      });
    }
  }, [editData]);
  const handleClose = () => {
    closeModal(mode === 'Edit' ? 'edit' : 'certification');
  };
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === 'Edit') {
      await handleCertificationUpdate(details, editData.id);
    } else {
      await handleCertificationSubmit(details);
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
          <Typography variant='h3'>{mode} License & Certification</Typography>
          <IconButton onClick={handleClose}>
            <Clear />
          </IconButton>
        </header>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.inputArea}>
            <TextField
              type='text'
              label='Certification Name'
              name='name'
              variant='outlined'
              className={classes.textField}
              onChange={handleTextChange}
              value={details.name}
            />
            <TextField
              type='text'
              label='Organization'
              name='organization'
              variant='outlined'
              className={classes.textField}
              onChange={handleTextChange}
              value={details.organization}
            />

            <TextField
              type='date'
              label='Issue Date'
              name='issue_date'
              variant='outlined'
              className={classes.textField}
              onChange={handleTextChange}
              value={details.issue_date}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              type='date'
              label='Expiry Date'
              name='exp_date'
              variant='outlined'
              className={classes.textField}
              onChange={handleTextChange}
              value={details.exp_date}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              type='text'
              label='Credential ID'
              name='credential_id'
              variant='outlined'
              className={classes.textField}
              onChange={handleTextChange}
              value={details.credential_id}
            />
            <TextField
              type='text'
              label='Credential URL'
              name='credential_url'
              variant='outlined'
              className={classes.textField}
              onChange={handleTextChange}
              value={details.credential_url}
            />
          </div>
          <footer className={classes.footer}>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              disabled={certUpdating}
              style={{ border: 0 }}
            >
              {certUpdating ? 'Submitting...' : 'Submit'}
            </Button>
          </footer>
        </form>
      </div>
    </Modal>
  );
};

export default CertificationModal;
