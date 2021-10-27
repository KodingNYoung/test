import React, { useState, useEffect } from 'react';
import { ErrorAlert, SuccessAlert } from 'components/Alert/Alerts';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Modal from '@material-ui/core/Modal';
// import CardActions from "@material-ui/core/CardActions";
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
// @material-ui/lab components
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Skeleton from '@material-ui/lab/Skeleton';
import WarningIcon from '@material-ui/icons/Warning';
// core components
import Header from 'components/Headers/PageHeader.js';

import componentStyles from 'assets/theme/views/admin/tables.js';
import './index.css';

// redux
import { connect } from 'react-redux';
import {
  createUser,
  getUsers,
  deleteUser,
  inviteAuditor,
} from 'store/actions/merchantActions';

const useStyles = makeStyles(componentStyles);

const Users = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [opendelete, setDelete] = React.useState(false);
  const [id, setId] = React.useState(0);
  const [username, setName] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState();
  const [displayAlert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [auditorEmail, setAuditorEmail] = useState('');
  const [auditoropen, setAuditorOpen] = useState(false);

  const { createUser, getUsers, deleteUser, inviteAuditor, merchant_users } =
    props;

  useEffect(() => {
    getMerchantUser();
  }, []);
  const getMerchantUser = async () => {
    await getUsers();
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleAuditorOpen = () => {
    setAuditorOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAuditorOpen(false);
  };

  const handleDelete = (id) => {
    setId(id);
    setDelete(true);
  };

  const handleCloseDelete = () => {
    setDelete(false);
  };

  const addAuditor = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = await inviteAuditor({
      auditor_email: auditorEmail,
    });
    if (token.status === 'success') {
      setAlert(true);
      setMessage(token.message);
      handleClose();
      setLoading(false);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } else {
      setAlert(true);
      setError(true);
      setMessage(token.message);
      setLoading(false);
      handleClose();
      setTimeout(() => {
        setAlert(false);
        setError(false);
      }, 3000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = await createUser({
      email: email,
      fullname: username,
      role,
    });
    if (token.status === 'success') {
      setAlert(true);
      setMessage(token.message);
      handleClose();
      setLoading(false);
      getMerchantUser();
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } else {
      setAlert(true);
      setError(true);
      setMessage(token.message);
      setLoading(false);
      handleClose();
      setTimeout(() => {
        setAlert(false);
        setError(false);
      }, 3000);
    }
  };

  const body = (
    <div className='sm-modal-container'>
      <h2 id='simple-modal-title'>Create User</h2>
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <TextField
          id='outlined-full-width'
          label='Name'
          style={{ margin: 8 }}
          helperText='Full Name of user'
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setName(e.target.value)}
          variant='outlined'
        />
        <TextField
          id='outlined-full-width'
          label='Email'
          style={{ margin: 8 }}
          helperText='Email address'
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setEmail(e.target.value)}
          variant='outlined'
        />
        <TextField
          id='outlined-select-currency'
          select
          style={{ margin: 8 }}
          fullWidth
          label='Role'
          // value={currency}
          // onChange={handleChange}
          helperText='Please select the user role'
          variant='outlined'
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem key='admin' value='admin'>
            Admin
          </MenuItem>
          <MenuItem key='' value='user'>
            User
          </MenuItem>
        </TextField>
        {loading ? (
          <div className={classes.root}>
            <Skeleton />
            <Skeleton animation={false} />
            <Skeleton animation='wave' />
          </div>
        ) : (
          <Button variant='contained' type='submit' style={{ margin: 8 }}>
            Create
          </Button>
        )}
      </form>
    </div>
  );

  const auditor = (
    <div className='sm-modal-container'>
      <h2 id='simple-modal-title'>Invite Auditor</h2>
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={addAuditor}
      >
        <TextField
          id='outlined-full-width'
          label='Email'
          style={{ margin: 8 }}
          helperText='Email address'
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setAuditorEmail(e.target.value)}
          variant='outlined'
        />
        {loading ? (
          <div className={classes.root}>
            <Skeleton />
            <Skeleton animation={false} />
            <Skeleton animation='wave' />
          </div>
        ) : (
          <Button variant='contained' type='submit' style={{ margin: 8 }}>
            Create
          </Button>
        )}
      </form>
    </div>
  );

  const deleteAlert = (
    <div className='sm-modal-container'>
      <div className='alert-content'>
        <WarningIcon
          style={{ fontSize: '20px', width: '15%', height: '15%' }}
        />
        <h3 id='simple-modal-title'>
          Are you sure that you want to delete this user?
        </h3>
        <Button
          variant='contained'
          style={{ background: '#dd3444', border: '#dd3444' }}
          onClick={() => {
            deleteUser(id).then(() => {
              getMerchantUser().then(() => {
                handleCloseDelete();
              });
            });
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {displayAlert && error ? (
        <ErrorAlert message={message} />
      ) : displayAlert && error === false ? (
        <SuccessAlert message={message} />
      ) : null}
      <Header />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop='-6rem'
        classes={{ root: classes.containerRoot }}
      >
        <Card classes={{ root: classes.cardRoot }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <CardHeader
              className={classes.cardHeader}
              title='Your Users'
              titleTypographyProps={{
                component: Box,
                marginBottom: '0!important',
                variant: 'h3',
              }}
            ></CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ padding: '2%' }}>
                <Button
                  variant='contained'
                  type='button'
                  onClick={handleOpen}
                  size='small'
                >
                  Create User
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby='simple-modal-title'
                  aria-describedby='simple-modal-description'
                >
                  {body}
                </Modal>
              </div>
              <div style={{ padding: '2%' }}>
                <Button
                  variant='contained'
                  type='button'
                  onClick={handleAuditorOpen}
                  size='small'
                >
                  Invite Auditor
                </Button>
                <Modal
                  open={auditoropen}
                  onClose={handleClose}
                  aria-labelledby='simple-modal-title'
                  aria-describedby='simple-modal-description'
                >
                  {auditor}
                </Modal>
              </div>
            </div>
          </div>
          <TableContainer>
            <Box
              component={Table}
              alignItems='center'
              marginBottom='0!important'
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + ' ' + classes.tableCellRootHead,
                    }}
                  >
                    Full Name
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + ' ' + classes.tableCellRootHead,
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + ' ' + classes.tableCellRootHead,
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + ' ' + classes.tableCellRootHead,
                    }}
                  >
                    Avatar
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + ' ' + classes.tableCellRootHead,
                    }}
                  >
                    Role
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + ' ' + classes.tableCellRootHead,
                    }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {merchant_users
                  ? merchant_users.map((user) => (
                      <TableRow>
                        <TableCell
                          classes={{
                            root:
                              classes.tableCellRoot +
                              ' ' +
                              classes.tableCellRootBodyHead,
                          }}
                          component='th'
                          variant='head'
                          scope='row'
                        >
                          <Box alignItems='center'>
                            <Box display='flex' alignItems='flex-start'>
                              <Box fontSize='.875rem' component='span'>
                                {user.fullname}
                              </Box>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {user.email}
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          <Box paddingTop='.35rem' paddingBottom='.35rem'>
                            <Box
                              marginRight='10px'
                              component='i'
                              width='.375rem'
                              height='.375rem'
                              borderRadius='50%'
                              display='inline-block'
                              className={
                                user.email_verified !== null
                                  ? classes.verticalAlignMiddle +
                                    ' ' +
                                    classes.bgSuccess
                                  : classes.verticalAlignMiddle +
                                    ' ' +
                                    classes.bgWarning
                              }
                            ></Box>
                            {user.email_verified !== null
                              ? 'Accepted'
                              : 'Pending'}
                          </Box>
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          <AvatarGroup>
                            <Tooltip title='Ryan Tompson' placement='top'>
                              <Avatar
                                classes={{ root: classes.avatarRoot }}
                                alt='...'
                                src={
                                  require('assets/img/theme/team-1-800x800.jpg')
                                    .default
                                }
                              />
                            </Tooltip>
                          </AvatarGroup>
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          <Box display='flex' alignItems='center'>
                            <Box component='span' marginRight='.5rem'>
                              {user.role.toUpperCase()}
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          <Button
                            variant='contained'
                            style={{ background: '#dd3444', border: '#dd3444' }}
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </Button>
                          <Modal
                            open={opendelete}
                            onClose={handleCloseDelete}
                            aria-labelledby='simple-modal-title'
                            aria-describedby='simple-modal-description'
                          >
                            {deleteAlert}
                          </Modal>
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Box>
          </TableContainer>
        </Card>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    merchant_users: state?.merchantReducers?.merchant_users,
  };
};

export default connect(mapStateToProps, {
  createUser,
  getUsers,
  deleteUser,
  inviteAuditor,
})(Users);
