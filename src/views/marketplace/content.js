import React from 'react';
// import { Container } from '@material-ui/core';

import {
  Card,
  CardContent,
  Grid,
  Button,
  Typography,
  Container,
} from '@material-ui/core';
import MarketplaceHeader from './header';

import avatar from '../../assets/img/brand/avatar.jpg';

const MarketplaceContent = ({
  allAuditors,
  setFilter,
  handleFilteredSearch,
  viewAuditorPage,
  loading,
}) => {
  console.log(allAuditors);
  return (
    <>
      <MarketplaceHeader
        nosearch={false}
        setFilter={setFilter}
        handleFilteredSearch={handleFilteredSearch}
      />
      <Container style={{ margin: '2rem auto' }}>
        <Card>
          {!loading ? (
            <CardContent>
              {allAuditors &&
                allAuditors.map((auditor) => {
                  return (
                    <Grid
                      container
                      spacing={3}
                      key={auditor.id}
                      alignItems='center'
                    >
                      <Grid item xs={8}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <div
                            style={{
                              minWidth: '150px',
                              minHeight: '150px',
                              width: '150px',
                              height: '150px',
                              borderRadius: '50%',
                              overflow: 'hidden',
                            }}
                          >
                            <img
                              src={auditor.profile_photo_url || avatar}
                              alt='profile photo'
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                          </div>

                          <CardContent>
                            <Typography
                              variant='subtitle1'
                              color='textSecondary'
                            >
                              {auditor.fullname}
                            </Typography>
                            <Typography component='h5' variant='h5'>
                              {auditor.email}
                            </Typography>
                            <Typography variant='h5' color='textSecondary'>
                              {auditor.about ||
                                'This auditor has not updated his about info.'}
                            </Typography>
                          </CardContent>
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{ float: 'right', textAlign: 'right' }}
                      >
                        <Button onClick={() => viewAuditorPage(auditor.id)}>
                          View More
                        </Button>
                      </Grid>
                    </Grid>
                  );
                })}
            </CardContent>
          ) : (
            'loading...'
          )}
        </Card>
      </Container>
    </>
  );
};

export default MarketplaceContent;
