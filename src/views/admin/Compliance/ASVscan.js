import React, { useState, useEffect } from 'react';
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

import componentStyles from 'assets/theme/views/admin/tables.js';
import Scan from 'components/Modal/Scan';

// redux
import { connect } from 'react-redux';
import { getASVScans, requestASVScan } from 'store/actions/merchantActions';
const useStyles = makeStyles(componentStyles);

const ASVscan = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [displayAlert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState({ content: false, request: false });

  const { getASVScans, requestASVScan, all_asvscans } = props;
  useEffect(() => {
    const getMerchantScan = async () => {
      setLoading({ ...loading, content: true });
      await getASVScans();
      setLoading({ ...loading, content: false });
    };
    getMerchantScan();
  }, []);

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async (name, description, title) => {
    setLoading({ ...loading, request: true });
    const data = {
      request_name: name,
      descriptions: description,
      server: title,
    };
    const token = await requestASVScan(data);
    setLoading({ ...loading, request: false });
    if (token.status === 'success') {
      setAlert(true);
      setMessage(token.message);
      handleModalClose();
      setTimeout(() => {
        setAlert(false);
        handleModalClose();
      }, 3000);
    } else {
      setAlert(true);
      setError(true);
      setMessage(token.message);
      setTimeout(() => {
        setAlert(false);
        setError(false);
      }, 3000);
    }
  };
  const body = (
    <div className='bg-modal-container'>
      <Scan type='ASV' submit={handleSubmit} loading={loading.request} />
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
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <CardHeader
              className={classes.cardHeader}
              title='Your Reports'
              titleTypographyProps={{
                component: Box,
                marginBottom: '0!important',
                variant: 'h3',
              }}
            ></CardHeader>
            <div style={{ padding: '2%' }}>
              <Button variant='contained' type='button' onClick={handleOpen}>
                Request for ASV Scan
              </Button>
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
                        classes.tableCellRoot + ' ' + classes.tableCellRootHead,
                    }}
                  >
                    Request Name
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + ' ' + classes.tableCellRootHead,
                    }}
                  >
                    Server
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
                  all_asvscans ? (
                    all_asvscans.map((scan) => (
                      <TableRow key={scan.id}>
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
                                {scan.request_name}
                              </Box>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {scan.server}
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
                                scan.status === 'pending'
                                  ? classes.bgWarning
                                  : classes.bgSuccess +
                                    ' ' +
                                    classes.verticalAlignMiddle
                              }
                            ></Box>
                            {scan.status}
                          </Box>
                        </TableCell>
                        <TableCell
                          classes={{ root: classes.tableCellRoot }}
                          align='right'
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
                                scan.status !== 'completed' ? true : false
                              }
                            >
                              Download Report
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : null
                ) : (
                  <TableRow>
                    <TableCell>Loading...</TableCell>
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
    all_asvscans: state?.merchantReducers?.all_asvscans,
  };
};

export default connect(mapStateToProps, {
  getASVScans,
  requestASVScan,
})(ASVscan);
