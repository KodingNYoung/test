import React, { useState, useEffect } from 'react';
// javascipt plugin for creating charts
import Chart from 'chart.js';
// react plugin used to create charts
import { Line } from 'react-chartjs-2';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// import LinearProgress from "@material-ui/core/LinearProgress";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
// core components
import Header from 'components/Headers/Header.js';
import { chartOptions, parseOptions, chartExample1 } from 'variables/charts.js';
// styles
import componentStyles from 'assets/theme/views/admin/dashboard.js';

// redux
import { connect } from 'react-redux';
import {
  getTransactionCharts,
  getDashboardCards,
} from 'store/actions/merchantActions';
import { getAllTransactions, getCustomers } from 'store/actions/paymentActions';

const useStyles = makeStyles(componentStyles);

function Dashboard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeNav, setActiveNav] = useState(1);
  const [selectedDate, setSelectedDate] = useState({
    start: '',
    end: '',
  });
  const [loading, setLoading] = useState({
    monthlyTransactions: false,
    allTransactions: false,
    customers: false,
    dashboardCards: false,
  });
  const [error, setError] = useState({
    monthlyTransactions: null,
    allTransactions: null,
    customers: null,
    dashboardCards: null,
  });

  const {
    getTransactionCharts,
    total_transactions,
    getDashboardCards,
    dashboard_cards,
    getAllTransactions,
    getCustomers,
    all_transactions,
    all_customers,
  } = props;

  useEffect(() => {
    transactionData();
    getDashboardCard();
    getTransaction();
    getCustomer();
  }, []);

  const transactionData = async () => {
    setLoading({ ...loading, monthlyTransactions: true });
    const res = await getTransactionCharts();
    if (res.status !== 'success') {
      setError({ ...error, monthlyTransactions: res.message });
    }
    setLoading({ ...loading, monthlyTransactions: false });
  };
  const getDashboardCard = async () => {
    setLoading({ ...loading, dashboardCards: true });
    const res = await getDashboardCards();
    if (res.status != 'success') {
      setError({ ...error, dashboardCards: res.message });
    }
    setLoading({ ...loading, dashboardCards: false });
  };
  const getCustomer = async () => {
    setLoading({ ...loading, customers: true });
    const res = await getCustomers(selectedDate, '');
    if (res.status != 'success') {
      setError({ ...error, customers: res.message });
    }
    setLoading({ ...loading, customers: false });
  };
  const getTransaction = async () => {
    setLoading({ ...loading, allTransactions: true });
    const res = await getAllTransactions(selectedDate);
    if (res.status != 'success') {
      setError({ ...error, allTransactions: res.message });
    }
    setLoading({ ...loading, allTransactions: false });
  };

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (index) => {
    setActiveNav(index);
  };
  return (
    <>
      <Header card={dashboard_cards} />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop='-6rem'
        classes={{ root: classes.containerRoot }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            xl={12}
            component={Box}
            marginBottom='3rem!important'
            classes={{ root: classes.gridItemRoot }}
          >
            <Card
              classes={{
                root: classes.cardRoot + ' ' + classes.cardRootBgGradient,
              }}
            >
              <CardHeader
                subheader={
                  <Grid
                    container
                    component={Box}
                    alignItems='center'
                    justifyContent='space-between'
                  >
                    <Grid item xs='auto'>
                      <Box
                        component={Typography}
                        variant='h6'
                        letterSpacing='.0625rem'
                        marginBottom='.25rem!important'
                        className={classes.textUppercase}
                      >
                        <Box component='span' color={theme.palette.gray[400]}>
                          Overview
                        </Box>
                      </Box>
                      <Box
                        component={Typography}
                        variant='h2'
                        marginBottom='0!important'
                      >
                        <Box component='span' color={theme.palette.white.main}>
                          Transactions
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs='auto'>
                      <Box
                        justifyContent='flex-end'
                        display='flex'
                        flexWrap='wrap'
                      >
                        <Button
                          variant='contained'
                          color='primary'
                          component={Box}
                          marginRight='1rem!important'
                          onClick={() => toggleNavs(1)}
                          classes={{
                            root:
                              activeNav === 1
                                ? ''
                                : classes.buttonRootUnselected,
                          }}
                        >
                          Month
                        </Button>
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={() => toggleNavs(2)}
                          classes={{
                            root:
                              activeNav === 2
                                ? ''
                                : classes.buttonRootUnselected,
                          }}
                        >
                          Week
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                }
                classes={{ root: classes.cardHeaderRoot }}
              ></CardHeader>
              <CardContent>
                {!loading.monthlyTransactions ? (
                  <Box position='relative' height='350px'>
                    <Line
                      data={() => {
                        return {
                          labels:
                            total_transactions?.length > 0
                              ? total_transactions[0]
                                  ?.total_monthly_transactions[0]
                              : [],
                          datasets: [
                            {
                              label: 'Performance',
                              data: total_transactions?.length
                                ? total_transactions[0]
                                    ?.total_monthly_transactions[1]
                                : null,
                            },
                          ],
                        };
                      }}
                      options={chartExample1.options}
                      // getDatasetAtEvent={(e) => console.log(e)}
                    />
                  </Box>
                ) : (
                  <Typography style={{ color: 'white' }}>Loading...</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container component={Box} marginTop='3rem'>
          <Grid
            item
            xs={12}
            xl={8}
            component={Box}
            marginBottom='3rem!important'
            classes={{ root: classes.gridItemRoot }}
          >
            <Card
              classes={{
                root: classes.cardRoot,
              }}
            >
              <CardHeader
                subheader={
                  <Grid
                    container
                    component={Box}
                    alignItems='center'
                    justifyContent='space-between'
                  >
                    <Grid item xs='auto'>
                      <Box
                        component={Typography}
                        variant='h3'
                        marginBottom='0!important'
                      >
                        Recent Transactions
                      </Box>
                    </Grid>
                    <Grid item xs='auto'>
                      <Box
                        justifyContent='flex-end'
                        display='flex'
                        flexWrap='wrap'
                      >
                        <Button
                          variant='contained'
                          color='primary'
                          size='small'
                          onClick={() =>
                            props.history.push('/admin/transactions')
                          }
                        >
                          See all
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                }
                classes={{ root: classes.cardHeaderRoot }}
              ></CardHeader>
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
                        Processor
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
                      >
                        Amount
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            ' ' +
                            classes.tableCellRootHead,
                        }}
                      >
                        Date
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {!loading.allTransactions ? (
                    <TableBody>
                      {all_transactions?.slice(0, 7)?.map((record, index) => (
                        <TableRow key={index}>
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
                            {record.gateway.toUpperCase()}
                          </TableCell>
                          <TableCell classes={{ root: classes.tableCellRoot }}>
                            {record.status}{' '}
                          </TableCell>
                          <TableCell classes={{ root: classes.tableCellRoot }}>
                            N{record.amount}
                          </TableCell>
                          <Box
                            component={TableCell}
                            className={classes.tableCellRoot}
                            marginBottom='-2px'
                          >
                            {record.date}
                          </Box>
                        </TableRow>
                      ))}
                    </TableBody>
                  ) : (
                    <Typography style={{ padding: '1rem 1.5rem' }}>
                      Loading...
                    </Typography>
                  )}
                </Box>
              </TableContainer>
            </Card>
          </Grid>
          <Grid item xs={12} xl={4}>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                subheader={
                  <Grid
                    container
                    component={Box}
                    alignItems='center'
                    justifyContent='space-between'
                  >
                    <Grid item xs='auto'>
                      <Box
                        component={Typography}
                        variant='h3'
                        marginBottom='0!important'
                      >
                        Recent Customers
                      </Box>
                    </Grid>
                    <Grid item xs='auto'>
                      <Box
                        justifyContent='flex-end'
                        display='flex'
                        flexWrap='wrap'
                      >
                        <Button
                          variant='contained'
                          color='primary'
                          size='small'
                          onClick={() => props.history.push('/admin/customers')}
                        >
                          See all
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                }
                classes={{ root: classes.cardHeaderRoot }}
              ></CardHeader>
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
                        Full Name
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            ' ' +
                            classes.tableCellRootHead,
                        }}
                      >
                        Email
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            ' ' +
                            classes.tableCellRootHead,
                        }}
                      >
                        Amount Paid
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {!loading.customers ? (
                    <TableBody>
                      {all_customers?.slice(0, 7)?.map((customer, index) => (
                        <TableRow key={index}>
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
                            {customer.name}
                          </TableCell>
                          <TableCell classes={{ root: classes.tableCellRoot }}>
                            {customer.email}
                          </TableCell>
                          <TableCell classes={{ root: classes.tableCellRoot }}>
                            <Box display='flex' alignItems='center'>
                              <Box component='span' marginRight='.5rem'>
                                N{customer.total_amount_paid}
                              </Box>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  ) : (
                    <Typography style={{ padding: '1rem 1.5rem' }}>
                      Loading...
                    </Typography>
                  )}
                </Box>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    total_transactions: state?.merchantReducers?.total_transactions,
    dashboard_cards: state?.merchantReducers?.dashboard_cards,
    all_transactions: state?.paymentReducers?.all_transactions,
    all_customers: state?.paymentReducers?.all_customers,
  };
};

export default connect(mapStateToProps, {
  getTransactionCharts,
  getDashboardCards,
  getAllTransactions,
  getCustomers,
})(Dashboard);
