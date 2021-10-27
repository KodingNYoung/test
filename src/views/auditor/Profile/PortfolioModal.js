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

const PortfolioModal = ({
  open,
  closeModal,
  handlePortfolioSubmit,
  portfolioUpdating,
  handlePortfolioUpdate,
  mode,
  editData,
}) => {
  // styles
  const classes = useStyles();

  // states
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  // functions
  useEffect(() => {
    setTitle(editData?.title);
  }, [editData]);
  const handleClose = () => {
    setFile(null);
    closeModal(mode === 'Edit' ? 'edit' : 'portfolio');
  };
  const handleTextChange = (e) => {
    setTitle(e.target.value);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', title);
    if ((mode = 'Edit')) {
      if (file) {
        form.append('file', file);
      }
      await handlePortfolioUpdate(form, editData.id);
    } else {
      form.append('file', file);
      await handlePortfolioSubmit(form);
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
          <Typography variant='h3'>{mode} Portfolio Project</Typography>
          <IconButton onClick={handleClose}>
            <Clear />
          </IconButton>
        </header>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.inputArea}>
            <TextField
              type='file'
              label='Image'
              name='file'
              variant='outlined'
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleFileChange}
              reuired={mode === 'Edit' ? false : true}
            />
            <TextField
              type='text'
              label='Title'
              name='title'
              variant='outlined'
              className={classes.textField}
              onChange={handleTextChange}
              value={title}
              required
            />
          </div>
          <footer className={classes.footer}>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              disabled={portfolioUpdating}
              style={{ border: 0 }}
            >
              {portfolioUpdating ? 'Submitting..' : 'Submit'}
            </Button>
          </footer>
        </form>
      </div>
    </Modal>
  );
};

export default PortfolioModal;
