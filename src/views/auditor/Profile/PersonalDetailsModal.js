import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Modal,
  Typography,
  TextField,
  Avatar,
  Button,
  IconButton,
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
// image
import avatarImg from 'assets/img/brand/avatar.jpg';

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

const PersonalDetailsModal = ({
  open,
  closeModal,
  auditor,
  avatarRef,
  handleAvatarUpload,
  DPUploading,
  handleResumeUpload,
  resumeUploading,
  updateProfile,
  profileUpdating,
}) => {
  // styles
  const classes = useStyles();

  // states
  const [details, setDetails] = useState({
    fullname: '',
    company: '',
    about: '',
  });
  const [imgUrl, setImgUrl] = useState(null);
  const [formTouched, setFormTouched] = useState(false);

  // functions
  useEffect(() => {
    const { profile_photo_url, fullname, company, about } = auditor;
    setImgUrl(profile_photo_url);
    setDetails({ fullname, company, about });
  }, [auditor]);
  const handleClose = () => {
    closeModal('personal');
  };
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
    setFormTouched(true);
  };
  const handleSubmit = async () => {
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
          <Typography variant='h3'>Edit Personal Details</Typography>
          <IconButton onClick={handleClose}>
            <Clear />
          </IconButton>
        </header>
        <form className={classes.form}>
          <div className={classes.inputArea}>
            <div className={classes.avatarContainer}>
              <Avatar
                src={imgUrl || avatarImg}
                alt=''
                className={classes.avatar}
              />
              <Button
                className={classes.inputAvatarButton}
                variant='outlined'
                color='primary'
                disableElevation
                disabled={DPUploading}
              >
                <Typography variant='button'>
                  {DPUploading ? 'Uploading' : 'Upload Avatar'}
                </Typography>
                <input
                  type='file'
                  name='avatar'
                  accept='image/png, image/gif, image/jpeg'
                  onInput={handleAvatarUpload}
                  className={classes.avatarInput}
                  ref={avatarRef}
                />
              </Button>
            </div>
            <TextField
              label='Name'
              name='fullname'
              variant='outlined'
              className={classes.textField}
              onChange={handleTextChange}
              value={details.fullname || ''}
            />
            <TextField
              label='Company'
              name='company'
              variant='outlined'
              className={classes.textField}
              onChange={handleTextChange}
              value={details.company || ''}
            />
            <TextField
              label='About'
              name='about'
              variant='outlined'
              multiline
              rows={4}
              className={classes.textField}
              onChange={handleTextChange}
              value={details.about || ''}
            />
            <Button
              className={classes.inputAvatarButton}
              variant='outlined'
              color='primary'
              style={{ width: '100%', maxWidth: '500px' }}
              disabled={resumeUploading}
            >
              <Typography variant='button'>
                {resumeUploading ? 'Uploading' : 'Upload Resume'}
              </Typography>
              <input
                type='file'
                name='resume'
                onChange={handleResumeUpload}
                className={classes.avatarInput}
                accept='application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
              />
            </Button>
          </div>
          <footer className={classes.footer}>
            <Button
              disabled={profileUpdating || !formTouched}
              variant='contained'
              color='primary'
              onClick={handleSubmit}
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

export default PersonalDetailsModal;
