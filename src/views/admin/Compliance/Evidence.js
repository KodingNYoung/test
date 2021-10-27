import React, { useState, useEffect, useRef } from 'react';
import { ErrorAlert, SuccessAlert } from 'components/Alert/Alerts';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
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
// @material-ui/lab components
import Pagination from '@material-ui/lab/Pagination';
import Skeleton from '@material-ui/lab/Skeleton';
// @material-ui/icons components
import MoreVert from '@material-ui/icons/MoreVert';
import Modal from '@material-ui/core/Modal';
import Review from 'components/Modal/Review';
// core components
import componentStyles from 'assets/theme/views/admin/tables.js';

// redux
import { connect } from 'react-redux';
import {
  getDefaultEvidences,
  createEvidence,
  getEvidences,
} from 'store/actions/merchantActions';

const useStyles = makeStyles(componentStyles);

const Evidence = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [viewEvidence, setView] = React.useState(false);
  const [file, setFile] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [evidence, setEvidence] = useState([]);
  const [loading, setLoading] = useState({
    content: false,
    create: false,
  });
  const [alert, setAlert] = useState(null);

  // redux props
  const { createEvidence, getEvidences, all_evidences } = props;

  useEffect(() => {
    getMerchantEvidence();
  }, []);
  const getMerchantEvidence = async () => {
    setLoading({ ...loading, content: true });
    await getEvidences();
    setLoading({ ...loading, content: false });
  };
  const handleClick = (event) => {
    setAnchorEl1(event.currentTarget);
    const evidence = all_evidences.filter(
      (item) => item.id === parseInt(event.currentTarget.id)
    );
    setEvidence(evidence);
  };
  const handleClose = () => {
    setAnchorEl1(null);
  };
  const handleModalClose = () => {
    setOpen(false);
    setView(false);
  };

  const handleViewEvidence = () => {
    setView(!viewEvidence);
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
    formData.append('evidenceTitle', title);
    formData.append('evidenceDescription', description);
    const token = await createEvidence(formData);
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
  const evidenceData = (
    <div className='bg-modal-container'>
      <Review
        id={evidence.length !== 0 ? evidence[0].id : null}
        title={evidence.length !== 0 ? evidence[0].evidenceTitle : null}
        type='Evidence'
        btnurl={evidence.length !== 0 ? evidence[0].evidenceFileUrl : ''}
        description={
          evidence.length !== 0 ? evidence[0].evidenceDescription : null
        }
      />
    </div>
  );
  const body = (
    <div className='sm-modal-container'>
      <h2 id='simple-modal-title'>Create Evidence</h2>

      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
        style={{ margin: 8 }}
      >
        <TextField
          id='outlined-full-width'
          label='Evidence Title'
          helperText='Title of the evidence'
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setTitle(e.target.value)}
          variant='outlined'
        />
        <TextField
          id='outlined-full-width'
          label='Evidence Description'
          helperText='Description of the evidence'
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setDescription(e.target.value)}
          variant='outlined'
        />
        <input
          ref={fileInput}
          onChange={handleFileUpload}
          type='file'
          style={{ display: 'none' }}
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
          <div>
            <Button variant='contained' type='submit' style={{ margin: 8 }}>
              Create
            </Button>
            <Button
              variant='contained'
              type='button'
              className={classes.bgError}
              style={{ margin: 8, float: 'right', border: 'none' }}
              // onClick={() => setSelect(null)}
            >
              Back
            </Button>
          </div>
        )}
      </form>
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
              title='Your Evidences'
              titleTypographyProps={{
                component: Box,
                marginBottom: '0!important',
                variant: 'h3',
              }}
            ></CardHeader>
            <div style={{ padding: '2%' }}>
              <Button variant='contained' type='button' onClick={handleOpen}>
                Create Evidence
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
                open={viewEvidence}
                onClose={handleModalClose}
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
              >
                {evidenceData}
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
                    Evidence
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
                  all_evidences ? (
                    all_evidences.map((evidence) => (
                      <TableRow key={evidence.id}>
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
                                {evidence.evidenceTitle}
                              </Box>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {!evidence.approvedBy ||
                          evidence.approvedBy === '386 Konsult'
                            ? 'Not Approved'
                            : evidence.approvedBy}
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
                                evidence.status === 'pending'
                                  ? classes.bgWarning
                                  : classes.bgSuccess +
                                    ' ' +
                                    classes.verticalAlignMiddle
                              }
                            ></Box>
                            {evidence.status}
                          </Box>
                        </TableCell>
                        <TableCell
                          classes={{ root: classes.tableCellRoot }}
                          align='right'
                        >
                          <Box
                            aria-controls={evidence.id}
                            id={evidence.id}
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
                            id={evidence.id}
                            anchorEl={anchorEl1}
                            keepMounted
                            open={Boolean(anchorEl1)}
                            onClose={handleClose}
                          >
                            <MenuItem onClick={handleViewEvidence}>
                              View Evidence
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
    all_evidences: state?.merchantReducers?.all_evidences,
    default_evidences: state?.merchantReducers?.default_evidences,
  };
};

export default connect(mapStateToProps, {
  getDefaultEvidences,
  createEvidence,
  getEvidences,
})(Evidence);
