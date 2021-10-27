import React, { useState, useEffect } from 'react';
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
import Pagination from '@material-ui/lab/Pagination';
// @material-ui/lab components
// core components
import Header from 'components/Headers/PageHeader.js';

import componentStyles from 'assets/theme/views/admin/tables.js';
import './index.css';

// redux
import { connect } from 'react-redux';
import { getCustomers } from 'store/actions/paymentActions';

const useStyles = makeStyles(componentStyles);

const Customers = (props) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState({
    start: '',
    end: '',
  });
  const [page, setPage] = useState('');
  const [loadingData, setLoadingData] = useState(false);

  const { getCustomers, all_customers, customer_pagination } = props;

  useEffect(() => {
    const getCustomer = async () => {
      setLoadingData(true);
      const res = await getCustomers(selectedDate, page);
      setLoadingData(false);
    };

    getCustomer();
  }, [page, selectedDate]);

  const handleDateChange = (evt) => {
    const { name, value } = evt.target;
    console.log(value);
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
              title='Your Customers'
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
                  defaultValue={null}
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
                  defaultValue={null}
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
                    Source
                  </TableCell>
                  <TableCell
                    classes={{
                      root:
                        classes.tableCellRoot + ' ' + classes.tableCellRootHead,
                    }}
                  >
                    Amount Paid
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {all_customers[0]
                  ? all_customers.map((customer) => (
                      <TableRow key={customer.id}>
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
                                {customer.name}
                              </Box>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {customer.email}
                        </TableCell>
                        <TableCell
                          classes={{ root: classes.tableCellRoot }}
                        ></TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {customer.total_amount_paid}
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Box>
          </TableContainer>
          {customer_pagination?.totalPages - 1 > 1 && (
            <Box
              classes={{ root: classes.cardActionsRoot }}
              component={CardActions}
              justifyContent='flex-end'
            >
              <Pagination
                count={customer_pagination?.totalPages - 1}
                color='primary'
                defaultPage={1}
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
    all_customers: state?.paymentReducers?.all_customers,
    customer_pagination: state?.paymentReducers?.customer_pagination,
  };
};

export default connect(mapStateToProps, {
  getCustomers,
})(Customers);
