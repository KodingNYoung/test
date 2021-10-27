import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
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
// core components
import Header from 'components/Headers/PageHeader.js';
import Pagination from '@material-ui/lab/Pagination';

import componentStyles from 'assets/theme/views/admin/tables.js';
import './index.css';

// redux
import { connect } from 'react-redux';
import { getAudits } from 'store/actions/merchantActions';

const useStyles = makeStyles(componentStyles);

const Audits = (props) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState({ start: '', end: '' });
  const [page, setPage] = useState(1);
  const [loadingData, setLoadingData] = useState(false);

  const { all_audits, getAudits, audit_pagination } = props;
  useEffect(() => {
    const getAuditData = async () => {
      setLoadingData(true);
      await getAudits(page, selectedDate);
      setLoadingData(false);
    };
    getAuditData();
  }, [page, selectedDate]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setSelectedDate({ ...selectedDate, [name]: value });
  };
  const handlePaginationChange = (_, currentPage) => {
    setPage(currentPage);
  };
  return (
    <>
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
              title='Your Logs'
              titleTypographyProps={{
                component: Box,
                marginBottom: '0!important',
                variant: 'h3',
              }}
            ></CardHeader>
            <div style={{ padding: '2%' }}>
              <form className={classes.container} noValidate>
                <TextField
                  id='date'
                  label='From'
                  type='date'
                  name='start'
                  defaultValue=''
                  onChange={handleDateChange}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id='date'
                  label='To'
                  type='date'
                  name='end'
                  defaultValue=''
                  onChange={handleDateChange}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
            </div>
          </div>
          <TableContainer>
            <Box
              component={Table}
              alignItems='center'
              marginBottom='1rem !important'
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + ' ' + classes.tableCellRootHead,
                    }}
                  >
                    User
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + ' ' + classes.tableCellRootHead,
                    }}
                  >
                    Activity
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + ' ' + classes.tableCellRootHead,
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + ' ' + classes.tableCellRootHead,
                    }}
                  >
                    IP Address
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {all_audits
                  ? all_audits.map((audit, key) => (
                      <TableRow key={key}>
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
                                {audit.user}
                              </Box>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {audit.activity}
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {`${new Date(audit?.createdAt).toLocaleDateString(
                            'EN',
                            {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            }
                          )}
                            ${new Date(audit?.createdAt).toLocaleTimeString(
                              'EN',
                              { hour: '2-digit', minute: '2-digit' }
                            )}`}
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          Not Specified
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Box>
          </TableContainer>
          {audit_pagination?.totalPages - 1 > 1 && (
            <Box
              classes={{ root: classes.cardActionsRoot }}
              component={CardActions}
              justifyContent='flex-end'
            >
              <Pagination
                count={audit_pagination?.totalPages - 1}
                color='primary'
                onChange={handlePaginationChange}
                variant='outlined'
                disabled={loadingData}
              />
            </Box>
          )}
        </Card>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    all_audits: state?.merchantReducers?.all_audits,
    audit_pagination: state?.merchantReducers?.audit_pagination,
  };
};

export default connect(mapStateToProps, {
  getAudits,
})(Audits);
