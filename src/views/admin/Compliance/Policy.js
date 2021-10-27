import React, { useState, useEffect, useRef } from 'react';
import { ErrorAlert, SuccessAlert } from 'components/Alert/Alerts';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
// @material-ui/lab components
import Pagination from '@material-ui/lab/Pagination';
import Skeleton from '@material-ui/lab/Skeleton';
// @material-ui/icons components
import MoreVert from '@material-ui/icons/MoreVert';
import Modal from '@material-ui/core/Modal';
// core components
// import Header from "components/Headers/Header.js";

import componentStyles from 'assets/theme/views/admin/tables.js';
import Review from 'components/Modal/Review';

// redux
import { connect } from 'react-redux';
import {
  getPolicies,
  getDefaultPolicies,
  createPolicy,
} from 'store/actions/merchantActions';

const useStyles = makeStyles(componentStyles);

const Policy = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [viewPolicy, setView] = React.useState(false);
  const [file, setFile] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [policy, setPolicy] = useState([]);
  const [loading, setLoading] = useState({
    content: false,
    defaultPolicies: false,
    create: false,
  });
  const [select, setSelect] = useState(null);
  const [alert, setAlert] = useState();

  // redux props
  const {
    getPolicies,
    all_policies,
    getDefaultPolicies,
    default_policies,
    createPolicy,
  } = props;

  useEffect(() => {
    getMerchantPolicy();
  }, []);
  const getMerchantPolicy = async () => {
    setLoading({ ...loading, content: true });
    await getPolicies();
    setLoading({ ...loading, content: false });
  };
  const handleClick = (event) => {
    setAnchorEl1(event.currentTarget);
    const policy = all_policies.filter(
      (item) => item.id === parseInt(event.currentTarget.id)
    );
    setPolicy(policy);
  };
  const handleClose = () => {
    setAnchorEl1(null);
  };

  const downloadPolicy = async () => {
    setSelect('download');
    setLoading({ ...loading, defaultPolicies: true });
    await getDefaultPolicies();
    setLoading({ ...loading, defaultPolicies: false });
  };

  const handleModalClose = () => {
    setOpen(false);
    setView(false);
  };
  const handleViewPolicy = () => {
    setView(!viewPolicy);
    handleClose();
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const fileInput = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, create: true });
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('policyTitle', title);
    formData.append('policyDescription', description);
    const token = await createPolicy(formData);
    if (token.status === 'success') {
      setAlert(<SuccessAlert message={token.message} />);
    } else {
      setAlert(<ErrorAlert message={token.message} />);
    }
    setLoading({ ...loading, create: false });
    handleModalClose();

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  const policyData = (
    <div className='bg-modal-container'>
      <Review
        id={policy.length !== 0 ? policy[0].id : ''}
        title={policy.length !== 0 ? policy[0].policyTitle : null}
        type='Policy'
        btnurl={policy.length !== 0 ? policy[0].policyFileUrl : ''}
        description={policy.length !== 0 ? policy[0].policyDescription : null}
        setOpen={setView}
      />
    </div>
  );
  const body = (
    <div className='sm-modal-container'>
      <h2 id='simple-modal-title'>Create Policy</h2>
      {select === null ? (
        <div>
          <Button
            onClick={downloadPolicy}
            type='button'
            style={{ width: '100%', margin: '3% 0' }}
          >
            Download Default Template
          </Button>

          <Button
            onClick={() => setSelect('create')}
            type='button'
            style={{ width: '100%', margin: '3% 0' }}
          >
            Create A Policy Now
          </Button>
        </div>
      ) : select === 'download' ? (
        <div>
          <Button
            onClick={() => window.open(default_policies[0].file_url, '_blank')}
            type='button'
            style={{ width: '100%' }}
            disabled={loading.defaultPolicies}
          >
            {loading.defaultPolicies
              ? 'Getting download link...'
              : 'Download Now'}
          </Button>
          <Button
            variant='contained'
            type='button'
            className={classes.bgError}
            style={{ margin: 8, float: 'right', border: 'none' }}
            onClick={() => setSelect(null)}
          >
            Back
          </Button>
        </div>
      ) : (
        <form
          className={classes.root}
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit}
          style={{ margin: 8 }}
        >
          <TextField
            id='outlined-full-width'
            label='Policy Title'
            helperText='Title of the policy'
            fullWidth
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setTitle(e.target.value)}
            variant='outlined'
            required
          />
          <TextField
            id='outlined-full-width'
            label='Policy Description'
            helperText='Description of Policy'
            fullWidth
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setDescription(e.target.value)}
            variant='outlined'
            required
          />
          <input
            ref={fileInput}
            onChange={handleFileUpload}
            type='file'
            style={{ display: 'none' }}
            required
          />
          <Button
            onClick={() => fileInput.current.click()}
            type='button'
            style={{ width: '100%' }}
          >
            Upload File
          </Button>
          <p>{file ? file.name : null}</p>
          {loading.create ? (
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
          <Button
            variant='contained'
            type='button'
            className={classes.bgError}
            style={{ margin: 8, float: 'right', border: 'none' }}
            onClick={() => setSelect(null)}
          >
            Back
          </Button>
        </form>
      )}
    </div>
  );
  return (
    <>
      {alert && alert}

      {/* <ComplianceHeader /> */}
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        // marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Card classes={{ root: classes.cardRoot }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <CardHeader
              className={classes.cardHeader}
              title='Your Policies'
              titleTypographyProps={{
                component: Box,
                marginBottom: '0!important',
                variant: 'h3',
              }}
            ></CardHeader>
            <div style={{ padding: '2%' }}>
              <Button variant='contained' type='button' onClick={handleOpen}>
                Create Policy
              </Button>
              <Modal
                open={open}
                onClose={handleModalClose}
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
              >
                {body}
              </Modal>
              <Modal
                open={viewPolicy}
                onClose={handleModalClose}
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
              >
                {policyData}
              </Modal>
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
                    Policy
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + ' ' + classes.tableCellRootHead,
                    }}
                  >
                    Approved By
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
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!loading.content ? (
                  all_policies ? (
                    all_policies.map((policy) => (
                      <TableRow key={policy.id}>
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
                          <Box>
                            <Box display='flex' alignItems='flex-start'>
                              <Box fontSize='.875rem' component='span'>
                                {policy.policyTitle}
                              </Box>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {policy.approvedBy === null
                            ? 'Not Approved'
                            : policy.approvedBy}
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
                                policy.status === 'pending'
                                  ? classes.bgWarning
                                  : classes.bgSuccess +
                                    ' ' +
                                    classes.verticalAlignMiddle
                              }
                            ></Box>
                            {policy.status}
                          </Box>
                        </TableCell>
                        <TableCell
                          classes={{ root: classes.tableCellRoot }}
                          align='right'
                        >
                          <Box
                            aria-controls={policy.id}
                            id={policy.id}
                            aria-haspopup='true'
                            onClick={handleClick}
                            size='small'
                            component={Button}
                            width='2rem!important'
                            height='2rem!important'
                            minWidth='2rem!important'
                            minHeight='2rem!important'
                            disableElevation
                          >
                            <Box
                              component={MoreVert}
                              width='1.25rem!important'
                              height='1.25rem!important'
                              position='relative'
                              top='2px'
                              color={theme.palette.gray[500]}
                            />
                          </Box>
                          <Menu
                            id={policy.id}
                            anchorEl={anchorEl1}
                            keepMounted
                            open={Boolean(anchorEl1)}
                            onClose={handleClose}
                          >
                            <MenuItem onClick={handleViewPolicy}>
                              View Policy
                            </MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : null
                ) : (
                  <TableRow>
                    <TableCell>
                      <Typography>loading...</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Box>
          </TableContainer>
          <Box
            classes={{ root: classes.cardActionsRoot }}
            component={CardActions}
            justifyContent='flex-end'
          >
            <Pagination count={3} color='primary' variant='outlined' />
          </Box>
        </Card>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    all_policies: state?.merchantReducers?.all_policies,
    default_policies: state?.merchantReducers?.default_policies,
  };
};

export default connect(mapStateToProps, {
  getPolicies,
  getDefaultPolicies,
  createPolicy,
  // getEvidences,
})(Policy);
