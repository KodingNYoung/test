import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Link,
  Container,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';
import MarketplaceHeader from './header';
import { Email, Facebook, LinkedIn, Phone } from '@material-ui/icons';

import avatar from '../../assets/img/brand/avatar.jpg';

const MarketPlaceSingle = ({ auditor, loading }) => {
  console.log(auditor);
  const iconStyle = {
    fontSize: '14px',
    width: '28px',
    height: '28px',
  };
  // styles
  const useStyles = makeStyles((theme) => ({
    card: { border: '1px solid #ccc' },
    cardActionArea: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: '.9rem',
    },
    cardActions: {
      padding: `.3rem !important`,
    },
    mediaContainer: { width: '100%', height: '150px', textAlign: 'center' },
    media: { height: '100%', width: '100%' },
  }));
  const classes = useStyles();
  return (
    <>
      <MarketplaceHeader nosearch={true} />
      <Container style={{ margin: '2rem auto' }}>
        {!loading ? (
          <>
            <Card>
              <CardContent>
                <Grid container spacing={3}>
                  <div>
                    <img
                      src={auditor?.profile_photo_url || avatar}
                      alt='profile'
                      style={{
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%',
                      }}
                    />

                    <Grid container spacing={3}>
                      <Grid item xs={8} style={{ textAlign: 'justify' }}>
                        <CardContent>
                          <Typography variant='subtitle1' color='textSecondary'>
                            {auditor?.fullname}
                          </Typography>
                          <Typography component='h5' variant='h5'>
                            {auditor?.location || 'Planet earth'}
                          </Typography>
                          <Typography variant='h5' color='textSecondary'>
                            {auditor?.about ||
                              'This auditor has not updated his about info.'}
                          </Typography>
                        </CardContent>
                      </Grid>

                      <Grid item xs={4} style={{ marginTop: '3rem' }}>
                        <Link href={auditor?.facebook} color='textSecondary'>
                          <Facebook style={iconStyle} />
                        </Link>
                        <Link href={auditor?.linkedin} color='textSecondary'>
                          <LinkedIn style={iconStyle} />
                        </Link>
                        <Link
                          color='textSecondary'
                          href={`mailto:${auditor?.email}`}
                        >
                          <Email style={iconStyle} />
                        </Link>
                        <Link
                          href={
                            auditor?.phone_number
                              ? `tel:${auditor?.phone_number}`
                              : null
                          }
                          color='textSecondary'
                        >
                          <Phone style={iconStyle} />
                        </Link>

                        <Link
                          href={auditor?.resume_url || null}
                          download
                          component='button'
                        >
                          <Button
                            disabled={!auditor?.resume_url}
                            href={auditor?.resume_url}
                          >
                            {auditor?.resume_url
                              ? 'Download Resume'
                              : 'Resume not available'}
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </CardContent>
            </Card>
            <Card style={{ marginTop: '2%' }}>
              <CardContent>
                <Typography variant='h2'>
                  Licences and Certifications
                </Typography>

                <List
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                  }}
                >
                  {auditor?.license_and_certs[0] ? (
                    auditor.license_and_certs.map((cert, index) => (
                      <>
                        <ListItem key={index}>
                          <ListItemText
                            primary={cert.name}
                            secondary={
                              <>
                                <Typography
                                  gutterBottom={false}
                                  variant='subtitle1'
                                >
                                  {cert.organization}
                                </Typography>
                                <Typography
                                  gutterBottom={false}
                                  component='small'
                                  style={{ fontSize: '.8rem' }}
                                >
                                  {new Date(
                                    cert.issue_date
                                  ).toLocaleDateString()}{' '}
                                  -{' '}
                                  {new Date(cert.exp_date).toLocaleDateString()}
                                </Typography>
                              </>
                            }
                          />
                        </ListItem>
                        <Divider />
                      </>
                    ))
                  ) : (
                    <Typography variant='h5' component='h2'>
                      No License or certifcation available
                    </Typography>
                  )}
                </List>
              </CardContent>
              <CardContent>
                <Typography variant='h2'>Clients and Portfolios</Typography>

                <Grid container spacing={6}>
                  {auditor?.portfolios[0] ? (
                    auditor.portfolios.map((portfolio, index) => (
                      <Grid item xs={3} lg={3} key={index}>
                        <Card variant='outlined' className={classes.card}>
                          <div className={classes.mediaContainer}>
                            <img
                              src={
                                portfolio?.logo_url ||
                                'https://www.cloudcorner.gr/wp-content/uploads/2019/03/microsoft-certified-azure-solutions-architect-expert-600x420.png'
                              }
                              className={classes.media}
                            />
                          </div>
                          <Typography
                            variant='h4'
                            component='h2'
                            style={{ padding: '.5rem', margin: 0 }}
                          >
                            {portfolio.title}
                          </Typography>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Typography variant='h5' component='h2'>
                      No portfolio project available
                    </Typography>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </>
        ) : (
          'loading...'
        )}
      </Container>
    </>
  );
};

export default MarketPlaceSingle;
