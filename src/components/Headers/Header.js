import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// @material-ui/icons components
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import EmojiEvents from '@material-ui/icons/EmojiEvents';
import GroupAdd from '@material-ui/icons/GroupAdd';
import InsertChartOutlined from '@material-ui/icons/InsertChartOutlined';
import PieChart from '@material-ui/icons/PieChart';

// core components
import CardStats from 'components/Cards/CardStats.js';

import componentStyles from 'assets/theme/components/header.js';

const useStyles = makeStyles(componentStyles);

const Header = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <div className={classes.header}>
        <Container
          maxWidth={false}
          component={Box}
          classes={{ root: classes.containerRoot }}
        >
          <div>
            <Grid container>
              <Grid item xl={3} lg={6} xs={12}>
                <CardStats
                  subtitle='Transactions'
                  title={`${props.card ? props.card.total_transaction : 0}`}
                  icon={InsertChartOutlined}
                  color='bgError'
                  footer={
                    <>
                      <Box
                        component='span'
                        fontSize='.875rem'
                        color={theme.palette.success.main}
                        marginRight='.5rem'
                        display='flex'
                        alignItems='center'
                      >
                        <Box
                          component={ArrowUpward}
                          width='1.5rem!important'
                          height='1.5rem!important'
                        />{' '}
                        0%
                      </Box>
                      <Box component='span' whiteSpace='nowrap'>
                        Since last month
                      </Box>
                    </>
                  }
                />
              </Grid>
              <Grid item xl={3} lg={6} xs={12}>
                <CardStats
                  subtitle='Customers'
                  title={`${props.card ? props.card.total_customers : 0}`}
                  icon={PieChart}
                  color='bgWarning'
                  footer={
                    <>
                      <Box
                        component='span'
                        fontSize='.875rem'
                        color={theme.palette.error.main}
                        marginRight='.5rem'
                        display='flex'
                        alignItems='center'
                      >
                        <Box
                          component={ArrowDownward}
                          width='1.5rem!important'
                          height='1.5rem!important'
                        />{' '}
                        0%
                      </Box>
                      <Box component='span' whiteSpace='nowrap'>
                        Since last week
                      </Box>
                    </>
                  }
                />
              </Grid>
              <Grid item xl={3} lg={6} xs={12}>
                <CardStats
                  subtitle='Earning'
                  title={`${props.card ? props.card.total_earning : 0}`}
                  icon={GroupAdd}
                  color='bgWarningLight'
                  footer={
                    <>
                      <Box
                        component='span'
                        fontSize='.875rem'
                        color={theme.palette.warning.main}
                        marginRight='.5rem'
                        display='flex'
                        alignItems='center'
                      >
                        <Box
                          component={ArrowDownward}
                          width='1.5rem!important'
                          height='1.5rem!important'
                        />{' '}
                        0%
                      </Box>
                      <Box component='span' whiteSpace='nowrap'>
                        Since yesterday
                      </Box>
                    </>
                  }
                />
              </Grid>
              <Grid item xl={3} lg={6} xs={12}>
                <CardStats
                  subtitle='Compliance'
                  title={`${props.card ? props.card.compliance : 0}`}
                  icon={EmojiEvents}
                  color='bgInfo'
                  footer={
                    <>
                      <Box
                        component='span'
                        fontSize='.875rem'
                        color={theme.palette.success.main}
                        marginRight='.5rem'
                        display='flex'
                        alignItems='center'
                      >
                        <Box
                          component={ArrowUpward}
                          width='1.5rem!important'
                          height='1.5rem!important'
                        />{' '}
                        0%
                      </Box>
                      <Box component='span' whiteSpace='nowrap'>
                        Since last month
                      </Box>
                    </>
                  }
                />
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;