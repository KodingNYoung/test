import React, { useState, useEffect } from 'react';
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

// redux
import { connect } from 'react-redux';
import { getPolicies, getEvidences } from 'store/actions/merchantActions';

const useStyles = makeStyles(componentStyles);

const ComplianceHeader = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const {
    getPolicies,
    getEvidences,
    total_policies,
    appr_policies,
    total_evidences,
    appr_evidences,
  } = props;
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);
    await getPolicies();
    await getEvidences();
    setLoading(false);
  };
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
              {!loading && (
                <>
                  <Grid item xl={3} lg={6} xs={12}>
                    <CardStats
                      subtitle='Uploaded Policies'
                      title={total_policies}
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
                            3.48%
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
                      subtitle='Approved Policies'
                      title={appr_policies}
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
                              component={PieChart}
                              width='1.5rem!important'
                              height='1.5rem!important'
                            />{' '}
                            3.48%
                          </Box>
                          <Box component='span' whiteSpace='nowrap'>
                            uploaded policies
                          </Box>
                        </>
                      }
                    />
                  </Grid>
                  <Grid item xl={3} lg={6} xs={12}>
                    <CardStats
                      subtitle='Total Evidences'
                      title={total_evidences}
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
                            1.10%
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
                      subtitle='Appr. Evidences'
                      title={appr_evidences}
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
                              component={PieChart}
                              width='1.5rem!important'
                              height='1.5rem!important'
                            />{' '}
                            70%
                          </Box>
                          <Box component='span' whiteSpace='nowrap'>
                            uploaded evidences
                          </Box>
                        </>
                      }
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </div>
        </Container>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    total_policies: state?.merchantReducers?.total_policies,
    appr_policies: state?.merchantReducers?.appr_policies,
    total_evidences: state?.merchantReducers?.total_evidences,
    appr_evidences: state?.merchantReducers?.appr_evidences,
  };
};

export default connect(mapStateToProps, {
  getPolicies,
  getEvidences,
})(ComplianceHeader);
