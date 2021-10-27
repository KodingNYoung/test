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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// @material-ui/lab components
import Pagination from '@material-ui/lab/Pagination';
// @material-ui/icons components
import MoreVert from '@material-ui/icons/MoreVert';
import Modal from '@material-ui/core/Modal';

import componentStyles from 'assets/theme/views/admin/tables.js';
import Review from 'components/Modal/AuditorReview';

// redux
import { connect } from 'react-redux';
import { getPoliciesByMerchantId } from 'store/actions/auditorActions';

const useStyles = makeStyles(componentStyles);

const Policy = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [viewPolicy, setView] = React.useState(false);
  const [displayAlert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [policy, setPolicy] = useState([]);
  const [loading, setLoading] = useState(false);

  const { getPoliciesByMerchantId, merchant_policies } = props;

  useEffect(() => {
    const getMerchantPolicy = async () => {
      setLoading(true);
      const res = await getPoliciesByMerchantId(props.props.match.params.id);
      setLoading(false);
      if (res.status === 'success') {
        setMessage(res.message);
      } else {
        setError(true);
        setMessage(res.message);
        setAlert(true);
      }
    };
    getMerchantPolicy();
  }, []);

  const handleClick = (event) => {
    setAnchorEl1(event.currentTarget);
    const policy = merchant_policies.filter(
      (item) => item.id === parseInt(event.currentTarget.id)
    );
    setPolicy(policy);
  };
  const handleClose = () => {
    setAnchorEl1(null);
  };
  const handleModalClose = () => {
    setView(false);
  };
  const handleViewPolicy = () => {
    setView(!viewPolicy);
  };

  const policyData = (
    <div className='bg-modal-container'>
      <Review
        id={policy.length !== 0 ? policy[0].id : ''}
        title={policy.length !== 0 ? policy[0].policyTitle : null}
        type='Policy'
        btnurl={policy.length !== 0 ? policy[0].policyFileUrl : ''}
        description={policy.length !== 0 ? policy[0].policyDescription : null}
      />
      {/* <h2 id="simple-modal-title">View Policy</h2>
      <section
        className={classes.root}
        style={{ margin: 8 }}
      >
       <h2>Policy Name: <span className={classes.viewText}>{policy.length !== 0 ?policy[0].policyTitle: null}</span></h2>
       <h2>Policy Description: <span  className={classes.viewText}>{policy.length !== 0 ? policy[0].policyDescription:null}</span></h2>
       <a href={policy.length !== 0? policy[0].policyFileUrl: ""} target="_blank" type="button">View Policy</a>
      </section> */}
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
          {!loading ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <CardHeader
                  className={classes.cardHeader}
                  title='All Policies'
                  titleTypographyProps={{
                    component: Box,
                    marginBottom: '0!important',
                    variant: 'h3',
                  }}
                ></CardHeader>
                <div style={{ padding: '2%' }}>
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
                            classes.tableCellRoot +
                            ' ' +
                            classes.tableCellRootHead,
                        }}
                      >
                        Policy
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            ' ' +
                            classes.tableCellRootHead,
                        }}
                      >
                        Approved By
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
                    {merchant_policies
                      ? merchant_policies.map((policy) => (
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
                            <TableCell
                              classes={{ root: classes.tableCellRoot }}
                            >
                              {policy.approvedBy === null
                                ? 'Not Approved'
                                : policy.approvedBy}
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
            'loading policies'
          )}
        </Card>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    merchant_policies: state?.auditorReducers?.merchant_policies,
  };
};

export default connect(mapStateToProps, {
  getPoliciesByMerchantId,
})(Policy);
