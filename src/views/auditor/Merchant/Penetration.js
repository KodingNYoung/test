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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// @material-ui/lab components
import Pagination from '@material-ui/lab/Pagination';
// @material-ui/icons components
import Modal from '@material-ui/core/Modal';
// core components
import Skeleton from '@material-ui/lab/Skeleton';
import componentStyles from 'assets/theme/views/admin/tables.js';
// import { uploadPentest } from 'server/AuditorServer/AuditorServer';

// redux
import { connect } from 'react-redux';
import { getPentestRequest, uploadPentest } from 'store/actions/auditorActions';

const useStyles = makeStyles(componentStyles);

const Penetration = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);
  const [displayAlert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState();
  const [id, setId] = useState();
  const { merchant_pentests, getPentestRequest, uploadPentest } = props;

  useEffect(() => {
    const getMerchantTests = async () => {
      setLoadingContent(true);
      const res = await getPentestRequest();
      setLoadingContent(false);
      if (res.status === 'success') {
        setMessage(res.message);
      } else {
        setError(true);
        setMessage(res.message);
        setAlert(true);
      }
    };
    getMerchantTests();
  }, []);

  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
  };
  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const fileInput = useRef(null);
  const handleSubmit = async () => {
    // e.preventDefault();
    setLoading(true);
    handleModalClose();
    let formdata = new FormData();
    formdata.append('file', file, file.name);
    const token = await uploadPentest(id, formdata);
    console.log(token);
    if (token.status === 'success') {
      setAlert(true);
      setMessage(token.message);
      setLoading(false);
      let pentest = merchant_pentests.filter((item) => item.id === id);
      pentest['status'] = 'completed';
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } else {
      setAlert(true);
      setError(true);
      setMessage(token.message);
      setLoading(false);
      setTimeout(() => {
        setAlert(false);
        setError(false);
      }, 3000);
    }
  };
  const body = (
    <div className='bg-modal-container'>
      <h2 id='simple-modal-title'>Upload Report</h2>
      <form onSubmit={handleSubmit}>
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
        {loading ? (
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
          </div>
        )}
      </form>
    </div>
  );

  return (
    <>
      {displayAlert && error ? (
        <ErrorAlert message={message} />
      ) : displayAlert && error === false ? (
        <SuccessAlert message={message} />
      ) : null}
      {/* <ComplianceHeader /> */}
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        // marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Card classes={{ root: classes.cardRoot }}>
          {!loadingContent ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <CardHeader
                  className={classes.cardHeader}
                  title='Pentest Requests'
                  titleTypographyProps={{
                    component: Box,
                    marginBottom: '0!important',
                    variant: 'h3',
                  }}
                ></CardHeader>
                <div style={{ padding: '2%' }}>
                  <Modal
                    open={open}
                    onClose={handleModalClose}
                    aria-labelledby='simple-modal-title'
                    aria-describedby='simple-modal-description'
                  >
                    {body}
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
                            classes.tableCellRoot +
                            ' ' +
                            classes.tableCellRootHead,
                        }}
                      >
                        Request Name
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            ' ' +
                            classes.tableCellRootHead,
                        }}
                      >
                        Description
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            ' ' +
                            classes.tableCellRootHead,
                        }}
                      >
                        Server
                      </TableCell>

                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            ' ' +
                            classes.tableCellRootHead,
                        }}
                      >
                        Status
                      </TableCell>

                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            ' ' +
                            classes.tableCellRootHead,
                        }}
                      ></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {merchant_pentests
                      ? merchant_pentests.map((pentest) => (
                          <TableRow key={pentest.id}>
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
                                    {pentest.request_name}
                                  </Box>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell
                              classes={{ root: classes.tableCellRoot }}
                            >
                              {pentest.descriptions}
                            </TableCell>
                            <TableCell
                              classes={{ root: classes.tableCellRoot }}
                            >
                              {pentest.server}
                            </TableCell>
                            <TableCell
                              classes={{ root: classes.tableCellRoot }}
                            >
                              <Box paddingTop='.35rem' paddingBottom='.35rem'>
                                <Box
                                  marginRight='10px'
                                  component='i'
                                  width='.375rem'
                                  height='.375rem'
                                  borderRadius='50%'
                                  display='inline-block'
                                  className={
                                    pentest.status === 'pending'
                                      ? classes.bgWarning
                                      : classes.bgSuccess +
                                        ' ' +
                                        classes.verticalAlignMiddle
                                  }
                                ></Box>
                                {pentest.status}
                              </Box>
                            </TableCell>
                            <TableCell
                              classes={{ root: classes.tableCellRoot }}
                            >
                              <Box paddingTop='.35rem' paddingBottom='.35rem'>
                                <Box
                                  marginRight='10px'
                                  component='i'
                                  width='.375rem'
                                  height='.375rem'
                                  borderRadius='50%'
                                  display='inline-block'
                                ></Box>
                                <Button
                                  disabled={
                                    pentest.status === 'completed'
                                      ? true
                                      : false
                                  }
                                  onClick={() => handleOpen(pentest.id)}
                                >
                                  Upload Report
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))
                      : null}
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
            </>
          ) : (
            'loading pentests...'
          )}
        </Card>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    merchant_pentests: state?.auditorReducers?.merchant_pentests,
  };
};

export default connect(mapStateToProps, {
  getPentestRequest,
  uploadPentest,
})(Penetration);
