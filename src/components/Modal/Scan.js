import React, { useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import componentStyles from 'assets/theme/views/admin/profile.js';

const useStyles = makeStyles(componentStyles);

function Scan(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [name, setName] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [authorize, setAuthorize] = useState(false);
  return (
    <>
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        // marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            xl={12}
            component={Box}
            marginBottom='3rem'
            classes={{ root: classes.gridItemRoot + ' ' + classes.order2 }}
          >
            <Card
              classes={{
                root: classes.cardRoot + ' ' + classes.cardRootSecondary,
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
                        {props.type === 'ASV'
                          ? 'ASV SCAN REQUEST'
                          : 'PENETRATION REQUEST'}
                      </Box>
                    </Grid>
                  </Grid>
                }
                classes={{ root: classes.cardHeaderRoot }}
              ></CardHeader>
              <CardContent>
                <Box
                  component={Typography}
                  variant='h6'
                  color={theme.palette.gray[600] + '!important'}
                  paddingTop='.25rem'
                  paddingBottom='.25rem'
                  fontSize='.75rem!important'
                  letterSpacing='.04em'
                  marginBottom='1.5rem!important'
                  classes={{ root: classes.typographyRootH6 }}
                >
                  {props.type === 'ASV'
                    ? 'REQUEST FOR ASV SCAN'
                    : 'REQUEST FOR PENETRATION TEST'}
                </Box>
                <div className={classes.plLg4}>
                  <Grid container>
                    <Grid item xs={12} lg={6}>
                      <FormGroup>
                        <FormLabel>Request Name</FormLabel>
                        <FormControl
                          variant='filled'
                          component={Box}
                          width='100%'
                          marginBottom='1rem!important'
                        >
                          <Box
                            paddingLeft='0.75rem'
                            paddingRight='0.75rem'
                            component={FilledInput}
                            autoComplete='off'
                            type='text'
                            placeholder='Name of request'
                            onChange={(e) => setName(e.target.value)}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <FormGroup>
                        <FormLabel>Server</FormLabel>
                        <FormControl
                          variant='filled'
                          component={Box}
                          width='100%'
                          marginBottom='1rem!important'
                        >
                          <Box
                            paddingLeft='0.75rem'
                            paddingRight='0.75rem'
                            component={FilledInput}
                            autoComplete='off'
                            type='text'
                            placeholder='server ip or website'
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} lg={6}>
                      <FormGroup>
                        <FormLabel>Message</FormLabel>
                        <FormControl
                          variant='filled'
                          component={Box}
                          width='100%'
                          marginBottom='1rem!important'
                        >
                          <Box
                            paddingLeft='0.75rem'
                            paddingRight='0.75rem'
                            component={FilledInput}
                            autoComplete='off'
                            type='text'
                            placeholder='Description'
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </FormControl>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            icon={<CheckBoxOutlineBlankIcon />}
                            checkedIcon={<CheckBoxIcon />}
                            name='checkedI'
                            color='primary'
                          />
                        }
                        label='Authorize Access'
                        onChange={() => setAuthorize(!authorize)}
                      />
                    </Grid>
                  </Grid>
                </div>
                <Box
                  component={Divider}
                  marginBottom='1.5rem!important'
                  marginTop='1.5rem!important'
                />
              </CardContent>
              <Button
                color='default'
                variant='contained'
                onClick={() =>
                  (name !== null) & (title !== null) & (description !== null)
                    ? props.submit(name, title, description)
                    : ''
                }
                disabled={!authorize || props.loading}
                style={{ border: 'none' }}
              >
                {props.loading ? 'Submitting...' : 'Submit'}
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Scan;
