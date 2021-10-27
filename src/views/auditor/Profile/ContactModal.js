import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Modal,
  Typography,
  TextField,
  Button,
  IconButton,
  Tooltip,
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

const ContactModal = ({
  open,
  closeModal,
  auditor,
  updateProfile,
  profileUpdating,
}) => {
  // styles
  const classes = useStyles();

  // states
  const [details, setDetails] = useState({
    email: '',
    phone_number: '',
    address: '',
    location: '',
    country: '',
    facebook: '',
    linkedin: '',
  });
  const [formTouched, setFormTouched] = useState(false);

  // useEffect
  useEffect(() => {
    const {
      email,
      phone_number,
      address,
      location,
      country,
      facebook,
      linkedin,
    } = auditor;
    setDetails({
      ...details,
      email,
      phone_number,
      address,
      location,
      country,
      facebook,
      linkedin,
    });
  }, [auditor]);
  // functions
  const handleClose = () => {
    closeModal('contact');
  };
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
    setFormTouched(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    delete details.email;

    await updateProfile(details);
    handleClose();
    setFormTouched(false);
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
          <Typography variant='h3'>Edit Contacts</Typography>
          <IconButton onClick={handleClose}>
            <Clear />
          </IconButton>
        </header>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.inputArea}>
            <Tooltip title='You cannot edit this field' placement='top-start'>
              <TextField
                type='email'
                label='Email'
                name='email'
                variant='outlined'
                className={classes.textField}
                onChange={handleTextChange}
                value={details.email || ''}
                disabled
                required
              />
            </Tooltip>
            <TextField
              type='text'
              label='Phone'
              name='phone_number'
              variant='outlined'
              className={classes.textField}
              onChange={handleTextChange}
              value={details.phone_number || ''}
              required
            />
            <TextField
              label='Address'
              name='address'
              variant='outlined'
              multiline
              rows={3}
              className={classes.textField}
              onChange={handleTextChange}
              value={details.address || ''}
              required
            />
            <TextField
              type='text'
              label='Location'
              name='location'
              variant='outlined'
              className={classes.textField}
              onChange={handleTextChange}
              value={details.location || ''}
              required
            />
            <TextField
              type='text'
              label='Country'
              name='country'
              variant='outlined'
              className={classes.textField}
              onChange={handleTextChange}
              value={details.country || ''}
              required
            />
            <TextField
              type='url'
              label='Facebook'
              name='facebook'
              variant='outlined'
              className={classes.textField}
              onChange={handleTextChange}
              value={details.facebook || ''}
              required
            />
            <TextField
              type='url'
              label='Linkedin'
              name='linkedin'
              variant='outlined'
              className={classes.textField}
              onChange={handleTextChange}
              value={details.linkedin || ''}
              required
            />
          </div>
          <footer className={classes.footer}>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              disabled={profileUpdating || !formTouched}
              style={{ border: 0 }}
            >
              {profileUpdating ? 'Submitting...' : 'Submit'}
            </Button>
          </footer>
        </form>
      </div>
    </Modal>
  );
};

export default ContactModal;
